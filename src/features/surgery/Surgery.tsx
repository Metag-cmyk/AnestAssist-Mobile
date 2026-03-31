import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  Search, 
  ChevronRight, 
  Activity, 
  ShieldCheck, 
  ClipboardList, 
  ArrowRight, 
  AlertTriangle, 
  Info,
  Scissors,
  Syringe,
  Microscope,
  Zap,
  BookOpen
} from 'lucide-react';
import { SURGERY_DATA } from './data';
import { SurgeryProcedure, SurgeryStep } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

function SurgicalGuide({ steps }: { steps: SurgeryStep[] }) {
  const { t } = useLanguage();
  return (
    <div className="space-y-4 my-8">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('surgery.guide')}</h4>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-indigo-50 border-indigo-200 text-indigo-600">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-12 bg-slate-100 my-1" />
              )}
            </div>
            <div className="flex-1 p-4 rounded-xl border bg-indigo-50/30 border-indigo-100">
              <p className="font-bold text-sm text-slate-800">{step.title}</p>
              <p className="text-xs text-slate-500 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThoracicSpirometryAnalyser({ procedureId }: { procedureId: string }) {
  const [fev1, setFev1] = useState('80');
  const [dlco, setDlco] = useState('80');
  const [segments, setSegments] = useState(procedureId === 'pneumonectomy' ? '10' : '3');
  
  const parsedFev1 = parseFloat(fev1) || 0;
  const parsedDlco = parseFloat(dlco) || 0;
  const parsedSegments = parseInt(segments) || 0;

  const fractionRemaining = 1 - (parsedSegments / 19);
  const ppoFev1 = Math.round(parsedFev1 * fractionRemaining);
  const ppoDlco = Math.round(parsedDlco * fractionRemaining);

  const isHighRisk = ppoFev1 < 40 || ppoDlco < 40;

  return (
    <div className="mt-8 p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full" />
      <div className="relative z-10">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
          <Activity className="w-5 h-5 text-sky-400" />
          Quantitative Spirometry Analyser
        </h3>
        <p className="text-slate-400 text-sm mb-6">Calculate predicted postoperative (ppo) pulmonary reserve based on the 19-segment lung model.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pre-op FEV1 (% pred)</label>
            <input 
              type="number" 
              value={fev1} 
              onChange={(e) => setFev1(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pre-op DLCO (% pred)</label>
            <input 
              type="number" 
              value={dlco} 
              onChange={(e) => setDlco(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Functional Segments Removed</label>
            <select 
              value={segments} 
              onChange={(e) => setSegments(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none appearance-none"
            >
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i}>{i} (of 19 total)</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-700 bg-slate-900/30 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex gap-8">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">ppoFEV1</div>
              <div className="text-3xl font-black text-white">{ppoFev1}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">ppoDLCO</div>
              <div className="text-3xl font-black text-white">{ppoDlco}%</div>
            </div>
          </div>
          
          <div className={`flex-1 p-4 rounded-xl border flex items-center gap-3 ${
            isHighRisk ? 'bg-rose-900/20 border-rose-500/30 text-rose-200' : 'bg-emerald-900/20 border-emerald-500/30 text-emerald-200'
          }`}>
            {isHighRisk ? (
              <>
                <div className="p-2 bg-rose-500/20 rounded-lg shrink-0"><AlertTriangle className="w-5 h-5 text-rose-400" /></div>
                <div>
                  <div className="font-bold text-sm text-rose-300">HIGH RISK (ppo {'<'} 40%)</div>
                  <div className="text-xs opacity-80 mt-0.5">Mandatory CPET required. Measure actual VO2 max before clearance.</div>
                </div>
              </>
            ) : (
              <>
                <div className="p-2 bg-emerald-500/20 rounded-lg shrink-0"><ShieldCheck className="w-5 h-5 text-emerald-400" /></div>
                <div>
                  <div className="font-bold text-sm text-emerald-300">LOW RISK (ppo {'>='} 40%)</div>
                  <div className="text-xs opacity-80 mt-0.5">Proceed with standard clearance protocols. Standard extubation likely.</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useData } from '../../hooks/useData';
import { searchItems } from '../../lib/search';

const Surgery: React.FC = () => {
  const { surgery: SURGERY_DATA } = useData();
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    return localStorage.getItem('anestassist_surgery_selected_id');
  });
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('anestassist_surgery_search_term') || '';
  });
  const [activeSpecialty, setActiveSpecialty] = useState<string>(() => {
    return localStorage.getItem('anestassist_surgery_specialty') || 'All';
  });
  
  const { t } = useLanguage();

  useEffect(() => {
    if (selectedId) localStorage.setItem('anestassist_surgery_selected_id', selectedId);
    else localStorage.removeItem('anestassist_surgery_selected_id');
  }, [selectedId]);

  useEffect(() => {
    localStorage.setItem('anestassist_surgery_search_term', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('anestassist_surgery_specialty', activeSpecialty);
  }, [activeSpecialty]);

  const specialties = ['All', ...SURGERY_DATA.map(s => s.name)];
  
  const allProcedures = SURGERY_DATA.flatMap(s => 
    s.procedures.map(p => ({ 
      ...p, 
      specialtyName: s.name, 
      specialtyId: s.id,
      generalConsiderations: s.generalConsiderations
    }))
  );

  const selectedProcedure = allProcedures.find(p => p.id === selectedId);

  const filteredProcedures = searchItems(
    allProcedures.filter(p => activeSpecialty === 'All' || p.specialtyName === activeSpecialty),
    searchTerm,
    ['name', 'specialtyName']
  );

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
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setActiveSpecialty(spec)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeSpecialty === spec 
                    ? 'bg-medical-primary text-white shadow-md' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {spec === 'All' ? t('common.all') : t(`surgery.${spec}`)}
              </button>
            ))}
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredProcedures.map((procedure) => (
              <button
                key={procedure.id}
                onClick={() => setSelectedId(procedure.id)}
                className={`w-full text-left p-4 rounded-xl text-sm transition-all flex items-center justify-between group border ${
                  selectedId === procedure.id 
                    ? 'bg-medical-primary text-white border-medical-primary shadow-lg' 
                    : 'bg-white border-medical-border hover:border-medical-accent text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedId === procedure.id ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold leading-tight">{procedure.name}</p>
                    <p className={`text-[10px] uppercase tracking-widest mt-0.5 ${selectedId === procedure.id ? 'text-white/60' : 'text-slate-400'}`}>
                      {t(`surgery.${procedure.specialtyName}`)}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedId === procedure.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {selectedProcedure ? (
            <motion.div
              key={selectedProcedure.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-2xl border border-medical-border shadow-sm min-h-[600px]"
            >
              <div className="flex items-start justify-between mb-8 pb-6 border-b border-medical-border">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-medical-accent uppercase tracking-[0.2em]">
                      <BookOpen className="w-3.5 h-3.5" />
                      {t('surgery.guide')}
                    </div>
                    <div className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[9px] font-bold uppercase tracking-wider">
                      {t(`surgery.${selectedProcedure.specialtyName}`)}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-medical-primary tracking-tight">{selectedProcedure.name}</h2>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Scissors className="w-6 h-6 text-medical-accent" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
                      <Syringe className="w-4 h-4 text-indigo-500" />
                      {t('surgery.anestheticConsiderations')}
                    </h3>
                    <ul className="space-y-3">
                      {selectedProcedure.anestheticConsiderations.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {selectedProcedure.antibioticProphylaxis && (
                    <section className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-800 mb-4">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        {t('surgery.antibioticProphylaxis')}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] border-b border-emerald-100/50 pb-2">
                          <span className="font-medium text-emerald-900">{t('surgery.drug')}</span>
                          <span className="font-bold text-emerald-700">{selectedProcedure.antibioticProphylaxis.drug}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] border-b border-emerald-100/50 pb-2">
                          <span className="font-medium text-emerald-900">{t('surgery.dosage')}</span>
                          <span className="font-bold text-emerald-700">{selectedProcedure.antibioticProphylaxis.dosage}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] border-b border-emerald-100/50 pb-2">
                          <span className="font-medium text-emerald-900">{t('surgery.timing')}</span>
                          <span className="font-bold text-emerald-700">{selectedProcedure.antibioticProphylaxis.timing}</span>
                        </div>
                        {selectedProcedure.antibioticProphylaxis.alternatives && (
                          <div className="pt-1">
                            <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">{t('surgery.alternatives')}</p>
                            <p className="text-[11px] text-emerald-800">{selectedProcedure.antibioticProphylaxis.alternatives}</p>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      {t('surgery.surgicalComplications')}
                    </h3>
                    <ul className="space-y-3">
                      {selectedProcedure.complications.surgical.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="space-y-8">
                  <SurgicalGuide steps={selectedProcedure.guide} />

                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
                      <ClipboardList className="w-4 h-4 text-medical-accent" />
                      {t('surgery.managementProtocols')}
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('surgery.preOp')}</p>
                        <ul className="space-y-2">
                          {selectedProcedure.management.preOp.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                              <ArrowRight className="w-3 h-3 text-medical-accent mt-1 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('surgery.intraOp')}</p>
                        <ul className="space-y-2">
                          {selectedProcedure.management.intraOp.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                              <ArrowRight className="w-3 h-3 text-medical-accent mt-1 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('surgery.postOp')}</p>
                        <ul className="space-y-2">
                          {selectedProcedure.management.postOp.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                              <ArrowRight className="w-3 h-3 text-medical-accent mt-1 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Conditional Thoracic Analyser Injection */}
              {['lobectomy', 'pneumonectomy'].includes(selectedProcedure.id) && (
                <ThoracicSpirometryAnalyser procedureId={selectedProcedure.id} />
              )}

              {/* Specialty General Considerations */}
              <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-medical-border">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  {t(`surgery.${selectedProcedure.specialtyName}`)} - {t('surgery.generalConsiderations')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-[10px] font-bold text-indigo-600 uppercase mb-2">{t('surgery.preOp')}</h5>
                    <ul className="space-y-1">
                      {selectedProcedure.generalConsiderations.preOp.map((item, i) => (
                        <li key={i} className="text-[11px] text-slate-600 flex gap-2">
                          <span className="text-indigo-400">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-indigo-600 uppercase mb-2">{t('surgery.intraOp')}</h5>
                    <ul className="space-y-1">
                      {selectedProcedure.generalConsiderations.intraOp.map((item, i) => (
                        <li key={i} className="text-[11px] text-slate-600 flex gap-2">
                          <span className="text-indigo-400">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-indigo-600 uppercase mb-2">{t('surgery.postOp')}</h5>
                    <ul className="space-y-1">
                      {selectedProcedure.generalConsiderations.postOp.map((item, i) => (
                        <li key={i} className="text-[11px] text-slate-600 flex gap-2">
                          <span className="text-indigo-400">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-medical-border border-dashed flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[600px]">
              <div className="p-6 bg-slate-50 rounded-full">
                <Scissors className="w-16 h-16 text-slate-200" />
              </div>
              <div className="max-w-xs">
                <h3 className="text-xl font-bold text-slate-700 mb-2">{t('surgery.selectProcedure')}</h3>
                <p className="text-sm text-slate-500">{t('surgery.selectProcedureDesc')}</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Surgery;
