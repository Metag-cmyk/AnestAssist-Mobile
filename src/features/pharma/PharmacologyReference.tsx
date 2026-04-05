import { useState, useMemo } from 'react';
import { Search, Info, Activity, ShieldCheck, Zap, Thermometer, TrendingUp, AlertTriangle, Scale, ShieldAlert, Heart, Wind, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePatient } from '../../contexts/PatientContext';

interface ClinicalDrug {
  id: string;
  name: string;
  class: 'Induction' | 'Muscle Relaxant' | 'Opioid' | 'Local Anesthetic' | 'Reversal / Antidote' | 'Anti-emetic' | 'Cardiovascular' | 'Other';
  dose: string;
  onset: string;
  duration: string;
  pearls: string;
}

const CLINICAL_DRUGS: ClinicalDrug[] = [
  // Induction
  { id: 'propofol-ref', name: 'Propofol', class: 'Induction', dose: '1.5-2.5 mg/kg IV', onset: '30-45 sec', duration: '5-10 min', pearls: 'May cause injection pain; profound vasodilation & apnea. 24h expiration for open vials.' },
  { id: 'etomidate-ref', name: 'Etomidate', class: 'Induction', dose: '0.2-0.3 mg/kg IV', onset: '30-60 sec', duration: '3-10 min', pearls: 'CV stable. Adrenocortical suppression even with single dose. High incidence of myoclonus.' },
  { id: 'thiopental-ref', name: 'Thiopental', class: 'Induction', dose: '3-5 mg/kg IV', onset: '30 sec', duration: '5-15 min', pearls: 'Gold standard for neuroprotection. Severe tissue necrosis if extravasated.' },
  { id: 'ketamine-ref', name: 'Ketamine', class: 'Induction', dose: '1.0-2.0 mg/kg IV', onset: '30-60 sec', duration: '10-20 min', pearls: 'Indirect sympathomimetic. Dissociation. Potent bronchodilator.' },
  
  // Muscle Relaxants
  { id: 'rocuronium-ref', name: 'Rocuronium', class: 'Muscle Relaxant', dose: '0.6-1.2 mg/kg IV', onset: '60-90 sec', duration: '30-60 min', pearls: 'Sugammadex-reversible. Duration increased in hepatic/renal failure.' },
  { id: 'succinylcholine-ref', name: 'Succinylcholine', class: 'Muscle Relaxant', dose: '1.0-1.5 mg/kg IV', onset: '30-60 sec', duration: '5-10 min', pearls: 'Depolarizing; fasiculations. Trigger for MH. Avoid in hyperkalemia/burns.' },
  { id: 'vecuronium-ref', name: 'Vecuronium', class: 'Muscle Relaxant', dose: '0.1 mg/kg IV', onset: '3-5 min', duration: '25-40 min', pearls: 'Requires reconstitution. Metabolite (3-desacetyl) has 50% activity.' },
  { id: 'cisatracurium-ref', name: 'Cisatracurium', class: 'Muscle Relaxant', dose: '0.15-0.2 mg/kg IV', onset: '3-5 min', duration: '40-60 min', pearls: 'Hofmann elimination (pH/Temp dependent). Safe in renal/liver failure.' },
  
  // Opioids
  { id: 'fentanyl-ref', name: 'Fentanyl', class: 'Opioid', dose: '1.0-5.0 mcg/kg IV', onset: '1-2 min', duration: '30-60 min', pearls: 'Potent; 100x morphine. Minimal histamine release. Chest wall rigidity in high doses.' },
  { id: 'remifentanil-ref', name: 'Remifentanil', class: 'Opioid', dose: '0.05-1.0 mcg/kg/min', onset: '1-3 min', duration: '3-5 min', pearls: 'Organ-independent metabolism by non-specific plasma esterases.' },
  { id: 'hydromorphone-ref', name: 'Hydromorphone', class: 'Opioid', dose: '0.2-1.0 mg IV', onset: '5-15 min', duration: '2-4 h', pearls: '7x morphine potency. Slower onset than fentanyl but longer duration.' },
  { id: 'morphine-ref', name: 'Morphine', class: 'Opioid', dose: '0.1 mg/kg IV', onset: '5-20 min', duration: '3-5 h', pearls: 'Histamine release (hypotension/itch). Active metabolite M6G accumulates in renal failure.' },
  
  // Reversal / Antidote
  { id: 'sugammadex-ref', name: 'Sugammadex', class: 'Reversal / Antidote', dose: '2-4 mg/kg IV', onset: '2-3 min', duration: 'N/A', pearls: 'Selective relaxant binding agent (Roc/Vec). Reduces BC effective for 7 days.' },
  { id: 'neostigmine-ref', name: 'Neostigmine', class: 'Reversal / Antidote', dose: '0.05 mg/kg IV', onset: '5-10 min', duration: '30-60 min', pearls: 'AChE inhibitor. Always give with glycopyrrolate/atropine to block muscarinic effects.' },
  { id: 'naloxone-ref', name: 'Naloxone', class: 'Reversal / Antidote', dose: '0.04-0.4 mg IV', onset: '1-2 min', duration: '30-60 min', pearls: 'Pure opioid antagonist. Short duration; watch for re-narcotization.' },
  { id: 'flumazenil-ref', name: 'Flumazenil', class: 'Reversal / Antidote', dose: '0.2-1.0 mg IV', onset: '1-2 min', duration: '30-60 min', pearls: 'Benzodiazepine antagonist. Risk of seizures in chronic BZD users.' },

  // Anti-emetic
  { id: 'ondansetron-ref', name: 'Ondansetron', class: 'Anti-emetic', dose: '4 mg IV', onset: '10-20 min', duration: '4-8 h', pearls: '5-HT3 antagonist. QTc prolongation possible in high doses.' },
  { id: 'dexamethasone-ref', name: 'Dexamethasone', class: 'Anti-emetic', dose: '4-8 mg IV', onset: '1-2 h', duration: '24-48 h', pearls: 'Glucocorticoid. Give at induction. Blocks PG synthesis in CNS.' },
  { id: 'cyclizine-ref', name: 'Cyclizine', class: 'Anti-emetic', dose: '50 mg IV', onset: '20 min', duration: '4-6 h', pearls: 'Anti-histaminergic/cholinergic. Effective for motion sickness/vestibular PONV.' }
];

