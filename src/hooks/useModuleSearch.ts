import { useMemo } from 'react';
import { searchItems } from '../lib/search';

interface SearchOptions<T> {
  data: T[];
  searchTerm: string;
  searchFields: (keyof T)[];
  filter?: (item: T) => boolean;
}

/**
 * A hook that encapsulates search and filtering logic for modules
 */
export function useModuleSearch<T>({
  data,
  searchTerm,
  searchFields,
  filter
}: SearchOptions<T>) {
  const filteredData = useMemo(() => {
    const baseData = filter ? data.filter(filter) : data;
    if (!searchTerm.trim()) return baseData;
    
    return searchItems<T>(baseData, searchTerm, searchFields);
  }, [data, searchTerm, searchFields, filter]);

  return filteredData;
}
