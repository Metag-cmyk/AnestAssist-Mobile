/**
 * CRRT Calculators based on KDIGO Guidelines (20-25 ml/kg/h)
 */

export interface CRRTInputs {
  weightKg: number;
  hctPercent: number; // e.g. 35 for 35%
  bloodFlowMlMin: number; // Qb
  preFilterPercent: number; // explicit adjustable ratio, e.g. 50
  targetDoseMlKgHr: number; // Default typically 25
  netUfrMlHr?: number; // Patient Fluid Removal
  pbpMlHr?: number; // Pre-Blood Pump rate
}

export interface CRRTOutputs {
  totalDoseHr: number; // ml/hr (Legacy reference)
  totalEffluentHr: number; // ml/hr (Total sum flow)
  plasmaFlowMlMin: number; // Qp
  dialysateRateHr: number;
  replacementRateHr: number;
  preFilterRateHr: number;
  postFilterRateHr: number;
  pbpRateHr: number; // Passed through or calculated
  netUfrHr: number; // Passed through
  filtrationFraction: number; // FF %
  isHighClottingRisk: boolean; // FF > 25%
  predictedCrCl: number; // ml/min
  deliveredUfrDose: number; // ml/kg/hr
}

export function calculateCRRT(inputs: CRRTInputs): CRRTOutputs {
  const { weightKg, hctPercent, bloodFlowMlMin, preFilterPercent, targetDoseMlKgHr, netUfrMlHr = 0, pbpMlHr = 0 } = inputs;
  
  if (!weightKg || !bloodFlowMlMin) {
    return {
      totalDoseHr: 0, totalEffluentHr: 0, plasmaFlowMlMin: 0, dialysateRateHr: 0,
      replacementRateHr: 0, preFilterRateHr: 0, postFilterRateHr: 0,
      pbpRateHr: 0, netUfrHr: 0,
      filtrationFraction: 0, isHighClottingRisk: false, predictedCrCl: 0, deliveredUfrDose: 0
    };
  }

  // Plasma Flow (Qp) = Qb * (1 - Hct)
  const plasmaFlowMlMin = bloodFlowMlMin * (1 - (hctPercent / 100));
  
  // Total Target Effluent (Dose) in ml/hr
  const totalEffluentHr = weightKg * targetDoseMlKgHr;

  // Effluent = Dialysate + Replacement + PBP + Net UFR
  // So the fluid left to assign to Dialysate and Replacement is Target - PBP - Net UFR
  let fluidToAssign = totalEffluentHr - pbpMlHr - netUfrMlHr;
  
  // If Target is impossible given PBP/UFR, we clamp to 0 and assume they'll increase target
  if (fluidToAssign < 0) fluidToAssign = 0;

  // Split fluid 50/50 between Dialysate and Replacement for standard CVVHDF
  const dialysateRateHr = fluidToAssign * 0.5;
  const replacementRateHr = fluidToAssign * 0.5;

  // Split replacement into pre and post based on given explicit ratio
  const preFilterRateHr = replacementRateHr * (preFilterPercent / 100);
  const postFilterRateHr = replacementRateHr * ((100 - preFilterPercent) / 100);

  // Filtration Fraction (FF) = Total UF / (Qp + PreFilterRate + PBP)
  // Total UF (what crosses the membrane) = Post-Filter + Pre-Filter + PBP + Net UFR
  // However, PBP dilutes the blood right out of the patient (pre-pump), and preFilter dilutes pre-filter.
  // FF % = [ (Total UF Crossing Membrane) / (Qp * 60 + PBP + PreFilter) ] * 100
  // Standard approximation: UF crossing membrane in CVVHDF = Post-Filter + Pre-Filter + Net UFR
  const Qp_hr = plasmaFlowMlMin * 60;
  const totalUfCrossingMembrane = postFilterRateHr + preFilterRateHr + netUfrMlHr;
  
  const filtrationFraction = Qp_hr > 0 
    ? (totalUfCrossingMembrane / (Qp_hr + preFilterRateHr + pbpMlHr)) * 100 
    : 0;

  return {
    totalDoseHr: totalEffluentHr,
    totalEffluentHr,
    plasmaFlowMlMin,
    dialysateRateHr,
    replacementRateHr,
    preFilterRateHr,
    postFilterRateHr,
    pbpRateHr: pbpMlHr,
    netUfrHr: netUfrMlHr,
    filtrationFraction,
    isHighClottingRisk: filtrationFraction > 25,
    predictedCrCl: totalEffluentHr / 60,
    deliveredUfrDose: totalEffluentHr / weightKg
  };
}