interface ReceptorActivity {
  drug: string;
  a1: number;
  a2: number;
  b1: number;
  b2: number;
  v1?: number;
  d1?: number;
  action: string;
}

const RECEPTOR_CHART: ReceptorActivity[] = [
  { drug: 'Noradrenaline', a1: 4, a2: 2, b1: 3, b2: 1, action: 'Primary Sepsis/Shock vasopressor' },
  { drug: 'Adrenaline', a1: 4, a2: 2, b1: 4, b2: 3, action: 'Anaphylaxis / Post-bypass support' },
  { drug: 'Phenylephrine', a1: 4, a2: 0, b1: 0, b2: 0, action: 'Pure vasoconstrictor; reflex bradycardia' },
  { drug: 'Ephedrine', a1: 2, a2: 1, b1: 3, b2: 2, action: 'Indirect/Direct acting; Post-spinal hypotension' },
  { drug: 'Dopamine', a1: 2, a2: 1, b1: 4, b2: 2, d1: 4, action: 'Dose-dependent effects (D > B > A)' },
  { drug: 'Dobutamine', a1: 1, a2: 0, b1: 4, b2: 3, action: 'Primary inotrope; pure Beta-1/2' },
  { drug: 'Milrinone', a1: 0, a2: 0, b1: 0, b2: 0, action: 'PDE-3 Inhibitor; Inodilator (Non-adrenergic)' },
  { drug: 'Vasopressin', a1: 0, a2: 0, b1: 0, b2: 0, v1: 4, action: 'V1 agonist; Acidosis resistant pressor' }
];

interface AnticoagDrug {
  id: string;
  name: string;
  class: string;
  holdTime: string;
  restartTime: string;
  lab: string;
  pearls: string;
}

