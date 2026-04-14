import { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  ChevronRight, 
  AlertCircle, 
  Activity, 
  ShieldAlert, 
  ClipboardList, 
  ArrowRight, 
  Droplets, 
  AlertTriangle, 
  Info, 
  ShieldCheck, 
  TrendingUp,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConditionProtocol } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useData } from '../../hooks/useData';

// Shared Components & Hooks
import { usePersistentState } from '../../hooks/usePersistentState';
import { useModuleSearch } from '../../hooks/useModuleSearch';
import { StepTimeline } from '../../components/shared/StepTimeline';
import { CommandCard } from '../../components/shared/CommandCard';
import { InfoSection } from '../../components/shared/DetailSection';
import { ModuleEmptyState } from '../../components/shared/ModuleEmptyState';
import SearchInput from '../../components/SearchInput';

export default function Conditions() {
  const { conditions: rawConditions } = useData();
  const CONDITIONS_DATA = rawConditions as ConditionProtocol[];
  
  const [selectedId, setSelectedId] = usePersistentState<string | null>('anestassist_conditions_selected_id', null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search doesn't necessarily need persistence across sessions if refined
  const [activeCategory, setActiveCategory] = usePersistentState<string>('anestassist_conditions_active_category', 'All');
  
  const { t } = useLanguage();

  const formatCategory = (cat: string) => {
    if (cat === 'All') return t('common.all');
    return cat.split(' > ').map(part => t(`category.${part}`)).join(' > ');
  };

  const categories = ['All', ...new Set(CONDITIONS_DATA.map(c => c.category.split(' > ')[0]))];

  const filteredConditions = useModuleSearch<ConditionProtocol>({
    data: CONDITIONS_DATA,
    searchTerm,
    searchFields: ['name', 'category'],
    filter: (c) => activeCategory === 'All' || c.category.startsWith(activeCategory)
  });

  // Sync selection with filter
  useEffect(() => {
    if (selectedId && !filteredConditions.some(c => c.id === selectedId)) {
      if (filteredConditions.length > 0) {
        setSelectedId(filteredConditions[0].id);
      } else {
        setSelectedId(null);
      }
    }
  }, [filteredConditions, selectedId, setSelectedId]);

  const selectedCondition = CONDITIONS_DATA.find(c => c.id === selectedId) || null;

  const getSeverityStyles = (severity: string, isSelected: boolean) => {
    switch (severity) {
      case 'critical':
        return isSelected ? 'bg-rose-600 border-rose-600 text-white' : 'bg-rose-50 border-rose-100 text-rose-600';
      case 'urgent':
        return isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'bg-amber-50 border-amber-100 text-amber-600';
      default:
        return isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'bg-blue-50 border-blue-100 text-blue-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="w-3 h-3" />;
      case 'urgent': return <AlertTriangle className="w-3 h-3" />;
      default: return <Info className="w-3 h-3" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-medical-border shadow-sm">
          <div className="mb-6">
            <SearchInput
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat 
                    ? 'bg-medical-primary text-white shadow-md' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? t('common.all') : t(`category.${cat}`)}
              </button>
            ))}
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredConditions.map((condition) => (
              <button
                key={condition.id}
                onClick={() => setSelectedId(condition.id)}
                className={`w-full text-left p-4 rounded-xl text-sm transition-all flex items-center justify-between group border ${
                  selectedId === condition.id 
                    ? 'bg-medical-primary text-white border-medical-primary shadow-lg' 
                    : 'bg-white border-medical-border hover:border-medical-accent text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getSeverityStyles(condition.severity, selectedId === condition.id)}`}>
                    {getSeverityIcon(condition.severity)}
                  </div>
                  <div>
                    <p className="font-bold leading-tight">{condition.name}</p>
                    <p className={`text-[10px] uppercase tracking-widest mt-0.5 ${selectedId === condition.id ? 'text-white/60' : 'text-slate-400'}`}>
                      {formatCategory(condition.category)}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedId === condition.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {selectedCondition ? (
            <motion.div
              key={selectedCondition.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-2xl border border-medical-border shadow-sm min-h-[600px]"
            >
              <div className="flex items-start justify-between mb-8 pb-6 border-b border-medical-border">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-medical-accent uppercase tracking-[0.2em]">
                      <Activity className="w-3.5 h-3.5" />
                      {t('common.algorithm')}
                    </div>
                    <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      selectedCondition.severity === 'critical' ? 'bg-rose-100 text-rose-700' :
                      selectedCondition.severity === 'urgent' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {getSeverityIcon(selectedCondition.severity)}
                      {t(`severity.${selectedCondition.severity}`)}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-medical-primary tracking-tight">{selectedCondition.name}</h2>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Stethoscope className="w-6 h-6 text-medical-accent" />
                </div>
              </div>

              {/* SHARED: Anesthesia Command Card */}
              <CommandCard 
                strategies={selectedCondition.anesthesiaStrategy || []} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  {/* SHARED: Diagnosis Section */}
                  <InfoSection 
                    title={t('common.diagnosis')}
                    icon={ShieldAlert}
                    iconColor="text-rose-500"
                    bulletColor="bg-rose-400"
                    items={selectedCondition.diagnosis}
                  />

                  {/* SHARED: Diagnostic Criteria */}
                  <InfoSection 
                    title={t('common.diagnosticCriteria')}
                    icon={ClipboardList}
                    iconColor="text-rose-600"
                    bgColor="bg-rose-50/30"
                    borderColor="border-rose-100"
                    textColor="text-rose-700 font-medium italic"
                    bulletColor="bg-rose-300"
                    items={selectedCondition.diagnosticCriteria || []}
                    variant="compact"
                  />

                  {/* SHARED: Preop Optimization */}
                  <InfoSection 
                    title="Preoperative Optimization"
                    icon={Activity}
                    iconColor="text-emerald-600"
                    bgColor="bg-emerald-50/50"
                    borderColor="border-emerald-100"
                    textColor="text-emerald-900 font-bold"
                    bulletColor="bg-emerald-400"
                    items={selectedCondition.preopOptimization || []}
                  />

                  {/* Lab Ranges Container */}
                  {selectedCondition.normalLabRanges && (
                    <section className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100">
                      <div className="space-y-6">
                        <div>
                          <h3 className="flex items-center gap-2 text-sm font-bold text-amber-800 mb-4">
                            <Activity className="w-4 h-4 text-amber-600" />
                            {t('common.labRanges')}
                          </h3>
                          <div className="grid grid-cols-1 gap-3">
                            {Object.entries(selectedCondition.normalLabRanges).map(([lab, range], i) => (
                              <div key={i} className="flex items-center justify-between text-[11px] border-b border-amber-100/50 pb-2 last:border-0 last:pb-0">
                                <span className="font-medium text-amber-900">{lab}</span>
                                <span className="font-bold text-amber-700">{range}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {selectedCondition.expectedLabDeviations && Object.keys(selectedCondition.expectedLabDeviations).length > 0 && (
                          <div className="pt-4 border-t border-amber-100/50">
                            <h3 className="flex items-center gap-2 text-sm font-bold text-rose-800 mb-4">
                              <AlertCircle className="w-4 h-4 text-rose-600" />
                              {t('common.expectedLabDeviations')}
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                              {Object.entries(selectedCondition.expectedLabDeviations).map(([lab, deviation], i) => (
                                <div key={i} className="flex flex-col text-[11px] border-b border-rose-100/20 pb-2 last:border-0 last:pb-0">
                                  <span className="font-bold text-rose-900">{lab}</span>
                                  <span className="text-rose-700 mt-0.5">{deviation}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* SHARED: Actions Section */}
                  <InfoSection 
                    title={t('common.actions')}
                    icon={Activity}
                    iconColor="text-blue-500"
                    bulletColor="bg-blue-400"
                    items={selectedCondition.immediateActions}
                  />

                  {/* SHARED: Integrated Risk Scores */}
                  <div className="space-y-2">
                    {selectedCondition.linkedScoreIds && selectedCondition.linkedScoreIds.length > 0 && (
                      <section className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                        <h3 className="flex items-center gap-2 text-xs font-black text-indigo-800 mb-4 uppercase tracking-widest">
                          <Activity className="w-4 h-4 text-indigo-600" />
                          Integrated Risk Scores
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCondition.linkedScoreIds.map((scoreId, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs font-black text-indigo-600 shadow-sm flex items-center gap-2"
                            >
                              <ChevronRight className="w-3 h-3" />
                              {scoreId.toUpperCase().replace('_', ' ')}
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  {/* SHARED: Treatment Timeline */}
                  {selectedCondition.diagram && (
                    <StepTimeline 
                      steps={selectedCondition.diagram} 
                      title={t('common.algorithm')}
                    />
                  )}

                  {/* SHARED: Differential Diagnosis */}
                  {selectedCondition.differentialDiagnosis && selectedCondition.differentialDiagnosis.length > 0 && (
                    <section className="p-5 bg-slate-50/50 rounded-2xl border border-slate-200">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
                        <Search className="w-4 h-4 text-slate-600" />
                        {t('common.differentialDiagnosis')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCondition.differentialDiagnosis.map((item, i) => (
                          <span key={i} className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                            {item}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* SHARED: Secondary Management */}
                  <InfoSection 
                    title={t('common.secondary')}
                    icon={ClipboardList}
                    iconColor="text-medical-accent"
                    bulletColor="bg-medical-accent"
                    items={selectedCondition.secondaryManagement}
                  />

                  {/* Postop Recovery */}
                  {selectedCondition.postopDisposition && (
                    <section className="p-6 bg-slate-100/50 rounded-3xl border border-slate-200 shadow-sm">
                      <h3 className="flex items-center gap-2 text-xs font-black text-slate-800 mb-4 uppercase tracking-widest">
                        <ArrowRight className="w-4 h-4 text-slate-600" />
                        Postoperative Recovery
                      </h3>
                      <div className="p-4 bg-white rounded-2xl border border-slate-200">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Recovery Level</p>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{selectedCondition.postopDisposition}</p>
                      </div>
                    </section>
                  )}

                  {/* Fluid Management */}
                  {selectedCondition.ivFluidManagement && (
                    <section className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-blue-800 mb-4">
                        <Droplets className="w-4 h-4 text-blue-600" />
                        {t('common.fluidManagement')}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{t('common.choices')}</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedCondition.ivFluidManagement.choices.map((choice, i) => (
                              <span key={i} className="px-2 py-1 bg-white border border-blue-100 rounded-md text-[11px] text-blue-700 font-medium">
                                {choice}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{t('common.targets')}</p>
                            <ul className="space-y-1">
                              {selectedCondition.ivFluidManagement.targets.map((target, i) => (
                                <li key={i} className="text-[11px] text-blue-700 flex items-center gap-1.5">
                                  <div className="w-1 h-1 rounded-full bg-blue-400" />
                                  {target}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{t('common.monitoring')}</p>
                            <ul className="space-y-1">
                              {selectedCondition.ivFluidManagement.monitoring.map((item, i) => (
                                <li key={i} className="text-[11px] text-blue-700 flex items-center gap-1.5">
                                  <div className="w-1 h-1 rounded-full bg-blue-400" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>

              {selectedCondition.notes && (
                <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-medical-border">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('common.notes')}</h4>
                  <p className="text-sm text-slate-600 italic leading-relaxed">{selectedCondition.notes}</p>
                </div>
              )}
            </motion.div>
          ) : (
            <ModuleEmptyState 
              icon={Stethoscope}
              title={t('common.selectProtocol')}
              description={t('common.selectProtocolDesc')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
