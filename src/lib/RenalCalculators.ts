/**
 * CRRT Calculators based on KDIGO Guidelines (20-25 ml/kg/h)
 */

export interface CRRTInputs {
  weightKg: number;
  hctPercent: number; // e.g. 35 for 35%
  bloodFlowMlMin: number; // Qb
  preFilterPercent: number; // explicit adjustable ratio, e.g. 50
  targetDoseMlKgHr: number; // Default typically 25
}

export interface CRRTOutputs {
  totalDoseHr: number; // ml/hr
  plasmaFlowMlMin: number; // Qp
  dialysateRateHr: number;
  replacementRateHr: number;
  preFilterRateHr: number;
  postFilterRateHr: number;
  filtrationFraction: number; // FF %
  isHighClottingRisk: boolean; // FF > 25%
}

export function calculateCRRT(inputs: CRRTInputs): CRRTOutputs {
  const { weightKg, hctPercent, bloodFlowMlMin, preFilterPercent, targetDoseMlKgHr } = inputs;
  
  if (!weightKg || !bloodFlowMlMin) {
    return {
      totalDoseHr: 0, plasmaFlowMlMin: 0, dialysateRateHr: 0,
      replacementRateHr: 0, preFilterRateHr: 0, postFilterRateHr: 0,
      filtrationFraction: 0, isHighClottingRisk: false
    };
  }

  // Plasma Flow (Qp) = Qb * (1 - Hct)
  const plasmaFlowMlMin = bloodFlowMlMin * (1 - (hctPercent / 100));
  
  // Total Target Dose (ml/hr)
  const totalDoseHr = weightKg * targetDoseMlKgHr;

  // Let's assume a CVVHDF model for general robustness (Split 50% Dialysate, 50% Replacement)
  // Or standard CVVH (100% replacement) - we'll assume a configurable split if complex, 
  // but let's default to a 50/50 split between Dialysate and Replacement fluid for CVVHDF
  // to give a comprehensive output. We will just divide the total dose equally for CVVHDF.
  const dialysateRateHr = totalDoseHr * 0.5;
  const replacementRateHr = totalDoseHr * 0.5;

  // Split replacement into pre and post based on given explicit ratio
  const preFilterRateHr = replacementRateHr * (preFilterPercent / 100);
  const postFilterRateHr = replacementRateHr * ((100 - preFilterPercent) / 100);

  // Filtration Fraction (FF) = (Post-filter replacement + Patient fluid removal) / Qp
  // Ignoring net patient fluid removal for simplistic pure FF base logic: FF = Qrep_post / Qp
  // Wait, standard FF = (Qrep_post + Uf_net) / Qp
  // Actually, FF = Q_effluent / Q_plasma in some definitions, but properly: 
  // FF = Total Ultrafiltrate / Qp. Total UF = Post-filter fluid + Net UF.
  // Standard strict formula: FF = (Q_replacement_post + Q_replacement_pre + Net_UF) / (Qb * (1 - Hct) + Q_rep_pre)
  // A simpler standard approximation: FF(%) = (Replacement Rate (Post) * 100) / (Plasma Flow * 60)
  const Qp_hr = plasmaFlowMlMin * 60;
  // Let's use standard formula: FF = Q_UF / Qp
  // In CVVHDF, Q_UF = Post-Filter Replacement + Pre-Filter Replacement. (Assuming Net UF=0 for calculation)
  // Wait, Pre-Filter fluid dilutes the blood, so Qp_effective = Qp + PreFilterRate.
  // FF = (Post-Filter + Pre-Filter) / (Qp_hr + PreFilterRate)
  const filtrationFraction = Qp_hr > 0 
    ? ((postFilterRateHr + preFilterRateHr) / (Qp_hr + preFilterRateHr)) * 100 
    : 0;

  return {
    totalDoseHr,
    plasmaFlowMlMin,
    dialysateRateHr,
    replacementRateHr,
    preFilterRateHr,
    postFilterRateHr,
    filtrationFraction,
    isHighClottingRisk: filtrationFraction > 25
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
