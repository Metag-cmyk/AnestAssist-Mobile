import { useState, useEffect } from 'react';
import { Wind, Ruler, ActivitySquare, Waves, Info, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePatient } from '../../contexts/PatientContext';
import { PatientParameterCard } from '../../components/PatientParameterCard';
import { STORAGE_KEYS } from '../../config/storageKeys';
import {
  predictedBodyWeight, drivingPressure, staticCompliance, pfRatio, ardsSeverity,
  ARDS_SEVERITY_LABEL, rapidShallowBreathingIndex, ARDSNET_LOW_PEEP, ARDSNET_HIGH_PEEP,
} from '../../lib/ventilator';

type ClinicalCondition = 'standard' | 'ards' | 'obstructive' | 'neuro' | 'restrictive' | 'cardiogenic' | 'neuromuscular' | 'pregnancy' | 'laparoscopy' | 'olv' | 'trauma';

const SBT_CRITERIA = [
  'Awake, responsive and following commands',
  'Haemodynamically stable (no or minimal vasopressors)',
  'Adequate oxygenation (PEEP ≤ 8, FiO₂ ≤ 0.40, SpO₂ ≥ 90%)',
  'Not requiring deep sedation',
  'RR < 35 and no signs of respiratory distress',
  'Adequate cough and secretion clearance',
  'No planned procedures in the next 24 hours',
  'Stable metabolic / electrolyte status',
];

function NumField({ label, value, onChange, step = 1, suffix }: {
  label: string; value: number; onChange: (v: number) => void; step?: number; suffix?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</label>
      <div className="relative">
        <input type="number" step={step} value={value} onChange={e => onChange(Number(e.target.value))}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-sky-500" />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">{suffix}</span>}
      </div>
    </div>
  );
}

function MetricCard({ label, value, unit, tone, note }: {
  label: string; value: string; unit: string;
  tone: 'emerald' | 'amber' | 'rose'; note: string;
}) {
  const toneStyle = {
    emerald: 'border-emerald-200 bg-emerald-50/50',
    amber: 'border-amber-200 bg-amber-50/50',
    rose: 'border-rose-200 bg-rose-50/60',
  }[tone];
  const dot = { emerald: 'bg-emerald-500', amber: 'bg-amber-500', rose: 'bg-rose-500' }[tone];
  return (
    <div className={`p-4 rounded-2xl border ${toneStyle}`}>
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-black text-slate-900">{value}</span>
        <span className="text-[10px] font-semibold text-slate-500">{unit}</span>
      </div>
      <p className="text-[10px] text-slate-500 leading-snug mt-1">{note}</p>
    </div>
  );
}

