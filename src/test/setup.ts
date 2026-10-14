// Vitest (jsdom) setup: polyfill the browser APIs that jsdom omits and that
// React/framer-motion touch during render.
const g = globalThis as any;

// Required for React 19 `act(...)`.
g.IS_REACT_ACT_ENVIRONMENT = true;

if (!('matchMedia' in window)) {
  (window as any).matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

if (!g.ResizeObserver) {
  g.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!g.IntersectionObserver) {
  g.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

if (!g.requestAnimationFrame) {
  g.requestAnimationFrame = (cb: (t: number) => void) => setTimeout(() => cb(Date.now()), 0);
  g.cancelAnimationFrame = (id: any) => clearTimeout(id);
}

if (!window.scrollTo) {
  (window as any).scrollTo = () => {};
}

// Node 22 exposes an experimental global `localStorage` that throws/warns when
// no `--localstorage-file` is set, shadowing jsdom's implementation. Ensure a
// working Storage exists on globalThis (and window).
(() => {
  let storage: any;
  try {
    const ls = typeof window !== 'undefined' ? (window as any).localStorage : undefined;
    if (ls) {
      ls.setItem('__probe__', '1');
      ls.removeItem('__probe__');
      storage = ls;
    }
  } catch {
    /* fall through to the in-memory shim */
  }
  if (!storage) {
    const map = new Map<string, string>();
    storage = {
      get length() {
        return map.size;
      },
      clear() {
        map.clear();
      },
      getItem(k: string) {
        return map.has(String(k)) ? (map.get(String(k)) as string) : null;
      },
      setItem(k: string, v: string) {
        map.set(String(k), String(v));
      },
      removeItem(k: string) {
        map.delete(String(k));
      },
      key(i: number) {
        return Array.from(map.keys())[i] ?? null;
      },
    };
  }
  Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true, writable: true });
  if (typeof window !== 'undefined') {
    try {
      Object.defineProperty(window, 'localStorage', { value: storage, configurable: true });
    } catch {
      /* ignore */
    }
  }
})();
