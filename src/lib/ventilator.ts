/**
 * Lung-protective ventilation maths. Pure functions for testability.
 * Reference: ARDSNet protocol (PBW, tidal volume, PEEP/FiO2 ladders) and the
 * Berlin definition for ARDS severity.
 */

/** ARDSNet predicted body weight (kg). Returns 0 for a missing height. */
export function predictedBodyWeight(heightCm: number, male: boolean): number {
  if (!(heightCm > 0)) return 0;
  const base = male ? 50 : 45.5;
  return Math.max(0, base + 0.91 * (heightCm - 152.4));
}

/** Tidal volume in mL for a target mL/kg of predicted body weight. */
export function tidalVolumeMl(pbwKg: number, mlPerKg: number): number {
  if (!(pbwKg > 0)) return 0;
  return pbwKg * mlPerKg;
}

/** Driving pressure = plateau − PEEP (cmH2O). */
export function drivingPressure(plateauCmH2O: number, peepCmH2O: number): number {
  return plateauCmH2O - peepCmH2O;
}

/** Static compliance (mL/cmH2O) = VT / (Pplat − PEEP). 0 when not computable. */
export function staticCompliance(vtMl: number, plateauCmH2O: number, peepCmH2O: number): number {
  const dp = plateauCmH2O - peepCmH2O;
  if (!(dp > 0) || !(vtMl > 0)) return 0;
  return vtMl / dp;
}

/** PaO2/FiO2 ratio (FiO2 given as a percentage, e.g. 40). */
export function pfRatio(pao2MmHg: number, fio2Percent: number): number {
  if (!(fio2Percent > 0) || !(pao2MmHg > 0)) return 0;
  return pao2MmHg / (fio2Percent / 100);
}

export type ArdsSeverity = 'none' | 'mild' | 'moderate' | 'severe';

/** Berlin definition (requires PEEP/CPAP ≥ 5 cmH2O). */
export function ardsSeverity(pf: number, peepCmH2O: number): ArdsSeverity {
  if (peepCmH2O < 5 || !(pf > 0)) return 'none';
  if (pf <= 100) return 'severe';
  if (pf <= 200) return 'moderate';
  if (pf <= 300) return 'mild';
  return 'none';
}

export const ARDS_SEVERITY_LABEL: Record<ArdsSeverity, string> = {
  none: 'No ARDS by Berlin criteria',
  mild: 'Mild ARDS (P/F 200–300)',
  moderate: 'Moderate ARDS (P/F 100–200)',
  severe: 'Severe ARDS (P/F ≤ 100)',
};

/** Rapid shallow breathing index = RR / VT(L). < 105 predicts weaning success. */
export function rapidShallowBreathingIndex(rr: number, vtMl: number): number {
  const litres = vtMl / 1000;
  if (!(litres > 0) || !(rr > 0)) return 0;
  return rr / litres;
}

export interface PeepRow {
  fio2: number;
  peep: string;
}

/** ARDSNet lower-PEEP / higher-FiO2 ladder (PEEP cmH2O per FiO2). */
export const ARDSNET_LOW_PEEP: PeepRow[] = [
  { fio2: 0.3, peep: '5' },
  { fio2: 0.4, peep: '5–8' },
  { fio2: 0.5, peep: '8–10' },
  { fio2: 0.6, peep: '10' },
  { fio2: 0.7, peep: '10–14' },
  { fio2: 0.8, peep: '14' },
  { fio2: 0.9, peep: '14–18' },
  { fio2: 1.0, peep: '18–24' },
];

/** ARDSNet higher-PEEP / lower-FiO2 ladder (PEEP cmH2O per FiO2). */
export const ARDSNET_HIGH_PEEP: PeepRow[] = [
  { fio2: 0.3, peep: '12' },
  { fio2: 0.4, peep: '14' },
  { fio2: 0.5, peep: '16' },
  { fio2: 0.6, peep: '18' },
  { fio2: 0.7, peep: '18' },
  { fio2: 0.8, peep: '20' },
  { fio2: 0.9, peep: '22' },
  { fio2: 1.0, peep: '22–24' },
];
