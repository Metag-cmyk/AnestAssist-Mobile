import { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  Info,
  Zap,
  Thermometer,
  Activity,
  ShieldCheck,
  TrendingUp,
  Droplets,
  Syringe,
  ShieldAlert,
  Scale,
  FlaskConical,
  RefreshCcw,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import EmergencyDrugs from './EmergencyDrugs';
import PharmacologyReference from './PharmacologyReference';
import InteractionChecker from './InteractionChecker';
import { calculateSodiumCorrection } from '../../lib/RenalCalculators';
import { BookOpen } from 'lucide-react';

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
  preparation: string;
  defaultConc: number;
  defaultUnit: 'mcg/kg/min' | 'mcg/kg/h' | 'mg/kg/h' | 'mg/h';
  maxDose: number;
  step: number;
  ranges: DrugRange[];
}

const DRUG_PRESETS: DrugPreset[] = [
  {
    id: 'propofol',
    name: 'Propofol 1%',
    icon: Syringe,
    preparation: '200mg / 20ml',
    defaultConc: 10.0,
    defaultUnit: 'mg/kg/h',
    maxDose: 15,
    step: 0.1,
    ranges: [
      { min: 0, max: 4, label: 'Light Sedation', description: 'MAC / Conscious Sedation', color: 'bg-emerald-400', receptors: ['GABA'] },
      { min: 4, max: 10, label: 'General / TIVA', description: 'Maintenance of General Anesthesia', color: 'bg-blue-500', receptors: ['GABA++'] },
      { min: 10, max: 15, label: 'Deep / Burst Suppression', description: 'Neuroprotection / Refractory status', color: 'bg-indigo-600', receptors: ['GABA+++'] },
    ]
  },
  {
    id: 'remifentanil',
    name: 'Remifentanil',
    icon: Droplets,
    preparation: '2mg / 40ml',
    defaultConc: 0.05,
    defaultUnit: 'mcg/kg/min',
    maxDose: 1.0,
    step: 0.01,
    ranges: [
      { min: 0.01, max: 0.1, label: 'Analgesia / MAC', description: 'Spontaneous ventilation usually preserved', color: 'bg-emerald-500', receptors: ['Mu'] },
      { min: 0.1, max: 0.25, label: 'Moderate TIVA', description: 'Balanced Anesthesia (with Propofol/Volatile)', color: 'bg-amber-500', receptors: ['Mu++'] },
      { min: 0.25, max: 1.0, label: 'Deep TIVA', description: 'Highly stimulating surgery (Cardiac/Neuro)', color: 'bg-rose-600', receptors: ['Mu+++'] },
    ]
  },
  {
    id: 'dexmedetomidine',
    name: 'Dexmedetomidine',
    icon: TrendingUp,
    preparation: '200mcg / 50ml',
    defaultConc: 0.004,
    defaultUnit: 'mcg/kg/h',
    maxDose: 1.5,
    step: 0.1,
    ranges: [
      { min: 0.1, max: 0.5, label: 'Light Sedation', description: 'Rousable, anxiolysis (ICU/MAC)', color: 'bg-sky-400', receptors: ['Alpha-2'] },
      { min: 0.5, max: 1.0, label: 'Moderate Sedation', description: 'Deeper sedation without resp depression', color: 'bg-blue-600', receptors: ['Alpha-2++'] },
      { min: 1.0, max: 1.5, label: 'Adjunct / High Dose', description: 'Anesthetic sparing, opioid sparing', color: 'bg-indigo-600', receptors: ['Alpha-2+++'] },
    ]
  },
  {
    id: 'noradrenaline',
    name: 'Noradrenaline',
    icon: Zap,
    preparation: '4mg / 40ml',
    defaultConc: 0.1,
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
    defaultConc: 4.0,
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
    defaultConc: 5.0,
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
    defaultConc: 0.1,
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

export default function Pharmacology() {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<'emergency' | 'infusion' | 'sodium' | 'reference' | 'interactions'>('emergency');

  const K_WEIGHT = 'anestassist_patient_weight';
  const K_SELECTED_DRUG = 'anestassist_converter_drug';

  // State for Sodium Correction
  const [serumNa, setSerumNa] = useState<number>(140);
  const [targetNa, setTargetNa] = useState<number>(140);
  const [infusateNa, setInfusateNa] = useState<number>(513); // Default 3% NaCl
  const [ageGroup, setAgeGroup] = useState<'adult' | 'elderly'>('adult');

  const [activeDrugId, setActiveDrugId] = useState<string>(() =>
    localStorage.getItem(K_SELECTED_DRUG) || 'custom'
  );
  const [weight, setWeight] = useState<number>(() =>
    Number(localStorage.getItem(K_WEIGHT)) || 70
  );
  const [dose, setDose] = useState<number>(0);
  const [concentration, setConcentration] = useState<number>(1);
  const [unit, setUnit] = useState<'mcg/kg/min' | 'mcg/kg/h' | 'mg/kg/h' | 'mg/h'>('mcg/kg/min');

  const selectedDrug = useMemo(() =>
    DRUG_PRESETS.find(p => p.id === activeDrugId), [activeDrugId]
  );

  useEffect(() => {
    if (selectedDrug) {
      setConcentration(selectedDrug.defaultConc);
      setUnit(selectedDrug.defaultUnit);
      setDose(selectedDrug.maxDose * 0.1);
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
    if (concentration <= 0) return '0.00';
    let rateMlH = 0;
    if (unit === 'mcg/kg/min') rateMlH = (dose * weight * 60) / (1000 * concentration);
    else if (unit === 'mcg/kg/h') rateMlH = (dose * weight) / (1000 * concentration);
    else if (unit === 'mg/kg/h') rateMlH = (dose * weight) / concentration;
    else if (unit === 'mg/h') rateMlH = dose / concentration;
    return rateMlH.toFixed(2);
  };

  const sodiumResults = useMemo(() => {
    return calculateSodiumCorrection({
      serumNa,
      targetNa,
      infusateNa,
      weightKg: weight,
      gender: 'male', // Context could be expanded
      ageGroup
    });
  }, [serumNa, targetNa, infusateNa, weight, ageGroup]);

  const targetCorrectionRate = 0.5; // mEq/L/hour
  const timeToTarget = Math.abs(targetNa - serumNa) / targetCorrectionRate;
  const infusionRateMlH = sodiumResults.deltaNaPerLiter !== 0 
    ? (targetCorrectionRate / Math.abs(sodiumResults.deltaNaPerLiter)) * 1000 
    : 0;

  const isAggressiveCorrection = Math.abs(targetNa - serumNa) > 10;

  // suppress unused t warning - used by parent context
  void t;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main View Switcher */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
        <button
          onClick={() => setActiveView('emergency')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeView === 'emergency' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Zap className="w-4 h-4" />
          Emergency Drugs
        </button>
        <button
          onClick={() => setActiveView('infusion')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeView === 'infusion' ? 'bg-medical-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Activity className="w-4 h-4" />
          Infusion Calculator
        </button>
        <button
          onClick={() => setActiveView('sodium')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeView === 'sodium' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          Sodium
        </button>
        <button
          onClick={() => setActiveView('reference')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeView === 'reference' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Reference
        </button>
        <button
          onClick={() => setActiveView('interactions')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeView === 'interactions' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          Interactions
        </button>
      </div>


      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {activeView === 'emergency' && <EmergencyDrugs />}

          {activeView === 'infusion' && (
            <div className="space-y-6">
              {/* Drug Selection Chips */}
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setActiveDrugId('custom')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 flex items-center gap-2 whitespace-nowrap ${
                    activeDrugId === 'custom'
                      ? 'bg-slate-800 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  Custom / Pure Math
                </button>
                {DRUG_PRESETS.map(drug => (
                  <button
                    key={drug.id}
                    onClick={() => setActiveDrugId(drug.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 flex items-center gap-2 whitespace-nowrap ${
                      activeDrugId === drug.id
                        ? 'bg-medical-primary border-medical-primary text-white shadow-lg shadow-medical-primary/20 scale-105'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-medical-primary/30'
                    }`}
                  >
                    <drug.icon className="w-4 h-4" />
                    {drug.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Drug Concentration</label>
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
                            <span className="text-medical-accent font-black text-2xl">
                              {dose} <span className="text-xs text-slate-400">{unit}</span>
                            </span>
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
                                          <span key={r} className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">{r}</span>
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
                                <option value="mg/kg/h">mg/kg/h</option>
                                <option value="mg/h">mg/h</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedDrug && (
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Reference Dosing &amp; Titration
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
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black tabular-nums">{calculateRate()}</span>
                      <span className="text-2xl font-bold text-white/50">mL/h</span>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                      <div className="bg-white/10 p-3 rounded-2xl">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <p className="text-[10px] font-bold text-white/60 text-right leading-tight max-w-[120px]">
                        Always verify drip compatibility &amp; line patency
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

              {/* LAST Section */}
              <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
                <div className="bg-rose-50 border-b border-rose-100 p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-rose-900 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-600" />
                      LAST Max Volume Calculator
                    </h3>
                    <p className="text-sm text-rose-700 mt-1">Local Anesthetic Systemic Toxicity safety limits based on {weight} kg</p>
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Lipid Emulsion 20%</p>
                    <p className="text-xl font-black text-rose-600 bg-white px-3 py-1 rounded-lg shadow-sm mt-1 inline-block">
                      {Math.round(weight * 1.5)} <span className="text-xs">mL Bolus</span>
                    </p>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Lidocaine 1% (plain)', mgKg: 3, maxMg: 300, mgMl: 10 },
                    { name: 'Lidocaine 1% (+ Adrenaline)', mgKg: 7, maxMg: 500, mgMl: 10 },
                    { name: 'Bupivacaine 0.5%', mgKg: 2.5, maxMg: 175, mgMl: 5 },
                    { name: 'Ropivacaine 0.5%', mgKg: 3, maxMg: 200, mgMl: 5 },
                  ].map(la => {
                    const absoluteLimit = Math.min(weight * la.mgKg, la.maxMg);
                    const maxVolume = absoluteLimit / la.mgMl;
                    return (
                      <div key={la.name} className="flex flex-col p-4 rounded-xl border border-slate-100 bg-slate-50 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                          <p className="font-bold text-slate-800">{la.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase bg-white px-2 py-0.5 rounded border border-slate-200">{la.mgKg} mg/kg</p>
                        </div>
                        <div className="flex justify-between items-end relative z-10">
                          <p className="text-xs font-semibold text-slate-500">Cap: <span className="text-slate-700">{Math.round(absoluteLimit)} mg</span></p>
                          <p className="text-xl font-black text-rose-500">{Math.floor(maxVolume)} <span className="text-sm text-rose-400">mL</span></p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeView === 'sodium' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Inputs */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-medical-border shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Scale className="w-4 h-4" />
                        Patient & Electrolyte Profile
                      </h3>
                      <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button 
                          onClick={() => setAgeGroup('adult')}
                          className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${ageGroup === 'adult' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                        >
                          ADULT
                        </button>
                        <button 
                          onClick={() => setAgeGroup('elderly')}
                          className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${ageGroup === 'elderly' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                        >
                          ELDERLY
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Serum Sodium (mEq/L)</label>
                          <input 
                            type="number" 
                            value={serumNa} 
                            onChange={(e) => setSerumNa(Number(e.target.value))}
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-indigo-500 font-bold text-lg" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target Sodium (mEq/L)</label>
                          <input 
                            type="number" 
                            value={targetNa} 
                            onChange={(e) => setTargetNa(Number(e.target.value))}
                            className={`w-full p-4 bg-slate-50 border-2 rounded-xl outline-none transition-all font-bold text-lg ${isAggressiveCorrection ? 'border-rose-400 focus:border-rose-500' : 'border-slate-100 focus:border-indigo-500'}`} 
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Infusate Selection</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { name: '20% Sodium Chloride', na: 3422, color: 'border-rose-500 text-rose-600' },
                            { name: '3% Sodium Chloride', na: 513, color: 'border-medical-primary text-medical-primary' },
                            { name: '0.9% Sodium Chloride', na: 154, color: 'border-slate-300 text-slate-600' },
                            { name: 'Ringer\'s Lactate', na: 130, color: 'border-slate-300 text-slate-600' },
                            { name: '0.45% Sodium Chloride', na: 77, color: 'border-slate-300 text-slate-600' },
                            { name: 'D5W / Water', na: 0, color: 'border-emerald-500 text-emerald-600' },
                          ].map(fluid => (
                            <button
                              key={fluid.name}
                              onClick={() => setInfusateNa(fluid.na)}
                              className={`p-3 text-sm font-bold rounded-xl border-2 transition-all flex justify-between items-center ${
                                infusateNa === fluid.na 
                                  ? `bg-indigo-50 border-indigo-500 text-indigo-700` 
                                  : `bg-white border-slate-100 text-slate-400 hover:border-slate-200`
                              }`}
                            >
                              <span>{fluid.name}</span>
                              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-inherit opacity-80">{fluid.na} mEq/L</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isAggressiveCorrection && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-rose-50 border-2 border-rose-200 p-5 rounded-2xl flex gap-4 items-start"
                    >
                      <AlertTriangle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-black text-rose-900 uppercase tracking-tight">Rapid Correction Warning</h4>
                        <p className="text-xs text-rose-700 mt-1 font-medium leading-relaxed">
                          Correction of {Math.abs(targetNa - serumNa).toFixed(1)} mEq/L planned. 
                          Guidelines recommend limiting correction to **8 - 10 mEq/L in 24 hours** to prevent Osmotic Demyelination Syndrome (ODS) or Cerebral Edema.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Results Sidebar */}
                <div className="space-y-6">
                  <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-600/20 text-white relative overflow-hidden group">
                    <p className="text-indigo-200 font-black uppercase text-[10px] tracking-[0.2em] mb-4">Volume Required</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black tabular-nums">{sodiumResults.totalVolumeNeeded.toFixed(2)}</span>
                      <span className="text-2xl font-bold text-white/50">L</span>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-indigo-200 font-bold">TBW Content</span>
                        <span className="font-mono">{sodiumResults.tbw.toFixed(1)} L</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-indigo-200 font-bold">Delta Na (per L)</span>
                        <span className="font-mono">{sodiumResults.deltaNaPerLiter > 0 ? '+' : ''}{sodiumResults.deltaNaPerLiter.toFixed(2)} mEq</span>
                      </div>
                    </div>
                  </div>

                  {serumNa > 145 && sodiumResults.waterDeficit > 0 && (
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-12 -mt-12 transition-all"></div>
                      <p className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.2em] mb-2">Free Water Deficit</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-emerald-700">{sodiumResults.waterDeficit.toFixed(2)}</span>
                        <span className="text-sm font-bold text-emerald-500">Liters</span>
                      </div>
                      <p className="text-[10px] text-emerald-600 font-medium mt-3 leading-relaxed">
                        Total volume of 0 mEq infusate required to reach {targetNa} mEq/L.
                      </p>
                    </div>
                  )}

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-indigo-900 mb-1">Clinic Note</h5>
                        <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                          Based on Adrogue-Madias formula. Does not account for urinary losses or continuing pathology. Monitor serum Na every 2-4 hours during aggressive infusion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Treatment Proposal Card */}
                <div className="lg:col-span-3">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-3xl border-2 overflow-hidden shadow-sm ${
                      serumNa > targetNa ? 'border-emerald-100 bg-emerald-50/30' : 'border-indigo-100 bg-indigo-50/30'
                    }`}
                  >
                    <div className={`p-6 border-b flex justify-between items-center ${
                      serumNa > targetNa ? 'border-emerald-100 bg-emerald-100/50' : 'border-indigo-100 bg-indigo-100/50'
                    }`}>
                      <h3 className={`text-lg font-black flex items-center gap-2 ${
                        serumNa > targetNa ? 'text-emerald-900' : 'text-indigo-900'
                      }`}>
                        <RefreshCcw className={`w-5 h-5 ${serumNa > targetNa ? 'text-emerald-600' : 'text-indigo-600'}`} />
                        Suggested Treatment Proposal
                      </h3>
                      <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm border ${
                        serumNa > targetNa ? 'bg-white text-emerald-600 border-emerald-200' : 'bg-white text-indigo-600 border-indigo-200'
                      }`}>
                        Target Correction: 0.5 mEq/L/h
                      </div>
                    </div>
                    
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Rate</p>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-4xl font-black ${serumNa > targetNa ? 'text-emerald-700' : 'text-indigo-700'}`}>
                            {infusionRateMlH.toFixed(0)}
                          </span>
                          <span className="text-lg font-bold text-slate-400">mL/h</span>
                        </div>
                        <p className={`text-[11px] font-medium text-slate-500`}>
                          {infusateNa === 3422 ? '20% NaCl (Very Hypertonic)' : infusateNa === 513 ? '3% NaCl Infusion' : infusateNa === 0 ? 'D5W / Water Infusion' : 'Standard Infusion'}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration to Target</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-slate-800">{timeToTarget.toFixed(1)}</span>
                          <span className="text-lg font-bold text-slate-400">Hours</span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-500">Continuous monitoring required</p>
                      </div>

                      <div className="lg:col-span-2 bg-white/60 p-5 rounded-2xl border border-white space-y-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          Clinical Verification Steps
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                          {[
                            'Verify Serum Na every 4-6 hours',
                            'Check volume of choice in pump',
                            'Assess mental status changes',
                            'Calculate remaining deficit at 12h',
                            'Ensure central access for 3% NaCl',
                            'Target Delta Na: Max 8-10 mEq/24h'
                          ].map(step => (
                            <div key={step} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                              <span className="text-[11px] font-semibold text-slate-600">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-8 pb-8 pt-0">
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 items-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                          **STOP** the infusion and re-evaluate immediately if the patient develops neurological symptoms or if the serum sodium rate of change is significantly higher than 0.5 mEq/L/hour.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'reference' && <PharmacologyReference />}

          {activeView === 'interactions' && <InteractionChecker />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