/**
 * Plasma Exchange Calculators (TPE)
 * Formula: EPV = [0.065 * Wt(kg)] * [1 - Hct]
 */
export interface TPEOutputs {
  epvLiters: number;
  oneVolumeExchangeLiters: number;
  onePointFiveExchangeLiters: number;
}

export function calculatePlasmaExchange(weightKg: number, hctPercent: number): TPEOutputs {
  if (!weightKg || !hctPercent) {
    return { epvLiters: 0, oneVolumeExchangeLiters: 0, onePointFiveExchangeLiters: 0 };
  }
  
  // EPV in Liters
  const epvLiters = (0.065 * weightKg) * (1 - (hctPercent / 100));
  
  return {
    epvLiters,
    oneVolumeExchangeLiters: epvLiters,
    onePointFiveExchangeLiters: epvLiters * 1.5
  };
}

/**
 * IHD Estimators
 */
export interface IHDInputs {
  preUrea: number;
  postUrea: number;
  durationHours: number;
  weightKg: number;
  isMale: boolean;
  age: number;
  heightCm: number;
}

export function calculateIHD(inputs: IHDInputs) {
  const { preUrea, postUrea, weightKg, isMale, age, heightCm } = inputs;
  
  let urr = 0;
  if (preUrea > 0 && postUrea > 0 && preUrea > postUrea) {
    urr = ((preUrea - postUrea) / preUrea) * 100;
  }

  // Dynamic Volume (V) calculation using Watson formula
  let v = 0; // Volume of distribution (Liters)
  if (weightKg > 0 && age > 0 && heightCm > 0) {
    if (isMale) {
      v = 2.447 - (0.09156 * age) + (0.1074 * heightCm) + (0.3362 * weightKg);
    } else {
      v = -2.097 + (0.1069 * heightCm) + (0.2466 * weightKg);
    }
  }

  // Daugirdas second-generation spKt/V estimate:
  // Kt/V = -ln(R - 0.008 * t) + (4 - 3.5 * R) * (UF / W)
  // For standard estimator, we'll use a simplified version assuming UF/W is small
  // R = postUrea / preUrea
  let ktv = 0;
  if (preUrea > 0 && postUrea > 0) {
    const R = postUrea / preUrea;
    // Simplified Daugirdas without UF estimation: Kt/V = -ln(R)
    // Or full if duration is known. We'll use natural log of ratio.
    ktv = -Math.log(R);
  }

  return {
    urr,
    estimatedVolumeLiters: v,
    estimatedKtV: ktv
  };
}

/**
 * Sodium & Electrolyte Correction
 * Formulas:
 * 1. Change in Serum Sodium (Adrogue-Madias): Delta Na = (Infusate Na - Serum Na) / (TBW + 1)
 * 2. Free Water Deficit: WD = TBW * ((Current Na / Target Na) - 1)
 */

export interface SodiumCorrectionInputs {
  serumNa: number;
  targetNa: number;
  infusateNa: number;
  weightKg: number;
  gender: 'male' | 'female';
  ageGroup: 'adult' | 'elderly';
  isWaterDeficit?: boolean;
}

export function calculateSodiumCorrection(inputs: SodiumCorrectionInputs) {
  const { serumNa, targetNa, infusateNa, weightKg, gender, ageGroup, isWaterDeficit } = inputs;
  
  if (!weightKg || !serumNa) {
    return { tbw: 0, deltaNaPerLiter: 0, totalVolumeNeeded: 0, waterDeficit: 0 };
  }

  // Calculate TBW factor
  let factor = 0.6;
  if (gender === 'male') {
    factor = ageGroup === 'adult' ? 0.6 : 0.5;
  } else {
    factor = ageGroup === 'adult' ? 0.5 : 0.45;
  }

  const tbw = weightKg * factor;

  // 1. Change in Na per 1 liter of infusate
  const deltaNaPerLiter = (infusateNa - serumNa) / (tbw + 1);

  // 2. Total Volume to reach Target
  let totalVolumeNeeded = 0;
  if (Math.abs(deltaNaPerLiter) > 0.01) {
    totalVolumeNeeded = (targetNa - serumNa) / deltaNaPerLiter;
  }

  // 3. Free Water Deficit (Specific for hypernatremia treatment)
  let waterDeficit = 0;
  if (targetNa > 0) {
    waterDeficit = tbw * ((serumNa / targetNa) - 1);
  }

  return {
    tbw,
    deltaNaPerLiter,
    totalVolumeNeeded: Math.abs(totalVolumeNeeded),
    waterDeficit: Math.max(0, waterDeficit)
  };
}

