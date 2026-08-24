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
  Search
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useData } from '../../hooks/useData';
import { searchItems } from '../../lib/search';
import { Step } from './data';

export default function GuidelinesDiagrams() {
  const { diagramGuidelines: guidelines } = useData();
  const { t } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('anestassist_guidelines_search_term') || '';
  });
  
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    return localStorage.getItem('anestassist_guidelines_selected_id');
  });

  useEffect(() => {
    localStorage.setItem('anestassist_guidelines_search_term', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedId) localStorage.setItem('anestassist_guidelines_selected_id', selectedId);
    else localStorage.removeItem('anestassist_guidelines_selected_id');
  }, [selectedId]);

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'crisis' | 'algorithms'>('all');

  const categoryFiltered = guidelines.filter(g => {
    if (categoryFilter === 'crisis') return g.isCrisis || g.category === 'crisis';
    if (categoryFilter === 'algorithms') return !g.isCrisis && g.category !== 'crisis';
    return true;
  });

  const filteredGuidelines = searchItems(categoryFiltered, searchTerm, ['title', 'source']);
  const sortedGuidelines = [...filteredGuidelines].sort((a, b) => {
    if (a.isCrisis && !b.isCrisis) return -1;
    if (!a.isCrisis && b.isCrisis) return 1;
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

  const selectedGuideline = guidelines.find(g => g.id === selectedId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar List */}
      <div className="lg:col-span-4 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              categoryFilter === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategoryFilter('crisis')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
              categoryFilter === 'crisis' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 hover:text-rose-600'
            }`}
          >
            🚨 Crisis Cards
          </button>
          <button
            onClick={() => setCategoryFilter('algorithms')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
              categoryFilter === 'algorithms' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            📘 Algorithms
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-medical-border text-sm outline-none focus:ring-2 focus:ring-medical-accent transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {sortedGuidelines.map((g) => {
            const isCrisis = g.isCrisis || g.category === 'crisis';
            return (
              <button
                key={g.id}
                onClick={() => setSelectedId(g.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedId === g.id 
                    ? isCrisis ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-medical-primary text-white border-medical-primary shadow-md'
                    : isCrisis ? 'bg-rose-50/60 text-slate-800 border-rose-200 hover:bg-rose-100/70' : 'bg-white text-slate-600 border-medical-border hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      selectedId === g.id 
                        ? 'bg-white/20 text-white' 
                        : isCrisis ? 'bg-rose-200 text-rose-800 font-black' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {g.source}
                    </span>
                    {isCrisis && (
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                        selectedId === g.id ? 'bg-white/30 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        EMERGENCY
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] opacity-60 font-medium">{g.year}</span>
                </div>
                <h3 className="font-bold text-sm leading-tight">{g.title}</h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diagram View */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {selectedGuideline ? (
            <motion.div
              key={selectedGuideline.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl border border-medical-border shadow-sm overflow-hidden"
            >
              <div className={`p-6 border-b flex justify-between items-center ${
                selectedGuideline.isCrisis || selectedGuideline.category === 'crisis'
                  ? 'bg-rose-50 border-rose-200'
                  : 'bg-slate-50 border-medical-border'
              }`}>
                <div>
                  <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-1 ${
                    selectedGuideline.isCrisis || selectedGuideline.category === 'crisis'
                      ? 'text-rose-700 font-black'
                      : 'text-medical-accent'
                  }`}>
                    {selectedGuideline.isCrisis || selectedGuideline.category === 'crisis' ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        EMERGENCY CRISIS COGNITIVE AID CARD
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        {t('common.visualAlgorithm')}
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-medical-primary">
                    {selectedGuideline.title}
                  </h2>
                </div>
                <a 
                  href={selectedGuideline.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-medical-accent transition-colors"
                  title={t('common.viewFull')}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="p-8">
                <div className="relative space-y-8">
                  {selectedGuideline.steps.map((step, i, arr) => (
                    <div key={i} className="relative">
                      {/* Connector Line */}
                      {i < arr.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-100 -mb-8 flex flex-col items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-slate-300 rotate-90" />
                        </div>
                      )}

                      <div className={`flex items-start gap-4 p-4 rounded-xl border-2 ${getTypeStyles(step.type)}`}>
                        <div className="mt-1 p-2 rounded-lg bg-white/50">
                          {getTypeIcon(step.type)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase tracking-wide">{step.title}</h4>
                          <p className="text-sm opacity-90 mt-0.5">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <BookOpen className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-400">{t('common.selectGuideline')}</h3>
              <p className="text-sm text-slate-400 max-w-xs mt-1">
                {t('common.selectGuidelineDesc')}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
