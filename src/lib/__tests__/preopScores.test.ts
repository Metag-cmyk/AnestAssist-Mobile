import { describe, it, expect } from 'vitest';
import {
  rcri, ariscat, stopBang, apfel, airwayRisk,
  ASA_OPTIONS, RCRI_FACTORS, STOP_BANG_FACTORS, APFEL_FACTORS,
  type RcriInput, type StopBangInput, type ApfelInput, type AriscatInput,
} from '../preopScores';

const noRcri: RcriInput = {
  highRiskSurgery: false, ischemicHeartDisease: false, heartFailure: false,
  cerebrovascularDisease: false, insulinDiabetes: false, creatinineOver2: false,
};
const noStopBang: StopBangInput = {
  snoring: false, tiredness: false, observedApnea: false, pressure: false,
  bmiOver35: false, ageOver50: false, neckOver40: false, male: false,
};
const noApfel: ApfelInput = { female: false, nonSmoker: false, historyPonv: false, postopOpioids: false };

describe('ASA options', () => {
  it('exposes all six classes', () => {
    expect(ASA_OPTIONS.map(o => o.value)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('rcri', () => {
  it('is low risk with no factors', () => {
    const r = rcri(noRcri);
    expect(r.score).toBe(0);
    expect(r.band).toBe('low');
    expect(r.interpretation).toContain('0.4%');
  });

  it('adds one point per factor', () => {
    expect(rcri({ ...noRcri, heartFailure: true }).score).toBe(1);
    expect(rcri({ ...noRcri, heartFailure: true, ischemicHeartDisease: true }).score).toBe(2);
    expect(RCRI_FACTORS).toHaveLength(6);
  });

  it('flags elevated risk at >= 2', () => {
    const r = rcri({ ...noRcri, heartFailure: true, insulinDiabetes: true });
    expect(r.band).toBe('high');
    expect(r.interpretation).toContain('6.6%');
    expect(r.interpretation.toLowerCase()).toContain('cardiology');
  });
});

describe('ariscat', () => {
  const low: AriscatInput = {
    age: 40, spo2: 98, respiratoryInfection: false, anemia: false,
    incision: 'peripheral', duration: 'lt2', emergency: false,
  };

  it('is low risk for a young, well, peripheral case', () => {
    const r = ariscat(low);
    expect(r.score).toBe(0);
    expect(r.band).toBe('low');
  });

  it('scores intermediate for a mixed picture', () => {
    const r = ariscat({ ...low, age: 60, spo2: 93, respiratoryInfection: true }); // 3 + 8 + 17 = 28
    expect(r.score).toBe(28);
    expect(r.band).toBe('intermediate');
  });

  it('reaches the high band and the documented maximum', () => {
    const max = ariscat({
      age: 85, spo2: 88, respiratoryInfection: true, anemia: true,
      incision: 'intrathoracic', duration: 'gt3', emergency: true,
    });
    expect(max.score).toBe(123);
    expect(max.band).toBe('high');
  });
});

describe('stopBang', () => {
  it('is low risk with no predictors', () => {
    expect(stopBang(noStopBang).band).toBe('low');
  });

  it('is intermediate at 3 and high at 5', () => {
    expect(stopBang({ ...noStopBang, snoring: true, tiredness: true, male: true }).band).toBe('intermediate');
    expect(stopBang({ ...noStopBang, snoring: true, tiredness: true, male: true, ageOver50: true, pressure: true }).band).toBe('high');
    expect(STOP_BANG_FACTORS).toHaveLength(8);
  });
});

describe('apfel', () => {
  it('maps 0–4 predictors to 10–80%', () => {
    expect(apfel(noApfel).riskPercent).toBe(10);
    expect(apfel({ ...noApfel, female: true, nonSmoker: true }).riskPercent).toBe(40);
    expect(apfel({ ...noApfel, female: true, nonSmoker: true, historyPonv: true }).riskPercent).toBe(60);
    expect(apfel({ ...noApfel, female: true, nonSmoker: true, historyPonv: true, postopOpioids: true }).riskPercent).toBe(80);
    expect(APFEL_FACTORS).toHaveLength(4);
  });

  it('recommends combination prophylaxis at >= 2', () => {
    expect(apfel({ ...noApfel, female: true, nonSmoker: true }).interpretation).toContain('2 antiemetics');
  });
});

describe('airwayRisk', () => {
  it('is low risk for a normal airway', () => {
    const r = airwayRisk({ mallampati: 1, thyromental: 'gt6.5', mouthOpening: 'gt4', neckMobility: 'normal', priorDifficulty: false });
    expect(r.band).toBe('low');
  });

  it('is high risk with prior difficulty plus predictors', () => {
    const r = airwayRisk({ mallampati: 4, thyromental: 'lt6', mouthOpening: 'lt3', neckMobility: 'normal', priorDifficulty: true });
    expect(r.band).toBe('high');
    expect(r.interpretation.toLowerCase()).toContain('awake');
  });
});
