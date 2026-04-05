/**
 * Nutrition Calculators for Critical Care
 * Based on ESPEN/ASPEN 2022/2023 Guidelines
 */

export interface BMRParams {
  weightKg: number;
  heightCm: number;
  age: number;
  isMale: boolean;
}

export function calculateMifflinStJeor(params: BMRParams): number {
  const { weightKg, heightCm, age, isMale } = params;
  if (!weightKg || !heightCm || !age) return 0;
  
  const base = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  return isMale ? base + 5 : base - 161;
}

export function calculatePennState(bmr: number, tMax: number, vE: number): number {
  if (!bmr || !tMax || !vE) return 0;
  // PSU 2003b (vE in L/min, Tmax in Celsius)
  return (bmr * 0.96) + (tMax * 167) + (vE * 31) - 6212;
}

export interface ProteinParams {
  weightKg: number;
  bmi: number;
  isRRT: boolean;
  activityLevel?: 'low' | 'standard' | 'high'; // high = trauma/burns
}

export function calculateProteinTargets(params: ProteinParams) {
  const { weightKg, bmi, isRRT, activityLevel = 'standard' } = params;
  if (!weightKg) return { min: 0, max: 0, doseGkg: 0 };

  let baseDose = 1.3; // ESPEN standard
  if (activityLevel === 'high') baseDose = 2.0;
  if (isRRT) baseDose += 0.5; // Account for RRT protein loss

  // Obesity Adjustments (ASPEN 2016/2022)
  if (bmi >= 30) {
    if (bmi < 40) baseDose = 2.0; // g/kg IBW or similar
    else baseDose = 2.5; // g/kg IBW
  }

  return {
    min: weightKg * baseDose,
    max: weightKg * (baseDose + 0.3),
    doseGkg: baseDose
  }
}

export interface NUTRICParams {
  age: number;
  apacheII: number;
  sofa: number;
  comorbidities: number;
  daysInHospitalPreICU: number;
}

export function calculateNUTRIC(params: NUTRICParams) {
  let score = 0;

  // Age
  if (params.age >= 75) score += 2;
  else if (params.age >= 50) score += 1;

  // APACHE II
  if (params.apacheII >= 28) score += 3;
  else if (params.apacheII >= 20) score += 2;
  else if (params.apacheII >= 15) score += 1;

  // SOFA
  if (params.sofa >= 10) score += 2;
  else if (params.sofa >= 6) score += 1;

  // Comorbidities
  if (params.comorbidities >= 2) score += 1;

  // Days in Hospital
  if (params.daysInHospitalPreICU >= 1) score += 1;

  return {
    score,
    isHighRisk: score >= 5,
    recommendation: score >= 5 
      ? 'High Nutritional Risk: Accelerated nutrition support likely benefits mortality.' 
      : 'Low Nutritional Risk: Standard nutrition support recommended.'
  };
}

export const RefeedingChecklist = [
  { id: 'bmi', label: 'BMI < 16 kg/m²', risk: 'High' },
  { id: 'weightLoss', label: 'Unintentional wt loss > 15% in 3-6mo', risk: 'High' },
  { id: 'starvation', label: 'Little/No intake for > 10 days', risk: 'High' },
  { id: 'electrolytes', label: 'Low K+, PO4-, or Mg++ prior to feed', risk: 'Criteria' },
  { id: 'alcohol', label: 'History of alcohol abuse or chemotherapy', risk: 'Moderate' },
];
