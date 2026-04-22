import { Gender } from '../contexts/PatientContext';

export interface DrugDose {
  name: string;
  dose: string;
  calculatedDose: string;
  indication: string;
  infusionRates?: {
    mcgKgMin: string;
    mcgKgHr: string;
    mgHr: string;
  };
  notes?: string;
}

export type PatientType = 'adult' | 'pediatric' | 'neonatal';

/**
 * Calculates Ideal Body Weight (IBW) based on height, gender, and age.
 */
export function calculateIBW(params: {
  type: PatientType;
  heightCm: number;
  gender: Gender;
  ageYears: number;
}) {
  const { type, heightCm, gender, ageYears } = params;
  let ibwValue = 0;

  if (type === 'adult') {
    const heightInInches = heightCm / 2.54;
    const inchesOver5ft = Math.max(0, heightInInches - 60);
    ibwValue = gender === 'male' ? 50 + 2.3 * inchesOver5ft : 45.5 + 2.3 * inchesOver5ft;
  } else if (type === 'neonatal' || (type === 'pediatric' && ageYears < 1)) {
    // APLS/WHO approximations for infants
    const ageMonths = type === 'neonatal' ? ageYears / 30 : ageYears;
    ibwValue = (0.5 * ageMonths) + 4;
  } else {
    if (ageYears >= 1 && ageYears <= 5) {
      ibwValue = (ageYears * 2) + 8;
    } else if (ageYears >= 6 && ageYears <= 12) {
      ibwValue = (ageYears * 3) + 7;
    } else {
      const heightInInches = heightCm / 2.54;
      const inchesOver5ft = Math.max(0, heightInInches - 60);
      ibwValue = gender === 'male' ? 50 + 2.3 * inchesOver5ft : 45.5 + 2.3 * inchesOver5ft;
    }
  }

  return ibwValue;
}

/**
 * Calculates BMI and associated category.
 */
export function calculateBMI(weightKg: number, heightCm: number, type: PatientType, ageYears: number) {
  const heightInMeters = heightCm / 100;
  const bmi = weightKg / (heightInMeters * heightInMeters);
  let category = "";

  if (type === 'adult') {
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";
  } else {
    if (bmi < 14) category = "< 5th Percentile (Underweight)";
    else if (bmi < 18) category = "5th - 85th Percentile (Healthy)";
    else if (bmi < 21) category = "85th - 95th Percentile (Overweight)";
    else category = "> 95th Percentile (Obese)";
  }

  return { bmi: bmi.toFixed(1), category };
}

/**
 * Calculates Estimated CrCl (Cockcroft-Gault for adults, Schwartz for peds).
 */
export function calculateEstimatedCrCl(params: {
  type: PatientType;
  ageYears: number;
  weightKg: number;
  gender: Gender;
  heightCm: number;
}) {
  const { type, ageYears, weightKg, gender, heightCm } = params;
  let baseCrcl = 120;

  if (type === 'adult') {
    const assumedScr = 0.9;
    let cg = ((140 - ageYears) * weightKg) / (72 * assumedScr);
    if (gender === 'female') cg = cg * 0.85;
    baseCrcl = Math.max(10, Math.min(200, cg));
  } else {
    const assumedScr = 0.4;
    baseCrcl = (0.413 * heightCm) / assumedScr;
    baseCrcl = Math.max(10, Math.min(200, baseCrcl));
  }

  return baseCrcl;
}
