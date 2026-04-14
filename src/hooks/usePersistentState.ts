import { useState, useEffect } from 'react';

/**
 * A hook that synchronization state with localStorage
 * @param key The localStorage key
 * @param defaultValue The initial value if no value exists in localStorage
 */
export function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      try {
        return JSON.parse(saved) as T;
      } catch {
        return (saved as unknown) as T;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    const valueToStore = typeof state === 'string' ? state : JSON.stringify(state);
    localStorage.setItem(key, valueToStore);
  }, [key, state]);

  return [state, setState];
}
