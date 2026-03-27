import { useState } from 'react';
import { Stethoscope, Search, ChevronRight, AlertCircle, Activity, ShieldAlert, ClipboardList, ArrowRight, Droplets, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONDITIONS_DATA } from '../data/conditions';
import { ConditionProtocol, TreatmentStep } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

function TreatmentDiagram({ steps }: { steps: TreatmentStep[] }) {
  const { t } = useLanguage();
  return (
    <div className="space-y-4 my-8">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('common.algorithm')}</h4>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                step.type === 'action' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                step.type === 'decision' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                step.type === 'warning' ? 'bg-rose-50 border-rose-200 text-rose-600' :
                'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-12 bg-slate-100 my-1" />
              )}
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
    </div>
  );
}

export default function Conditions() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { t } = useLanguage();

  const formatCategory = (cat: string) => {
    if (cat === 'All') return t('common.all');
    return cat.split(' > ').map(part => t(`category.${part}`)).join(' > ');
  };

  const selectedCondition = CONDITIONS_DATA.find(c => c.id === selectedId);
  
  const categories = ['All', ...new Set(CONDITIONS_DATA.map(c => c.category.split(' > ')[0]))];

  const filteredConditions = CONDITIONS_DATA.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category.startsWith(activeCategory);
    return matchesSearch && matchesCategory;
  });

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
          <div className="relative mb-6">
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none text-sm outline-none focus:ring-2 focus:ring-medical-accent transition-all"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      {t('common.diagnosis')}
                    </h3>
                    <ul className="space-y-3">
                      {selectedCondition.diagnosis.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {selectedCondition.normalLabRanges && (
                    <section className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100">
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
                    </section>
                  )}

                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
                      <Activity className="w-4 h-4 text-blue-500" />
                      {t('common.actions')}
                    </h3>
                    <ul className="space-y-3">
                      {selectedCondition.immediateActions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="space-y-8">
                  {selectedCondition.diagram && (
                    <TreatmentDiagram steps={selectedCondition.diagram} />
                  )}

                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
                      <ClipboardList className="w-4 h-4 text-medical-accent" />
                      {t('common.secondary')}
                    </h3>
                    <ul className="space-y-3">
                      {selectedCondition.secondaryManagement.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <ArrowRight className="w-3 h-3 text-medical-accent mt-1 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

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
                  <p className="text-sm text-slate-600 italic">{selectedCondition.notes}</p>
                </div>
              )}
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
