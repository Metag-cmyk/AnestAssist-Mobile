import { useMemo, useState } from 'react';
import type { ElementType, ReactNode } from 'react';
import {
  ClipboardCheck, HeartPulse, Wind, Moon, Activity, AlertTriangle,
  ShieldCheck, Info, RefreshCw, Stethoscope, Syringe,
} from 'lucide-react';
import { usePatient } from '../../contexts/PatientContext';
import { PatientParameterCard } from '../../components/PatientParameterCard';
import {
  ASA_OPTIONS, METS_OPTIONS, RCRI_FACTORS, STOP_BANG_FACTORS, APFEL_FACTORS,
  rcri, ariscat, stopBang, apfel, airwayRisk,
  type RcriInput, type AriscatInput, type StopBangInput, type ApfelInput, type AirwayInput,
  type RiskBand,
} from '../../lib/preopScores';

const BAND_STYLE: Record<RiskBand, string> = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-rose-100 text-rose-700 border-rose-200',
};

function CheckRow({ checked, label, onChange }: { checked: boolean; label: string; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors cursor-pointer">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="mt-0.5 w-4 h-4 accent-indigo-600" />
      <span className="text-xs font-medium text-slate-700 leading-snug">{label}</span>
    </label>
  );
}

function SectionCard({ icon: Icon, title, children }: { icon: ElementType; title: string; children: ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <Icon className="w-4 h-4 text-indigo-600" />
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export default function PreopAssessment() {
  const patient = usePatient();
  const bmi = patient.heightNum > 0 ? patient.weightNum / Math.pow(patient.heightNum / 100, 2) : 0;

  const [asa, setAsa] = useState(2);
  const [mets, setMets] = useState<'poor' | 'moderate' | 'good'>('moderate');
  const [rcriInput, setRcriInput] = useState<RcriInput>({
    highRiskSurgery: false, ischemicHeartDisease: false, heartFailure: false,
    cerebrovascularDisease: false, insulinDiabetes: false, creatinineOver2: false,
  });
  const [ariscatInput, setAriscatInput] = useState<AriscatInput>({
    age: Math.round(patient.ageNum) || 50,
    spo2: 98,
    respiratoryInfection: false,
    anemia: false,
    incision: 'peripheral',
    duration: 'lt2',
    emergency: false,
  });
  const [stopBangInput, setStopBangInput] = useState<StopBangInput>({
    snoring: false, tiredness: false, observedApnea: false, pressure: false,
    bmiOver35: bmi > 35, ageOver50: patient.ageNum > 50, neckOver40: false, male: patient.gender === 'male',
  });
  const [apfelInput, setApfelInput] = useState<ApfelInput>({
    female: patient.gender === 'female', nonSmoker: false, historyPonv: false, postopOpioids: false,
  });
  const [airwayInput, setAirwayInput] = useState<AirwayInput>({
    mallampati: 1, thyromental: 'gt6.5', mouthOpening: 'gt4', neckMobility: 'normal', priorDifficulty: false,
  });
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => ({
    rcri: rcri(rcriInput),
    ariscat: ariscat(ariscatInput),
    stopBang: stopBang(stopBangInput),
    apfel: apfel(apfelInput),
    airway: airwayRisk(airwayInput),
  }), [rcriInput, ariscatInput, stopBangInput, apfelInput, airwayInput]);

  const flags = useMemo(() => {
    const list: { tone: RiskBand; text: string }[] = [];
    if (asa >= 3) list.push({ tone: 'high', text: `ASA ${asa} — severe systemic disease; senior anaesthetist and HDU/ICU planning advised.` });
    if (mets === 'poor') list.push({ tone: 'high', text: 'Poor functional capacity (<4 METs) — consider CPET and multidisciplinary optimisation.' });
    if (results.rcri.band !== 'low') list.push({ tone: results.rcri.band, text: `Cardiac (RCRI ${results.rcri.score}): ${results.rcri.interpretation}` });
    if (results.ariscat.band !== 'low') list.push({ tone: results.ariscat.band, text: `Pulmonary (ARISCAT ${results.ariscat.score}): ${results.ariscat.interpretation}` });
    if (results.stopBang.band !== 'low') list.push({ tone: results.stopBang.band, text: `OSA (STOP-BANG ${results.stopBang.score}): ${results.stopBang.interpretation}` });
    if (results.airway.band !== 'low') list.push({ tone: results.airway.band, text: `Airway: ${results.airway.interpretation}` });
    if (results.apfel.score >= 2) list.push({ tone: results.apfel.band, text: `PONV (Apfel ${results.apfel.score}): ${results.apfel.interpretation}` });
    if (list.length === 0) list.push({ tone: 'low', text: 'No major risk flags identified. Proceed with standard preoperative preparation.' });
    return list;
  }, [asa, mets, results]);

  const copySummary = () => {
    const lines = [
      'AnestAssist pre-operative assessment',
      `Patient: ${patient.weightNum} kg, ${patient.heightNum} cm, ${patient.ageNum} y, ${patient.gender}` + (bmi > 0 ? ` (BMI ${bmi.toFixed(1)})` : ''),
      `ASA: ${asa}   Functional capacity: ${METS_OPTIONS.find(m => m.value === mets)?.label}`,
      `RCRI: ${results.rcri.score} (${results.rcri.band})`,
      `ARISCAT: ${results.ariscat.score} (${results.ariscat.band})`,
      `STOP-BANG: ${results.stopBang.score} (${results.stopBang.band})`,
      `Airway risk: ${results.airway.score} (${results.airway.band})`,
      `Apfel PONV: ${results.apfel.score} (~${results.apfel.riskPercent}%)`,
      '',
      'Flags:',
      ...flags.map(f => ` - ${f.text}`),
    ];
    navigator.clipboard?.writeText(lines.join('\n')).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const BandChip = ({ band, label }: { band: RiskBand; label: string }) => (
    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${BAND_STYLE[band]}`}>{label}</span>
  );

  return (
    <div className="space-y-6">
      <PatientParameterCard />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <SectionCard icon={ClipboardCheck} title="ASA Physical Status & Functional Capacity">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ASA Physical Status</label>
                <select value={asa} onChange={e => setAsa(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500">
                  {ASA_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Functional Capacity (METs)</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {METS_OPTIONS.map(o => (
                    <button key={o.value} onClick={() => setMets(o.value)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${mets === o.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-2"><Info className="w-3 h-3 inline mr-1" />{METS_OPTIONS.find(m => m.value === mets)?.note}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={HeartPulse} title="Cardiac Risk — RCRI (Lee's Index)">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RCRI_FACTORS.map(f => (
                <CheckRow key={f.id} label={f.label} checked={rcriInput[f.id]}
                  onChange={v => setRcriInput(prev => ({ ...prev, [f.id]: v }))} />
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={Wind} title="Pulmonary Risk — ARISCAT">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Age (years)</label>
                <input type="number" value={ariscatInput.age} onChange={e => setAriscatInput(p => ({ ...p, age: Number(e.target.value) || 0 }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pre-op SpO₂ (%)</label>
                <input type="number" value={ariscatInput.spo2} onChange={e => setAriscatInput(p => ({ ...p, spo2: Number(e.target.value) || 0 }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Surgical Incision</label>
                <select value={ariscatInput.incision} onChange={e => setAriscatInput(p => ({ ...p, incision: e.target.value as AriscatInput['incision'] }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:border-indigo-500">
                  <option value="peripheral">Peripheral</option>
                  <option value="upper-abdominal">Upper abdominal</option>
                  <option value="intrathoracic">Intrathoracic</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Duration of Surgery</label>
                <select value={ariscatInput.duration} onChange={e => setAriscatInput(p => ({ ...p, duration: e.target.value as AriscatInput['duration'] }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:border-indigo-500">
                  <option value="lt2">&lt; 2 hours</option>
                  <option value="2to3">2 – 3 hours</option>
                  <option value="gt3">&gt; 3 hours</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <CheckRow label="Respiratory infection in the last month" checked={ariscatInput.respiratoryInfection} onChange={v => setAriscatInput(p => ({ ...p, respiratoryInfection: v }))} />
              <CheckRow label="Preoperative anaemia (Hb ≤ 10 g/dL)" checked={ariscatInput.anemia} onChange={v => setAriscatInput(p => ({ ...p, anemia: v }))} />
              <CheckRow label="Emergency procedure" checked={ariscatInput.emergency} onChange={v => setAriscatInput(p => ({ ...p, emergency: v }))} />
            </div>
          </SectionCard>

          <SectionCard icon={Moon} title="Obstructive Sleep Apnoea — STOP-BANG">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STOP_BANG_FACTORS.map(f => (
                <CheckRow key={f.id} label={f.label} checked={stopBangInput[f.id]}
                  onChange={v => setStopBangInput(prev => ({ ...prev, [f.id]: v }))} />
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={Stethoscope} title="Airway Assessment">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mallampati</label>
                <select value={airwayInput.mallampati} onChange={e => setAirwayInput(p => ({ ...p, mallampati: Number(e.target.value) as AirwayInput['mallampati'] }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs font-bold outline-none focus:border-indigo-500">
                  {[1, 2, 3, 4].map(c => <option key={c} value={c}>Class {c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Thyromental</label>
                <select value={airwayInput.thyromental} onChange={e => setAirwayInput(p => ({ ...p, thyromental: e.target.value as AirwayInput['thyromental'] }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs font-bold outline-none focus:border-indigo-500">
                  <option value="gt6.5">&gt; 6.5 cm</option>
                  <option value="6to6.5">6.0–6.5 cm</option>
                  <option value="lt6">&lt; 6.0 cm</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mouth opening</label>
                <select value={airwayInput.mouthOpening} onChange={e => setAirwayInput(p => ({ ...p, mouthOpening: e.target.value as AirwayInput['mouthOpening'] }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs font-bold outline-none focus:border-indigo-500">
                  <option value="gt4">&gt; 4 cm</option>
                  <option value="3to4">3–4 cm</option>
                  <option value="lt3">&lt; 3 cm</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Neck mobility</label>
                <select value={airwayInput.neckMobility} onChange={e => setAirwayInput(p => ({ ...p, neckMobility: e.target.value as AirwayInput['neckMobility'] }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs font-bold outline-none focus:border-indigo-500">
                  <option value="normal">Normal</option>
                  <option value="reduced">Reduced</option>
                  <option value="severe">Severe / collar</option>
                </select>
              </div>
            </div>
            <CheckRow label="Previous difficult intubation / airway" checked={airwayInput.priorDifficulty} onChange={v => setAirwayInput(p => ({ ...p, priorDifficulty: v }))} />
          </SectionCard>

          <SectionCard icon={Syringe} title="PONV — Apfel Score">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {APFEL_FACTORS.map(f => (
                <CheckRow key={f.id} label={f.label} checked={apfelInput[f.id]}
                  onChange={v => setApfelInput(prev => ({ ...prev, [f.id]: v }))} />
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-medical-primary text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                <ShieldCheck className="w-4 h-4 text-medical-accent" /> Pre-operative Risk Summary
              </div>
              <div className="space-y-3 text-sm">
                <Row label="ASA" value={`ASA ${asa}`} />
                <Row label="RCRI (cardiac)" value={`${results.rcri.score}`} chip={<BandChip band={results.rcri.band} label={results.rcri.band} />} />
                <Row label="ARISCAT (pulmonary)" value={`${results.ariscat.score}`} chip={<BandChip band={results.ariscat.band} label={results.ariscat.band} />} />
                <Row label="STOP-BANG (OSA)" value={`${results.stopBang.score}`} chip={<BandChip band={results.stopBang.band} label={results.stopBang.band} />} />
                <Row label="Airway" value={`${results.airway.score}`} chip={<BandChip band={results.airway.band} label={results.airway.band} />} />
                <Row label="Apfel (PONV)" value={`${results.apfel.score}`} chip={<span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">~{results.apfel.riskPercent}%</span>} />
                <Row label="Functional capacity" value={METS_OPTIONS.find(m => m.value === mets)?.label ?? '—'} />
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-2" aria-live="polite">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Flags &amp; Actions</p>
                {flags.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200 leading-snug">
                    <AlertTriangle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${f.tone === 'high' ? 'text-rose-400' : f.tone === 'intermediate' ? 'text-amber-400' : 'text-emerald-400'}`} />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <button onClick={copySummary}
                  className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors">
                  {copied ? 'Copied ✓' : 'Copy summary'}
                </button>
                <button
                  onClick={() => {
                    setAsa(2);
                    setMets('moderate');
                    setRcriInput({ highRiskSurgery: false, ischemicHeartDisease: false, heartFailure: false, cerebrovascularDisease: false, insulinDiabetes: false, creatinineOver2: false });
                    setAriscatInput({ age: Math.round(patient.ageNum) || 50, spo2: 98, respiratoryInfection: false, anemia: false, incision: 'peripheral', duration: 'lt2', emergency: false });
                    setStopBangInput({ snoring: false, tiredness: false, observedApnea: false, pressure: false, bmiOver35: bmi > 35, ageOver50: patient.ageNum > 50, neckOver40: false, male: patient.gender === 'male' });
                    setApfelInput({ female: patient.gender === 'female', nonSmoker: false, historyPonv: false, postopOpioids: false });
                    setAirwayInput({ mallampati: 1, thyromental: 'gt6.5', mouthOpening: 'gt4', neckMobility: 'normal', priorDifficulty: false });
                  }}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors"
                  aria-label="Reset assessment"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <Activity className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-[11px] text-amber-800 leading-relaxed">
                <strong>ASA fasting:</strong> clear fluids 2 h · breast milk 4 h · infant formula / light meal 6 h · fatty or fried meal 8 h.
                Scores complement, but never replace, clinical judgement and local protocol.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, chip }: { label: string; value: string; chip?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-400 text-xs font-medium">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-black text-white">{value}</span>
        {chip}
      </span>
    </div>
  );
}
