import { useState, useEffect, useMemo } from 'react';
import { 
  Calculator, 
  ArrowRightLeft, 
  Info, 
  Zap, 
  Thermometer, 
  Activity, 
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

interface DrugRange {
  min: number;
  max: number;
  label: string;
  description: string;
  color: string;
  receptors: string[];
}

interface DrugPreset {
  id: string;
  name: string;
  icon: any;
  preparation: string; // e.g. "4mg in 40ml"
  defaultConc: number; // mg/ml
  defaultUnit: 'mcg/kg/min' | 'mcg/kg/h' | 'mg/h';
  maxDose: number;
  step: number;
  ranges: DrugRange[];
}

const DRUG_PRESETS: DrugPreset[] = [
  {
    id: 'noradrenaline',
    name: 'Noradrenaline',
    icon: Zap,
    preparation: '4mg / 40ml',
    defaultConc: 0.1, // 4mg in 40ml
    defaultUnit: 'mcg/kg/min',
    maxDose: 1.0,
    step: 0.01,
    ranges: [
      { min: 0, max: 0.1, label: 'Low Dose', description: 'Early Sepsis / Fluid Resuscitation', color: 'bg-emerald-500', receptors: ['A1', 'B1'] },
      { min: 0.1, max: 0.5, label: 'Moderate Dose', description: 'Established Septic Shock', color: 'bg-amber-500', receptors: ['A1', 'B1++'] },
      { min: 0.5, max: 1.0, label: 'High Dose', description: 'Refractory Shock / Escalation', color: 'bg-rose-600', receptors: ['A1+++'] },
    ]
  },
  {
    id: 'dopamine',
    name: 'Dopamine',
    icon: Activity,
    preparation: '200mg / 50ml',
    defaultConc: 4.0, // 200mg in 50ml
    defaultUnit: 'mcg/kg/min',
    maxDose: 20,
    step: 0.5,
    ranges: [
      { min: 0.5, max: 2, label: 'Renal Dose', description: 'Dopaminergic Vasodilation', color: 'bg-sky-500', receptors: ['D1', 'D2'] },
      { min: 2, max: 10, label: 'Inotropic Range', description: 'Beta-1 Positive Inotropy', color: 'bg-emerald-500', receptors: ['B1', 'B2'] },
      { min: 10, max: 20, label: 'Vasopressor Range', description: 'Alpha-1 Vasoconstriction', color: 'bg-amber-600', receptors: ['A1', 'B1'] },
    ]
  },
  {
    id: 'dobutamine',
    name: 'Dobutamine',
    icon: Thermometer,
    preparation: '250mg / 50ml',
    defaultConc: 5.0, // 250mg in 50ml
    defaultUnit: 'mcg/kg/min',
    maxDose: 20,
    step: 0.5,
    ranges: [
      { min: 2.5, max: 5, label: 'Low Inotropy', description: 'Mild LV Dysfunction', color: 'bg-emerald-400', receptors: ['B1'] },
      { min: 5, max: 15, label: 'Standard Inotropy', description: 'Decompensated Heart Failure', color: 'bg-emerald-600', receptors: ['B1', 'B2'] },
      { min: 15, max: 20, label: 'Maximum Range', description: 'Risk of Arrhythmogenicity', color: 'bg-rose-500', receptors: ['B1+++'] },
    ]
  },
  {
    id: 'adrenaline',
    name: 'Adrenaline',
    icon: Zap,
    preparation: '5mg / 50ml',
    defaultConc: 0.1, // 5mg in 50ml
    defaultUnit: 'mcg/kg/min',
    maxDose: 0.5,
    step: 0.01,
    ranges: [
      { min: 0.01, max: 0.05, label: 'Beta Range', description: 'Inotropic Support', color: 'bg-emerald-500', receptors: ['B1', 'B2'] },
      { min: 0.05, max: 0.2, label: 'Mixed Range', description: 'Inotropy + Pressor', color: 'bg-amber-500', receptors: ['A1', 'B1'] },
      { min: 0.2, max: 0.5, label: 'Alpha Range', description: 'Massive Vasoconstriction', color: 'bg-rose-600', receptors: ['A1', 'B1'] },
    ]
  }
];

export default function Converter() {
  const { t } = useLanguage();
  
  const K_WEIGHT = 'anestassist_patient_weight';
  const K_SELECTED_DRUG = 'anestassist_converter_drug';

  const [activeDrugId, setActiveDrugId] = useState<string>(() => {
    return localStorage.getItem(K_SELECTED_DRUG) || 'custom';
  });

  const [weight, setWeight] = useState<number>(() => {
    return Number(localStorage.getItem(K_WEIGHT)) || 70;
  });

  const [dose, setDose] = useState<number>(0);
  const [concentration, setConcentration] = useState<number>(1);
  const [unit, setUnit] = useState<'mcg/kg/min' | 'mcg/kg/h' | 'mg/h'>('mcg/kg/min');

  const selectedDrug = useMemo(() => 
    DRUG_PRESETS.find(p => p.id === activeDrugId), [activeDrugId]
  );

  useEffect(() => {
    if (selectedDrug) {
      setConcentration(selectedDrug.defaultConc);
      setUnit(selectedDrug.defaultUnit);
      setDose(selectedDrug.maxDose * 0.1); // Default to 10% of scale
    }
    localStorage.setItem(K_SELECTED_DRUG, activeDrugId);
  }, [selectedDrug, activeDrugId]);

  useEffect(() => {
    localStorage.setItem(K_WEIGHT, weight.toString());
  }, [weight]);

  const currentRange = useMemo(() => {
    if (!selectedDrug) return null;
    return selectedDrug.ranges.find(r => dose >= r.min && dose <= r.max) || selectedDrug.ranges[0];
  }, [dose, selectedDrug]);

  const calculateRate = () => {
    if (concentration <= 0) return "0.00";
    let rateMlH = 0;
    if (unit === 'mcg/kg/min') {
      rateMlH = (dose * weight * 60) / (1000 * concentration);
    } else if (unit === 'mcg/kg/h') {
      rateMlH = (dose * weight) / (1000 * concentration);
    } else if (unit === 'mg/h') {
      rateMlH = dose / concentration;
    }
    return rateMlH.toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Drug Selection Chips */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveDrugId('custom')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 flex items-center gap-2 whitespace-nowrap
            ${activeDrugId === 'custom' 
              ? 'bg-slate-800 border-slate-800 text-white' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
        >
          <Activity className="w-4 h-4" />
          Custom / Pure Math
        </button>
        {DRUG_PRESETS.map(drug => (
          <button
            key={drug.id}
            onClick={() => setActiveDrugId(drug.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 flex items-center gap-2 whitespace-nowrap
              ${activeDrugId === drug.id 
                ? 'bg-medical-primary border-medical-primary text-white shadow-lg shadow-medical-primary/20 scale-105' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-medical-primary/30'}`}
          >
            <drug.icon className="w-4 h-4" />
            {drug.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-medical-border shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Configuration Parameters
              </h3>
              {selectedDrug && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-medical-primary/10 rounded-lg text-medical-primary border border-medical-primary/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase whitespace-nowrap">Prep: {selectedDrug.preparation}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Patient Weight (kg)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-medical-accent font-bold text-lg"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-300 uppercase text-xs">KG</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase">Drug Concentration</label>
                    <select
                      onChange={(e) => {
                        if (e.target.value) setConcentration(Number(e.target.value));
                      }}
                      className="text-xs font-bold text-medical-accent bg-medical-accent/10 border-none rounded px-2 py-1 outline-none cursor-pointer"
                    >
                      <option value="">Standard Bags...</option>
                      <option value="0.016">Norepinephrine (4mg/250mL)</option>
                      <option value="0.032">Norepinephrine (8mg/250mL)</option>
                      <option value="0.016">Epinephrine (4mg/250mL)</option>
                      <option value="0.2">Vasopressin (20U/100mL)</option>
                      <option value="0.4">Vasopressin (40U/100mL)</option>
                      <option value="2">Dopamine (500mg/250mL)</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={concentration}
                      onChange={(e) => setConcentration(Number(e.target.value))}
                      className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-medical-accent font-bold text-lg"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-300 uppercase text-xs">mg / mL</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Target Dosing</label>
                    <span className="text-medical-accent font-black text-2xl">{dose} <span className="text-xs text-slate-400">{unit}</span></span>
                  </div>
                  
                  {selectedDrug ? (
                    <div className="space-y-4">
                      <input
                        type="range"
                        min={0}
                        max={selectedDrug.maxDose}
                        step={selectedDrug.step}
                        value={dose}
                        onChange={(e) => setDose(Number(e.target.value))}
                        className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-medical-primary"
                      />
                      
                      {/* Clinical Feedback Area */}
                      <AnimatePresence mode="wait">
                        {currentRange && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className={`p-4 rounded-xl border-l-4 ${currentRange.color.replace('bg-', 'border-')} ${currentRange.color.replace('bg-', 'bg-')}/10`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${currentRange.color} text-white`}>
                                {currentRange.label}
                              </span>
                              <div className="flex gap-1">
                                {currentRange.receptors.map(r => (
                                  <span key={r} className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs font-bold text-slate-700">{currentRange.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={dose}
                        onChange={(e) => setDose(Number(e.target.value))}
                        className="flex-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-medical-accent font-bold"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as any)}
                        className="p-4 bg-slate-100 border-none rounded-xl font-bold text-sm"
                      >
                        <option value="mcg/kg/min">mcg/kg/min</option>
                        <option value="mcg/kg/h">mcg/kg/h</option>
                        <option value="mg/h">mg/h</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick References */}
          {selectedDrug && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Refrence Dosing & Titration
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedDrug.ranges.map(r => (
                  <div key={r.label} className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{r.label}</p>
                    <p className="text-sm font-black text-slate-800">{r.min} - {r.max}</p>
                    <p className="text-[9px] font-medium text-slate-500">{selectedDrug.defaultUnit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Sidebar */}
        <div className="space-y-6">
          <div className="bg-medical-primary p-8 rounded-3xl shadow-xl shadow-medical-primary/20 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/20 transition-all"></div>
            
            <p className="text-medical-secondary font-black uppercase text-[10px] tracking-[0.2em] mb-4">Calculated Infusion Rate</p>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black tabular-nums">{calculateRate()}</span>
                <span className="text-2xl font-bold text-white/50">mL/h</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
              <div className="bg-white/10 p-3 rounded-2xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-bold text-white/60 text-right leading-tight max-w-[120px]">
                Always verify drip compatibility & line patency
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-blue-900 mb-1">Safety Check</h5>
                <p className="text-xs text-blue-800 leading-relaxed font-medium">
                  Confirm the concentration on the syringe pump matches the {concentration} mg/ml shown. High-dose vasopressors require central access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