const ANTICOAG_DATA: AnticoagDrug[] = [
  { id: 'warfarin-ac', name: 'Warfarin', class: 'Vitamin K Antagonist', holdTime: '5 Days', restartTime: '12-24h after', lab: 'INR < 1.5', pearls: 'Check INR day of surgery. Bridge with LMWH if high VTE risk.' },
  { id: 'heparin-sc-ac', name: 'Heparin (SC)', class: 'Unfractionated Heparin', holdTime: '4-6h', restartTime: '1h after', lab: 'aPTT (if high dose)', pearls: 'Standard VTE prophylaxis (5000 U bid/tid). Low neuraxial risk.' },
  { id: 'heparin-iv-ac', name: 'Heparin (IV)', class: 'Unfractionated Heparin', holdTime: '4-6h', restartTime: '1h after', lab: 'aPTT (Target < 1.5x)', pearls: 'Verify normal aPTT before neuraxial puncture or catheter removal.' },
  { id: 'enoxaparin-proph-ac', name: 'Enoxaparin (Proph)', class: 'LMWH', holdTime: '12h', restartTime: '12h after', lab: 'Anti-Xa (rarely)', pearls: 'Prophylactic dose (e.g. 40mg daily). Safe for neuraxial at 12h.' },
  { id: 'enoxaparin-therap-ac', name: 'Enoxaparin (Therap)', class: 'LMWH', holdTime: '24h', restartTime: '24h after', lab: 'Anti-Xa (if renal fail)', pearls: 'Therapeutic dose (1mg/kg bid). 24h hold essential for neuraxial.' },
  { id: 'rivaroxaban-ac', name: 'Rivaroxaban', class: 'Direct Xa Inhibitor', holdTime: '72h', restartTime: '6h after', lab: 'Xa (drug specific)', pearls: 'Assuming normal renal function. Hold 72h for high-risk neuraxial.' },
  { id: 'apixaban-ac', name: 'Apixaban', class: 'Direct Xa Inhibitor', holdTime: '72h', restartTime: '6h after', lab: 'Xa (drug specific)', pearls: '72h hold for neuraxial. 48h for low-risk peripheral blocks.' },
  { id: 'dabigatran-ac', name: 'Dabigatran', class: 'Direct Thrombin Inhibitor', holdTime: '72-96h', restartTime: '6h after', lab: 'dTT / ECT', pearls: 'Highly renal dependent. 96h hold if CrCl < 50 ml/min.' },
  { id: 'clopidogrel-ac', name: 'Clopidogrel', class: 'P2Y12 Inhibitor', holdTime: '5-7 Days', restartTime: '24h after', lab: 'Verify Platelets', pearls: 'Avoid neuraxial if held < 5 days. Consider platelet function if urgent.' },
  { id: 'aspirin-ac', name: 'Aspirin', class: 'Antiplatelet', holdTime: 'No Hold', restartTime: 'Immediate', lab: 'N/A', pearls: 'Mono-therapy safe for neuraxial. Caution if combined with other agents.' }
];

