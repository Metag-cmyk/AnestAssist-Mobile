import { describe, it, expect } from 'vitest';
import {
  convertAmount,
  concentrationPerMl,
  prepConcentrationPerMl,
  rateMlPerHour,
  doseFromRate,
  doseReadout,
  formatDoseUnit,
  roundToIncrement,
} from '../infusionRates';

describe('convertAmount', () => {
  it('converts mg to mcg and back', () => {
    expect(convertAmount(1, 'mg', 'mcg')).toBe(1000);
    expect(convertAmount(500, 'mcg', 'mg')).toBe(0.5);
  });

  it('is a no-op for the same unit', () => {
    expect(convertAmount(7, 'units', 'units')).toBe(7);
  });

  it('returns NaN for cross-dimension conversions', () => {
    expect(convertAmount(1, 'units', 'mcg')).toBeNaN();
  });
});

describe('concentration helpers', () => {
  it('divides amount by volume', () => {
    expect(concentrationPerMl(4, 40)).toBeCloseTo(0.1, 6);
  });

  it('guards against zero volume', () => {
    expect(concentrationPerMl(4, 0)).toBe(0);
  });

  it('converts the preparation into the dose unit before dividing', () => {
    // 4 mg / 40 mL expressed for a mcg-based dose == 100 mcg/mL
    expect(prepConcentrationPerMl({ amount: 4, amountUnit: 'mg', volumeMl: 40 }, 'mcg')).toBeCloseTo(100, 6);
  });

  it('returns 0 when the preparation unit is incompatible with the dose unit', () => {
    expect(prepConcentrationPerMl({ amount: 10, amountUnit: 'units', volumeMl: 10 }, 'mcg')).toBe(0);
  });
});

describe('rateMlPerHour', () => {
  it('handles mcg/kg/min (norepinephrine 4mg/40mL)', () => {
    const concPerMl = prepConcentrationPerMl({ amount: 4, amountUnit: 'mg', volumeMl: 40 }, 'mcg');
    const rate = rateMlPerHour({
      doseAmount: 0.1, unit: { amount: 'mcg', time: 'min', perKg: true }, weightKg: 70, concPerMl,
    });
    expect(rate).toBeCloseTo(4.2, 6); // 0.1 * 60 * 70 / 100
  });

  it('handles mg/kg/h (propofol regression: included patient weight)', () => {
    const rate = rateMlPerHour({
      doseAmount: 2, unit: { amount: 'mg', time: 'h', perKg: true }, weightKg: 70, concPerMl: 10,
    });
    expect(rate).toBeCloseTo(14, 6); // (2 * 70) / 10 — previously computed as 0.2
  });

  it('handles mcg/kg/h (dexmedetomidine 200mcg/50mL)', () => {
    const concPerMl = prepConcentrationPerMl({ amount: 200, amountUnit: 'mcg', volumeMl: 50 }, 'mcg');
    const rate = rateMlPerHour({
      doseAmount: 0.5, unit: { amount: 'mcg', time: 'h', perKg: true }, weightKg: 80, concPerMl,
    });
    expect(rate).toBeCloseTo(10, 6); // (0.5 * 80) / 4 = 40 / 4
  });

  it('handles non-mass units/min (vasopressin)', () => {
    const rate = rateMlPerHour({
      doseAmount: 0.03, unit: { amount: 'units', time: 'min', perKg: false }, weightKg: 0, concPerMl: 20,
    });
    expect(rate).toBeCloseTo(0.09, 6); // 0.03 * 60 / 20
  });

  it('handles non-mass units/kg/h (heparin)', () => {
    const rate = rateMlPerHour({
      doseAmount: 12, unit: { amount: 'units', time: 'h', perKg: true }, weightKg: 80, concPerMl: 100,
    });
    expect(rate).toBeCloseTo(9.6, 6); // (12 * 80) / 100
  });

  it('returns 0 when weight is required but missing', () => {
    expect(rateMlPerHour({
      doseAmount: 0.1, unit: { amount: 'mcg', time: 'min', perKg: true }, weightKg: 0, concPerMl: 100,
    })).toBe(0);
  });

  it('returns 0 for a non-positive concentration', () => {
    expect(rateMlPerHour({
      doseAmount: 0.1, unit: { amount: 'mcg', time: 'min', perKg: true }, weightKg: 70, concPerMl: 0,
    })).toBe(0);
  });
});

describe('doseFromRate', () => {
  const unit = { amount: 'mcg', time: 'min', perKg: true } as const;

  it('is the inverse of rateMlPerHour', () => {
    const concPerMl = 100;
    const rate = rateMlPerHour({ doseAmount: 0.1, unit, weightKg: 70, concPerMl });
    expect(doseFromRate({ rateMlPerHour: rate, unit, weightKg: 70, concPerMl })).toBeCloseTo(0.1, 6);
  });

  it('round-trips a propofol rate back to a dose', () => {
    const u = { amount: 'mg', time: 'h', perKg: true } as const;
    expect(doseFromRate({ rateMlPerHour: 14, unit: u, weightKg: 70, concPerMl: 10 })).toBeCloseTo(2, 6);
  });

  it('returns 0 when weight is missing for a per-kg dose', () => {
    expect(doseFromRate({ rateMlPerHour: 5, unit, weightKg: 0, concPerMl: 100 })).toBe(0);
  });
});

describe('doseReadout', () => {
  it('produces equivalent mass representations', () => {
    const r = doseReadout(0.1, { amount: 'mcg', time: 'min', perKg: true }, 70);
    expect(r.mcgPerKgMin).toBeCloseTo(0.1, 6);
    expect(r.mcgPerKgHr).toBeCloseTo(6, 6);
    expect(r.mgPerHr).toBeCloseTo(0.42, 6);
  });

  it('passes "units" through without mass conversion', () => {
    const r = doseReadout(0.03, { amount: 'units', time: 'min', perKg: false }, 0);
    expect(r.unitsPerMin).toBeCloseTo(0.03, 6);
    expect(r.unitsPerHr).toBeCloseTo(1.8, 6);
    expect(r.mcgPerKgMin).toBeUndefined();
  });
});

describe('formatDoseUnit', () => {
  it('renders human-readable dose units', () => {
    expect(formatDoseUnit({ amount: 'mcg', time: 'min', perKg: true })).toBe('mcg/kg/min');
    expect(formatDoseUnit({ amount: 'mg', time: 'h', perKg: true })).toBe('mg/kg/h');
    expect(formatDoseUnit({ amount: 'units', time: 'min', perKg: false })).toBe('units/min');
  });
});

describe('roundToIncrement', () => {
  it('rounds to the nearest pump increment', () => {
    expect(roundToIncrement(14.04, 0.1)).toBeCloseTo(14.0, 5);
    expect(roundToIncrement(14.06, 0.1)).toBeCloseTo(14.1, 5);
    expect(roundToIncrement(14.23, 0.01)).toBeCloseTo(14.23, 5);
  });

  it('rounds to whole mL when the increment is 1', () => {
    expect(roundToIncrement(14.6, 1)).toBe(15);
  });

  it('returns the value unchanged for a non-positive increment', () => {
    expect(roundToIncrement(14.23, 0)).toBe(14.23);
  });
});
