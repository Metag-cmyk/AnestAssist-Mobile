import { describe, it, expect } from 'vitest';
import { flattenStrings, matchesDeep, searchItemsDeep, matchRanges, splitTerms } from '../search';

describe('flattenStrings', () => {
  it('collects strings from nested objects and arrays', () => {
    const value = { name: 'A', list: ['x', { deep: 'y' }], n: 3, flag: true };
    expect(flattenStrings(value).sort()).toEqual(['A', 'x', 'y']);
  });

  it('ignores numbers, booleans and nullish values', () => {
    expect(flattenStrings({ a: 1, b: false, c: null, d: undefined })).toEqual([]);
  });
});

describe('splitTerms', () => {
  it('lowercases and splits on whitespace', () => {
    expect(splitTerms('  Total  Knee  ')).toEqual(['total', 'knee']);
    expect(splitTerms('   ')).toEqual([]);
  });
});

describe('matchesDeep', () => {
  const item = { name: 'Interscalene Block', indications: ['Shoulder surgery', 'Clavicle'] };

  it('matches a term against nested arrays', () => {
    expect(matchesDeep(item, 'shoulder')).toBe(true);
    expect(matchesDeep(item, 'clavicle')).toBe(true);
  });

  it('requires every term to match somewhere', () => {
    expect(matchesDeep(item, 'shoulder block')).toBe(true);
    expect(matchesDeep(item, 'shoulder femur')).toBe(false);
  });

  it('is case-insensitive', () => {
    expect(matchesDeep(item, 'INTERSCALENE')).toBe(true);
  });

  it('treats an empty query as a match', () => {
    expect(matchesDeep(item, '   ')).toBe(true);
  });
});

describe('searchItemsDeep', () => {
  const items = [
    { id: 1, name: 'Propofol', notes: ['sedation'] },
    { id: 2, name: 'Rocuronium', notes: ['paralysis'] },
  ];

  it('returns all items for an empty query', () => {
    expect(searchItemsDeep(items, '')).toHaveLength(2);
  });

  it('filters using nested fields', () => {
    expect(searchItemsDeep(items, 'paralysis').map(i => i.id)).toEqual([2]);
  });
});

describe('matchRanges', () => {
  it('finds every case-insensitive occurrence', () => {
    expect(matchRanges('Nerve block, nerve pain', 'nerve')).toEqual([[0, 5], [13, 18]]);
  });

  it('merges overlapping ranges', () => {
    expect(matchRanges('abcde', 'bcd')).toEqual([[1, 4]]);
    // overlapping terms merge into one range
    expect(matchRanges('abcde', 'ab bc')).toEqual([[0, 3]]);
  });

  it('returns nothing for an empty query or empty text', () => {
    expect(matchRanges('abc', '')).toEqual([]);
    expect(matchRanges('', 'a')).toEqual([]);
  });
});
