import { useState, useMemo } from 'react';
import { AlertTriangle, Zap, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { usePatient } from '../../contexts/PatientContext';

interface EmergencyDrug {
  id: string;
  name: string;
  category: 'Cardiac Arrest' | 'Airway / RSI' | 'Anaphylaxis' | 'Metabolic / Antidote' | 'Antiarrhythmic';
  doses: {
    label: string;
    formula: (kg: number) => number;
    unit: string;
    min?: number;
    max?: number;
    note?: string;
  }[];
  route: string;
  concentration?: string;
  caution?: string;
}

const EMERGENCY_DRUGS: EmergencyDrug[] = [
  // ── Cardiac Arrest ────────────────────────────────────────────────────
  {
    id: 'adrenaline-arrest',
    name: 'Adrenaline (Cardiac Arrest)',
    category: 'Cardiac Arrest',
    doses: [{ label: 'Arrest dose', formula: kg => kg * 0.01, unit: 'mg', max: 1, note: 'Repeat every 3-5 mins' }],
    route: 'IV / IO',
    concentration: '1 mg/mL (1:1000) or 0.1 mg/mL (1:10,000)',
    caution: 'Dilute 1:10 before IV push if using 1:1000'
  },
  {
    id: 'atropine',
    name: 'Atropine',
    category: 'Cardiac Arrest',
    doses: [
      { label: 'Bradycardia', formula: kg => Math.max(0.1, Math.min(kg * 0.02, 0.5)), unit: 'mg', note: 'Min 0.1mg to avoid paradoxical bradycardia' },
      { label: 'Max total dose', formula: _kg => 3, unit: 'mg' }
    ],
    route: 'IV / IO',
    concentration: '0.5 mg/mL or 1 mg/mL',
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone (Cardiac Arrest)',
    category: 'Cardiac Arrest',
    doses: [
      { label: '1st dose (VF/pVT)', formula: kg => Math.min(kg * 5, 300), unit: 'mg', max: 300 },
      { label: '2nd dose', formula: kg => Math.min(kg * 2.5, 150), unit: 'mg', max: 150 }
    ],
    route: 'IV / IO rapid push',
    concentration: '50 mg/mL (undiluted in arrest)',
    caution: 'Can cause hypotension if given slowly in non-arrest'
  },
  {
    id: 'bicarb',
    name: 'Sodium Bicarbonate',
    category: 'Cardiac Arrest',
    doses: [{ label: 'Standard dose', formula: kg => kg * 1, unit: 'mEq', note: 'Only if pH < 7.1 or prolonged arrest / TCA overdose' }],
    route: 'IV / IO',
    concentration: '8.4% = 1 mEq/mL',
    caution: 'Avoid routine use — can worsen intracellular acidosis'
  },

  // ── Airway / RSI ────────────────────────────────────────────────────
  {
    id: 'ketamine-rsi',
    name: 'Ketamine (RSI induction)',
    category: 'Airway / RSI',
    doses: [
      { label: 'Induction', formula: kg => kg * 1.5, unit: 'mg', note: 'Range 1–2 mg/kg IV' },
      { label: 'Analgesia only', formula: kg => kg * 0.3, unit: 'mg', note: 'Sub-dissociative 0.3 mg/kg' }
    ],
    route: 'IV',
    concentration: '10 mg/mL or 50 mg/mL (dilute for IV)',
    caution: 'Causes dissociation — preserve airway reflexes but watch BP in catecholamine-depleted patients'
  },
  {
    id: 'propofol-rsi',
    name: 'Propofol (Induction)',
    category: 'Airway / RSI',
    doses: [
      { label: 'Healthy adult', formula: kg => kg * 2, unit: 'mg', note: '1.5–2.5 mg/kg — titrate to effect' },
      { label: 'Elderly / haemodynamically compromised', formula: kg => kg * 1, unit: 'mg', note: 'Reduce dose 50%; use caution' }
    ],
    route: 'IV slow push',
    concentration: '10 mg/mL (1%)',
    caution: 'Significant vasodilation & myocardial depression — have vasopressor ready'
  },
  {
    id: 'rocuronium-rsi',
    name: 'Rocuronium (RSI)',
    category: 'Airway / RSI',
    doses: [
      { label: 'Standard RSI', formula: kg => kg * 1.2, unit: 'mg', note: 'For sugammadex-reversible RSI' },
      { label: 'Standard maintenance/intubation', formula: kg => kg * 0.6, unit: 'mg' }
    ],
    route: 'IV rapid push',
    concentration: '10 mg/mL',
    caution: 'Sugammadex 16 mg/kg for immediate reversal'
  },
  {
    id: 'succinylcholine',
    name: 'Succinylcholine (Suxamethonium)',
    category: 'Airway / RSI',
    doses: [
      { label: 'Adult RSI', formula: kg => kg * 1.5, unit: 'mg', max: 150 },
      { label: 'Paediatric (< 20 kg)', formula: kg => kg * 2, unit: 'mg', note: 'Higher dose required in children' }
    ],
    route: 'IV rapid push',
    concentration: '20 mg/mL or 50 mg/mL',
    caution: 'ABSOLUTE CONTRAINDICATION in hyperkalaemia, crush injuries (>72h), burns (>72h), myopathies, personal/family Hx of malignant hyperthermia'
  },
  {
    id: 'sugammadex',
    name: 'Sugammadex (Reversal)',
    category: 'Airway / RSI',
    doses: [
      { label: 'Moderate block (TOF 1-3)', formula: kg => kg * 2, unit: 'mg' },
      { label: 'Deep block (PTC 1-2)', formula: kg => kg * 4, unit: 'mg' },
      { label: 'Immediate rescue (post-Roc RSI)', formula: kg => kg * 16, unit: 'mg' }
    ],
    route: 'IV rapid push',
    concentration: '200 mg/2 mL (100 mg/mL)',
  },

  // ── Anaphylaxis ────────────────────────────────────────────────────
  {
    id: 'adrenaline-anaphylaxis',
    name: 'Adrenaline (Anaphylaxis)',
    category: 'Anaphylaxis',
    doses: [
      { label: 'IM (first-line)', formula: kg => Math.min(kg * 0.01, 0.5), unit: 'mg', max: 0.5, note: 'Anterolateral thigh — repeat every 5-15 mins' },
      { label: 'IV bolus (if arrested/severe)', formula: kg => Math.min(kg * 0.001, 0.05), unit: 'mg', max: 0.05, note: 'Slow push — 10-50 mcg titrated' }
    ],
    route: 'IM or IV',
    concentration: '1 mg/mL (1:1000) for IM; 0.1 mg/mL (1:10,000) for IV',
    caution: 'IM preferred first-line; IV only by trained clinicians with monitoring'
  },
  {
    id: 'hydrocortisone',
    name: 'Hydrocortisone',
    category: 'Anaphylaxis',
    doses: [
      { label: 'Standard dose', formula: kg => Math.min(kg * 4, 200), unit: 'mg', max: 200, note: 'Adjunct — not first-line; slow onset 4-6h' }
    ],
    route: 'IV / IM',
    concentration: '100 mg/vial (reconstitute)',
    caution: 'Does not replace adrenaline as first-line therapy'
  },
  {
    id: 'chlorphenamine',
    name: 'Chlorphenamine (Piriton)',
    category: 'Anaphylaxis',
    doses: [{ label: 'Standard dose', formula: _kg => 10, unit: 'mg', note: 'Adjunct antihistamine — slow IV push' }],
    route: 'IV slow over 1 min',
    concentration: '10 mg/mL',
  },

  // ── Metabolic / Antidote ────────────────────────────────────────────────────
  {
    id: 'dextrose',
    name: 'Dextrose 50%',
    category: 'Metabolic / Antidote',
    doses: [
      { label: 'Hypoglycaemia', formula: kg => kg * 1, unit: 'mL', note: '1 mL/kg of D50% (= 0.5 g/kg). Use D10% in neonates.' }
    ],
    route: 'IV slow',
    concentration: '50% = 0.5 g/mL',
    caution: 'Extravasation causes severe tissue necrosis — ensure patent IV'
  },
  {
    id: 'magnesium-torsades',
    name: 'Magnesium Sulfate (Torsades)',
    category: 'Metabolic / Antidote',
    doses: [
      { label: 'Torsades de Pointes', formula: _kg => 2, unit: 'g', note: '2g IV over 2-5 mins' },
      { label: 'Eclampsia (loading)', formula: _kg => 4, unit: 'g', note: '4g IV over 20 mins, then 1-2 g/h infusion' }
    ],
    route: 'IV',
    concentration: '50% = 500 mg/mL (dilute before IV push)',
    caution: 'Monitor reflexes, RR and UO. Antidote: Calcium Gluconate 10 mL of 10% IV'
  },
  {
    id: 'calcium-gluconate',
    name: 'Calcium Gluconate 10%',
    category: 'Metabolic / Antidote',
    doses: [
      { label: 'Hyperkalaemia / Mg toxicity', formula: kg => Math.min(kg * 0.5, 30), unit: 'mL', note: 'Of 10% solution; 0.3-0.5 mL/kg (max ~20-30 mL)' },
      { label: 'Rapid cardiac membrane stabilisation', formula: _kg => 10, unit: 'mL', note: '10 mL of 10% over 2-3 mins — repeat if required' }
    ],
    route: 'IV slow (central preferred)',
    concentration: '10% = 100 mg/mL',
    caution: 'Extravasation risk. Precipitates with sodium bicarbonate'
  },
  {
    id: 'naloxone',
    name: 'Naloxone',
    category: 'Metabolic / Antidote',
    doses: [
      { label: 'Opioid reversal', formula: kg => Math.round(kg * 0.001 * 1000) / 1000, unit: 'mg', note: '0.4-2 mg total; titrate in 0.04 mg increments for analgesia preservation' },
      { label: 'Neonatal (MROP)', formula: kg => kg * 0.01, unit: 'mg', note: 'Birth exposure — 0.01 mg/kg IM' }
    ],
    route: 'IV / IM / IN',
    concentration: '0.4 mg/mL',
    caution: 'Short half-life (30-80 min) — shorter than most opioids. Watch for re-narcotisation. May cause acute agitation / pulmonary oedema'
  },
  {
    id: 'flumazenil',
    name: 'Flumazenil',
    category: 'Metabolic / Antidote',
    doses: [
      { label: 'BZD reversal', formula: _kg => 0.2, unit: 'mg', note: '0.2 mg IV; repeat 0.1 mg every 60s up to 1 mg total' }
    ],
    route: 'IV slow over 15s',
    concentration: '0.1 mg/mL',
    caution: 'Short acting — re-sedation likely. DANGEROUS in BZD-dependent or tricyclic co-ingestion patients (seizures)'
  },
  {
    id: 'intralipid',
    name: 'Intralipid 20% (LAST Protocol)',
    category: 'Metabolic / Antidote',
    doses: [
      { label: 'Bolus (LAST)', formula: kg => Math.round(kg * 1.5), unit: 'mL', note: 'Over 1 min; repeat twice at 5 min intervals if unstable' },
      { label: 'Infusion after bolus', formula: kg => Math.round(kg * 0.25), unit: 'mL/min', note: 'For 30-60 mins. Max cumulative dose: 12 mL/kg' }
    ],
    route: 'IV',
    concentration: '20% lipid emulsion',
    caution: 'Maximum cumulative 12 mL/kg. Avoid propofol as substitute — insufficient lipid content'
  },

  // ── Antiarrhythmic ────────────────────────────────────────────────────
  {
    id: 'adenosine',
    name: 'Adenosine (SVT)',
    category: 'Antiarrhythmic',
    doses: [
      { label: '1st dose', formula: kg => Math.min(kg * 0.1, 6), unit: 'mg', max: 6, note: 'Rapid push + 20 mL flush. Warn patient of transient asystole.' },
      { label: '2nd dose (if no response)', formula: kg => Math.min(kg * 0.2, 12), unit: 'mg', max: 12 },
      { label: '3rd dose (if no response)', formula: kg => Math.min(kg * 0.2, 12), unit: 'mg', max: 12 }
    ],
    route: 'IV RAPID bolus — antecubital or central',
    concentration: '3 mg/mL',
    caution: 'DO NOT use in WPW/wide-complex tachycardia of unknown origin, high-degree blocks, or heart transplant'
  },
  {
    id: 'amiodarone-loading',
    name: 'Amiodarone (Stability / Loading)',
    category: 'Antiarrhythmic',
    doses: [
      { label: 'Loading dose', formula: _kg => 150, unit: 'mg', note: '150mg IV over 10 mins (in D5W)' },
      { label: 'Maintenance (first 6h)', formula: _kg => 1, unit: 'mg/min', note: '360mg total (or ~1 mg/kg/h)' },
      { label: 'Maintenance (next 18h)', formula: _kg => 0.5, unit: 'mg/min', note: '540mg total (or ~0.5 mg/kg/h)' }
    ],
    route: 'IV infusion',
    concentration: '150 mg / 100 mL D5W (loading packet)',
    caution: 'Must be diluted in D5W. Risks: hypotension, phlebitis (requires central line if possible), and bradycardia'
  },
  {
    id: 'esmolol',
    name: 'Esmolol (Brevibloc)',
    category: 'Antiarrhythmic',
    doses: [
      { label: 'Loading dose', formula: kg => Math.min(kg * 0.5, 50), unit: 'mg', max: 50, note: '0.5 mg/kg over 1 min' },
      { label: 'Maintenance guide', formula: kg => kg * 0.1, unit: 'mg/min', note: 'Titrate 50-200 mcg/kg/min' }
    ],
    route: 'IV',
    concentration: '10 mg/mL or 250 mg/mL (double check!)',
    caution: 'Short-acting beta-blocker (T1/2 ~9 min). Monitor BP and HR closely'
  },
  {
    id: 'verapamil',
    name: 'Verapamil (Isoptin)',
    category: 'Antiarrhythmic',
    doses: [
      { label: 'SVT conversion', formula: _kg => 5, unit: 'mg', note: '2.5-5 mg IV over 2 mins; repeat 5-10 mg after 15-30 mins' }
    ],
    route: 'IV slow push',
    concentration: '2.5 mg/mL',
    caution: 'Negative inotrope — contraindicated in LV dysfunction, WPW with AF, or heart block'
  },
  {
    id: 'procainamide',
    name: 'Procainamide',
    category: 'Antiarrhythmic',
    doses: [
      { label: 'Standard loading', formula: _kg => 20, unit: 'mg/min', note: 'Until arrhythmia suppressed or max 17 mg/kg reached' },
      { label: 'Max cumulative', formula: kg => kg * 17, unit: 'mg', max: 1000 }
    ],
    route: 'IV infusion',
    concentration: '100 mg/mL or 500 mg/mL',
    caution: 'Monitor for QRS widening (>50%) or hypotension — stop infusion immediately'
  },
  {
    id: 'metoprolol',
    name: 'Metoprolol (Rate control)',
    category: 'Antiarrhythmic',
    doses: [
      { label: 'IV bolus', formula: _kg => 5, unit: 'mg', note: '5 mg IV over 5 mins; may repeat x3 at 5 min intervals (total 15 mg)' }
    ],
    route: 'IV slow',
    concentration: '1 mg/mL',
    caution: 'Contraindicated in cardiogenic shock, severe bronchospasm, and heart block (2nd/3rd degree)'
  },
  {
    id: 'lidocaine-arrhythmia',
    name: 'Lidocaine (Antiarrhythmic)',
    category: 'Antiarrhythmic',
    doses: [
      { label: 'VT / refractory VF', formula: kg => Math.min(kg * 1.5, 100), unit: 'mg', max: 100, note: '1-1.5 mg/kg IV push; can repeat 0.5-0.75 mg/kg every 5-10 mins' }
    ],
    route: 'IV push',
    concentration: '20 mg/mL (2%)',
    caution: 'Once amiodarone has been used in same arrest, avoid lidocaine'
  }
];

const CATEGORY_COLORS: Record<EmergencyDrug['category'], string> = {
  'Cardiac Arrest': 'bg-rose-500',
  'Airway / RSI': 'bg-blue-600',
  'Anaphylaxis': 'bg-amber-500',
  'Metabolic / Antidote': 'bg-violet-600',
  'Antiarrhythmic': 'bg-teal-600'
};

const CATEGORY_BG: Record<EmergencyDrug['category'], string> = {
  'Cardiac Arrest': 'bg-rose-50 border-rose-200',
  'Airway / RSI': 'bg-blue-50 border-blue-200',
  'Anaphylaxis': 'bg-amber-50 border-amber-200',
  'Metabolic / Antidote': 'bg-violet-50 border-violet-200',
  'Antiarrhythmic': 'bg-teal-50 border-teal-200'
};

const ALL_CATEGORIES = ['All', 'Cardiac Arrest', 'Airway / RSI', 'Anaphylaxis', 'Metabolic / Antidote', 'Antiarrhythmic'] as const;

export default function EmergencyDrugs() {
  const { patient, ibw } = usePatient();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof ALL_CATEGORIES[number]>('Cardiac Arrest');
  const [search, setSearch] = useState('');

  const weight = patient.weightKg
    ? (patient.useIBW ? ibw : Number(patient.weightKg))
    : 70;

  const round = (val: number, decimals = 1) =>
    Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);

  const filtered = useMemo(() => {
    return EMERGENCY_DRUGS.filter(d => {
      const matchCat = activeCategory === 'All' || d.category === activeCategory;
      const matchSearch = search === '' || d.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gradient-to-r from-rose-600 to-rose-500 p-5 sm:p-6 rounded-3xl shadow-lg shadow-rose-500/20 text-white">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2.5 bg-white/20 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">Emergency Drug Calculator</h2>
            <p className="text-rose-100 text-xs font-medium mt-0.5">
              Dosing for <span className="font-black text-white">{round(weight, 1)} kg</span> patient
              {patient.useIBW && <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-black">IBW</span>}
            </p>
          </div>
        </div>
        <div className="relative sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Search drugs..."
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveCategory('All'); }}
            className="w-full pl-9 pr-3 py-2.5 bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-xl text-sm font-medium outline-none focus:bg-white/30 transition-all"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSearch(''); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? `${cat === 'All' ? 'bg-slate-800' : CATEGORY_COLORS[cat as EmergencyDrug['category']]} text-white shadow-md`
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Drug Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="font-bold">No drugs found</p>
          </div>
        )}

        {filtered.map(drug => {
          const isExpanded = expandedId === drug.id;
          const catColor = CATEGORY_COLORS[drug.category];
          const catBg = CATEGORY_BG[drug.category];

          return (
            <div
              key={drug.id}
              className={`rounded-2xl border overflow-hidden transition-all ${catBg}`}
            >
              {/* Drug Header Row */}
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setExpandedId(isExpanded ? null : drug.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg text-white ${catColor} whitespace-nowrap flex-shrink-0`}>
                    {drug.category}
                  </span>
                  <div>
                    <p className="font-bold text-slate-800 text-sm leading-tight">{drug.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{drug.route}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* First dose pill preview */}
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">
                      {drug.doses[0].label}
                    </p>
                    <p className="font-black text-slate-800 tabular-nums">
                      {drug.doses[0].max
                        ? round(Math.min(drug.doses[0].formula(weight), drug.doses[0].max))
                        : drug.doses[0].min
                          ? round(Math.max(drug.doses[0].formula(weight), drug.doses[0].min))
                          : round(drug.doses[0].formula(weight))
                      }{' '}
                      <span className="text-xs text-slate-500 font-bold">{drug.doses[0].unit}</span>
                    </p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </button>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t border-black/5 bg-white/60 px-4 pb-5 pt-4 space-y-4">
                  {/* All Dose Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {drug.doses.map((dose, i) => {
                      let computed = dose.formula(weight);
                      if (dose.max) computed = Math.min(computed, dose.max);
                      if (dose.min) computed = Math.max(computed, dose.min);

                      return (
                        <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{dose.label}</p>
                          <p className="text-2xl font-black text-slate-900 tabular-nums">
                            {round(computed)}{' '}
                            <span className="text-sm text-slate-500 font-bold">{dose.unit}</span>
                          </p>
                          {dose.note && (
                            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{dose.note}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-3 text-xs">
                    {drug.concentration && (
                      <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
                        <span className="font-bold text-slate-500 uppercase tracking-widest text-[10px] block">Concentration</span>
                        <span className="font-semibold text-slate-700">{drug.concentration}</span>
                      </div>
                    )}
                    {drug.route && (
                      <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
                        <span className="font-bold text-slate-500 uppercase tracking-widest text-[10px] block">Route</span>
                        <span className="font-semibold text-slate-700">{drug.route}</span>
                      </div>
                    )}
                  </div>

                  {drug.caution && (
                    <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 p-3 rounded-xl">
                      <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-rose-700 font-medium leading-relaxed">{drug.caution}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