/**
 * AKI Staging & Risk (KDIGO)
 * KDIGO Criteria:
 * Stage 1: Serum Cr >= 1.5x baseline OR increase >= 0.3 mg/dL.
 * Stage 2: Serum Cr >= 2.0x baseline.
 * Stage 3: Serum Cr >= 3.0x baseline OR Cr >= 4.0 mg/dL OR RRT started.
 */

export interface AKIInputs {
  baselineCr: number;
  currentCr: number;
  urineOutTotal: number;
  hours: number;
  weightKg: number;
}

export function calculateAKIStage(inputs: AKIInputs) {
  const { baselineCr, currentCr, urineOutTotal, hours, weightKg } = inputs;
  
  if (!baselineCr || !currentCr) return { stage: 0, reason: 'N/A' };

  let stage = 0;
  let reason = 'Normal';

  const crRatio = currentCr / baselineCr;
  const crDelta = currentCr - baselineCr;

  // Creatinine Criteria (SI Units: µmol/L)
  if (crRatio >= 3.0 || currentCr >= 353.6) { stage = 3; reason = 'Cr 3.0x Baseline/High Abs'; }
  else if (crRatio >= 2.0) { stage = 2; reason = 'Cr 2.0x Baseline'; }
  else if (crRatio >= 1.5 || crDelta >= 26.5) { stage = 1; reason = 'Cr 1.5x Baseline/+26.5'; }

  // Urine Output Criteria (if data provided)
  if (weightKg > 0 && hours > 0) {
    const uoRate = urineOutTotal / weightKg / hours;
    
    if (uoRate < 0.3 && hours >= 24) { stage = 3; reason = 'Oliguria/Anuria >24h'; }
    else if (uoRate < 0.5 && hours >= 12) { stage = Math.max(stage, 2); reason = 'Oliguria >12h'; }
    else if (uoRate < 0.5 && hours >= 6) { stage = Math.max(stage, 1); reason = 'Oliguria >6h'; }
  }

  return { stage, reason };
}

/**
 * Furosemide Stress Test (FST)
 * Positive/Favorable: UO > 200 mL in 2 hours post-bolus.
 */
export function interpretFST(uo2h: number) {
  if (uo2h <= 0) return 'Pending Result';
  const isPositive = uo2h > 200;
  return {
    isPositive,
    risk: isPositive ? 'Low Risk of RRT' : 'High Risk of RRT / Stage 3 Progression',
    recommendation: isPositive ? 'Monitor Q6h' : 'Early Nephrology Consult / RRT Ready'
  };
}

/**
 * Fluid Overload (FO%)
 * FO% = (Intake - Output) / Baseline Weight * 100
 */
export function calculateFluidOverload(intakeL: number, outputL: number, weightKg: number) {
  if (!weightKg) return 0;
  const netBalanceL = intakeL - outputL;
  return (netBalanceL / weightKg) * 100;
}

/**
 * Regional Citrate Anticoagulation (RCA)
 * Standard Protcol: 4% Sodium Citrate (136 mmol/L)
 * Calcium Replacement: 10% Calcium Gluconate (0.22 mmol/mL)
 */
export interface RCAInputs {
  bloodFlowMlMin: number;
  targetCitrateDose: number; // mmol/L blood (default 3.0)
  citrateConcentration?: number; // mmol/L (default 136)
  calciumConcentration?: number; // mmol/mL (default 0.22)
}

export function calculateRCA(inputs: RCAInputs) {
  const { 
    bloodFlowMlMin, 
    targetCitrateDose = 3.0, 
    citrateConcentration = 136, 
    calciumConcentration = 0.22 
  } = inputs;

  if (!bloodFlowMlMin) return { citrateRate: 0, calciumRate: 0 };

  // Citrate Rate (mL/h) = (Dose * Qb * 60) / Concentration
  const citrateRate = (targetCitrateDose * bloodFlowMlMin * 60) / citrateConcentration;

  // Calcium Rate (mL/h) - Starting estimate ~0.4x Citrate Rate or 1.7 mmol/10L
  // Let's use 1.7 mmol / 10L blood as a safe starting guide
  const targetCaDoseMmolHr = (1.7 * bloodFlowMlMin * 60) / 10000;
  const calciumRate = targetCaDoseMmolHr / calciumConcentration;

  return {
    citrateRate,
    calciumRate,
    calciumMmolHr: targetCaDoseMmolHr
  };
}
