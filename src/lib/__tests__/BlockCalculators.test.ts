import { describe, it, expect } from 'vitest';
import { LA_AGENTS, calculateMaxLADose, doseToVolume } from '../BlockCalculators';

describe('LA_AGENTS', () => {
  it('exposes the expected weight-based ceilings', () => {
    expect(LA_AGENTS.lidocaine.maxDoseKg).toBe(5);
    expect(LA_AGENTS.bupivacaine.maxDoseKg).toBe(2);
    expect(LA_AGENTS.ropivacaine.maxDoseKg).toBe(3);
    expect(LA_AGENTS.levobupivacaine.maxDoseKg).toBe(2);
  });
});

describe('calculateMaxLADose', () => {
  it('multiplies weight by the plain mg/kg limit', () => {
    expect(calculateMaxLADose(70, 'lidocaine', false)).toBe(350);
  });

  it('uses the higher limit when epinephrine is added', () => {
    expect(calculateMaxLADose(70, 'lidocaine', true)).toBe(490);
    expect(calculateMaxLADose(70, 'bupivacaine', true)).toBe(175);
  });

  it('returns 0 for an unknown agent', () => {
    expect(calculateMaxLADose(70, 'not-a-drug', false)).toBe(0);
  });

  it('scales inversely with patient weight', () => {
    expect(calculateMaxLADose(10, 'ropivacaine', false)).toBe(30);
  });
});

describe('doseToVolume', () => {
  it('converts mg to mL at 1% (10 mg/mL)', () => {
    expect(doseToVolume(350, 1)).toBeCloseTo(35, 5);
  });

  it('treats 0.5% as 5 mg/mL', () => {
    expect(doseToVolume(100, 0.5)).toBeCloseTo(20, 5);
  });

  it('guards against non-positive concentrations', () => {
    expect(doseToVolume(100, 0)).toBe(0);
    expect(doseToVolume(100, -1)).toBe(0);
  });
});
