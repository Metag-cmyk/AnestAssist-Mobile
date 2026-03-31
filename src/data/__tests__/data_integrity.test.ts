import { describe, it, expect } from 'vitest';
import { SURGERY_DATA } from '../../features/surgery/data';
import { DIAGRAM_GUIDELINES } from '../../features/guidelines/data';
import { REGIONAL_BLOCKS } from '../../features/regional/data';

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
  });

  describe('Regional Blocks Data', () => {
    it('should have unique block IDs', () => {
      const ids = REGIONAL_BLOCKS.map(b => b.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });
});
