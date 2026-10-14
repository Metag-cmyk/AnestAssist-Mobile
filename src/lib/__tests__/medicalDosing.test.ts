import { describe, it, expect } from 'vitest';
import { calculateIBW, calculateBMI, calculateEstimatedCrCl, adjustedBodyWeight } from '../medicalDosing';

describe('calculateIBW', () => {
  it('uses the Devine formula for adult males', () => {
    // 175 cm, male -> 50 + 2.3 * (175/2.54 - 60)
    expect(calculateIBW({ type: 'adult', heightCm: 175, gender: 'male', ageYears: 40 }))
      .toBeCloseTo(70.46, 1);
  });

  it('uses the Devine formula for adult females', () => {
    expect(calculateIBW({ type: 'adult', heightCm: 175, gender: 'female', ageYears: 40 }))
      .toBeCloseTo(65.96, 1);
  });

  it('never returns a negative IBW for short adults', () => {
    expect(calculateIBW({ type: 'adult', heightCm: 140, gender: 'male', ageYears: 40 }))
      .toBeCloseTo(50, 5);
  });

  it('uses the APLS weight-for-age formulas for children 1-5 years', () => {
    expect(calculateIBW({ type: 'pediatric', heightCm: 100, gender: 'male', ageYears: 3 }))
      .toBe(14);
  });

  it('uses the APLS weight-for-age formulas for children 6-12 years', () => {
    expect(calculateIBW({ type: 'pediatric', heightCm: 130, gender: 'male', ageYears: 8 }))
      .toBe(31);
  });

  it('uses the infant estimate for children under 1 year', () => {
    expect(calculateIBW({ type: 'pediatric', heightCm: 70, gender: 'female', ageYears: 0.75 }))
      .toBeCloseTo(4.375, 3);
  });
});

describe('calculateBMI', () => {
  it('classifies an average adult as normal weight', () => {
    const { bmi, category } = calculateBMI(70, 175, 'adult', 40);
    expect(bmi).toBeCloseTo(22.86, 2);
    expect(category).toBe('Normal weight');
  });

  it('classifies an adult with BMI >= 30 as obese', () => {
    expect(calculateBMI(95, 170, 'adult', 40).category).toBe('Obese');
  });

  it('uses percentile categories for pediatric patients', () => {
    expect(calculateBMI(20, 110, 'pediatric', 4).category)
      .toBe('5th - 85th Percentile (Healthy)');
  });
});

describe('calculateEstimatedCrCl', () => {
  it('applies Cockcroft-Gault for adult males', () => {
    expect(calculateEstimatedCrCl({
      type: 'adult', ageYears: 30, weightKg: 70, gender: 'male', heightCm: 175,
    })).toBeCloseTo(118.83, 1);
  });

  it('applies the 0.85 female factor for adult females', () => {
    expect(calculateEstimatedCrCl({
      type: 'adult', ageYears: 30, weightKg: 70, gender: 'female', heightCm: 175,
    })).toBeCloseTo(101.0, 1);
  });

  it('clamps implausibly high clearance to 200 mL/min', () => {
    expect(calculateEstimatedCrCl({
      type: 'adult', ageYears: 10, weightKg: 500, gender: 'male', heightCm: 180,
    })).toBe(200);
  });

  it('uses the Bedside Schwartz formula for children', () => {
    expect(calculateEstimatedCrCl({
      type: 'pediatric', ageYears: 5, weightKg: 18, gender: 'male', heightCm: 100,
    })).toBeCloseTo(103.25, 2);
  });
});

describe('adjustedBodyWeight', () => {
  it('adds 40% of the excess over IBW in obesity', () => {
    expect(adjustedBodyWeight(70, 120)).toBeCloseTo(90, 5); // 70 + 0.4 * 50
  });

  it('returns TBW when the patient is not above IBW', () => {
    expect(adjustedBodyWeight(70, 65)).toBe(65);
    expect(adjustedBodyWeight(70, 70)).toBe(70);
  });

  it('falls back to TBW when IBW is unknown', () => {
    expect(adjustedBodyWeight(0, 80)).toBe(80);
  });
});
