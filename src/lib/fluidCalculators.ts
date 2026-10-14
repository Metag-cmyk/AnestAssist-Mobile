/**
 * Fluid-responsiveness and electrolyte correction maths. Pure functions.
 */

/**
 * Pulse-pressure variation (%). A dynamic marker of fluid responsiveness in a
 * mechanically ventilated patient in sinus rhythm (rule of thumb: > 13%).
 */
export function pulsePressureVariation(ppMaxMmHg: number, ppMinMmHg: number): number {
  if (!(ppMaxMmHg > 0) || !(ppMinMmHg > 0) || ppMaxMmHg < ppMinMmHg) return 0;
  const mean = (ppMaxMmHg + ppMinMmHg) / 2;
  if (!(mean > 0)) return 0;
  return ((ppMaxMmHg - ppMinMmHg) / mean) * 100;
}

/** Albumin-corrected calcium (mg/dL). Formula: Ca + 0.8 × (4.0 − albumin g/dL). */
export function correctedCalcium(measuredCalciumMgDl: number, albuminGDl: number): number {
  return measuredCalciumMgDl + 0.8 * (4.0 - albuminGDl);
}

/** Glucose-corrected sodium (mmol/L). Formula: Na + 0.016 × (glucose mg/dL − 100). */
export function correctedSodium(measuredSodiumMmol: number, glucoseMgDl: number): number {
  return measuredSodiumMmol + 0.016 * (glucoseMgDl - 100);
}

/** Estimated sodium deficit (mmol) to reach a target Na over a given rise. */
export function sodiumDeficitMmol(weightKg: number, currentNaMmol: number, targetNaMmol: number, totalBodyWaterFraction = 0.6): number {
  if (!(weightKg > 0) || !(targetNaMmol > currentNaMmol)) return 0;
  return (targetNaMmol - currentNaMmol) * totalBodyWaterFraction * weightKg;
}
