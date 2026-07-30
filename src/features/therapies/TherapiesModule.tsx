import { useState, useMemo, useEffect } from 'react';

import { 
  Activity, 
  Syringe, 
  AlertTriangle, 
  ShieldCheck, 
  HeartPulse, 
  CheckCircle2, 
  ArrowRightLeft, 
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePatient } from '../../contexts/PatientContext';
import { PatientParameterCard } from '../../components/PatientParameterCard';
import { calculateIBW } from '../../lib/medicalDosing';

type ActiveModuleTab = 'cvvhdf' | 'infusions';

interface InfusionProtocol {
  id: string;
  name: string;
  category: 'Vasoactive / Inotropes' | 'Sedation & Analgesia' | 'Antiarrhythmics & Emergency';
  indication: string;
  preparation: string;
  defaultConc: number; // mg/mL
  standardDoseRange: string;
  minDose: number;
  maxDose: number;
  step: number;
  unit: 'mcg/kg/min' | 'mcg/kg/h' | 'mg/h';
  titrationTips: string[];
  safetyWarnings: string[];
}

export default function TherapiesModule() {
  const patient = usePatient();
  const [activeTab, setActiveTab] = useState<ActiveModuleTab>('cvvhdf');

  // ================= PRISMAFLEX CVVHDF CALCULATOR STATE =================
  const [hct, setHct] = useState<number>(30);
  const [qb, setQb] = useState<number>(180);
  const [targetDose, setTargetDose] = useState<number>(25);
  const [pbpRate, setPbpRate] = useState<number>(500);
  const [netUfr, setNetUfr] = useState<number>(100);
  const [prePostRatio, setPrePostRatio] = useState<number>(60);
  const [filterType, setFilterType] = useState<'M100' | 'M150' | 'HF20'>('M100');

  // ================= UNIFIED INFUSION & CONVERTER STATE =================
  const [selectedInfusionId, setSelectedInfusionId] = useState<string>('norepinephrine');
  const [dosingWeightType, setDosingWeightType] = useState<'tbw' | 'ibw'>('tbw');
  const [customDose, setCustomDose] = useState<number>(0.05);
  const [customConc, setCustomConc] = useState<number>(0.1); // mg/mL (4mg in 40ml)


  const ibw = useMemo(() => calculateIBW({
    type: 'adult',
    heightCm: patient.heightNum,
    gender: patient.gender,
    ageYears: patient.ageNum
  }), [patient.heightNum, patient.gender, patient.ageNum]);

  const activeWeight = dosingWeightType === 'tbw' ? patient.weightNum : (ibw > 0 ? ibw : patient.weightNum);

  // Infusion Protocols Repository
  const INFUSION_PROTOCOLS: InfusionProtocol[] = useMemo(() => [
    {
      id: 'norepinephrine',
      name: 'Norepinephrine (Levophed)',
      category: 'Vasoactive / Inotropes',
      indication: 'First-line vasopressor for Septic, Cardiogenic, and Vasoplegic Shock.',
      preparation: '4 mg in 40 mL D5W',
      defaultConc: 0.1, // 4mg in 40ml = 0.1 mg/ml (100 mcg/ml)
      standardDoseRange: '0.01 - 0.5 mcg/kg/min (titrate to MAP ≥ 65 mmHg)',
      minDose: 0.01,
      maxDose: 0.5,
      step: 0.01,
      unit: 'mcg/kg/min',
      titrationTips: [
        'Central venous catheter strongly preferred to prevent extravasation necrosis.',
        'Target MAP ≥ 65 mmHg (or baseline in chronic hypertensives).',
        'Add Vasopressin early if Norepinephrine requirements exceed 0.25 mcg/kg/min.'
      ],
      safetyWarnings: [
        'Potent alpha-1 vasoconstriction can cause peripheral ischemic limb digits.',
        'Extravasation rescue: Phentolamine 5-10 mg diluted in 10 mL saline injected locally.'
      ]
    },
    {
      id: 'epinephrine',
      name: 'Epinephrine (Adrenaline)',
      category: 'Vasoactive / Inotropes',
      indication: 'Anaphylaxis, Severe Bradycardia, Cardiogenic Shock, Cardiac Arrest.',
      preparation: '4 mg in 50 mL D5W',
      defaultConc: 0.08,
      standardDoseRange: '0.01 - 0.25 mcg/kg/min',
      minDose: 0.01,
      maxDose: 0.25,
      step: 0.01,
      unit: 'mcg/kg/min',
      titrationTips: [
        'Low dose (<0.05 mcg/kg/min): Predominant Beta-1/Beta-2 (inotropy & bronchodilation).',
        'High dose (>0.1 mcg/kg/min): Predominant Alpha-1 (vasoconstriction).'
      ],
      safetyWarnings: [
        'Causes transient hyperlactatemia due to accelerated aerobic glycolysis.',
        'Tachyarrhythmias & myocardial ischemia risk.'
      ]
    },
    {
      id: 'dobutamine',
      name: 'Dobutamine',
      category: 'Vasoactive / Inotropes',
      indication: 'Decompensated Heart Failure & Low Cardiac Output States.',
      preparation: '250 mg in 50 mL D5W',
      defaultConc: 5.0, // 250mg in 50ml = 5 mg/ml
      standardDoseRange: '2.5 - 20 mcg/kg/min',
      minDose: 2.5,
      maxDose: 20,
      step: 0.5,
      unit: 'mcg/kg/min',
      titrationTips: [
        'Strong Beta-1 inotropic agent with mild Beta-2 vasodilation.',
        'Improves cardiac index and lowers SVR/PVR.'
      ],
      safetyWarnings: [
        'Tachycardia and ventricular dysrhythmias at higher doses.',
        'May worsen hypotension if hypovolemic.'
      ]
    },
    {
      id: 'dopamine',
      name: 'Dopamine',
      category: 'Vasoactive / Inotropes',
      indication: 'Symptomatic Bradycardia & Hypotension.',
      preparation: '200 mg in 50 mL D5W',
      defaultConc: 4.0,
      standardDoseRange: '2 - 20 mcg/kg/min',
      minDose: 2,
      maxDose: 20,
      step: 0.5,
      unit: 'mcg/kg/min',
      titrationTips: [
        'Low dose (1-3 mcg/kg/min): Dopaminergic receptors.',
        'Medium dose (3-10 mcg/kg/min): Beta-1 inotropy.',
        'High dose (>10 mcg/kg/min): Alpha-1 vasoconstriction.'
      ],
      safetyWarnings: [
        'High incidence of tachyarrhythmias compared to Norepinephrine.'
      ]
    },
    {
      id: 'propofol',
      name: 'Propofol (Diprivan 1%)',
      category: 'Sedation & Analgesia',
      indication: 'ICU Sedation in mechanically ventilated patients.',
      preparation: '500 mg in 50 mL (10 mg/mL)',
      defaultConc: 10.0,
      standardDoseRange: '0.5 - 4.0 mg/kg/h',
      minDose: 0.5,
      maxDose: 4.0,
      step: 0.1,
      unit: 'mg/h',
      titrationTips: [
        'Rapid onset and offset allows daily awakening sedation breaks.',
        'Provides 1.1 kcal/mL of lipid nutrition.'
      ],
      safetyWarnings: [
        'PRIS risk: Avoid doses >4 mg/kg/h for >48 hours.'
      ]
    },
    {
      id: 'dexmedetomidine',
      name: 'Dexmedetomidine (Precedex)',
      category: 'Sedation & Analgesia',
      indication: 'Light ICU Sedation & Ventilator weaning.',
      preparation: '200 mcg in 50 mL NS',
      defaultConc: 0.004, // 200mcg in 50ml = 0.004 mg/ml (4 mcg/ml)
      standardDoseRange: '0.2 - 1.4 mcg/kg/h',
      minDose: 0.2,
      maxDose: 1.4,
      step: 0.1,
      unit: 'mcg/kg/h',
      titrationTips: [
        'Preserves respiratory drive without causing significant respiratory depression.'
      ],
      safetyWarnings: [
        'High incidence of dose-dependent bradycardia and hypotension.'
      ]
    }
  ], []);

  const selectedInfusion = useMemo(() => 
    INFUSION_PROTOCOLS.find(p => p.id === selectedInfusionId) || INFUSION_PROTOCOLS[0],
    [selectedInfusionId, INFUSION_PROTOCOLS]
  );

  // Sync custom inputs when selected infusion changes
  useEffect(() => {
    if (selectedInfusion) {
      setCustomDose(selectedInfusion.minDose);
      setCustomConc(selectedInfusion.defaultConc);
    }
  }, [selectedInfusion]);

  // Live Conversion Rate Calculation
  const calculatedPumpRate = useMemo(() => {
    if (customConc <= 0 || activeWeight <= 0) return '0.00';
    let rateMlH = 0;
    if (selectedInfusion.unit === 'mcg/kg/min') {
      rateMlH = (customDose * activeWeight * 60) / (1000 * customConc);
    } else if (selectedInfusion.unit === 'mcg/kg/h') {
      rateMlH = (customDose * activeWeight) / (1000 * customConc);
    } else if (selectedInfusion.unit === 'mg/h') {
      rateMlH = customDose / customConc;
    }
    return rateMlH.toFixed(2);
  }, [customDose, customConc, activeWeight, selectedInfusion]);

  // Prismaflex CVVHDF Precise Calculation Logic
  const cvvhdfResults = useMemo(() => {
    const w = patient.weightNum;
    if (w <= 0 || qb <= 0) return null;

    const totalEffluent = w * targetDose;
    const remainingEffluent = Math.max(0, totalEffluent - pbpRate - netUfr);

    const dialysateRate = Math.round(remainingEffluent * 0.5);
    const totalReplacementRate = Math.round(remainingEffluent * 0.5);

    const preFilterRate = Math.round(totalReplacementRate * (prePostRatio / 100));
    const postFilterRate = Math.round(totalReplacementRate * ((100 - prePostRatio) / 100));

    const plasmaFlowMin = qb * (1 - hct / 100);
    const plasmaFlowHr = plasmaFlowMin * 60;

    const totalUF = preFilterRate + postFilterRate + netUfr;

    const filtrationFraction = plasmaFlowHr > 0 
      ? (totalUF / (plasmaFlowHr + preFilterRate + pbpRate)) * 100 
      : 0;

    const isHighClottingRisk = filtrationFraction > 25;
    const deliveredDose = totalEffluent / w;

    return {
      totalEffluent,
      dialysateRate,
      preFilterRate,
      postFilterRate,
      pbpRate,
      netUfr,
      plasmaFlowMin,
      filtrationFraction,
      isHighClottingRisk,
      deliveredDose
    };
  }, [patient.weightNum, hct, qb, targetDose, pbpRate, netUfr, prePostRatio]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PatientParameterCard />

      {/* Module Navigation Header - Clean Light Theme */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-sm">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">ICU & Anesthesia Therapies</h2>
              <p className="text-slate-500 text-xs mt-0.5">Prismaflex CVVHDF prescription & unified vasoactive infusion calculator.</p>
            </div>
          </div>
        </div>

        {/* Unified Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('cvvhdf')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'cvvhdf' 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" /> Prismaflex CVVHDF Prescription
          </button>
          <button
            onClick={() => setActiveTab('infusions')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'infusions' 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <HeartPulse className="w-4 h-4" /> Infusions & Rate Converter
          </button>
        </div>

        {/* TAB 1: PRISMAFLEX CVVHDF CALCULATOR */}
        <AnimatePresence mode="wait">
          {activeTab === 'cvvhdf' && (
            <motion.div 
              key="cvvhdf"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-white space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs Column */}
                <div className="lg:col-span-6 space-y-5">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Activity className="w-4 h-4" /> Machine Parameters & Patient Setup
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Blood Flow ($Q_b$ mL/min)</label>
                      <input 
                        type="number" 
                        value={qb} 
                        onChange={e => setQb(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none focus:border-indigo-500 transition-all text-center" 
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-semibold text-slate-500">Target Dose (mL/kg/h)</label>
                        <span className="text-xs font-bold text-indigo-600">{targetDose}</span>
                      </div>
                      <input 
                        type="number" 
                        value={targetDose} 
                        onChange={e => setTargetDose(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 font-bold outline-none focus:border-indigo-500 transition-all text-center mb-1.5" 
                      />
                      <input 
                        type="range"
                        min="15"
                        max="45"
                        step="1"
                        value={targetDose}
                        onChange={e => setTargetDose(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>


                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Hematocrit (Hct %)</label>
                      <input 
                        type="number" 
                        value={hct} 
                        onChange={e => setHct(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none focus:border-indigo-500 transition-all text-center" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Net Fluid Removal (mL/h)</label>
                      <input 
                        type="number" 
                        value={netUfr} 
                        onChange={e => setNetUfr(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-emerald-700 font-bold outline-none focus:border-emerald-500 transition-all text-center" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Pre-Blood Pump (PBP mL/h)</label>
                      <input 
                        type="number" 
                        value={pbpRate} 
                        onChange={e => setPbpRate(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-pink-700 font-bold outline-none focus:border-pink-500 transition-all text-center" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Filter Set Model</label>
                      <select
                        value={filterType}
                        onChange={e => setFilterType(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-bold outline-none focus:border-indigo-500 transition-all text-center"
                      >
                        <option value="M100">AN69 ST M100 (0.9 m²)</option>
                        <option value="M150">AN69 ST M150 (1.5 m²)</option>
                        <option value="HF20">HF20 Pediatric (0.2 m²)</option>
                      </select>
                    </div>
                  </div>

                  {/* Pre/Post Replacement Slider */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-500 uppercase">Replacement Dilution Ratio</span>
                      <span className="text-indigo-600">{prePostRatio}% Pre-Filter / {100 - prePostRatio}% Post-Filter</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={prePostRatio} 
                      onChange={e => setPrePostRatio(Number(e.target.value))} 
                      className="w-full accent-indigo-600 cursor-pointer" 
                    />
                    <p className="text-[10px] text-slate-500 leading-tight italic">
                      Higher pre-filter dilution decreases blood viscosity inside filter fibers, significantly extending filter life and lowering clotting risk.
                    </p>
                  </div>
                </div>

                {/* Machine Pumps Output Column */}
                <div className="lg:col-span-6 space-y-5">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-2">
                    <ShieldCheck className="w-4 h-4" /> Calculated Prismaflex Pump Rates
                  </h3>

                  {cvvhdfResults && (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                      {/* Total Effluent */}
                      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase block">Total Target Effluent Rate</span>
                          <span className="text-[10px] text-slate-400">Target KDIGO Dose ({targetDose} mL/kg/h)</span>
                        </div>
                        <span className="text-2xl font-black text-indigo-900">{cvvhdfResults.totalEffluent} <span className="text-sm font-normal text-slate-500">mL/h</span></span>
                      </div>

                      {/* Individual Pumps Breakdown */}
                      <div className="space-y-2.5 text-sm">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-slate-600 font-medium">PBP Pump Rate (Pre-Pump)</span>
                          <span className="font-mono font-bold text-pink-700">{cvvhdfResults.pbpRate} mL/h</span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-t border-slate-200">
                          <span className="text-slate-600 font-medium">Dialysate Pump Rate ($Q_d$)</span>
                          <span className="font-mono font-bold text-blue-700">{cvvhdfResults.dialysateRate} mL/h</span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-t border-slate-200">
                          <span className="text-slate-600 font-medium">Pre-Filter Replacement Pump</span>
                          <span className="font-mono font-bold text-emerald-700">{cvvhdfResults.preFilterRate} mL/h</span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-t border-slate-200">
                          <span className="text-slate-600 font-medium">Post-Filter Replacement Pump</span>
                          <span className="font-mono font-bold text-amber-700">{cvvhdfResults.postFilterRate} mL/h</span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-t border-slate-200">
                          <span className="text-slate-600 font-medium">Patient Net Removal Rate (UFR)</span>
                          <span className="font-mono font-bold text-emerald-700">{cvvhdfResults.netUfr} mL/h</span>
                        </div>
                      </div>

                      {/* Filtration Fraction Warning Box */}
                      <div className={`p-4 rounded-xl border mt-4 flex items-center justify-between ${
                        cvvhdfResults.isHighClottingRisk 
                          ? 'bg-rose-50 border-rose-200 text-rose-800' 
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      }`}>
                        <div>
                          <div className="flex items-center gap-2">
                            {cvvhdfResults.isHighClottingRisk ? <AlertTriangle className="w-5 h-5 text-rose-600" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                            <span className="font-bold text-sm">Filtration Fraction: {cvvhdfResults.filtrationFraction.toFixed(1)}%</span>
                          </div>
                          <p className="text-[10px] opacity-90 mt-1 leading-tight">
                            {cvvhdfResults.isHighClottingRisk 
                              ? 'HIGH CLOTTING RISK (>25%). Increase pre-filter replacement or $Q_b$ to lower hemoconcentration.' 
                              : 'Optimal hemoconcentration risk (FF ≤ 25%). Good filter longevity anticipated.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: UNIFIED INFUSIONS & RATE CONVERTER */}
          {activeTab === 'infusions' && (
            <motion.div 
              key="infusions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-white space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Infusions Sidebar Selection */}
                <div className="lg:col-span-4 space-y-2 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Drug Protocol Library</h3>
                  {INFUSION_PROTOCOLS.map((protocol) => (
                    <button
                      key={protocol.id}
                      onClick={() => setSelectedInfusionId(protocol.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        selectedInfusionId === protocol.id 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.01]' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded block w-fit mb-1 ${
                        selectedInfusionId === protocol.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {protocol.category}
                      </span>
                      <h4 className="font-bold text-sm leading-tight">{protocol.name}</h4>
                    </button>
                  ))}
                </div>

                {/* Main Interactive Dosing & Rate Converter Dashboard */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
                    {/* Header Details */}
                    <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                      <div>
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedInfusion.category}</span>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{selectedInfusion.name}</h3>
                        <p className="text-slate-500 text-xs mt-0.5">{selectedInfusion.indication}</p>
                      </div>

                      {/* Weight Basis Switch */}
                      <div className="flex bg-slate-200 p-1 rounded-xl">
                        <button
                          onClick={() => setDosingWeightType('tbw')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            dosingWeightType === 'tbw' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          TBW ({patient.weightNum}kg)
                        </button>
                        <button
                          onClick={() => setDosingWeightType('ibw')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            dosingWeightType === 'ibw' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          IBW ({ibw > 0 ? ibw.toFixed(1) : '--'}kg)
                        </button>
                      </div>
                    </div>

                    {/* Integrated Interactive Dose & Rate Converter Panel */}
                    <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                        <Sliders className="w-4 h-4 text-indigo-600" />
                        Live Interactive Rate Converter
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-semibold text-slate-500">
                              Target Dose Rate ({selectedInfusion.unit})
                            </label>
                            <span className="text-xs font-bold text-indigo-600">{customDose} {selectedInfusion.unit}</span>
                          </div>
                          <input 
                            type="number"
                            step={selectedInfusion.step}
                            value={customDose}
                            onChange={e => setCustomDose(Number(e.target.value) || 0)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 text-base font-bold outline-none focus:border-indigo-500 transition-all text-center mb-2"
                          />
                          {/* Range Slider for Target Dose */}
                          <input 
                            type="range"
                            min={selectedInfusion.minDose}
                            max={selectedInfusion.maxDose}
                            step={selectedInfusion.step}
                            value={customDose}
                            onChange={e => setCustomDose(Number(e.target.value))}
                            className="w-full accent-indigo-600 cursor-pointer"
                          />
                          <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-0.5">
                            <span>Min: {selectedInfusion.minDose}</span>
                            <span>Max: {selectedInfusion.maxDose}</span>
                          </div>
                        </div>


                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">
                            Concentration (mg/mL)
                          </label>
                          <input 
                            type="number"
                            step="0.01"
                            value={customConc}
                            onChange={e => setCustomConc(Number(e.target.value) || 0)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-lg font-bold outline-none focus:border-indigo-500 transition-all text-center"
                          />
                        </div>
                      </div>

                      {/* Resulting Pump Speed Box */}
                      <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">Calculated Smart Pump Speed</span>
                          <span className="text-[10px] text-indigo-700 font-medium">Standard Prep: {selectedInfusion.preparation}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-3xl font-black text-indigo-600">{calculatedPumpRate}</span>
                          <span className="text-sm font-bold text-indigo-800 ml-1.5">mL/h</span>
                        </div>
                      </div>
                    </div>

                    {/* Dosing & Titration Details */}
                    <div className="space-y-4 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-1">Standard Dose Range Reference</h4>
                        <p className="text-slate-600 bg-white p-3 rounded-lg border border-slate-200 font-mono">{selectedInfusion.standardDoseRange}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-1">Clinical Titration & Monitoring</h4>
                        <ul className="space-y-1.5 text-slate-600 bg-white p-4 rounded-lg border border-slate-200 list-disc list-inside">
                          {selectedInfusion.titrationTips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-rose-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Safety & Extravasation Warnings
                        </h4>
                        <ul className="space-y-1.5 text-rose-700 bg-rose-50 p-4 rounded-lg border border-rose-200 list-disc list-inside">
                          {selectedInfusion.safetyWarnings.map((warn, idx) => (
                            <li key={idx}>{warn}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
