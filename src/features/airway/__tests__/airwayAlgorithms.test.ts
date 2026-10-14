import { describe, it, expect } from 'vitest';
import { DAS_PLAN, RSI_CHECKLIST, EXTUBATION_CRITERIA, HIGH_RISK_EXTUBATION } from '../airwayAlgorithms';

const VALID_TYPES = ['action', 'decision', 'warning', 'info'];

describe('DAS difficult-airway plan', () => {
  it('has the four plans in order, each well-formed', () => {
    expect(DAS_PLAN.map(s => s.plan)).toEqual(['A', 'B', 'C', 'D']);
    DAS_PLAN.forEach(step => {
      expect(step.title.trim().length).toBeGreaterThan(0);
      expect(step.description.trim().length).toBeGreaterThan(0);
      expect(step.keyPoints.length).toBeGreaterThan(0);
      step.keyPoints.forEach(k => expect(k.trim().length).toBeGreaterThan(0));
      expect(VALID_TYPES).toContain(step.type);
    });
  });

  it('ends with emergency front-of-neck access as a warning', () => {
    const planD = DAS_PLAN.find(s => s.plan === 'D')!;
    expect(planD.type).toBe('warning');
    expect(planD.title.toLowerCase()).toContain('front-of-neck');
  });
});

describe('checklists', () => {
  it('RSI checklist has non-empty groups and items', () => {
    expect(RSI_CHECKLIST.length).toBeGreaterThan(0);
    RSI_CHECKLIST.forEach(g => {
      expect(g.title.trim().length).toBeGreaterThan(0);
      expect(g.items.length).toBeGreaterThan(0);
      g.items.forEach(i => expect(i.trim().length).toBeGreaterThan(0));
    });
  });

  it('extubation criteria and high-risk notes are populated', () => {
    expect(EXTUBATION_CRITERIA.length).toBeGreaterThan(0);
    expect(HIGH_RISK_EXTUBATION.length).toBeGreaterThan(0);
    [...EXTUBATION_CRITERIA, ...HIGH_RISK_EXTUBATION].forEach(i => expect(i.trim().length).toBeGreaterThan(0));
  });
});
