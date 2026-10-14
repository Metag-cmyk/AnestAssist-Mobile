/**
 * Unit-safe infusion rate mathematics.
 *
 * Design principle: concentration is always expressed in the SAME amount unit
 * as the dose (e.g. a dose in mcg/kg/min uses a concentration in mcg/mL). This
 * removes every unit-conversion branch from the callers and makes non-mass
 * units (heparin/insulin "units", vasopressin) work with no special-casing.
 */

export type AmountUnit = 'mcg' | 'mg' | 'units';
export type TimeUnit = 'min' | 'h';

export interface DoseUnit {
  amount: AmountUnit;
  time: TimeUnit;
  perKg: boolean;
}

const MCG_PER_MG = 1000;

/** Converts a mass between mcg and mg. Returns NaN for incompatible (units) conversions. */
export function convertAmount(value: number, from: AmountUnit, to: AmountUnit): number {
  if (from === to) return value;
  if (from === 'units' || to === 'units') return NaN;
  const inMcg = from === 'mg' ? value * MCG_PER_MG : value;
  return to === 'mg' ? inMcg / MCG_PER_MG : inMcg;
}

/** Concentration in `amountUnit` per mL, from a preparation of `amount` in `volumeMl`. */
export function concentrationPerMl(amount: number, volumeMl: number): number {
  if (!(volumeMl > 0)) return 0;
  return amount / volumeMl;
}

/**
 * Concentration to pair with a dose: converts the preparation amount into the
 * dose's amount unit first, so the two always share a dimension.
 */
export function prepConcentrationPerMl(
  prep: { amount: number; amountUnit: AmountUnit; volumeMl: number },
  doseAmountUnit: AmountUnit,
): number {
  const converted = convertAmount(prep.amount, prep.amountUnit, doseAmountUnit);
  if (!Number.isFinite(converted)) return 0;
  return concentrationPerMl(converted, prep.volumeMl);
}

/** Dose expressed as an absolute per-hour quantity, in the dose's amount unit. */
export function doseToAmountPerHour(doseAmount: number, unit: DoseUnit, weightKg: number): number {
  const perHour = unit.time === 'min' ? 60 : 1;
  const weight = unit.perKg ? weightKg : 1;
  return doseAmount * perHour * weight;
}

/** Pump rate (mL/h) required to deliver `doseAmount`. Returns 0 for invalid inputs. */
export function rateMlPerHour(params: {
  doseAmount: number;
  unit: DoseUnit;
  weightKg: number;
  concPerMl: number;
}): number {
  const { doseAmount, unit, weightKg, concPerMl } = params;
  if (!(concPerMl > 0)) return 0;
  if (unit.perKg && !(weightKg > 0)) return 0;
  return doseToAmountPerHour(doseAmount, unit, weightKg) / concPerMl;
}

/** Inverse of {@link rateMlPerHour}: the dose delivered by a running pump rate. */
export function doseFromRate(params: {
  rateMlPerHour: number;
  unit: DoseUnit;
  weightKg: number;
  concPerMl: number;
}): number {
  const { rateMlPerHour: rate, unit, weightKg, concPerMl } = params;
  const perHour = unit.time === 'min' ? 60 : 1;
  const weight = unit.perKg ? weightKg : 1;
  const denom = perHour * weight;
  if (!(denom > 0) || !(concPerMl > 0)) return 0;
  return (rate * concPerMl) / denom;
}

export interface DoseReadout {
  mcgPerKgMin?: number;
  mcgPerKgHr?: number;
  mgPerHr?: number;
  unitsPerMin?: number;
  unitsPerHr?: number;
}

/**
 * All equivalent representations of a dose in the same output object.
 * Mass units are cross-converted; "units" are passed through as units/min & units/h.
 */
export function doseReadout(doseAmount: number, unit: DoseUnit, weightKg: number): DoseReadout {
  const perHour = doseToAmountPerHour(doseAmount, unit, weightKg);

  if (unit.amount === 'units') {
    return { unitsPerHr: perHour, unitsPerMin: perHour / 60 };
  }

  const mgPerHr = unit.amount === 'mg' ? perHour : perHour / MCG_PER_MG;
  const mcgPerHr = mgPerHr * MCG_PER_MG;
  const out: DoseReadout = { mgPerHr };
  if (weightKg > 0) {
    out.mcgPerKgMin = mcgPerHr / 60 / weightKg;
    out.mcgPerKgHr = mcgPerHr / weightKg;
  }
  return out;
}

/** Human label for a dose unit, e.g. "mcg/kg/min", "mg/kg/h", "units/min". */
export function formatDoseUnit(unit: DoseUnit): string {
  return `${unit.amount}${unit.perKg ? '/kg' : ''}/${unit.time}`;
}

/** Rounds a pump rate to the nearest programmable increment (e.g. 0.1 mL/h). */
export function roundToIncrement(value: number, increment: number): number {
  if (!(increment > 0)) return value;
  return Math.round(value / increment) * increment;
}
