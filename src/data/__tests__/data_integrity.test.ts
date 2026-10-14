import { describe, it, expect } from 'vitest';
import { SURGERY_DATA } from '../../features/surgery/data';
import { DIAGRAM_GUIDELINES, STATIC_GUIDELINES } from '../../features/guidelines/data';
import { REGIONAL_BLOCKS } from '../../features/regional/data';
import { CONDITIONS_DATA } from '../../features/conditions/data';
import { CLINICAL_SCORES } from '../../features/scores/data';

const CURRENT_YEAR = new Date().getFullYear();

describe('Data Integrity Validation', () => {
  describe('Surgery Data', () => {
    it('should have unique procedure IDs across all specialties', () => {
      const ids = SURGERY_DATA.flatMap(s => s.procedures.map(p => p.id));
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have unique procedure names within each specialty', () => {
      SURGERY_DATA.forEach(specialty => {
        const names = specialty.procedures.map(p => p.name);
        const uniqueNames = new Set(names);
        expect(names.length).toBe(uniqueNames.size);
      });
    });

    it('should have unique specialty IDs and non-empty names', () => {
      const ids = SURGERY_DATA.map(s => s.id);
      expect(new Set(ids).size).toBe(ids.length);
      SURGERY_DATA.forEach(s => expect(s.name.trim().length).toBeGreaterThan(0));
    });

    it('should give every specialty pre/intra/post-op considerations', () => {
      SURGERY_DATA.forEach(s =>
        ['preOp', 'intraOp', 'postOp'].forEach(k => {
          expect(Array.isArray(s.generalConsiderations[k as 'preOp'])).toBe(true);
          expect(s.generalConsiderations[k as 'preOp'].length).toBeGreaterThan(0);
        })
      );
    });

    it('should give every procedure a guide, considerations and management phases', () => {
      SURGERY_DATA.forEach(s => s.procedures.forEach(p => {
        expect(p.name.trim().length).toBeGreaterThan(0);
        expect(p.guide.length).toBeGreaterThan(0);
        expect(p.anestheticConsiderations.length).toBeGreaterThan(0);
        expect(Array.isArray(p.complications.surgical)).toBe(true);
        expect(Array.isArray(p.complications.anesthetic)).toBe(true);
        ['preOp', 'intraOp', 'postOp'].forEach(k =>
          expect(p.management[k as 'preOp'].length).toBeGreaterThan(0)
        );
      }));
    });

    it('should list only unique, non-empty recommended blocks per procedure', () => {
      SURGERY_DATA.forEach(s => s.procedures.forEach(p => {
        const blocks = p.recommendedBlocks ?? [];
        blocks.forEach(b => expect(b.trim().length).toBeGreaterThan(0));
        expect(new Set(blocks).size).toBe(blocks.length);
      }));
    });
  });

  describe('Guideline Diagram Data', () => {
    it('should have unique diagram IDs', () => {
      const ids = DIAGRAM_GUIDELINES.map(a => a.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have at least one step for every diagram', () => {
      DIAGRAM_GUIDELINES.forEach(diag => {
        expect(diag.steps.length).toBeGreaterThan(0);
      });
    });

    it('should have valid step types', () => {
      const validTypes = ['action', 'decision', 'warning', 'info'];
      DIAGRAM_GUIDELINES.forEach(diag => {
        diag.steps.forEach(step => {
          expect(validTypes).toContain(step.type);
        });
      });
    });

    it('should give every diagram a title, source, link and plausible year', () => {
      DIAGRAM_GUIDELINES.forEach(diag => {
        expect(diag.title.trim().length).toBeGreaterThan(0);
        expect(diag.source.trim().length).toBeGreaterThan(0);
        expect(diag.link).toMatch(/^https?:\/\//);
        expect(diag.year).toBeGreaterThanOrEqual(1990);
        expect(diag.year).toBeLessThanOrEqual(CURRENT_YEAR + 1);
      });
    });
  });

  describe('Static Guidelines Data', () => {
    it('should have unique IDs', () => {
      const ids = STATIC_GUIDELINES.map(g => g.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have a title, summary and plausible year', () => {
      STATIC_GUIDELINES.forEach(g => {
        expect(g.title.trim().length).toBeGreaterThan(0);
        expect(g.summary.trim().length).toBeGreaterThan(0);
        expect(g.year).toBeGreaterThanOrEqual(1990);
        expect(g.year).toBeLessThanOrEqual(CURRENT_YEAR + 1);
      });
    });
  });

  describe('Regional Blocks Data', () => {
    it('should have unique block IDs', () => {
      const ids = REGIONAL_BLOCKS.map(b => b.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid categories on every block', () => {
      const valid = ['Upper Limb', 'Lower Limb', 'Trunk', 'Neuraxial', 'Head & Neck'];
      REGIONAL_BLOCKS.forEach(b => expect(valid).toContain(b.category));
    });

    it('should populate clinical fields on every block', () => {
      REGIONAL_BLOCKS.forEach(b => {
        expect(b.name.trim().length).toBeGreaterThan(0);
        expect(b.indications.length).toBeGreaterThan(0);
        expect(Array.isArray(b.contraindications.absolute)).toBe(true);
        expect(Array.isArray(b.contraindications.relative)).toBe(true);
        expect(b.anatomy.length).toBeGreaterThan(0);
        expect(b.technique.length).toBeGreaterThan(0);
        expect(b.sonoAnatomyTips.length).toBeGreaterThan(0);
        expect(b.complications.length).toBeGreaterThan(0);
        expect(b.suggestedVolume.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Conditions Data', () => {
    it('should have unique condition IDs', () => {
      const ids = CONDITIONS_DATA.map(c => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should use an allowed severity on every condition', () => {
      const valid = ['critical', 'urgent', 'standard'];
      CONDITIONS_DATA.forEach(c => expect(valid).toContain(c.severity));
    });

    it('should have a name, category and the core management arrays', () => {
      CONDITIONS_DATA.forEach(c => {
        expect(c.name.trim().length).toBeGreaterThan(0);
        expect(c.category.trim().length).toBeGreaterThan(0);
        expect(c.diagnosis.length).toBeGreaterThan(0);
        expect(c.immediateActions.length).toBeGreaterThan(0);
        expect(c.secondaryManagement.length).toBeGreaterThan(0);
      });
    });

    it('should use valid treatment-diagram step types when a diagram exists', () => {
      const valid = ['action', 'decision', 'warning', 'info'];
      CONDITIONS_DATA.filter(c => c.diagram).forEach(c =>
        c.diagram!.forEach(step => expect(valid).toContain(step.type))
      );
    });
  });

  describe('Clinical Scores Data', () => {
    // These scores are rendered by bespoke calculators, not the generic criteria UI,
    // so they intentionally carry empty criteria/riskLevels.
    const CUSTOM_SCORE_IDS = ['thoracic-fit', 'spirometry', 'acid-base'];
    const standardScores = CLINICAL_SCORES.filter(s => !CUSTOM_SCORE_IDS.includes(s.id));

    it('should have unique score IDs', () => {
      const ids = CLINICAL_SCORES.map(s => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should use an allowed category on every score', () => {
      const valid = ['Respiratory', 'Sepsis', 'General', 'Cardiac', 'Neurological', 'Cardiovascular', 'Vascular', 'Gastrointestinal', 'Anesthesia', 'ICU', 'Airway'];
      CLINICAL_SCORES.forEach(s => expect(valid).toContain(s.category));
    });

    it('should delegate bespoke scores to their custom renderers (empty criteria/riskLevels)', () => {
      const customs = CLINICAL_SCORES.filter(s => CUSTOM_SCORE_IDS.includes(s.id));
      expect(customs.length).toBeGreaterThan(0);
      customs.forEach(s => {
        expect(s.criteria).toEqual([]);
        expect(s.riskLevels).toEqual([]);
      });
    });

    it('should give every standard score at least one criterion with options and unique labels', () => {
      expect(standardScores.length).toBeGreaterThan(0);
      standardScores.forEach(score => {
        expect(score.criteria.length).toBeGreaterThan(0);
        score.criteria.forEach(criterion => {
          expect(criterion.options.length).toBeGreaterThan(0);
          criterion.options.forEach(o => expect(Number.isFinite(o.points)).toBe(true));
          const labels = criterion.options.map(o => o.label);
          expect(new Set(labels).size).toBe(labels.length);
        });
      });
    });

    it('should have contiguous risk levels covering the full attainable score range', () => {
      standardScores.forEach(score => {
        const levels = [...score.riskLevels].sort((a, b) => a.min - b.min);
        expect(levels.length).toBeGreaterThan(0);
        levels.forEach(l => {
          expect(l.min).toBeLessThanOrEqual(l.max);
          expect(l.label.trim().length).toBeGreaterThan(0);
          expect(l.description.trim().length).toBeGreaterThan(0);
          expect(l.color.trim().length).toBeGreaterThan(0);
        });
        // Contiguous integer bands (no gaps between adjacent levels).
        for (let i = 1; i < levels.length; i++) {
          expect(levels[i].min).toBe(levels[i - 1].max + 1);
        }
        const minPossible = score.criteria.reduce(
          (sum, c) => sum + Math.min(...c.options.map(o => o.points)),
          0
        );
        const maxPossible = score.criteria.reduce(
          (sum, c) => sum + Math.max(...c.options.map(o => o.points)),
          0
        );
        expect(levels[0].min).toBeLessThanOrEqual(minPossible);
        expect(levels[levels.length - 1].max).toBeGreaterThanOrEqual(maxPossible);
      });
    });
  });
});
