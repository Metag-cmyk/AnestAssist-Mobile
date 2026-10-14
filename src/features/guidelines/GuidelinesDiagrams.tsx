import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Search,
  FileText,
  Filter,
  X,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { searchItemsDeep } from '../../lib/search';
import {
  DIAGRAM_GUIDELINES,
  STATIC_GUIDELINES,
  SOCIETY_LINKS,
  Step,
  GuidelineDiagram,
  StaticGuideline,
} from './data';
import { STORAGE_KEYS } from '../../config/storageKeys';
import { Highlight } from '../../components/Highlight';
import { conditionIdForGuideline } from '../../lib/crossLinks';
import { useNavigate } from 'react-router-dom';

interface GuidelineEntry {
  id: string;
  title: string;
  source: string;
  year: number;
  displayCategory: string;
  isCrisis: boolean;
  link?: string;
  summary?: StaticGuideline;
  diagram?: GuidelineDiagram;
}

/**
 * A single catalogue merging the written summaries and the visual diagrams.
 * Guidelines that exist as both are merged so the detail shows summary + steps.
 */
function buildCatalogue(): GuidelineEntry[] {
  const byId = new Map<string, GuidelineEntry>();

  STATIC_GUIDELINES.forEach(g => {
    byId.set(g.id, {
      id: g.id, title: g.title, source: g.source, year: g.year,
      displayCategory: g.category, isCrisis: false,
      link: g.link ?? SOCIETY_LINKS[g.source], summary: g,
    });
  });

  DIAGRAM_GUIDELINES.forEach(d => {
    const crisis = Boolean(d.isCrisis || d.category === 'crisis');
    const existing = byId.get(d.id);
    if (existing) {
      existing.diagram = d;
      existing.isCrisis = crisis;
      existing.link = existing.link ?? d.link;
      if (crisis) existing.displayCategory = 'Crisis';
    } else {
      byId.set(d.id, {
        id: d.id, title: d.title, source: d.source, year: d.year,
        displayCategory: crisis ? 'Crisis' : 'Algorithm', isCrisis: crisis,
        link: d.link, diagram: d,
      });
    }
  });

  return [...byId.values()];
}

const CATALOGUE = buildCatalogue();
const SOCIETIES = [...new Set(CATALOGUE.map(i => i.source))].sort();
const CATEGORIES = [...new Set(CATALOGUE.map(i => i.displayCategory))].sort();

// Crisis cards and algorithms are shown first, then clinical categories A–Z.
const GROUP_PRIORITY = ['Crisis', 'Algorithm'];

type TypeFilter = 'all' | 'crisis' | 'algorithm' | 'summary';

const TYPE_TABS: { id: TypeFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '' },
  { id: 'crisis', label: 'Crisis', icon: '🚨' },
  { id: 'algorithm', label: 'Algorithms', icon: '📘' },
  { id: 'summary', label: 'Summaries', icon: '📄' },
];

