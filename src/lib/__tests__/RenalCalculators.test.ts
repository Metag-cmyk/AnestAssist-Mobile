import { describe, it, expect } from 'vitest';
import { calculateCRRT, calculatePlasmaExchange, calculateIHD } from '../RenalCalculators';

describe('calculateCRRT', () => {
  const baseInputs = {
    weightKg: 70,
    hctPercent: 30,
    bloodFlowMlMin: 180,
    preFilterPercent: 60,
    targetDoseMlKgHr: 25,
    netUfrMlHr: 100,
    pbpMlHr: 0,
  };

  it('derives the total effluent from the KDIGO target dose', () => {
    const r = calculateCRRT(baseInputs);
    expect(r.totalEffluentHr).toBe(1750); // 70 * 25
    expect(r.deliveredUfrDose).toBe(25);
  });

  it('splits remaining effluent 50/50 between dialysate and replacement', () => {
    const r = calculateCRRT(baseInputs);
    // fluidToAssign = 1750 - 0 (PBP) - 100 (net UFR) = 1650
    expect(r.dialysateRateHr).toBe(825);
    expect(r.replacementRateHr).toBe(825);
  });

  it('splits replacement by the pre/post ratio (60/40)', () => {
    const r = calculateCRRT(baseInputs);
    expect(r.preFilterRateHr).toBeCloseTo(495, 5);
    expect(r.postFilterRateHr).toBeCloseTo(330, 5);
  });

  it('computes plasma flow from blood flow and haematocrit', () => {
    const r = calculateCRRT(baseInputs);
    expect(r.plasmaFlowMlMin).toBeCloseTo(126, 5); // 180 * (1 - 0.30)
  });

  it('keeps the filtration fraction below the 25% clot-risk threshold', () => {
    const r = calculateCRRT(baseInputs);
    expect(r.filtrationFraction).toBeCloseTo(11.48, 2);
    expect(r.isHighClottingRisk).toBe(false);
  });

  it('flags a high clotting risk when net removal drives FF above 25%', () => {
    const r = calculateCRRT({ ...baseInputs, netUfrMlHr: 2500 });
    expect(r.filtrationFraction).toBeGreaterThan(25);
    expect(r.isHighClottingRisk).toBe(true);
  });

  it('reports predicted CrCl and clamps negative assignable fluid to zero', () => {
    const r = calculateCRRT({ ...baseInputs, pbpMlHr: 5000 });
    expect(r.predictedCrCl).toBeCloseTo(29.17, 2);
    expect(r.dialysateRateHr).toBe(0);
    expect(r.replacementRateHr).toBe(0);
  });

  it('returns zeros for invalid inputs', () => {
    const r = calculateCRRT({ ...baseInputs, weightKg: 0 });
    expect(r.totalEffluentHr).toBe(0);
    expect(r.filtrationFraction).toBe(0);
  });
});

describe('calculatePlasmaExchange', () => {
  it('estimates plasma volume with the Kaplan formula', () => {
    const r = calculatePlasmaExchange(70, 45);
    expect(r.epvLiters).toBeCloseTo(2.5025, 4); // 0.065 * 70 * (1 - 0.45)
    expect(r.oneVolumeExchangeLiters).toBeCloseTo(2.5025, 4);
    expect(r.onePointFiveExchangeLiters).toBeCloseTo(3.75375, 4);
  });

  it('returns zeros for invalid inputs', () => {
    expect(calculatePlasmaExchange(0, 45).epvLiters).toBe(0);
    expect(calculatePlasmaExchange(70, 0).epvLiters).toBe(0);
  });
});

describe('calculateIHD', () => {
  it('computes the urea reduction ratio', () => {
    const r = calculateIHD({
      preUrea: 30, postUrea: 10, durationHours: 4,
      weightKg: 70, isMale: true, age: 40, heightCm: 175,
    });
    expect(r.urr).toBeCloseTo(66.67, 2);
  });

  it('estimates total body water with the Watson formula (male)', () => {
    const r = calculateIHD({
      preUrea: 30, postUrea: 10, durationHours: 4,
      weightKg: 70, isMale: true, age: 40, heightCm: 175,
    });
    expect(r.estimatedVolumeLiters).toBeCloseTo(41.11, 2);
  });

  it('estimates spKt/V from the urea ratio', () => {
    const r = calculateIHD({
      preUrea: 30, postUrea: 10, durationHours: 4,
      weightKg: 70, isMale: true, age: 40, heightCm: 175,
    });
    expect(r.estimatedKtV).toBeCloseTo(1.0986, 3); // -ln(10/30)
  });

  it('returns zero URR and Kt/V when urea does not fall post-dialysis', () => {
    const r = calculateIHD({
      preUrea: 10, postUrea: 12, durationHours: 4,
      weightKg: 70, isMale: false, age: 60, heightCm: 160,
    });
    expect(r.urr).toBe(0);
    expect(r.estimatedKtV).toBe(0);
  });
});
