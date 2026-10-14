import { describe, it, expect } from 'vitest';
import { ConditionProtocol } from '../../../types';
import { resolveDifferential, DIFFERENTIAL_RULES } from '../differential';

function makeCondition(partial: Partial<ConditionProtocol>): ConditionProtocol {
  return {
    id: 'test',
    name: 'Test Condition',
    category: 'Test',
    severity: 'critical',
    diagnosis: ['Primary diagnostic feature'],
    immediateActions: ['Do something'],
    secondaryManagement: ['Then something else'],
    ...partial,
  };
}

describe('resolveDifferential', () => {
  it('matches a keyword rule case-insensitively', () => {
    const { items } = resolveDifferential(makeCondition({ differentialDiagnosis: ['TENSION PNEUMOTHORAX'] }));
    expect(items).toHaveLength(1);
    expect(items[0].condition).toBe('TENSION PNEUMOTHORAX');
    expect(items[0].distinguishingFeatures).toContain('Unilateral absent breath sounds');
    expect(items[0].pocusOrKeyTest).toContain('Lung POCUS');
  });

  it('falls back to a generic prompt for unmatched labels', () => {
    const { items } = resolveDifferential(makeCondition({ differentialDiagnosis: ['Idiopathic Something'] }));
    expect(items[0].distinguishingFeatures).toContain('Evaluate clinical onset');
    expect(items[0].pocusOrKeyTest).toContain('POCUS / Bedside ABG');
  });

  it('does not misclassify "Pericardial effusion" as a pulmonary embolism', () => {
    const { items } = resolveDifferential(makeCondition({ differentialDiagnosis: ['Pericardial effusion'] }));
    expect(items[0].pocusOrKeyTest).not.toContain('McConnell');
  });

  it('uses the first 3 diagnosis items as the triggers', () => {
    const { triggers } = resolveDifferential(makeCondition({
      diagnosis: ['D1', 'D2', 'D3', 'D4'],
    }));
    expect(triggers).toEqual(['D1', 'D2', 'D3']);
  });

  it('returns no items when there is no differential diagnosis', () => {
    expect(resolveDifferential(makeCondition({})).items).toEqual([]);
  });

  it('applies the first matching rule in order', () => {
    // "Anaphylaxis" matches the anaphylaxis rule before any later rule.
    const { items } = resolveDifferential(makeCondition({ differentialDiagnosis: ['Anaphylaxis with hyperthermia'] }));
    expect(items[0].pocusOrKeyTest).toContain('Tryptase');
  });

  it('has non-empty keywords and guidance for every rule', () => {
    DIFFERENTIAL_RULES.forEach((rule) => {
      expect(rule.keywords.length).toBeGreaterThan(0);
      rule.keywords.forEach((k) => expect(k).toBe(k.toLowerCase()));
      expect(rule.distinguishingFeatures.length).toBeGreaterThan(0);
      expect(rule.pocusOrKeyTest.length).toBeGreaterThan(0);
    });
  });
});
