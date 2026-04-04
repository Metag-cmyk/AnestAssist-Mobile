import { useState, useEffect } from 'react';
import { Wind, Ruler, Activity, CheckCircle2, ActivitySquare, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PatientContextBanner } from '../../components/PatientContextBanner';
import { ClinicalCondition, getTargetVolumes, getStrategyDetails, getWaveform } from './ventilatorData';

import { usePatient } from '../../contexts/PatientContext';

export default function VentilatorModule() {
  const { patient, setPatient, ibw } = usePatient();
  const K_CONDITION = 'anestassist_ventilator_condition';

  const [condition, setCondition] = useState<ClinicalCondition>(() => {
    return (localStorage.getItem(K_CONDITION) as ClinicalCondition) || 'standard';
  });

  useEffect(() => {
    localStorage.setItem(K_CONDITION, condition);
  }, [condition]);

  const heightCm = patient.heightCm.toString();
  const isMale = patient.sex === 'male';

  const setHeightCm = (val: string) => setPatient({ heightCm: val === '' ? '' : parseFloat(val) });
  const setIsMale = (val: boolean) => setPatient({ sex: val ? 'male' : 'female' });

  const targets = getTargetVolumes(condition, ibw);
  const strategy = getStrategyDetails(condition);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PatientContextBanner theme="sky" />

      <div className="bg-sky-900 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 bg-gradient-to-r from-sky-800 to-sky-900 flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <Wind className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Ventilator Strategies</h2>
            <p className="text-sky-100/80 text-sm mt-1">Condition-based prescriptive ventilation parameters & scalar diagnostics.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <Ruler className="w-4 h-4 text-sky-600" />
              Patient Anthropometrics
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Sex</label>
                  <select 
                    value={isMale ? 'male' : 'female'} 
                    onChange={(e) => setIsMale(e.target.value === 'male')}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Height (cm)</label>
                  <input 
                    type="number" 
                    value={heightCm} 
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="bg-sky-50 p-4 rounded-xl flex justify-between items-center border border-sky-100 shadow-inner">
                  <span className="text-sm font-bold text-sky-900">Ideal Body Wt:</span>
                  <span className="text-2xl font-black text-sky-600">{ibw > 0 ? ibw.toFixed(1) : '--'} <span className="text-base font-bold">kg</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 relative">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
              <ActivitySquare className="w-4 h-4 text-sky-600" />
              Clinical Condition Match
            </h3>
            
            <div className="grid grid-cols-1 gap-1.5 mt-1 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
              <button onClick={() => setCondition('standard')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'standard' ? 'bg-sky-50 border-sky-300 text-sky-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Standard / Post-Op</button>
              <button onClick={() => setCondition('ards')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'ards' ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>ARDS (Acute Resp Distress)</button>
              <button onClick={() => setCondition('pregnancy')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'pregnancy' ? 'bg-pink-50 border-pink-300 text-pink-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Pregnancy (3rd Trimester)</button>
              <button onClick={() => setCondition('laparoscopy')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'laparoscopy' ? 'bg-lime-50 border-lime-300 text-lime-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Laparoscopy (High IAP)</button>
              <button onClick={() => setCondition('olv')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'olv' ? 'bg-orange-50 border-orange-300 text-orange-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>One-Lung (OLV)</button>
              <button onClick={() => setCondition('trauma')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'trauma' ? 'bg-red-50 border-red-300 text-red-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Trauma / Hemorrhage</button>
              <button onClick={() => setCondition('restrictive')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'restrictive' ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Restrictive (Fibrosis)</button>
              <button onClick={() => setCondition('obstructive')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'obstructive' ? 'bg-purple-50 border-purple-300 text-purple-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Obstructive (Asthma/COPD)</button>
              <button onClick={() => setCondition('cardiogenic')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'cardiogenic' ? 'bg-blue-50 border-blue-300 text-blue-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Cardiogenic Shock / Edema</button>
              <button onClick={() => setCondition('neuro')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'neuro' ? 'bg-indigo-50 border-indigo-300 text-indigo-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Neuro-Critical Care</button>
              <button onClick={() => setCondition('neuromuscular')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'neuromuscular' ? 'bg-teal-50 border-teal-300 text-teal-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Neuromuscular Weakness</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={condition}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">{strategy.title}</h3>
                <p className="text-slate-600 text-sm mt-1">{strategy.desc}</p>
              </div>

              <div className="p-6 flex-1 flex flex-col gap-6">
                {getWaveform(condition)}
                <hr className="border-slate-100" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Tidal Volume ($V_t$) Target</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex-1 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-sky-800 mb-1">Strict Output ({targets?.label})</div>
                        <div className="text-3xl font-black text-sky-600">
                          {ibw > 0 ? `${targets.min} - ${targets.max}` : '---'} <span className="text-lg font-bold">mL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Core Settings Dashboard</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Respiratory Rate (RR)</div>
                      <div className="font-semibold text-slate-800">{strategy.rr}</div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">PEEP Strategy</div>
                      <div className="font-semibold text-slate-800">{strategy.peep}</div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Target I:E Ratio</div>
                      <div className="font-semibold text-slate-800">{strategy.ie}</div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Clinical Execution Targets</div>
                      <div className="font-semibold text-slate-800 text-sm leading-tight">{strategy.targets}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                  <p className="text-xs text-orange-800">
                    <strong>Disclaimer:</strong> Always interpret theoretical IBW-based tidal volumes and shapes within the clinical context of the patient. Monitor driving pressures (ΔP {'<'} 15 cmH2O) strictly.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
