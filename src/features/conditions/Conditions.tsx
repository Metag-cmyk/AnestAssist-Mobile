import { useState, useEffect, useMemo } from 'react';
import type { ElementType, ReactNode } from 'react';
import {
  Stethoscope, Search, AlertCircle, Activity, ShieldAlert, ClipboardList, ArrowRight,
  ArrowLeft, Droplets, AlertTriangle, Info, Star, Printer, Link2, X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PatientParameterCard } from '../../components/PatientParameterCard';
import { ConditionProtocol, TreatmentStep } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { searchItemsDeep } from '../../lib/search';
import { Highlight } from '../../components/Highlight';
import { CONDITIONS_DATA } from './data';
import { resolveDifferential } from './differential';
import { STORAGE_KEYS } from '../../config/storageKeys';
import { guidelineIdsForCondition, scoreIdsForCondition, infusionIdsForCondition } from '../../lib/crossLinks';
import { CLINICAL_SCORES } from '../scores/data';
import { INFUSION_PROTOCOLS } from '../therapies/infusionProtocols';

type SeverityFilter = 'all' | 'critical' | 'urgent' | 'standard';

const SEV_RANK: Record<string, number> = { critical: 0, urgent: 1, standard: 2 };

function readStringArray(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Detail sub-views                                                    */
/* ------------------------------------------------------------------ */

function DifferentialMatrixView({ condition }: { condition: ConditionProtocol }) {
  const { triggers, items: matrixItems } = resolveDifferential(condition);

  return (
    <section className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Search className="w-4 h-4 text-indigo-600" />
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Diagnostic Triggers &amp; Differential</h3>
      </div>

      {triggers && triggers.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Key diagnostic triggers</p>
          <div className="flex flex-wrap gap-2">
            {triggers.map((trig, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                {trig}
              </span>
            ))}
          </div>
        </div>
      )}

      {matrixItems && matrixItems.length > 0 && (
        <div className="space-y-3 pt-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Differential diagnosis &amp; distinguishing features</p>
          <div className="grid grid-cols-1 gap-3">
            {matrixItems.map((item, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                    {item.condition}
                  </h4>
                  {item.pocusOrKeyTest && (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 shrink-0">
                      {item.pocusOrKeyTest.split(':')[0]}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-3 border-l-2 border-indigo-200">
                  <strong className="text-slate-800">Distinguishing features: </strong>
                  {item.distinguishingFeatures}
                </p>
                {item.pocusOrKeyTest && (
                  <p className="text-[11px] text-indigo-950 bg-indigo-50/60 p-2 rounded-lg font-mono">🔍 {item.pocusOrKeyTest}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function TreatmentDiagram({ steps }: { steps: TreatmentStep[] }) {
  const { t } = useLanguage();
  return (
    <section className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
        <Activity className="w-4 h-4 text-indigo-500" /> {t('common.algorithm')}
      </h3>
      <div className="flex flex-col gap-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex flex-col items-center self-stretch">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 ${
                step.type === 'action' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                step.type === 'decision' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                step.type === 'warning' ? 'bg-rose-50 border-rose-200 text-rose-600' :
                'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 my-1" />}
            </div>
            <div className={`flex-1 p-4 rounded-xl border ${
              step.type === 'action' ? 'bg-blue-50/30 border-blue-100' :
              step.type === 'decision' ? 'bg-amber-50/30 border-amber-100' :
              step.type === 'warning' ? 'bg-rose-50/30 border-rose-100' :
              'bg-slate-50/30 border-slate-100'
            }`}>
              <p className="font-bold text-sm text-slate-800">{step.title}</p>
              <p className="text-xs text-slate-500 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Section({ icon: Icon, title, tone = 'slate', children }: {
  icon: ElementType; title: string; tone?: 'slate' | 'rose' | 'emerald' | 'blue' | 'amber'; children: ReactNode;
}) {
  const tones = {
    slate: 'text-slate-800',
    rose: 'text-rose-800',
    emerald: 'text-emerald-800',
    blue: 'text-blue-800',
    amber: 'text-amber-800',
  } as const;
  const iconTones = {
    slate: 'text-slate-500',
    rose: 'text-rose-500',
    emerald: 'text-emerald-500',
    blue: 'text-blue-500',
    amber: 'text-amber-500',
  } as const;
  return (
    <section className="space-y-4">
      <h3 className={`flex items-center gap-2 text-sm font-bold ${tones[tone]}`}>
        <Icon className={`w-4 h-4 ${iconTones[tone]}`} /> {title}
      </h3>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function Conditions() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState<string | null>(() => localStorage.getItem(STORAGE_KEYS.CONDITIONS_SELECTED_ID));
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem(STORAGE_KEYS.CONDITIONS_SEARCH) || '');
  const [activeCategory, setActiveCategory] = useState<string>(() => localStorage.getItem(STORAGE_KEYS.CONDITIONS_ACTIVE_CATEGORY) || 'All');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>(() => (localStorage.getItem(STORAGE_KEYS.CONDITIONS_SEVERITY) as SeverityFilter) || 'all');
  const [favourites, setFavourites] = useState<string[]>(() => readStringArray(STORAGE_KEYS.CONDITIONS_FAVOURITES));
  const [recent, setRecent] = useState<string[]>(() => readStringArray(STORAGE_KEYS.CONDITIONS_RECENT));

  useEffect(() => {
    if (selectedId) localStorage.setItem(STORAGE_KEYS.CONDITIONS_SELECTED_ID, selectedId);
    else localStorage.removeItem(STORAGE_KEYS.CONDITIONS_SELECTED_ID);
  }, [selectedId]);

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CONDITIONS_SEARCH, searchTerm); }, [searchTerm]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CONDITIONS_ACTIVE_CATEGORY, activeCategory); }, [activeCategory]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CONDITIONS_SEVERITY, severityFilter); }, [severityFilter]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CONDITIONS_FAVOURITES, JSON.stringify(favourites)); }, [favourites]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CONDITIONS_RECENT, JSON.stringify(recent)); }, [recent]);

  // Track recently viewed
  useEffect(() => {
    if (!selectedId) return;
    setRecent(prev => [selectedId, ...prev.filter(id => id !== selectedId)].slice(0, 6));
  }, [selectedId]);

  const formatCategory = (cat: string, sub = false) => {
    if (cat === 'All') return t('common.all');
    const parts = cat.split(' > ').map(part => t(`category.${part}`));
    return (sub ? parts.join(' › ') : parts[0]);
  };

  const inCategory = (c: ConditionProtocol) =>
    activeCategory === 'All'
      ? true
      : activeCategory.includes(' > ')
        ? c.category === activeCategory
        : c.category.startsWith(activeCategory);

  const categoryOptions = useMemo(
    () => ['All', ...new Set(CONDITIONS_DATA.flatMap(c => {
      const top = c.category.split(' > ')[0];
      return c.category.includes(' > ') ? [top, c.category] : [top];
    }))],
    []
  );

  const severityCounts = useMemo(() => {
    const base = CONDITIONS_DATA.filter(inCategory);
    return {
      all: base.length,
      critical: base.filter(c => c.severity === 'critical').length,
      urgent: base.filter(c => c.severity === 'urgent').length,
      standard: base.filter(c => c.severity === 'standard').length,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const filtered: ConditionProtocol[] = useMemo(() => {
    const base = CONDITIONS_DATA.filter(c => inCategory(c) && (severityFilter === 'all' || c.severity === severityFilter));
    return searchItemsDeep(base, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, severityFilter, searchTerm]);

  const groups = useMemo(() => {
    const map = new Map<string, ConditionProtocol[]>();
    filtered.forEach(c => {
      const top = c.category.split(' > ')[0];
      const list = map.get(top) ?? [];
      list.push(c);
      map.set(top, list);
    });
    return [...map.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([category, items]) => [category, [...items].sort((x, y) => (SEV_RANK[x.severity] - SEV_RANK[y.severity]) || x.name.localeCompare(y.name))] as const);
  }, [filtered]);

  const favouriteItems = filtered.filter(c => favourites.includes(c.id));
  const recentItems = recent.map(id => CONDITIONS_DATA.find(c => c.id === id)).filter((c): c is ConditionProtocol => Boolean(c)).slice(0, 6);

  const hasActiveFilters = severityFilter !== 'all' || activeCategory !== 'All' || searchTerm.trim() !== '';
  const clearFilters = () => { setSeverityFilter('all'); setActiveCategory('All'); setSearchTerm(''); };

  const toggleFavourite = (id: string) =>
    setFavourites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const selectedCondition = CONDITIONS_DATA.find(c => c.id === selectedId) || null;

  // Cross-module related links
  const relatedGuidelines = selectedCondition ? guidelineIdsForCondition(selectedCondition.id) : [];
  const relatedScores = selectedCondition ? scoreIdsForCondition(selectedCondition.id) : [];
  const relatedInfusions = selectedCondition ? infusionIdsForCondition(selectedCondition.id) : [];
  const scoreName = (id: string) => CLINICAL_SCORES.find(s => s.id === id)?.name ?? id;
  const infusionName = (id: string) => INFUSION_PROTOCOLS.find(p => p.id === id)?.name ?? id;

  const openGuideline = (id: string) => { localStorage.setItem(STORAGE_KEYS.GUIDELINES_SELECTED_ID, id); navigate('/guidelines'); };
  const openScore = (id: string) => { localStorage.setItem(STORAGE_KEYS.SCORES_SELECTED_ID, id); navigate('/scores'); };
  const openInfusion = (id: string) => {
    localStorage.setItem(STORAGE_KEYS.INFUSION_DRUG, id);
    localStorage.setItem(STORAGE_KEYS.THERAPIES_ACTIVE_TAB, 'infusions');
    navigate('/therapies');
  };

  const getSeverityStyles = (severity: string, isSelected: boolean) => {
    switch (severity) {
      case 'critical': return isSelected ? 'bg-rose-600 border-rose-600 text-white' : 'bg-rose-50 border-rose-100 text-rose-600';
      case 'urgent': return isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'bg-amber-50 border-amber-100 text-amber-600';
      default: return isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'bg-blue-50 border-blue-100 text-blue-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="w-3 h-3" />;
      case 'urgent': return <AlertTriangle className="w-3 h-3" />;
      default: return <Info className="w-3 h-3" />;
    }
  };

  const severityTabs: { id: SeverityFilter; label: string; active: string }[] = [
    { id: 'all', label: 'All', active: 'bg-white text-indigo-600 shadow-sm' },
    { id: 'critical', label: 'Critical', active: 'bg-rose-600 text-white shadow-sm' },
    { id: 'urgent', label: 'Urgent', active: 'bg-amber-500 text-white shadow-sm' },
    { id: 'standard', label: 'Standard', active: 'bg-blue-500 text-white shadow-sm' },
  ];

  const ListItem = ({ condition }: { condition: ConditionProtocol }) => {
    const active = selectedId === condition.id;
    const fav = favourites.includes(condition.id);
    return (
      <button
        onClick={() => setSelectedId(condition.id)}
        className={`w-full text-left p-4 rounded-xl text-sm transition-all flex items-center justify-between gap-3 group border ${
          active ? 'bg-medical-primary text-white border-medical-primary shadow-lg' : 'bg-white border-medical-border hover:border-medical-accent text-slate-700'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getSeverityStyles(condition.severity, active)}`}>
            {getSeverityIcon(condition.severity)}
          </div>
          <div className="min-w-0">
            <p className="font-bold leading-tight flex items-center gap-1.5">
              {fav && <Star className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-amber-300 fill-amber-300' : 'text-amber-500 fill-amber-500'}`} />}
              <span className="truncate"><Highlight text={condition.name} query={searchTerm} /></span>
            </p>
            <p className={`text-[10px] uppercase tracking-widest mt-0.5 ${active ? 'text-white/60' : 'text-slate-400'}`}>
              {formatCategory(condition.category, true)} · {condition.immediateActions.length} actions
            </p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ===== List pane ===== */}
      <div className={`lg:col-span-4 space-y-4 print:hidden ${selectedCondition ? 'hidden lg:block' : ''}`}>
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
            <button onClick={() => setSearchTerm('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Severity tabs with counts */}
        <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
          {severityTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSeverityFilter(tab.id)}
              aria-pressed={severityFilter === tab.id}
              className={`py-2 rounded-lg transition-all ${severityFilter === tab.id ? tab.active : 'text-slate-500 hover:text-slate-800'}`}
            >
              <span className="block leading-none">{tab.label}</span>
              <span className={`block mt-0.5 text-[9px] font-black ${severityFilter === tab.id ? 'opacity-80' : 'text-slate-400'}`}>
                {severityCounts[tab.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Category */}
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          aria-label="Filter by category"
          className="w-full bg-white border border-medical-border rounded-xl px-3 py-2 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-medical-accent"
        >
          {categoryOptions.map(c => (
            <option key={c} value={c}>{c === 'All' ? 'All categories' : formatCategory(c, true)}</option>
          ))}
        </select>

        {/* Result count + clear */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {filtered.length} condition{filtered.length === 1 ? '' : 's'}
          </span>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-[10px] font-bold text-medical-accent hover:underline uppercase tracking-wider">Clear</button>
          )}
        </div>

        {/* Recently viewed */}
        {recentItems.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {recentItems.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-500 hover:border-medical-accent hover:text-medical-accent transition-colors"
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {/* Grouped list */}
        <div className="space-y-5 max-h-[620px] lg:max-h-[calc(100vh-26rem)] overflow-y-auto pr-1 custom-scrollbar">
          {favouriteItems.length > 0 && (
            <div>
              <h3 className="sticky top-0 z-10 bg-white/95 backdrop-blur px-1 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Favourites · {favouriteItems.length}
              </h3>
              <div className="space-y-2 mt-1">
                {favouriteItems.map(c => <ListItem key={c.id} condition={c} />)}
              </div>
            </div>
          )}

          {groups.map(([category, items]) => (
            <div key={category}>
              <h3 className="sticky top-0 z-10 bg-white/95 backdrop-blur px-1 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <span>{formatCategory(category)}</span><span className="text-slate-300">·</span><span>{items.length}</span>
              </h3>
              <div className="space-y-2 mt-1">
                {items.map(c => <ListItem key={c.id} condition={c} />)}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-10 px-4">
              <p className="text-sm text-slate-400">No conditions match your filters.</p>
              <button onClick={clearFilters} className="mt-3 text-xs font-bold text-medical-accent hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </div>

      {/* ===== Detail pane ===== */}
      <div className={`lg:col-span-8 ${selectedCondition ? '' : 'hidden lg:block'}`}>
        <PatientParameterCard className="mb-6 hidden lg:block" />
        <AnimatePresence mode="wait">
          {selectedCondition ? (
            <motion.div
              key={selectedCondition.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white p-5 sm:p-8 rounded-2xl border border-medical-border shadow-sm min-h-[600px]"
              aria-live="polite"
            >
              {/* Mobile back */}
              <button
                onClick={() => setSelectedId(null)}
                className="lg:hidden mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 print:hidden"
              >
                <ArrowLeft className="w-4 h-4" /> All conditions
              </button>

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-medical-border">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      selectedCondition.severity === 'critical' ? 'bg-rose-100 text-rose-700' :
                      selectedCondition.severity === 'urgent' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {getSeverityIcon(selectedCondition.severity)}
                      {t(`severity.${selectedCondition.severity}`)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{formatCategory(selectedCondition.category, true)}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-medical-primary tracking-tight">{selectedCondition.name}</h2>
                </div>
                <div className="flex items-center gap-1 shrink-0 print:hidden">
                  <button
                    onClick={() => toggleFavourite(selectedCondition.id)}
                    aria-label={favourites.includes(selectedCondition.id) ? 'Remove from favourites' : 'Add to favourites'}
                    title="Favourite"
                    className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <Star className={`w-5 h-5 ${favourites.includes(selectedCondition.id) ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                  </button>
                  <button
                    onClick={() => window.print()}
                    aria-label="Print this protocol"
                    title="Print / save as PDF"
                    className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Related (cross-module) */}
              {(relatedGuidelines.length > 0 || relatedScores.length > 0 || relatedInfusions.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mb-6 print:hidden">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Link2 className="w-3.5 h-3.5" /> Related
                  </span>
                  {relatedGuidelines.map(id => (
                    <button key={id} onClick={() => openGuideline(id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold hover:bg-rose-100 transition-colors">
                      🚨 Crisis card
                    </button>
                  ))}
                  {relatedScores.map(id => (
                    <button key={id} onClick={() => openScore(id)}
                      className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold hover:bg-amber-100 transition-colors">
                      Score: {scoreName(id)}
                    </button>
                  ))}
                  {relatedInfusions.map(id => (
                    <button key={id} onClick={() => openInfusion(id)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold hover:bg-indigo-100 transition-colors">
                      Infusion: {infusionName(id)}
                    </button>
                  ))}
                </div>
              )}

              {/* Priority content: immediate actions first */}
              <div className="space-y-8">
                <section className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-4">
                    <ShieldAlert className="w-4 h-4 text-blue-600" /> {t('common.actions')}
                    <span className="ml-auto text-[10px] font-black uppercase tracking-wider text-blue-500">{selectedCondition.immediateActions.length} steps</span>
                  </h3>
                  <ol className="space-y-3">
                    {selectedCondition.immediateActions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center">{i + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </section>

                {selectedCondition.diagram && <TreatmentDiagram steps={selectedCondition.diagram} />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Section icon={Stethoscope} title={t('common.diagnosis')} tone="rose">
                    <ul className="space-y-3">
                      {selectedCondition.diagnosis.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  {selectedCondition.diagnosticCriteria && selectedCondition.diagnosticCriteria.length > 0 && (
                    <Section icon={ClipboardList} title={t('common.diagnosticCriteria')} tone="rose">
                      <ul className="space-y-2">
                        {selectedCondition.diagnosticCriteria.map((item, i) => (
                          <li key={i} className="text-xs text-slate-600 leading-relaxed flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-rose-300 mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Section>
                  )}
                </div>

                {selectedCondition.normalLabRanges && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Section icon={Activity} title={t('common.labRanges')} tone="amber">
                      <div className="grid grid-cols-1 gap-2">
                        {Object.entries(selectedCondition.normalLabRanges).map(([lab, range], i) => (
                          <div key={i} className="flex items-center justify-between text-[11px] border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                            <span className="font-medium text-slate-600">{lab}</span>
                            <span className="font-bold text-amber-700">{range}</span>
                          </div>
                        ))}
                      </div>
                    </Section>

                    {selectedCondition.expectedLabDeviations && Object.keys(selectedCondition.expectedLabDeviations).length > 0 && (
                      <Section icon={AlertCircle} title={t('common.expectedLabDeviations')} tone="rose">
                        <div className="grid grid-cols-1 gap-2">
                          {Object.entries(selectedCondition.expectedLabDeviations).map(([lab, deviation], i) => (
                            <div key={i} className="flex flex-col text-[11px] border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                              <span className="font-bold text-rose-900">{lab}</span>
                              <span className="text-slate-600 mt-0.5">{deviation}</span>
                            </div>
                          ))}
                        </div>
                      </Section>
                    )}
                  </div>
                )}

                <Section icon={ClipboardList} title={t('common.secondary')} tone="emerald">
                  <ul className="space-y-3">
                    {selectedCondition.secondaryManagement.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <ArrowRight className="w-3 h-3 text-emerald-500 mt-1 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Section>

                {selectedCondition.ivFluidManagement && (
                  <section className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-blue-800 mb-4">
                      <Droplets className="w-4 h-4 text-blue-600" /> {t('common.fluidManagement')}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{t('common.choices')}</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCondition.ivFluidManagement.choices.map((choice, i) => (
                            <span key={i} className="px-2 py-1 bg-white border border-blue-100 rounded-md text-[11px] text-blue-700 font-medium">{choice}</span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{t('common.targets')}</p>
                          <ul className="space-y-1">
                            {selectedCondition.ivFluidManagement.targets.map((target, i) => (
                              <li key={i} className="text-[11px] text-blue-700 flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-blue-400" />{target}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{t('common.monitoring')}</p>
                          <ul className="space-y-1">
                            {selectedCondition.ivFluidManagement.monitoring.map((item, i) => (
                              <li key={i} className="text-[11px] text-blue-700 flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-blue-400" />{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                <DifferentialMatrixView condition={selectedCondition} />

                {selectedCondition.notes && (
                  <section className="p-6 bg-slate-50 rounded-2xl border border-medical-border">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('common.notes')}</h4>
                    <p className="text-sm text-slate-600 italic leading-relaxed">{selectedCondition.notes}</p>
                  </section>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-medical-border border-dashed flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[600px]">
              <div className="p-6 bg-slate-50 rounded-full">
                <Stethoscope className="w-16 h-16 text-slate-200" />
              </div>
              <div className="max-w-xs">
                <h3 className="text-xl font-bold text-slate-700 mb-2">{t('common.selectProtocol')}</h3>
                <p className="text-sm text-slate-500">{t('common.selectProtocolDesc')}</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
