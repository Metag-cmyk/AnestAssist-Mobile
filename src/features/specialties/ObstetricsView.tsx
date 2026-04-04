import { useState } from 'react';
import { Baby, Activity, AlertTriangle, ShieldAlert } from 'lucide-react';
import { usePatient } from '../../contexts/PatientContext';

export default function ObstetricsView() {
  const { patient } = usePatient();
  const [apgarScores, setApgarScores] = useState({
    appearance: 0,
    pulse: 0,
    grimace: 0,
    activity: 0,
    respiration: 0
  });

  const apgarTotal = Object.values(apgarScores).reduce((a, b) => a + b, 0);

  const handleApgarChange = (category: keyof typeof apgarScores, value: number) => {
    setApgarScores(prev => ({ ...prev, [category]: value }));
  };

  const getDosingGuidance = () => {
    const height = patient.heightCm || 165;
    
    // Simple clinical heuristic for hyperbaric bupivacaine 0.5% in C-Section
    // Base dose around 10-12mg depending on height (150cm = 10mg, 170cm = 12mg)
    let spinalBupi = 10;
    if (height < 155) spinalBupi = 10;
    else if (height < 165) spinalBupi = 11;
    else if (height < 175) spinalBupi = 12;
    else spinalBupi = 13;

    let epiduralVolume = "15-20 mL in fractionated doses (e.g., 5mL every 3 mins)";

    return { spinalBupi, epiduralVolume };
  };

  const dosage = getDosingGuidance();

  return (
    <div className="space-y-6">
      
      {/* Neuraxial Dosing Card */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
        <div className="bg-rose-50 border-b border-rose-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-rose-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-600" />
              C-Section Neuraxial Dosing
            </h3>
            <p className="text-sm text-rose-700 mt-1">Height-adjusted guidance (Patient Height: {patient.heightCm ? `${patient.heightCm} cm` : 'Not Set'})</p>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Spinal (SAB) Target</h4>
            <p className="text-2xl font-black text-rose-600">{dosage.spinalBupi} mg <span className="text-sm text-slate-500 font-bold">Hyperbaric Bupivacaine 0.5%</span></p>
            <p className="text-xs text-slate-500 mt-2 font-medium">+ Fentanyl 10-15 mcg & Morphine 100 mcg</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Epidural Extension</h4>
            <p className="text-xl font-bold text-slate-800">{dosage.epiduralVolume}</p>
            <p className="text-xs text-slate-500 mt-2 font-medium">Lidocaine 2% + Epi 1:200k or Chloroprocaine 3%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* APGAR Calculator */}
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-sky-50 border-b border-sky-100 p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-sky-900 flex items-center gap-2">
                <Baby className="w-5 h-5 text-sky-600" />
                APGAR Calculator
              </h3>
            </div>
            <div className="text-right bg-white px-4 py-2 rounded-xl shadow-sm border border-sky-100">
              <p className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Total Score</p>
              <p className={`text-3xl font-black ${apgarTotal >= 7 ? 'text-emerald-500' : apgarTotal >= 4 ? 'text-amber-500' : 'text-rose-500'}`}>
                {apgarTotal} <span className="text-sm font-bold text-slate-400">/ 10</span>
              </p>
            </div>
          </div>
          <div className="p-6 space-y-4 flex-1">
            {[
              { id: 'appearance', label: 'Appearance (Color)', opts: ['Blue/Pale', 'Acrocyanosis', 'Completely Pink'] },
              { id: 'pulse', label: 'Pulse (Heart Rate)', opts: ['Absent', '< 100 bpm', '> 100 bpm'] },
              { id: 'grimace', label: 'Grimace (Reflex Irritability)', opts: ['No Response', 'Grimace', 'Cry/Active Withdrawal'] },
              { id: 'activity', label: 'Activity (Muscle Tone)', opts: ['Limp', 'Some Flexion', 'Active Motion'] },
              { id: 'respiration', label: 'Respiration', opts: ['Absent', 'Weak Cry / Hypoventilation', 'Good / Strong Cry'] }
            ].map((cat) => (
              <div key={cat.id}>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">{cat.label}</p>
                <div className="flex gap-2">
                  {[0, 1, 2].map((pt) => (
                    <button
                      key={pt}
                      onClick={() => handleApgarChange(cat.id as any, pt)}
                      className={`flex-1 py-2 px-1 text-xs font-bold rounded-lg transition-all border ${
                        apgarScores[cat.id as keyof typeof apgarScores] === pt
                          ? 'bg-sky-500 border-sky-600 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-sky-300'
                      }`}
                    >
                      {pt} pt: {cat.opts[pt]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PPH Protocol */}
        <div className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-amber-50 border-b border-amber-100 p-6">
            <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              Postpartum Hemorrhage (PPH)
            </h3>
            <p className="text-sm text-amber-700 mt-1">Uterotonic Algorithm & Management</p>
          </div>
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border-l-4 border-emerald-400 rounded-lg">
                <p className="font-bold text-slate-800 text-sm">1. Oxytocin (Pitocin)</p>
                <p className="text-xs text-slate-600 mt-1"><span className="font-bold">Dose:</span> 3 units IV push slowly, followed by 10-40 units in 500-1000 mL infusion.</p>
                <p className="text-[10px] text-slate-500 mt-1 bg-white inline-block px-1 rounded">Rule of 3s: 3U every 3 mins (up to 3 doses)</p>
              </div>
              <div className="p-3 bg-slate-50 border-l-4 border-amber-400 rounded-lg">
                <p className="font-bold text-slate-800 text-sm">2. Methylergonovine (Methergine)</p>
                <p className="text-xs text-slate-600 mt-1"><span className="font-bold">Dose:</span> 0.2 mg IM (Never IV)</p>
                <p className="text-[10px] text-rose-500 font-bold mt-1 bg-rose-50 inline-block px-1 rounded">CONTRAINDICATED in Hypertension / Preeclampsia</p>
              </div>
              <div className="p-3 bg-slate-50 border-l-4 border-blue-400 rounded-lg">
                <p className="font-bold text-slate-800 text-sm">3. Carboprost (Hemabate)</p>
                <p className="text-xs text-slate-600 mt-1"><span className="font-bold">Dose:</span> 250 mcg IM or intramyometrial</p>
                <p className="text-[10px] text-rose-500 font-bold mt-1 bg-rose-50 inline-block px-1 rounded">CONTRAINDICATED in Asthma (bronchospasm risk)</p>
              </div>
              <div className="p-3 bg-slate-50 border-l-4 border-purple-400 rounded-lg">
                <p className="font-bold text-slate-800 text-sm">4. Misoprostol (Cytotec)</p>
                <p className="text-xs text-slate-600 mt-1"><span className="font-bold">Dose:</span> 800 - 1000 mcg sublingual or per rectum</p>
              </div>
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg mt-4">
                <p className="font-bold text-red-800 text-sm flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-red-600"/> TXA & Blood Products</p>
                <p className="text-xs text-red-700 mt-1">Administer Tranexamic Acid (TXA) 1g IV over 10 mins early.<br/>Activate Massive Transfusion Protocol (MTP) if bleeding continues.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
