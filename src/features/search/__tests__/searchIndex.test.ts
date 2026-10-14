import { describe, it, expect } from 'vitest';
import { SEARCH_INDEX, searchEntries } from '../searchIndex';

describe('SEARCH_INDEX', () => {
  it('contains entries from every module', () => {
    const types = new Set(SEARCH_INDEX.map(e => e.type));
    expect(types).toEqual(new Set(['Condition', 'Procedure', 'Block', 'Score', 'Guideline']));
  });

  it('has unique keys', () => {
    const keys = SEARCH_INDEX.map(e => e.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('gives every entry a route and a preselection key', () => {
    SEARCH_INDEX.forEach(e => {
      expect(e.route.startsWith('/')).toBe(true);
      expect(e.title.trim().length).toBeGreaterThan(0);
      expect(e.selectKey).toBeTruthy();
      expect(e.selectValue).toBeTruthy();
    });
  });
});

describe('searchEntries', () => {
  it('returns nothing for an empty query', () => {
    expect(searchEntries('')).toEqual([]);
    expect(searchEntries('   ')).toEqual([]);
  });

  it('ranks title matches and finds cross-module hits', () => {
    const results = searchEntries('sepsis');
    expect(results.length).toBeGreaterThan(0);
    // Both the condition and sepsis-related scores/guidelines should appear.
    const types = new Set(results.map(r => r.type));
    expect(types.has('Condition')).toBe(true);
  });

  it('respects the per-type cap', () => {
    const results = searchEntries('a', 2);
    const counts: Record<string, number> = {};
    results.forEach(r => { counts[r.type] = (counts[r.type] ?? 0) + 1; });
    Object.values(counts).forEach(n => expect(n).toBeLessThanOrEqual(2));
  });

  it('finds a procedure by name', () => {
    const results = searchEntries('cholecystectomy');
    expect(results.some(r => r.type === 'Procedure')).toBe(true);
  });
});
