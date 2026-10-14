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
  if (preUrea > 0 && postUrea > 0 && preUrea > postUrea) {
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
