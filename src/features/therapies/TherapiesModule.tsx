import { useState, useMemo, useEffect } from 'react';
import { 
  Activity, 
  Syringe, 
  AlertTriangle, 
  ShieldCheck, 
  HeartPulse, 
  CheckCircle2, 
  ArrowRightLeft, 
  Sliders,
  LineChart,
  TrendingUp,
  Gauge,
  Zap,
  Info,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePatient } from '../../contexts/PatientContext';
import { PatientParameterCard } from '../../components/PatientParameterCard';
import { calculateIBW } from '../../lib/medicalDosing';

type ActiveModuleTab = 'cvvhdf' | 'infusions' | 'hemodynamics';

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

  // ================= INVASIVE HEMODYNAMICS CALCULATOR STATE =================
  const [hemoMap, setHemoMap] = useState<number>(85);
  const [hemoCvp, setHemoCvp] = useState<number>(8);
  const [hemoMpap, setHemoMpap] = useState<number>(20);
  const [hemoPaop, setHemoPaop] = useState<number>(10);
  const [hemoCo, setHemoCo] = useState<number>(5.0);
  const [hemoHr, setHemoHr] = useState<number>(75);
  const [dampingState, setDampingState] = useState<'normal' | 'overdamped' | 'underdamped'>('normal');


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

  // Invasive Hemodynamics Calculator & Profiles
  const hemodynamicResults = useMemo(() => {
    const bsa = patient.bsa || 1.73;
    const co = Math.max(0.1, hemoCo);
    const hr = Math.max(1, hemoHr);
    
    // SVR = ((MAP - CVP) * 80) / CO
    const svr = Math.round(((hemoMap - hemoCvp) * 80) / co);
    // PVR = ((MPAP - PAOP) * 80) / CO
    const pvr = Math.round(((hemoMpap - hemoPaop) * 80) / co);
    
    const ci = (co / bsa).toFixed(2);
    const sv = Math.round((co * 1000) / hr);
    const svi = Math.round(sv / bsa);
    const lvswi = Math.round((1.36 * (hemoMap - hemoPaop) * svi) / 100);
    const rvswi = Math.round((1.36 * (hemoMpap - hemoCvp) * svi) / 100);

    return {
      svr,
      pvr,
      ci,
      sv,
      svi,
      lvswi,
      rvswi,
      isSvrLow: svr < 800,
      isSvrHigh: svr > 1200,
      isPvrHigh: pvr > 250,
      isCiLow: Number(ci) < 2.5,
    };
  }, [hemoMap, hemoCvp, hemoMpap, hemoPaop, hemoCo, hemoHr, patient.bsa]);

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
              <p className="text-slate-500 text-xs mt-0.5">Prismaflex CVVHDF, Vasoactive Infusions & Invasive Hemodynamics.</p>
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
            <Activity className="w-4 h-4" /> Prismaflex CVVHDF
          </button>
          <button
            onClick={() => setActiveTab('infusions')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'infusions' 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <HeartPulse className="w-4 h-4" /> Infusions & Converter
          </button>
          <button
            onClick={() => setActiveTab('hemodynamics')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'hemodynamics' 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LineChart className="w-4 h-4" /> Hemodynamics & Waveforms
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
          {activeTab === 'hemodynamics' && (
            <motion.div
              key="hemodynamics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-white space-y-8"
            >
              {/* SECTION 1: INVASIVE HEMODYNAMIC CALCULATOR */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                  <Gauge className="w-4 h-4 text-indigo-600" />
                  Invasive Hemodynamic Parameter Calculator & Derived Indices
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Parameter Inputs Column */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                      <span>Primary Measurements</span>
                      <span className="text-[10px] text-slate-400 font-normal">Live Inputs</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">MAP (mmHg)</label>
                        <input
                          type="number"
                          value={hemoMap}
                          onChange={e => setHemoMap(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">CVP (mmHg)</label>
                        <input
                          type="number"
                          value={hemoCvp}
                          onChange={e => setHemoCvp(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">MPAP (mmHg)</label>
                        <input
                          type="number"
                          value={hemoMpap}
                          onChange={e => setHemoMpap(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">PAOP / Wedge</label>
                        <input
                          type="number"
                          value={hemoPaop}
                          onChange={e => setHemoPaop(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cardiac Output (L/min)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={hemoCo}
                          onChange={e => setHemoCo(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Heart Rate (bpm)</label>
                        <input
                          type="number"
                          value={hemoHr}
                          onChange={e => setHemoHr(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-900">
                      <span className="font-bold block">Patient BSA:</span> {patient.bsa ? `${patient.bsa} m²` : '1.73 m² (Standard Default)'}
                    </div>
                  </div>

                  {/* Derived Calculations Grid */}
                  <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {/* SVR Card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      hemodynamicResults.isSvrLow 
                        ? 'bg-amber-50 border-amber-200' 
                        : hemodynamicResults.isSvrHigh 
                        ? 'bg-rose-50 border-rose-200' 
                        : 'bg-emerald-50/50 border-emerald-200'
                    }`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">SVR (Systemic Vasc Res)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.svr}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">dynes·sec/cm⁵</span>
                      <div className="mt-2 text-[10px] font-bold flex items-center gap-1">
                        {hemodynamicResults.isSvrLow && <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Vasodilation / Vasoplegia</span>}
                        {hemodynamicResults.isSvrHigh && <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">Vasoconstriction</span>}
                        {!hemodynamicResults.isSvrLow && !hemodynamicResults.isSvrHigh && <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Normal (800-1200)</span>}
                      </div>
                    </div>

                    {/* PVR Card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      hemodynamicResults.isPvrHigh ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50/50 border-emerald-200'
                    }`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">PVR (Pulm Vasc Res)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.pvr}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">dynes·sec/cm⁵</span>
                      <div className="mt-2 text-[10px] font-bold">
                        {hemodynamicResults.isPvrHigh ? (
                          <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">High (Pulm HTN / PE)</span>
                        ) : (
                          <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Normal (100-250)</span>
                        )}
                      </div>
                    </div>

                    {/* Cardiac Index Card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      hemodynamicResults.isCiLow ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50/50 border-emerald-200'
                    }`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Cardiac Index (CI)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.ci}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">L/min/m²</span>
                      <div className="mt-2 text-[10px] font-bold">
                        {hemodynamicResults.isCiLow ? (
                          <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Low Output (&lt; 2.5)</span>
                        ) : (
                          <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Normal (2.5-4.0)</span>
                        )}
                      </div>
                    </div>

                    {/* Stroke Volume Index */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Stroke Vol Index (SVI)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.svi}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">mL/m² (Normal: 33-47)</span>
                    </div>

                    {/* LVSWI */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">LVSWI (LV Work Index)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.lvswi}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">g-m/m²/beat (Normal: 45-60)</span>
                    </div>

                    {/* RVSWI */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">RVSWI (RV Work Index)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.rvswi}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">g-m/m²/beat (Normal: 7-12)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: ARTERIAL LINE WAVEFORM & DAMPING ANALYZER */}
              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    Arterial Line Waveform & Damping Analysis (Square-Wave Flush Test)
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setDampingState('normal')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        dampingState === 'normal' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Normal Damping
                    </button>
                    <button
                      onClick={() => setDampingState('overdamped')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        dampingState === 'overdamped' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Overdamped
                    </button>
                    <button
                      onClick={() => setDampingState('underdamped')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        dampingState === 'underdamped' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Underdamped
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Interactive Waveform SVG Renderer */}
                  <div className="bg-slate-950 p-4 rounded-2xl text-white space-y-3 shadow-inner">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-emerald-400 font-bold">ART PRESS: 120/80 (85) mmHg</span>
                      <span className="text-[10px] text-slate-400 font-mono">Damping Coefficient (ζ): {
                        dampingState === 'normal' ? '0.6 - 0.7 (Optimal)' : dampingState === 'overdamped' ? '> 1.0 (High Damping)' : '< 0.4 (Low Damping)'
                      }</span>
                    </div>

                    <div className="h-40 w-full flex items-center justify-center bg-slate-900/60 rounded-xl overflow-hidden p-2 relative">
                      <svg viewBox="0 0 400 120" className="w-full h-full stroke-current text-emerald-400 fill-none" strokeWidth="2.5">
                        {dampingState === 'normal' && (
                          <path d="M 10 90 L 30 90 L 45 20 L 55 50 L 62 45 L 75 80 L 100 90 L 140 90 L 145 10 L 145 100 L 155 85 L 165 92 L 180 90 L 220 90 L 235 20 L 245 50 L 252 45 L 265 80 L 300 90 L 390 90" />
                        )}
                        {dampingState === 'overdamped' && (
                          <path d="M 10 90 L 40 90 L 60 40 L 90 75 L 120 90 L 140 90 L 145 10 L 145 100 L 160 90 L 220 90 L 240 40 L 270 75 L 300 90 L 390 90" />
                        )}
                        {dampingState === 'underdamped' && (
                          <path d="M 10 90 L 30 90 L 40 5 L 50 65 L 55 35 L 62 85 L 68 75 L 75 90 L 140 90 L 145 10 L 145 100 L 150 20 L 155 105 L 160 70 L 165 95 L 170 88 L 180 90 L 220 90 L 230 5 L 240 65 L 245 35 L 252 85 L 260 90 L 390 90" />
                        )}
                      </svg>
                    </div>

                    <div className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      {dampingState === 'normal' && (
                        <p><strong className="text-emerald-400">Normal Waveform:</strong> Sharp upstroke, distinct dicrotic notch (aortic valve closure), and 1-2 small oscillations following the square-wave flush. SBP & DBP are accurately measured.</p>
                      )}
                      {dampingState === 'overdamped' && (
                        <p><strong className="text-amber-400">Overdamped Waveform:</strong> Slurred upstroke, loss of dicrotic notch, and zero post-flush oscillations. Falsely LOW SBP and falsely HIGH DBP (MAP remains accurate).</p>
                      )}
                      {dampingState === 'underdamped' && (
                        <p><strong className="text-rose-400">Underdamped Waveform:</strong> Overshooting tall narrow peak with multiple excessive post-flush oscillations (&gt;2). Falsely HIGH SBP and falsely LOW DBP.</p>
                      )}
                    </div>
                  </div>

                  {/* Troubleshooting & Clinical Action Guide */}
                  <div className="space-y-3 text-xs">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-indigo-600" />
                        Square-Wave Flush Test & Troubleshooting
                      </h4>
                      {dampingState === 'overdamped' && (
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          <li><strong>Common Causes:</strong> Air bubbles in tubing/transducer, blood clot at catheter tip, kinked catheter, soft/compliant extension tubing, loose stopcock.</li>
                          <li><strong>Correction Protocol:</strong> Flush line to clear blood/bubbles, check for kinks, aspirate clot, ensure short non-compliant pressure tubing.</li>
                        </ul>
                      )}
                      {dampingState === 'underdamped' && (
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          <li><strong>Common Causes:</strong> Excessive tubing length, multiple stopcocks, catheter whipping, hypothermia, hyperdynamic circulation.</li>
                          <li><strong>Correction Protocol:</strong> Remove unnecessary extension tubing/stopcocks, use a damping device (e.g. Accudamp), rely on MAP rather than peak SBP.</li>
                        </ul>
                      )}
                      {dampingState === 'normal' && (
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          <li><strong>Flush Test Criteria:</strong> High-pressure flush generates a square wave followed by 1-2 rebound oscillations before resuming normal arterial wave.</li>
                          <li><strong>Pulse Pressure Variation (PPV):</strong> PPV &gt; 13% predicts volume responsiveness ONLY if mechanically ventilated, tidal volume &ge; 8 mL/kg PBW, and sinus rhythm.</li>
                        </ul>
                      )}
                    </div>

                    <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100 space-y-1.5">
                      <h4 className="font-bold text-indigo-900 uppercase tracking-wider">Pulse Pressure Variation (PPV) Rules</h4>
                      <p className="text-indigo-800 leading-relaxed font-mono text-xs">
                        PPV (%) = [(PPmax - PPmin) / PPmean] × 100
                      </p>
                      <p className="text-indigo-800 leading-relaxed">
                        Values &gt; 13% indicate the patient is on the steep ascending limb of the Frank-Starling curve and will increase Cardiac Output with fluid boluses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: CENTRAL VENOUS PRESSURE (CVP) WAVEFORM ANALYSIS */}
              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  Central Venous Pressure (CVP) Waveform Analysis & Pathological Signs
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Waveform Components Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="p-3">Wave / Descent</th>
                          <th className="p-3">Cardiac Cycle Event</th>
                          <th className="p-3">ECG Timing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium text-slate-600">
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">a wave</td>
                          <td className="p-3">Right Atrial contraction</td>
                          <td className="p-3">Just after P wave</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">c wave</td>
                          <td className="p-3">Tricuspid valve bulging into RA (isovolumetric contraction)</td>
                          <td className="p-3">End of QRS complex</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">x descent</td>
                          <td className="p-3">Atrial relaxation & downward displacement of tricuspid valve</td>
                          <td className="p-3">ST segment</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">v wave</td>
                          <td className="p-3">Venous filling of RA against closed tricuspid valve</td>
                          <td className="p-3">End of T wave</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">y descent</td>
                          <td className="p-3">Tricuspid valve opening & rapid passive ventricular filling</td>
                          <td className="p-3">Before P wave</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Pathological Signs */}
                  <div className="space-y-3 text-xs">
                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2">
                      <h4 className="font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        Key Pathological CVP Waveform Patterns
                      </h4>
                      <ul className="space-y-2 text-rose-800">
                        <li>
                          <strong>Cannon a Waves:</strong> Atrium contracts against a closed tricuspid valve. Seen in Complete Heart Block (3rd degree AV block), Junctional Rhythm, and VT.
                        </li>
                        <li>
                          <strong>Giant v Waves:</strong> Severe Tricuspid Regurgitation (systolic backflow into RA during RV contraction obliterates x descent).
                        </li>
                        <li>
                          <strong>Friedreich Sign (Deep y descent):</strong> Constrictive Pericarditis (rapid initial filling followed by sudden abrupt ventricular restriction).
                        </li>
                        <li>
                          <strong>Blunted / Absent y descent:</strong> Cardiac Tamponade (high intrapericardial pressure prevents rapid passive filling during diastole).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: SHOCK PROFILES REFERENCE MATRIX */}
              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Invasive Hemodynamic Profiles in Shock States
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="p-3">Shock Classification</th>
                        <th className="p-3">CVP</th>
                        <th className="p-3">PAOP / Wedge</th>
                        <th className="p-3">CO / CI</th>
                        <th className="p-3">SVR</th>
                        <th className="p-3">SvO₂</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Hypovolemic Shock</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                        <td className="p-3 text-rose-600 font-bold">↓</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-rose-600 font-bold">↓</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Cardiogenic Shock</td>
                        <td className="p-3 text-emerald-600 font-bold">↑</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑ (&gt;18)</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓ (&lt;2.2)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Distributive (Septic / Vasoplegic)</td>
                        <td className="p-3 text-slate-500 font-bold">↔ / ↓</td>
                        <td className="p-3 text-slate-500 font-bold">↔ / ↓</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑ (Early)</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓ (&lt;800)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑ (Impaired extraction)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Obstructive (Tamponade)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑ (Equalized)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑ (Equalized)</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-rose-600 font-bold">↓</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Obstructive (Massive PE)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-slate-500 font-bold">Normal / Low</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-rose-600 font-bold">↓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
