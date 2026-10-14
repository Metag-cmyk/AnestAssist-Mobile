import { describe, it, expect } from 'vitest';
import {
  predictedBodyWeight, tidalVolumeMl, drivingPressure, staticCompliance,
  pfRatio, ardsSeverity, rapidShallowBreathingIndex,
  ARDSNET_LOW_PEEP, ARDSNET_HIGH_PEEP,
} from '../ventilator';

describe('predictedBodyWeight', () => {
  it('uses the ARDSNet formula for males and females', () => {
    expect(predictedBodyWeight(175, true)).toBeCloseTo(70.57, 1);
    expect(predictedBodyWeight(175, false)).toBeCloseTo(66.07, 1);
  });

  it('returns 0 for a missing height', () => {
    expect(predictedBodyWeight(0, true)).toBe(0);
  });
});

describe('tidalVolumeMl', () => {
  it('scales PBW by mL/kg', () => {
    expect(tidalVolumeMl(70, 6)).toBeCloseTo(420, 5);
    expect(tidalVolumeMl(70, 8)).toBeCloseTo(560, 5);
  });

  it('returns 0 without a PBW', () => {
    expect(tidalVolumeMl(0, 6)).toBe(0);
  });
});

describe('drivingPressure / staticCompliance', () => {
  it('computes driving pressure as Pplat − PEEP', () => {
    expect(drivingPressure(25, 8)).toBe(17);
  });

  it('computes static compliance in mL/cmH2O', () => {
    expect(staticCompliance(420, 25, 8)).toBeCloseTo(24.71, 2);
  });

  it('returns 0 when Pplat <= PEEP', () => {
    expect(staticCompliance(420, 8, 8)).toBe(0);
  });
});

describe('pfRatio / ardsSeverity', () => {
  it('computes the P/F ratio from PaO2 and FiO2 %', () => {
    expect(pfRatio(80, 40)).toBeCloseTo(200, 5);
  });

  it('classifies Berlin severity', () => {
    expect(ardsSeverity(250, 10)).toBe('mild');
    expect(ardsSeverity(150, 10)).toBe('moderate');
    expect(ardsSeverity(80, 10)).toBe('severe');
    expect(ardsSeverity(350, 10)).toBe('none');
  });

  it('reports no ARDS when PEEP < 5', () => {
    expect(ardsSeverity(120, 0)).toBe('none');
  });
});

describe('rapidShallowBreathingIndex', () => {
  it('is RR / VT in litres', () => {
    expect(rapidShallowBreathingIndex(20, 400)).toBeCloseTo(50, 5);
    expect(rapidShallowBreathingIndex(35, 250)).toBeCloseTo(140, 5);
  });

  it('returns 0 for invalid inputs', () => {
    expect(rapidShallowBreathingIndex(0, 400)).toBe(0);
    expect(rapidShallowBreathingIndex(20, 0)).toBe(0);
  });
});

describe('ARDSNet PEEP/FiO2 ladders', () => {
  it('has one row per FiO2 step, ascending', () => {
    [ARDSNET_LOW_PEEP, ARDSNET_HIGH_PEEP].forEach(table => {
      expect(table).toHaveLength(8);
      expect(table.map(r => r.fio2)).toEqual([0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    });
  });

  it('higher-PEEP ladder uses more PEEP at the same FiO2', () => {
    const lowAt05 = ARDSNET_LOW_PEEP.find(r => r.fio2 === 0.5)!;
    const highAt05 = ARDSNET_HIGH_PEEP.find(r => r.fio2 === 0.5)!;
    expect(parseInt(lowAt05.peep, 10)).toBeLessThan(parseInt(highAt05.peep, 10));
  });
});
