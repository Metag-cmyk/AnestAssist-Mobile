import { useState } from 'react';
import { Stethoscope, Activity, FileText, AlertTriangle, CheckCircle2, ClipboardList, RefreshCw, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatient } from '../../contexts/PatientContext';
import { PatientParameterCard } from '../../components/PatientParameterCard';
import { STORAGE_KEYS } from '../../config/storageKeys';
import { DAS_PLAN, RSI_CHECKLIST, EXTUBATION_CRITERIA, HIGH_RISK_EXTUBATION, AirwayStepType } from './airwayAlgorithms';

const STEP_STYLE: Record<AirwayStepType, string> = {
  action: 'bg-blue-50 border-blue-100',
  decision: 'bg-amber-50 border-amber-100',
  warning: 'bg-rose-50 border-rose-100',
  info: 'bg-slate-50 border-slate-100',
};

const PLAN_BADGE: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: 'bg-indigo-600',
  B: 'bg-sky-600',
  C: 'bg-amber-600',
  D: 'bg-rose-600',
};

function Checklist({ items, storagePrefix }: { items: string[]; storagePrefix: string }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = items.filter((_, i) => checked[i]).length;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item, i) => (
          <label key={i} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors cursor-pointer">
            <input type="checkbox" checked={!!checked[i]}
              onChange={e => setChecked(p => ({ ...p, [i]: e.target.checked }))}
              className="mt-0.5 w-4 h-4 accent-indigo-600" />
            <span className="text-xs font-medium text-slate-700 leading-snug">{item}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>{done} / {items.length} complete</span>
        <button onClick={() => setChecked({})} className="flex items-center gap-1 hover:text-slate-600" aria-label={`Reset ${storagePrefix}`}>
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      </div>
    </div>
  );
}

