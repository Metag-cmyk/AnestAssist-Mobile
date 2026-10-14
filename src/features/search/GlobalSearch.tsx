import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft } from 'lucide-react';
import { searchEntries, SearchEntry, SearchEntryType } from './searchIndex';

const TYPE_STYLES: Record<SearchEntryType, string> = {
  Condition: 'bg-rose-100 text-rose-700',
  Procedure: 'bg-indigo-100 text-indigo-700',
  Block: 'bg-emerald-100 text-emerald-700',
  Score: 'bg-amber-100 text-amber-700',
  Guideline: 'bg-sky-100 text-sky-700',
};

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Cross-module command palette (Ctrl/Cmd-K). Lazily loaded so its index — which
 * imports every dataset — is only fetched the first time it is opened.
 */
export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchEntries(query, 5), [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      const id = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const choose = (entry: SearchEntry) => {
    if (entry.selectKey) localStorage.setItem(entry.selectKey, entry.selectValue ?? '');
    navigate(entry.route);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(a => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) choose(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Global search">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-2xl mt-12 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search conditions, procedures, blocks, scores, guidelines…"
            aria-label="Search all content"
            className="flex-1 outline-none text-base text-slate-800 placeholder:text-slate-400"
          />
          <kbd className="text-[10px] font-bold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {query.trim() === '' ? (
            <p className="px-4 py-8 text-sm text-slate-400 text-center">
              Start typing to search the whole library…
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-8 text-sm text-slate-400 text-center">No matches for “{query}”.</p>
          ) : (
            results.map((r, i) => (
              <button
                key={r.key}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(r)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-slate-50 last:border-0 transition-colors ${
                  i === active ? 'bg-indigo-50' : 'hover:bg-slate-50'
                }`}
              >
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded w-20 text-center shrink-0 ${TYPE_STYLES[r.type]}`}>
                  {r.type}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-sm text-slate-800 truncate">{r.title}</span>
                  <span className="block text-[11px] text-slate-400 truncate">{r.subtitle}</span>
                </span>
                {i === active && <CornerDownLeft className="w-4 h-4 text-indigo-400 shrink-0" aria-hidden="true" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
