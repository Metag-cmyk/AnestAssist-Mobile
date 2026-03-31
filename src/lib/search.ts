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