export default function AirwayModule() {
  const { ageNum } = usePatient();
  const navigate = useNavigate();

  const getEquipment = (age: number) => {
    if (age < 1) return { ett: '3.0 - 4.0 uncuffed', blade: 'Miller 0-1', lma: 'Size 1' };
    if (age < 2) return { ett: '4.0 - 4.5 uncuffed', blade: 'Miller 1, Mac 1', lma: 'Size 1.5' };
    if (age < 8) return { ett: `${(age / 4) + 4} uncuffed`, blade: 'Mac 2, Miller 2', lma: 'Size 2-2.5' };
    if (age < 16) return { ett: '6.0 - 7.0 cuffed', blade: 'Mac 3', lma: 'Size 3' };
    return { ett: '7.0 - 8.0 cuffed', blade: 'Mac 3 or 4', lma: 'Size 4-5' };
  };

  const equipment = getEquipment(ageNum);

  return (
    <div className="space-y-6">
      <PatientParameterCard showWeight={false} className="bg-medical-primary/5 border-medical-border" />

      {/* Cross-links */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { localStorage.setItem(STORAGE_KEYS.SCORES_SELECTED_ID, 'composite-difficult-airway'); navigate('/scores'); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 text-indigo-700 text-xs font-bold transition-colors"
        >
          <ClipboardList className="w-4 h-4" /> Difficult-airway score (SARI)
        </button>
        <button
          onClick={() => navigate('/preop')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 text-indigo-700 text-xs font-bold transition-colors"
        >
          <Wind className="w-4 h-4" /> Pre-op airway assessment
        </button>
      </div>

      {/* Difficult Airway Assessment (LEMON) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-medical-primary" />
          <h3 className="font-bold text-slate-800">LEMON Assessment (Difficult Airway)</h3>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <p><strong className="text-slate-800">L - Look externally:</strong> Facial trauma, large incisors, beard/moustache, large tongue.</p>
            <p className="mt-2"><strong className="text-slate-800">E - Evaluate 3-3-2 rule:</strong> Incisor distance &lt; 3 fingers, hyoid-mental &lt; 3 fingers, thyroid-to-mouth &lt; 2 fingers.</p>
            <p className="mt-2"><strong className="text-slate-800">M - Mallampati Score:</strong> Score &ge; 3 indicates difficult intubation.</p>
          </div>
          <div>
            <p><strong className="text-slate-800">O - Obstruction:</strong> Epiglottitis, quinsy, trauma, tumor.</p>
            <p className="mt-2"><strong className="text-slate-800">N - Neck mobility:</strong> Limited extension/flexion, cervical spine injury/collar.</p>
          </div>
        </div>
      </div>

      {/* DAS Plan A-D */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500" />
          <h3 className="font-bold text-slate-800">Difficult Airway Algorithm — Plan A → D (DAS)</h3>
        </div>
        <div className="p-5 space-y-4">
          {DAS_PLAN.map(step => (
            <div key={step.plan} className="flex items-start gap-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0 ${PLAN_BADGE[step.plan]}`}>
                {step.plan}
              </div>
              <div className={`flex-1 p-4 rounded-xl border ${STEP_STYLE[step.type]}`}>
                <p className="font-bold text-sm text-slate-800">{step.title}</p>
                <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {step.keyPoints.map((k, i) => (
                    <li key={i} className="text-[11px] text-slate-600 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0" /> {k}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-600 text-white">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              <strong>Cannot Intubate, Cannot Oxygenate (CICO) → Plan D without delay.</strong> Call for help, declare CICO and perform
              emergency front-of-neck access. Delay increases the risk of hypoxic brain injury.
            </p>
          </div>
        </div>
      </div>

      {/* Equipment Sizing */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <Activity className="w-5 h-5 text-medical-primary" />
          <h3 className="font-bold text-slate-800">Equipment Sizing Reference</h3>
        </div>
        <div className="p-6">
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Endotracheal Tube</p>
              <p className="text-xl font-black text-medical-primary">{equipment.ett}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Laryngoscope Blade</p>
              <p className="text-xl font-black text-medical-primary">{equipment.blade}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LMA Size</p>
              <p className="text-xl font-black text-medical-primary">{equipment.lma}</p>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 italic text-center">
            Sizes estimated for a {ageNum}-year-old patient. Always have one size smaller and larger available.
          </p>
        </div>
      </div>

      {/* RSI checklist */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-800">Rapid Sequence Induction Checklist</h3>
        </div>
        <div className="p-5 space-y-6">
          {RSI_CHECKLIST.map(group => (
            <div key={group.title}>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{group.title}</h4>
              <Checklist items={group.items} storagePrefix={group.title} />
            </div>
          ))}
        </div>
      </div>

      {/* Extubation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-medical-accent" />
          <h3 className="font-bold text-slate-800">Extubation Criteria &amp; Strategy</h3>
        </div>
        <div className="p-5 space-y-5">
          <Checklist items={EXTUBATION_CRITERIA} storagePrefix="extubation" />
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <h4 className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-2">
              <AlertTriangle className="w-4 h-4" /> High-risk extubation
            </h4>
            <ul className="space-y-1.5">
              {HIGH_RISK_EXTUBATION.map((item, i) => (
                <li key={i} className="text-[11px] text-amber-900 flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Algorithm Note (retained) */}
      <div className="bg-orange-50 rounded-xl shadow-sm border border-orange-200 p-4 flex gap-3 items-start">
        <FileText className="w-5 h-5 text-orange-600 mt-0.5" />
        <div>
          <h3 className="font-bold text-orange-800 text-sm">Key Refresher</h3>
          <p className="text-xs text-orange-700 mt-1">
            1. Call for help immediately.<br />2. Maintain oxygenation (bag-mask ventilation).<br />
            3. Consider a supraglottic airway (SGA/LMA).<br />
            4. If CICO → emergency surgical airway (cricothyroidotomy).
          </p>
        </div>
      </div>
    </div>
  );
}