export default function PharmacologyReference() {
  const { patient, ibw } = usePatient();
  const [search, setSearch] = useState('');
  const [acSearch, setAcSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const weight = patient.weightKg ? (patient.useIBW ? ibw : Number(patient.weightKg)) : 70;
  const age = Number(patient.age) || 40;
  const isPediatric = age < 16;

  const calculateMAC = (base40: number) => {
    return base40 * Math.pow(10, -0.00269 * (age - 40));
  };

  const macData = [
    { name: 'Sevoflurane', base: 1.8, color: 'text-amber-500' },
    { name: 'Desflurane', base: 6.0, color: 'text-blue-500' },
    { name: 'Isoflurane', base: 1.15, color: 'text-purple-500' },
  ];

  const filteredDrugs = useMemo(() => {
    return CLINICAL_DRUGS.filter(d => {
      const matchCat = activeCategory === 'All' || d.class === activeCategory;
      const matchSearch = search === '' || 
        d.name.toLowerCase().includes(search.toLowerCase()) || 
        d.class.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const categories = ['All', ...new Set(CLINICAL_DRUGS.map(d => d.class))];

  return (
    <div className="space-y-12">
      {/* 1. Clinical Drug Database */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
              <Search className="w-5 h-5 text-medical-primary" />
              Clinical Drug Reference
            </h3>
            <p className="text-sm text-slate-500 font-medium">Search induction agents, relaxants, and adjuncts</p>
          </div>
          
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search drugs or class..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border-2 border-slate-100 rounded-xl outline-none focus:border-medical-primary transition-all text-sm font-bold"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border-2 ${
                activeCategory === cat
                  ? 'bg-medical-primary border-medical-primary text-white shadow-lg shadow-medical-primary/20'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredDrugs.map(drug => (
              <motion.div
                key={drug.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-medical-primary/5 transition-all"></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-medical-primary mb-1 block">
                      {drug.class}
                    </span>
                    <h4 className="font-black text-slate-800 text-lg uppercase leading-tight">{drug.name}</h4>
                  </div>
                  <div className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-600">{drug.dose}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                  <div className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Onset
                    </p>
                    <p className="text-xs font-black text-slate-700">{drug.onset}</p>
                  </div>
                  <div className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                      <Thermometer className="w-3 h-3" /> Duration
                    </p>
                    <p className="text-xs font-black text-slate-700">{drug.duration}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 relative z-10">
                  <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] font-bold text-indigo-900 leading-relaxed italic">{drug.pearls}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 2. Adrenergic Receptor Activity Chart */}
      <section className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
                <TrendingUp className="w-5 h-5 text-medical-accent" />
                Adrenergic Receptor Fingerprint
              </h3>
              <p className="text-slate-400 text-sm font-medium">Hemodynamic receptor activity comparison</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-medical-accent"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Strong Agonism</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Vaso / Inotrope</th>
                  <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">α1</th>
                  <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">α2</th>
                  <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">β1</th>
                  <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">β2</th>
                  <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Other</th>
                  <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest pl-6">Clinical Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {RECEPTOR_CHART.map(r => (
                  <tr key={r.drug} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 font-black tracking-tight pl-2">{r.drug}</td>
                    <td className="py-4 text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-3 rounded-full transition-all ${i < r.a1 ? 'bg-medical-accent' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-3 rounded-full transition-all ${i < r.a2 ? 'bg-indigo-400' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-3 rounded-full transition-all ${i < r.b1 ? 'bg-rose-500' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-3 rounded-full transition-all ${i < r.b2 ? 'bg-emerald-400' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      {r.v1 && <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">V1 ++++</span>}
                      {r.d1 && <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-2 py-1 rounded">D ++++</span>}
                      {!r.v1 && !r.d1 && <span className="text-slate-700">──</span>}
                    </td>
                    <td className="py-4 pl-6">
                      <p className="text-[11px] font-medium text-slate-400 max-w-[240px] group-hover:text-slate-200 transition-colors">
                        {r.action}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="text-[10px] font-black text-rose-400 uppercase mb-2">Alpha-1 Range</div>
              <p className="text-[11px] leading-relaxed text-slate-400">Vasoconstriction, increased SVR, potential reflex bradycardia. Key drug: Noradrenaline (High dose).</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="text-[10px] font-black text-emerald-400 uppercase mb-2">Beta Range</div>
              <p className="text-[11px] leading-relaxed text-slate-400">Increased heart rate (Chronotropy) and contractility (Inotropy). Key drug: Dobutamine.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="text-[10px] font-black text-indigo-400 uppercase mb-2">V1 / Acidosis</div>
              <p className="text-[11px] leading-relaxed text-slate-400">Vasoconstriction via V1 receptors. Remains effective in septic acidosis where Catecholamines fail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TCI Quick Reference */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight mb-6">
          <ShieldCheck className="w-5 h-5 text-sky-500" />
          TCI PK/PD Model Reference
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2 border-l-4 border-medical-primary">Propofol Models</h4>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-black text-slate-800">Marsh</p>
                  <p className="text-[10px] font-bold text-slate-400">Weight-based only</p>
                </div>
                <p className="text-xs text-slate-500 leading-normal font-medium">Standard model. High initial bolus; tends to overestimate CP in the elderly. Preferred for simpler pediatric dosing in some softwares.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-black text-slate-800">Schnider</p>
                  <p className="text-[10px] font-bold text-slate-400">Age, Weight, Ht, LBM</p>
                </div>
                <p className="text-xs text-slate-500 leading-normal font-medium">Age-adjusted. Lower induction dose, faster awakening prediction. Higher Ke0 (offset) accuracy. Not suitable for children.</p>
              </div>
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-black text-indigo-900">Eleveld (2018)</p>
                  <div className="px-2 py-0.5 bg-indigo-600 rounded text-[9px] font-black text-white uppercase">GOLD STANDARD</div>
                </div>
                <p className="text-xs text-indigo-800 leading-normal font-medium">All-age model (Neonates to Elderly). Covers obese/thin. Excellent accuracy across all hemodynamics. Preferred for total TIVA cases.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2 border-l-4 border-rose-500">Remifentanil / Opioid</h4>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-black text-slate-800">Minto</p>
                  <p className="text-[10px] font-bold text-slate-400">LBM Adjusted</p>
                </div>
                <p className="text-xs text-slate-500 leading-normal font-medium">Standard for Adults. Adjusts strictly for Lean Body Mass. Excellent correlation between Ce and pain/respiratory suppression.</p>
              </div>
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-black text-rose-900">Eleveld Remi</p>
                  <p className="text-[10px] font-bold text-rose-400 uppercase">Recent Update</p>
                </div>
                <p className="text-xs text-rose-800 leading-normal font-medium">Follows same logic as Eleveld Propofol. Better accuracy in the extremes of age and BMI. Predicted to replace Minto in newer pump software.</p>
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-amber-900 mb-1 leading-tight uppercase">TCI Safety Note</p>
                  <p className="text-[10px] text-amber-800 leading-relaxed font-medium italic">
                    TCI is a model, not a measurement. Effect site (Ce) delay must be accounted for (1.5-3.0 mins for Propofol). Always titrate to clinical effect (BIS/MAC/Movement).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ASRA LAST Crisis Algorithm */}
      <section className="bg-rose-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-rose-900/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 transition-all"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-6 h-6 text-rose-200 animate-pulse" />
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">Emergency Protocol</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">ASRA LAST Crisis Algorithm</h3>
              <p className="text-rose-100 text-sm font-medium">Local Anesthetic Systemic Toxicity Management</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-[10px] font-black text-rose-200 uppercase tracking-widest mb-1">Lipid Rescue 20%</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black">{Math.round(weight * 1.5)}</span>
                <span className="text-lg font-bold text-rose-200">mL Bolus</span>
              </div>
              <p className="text-[10px] font-bold text-rose-200 mt-1">Lean Body Mass: {Math.round(weight)} kg</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-black text-rose-200 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4" /> 1. Initial Actions
              </h4>
              <ul className="space-y-2">
                {[
                  'STOP injecting LA immediately',
                  'Call for Help / Code / Lipid Kit',
                  'Secure Airway (100% Oxygen)',
                  'Avoid Hyperventilation / Acidosis',
                  'Verify IV access'
                ].map(item => (
                  <li key={item} className="flex gap-2 text-xs font-bold items-start group">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-300 mt-1.5 group-hover:bg-white transition-all" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-rose-200 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" /> 2. Lipid Emulsion
              </h4>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <p className="text-[10px] font-black text-rose-200 uppercase mb-1">Bolus (1.5 mL/kg)</p>
                  <p className="text-lg font-black">{Math.round(weight * 1.5)} mL over 1 minute</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <p className="text-[10px] font-black text-rose-200 uppercase mb-1">Infusion (0.25 mL/kg/min)</p>
                  <p className="text-lg font-black">{Math.round(weight * 0.25)} mL/min</p>
                </div>
                <p className="text-[10px] font-bold italic text-rose-100 opacity-60">Repeat bolus once if CV collapse persists. Max total: 12 mL/kg.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-rose-200 uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> 3. Critical DONTs
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'NO Vasopressin (increases mortality)',
                  'NO Propofol (CV depressant)',
                  'NO Local Anesthetics',
                  'NO Calcium Channel Blockers',
                  'Limit Adrenaline to < 1mcg/kg'
                ].map(item => (
                  <div key={item} className="px-3 py-2 bg-black/20 rounded-lg text-[11px] font-black border-l-4 border-rose-400">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Age-Adjusted MAC Reference */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
              <Wind className="w-5 h-5 text-sky-500" />
              Age-Adjusted MAC Reference
            </h3>
            <p className="text-sm text-slate-500 font-medium tracking-tight">Vapor titration guide for <span className="text-medical-primary font-black">{age}y</span> patient (Mapleson Formula)</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Depth</p>
              <p className="text-lg font-black text-slate-800">1.3 MAC</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {macData.map(agent => {
            const mac10 = calculateMAC(agent.base);
            const mac13 = mac10 * 1.3;
            const macAware = mac10 * 0.4;

            return (
              <div key={agent.name} className="relative group space-y-4">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 group-hover:border-medical-primary/30 transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className={`text-sm font-black uppercase tracking-widest ${agent.color}`}>{agent.name}</h4>
                    <span className="text-[10px] font-black text-slate-300">Base: {agent.base}%</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">MAC 1.0 <span className="block text-[8px] italic">(Movement 50%)</span></p>
                      <p className="text-2xl font-black text-slate-800 tabular-nums">{mac10.toFixed(2)}%</p>
                    </div>
                    <div className="flex justify-between items-end p-3 bg-white rounded-xl border border-slate-100 shadow-sm ring-2 ring-medical-primary/5">
                      <p className="text-[10px] font-black text-medical-primary uppercase">MAC 1.3 <span className="block text-[8px] italic font-bold">(Surgical Depth)</span></p>
                      <p className="text-2xl font-black text-medical-primary tabular-nums">{mac13.toFixed(2)}%</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">MAC Awake <span className="block text-[8px] italic">(Awareness 50%)</span></p>
                      <p className="text-sm font-black text-slate-600 tabular-nums">{macAware.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
            MAC values decrease by approximately **6% per decade** after age 40. These calculated targets serve as a baseline guide. Individual requirements vary significantly with intravenous adjuncts (Propofol, Remifentanil, Midazolam).
          </p>
        </div>
      </section>

      {/* 6. Pediatric Quick-Code & ACLS */}
      <section className={`bg-medical-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-medical-primary/20 ${!isPediatric ? 'opacity-60 grayscale hover:grayscale-0 transition-all' : ''}`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center">
                <Heart className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Pediatric Quick-Code</h3>
                <p className="text-blue-100 text-sm font-medium">Emergency ACLS & Equipment Guide (<span className="font-black text-white">{weight} kg</span>)</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Defib Joules (4 J/kg)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">{Math.round(weight * 4)}</span>
                  <span className="text-lg font-bold text-blue-200">J</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Equipment */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/20 space-y-4">
              <h4 className="text-xs font-black text-blue-200 uppercase tracking-widest flex items-center gap-2">
                <Scale className="w-4 h-4" /> Airway Equipment
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-[10px] font-bold text-blue-100 uppercase">ETT (Uncuffed)</span>
                  <span className="text-sm font-black">{(age / 4 + 4).toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-[10px] font-bold text-blue-100 uppercase">ETT (Cuffed)</span>
                  <span className="text-sm font-black">{(age / 4 + 3.5).toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-[10px] font-bold text-blue-100 uppercase">Blade Size</span>
                  <span className="text-sm font-black">{age < 2 ? 'Miller 1' : age < 8 ? 'Miller 2' : 'Mac 3'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-blue-100 uppercase">Suction Catheter</span>
                  <span className="text-sm font-black">{Math.round((age / 4 + 4) * 2)} Fr</span>
                </div>
              </div>
            </div>

            {/* Emergency Meds 1 */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/20 space-y-4">
              <h4 className="text-xs font-black text-blue-200 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4" /> Resuscitation
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                  <span className="text-[9px] font-black text-rose-300 uppercase leading-tight">Adrenaline<br/>(10 mcg/kg)</span>
                  <span className="text-sm font-black">{(weight * 0.01).toFixed(2)} mg</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                  <span className="text-[9px] font-black text-blue-200 uppercase">Atropine (0.02 mg/kg)</span>
                  <span className="text-sm font-black">{(weight * 0.02).toFixed(2)} mg</span>
                </div>
              </div>
            </div>

            {/* Fluid & Misc */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/20 space-y-4">
              <h4 className="text-xs font-black text-blue-200 uppercase tracking-widest flex items-center gap-2">
                <Timer className="w-4 h-4" /> Circulation
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-[10px] font-bold text-blue-100 uppercase">Fluid Bolus (20ml/kg)</span>
                  <span className="text-sm font-black">{Math.round(weight * 20)} mL</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-[10px] font-bold text-blue-100 uppercase">Amiodarone (5mg/kg)</span>
                  <span className="text-sm font-black">{Math.round(weight * 5)} mg</span>
                </div>
              </div>
            </div>

            {/* ACLS Rhythm Guide */}
            <div className="bg-slate-900/40 rounded-2xl p-5 border border-white/10 space-y-4">
              <h4 className="text-xs font-black text-blue-200 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> ACLS Quick Steps
              </h4>
              <div className="grid grid-cols-1 gap-2">
                <div className="text-[9px] font-bold bg-emerald-500/20 text-emerald-100 p-2 rounded-lg border border-emerald-500/20">
                  DEFIB: 2 J/kg initial, then 4 J/kg
                </div>
                <div className="text-[9px] font-bold bg-amber-500/20 text-amber-100 p-2 rounded-lg border border-amber-500/20">
                  ADRENALINE: Every 3-5 mins
                </div>
                <div className="text-[9px] font-bold bg-rose-500/20 text-rose-100 p-2 rounded-lg border border-rose-500/20">
                  H's & T's: Hypoxia, Hypovolemia...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ASRA Anticoagulation & Neuraxial Reference */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
              <Activity className="w-5 h-5 text-indigo-500" />
              ASRA Anticoagulation Reference
            </h3>
            <p className="text-sm text-slate-500 font-medium tracking-tight">Standard hold-times for <span className="font-black text-medical-primary uppercase">Deep Block / Neuraxial</span> access</p>
          </div>
          
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anticoagulants..."
              value={acSearch}
              onChange={(e) => setAcSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border-2 border-slate-50 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm font-bold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="pb-4 pl-2">Medicament</th>
                <th className="pb-4">Hold Before</th>
                <th className="pb-4">Restart Time</th>
                <th className="pb-4">Lab / Goal</th>
                <th className="pb-4 pr-2">Clinical Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ANTICOAG_DATA.filter(d => 
                d.name.toLowerCase().includes(acSearch.toLowerCase()) || 
                d.class.toLowerCase().includes(acSearch.toLowerCase())
              ).map(drug => (
                <tr key={drug.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 pl-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-medical-primary uppercase leading-tight">{drug.class}</span>
                      <span className="font-black text-slate-800 uppercase tracking-tight">{drug.name}</span>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-100 inline-flex flex-col items-center">
                      <span className="text-[9px] font-black uppercase opacity-60">HOLD MIN</span>
                      <span className="text-xs font-black">{drug.holdTime}</span>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-100 inline-flex flex-col items-center">
                      <span className="text-[9px] font-black uppercase opacity-60">RESTART</span>
                      <span className="text-xs font-black">{drug.restartTime}</span>
                    </div>
                  </td>
                  <td className="py-5">
                    <p className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded inline-block">{drug.lab}</p>
                  </td>
                  <td className="py-5 pr-2">
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-xs">{drug.pearls}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-amber-900 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium leading-relaxed">
            Standard guidelines for **Neuraxial Access (Spinal/Epidural)** and deep blocks. For patients with **Renal Failure**, hold times for LMWH (Enoxaparin) and DOACs (Rivaroxaban/Apixaban) must be increased significantly. Bridging must always be coordinated with Cardiology/Surgery.
          </p>
        </div>
      </section>
    </div>
  );
}
