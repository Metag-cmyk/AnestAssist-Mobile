/**
 * Standardized Search Engine for AnestAssist
 * Provides consistent filtering across all clinical modules.
 */

export function searchItems<T>(
  items: T[], 
  query: string, 
  searchKeys: (keyof T)[]
): T[] {
  if (!query) return items;
  
  const normalizedQuery = query.toLowerCase().trim();
  const searchTerms = normalizedQuery.split(/\s+/);
  
  return items.filter(item => {
    // Check all specified keys
    return searchTerms.every(term => {
      return searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(term);
        }
        return false;
      });
    });
  });
}

/**
 * Advanced search for nested objects (e.g., Surgery procedures in specialties)
 */
export function searchNestedItems<T, N>(
  topLevel: T[],
  getNested: (item: T) => N[],
  query: string,
  searchKeys: (keyof N)[]
): N[] {
  const allNested = topLevel.flatMap(getNested);
  return searchItems(allNested, query, searchKeys);
}

/** Recursively collects every string value in a (nested) object/array. */
export function flattenStrings(value: unknown, out: string[] = []): string[] {
  if (value == null) return out;
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    value.forEach(v => flattenStrings(v, out));
  } else if (typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach(v => flattenStrings(v, out));
  }
  return out;
}

export function splitTerms(query: string): string[] {
  return query.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

/** True when every whitespace-separated term appears somewhere in the item's strings. */
export function matchesDeep(item: unknown, query: string): boolean {
  const terms = splitTerms(query);
  if (terms.length === 0) return true;
  const haystack = flattenStrings(item).join('\n').toLowerCase();
  return terms.every(term => haystack.includes(term));
}

/**
 * Deep search: matches a query against every string field of an item,
 * including nested objects and arrays (indications, notes, titles, etc.).
 */
export function searchItemsDeep<T>(items: T[], query: string): T[] {
  if (!query.trim()) return items;
  return items.filter(item => matchesDeep(item, query));
}

/**
 * Character ranges [start, end) in `text` matching any query term, merged and
 * sorted. Used to highlight search hits in the UI.
 */
export function matchRanges(text: string, query: string): Array<[number, number]> {
  const terms = splitTerms(query);
  if (!text || terms.length === 0) return [];

  const lower = text.toLowerCase();
  const ranges: Array<[number, number]> = [];
  terms.forEach(term => {
    let idx = lower.indexOf(term);
    while (idx !== -1) {
      ranges.push([idx, idx + term.length]);
      idx = lower.indexOf(term, idx + term.length);
    }
  });
  if (ranges.length === 0) return [];

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [ranges[0]];
  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    if (ranges[i][0] <= last[1]) {
      last[1] = Math.max(last[1], ranges[i][1]);
    } else {
      merged.push(ranges[i]);
    }
  }
  return merged;
}
