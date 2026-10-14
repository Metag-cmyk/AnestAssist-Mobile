import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Search,
  FileText,
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
 * 14 guidelines exist as both — those are merged into one entry so the detail
 * view shows the summary and the step algorithm together.
 */
function buildCatalogue(): GuidelineEntry[] {
  const byId = new Map<string, GuidelineEntry>();

  STATIC_GUIDELINES.forEach(g => {
    byId.set(g.id, {
      id: g.id,
      title: g.title,
      source: g.source,
      year: g.year,
      displayCategory: g.category,
      isCrisis: false,
      link: g.link ?? SOCIETY_LINKS[g.source],
      summary: g,
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
        id: d.id,
        title: d.title,
        source: d.source,
        year: d.year,
        displayCategory: crisis ? 'Crisis' : 'Algorithm',
        isCrisis: crisis,
        link: d.link,
        diagram: d,
      });
    }
  });

  return [...byId.values()];
}

const CATALOGUE = buildCatalogue();
const SOCIETIES = [...new Set(CATALOGUE.map(i => i.source))].sort();
const CATEGORIES = [...new Set(CATALOGUE.map(i => i.displayCategory))].sort();

type TypeFilter = 'all' | 'crisis' | 'algorithm' | 'summary';

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

  const filtered = CATALOGUE.filter(item => {
    if (typeFilter === 'crisis' && !item.isCrisis) return false;
    if (typeFilter === 'algorithm' && (!item.diagram || item.isCrisis)) return false;
    if (typeFilter === 'summary' && !item.summary) return false;
    if (societyFilter !== 'all' && item.source !== societyFilter) return false;
    if (categoryFilter !== 'all' && item.displayCategory !== categoryFilter) return false;
    return true;
  });

  const items = searchItemsDeep(filtered, searchTerm);
  const sorted = [...items].sort((a, b) => {
    if (a.isCrisis !== b.isCrisis) return a.isCrisis ? -1 : 1;
    const aAlgo = a.diagram ? 1 : 0;
    const bAlgo = b.diagram ? 1 : 0;
    if (aAlgo !== bAlgo) return bAlgo - aAlgo;
    return b.year - a.year;
  });

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

  const pills: { id: TypeFilter; label: string; active: string }[] = [
    { id: 'all', label: 'All', active: 'bg-white text-indigo-600 shadow-sm' },
    { id: 'crisis', label: '🚨 Crisis', active: 'bg-rose-600 text-white shadow-sm' },
    { id: 'algorithm', label: '📘 Algorithms', active: 'bg-indigo-600 text-white shadow-sm' },
    { id: 'summary', label: '📄 Summaries', active: 'bg-slate-700 text-white shadow-sm' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-4">
        {/* Type filter */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-[11px] font-bold">
          {pills.map(p => (
            <button
              key={p.id}
              onClick={() => setTypeFilter(p.id)}
              className={`flex-1 py-2 rounded-lg transition-all ${typeFilter === p.id ? p.active : 'text-slate-500 hover:text-slate-800'}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Society & category filters */}
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

        <div className="relative">
          <input
            type="text"
            placeholder={t('common.search')} aria-label={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-medical-border text-sm outline-none focus:ring-2 focus:ring-medical-accent transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">{sorted.length} items</p>

        <div className="space-y-3 max-h-[560px] overflow-y-auto pr-2 custom-scrollbar">
          {sorted.map((item) => {
            const active = selectedId === item.id;
            const badge = item.isCrisis ? '🚨' : item.diagram && item.summary ? '📘📄' : item.diagram ? '📘' : '📄';
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  active
                    ? item.isCrisis ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                      : item.summary && !item.diagram ? 'bg-slate-700 text-white border-slate-700 shadow-md'
                      : 'bg-medical-primary text-white border-medical-primary shadow-md'
                    : item.isCrisis ? 'bg-rose-50/60 text-slate-800 border-rose-200 hover:bg-rose-100/70'
                      : 'bg-white text-slate-600 border-medical-border hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      active ? 'bg-white/20 text-white' : item.isCrisis ? 'bg-rose-200 text-rose-800 font-black' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.source}
                    </span>
                    {item.isCrisis && (
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${active ? 'bg-white/30 text-white' : 'bg-rose-600 text-white'}`}>
                        EMERGENCY
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] opacity-60 font-medium">{item.year}</span>
                </div>
                <h3 className="font-bold text-sm leading-tight">
                  <span className="mr-1" aria-hidden="true">{badge}</span>
                  <Highlight text={item.title} query={searchTerm} />
                </h3>
                <p className={`text-[10px] uppercase tracking-wider mt-1 ${active ? 'text-white/60' : 'text-slate-400'}`}>
                  {item.displayCategory}
                </p>
              </button>
            );
          })}
          {sorted.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-8">No guidelines match your filters.</p>
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl border border-medical-border shadow-sm overflow-hidden"
            >
              <div className={`p-6 border-b flex justify-between items-center ${
                selected.isCrisis ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-medical-border'
              }`}>
                <div>
                  <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-1 ${
                    selected.isCrisis ? 'text-rose-700 font-black' : 'text-medical-accent'
                  }`}>
                    {selected.isCrisis ? (
                      <><AlertCircle className="w-4 h-4 text-rose-600" /> EMERGENCY CRISIS COGNITIVE AID CARD</>
                    ) : selected.summary && selected.diagram ? (
                      <><ShieldCheck className="w-4 h-4" /> GUIDELINE SUMMARY &amp; ALGORITHM</>
                    ) : selected.diagram ? (
                      <><ShieldCheck className="w-4 h-4" /> {t('common.visualAlgorithm')}</>
                    ) : (
                      <><FileText className="w-4 h-4" /> GUIDELINE SUMMARY</>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-medical-primary">{selected.title}</h2>
                  <div className="flex items-center gap-2 mt-2">
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
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-8">
                {selected.summary && (
                  <p className="text-sm text-slate-700 leading-relaxed">{selected.summary.summary}</p>
                )}

                {selected.summary && selected.diagram && <div className="my-6 border-t border-slate-100" />}

                {selected.diagram && (
                  <div className="relative space-y-8">
                    {selected.diagram.steps.map((step, i, arr) => (
                      <div key={i} className="relative">
                        {i < arr.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-100 -mb-8 flex flex-col items-center justify-center">
                            <ArrowRight className="w-3 h-3 text-slate-300 rotate-90" />
                          </div>
                        )}
                        <div className={`flex items-start gap-4 p-4 rounded-xl border-2 ${getTypeStyles(step.type)}`}>
                          <div className="mt-1 p-2 rounded-lg bg-white/50">{getTypeIcon(step.type)}</div>
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
