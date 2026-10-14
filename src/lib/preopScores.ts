/**
 * Pre-operative risk scores used by the Pre-op Assessment module.
 *
 * Pure functions only — no React, no data imports — so they can be unit-tested
 * and audited. Weights follow the original publications:
 *  - ASA-PS (physical status, I–VI)
 *  - RCRI / Lee's Revised Cardiac Risk Index (MACE risk)
 *  - ARISCAT (postoperative pulmonary complications; Canet 2010)
 *  - STOP-BANG (obstructive sleep apnoea)
 *  - Apfel (postoperative nausea & vomiting)
 */

export type RiskBand = 'low' | 'intermediate' | 'high';

export interface ScoredResult {
  score: number;
  band: RiskBand;
  /** Free-text interpretation shown to the user. */
  interpretation: string;
}

// ---------------------------------------------------------------------------
// ASA Physical Status
// ---------------------------------------------------------------------------

export const ASA_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: 'ASA 1 — Healthy patient' },
  { value: 2, label: 'ASA 2 — Mild systemic disease' },
  { value: 3, label: 'ASA 3 — Severe systemic disease' },
  { value: 4, label: 'ASA 4 — Severe disease, constant threat to life' },
  { value: 5, label: 'ASA 5 — Moribund, not expected to survive without surgery' },
  { value: 6, label: 'ASA 6 — Brain-dead organ donor' },
];

// ---------------------------------------------------------------------------
// Functional capacity (METs)
// ---------------------------------------------------------------------------

export type MetsLevel = 'poor' | 'moderate' | 'good';

export const METS_OPTIONS: { value: MetsLevel; label: string; note: string }[] = [
  { value: 'poor', label: '< 4 METs', note: 'Climbing a flight of stairs or walking uphill is difficult — high perioperative risk, consider CPET/optimisation.' },
  { value: 'moderate', label: '4 – 6 METs', note: 'Can climb stairs / walk briskly — intermediate functional capacity.' },
  { value: 'good', label: '> 6 METs', note: 'Can run / heavy housework — good functional capacity.' },
];

// ---------------------------------------------------------------------------
// RCRI (Revised Cardiac Risk Index)
// ---------------------------------------------------------------------------

export interface RcriInput {
  highRiskSurgery: boolean;
  ischemicHeartDisease: boolean;
  heartFailure: boolean;
  cerebrovascularDisease: boolean;
  insulinDiabetes: boolean;
  creatinineOver2: boolean;
}

export const RCRI_FACTORS: { id: keyof RcriInput; label: string }[] = [
  { id: 'highRiskSurgery', label: 'High-risk surgery (intraperitoneal, intrathoracic, or suprainguinal vascular)' },
  { id: 'ischemicHeartDisease', label: 'Ischaemic heart disease' },
  { id: 'heartFailure', label: 'Congestive heart failure' },
  { id: 'cerebrovascularDisease', label: 'Cerebrovascular disease' },
  { id: 'insulinDiabetes', label: 'Diabetes requiring insulin' },
  { id: 'creatinineOver2', label: 'Creatinine > 2.0 mg/dL (177 µmol/L)' },
];

const RCRI_MACE: Record<number, string> = {
  0: '0.4%',
  1: '0.9%',
  2: '6.6%',
  3: '11%',
};

export function rcri(input: RcriInput): ScoredResult {
  const score = RCRI_FACTORS.reduce((sum, f) => sum + (input[f.id] ? 1 : 0), 0);
  const band: RiskBand = score === 0 ? 'low' : score === 1 ? 'intermediate' : 'high';
  const prob = RCRI_MACE[Math.min(score, 3)];
  const interpretation = score >= 2
    ? `Elevated risk (~${prob} MACE). Consider cardiology review and delaying/optimising where appropriate.`
    : score === 1
    ? `Low-but-not-negligible risk (~${prob} MACE). Continue optimised medical therapy.`
    : `Low risk (~${prob} MACE).`;
  return { score, band, interpretation };
}

// ---------------------------------------------------------------------------
// ARISCAT (postoperative pulmonary complications)
// ---------------------------------------------------------------------------

export type AriscatIncision = 'peripheral' | 'upper-abdominal' | 'intrathoracic';
export type AriscatDuration = 'lt2' | '2to3' | 'gt3';

export interface AriscatInput {
  age: number;
  spo2: number;
  respiratoryInfection: boolean;
  anemia: boolean;
  incision: AriscatIncision;
  duration: AriscatDuration;
  emergency: boolean;
}

export function ariscat(input: AriscatInput): ScoredResult {
  let score = 0;
  score += input.age <= 50 ? 0 : input.age <= 80 ? 3 : 16;
  score += input.spo2 >= 96 ? 0 : input.spo2 >= 91 ? 8 : 24;
  score += input.respiratoryInfection ? 17 : 0;
  score += input.anemia ? 11 : 0;
  score += input.incision === 'intrathoracic' ? 24 : input.incision === 'upper-abdominal' ? 15 : 0;
  score += input.duration === 'gt3' ? 23 : input.duration === '2to3' ? 16 : 0;
  score += input.emergency ? 8 : 0;

  if (score >= 45) {
    return { score, band: 'high', interpretation: 'High risk of postoperative pulmonary complications (~38%). Preoperative respiratory optimisation and postoperative physiotherapy/analgesia planning advised.' };
  }
  if (score >= 26) {
    return { score, band: 'intermediate', interpretation: 'Intermediate risk of postoperative pulmonary complications (~13%).' };
  }
  return { score, band: 'low', interpretation: 'Low risk of postoperative pulmonary complications (~1.6%).' };
}

