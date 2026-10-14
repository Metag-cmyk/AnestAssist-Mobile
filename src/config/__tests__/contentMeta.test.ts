import { describe, it, expect } from 'vitest';
import {
  APP_VERSION, CONTENT_VERSION, CONTENT_REVIEWED,
  MODULE_PROVENANCE, ALL_MODULE_IDS, getProvenance, buildReportDraft,
} from '../contentMeta';
import { navigationItems } from '../navigation';

describe('content metadata', () => {
  it('exposes non-empty versions and an ISO review date', () => {
    expect(APP_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    expect(CONTENT_VERSION.length).toBeGreaterThan(0);
    expect(CONTENT_REVIEWED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(Date.parse(CONTENT_REVIEWED))).toBe(false);
  });

  it('declares provenance for every navigation module', () => {
    navigationItems.forEach(item => {
      const prov = getProvenance(item.id);
      expect(prov, `missing provenance for ${item.id}`).toBeTruthy();
      expect(prov.sources.length).toBeGreaterThan(0);
      prov.sources.forEach(s => {
        expect(s.label.trim().length).toBeGreaterThan(0);
        if (s.url) expect(s.url).toMatch(/^https?:\/\//);
      });
      expect(prov.reviewed).toBe(CONTENT_REVIEWED);
    });
  });

  it('covers exactly the tab ids', () => {
    expect(new Set(ALL_MODULE_IDS)).toEqual(new Set(navigationItems.map(i => i.id)));
  });
});

describe('buildReportDraft', () => {
  it('includes the version and optional module/item', () => {
    const draft = buildReportDraft('Conditions', 'Diabetic Ketoacidosis');
    expect(draft).toContain(APP_VERSION);
    expect(draft).toContain(CONTENT_VERSION);
    expect(draft).toContain('Conditions');
    expect(draft).toContain('Diabetic Ketoacidosis');
  });
});