export default function VentilatorModule() {
  const { weightNum, heightNum, gender, ageNum } = usePatient();
  const [condition, setCondition] = useState<ClinicalCondition>(() => {
    return (localStorage.getItem(STORAGE_KEYS.VENTILATOR_CONDITION) as ClinicalCondition) || 'standard';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VENTILATOR_CONDITION, condition);
  }, [condition]);

  const pbw = predictedBodyWeight(heightNum, gender === 'male');

  const getTargetVolumes = (conditionType: ClinicalCondition, ibw: number) => {
    if (ibw <= 0) return { min: 0, max: 0, label: '' };
    switch (conditionType) {
      case 'ards': 
      case 'restrictive': 
      case 'olv': 
        return { min: Math.round(ibw * 4), max: Math.round(ibw * 6), label: '4-6 mL/kg IBW (Lung Protective)' };
      case 'cardiogenic':
      case 'standard': 
      case 'obstructive': 
      case 'neuro': 
      case 'pregnancy':
      case 'laparoscopy':
      case 'trauma':
        return { min: Math.round(ibw * 6), max: Math.round(ibw * 8), label: '6-8 mL/kg IBW' };
      case 'neuromuscular': 
        return { min: Math.round(ibw * 8), max: Math.round(ibw * 10), label: '8-10 mL/kg IBW (Avoid Atelectasis)' };
      default: return { min: 0, max: 0, label: '' };
    }
  };

  const targets = getTargetVolumes(condition, pbw);

  // ---- Respiratory mechanics, oxygenation indices & weaning ----
  const [pplat, setPplat] = useState(25);
  const [ppeak, setPpeak] = useState(30);
  const [peepCfg, setPeepCfg] = useState(8);
  const [fio2, setFio2] = useState(40);
  const [pao2, setPao2] = useState(90);
  const [actRr, setActRr] = useState(16);
  const [actVt, setActVt] = useState(420);
  const [peepLadder, setPeepLadder] = useState<'low' | 'high'>('low');
  const [sbtChecks, setSbtChecks] = useState<Record<string, boolean>>({});

  const deltaP = drivingPressure(pplat, peepCfg);
  const compliance = staticCompliance(actVt, pplat, peepCfg);
  const pf = pfRatio(pao2, fio2);
  const severity = ardsSeverity(pf, peepCfg);
  const rsbi = rapidShallowBreathingIndex(actRr, actVt);
  const peepTable = peepLadder === 'low' ? ARDSNET_LOW_PEEP : ARDSNET_HIGH_PEEP;
  const sbtCount = SBT_CRITERIA.filter((_, i) => sbtChecks[i]).length;

  const getStrategyDetails = (cond: ClinicalCondition) => {
    switch (cond) {
      case 'pregnancy':
        return {
          title: 'Pregnancy (Third Trimester)',
          desc: 'Manage increased metabolic rate and decreased FRC.',
          rr: '16 - 20 bpm (Maintain physiological alkalosis)',
          peep: '5 - 8 cmH2O',
          ie: '1:2',
          targets: 'Target PaCO2 30-32 mmHg. Avoid maternal hypoxemia (SpO2 > 95%). Rapid desaturation expected.'
        };
      case 'laparoscopy':
        return {
          title: 'Laparoscopy (High IAP)',
          desc: 'Overcoming the restrictive effect of pneumoperitoneum.',
          rr: '14 - 18 bpm',
          peep: '8 - 12 cmH2O (Recruitment needed)',
          ie: '1:2',
          targets: 'Monitor P-Plat (< 30). Compensate for CO2 absorption. Aggressive PEEP to maintain FRC.'
        };
      case 'olv':
        return {
          title: 'One-Lung Ventilation (OLV)',
          desc: 'Ventilating the dependent lung only.',
          rr: '16 - 22 bpm (Minimize volutrauma)',
          peep: '5 - 10 cmH2O',
          ie: '1:2',
          targets: 'Target TV 4-5 mL/kg IBW. Monitor driving pressure. Periodic recruitment of non-dependent lung.'
        };
      case 'trauma':
        return {
          title: 'Major Trauma / Hemorrhage',
          desc: 'Prioritize hemodynamic stability over aggressive ventilation.',
          rr: '10 - 14 bpm (Permissive hypercapnia)',
          peep: '0 - 5 cmH2O (Avoid venous return obstruction)',
          ie: '1:2',
          targets: 'Minimize intrathoracic pressure. High PEEP may compromise cardiac output. Target SpO2 90%.'
        };
      case 'ards':
        return {
          title: 'Acute Respiratory Distress Syndrome (ARDS)',
          desc: 'Lung protective ventilation to minimize VILI.',
          rr: '15 - 35 bpm (adjust for pH > 7.20)',
          peep: 'High PEEP (ARDSNet Tables > 10 cmH2O)',
          ie: '1:1 to 1:2',
          targets: 'Plateau < 30 cmH2O. Permissive hypercapnia is acceptable. Target SpO2 88-95%.'
        };
      case 'obstructive':
        return {
          title: 'Obstructive (Asthma / COPD)',
          desc: 'Focus on maximizing expiratory time to prevent dynamic hyperinflation.',
          rr: '10 - 14 bpm (Low rate)',
          peep: '0 - 5 cmH2O (Match Auto-PEEP cautiously)',
          ie: '1:3 to 1:5 (Prolonged Expiration)',
          targets: 'Monitor Flow-Time curve. E-Flow must reach zero. Permissive hypercapnia allowed.'
        };
      case 'neuro':
        return {
          title: 'Neuro-Critical Care (TBI / ICP)',
          desc: 'Strict control of PaCO2 to manage cerebral blood flow.',
          rr: '16 - 20 bpm (Titrate strictly to PaCO2)',
          peep: '5 - 8 cmH2O',
          ie: '1:2',
          targets: 'Strict PaCO2 target: 35-40 mmHg (Avoid hypercapnia to prevent vasodilation).'
        };
      case 'restrictive':
        return {
          title: 'Restrictive Disease (Fibrosis)',
          desc: 'Overcoming extremely low compliance (stiff lungs).',
          rr: '18 - 25 bpm (Higher rate, low volume)',
          peep: '5 - 10 cmH2O',
          ie: '1:1 to 1:2',
          targets: 'Monitor Driving Pressure closely (ΔP < 15). High peak pressures expected.'
        };
      case 'cardiogenic':
        return {
          title: 'Cardiogenic Shock / Pulmonary Edema',
          desc: 'Using positive pressure to decrease LV afterload and improve oxygenation.',
          rr: '14 - 18 bpm',
          peep: '10 - 15 cmH2O (Aggressive PEEP)',
          ie: '1:2',
          targets: 'High PEEP helps clear fluid and reduce preload/afterload. Monitor for RV failure.'
        };
      case 'neuromuscular':
        return {
          title: 'Neuromuscular Weakness',
          desc: 'Guillain-Barré / Myasthenia Gravis. High dependency on accurate triggering.',
          rr: '10 - 14 bpm (Allow patient triggering)',
          peep: '5 - 8 cmH2O',
          ie: '1:2',
          targets: 'Optimize trigger sensitivity. Larger tidal volumes help prevent basal atelectasis.'
        };
      case 'standard':
      default:
        return {
          title: 'Standard / Post-Operative',
          desc: 'Routine protective ventilation for healthy lungs.',
          rr: '12 - 16 bpm',
          peep: '5 - 8 cmH2O',
          ie: '1:2',
          targets: 'Target SpO2 > 94%, strict eucapnia (PaCO2 35-45 mmHg).'
        };
    }
  };

  const strategy = getStrategyDetails(condition);

  const getWaveform = (cond: ClinicalCondition) => {
    let pPath="M 10 40 L 20 10 L 40 10 L 50 40 L 90 40"; 
    let fPath="M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25"; 
    let pvPath="M 20 80 Q 40 20 60 20 Q 50 85 20 80"; // Standard Loop

    switch (cond) {
      case 'laparoscopy':
        pPath = "M 10 35 L 20 5 L 40 5 L 50 35 L 90 35"; // Steep pressure rise
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
        pvPath = "M 45 80 Q 60 40 85 40 Q 65 90 45 80"; // Shifted right, flattened
        break;
      case 'pregnancy':
        pPath = "M 10 40 L 20 15 L 40 15 L 50 40 L 90 40";
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 75 25 L 90 25"; // Rapid exp flow
        pvPath = "M 30 80 Q 50 30 75 30 Q 55 90 30 80"; 
        break;
      case 'trauma':
        pPath = "M 10 45 L 20 25 L 40 25 L 50 45 L 90 45"; // Low PEEP, cautious rise
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
        pvPath = "M 15 90 Q 40 40 65 40 Q 45 95 15 90";
        break;
      case 'obstructive':
        pPath = "M 10 40 L 15 15 L 40 15 L 50 40 L 90 40";
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 85 30 L 90 30"; 
        pvPath = "M 20 60 Q 50 10 80 15 Q 50 70 20 60"; // Wider (Resistance), Higher Baseline (PEEPi)
        break;
      case 'ards':
      case 'restrictive':
      case 'olv':
        pPath = "M 10 40 L 20 5 L 30 15 L 40 15 L 50 40 L 90 40"; 
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 40 L 70 25 L 90 25";
        pvPath = "M 35 80 Q 55 60 85 60 Q 65 85 35 80"; // Flattened (Low Compliance), Shifted Right
        break;
      case 'neuromuscular':
        pPath = "M 5 40 L 10 45 L 15 10 L 40 10 L 50 40 L 90 40"; 
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
        pvPath = "M 20 85 L 15 85 Q 35 25 60 25 Q 50 90 20 85"; // Small trigger dip
        break;
      case 'cardiogenic':
        pPath = "M 10 30 L 20 5 L 40 5 L 50 30 L 90 30"; 
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
        pvPath = "M 40 80 Q 55 30 75 30 Q 60 85 40 80"; // High PEEP Shift
        break;
      case 'standard':
      case 'neuro':
      default:
        pPath = "M 10 40 L 20 15 L 40 15 L 50 40 L 90 40"; 
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 40 L 80 25 L 90 25";
        pvPath = "M 20 80 Q 40 25 65 25 Q 50 85 20 80"; // Standard
        break;
    }

    return (
      <div className="flex flex-col gap-4 w-full">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
          <Waves className="w-4 h-4" /> 
          Diagnostic Scalars & Graphics
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative h-[140px] flex items-center justify-center">
            <span className="absolute top-2 left-3 text-[10px] font-bold text-yellow-500 uppercase">Pressure (cmH2O)</span>
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-md">
              <line x1="0" y1="10" x2="100" y2="10" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="#fbbf24" strokeWidth="0.5" />
              <path d={pPath} fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {cond === 'neuromuscular' && (
                <circle cx="10" cy="45" r="3" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
              )}
              {(cond === 'ards' || cond === 'restrictive') && (
                <circle cx="20" cy="5" r="3" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
              )}
            </svg>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative h-[140px] flex items-center justify-center">
            <span className="absolute top-2 left-3 text-[10px] font-bold text-emerald-400 uppercase">Flow (L/min)</span>
            {cond === 'obstructive' && (
              <span className="absolute bottom-2 right-3 text-[10px] font-bold text-red-400 animate-pulse bg-red-900/50 px-2 py-0.5 rounded">AUTO-PEEP WARNING</span>
            )}
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-md">
              <line x1="0" y1="25" x2="100" y2="25" stroke="#34d399" strokeWidth="0.5" />
              <path d={fPath} fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {cond === 'obstructive' && (
                <circle cx="90" cy="30" r="3" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-pulse" />
              )}
            </svg>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative h-[140px] flex items-center justify-center">
            <span className="absolute top-2 left-3 text-[10px] font-bold text-indigo-400 uppercase">P/V Loop (Dyn Compliance)</span>
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
              <line x1="0" y1="20" x2="100" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="20" y1="0" x2="20" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="80" y1="0" x2="80" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="5" y1="95" x2="95" y2="95" stroke="#818cf8" strokeWidth="1" />
              <line x1="5" y1="5" x2="5" y2="95" stroke="#818cf8" strokeWidth="1" />
              <path d={pvPath} fill="rgba(129, 140, 248, 0.1)" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {(cond === 'ards' || cond === 'restrictive') && (
                <path d="M 35 80 L 85 60" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1" strokeDasharray="2" />
              )}
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PatientParameterCard showWeight={false} showAge={false} className="bg-sky-50 border-sky-100" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <ActivitySquare className="w-4 h-4 text-sky-600" />
              Tidal Volume Reference
            </h3>
            
            <div className="space-y-4">
              <div className="bg-sky-50/50 p-4 rounded-xl flex justify-between items-center border border-sky-100 shadow-inner">
                <span className="text-sm font-bold text-sky-900">Predicted Body Wt (PBW):</span>
                <span className="text-2xl font-black text-sky-600">{pbw > 0 ? pbw.toFixed(1) : '--'} <span className="text-base font-bold">kg</span></span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic px-1">
                Tidal volumes are calculated based on Ideal Body Weight (IBW) to prevent Ventilator-Induced Lung Injury (VILI), regardless of actual body weight.
              </p>
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
                    <div aria-live="polite" className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex-1 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-sky-800 mb-1">Strict Output ({targets?.label})</div>
                        <div className="text-3xl font-black text-sky-600">
                          {pbw > 0 ? `${targets.min} - ${targets.max}` : '---'} <span className="text-lg font-bold">mL</span>
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

      {/* ===== Lung-protective tidal volumes ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <Ruler className="w-4 h-4 text-sky-600" /> PBW Tidal Volumes
          </h3>
          {pbw > 0 ? (
            <div className="space-y-2">
              {[4, 6, 8, 10].map(k => (
                <div key={k} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold text-slate-500">{k} mL/kg</span>
                  <span className="text-sm font-black text-sky-700">{Math.round(pbw * k)} mL</span>
                </div>
              ))}
              <p className="text-[10px] text-slate-400 italic pt-1">4–6 mL/kg for ARDS/OLV; 6–8 mL/kg routine lung-protective ventilation.</p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Enter height and gender above to calculate PBW.</p>
          )}
        </div>

        {/* ===== ARDSNet PEEP / FiO2 ladder ===== */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Waves className="w-4 h-4 text-sky-600" /> ARDSNet PEEP / FiO₂ Ladder
            </h3>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {(['low', 'high'] as const).map(l => (
                <button key={l} onClick={() => setPeepLadder(l)}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                    peepLadder === l ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}>
                  {l === 'low' ? 'Lower PEEP' : 'Higher PEEP'}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {peepTable.map(row => (
              <div key={row.fio2} className="text-center p-2 rounded-lg border border-slate-100 bg-slate-50">
                <div className="text-[10px] font-bold text-slate-400">FiO₂ {row.fio2.toFixed(2).replace(/0$/, '')}</div>
                <div className="text-sm font-black text-sky-700 mt-0.5">{row.peep}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 italic pt-3">
            Minimum PEEP 5 cmH₂O. Use an incremental pair to reach the oxygenation goal; the higher-PEEP ladder is for moderate–severe ARDS.
          </p>
        </div>
      </div>

      {/* ===== Mechanics & oxygenation indices ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <ActivitySquare className="w-4 h-4 text-sky-600" /> Measured Parameters
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <NumField label="Plateau (Pplat)" value={pplat} onChange={setPplat} suffix="cmH₂O" />
            <NumField label="Peak (Ppeak)" value={ppeak} onChange={setPpeak} suffix="cmH₂O" />
            <NumField label="PEEP" value={peepCfg} onChange={setPeepCfg} suffix="cmH₂O" />
            <NumField label="FiO₂" value={fio2} onChange={setFio2} suffix="%" />
            <NumField label="PaO₂" value={pao2} onChange={setPao2} suffix="mmHg" />
            <NumField label="Actual VT" value={actVt} onChange={setActVt} step={10} suffix="mL" />
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3" aria-live="polite">
          <MetricCard
            label="Driving Pressure"
            value={`${deltaP}`}
            unit="cmH₂O"
            tone={deltaP >= 15 ? 'rose' : 'emerald'}
            note={deltaP >= 15 ? 'Above 15 — associated with VILI; consider reducing VT.' : 'Within target (< 15).'}
          />
          <MetricCard
            label="Static Compliance"
            value={compliance > 0 ? compliance.toFixed(0) : '--'}
            unit="mL/cmH₂O"
            tone={compliance > 0 && compliance < 20 ? 'amber' : 'emerald'}
            note={compliance > 0 && compliance < 20 ? 'Low — stiff lungs / restrictive picture.' : 'Preserved.'}
          />
          <MetricCard
            label="P/F Ratio"
            value={pf > 0 ? pf.toFixed(0) : '--'}
            unit="mmHg"
            tone={severity === 'severe' ? 'rose' : severity === 'moderate' ? 'amber' : 'emerald'}
            note={ARDS_SEVERITY_LABEL[severity]}
          />
          <MetricCard
            label="Peak–Plateau Gradient"
            value={`${Math.max(0, ppeak - pplat)}`}
            unit="cmH₂O"
            tone={ppeak - pplat > 15 ? 'amber' : 'emerald'}
            note="High gradient suggests airway resistance (e.g. bronchospasm, secretions, tube)."
          />
          <MetricCard
            label="RSBI (weaning)"
            value={rsbi > 0 ? rsbi.toFixed(0) : '--'}
            unit="breaths/min/L"
            tone={rsbi > 0 && rsbi < 105 ? 'emerald' : 'amber'}
            note={rsbi > 0 && rsbi < 105 ? 'Favourable (< 105) for a spontaneous breathing trial.' : 'Unfavourable (≥ 105); reassess readiness.'}
          />
          <MetricCard
            label="VT vs 6 mL/kg PBW"
            value={pbw > 0 ? `${((actVt / (pbw * 6)) * 100).toFixed(0)}` : '--'}
            unit="% of target"
            tone={pbw > 0 && actVt / (pbw * 6) > 1.15 ? 'amber' : 'emerald'}
            note="Actual VT relative to the 6 mL/kg PBW lung-protective reference."
          />
        </div>
      </div>

      {/* ===== Weaning / SBT readiness ===== */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600" /> Weaning / Spontaneous Breathing Trial Readiness
          </h3>
          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
            sbtCount === SBT_CRITERIA.length ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}>
            {sbtCount} / {SBT_CRITERIA.length} criteria
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SBT_CRITERIA.map((c, i) => (
            <label key={i} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-colors cursor-pointer">
              <input type="checkbox" checked={!!sbtChecks[i]} onChange={e => setSbtChecks(p => ({ ...p, [i]: e.target.checked }))}
                className="mt-0.5 w-4 h-4 accent-sky-600" />
              <span className="text-xs font-medium text-slate-700 leading-snug">{c}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-3 p-3 rounded-xl bg-sky-50 border border-sky-100">
          <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-sky-900 leading-relaxed">
            {sbtCount === SBT_CRITERIA.length && (rsbi === 0 || rsbi < 105)
              ? 'All readiness criteria met — proceed to a spontaneous breathing trial (SBT) and assess tolerance.'
              : 'Not all criteria met. Correct reversible factors (sedation, secretions, fluid balance) before an SBT.'}
          </p>
        </div>
      </div>

    </div>
  );
}