// ---------------------------------------------------------------------------
// STOP-BANG (obstructive sleep apnoea)
// ---------------------------------------------------------------------------

export interface StopBangInput {
  snoring: boolean;
  tiredness: boolean;
  observedApnea: boolean;
  pressure: boolean;
  bmiOver35: boolean;
  ageOver50: boolean;
  neckOver40: boolean;
  male: boolean;
}

export const STOP_BANG_FACTORS: { id: keyof StopBangInput; label: string }[] = [
  { id: 'snoring', label: 'Snoring — loud enough to be heard through a closed door' },
  { id: 'tiredness', label: 'Tiredness / daytime sleepiness' },
  { id: 'observedApnea', label: 'Observed apnoea / choking / gasping during sleep' },
  { id: 'pressure', label: 'Treated hypertension / high blood pressure' },
  { id: 'bmiOver35', label: 'BMI > 35 kg/m²' },
  { id: 'ageOver50', label: 'Age > 50 years' },
  { id: 'neckOver40', label: 'Neck circumference > 40 cm' },
  { id: 'male', label: 'Male gender' },
];

export function stopBang(input: StopBangInput): ScoredResult {
  const score = STOP_BANG_FACTORS.reduce((sum, f) => sum + (input[f.id] ? 1 : 0), 0);
  if (score >= 5) {
    return { score, band: 'high', interpretation: 'High risk of OSA. Consider preoperative sleep study, and plan postoperative CPAP, monitoring and opioid-sparing analgesia.' };
  }
  if (score >= 3) {
    return { score, band: 'intermediate', interpretation: 'Intermediate risk of OSA. Anticipate difficult mask ventilation and monitor postoperatively.' };
  }
  return { score, band: 'low', interpretation: 'Low risk of OSA.' };
}

// ---------------------------------------------------------------------------
// Apfel (PONV)
// ---------------------------------------------------------------------------

export interface ApfelInput {
  female: boolean;
  nonSmoker: boolean;
  historyPonv: boolean;
  postopOpioids: boolean;
}

export const APFEL_FACTORS: { id: keyof ApfelInput; label: string }[] = [
  { id: 'female', label: 'Female gender' },
  { id: 'nonSmoker', label: 'Non-smoker' },
  { id: 'historyPonv', label: 'History of PONV or motion sickness' },
  { id: 'postopOpioids', label: 'Planned postoperative opioids' },
];

const APFEL_RISK = [10, 20, 40, 60, 80];

export function apfel(input: ApfelInput): ScoredResult & { riskPercent: number } {
  const score = APFEL_FACTORS.reduce((sum, f) => sum + (input[f.id] ? 1 : 0), 0);
  const riskPercent = APFEL_RISK[score];
  const band: RiskBand = score >= 3 ? 'high' : score === 2 ? 'intermediate' : 'low';
  const prophylaxis = score >= 2 ? 'Give ≥ 2 antiemetics from different classes (e.g. ondansetron + dexamethasone) and consider TIVA.' : 'Consider single-agent prophylaxis.';
  return { score, riskPercent, band, interpretation: `~${riskPercent}% baseline PONV risk. ${prophylaxis}` };
}

// ---------------------------------------------------------------------------
// Airway (condensed bedside predictors)
// ---------------------------------------------------------------------------

export type MallampatiClass = 1 | 2 | 3 | 4;
export type ThyromentalBand = 'gt6.5' | '6to6.5' | 'lt6';
export type MouthOpeningBand = 'gt4' | '3to4' | 'lt3';
export type NeckMobility = 'normal' | 'reduced' | 'severe';

export interface AirwayInput {
  mallampati: MallampatiClass;
  thyromental: ThyromentalBand;
  mouthOpening: MouthOpeningBand;
  neckMobility: NeckMobility;
  priorDifficulty: boolean;
}

export function airwayRisk(input: AirwayInput): ScoredResult {
  let score = 0;
  score += input.mallampati === 4 ? 3 : input.mallampati === 3 ? 2 : input.mallampati === 2 ? 1 : 0;
  score += input.thyromental === 'lt6' ? 2 : input.thyromental === '6to6.5' ? 1 : 0;
  score += input.mouthOpening === 'lt3' ? 2 : input.mouthOpening === '3to4' ? 1 : 0;
  score += input.neckMobility === 'severe' ? 2 : input.neckMobility === 'reduced' ? 1 : 0;
  score += input.priorDifficulty ? 3 : 0;

  if (score >= 5) {
    return { score, band: 'high', interpretation: 'High difficult-airway risk. Prepare for awake fibreoptic or video-assisted technique, have a plan A–D and senior/ENT support.' };
  }
  if (score >= 3) {
    return { score, band: 'intermediate', interpretation: 'Moderate difficult-airway risk. Videolaryngoscopy first-line, second-generation SGA and bougie at the bedside.' };
  }
  return { score, band: 'low', interpretation: 'Low predicted airway difficulty.' };
}
