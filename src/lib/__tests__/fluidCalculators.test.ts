import { describe, it, expect } from 'vitest';
import {
  pulsePressureVariation, correctedCalcium, correctedSodium, sodiumDeficitMmol,
} from '../fluidCalculators';

describe('pulsePressureVariation', () => {
  it('computes PPV as a percentage of the mean pulse pressure', () => {
    expect(pulsePressureVariation(140, 100)).toBeCloseTo(33.33, 2);
    expect(pulsePressureVariation(120, 110)).toBeCloseTo(8.7, 1);
  });

  it('returns 0 for invalid inputs', () => {
    expect(pulsePressureVariation(0, 100)).toBe(0);
    expect(pulsePressureVariation(100, 140)).toBe(0);
  });
});

describe('correctedCalcium', () => {
  it('corrects for albumin using Ca + 0.8*(4 - albumin)', () => {
    expect(correctedCalcium(8.0, 3.0)).toBeCloseTo(8.8, 5);
    expect(correctedCalcium(9.0, 4.0)).toBeCloseTo(9.0, 5);
  });
});

describe('correctedSodium', () => {
  it('corrects for hyperglycaemia', () => {
    expect(correctedSodium(135, 600)).toBeCloseTo(143, 5); // +0.016*500
    expect(correctedSodium(140, 100)).toBeCloseTo(140, 5);
  });
});

describe('sodiumDeficitMmol', () => {
  it('estimates the deficit using total body water', () => {
    expect(sodiumDeficitMmol(70, 120, 130, 0.6)).toBeCloseTo(420, 5);
  });

  it('returns 0 when no correction is needed or inputs are invalid', () => {
    expect(sodiumDeficitMmol(70, 140, 130, 0.6)).toBe(0);
    expect(sodiumDeficitMmol(0, 120, 130, 0.6)).toBe(0);
  });
});