export default function GuidelinesDiagrams() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem(STORAGE_KEYS.GUIDELINES_SEARCH) || '');
  const [selectedId, setSelectedId] = useState<string | null>(() => localStorage.getItem(STORAGE_KEYS.GUIDELINES_SELECTED_ID));
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [societyFilter, setSocietyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GUIDELINES_SEARCH, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedId) localStorage.setItem(STORAGE_KEYS.GUIDELINES_SELECTED_ID, selectedId);
    else localStorage.removeItem(STORAGE_KEYS.GUIDELINES_SELECTED_ID);
  }, [selectedId]);

  const matchesType = (item: GuidelineEntry, type: TypeFilter) => {
    if (type === 'crisis') return item.isCrisis;
    if (type === 'algorithm') return Boolean(item.diagram) && !item.isCrisis;
    if (type === 'summary') return Boolean(item.summary);
    return true;
  };

  // Facet counts reflect the society/category filters (but not the type filter).
  const faceted = CATALOGUE.filter(item =>
    (societyFilter === 'all' || item.source === societyFilter) &&
    (categoryFilter === 'all' || item.displayCategory === categoryFilter)
  );
  const counts: Record<TypeFilter, number> = {
    all: faceted.length,
    crisis: faceted.filter(i => matchesType(i, 'crisis')).length,
    algorithm: faceted.filter(i => matchesType(i, 'algorithm')).length,
    summary: faceted.filter(i => matchesType(i, 'summary')).length,
  };

  const searched = searchItemsDeep(faceted.filter(i => matchesType(i, typeFilter)), searchTerm);
  const sorted = [...searched].sort((a, b) => {
    if (a.isCrisis !== b.isCrisis) return a.isCrisis ? -1 : 1;
    return b.year - a.year;
  });

  const groups = useMemo(() => {
    const map = new Map<string, GuidelineEntry[]>();
    sorted.forEach(item => {
      const list = map.get(item.displayCategory) ?? [];
      list.push(item);
      map.set(item.displayCategory, list);
    });
    return [...map.entries()].sort((a, b) => {
      const ai = GROUP_PRIORITY.indexOf(a[0]);
      const bi = GROUP_PRIORITY.indexOf(b[0]);
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      return a[0].localeCompare(b[0]);
    });
  }, [sorted]);

  const hasActiveFilters = societyFilter !== 'all' || categoryFilter !== 'all' || typeFilter !== 'all' || searchTerm.trim() !== '';
  const clearFilters = () => {
    setTypeFilter('all');
    setSocietyFilter('all');
    setCategoryFilter('all');
    setSearchTerm('');
  };

  const getTypeStyles = (type: Step['type']) => {
    switch (type) {
      case 'action': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'decision': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'warning': return 'bg-rose-50 border-rose-200 text-rose-700';
      case 'info': return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const getTypeIcon = (type: Step['type']) => {
    switch (type) {
      case 'action': return <CheckCircle2 className="w-4 h-4" />;
      case 'decision': return <ChevronRight className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
    }
  };

  const selected = CATALOGUE.find(i => i.id === selectedId);
  const linkedConditionId = selected?.diagram ? conditionIdForGuideline(selected.id) : undefined;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ===== List pane ===== */}
      <div className={`lg:col-span-4 space-y-3 ${selected ? 'hidden lg:block' : ''}`}>
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder={t('common.search')} aria-label={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-9 py-3 rounded-xl bg-white border border-medical-border text-sm outline-none focus:ring-2 focus:ring-medical-accent transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Type tabs with counts */}
        <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
          {TYPE_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id)}
              className={`py-2 rounded-lg transition-all ${
                typeFilter === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="block leading-none">{tab.icon}{tab.label}</span>
              <span className={`block mt-0.5 text-[9px] font-black ${typeFilter === tab.id ? 'text-indigo-400' : 'text-slate-400'}`}>
                {counts[tab.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Society & category */}
        <div className="grid grid-cols-2 gap-2">
          <select
            value={societyFilter}
            onChange={e => setSocietyFilter(e.target.value)}
            aria-label="Filter by society"
            className="w-full bg-white border border-medical-border rounded-xl px-3 py-2 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-medical-accent"
          >
            <option value="all">All societies</option>
            {SOCIETIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className="w-full bg-white border border-medical-border rounded-xl px-3 py-2 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-medical-accent"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Result summary */}
        <div className="flex items-center justify-between px-1">
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Filter className="w-3 h-3" /> {sorted.length} result{sorted.length === 1 ? '' : 's'}
          </span>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-[10px] font-bold text-medical-accent hover:underline uppercase tracking-wider">
              Clear
            </button>
          )}
        </div>

        {/* Grouped list */}
        <div className="space-y-5 max-h-[600px] lg:max-h-[calc(100vh-22rem)] overflow-y-auto pr-1 custom-scrollbar">
          {groups.map(([category, entries]) => (
            <div key={category}>
              <h3 className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur px-1 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <span>{category}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-400">{entries.length}</span>
              </h3>
              <div className="space-y-2 mt-1">
                {entries.map(item => {
                  const active = selectedId === item.id;
                  const preview = item.summary
                    ? item.summary.summary
                    : item.diagram ? `${item.diagram.steps.length} steps` : '';
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        active
                          ? item.isCrisis ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                            : 'bg-medical-primary text-white border-medical-primary shadow-md'
                          : item.isCrisis ? 'bg-rose-50/60 text-slate-800 border-rose-200 hover:bg-rose-100/70'
                            : 'bg-white text-slate-600 border-medical-border hover:border-medical-accent/40 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                          active ? 'bg-white/20 text-white' : item.isCrisis ? 'bg-rose-200 text-rose-800 font-black' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {item.source}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-bold">
                          {item.diagram && <span title="Algorithm" aria-label="Algorithm">📘</span>}
                          {item.summary && <span title="Summary" aria-label="Summary">📄</span>}
                          <span className={`opacity-60 font-medium ${active ? 'text-white' : ''}`}>{item.year}</span>
                        </span>
                      </div>
                      <h4 className="font-bold text-sm leading-tight">
                        {item.isCrisis && <span className="mr-1" aria-hidden="true">🚨</span>}
                        <Highlight text={item.title} query={searchTerm} />
                      </h4>
                      {preview && (
                        <p className={`text-[11px] mt-1 line-clamp-2 ${active ? 'text-white/70' : 'text-slate-400'}`}>
                          {preview}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {sorted.length === 0 && (
            <div className="text-center py-10 px-4">
              <p className="text-sm text-slate-400">No guidelines match your filters.</p>
              <button onClick={clearFilters} className="mt-3 text-xs font-bold text-medical-accent hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </div>

      {/* ===== Detail pane ===== */}
      <div className={`lg:col-span-8 ${selected ? '' : 'hidden lg:block'}`}>
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white rounded-2xl border border-medical-border shadow-sm overflow-hidden"
            >
              <div className={`p-5 sm:p-6 border-b ${
                selected.isCrisis ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-medical-border'
              }`}>
                {/* Mobile back */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="lg:hidden mb-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700"
                >
                  <ArrowLeft className="w-4 h-4" /> All guidelines
                </button>

                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-1 ${
                      selected.isCrisis ? 'text-rose-700 font-black' : 'text-medical-accent'
                    }`}>
                      {selected.isCrisis ? (
                        <><AlertCircle className="w-4 h-4 text-rose-600" /> Emergency crisis card</>
                      ) : selected.summary && selected.diagram ? (
                        <><ShieldCheck className="w-4 h-4" /> Summary &amp; algorithm</>
                      ) : selected.diagram ? (
                        <><ShieldCheck className="w-4 h-4" /> {t('common.visualAlgorithm')}</>
                      ) : (
                        <><FileText className="w-4 h-4" /> Guideline summary</>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-medical-primary leading-tight">{selected.title}</h2>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
                        {selected.source}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
                        {selected.displayCategory}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{selected.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {linkedConditionId && (
                      <button
                        onClick={() => {
                          localStorage.setItem(STORAGE_KEYS.CONDITIONS_SELECTED_ID, linkedConditionId);
                          navigate('/conditions');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold uppercase tracking-wider transition-colors"
                      >
                        Condition protocol
                      </button>
                    )}
                    {selected.link && (
                      <a
                        href={selected.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-medical-accent transition-colors"
                        title={t('common.viewFull')}
                        aria-label="Open source"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-8">
                {selected.summary && (
                  <p className="text-sm text-slate-700 leading-relaxed">{selected.summary.summary}</p>
                )}

                {selected.summary && selected.diagram && (
                  <p className="mt-6 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Step-by-step algorithm</p>
                )}

                {selected.diagram && (
                  <div className="relative space-y-6">
                    {selected.diagram.steps.map((step, i) => (
                      <div key={i} className="relative flex items-start gap-4">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-black flex items-center justify-center">
                          {i + 1}
                        </div>
                        <div className={`flex-1 flex items-start gap-3 p-4 rounded-xl border-2 ${getTypeStyles(step.type)}`}>
                          <div className="mt-0.5 p-1.5 rounded-lg bg-white/60">{getTypeIcon(step.type)}</div>
                          <div>
                            <h4 className="font-bold text-sm uppercase tracking-wide">{step.title}</h4>
                            <p className="text-sm opacity-90 mt-0.5">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <BookOpen className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-400">{t('common.selectGuideline')}</h3>
              <p className="text-sm text-slate-400 max-w-xs mt-1">{t('common.selectGuidelineDesc')}</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
