import { useState, useMemo } from 'react';
import { Calculator, ChevronRight, Info, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINICAL_SCORES } from '../data/scores';
import { useLanguage } from '../contexts/LanguageContext';

export default function ClinicalScores() {
  const { t } = useLanguage();
  const [selectedScoreId, setSelectedScoreId] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const selectedScore = useMemo(() => 
    CLINICAL_SCORES.find(s => s.id === selectedScoreId),
    [selectedScoreId]
  );

  const totalScore = useMemo(() => {
    if (!selectedScore) return 0;
    return selectedScore.criteria.reduce((sum, criterion) => {
      const selectedOptionLabel = selections[criterion.id];
      if (!selectedOptionLabel) return sum;
      const option = criterion.options.find(o => o.label === selectedOptionLabel);
      return sum + (option?.points || 0);
    }, 0);
  }, [selectedScore, selections]);

  const riskLevel = useMemo(() => {
    if (!selectedScore) return null;
    return selectedScore.riskLevels.find(rl => totalScore >= rl.min && totalScore <= rl.max);
  }, [selectedScore, totalScore]);

  const handleSelectOption = (criterionId: string, optionLabel: string) => {
    setSelections(prev => ({
      ...prev,
      [criterionId]: optionLabel
    }));
  };

  const resetScore = () => {
    setSelections({});
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-medical-border shadow-sm">
          <h3 className="text-lg font-bold text-medical-primary mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-medical-accent" />
            {t('nav.scores')}
          </h3>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {CLINICAL_SCORES.map((score) => (
              <button
                key={score.id}
                onClick={() => {
                  setSelectedScoreId(score.id);
                  resetScore();
                }}
                className={`w-full text-left p-4 rounded-xl text-sm transition-all flex items-center justify-between group border relative overflow-hidden ${
                  selectedScoreId === score.id 
                    ? 'bg-medical-primary text-white border-medical-primary shadow-lg scale-[1.02]' 
                    : 'bg-white border-medical-border hover:border-medical-accent hover:bg-slate-50 text-slate-700 hover:translate-x-1'
                }`}
              >
                {selectedScoreId === score.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-medical-accent"
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    selectedScoreId === score.id ? 'bg-white/20' : 'bg-slate-100 text-medical-accent group-hover:bg-medical-accent/10'
                  }`}>
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold leading-tight">{score.name}</p>
                    <p className={`text-[10px] uppercase tracking-widest mt-0.5 font-medium ${
                      selectedScoreId === score.id ? 'text-white/60' : 'text-slate-400'
                    }`}>
                      {score.category}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-all ${
                  selectedScoreId === score.id ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {selectedScore ? (
            <motion.div
              key={selectedScore.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-8 rounded-2xl border border-medical-border shadow-sm min-h-[600px]"
            >
              <div className="flex items-start justify-between mb-8 pb-6 border-b border-medical-border">
                <div>
                  <h2 className="text-3xl font-bold text-medical-primary tracking-tight">{selectedScore.name}</h2>
                  <p className="text-sm text-slate-500 mt-2 max-w-2xl">{selectedScore.description}</p>
                </div>
                <button 
                  onClick={resetScore}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-slate-500 hover:text-medical-accent group border border-slate-100"
                  title="Reset Score"
                >
                  <RefreshCw className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                  <span className="text-xs font-bold uppercase tracking-wider">Reset Score</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-8">
                  {selectedScore.criteria.map((criterion) => (
                    <div key={criterion.id} className="space-y-4">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-medical-accent shadow-[0_0_8px_rgba(242,125,38,0.4)]" />
                        {criterion.label}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {criterion.options.map((option, idx) => {
                          const isSelected = selections[criterion.id] === option.label;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectOption(criterion.id, option.label)}
                              className={`p-4 rounded-2xl text-xs text-left border-2 transition-all relative group ${
                                isSelected
                                  ? 'bg-medical-primary/5 border-medical-primary text-medical-primary shadow-md ring-4 ring-medical-primary/5'
                                  : 'bg-white border-slate-100 text-slate-600 hover:border-medical-accent/30 hover:bg-slate-50/50'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-bold leading-tight pr-4">{option.label}</span>
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-black transition-colors ${
                                  isSelected ? 'bg-medical-primary text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                                }`}>
                                  {option.points > 0 ? `+${option.points}` : option.points}
                                </span>
                              </div>
                              {option.description && (
                                <p className="text-[10px] opacity-70 leading-relaxed font-medium">{option.description}</p>
                              )}
                              {isSelected && (
                                <motion.div 
                                  layoutId={`check-${criterion.id}`}
                                  className="absolute -top-2 -right-2 bg-medical-primary text-white p-1 rounded-full shadow-lg border-2 border-white"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                </motion.div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Score Result Card */}
                <div className="sticky bottom-0 pt-8 pb-4 bg-white/80 backdrop-blur-sm">
                  <div className={`p-6 rounded-3xl border-2 transition-all shadow-xl ${
                    riskLevel ? riskLevel.color : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black shadow-inner ${
                          riskLevel ? 'bg-white/40' : 'bg-white'
                        }`}>
                          {totalScore}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-1">Total Score</p>
                          <h4 className="text-2xl font-black uppercase tracking-tight">
                            {riskLevel ? riskLevel.label : 'Incomplete'}
                          </h4>
                        </div>
                      </div>
                      
                      {riskLevel && (
                        <div className="flex-1 md:max-w-md">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium leading-relaxed">
                              {riskLevel.description}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {!riskLevel && (
                        <div className="flex items-center gap-2 text-slate-400 italic text-sm">
                          <AlertCircle className="w-4 h-4" />
                          Complete all criteria to see risk level
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-medical-border border-dashed flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[600px]">
              <div className="p-6 bg-slate-50 rounded-full">
                <Calculator className="w-16 h-16 text-slate-200" />
              </div>
              <div className="max-w-xs">
                <h3 className="text-xl font-bold text-slate-700 mb-2">{t('common.selectScore')}</h3>
                <p className="text-sm text-slate-500">{t('common.selectScoreDesc')}</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
