import { useState, useMemo, useEffect } from 'react';
import { UserPlus, Scale, Activity, AlertTriangle, Info, ChevronDown, ChevronUp, ShieldX, ShieldCheck, Zap, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePatient } from '../../contexts/PatientContext';
import { calculateIBW, calculateBMI, calculateEstimatedCrCl, PatientType } from '../../lib/medicalDosing';
import { PatientParameterCard } from '../../components/PatientParameterCard';
import { STORAGE_KEYS } from '../../config/storageKeys';

interface Drug {
  name: string;
  dose: string;
  indication: string;
  calculatedDose: string;
  infusionRates?: {
    mcgKgMin: string;
    mcgKgHr: string;
    mgHr: string;
  };
  notes?: string;
}

export default function PatientCalculator() {
  const { t } = useLanguage();
  const patient = usePatient();
  
  // Local module-specific state
  const [type, setType] = useState<PatientType>(() => {
    return (localStorage.getItem(STORAGE_KEYS.PATIENT_CALC_TYPE) as PatientType) || 'adult';
  });
  const [useIBW, setUseIBW] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.PATIENT_USE_IBW) === 'true';
  });
  const [manualCrcl, setManualCrcl] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.PATIENT_MANUAL_CRCL) || '';
  });

  const [showDrugs, setShowDrugs] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [showAntibiotics, setShowAntibiotics] = useState(true);
  const [showCardio, setShowCardio] = useState(false);

  // Persistence Effects
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PATIENT_CALC_TYPE, type); }, [type]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PATIENT_USE_IBW, useIBW.toString()); }, [useIBW]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PATIENT_MANUAL_CRCL, manualCrcl); }, [manualCrcl]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const calculations = useMemo(() => {
    const ibwValue = calculateIBW({
      type,
      heightCm: patient.heightNum,
      gender: patient.gender,
      ageYears: patient.ageNum
    });

    const { bmi, category } = calculateBMI(patient.weightNum, patient.heightNum, type, patient.ageNum);

    const defaultCrcl = calculateEstimatedCrCl({
      type,
      ageYears: patient.ageNum,
      weightKg: patient.weightNum,
      gender: patient.gender,
      heightCm: patient.heightNum
    });

    return { 
      ibw: ibwValue.toFixed(1), 
      bmi: bmi.toFixed(1), 
      category, 
      rawIbw: ibwValue,
      defaultCrcl
    };
  }, [type, patient.weightNum, patient.heightNum, patient.gender, patient.ageNum]);

  const targetWeight = useIBW ? calculations.rawIbw : patient.weightNum;
  const activeCrcl = manualCrcl === '' ? calculations.defaultCrcl : (parseFloat(manualCrcl) || calculations.defaultCrcl);

  const emergencyDrugs = useMemo((): Drug[] => {
    const w = targetWeight;
    const drugs: Drug[] = [
      {
        name: "Adrenaline (Cardiac Arrest)",
        dose: "10 mcg/kg",
        calculatedDose: `${(w * 10).toFixed(0)} mcg (${(w * 0.1).toFixed(1)} mL of 1:10,000)`,
        indication: "IV/IO every 3-5 mins",
        notes: "Pediatric: 0.1 mL/kg of 1:10,000"
      },
      {
        name: "Adrenaline (Anaphylaxis)",
        dose: "5-10 mcg/kg IV",
        calculatedDose: `${(w * 5).toFixed(0)}-${(w * 10).toFixed(0)} mcg IV`,
        indication: "Titrate to effect",
        notes: "IM dose: 0.5mg (Adult), 0.01mg/kg (Peds)"
      },
      {
        name: "Atropine",
        dose: "20 mcg/kg",
        calculatedDose: `${(w * 20 / 1000).toFixed(2)} mg`,
        indication: "Bradycardia",
        notes: "Min dose 0.1mg, Max 0.5mg (Peds)"
      },
      {
        name: "Amiodarone",
        dose: "5 mg/kg",
        calculatedDose: `${(w * 5).toFixed(0)} mg`,
        indication: "Refractory VF/pVT",
        notes: "Max 300mg"
      },
      {
        name: "Propofol (Induction)",
        dose: "2-3 mg/kg",
        calculatedDose: `${(w * 2).toFixed(0)}-${(w * 3).toFixed(0)} mg`,
        indication: "Anesthesia Induction",
        notes: "Reduce dose in elderly/shock"
      },
      {
        name: "Succinylcholine",
        dose: "1.5-2 mg/kg",
        calculatedDose: `${(w * 1.5).toFixed(0)}-${(w * 2).toFixed(0)} mg`,
        indication: "Rapid Sequence Induction",
        notes: "Avoid in hyperkalemia/burns"
      },
      {
        name: "Rocuronium",
        dose: "0.6-1.2 mg/kg",
        calculatedDose: `${(w * 0.6).toFixed(0)}-${(w * 1.2).toFixed(0)} mg`,
        indication: "Neuromuscular Blockade",
        notes: "1.2mg/kg for RSI"
      },
      {
        name: "Fentanyl",
        dose: "1-2 mcg/kg",
        calculatedDose: `${(w * 1).toFixed(0)}-${(w * 2).toFixed(0)} mcg`,
        indication: "Analgesia/Induction",
        notes: "Watch for respiratory depression"
      },
      {
        name: "Ephedrine",
        dose: "0.1-0.2 mg/kg",
        calculatedDose: `${(w * 0.1).toFixed(1)}-${(w * 0.2).toFixed(1)} mg`,
        indication: "Hypotension (Vasopressor)",
        notes: "Increases HR and BP"
      },
      {
        name: "Metaraminol",
        dose: "0.01 mg/kg",
        calculatedDose: `${(w * 0.01).toFixed(2)} mg`,
        indication: "Hypotension (Vasopressor)",
        notes: "Reflex bradycardia possible"
      },
      {
        name: "Ketamine",
        dose: "1-2 mg/kg",
        calculatedDose: `${(w * 1).toFixed(0)}-${(w * 2).toFixed(0)} mg`,
        indication: "Induction/Analgesia",
        notes: "Sympathomimetic, bronchodilator"
      },
      {
        name: "Adenosine",
        dose: "0.1-0.3 mg/kg",
        calculatedDose: `${(w * 0.1).toFixed(1)}-${(w * 0.3).toFixed(1)} mg`,
        indication: "SVT (Rapid bolus)",
        notes: "Max 1st dose 6mg, 2nd 12mg"
      },
      {
        name: "Magnesium Sulfate",
        dose: "40-50 mg/kg",
        calculatedDose: `${(w * 40).toFixed(0)}-${(w * 50).toFixed(0)} mg`,
        indication: "Asthma / Refractory VF",
        notes: "Max 2g. Slow infusion for asthma."
      },
      {
        name: "Glucose 10%",
        dose: "2-5 mL/kg",
        calculatedDose: `${(w * 2).toFixed(0)}-${(w * 5).toFixed(0)} mL`,
        indication: "Hypoglycemia",
        notes: "Re-check BG after 15 mins"
      },
      {
        name: "Ceftriaxone",
        dose: "50-80 mg/kg",
        calculatedDose: `${(w * 50).toFixed(0)}-${(w * 80).toFixed(0)} mg`,
        indication: "Sepsis / Meningitis",
        notes: "Max 2g"
      },
      {
        name: "Dexamethasone",
        dose: "0.15-0.6 mg/kg",
        calculatedDose: `${(w * 0.15).toFixed(1)}-${(w * 0.6).toFixed(1)} mg`,
        indication: "Croup / Anaphylaxis",
        notes: "Max 12-16mg"
      },
      {
        name: "Noradrenaline (Infusion)",
        dose: "0.01-0.5 mcg/kg/min",
        calculatedDose: `${(w * 0.01).toFixed(2)}-${(w * 0.5).toFixed(2)} mcg/min`,
        infusionRates: {
          mcgKgMin: "0.01 - 0.5",
          mcgKgHr: "0.6 - 30",
          mgHr: `${(w * 0.6 / 1000).toFixed(3)} - ${(w * 30 / 1000).toFixed(3)}`
        },
        indication: "Septic Shock / Hypotension",
        notes: "Titrate to MAP > 65"
      },
      {
        name: "Dopamine (Infusion)",
        dose: "2-20 mcg/kg/min",
        calculatedDose: `${(w * 2).toFixed(0)}-${(w * 20).toFixed(0)} mcg/min`,
        infusionRates: {
          mcgKgMin: "2 - 20",
          mcgKgHr: "120 - 1200",
          mgHr: `${(w * 120 / 1000).toFixed(2)} - ${(w * 1200 / 1000).toFixed(2)}`
        },
        indication: "Inotropic support",
        notes: "Renal vs Inotropic vs Pressor doses"
      },
      {
        name: "Propofol (Infusion)",
        dose: "1-4 mg/kg/h",
        calculatedDose: `${(w * 1).toFixed(0)}-${(w * 4).toFixed(0)} mg/h`,
        infusionRates: {
          mcgKgMin: `${(1000 / 60).toFixed(1)} - ${(4000 / 60).toFixed(1)}`,
          mcgKgHr: "1000 - 4000",
          mgHr: `${(w * 1).toFixed(1)} - ${(w * 4).toFixed(1)}`
        },
        indication: "Maintenance of Anesthesia / Sedation",
        notes: "Monitor for PRIS"
      }
    ];
    return drugs;
  }, [targetWeight]);

  const antibioticsList = useMemo(() => {
    const actW = patient.weightNum;
    const ibw = calculations.rawIbw;
    // Adjusted Body Weight for Aminoglycosides if actual > 1.2 * IBW
    const adjBW = actW > (1.2 * ibw) ? (ibw + 0.4 * (actW - ibw)) : actW;
    const crcl = activeCrcl;

    const abs = [
      {
        name: "Cefazolin",
        class: "1st Gen Cephalosporin",
        dose: actW > 120 ? "3g IV" : (actW > 80 ? "2g IV" : "1g IV"),
        interval: crcl > 50 ? "q8h" : (crcl >= 10 ? "q12h" : "q24h"),
        notes: "Standard surgical prophylaxis.",
        baseWeight: "Actual weight used for dosing.",
        spectrum: { gramPos: 2, gramNeg: 1, anaerobes: 0, mrsa: 0, pseudomonas: 0 }
      },
      {
        name: "Cefuroxime",
        class: "2nd Gen Cephalosporin",
        dose: "1.5g IV",
        interval: crcl > 20 ? "q8h" : "q12-24h",
        notes: "Good coverage for GI/Ortho prophy.",
        baseWeight: "Standard dose.",
        spectrum: { gramPos: 2, gramNeg: 2, anaerobes: 0, mrsa: 0, pseudomonas: 0 }
      },
      {
        name: "Ceftriaxone",
        class: "3rd Gen Cephalosporin",
        dose: "1g - 2g IV",
        interval: "q24h (Biliary excretion)",
        notes: "No renal adjustment needed. Good CNS penetration.",
        baseWeight: "Standard dose.",
        spectrum: { gramPos: 2, gramNeg: 2, anaerobes: 0, mrsa: 0, pseudomonas: 0 }
      },
      {
        name: "Piperacillin-Tazobactam",
        class: "Penicillin/Beta-lactamase Inhibitor",
        dose: `Load: 4.5g IV | Maint: ${crcl > 40 ? "4.5g IV" : (crcl > 20 ? "3.375g IV" : "2.25g IV")}`,
        interval: crcl > 40 ? "q6-8h" : "q6h",
        infusion: { method: "Extended Infusion", rate: "Load: infuse over 30 mins. Maint: infuse over 4 hours.", alternative: "Begin maintenance dose 4 hours after loading dose completion." },
        notes: "Prolonged infusion limits mortality in severe sepsis.",
        baseWeight: "Renally adjusted dose.",
        spectrum: { gramPos: 2, gramNeg: 2, anaerobes: 2, mrsa: 0, pseudomonas: 2 }
      },
      {
        name: "Meropenem",
        class: "Carbapenem",
        dose: `Load: 1g IV | Maint: ${crcl > 50 ? "1g IV" : (crcl >= 26 ? "1g IV" : "500mg IV")}`,
        interval: crcl > 50 ? "q8h" : (crcl >= 26 ? "q12h" : "q12h"),
        infusion: { method: "Extended Infusion", rate: "Load: infuse over 30 mins. Maint: infuse over 3 hours.", alternative: "Begin maintenance dose 3 hours after loading dose completion." },
        notes: "Reserved for ESBL or severe multi-drug resistant infections.",
        baseWeight: "Renally adjusted dose.",
        spectrum: { gramPos: 2, gramNeg: 2, anaerobes: 2, mrsa: 0, pseudomonas: 2 }
      },
      {
        name: "Vancomycin",
        class: "Glycopeptide",
        dose: `Load: ${(Math.min(2500, actW * 15)).toFixed(0)}-${(Math.min(2500, actW * 20)).toFixed(0)}mg | Maint: ${(Math.min(2000, actW * 15)).toFixed(0)}mg`,
        interval: crcl > 90 ? "q8-12h" : (crcl > 50 ? "q12-24h" : "q24-48h"),
        infusion: { method: "Rate-Controlled Infusion", rate: "Max rate 10-15 mg/min (Infuse over ≥ " + Math.max(60, Math.ceil(actW * 15 / 10)) + " mins).", alternative: "Begin 1st maintenance dose exactly 1 interval period after loading dose." },
        notes: "Target trough 15-20 mcg/mL. Infuse slowly to avoid red-man syndrome.",
        baseWeight: `Uses Actual Body Weight (${actW}kg). Renally adjusted interval.`,
        spectrum: { gramPos: 2, gramNeg: 0, anaerobes: 0, mrsa: 2, pseudomonas: 0 }
      },
      {
        name: "Gentamicin",
        class: "Aminoglycoside",
        dose: (adjBW * 2).toFixed(0) + " mg IV (Traditional Load)",
        interval: crcl > 60 ? "q8h" : (crcl > 40 ? "q12h" : "q24h"),
        notes: "Synergy dose (Endocarditis) is lower (1mg/kg). Nephrotoxic.",
        baseWeight: `Uses Adjusted BW (${adjBW.toFixed(1)}kg) over Actual.`,
        spectrum: { gramPos: 1, gramNeg: 2, anaerobes: 0, mrsa: 0, pseudomonas: 2 }
      },
      {
        name: "Clindamycin",
        class: "Lincosamide",
        dose: "600-900mg IV",
        interval: "q8h",
        notes: "Excellent tissue penetration. Toxin suppression in specific sepsis.",
        baseWeight: "No renal adjustment required.",
        spectrum: { gramPos: 2, gramNeg: 0, anaerobes: 2, mrsa: 1, pseudomonas: 0 }
      },
      {
        name: "Metronidazole",
        class: "Nitroimidazole",
        dose: "500mg IV",
        interval: "q8h",
        notes: "Gold standard for below-diaphragm anaerobic coverage.",
        baseWeight: "Metabolized hepatically; no renal adjustment.",
        spectrum: { gramPos: 0, gramNeg: 0, anaerobes: 2, mrsa: 0, pseudomonas: 0 }
      }
    ];
    return abs;
  }, [patient.weightNum, calculations.rawIbw, activeCrcl]);

  const equipmentSizes = useMemo(() => {
    let ettUncuffed = '';
    let ettCuffed = '';
    let depth = '';
    let lma = '';
    let blade = '';
    let opa = '';

    const w = patient.weightNum;
    const h = patient.heightNum;
    const age = patient.ageNum;

    if (type === 'adult') {
      // Adult Airway Sizing
      const isFemale = patient.gender === 'female';
      ettCuffed = isFemale ? '7.0 - 7.5' : '7.5 - 8.0';
      ettUncuffed = 'N/A (Cuffed preferred)';
      depth = isFemale ? '20 - 21' : '21 - 23';
      
      if (w < 50) lma = '3';
      else if (w <= 70) lma = '4';
      else if (w <= 100) lma = '5';
      else lma = '6';

      blade = isFemale ? 'Mac 3' : 'Mac 3 or 4';
      opa = isFemale ? 'Size 3 (90mm / Yellow)' : 'Size 4 (100mm / Red)';
    } else if (type === 'neonatal') {
      // Neonatal Airway Sizing
      if (w < 1.0) {
        ettUncuffed = '2.5';
        depth = '6 - 7';
        lma = '0.5 / N/A';
        blade = 'Miller 00';
        opa = 'Size 00 (40mm)';
      } else if (w < 2.5) {
        ettUncuffed = '3.0';
        depth = '7 - 8';
        lma = '1.0';
        blade = 'Miller 0';
        opa = 'Size 0 (50mm)';
      } else {
        ettUncuffed = '3.0 - 3.5';
        depth = '8 - 9';
        lma = '1.0';
        blade = 'Miller 0 or 1';
        opa = 'Size 0 (50mm / Black)';
      }
      ettCuffed = '3.0 Micro-cuffed';
    } else {
      // Pediatric Airway Sizing
      const uncuffedSize = (age / 4) + 4;
      const cuffedSize = (age / 4) + 3.5;
      const calcDepth = (age / 2) + 12;

      ettUncuffed = uncuffedSize.toFixed(1);
      ettCuffed = cuffedSize.toFixed(1);
      depth = calcDepth.toFixed(1);

      if (w < 5) lma = '1.0';
      else if (w < 10) lma = '1.5';
      else if (w < 20) lma = '2.0';
      else if (w < 30) lma = '2.5';
      else if (w < 50) lma = '3.0';
      else lma = '4.0';

      if (age < 1) {
        blade = 'Miller 1';
        opa = 'Size 0 or 1';
      } else if (age < 5) {
        blade = 'Wis-Hipple / Mac 2';
        opa = 'Size 1 or 2';
      } else if (age < 10) {
        blade = 'Mac 2 or 3';
        opa = 'Size 2 or 3';
      } else {
        blade = 'Mac 3';
        opa = 'Size 3 (90mm)';
      }
    }

    return { ettUncuffed, ettCuffed, depth, lma, blade, opa };
  }, [type, patient.ageNum, patient.weightNum, patient.heightNum, patient.gender]);


  const copyDoses = () => {
    const text = emergencyDrugs.map(d => {
      let base = `${d.name}: ${d.calculatedDose}`;
      if (d.infusionRates) {
        base += `\n  - ${d.infusionRates.mcgKgMin} mcg/kg/min\n  - ${d.infusionRates.mcgKgHr} mcg/kg/h\n  - ${d.infusionRates.mgHr} mg/h`;
      }
      return base;
    }).join('\n\n');
    navigator.clipboard.writeText(text);
    showToast(t('patient.toastCopy'));
  };

  const getAgeLabel = () => {
    if (type === 'neonatal') return t('patient.days');
    if (type === 'pediatric' && patient.ageNum < 1) return t('patient.months');
    return t('patient.years');
  };

  return (
    <div className="space-y-6">
      <PatientParameterCard />

      <div className="bg-white p-6 rounded-xl border border-medical-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600" />
            Clinical Indices
          </h2>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            {(['adult', 'pediatric', 'neonatal'] as PatientType[]).map((tVal) => (
              <button
                key={tVal}
                onClick={() => setType(tVal)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  type === tVal ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tVal}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-slate-100 pb-8">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Renal Clearance Override
            </label>
            <div className="relative">
              <input 
                type="number" 
                placeholder={`Auto-calc: ${calculations.defaultCrcl.toFixed(0)} mL/min`}
                value={manualCrcl} 
                onChange={(e) => setManualCrcl(e.target.value)}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-indigo-500/50 font-bold text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold uppercase">
                mL / min
              </div>
            </div>
            <p className="mt-2 text-[10px] text-slate-400 leading-relaxed italic">
              Estimated using Cockcroft-Gault (Adult) or Bedside Schwartz (Peds). Override if known measured level.
            </p>
          </div>
          
          <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">{t('patient.targetWeight')}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-indigo-900">{targetWeight.toFixed(1)}</span>
              <span className="text-sm font-bold text-indigo-400">kg</span>
            </div>
            <div className="flex bg-white/50 p-1 rounded-lg border border-indigo-200 mt-3">
              <button
                onClick={() => setUseIBW(false)}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition-all ${
                  !useIBW ? 'bg-indigo-600 text-white shadow-sm' : 'text-indigo-400 hover:text-indigo-600'
                }`}
              >
                {t('patient.actual')}
              </button>
              <button
                onClick={() => setUseIBW(true)}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition-all ${
                  useIBW ? 'bg-indigo-600 text-white shadow-sm' : 'text-indigo-400 hover:text-indigo-600'
                }`}
              >
                {t('patient.ideal')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('patient.ibw')}</p>
            <p className="text-2xl font-black text-slate-800">{calculations.ibw} <span className="text-sm font-bold text-slate-400">kg</span></p>
            <p className="text-[10px] text-slate-400/80 mt-1 uppercase font-bold tracking-tighter">Metric: Devine / APLS Formula</p>
          </div>
          <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              {type === 'adult' ? t('patient.bmi') : t('patient.bmiPercentile')}
            </p>
            <p className="text-2xl font-black text-slate-800">{calculations.bmi}</p>
            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight">{calculations.category}</p>
          </div>
        </div>
      </div>

      {equipmentSizes && (
        <div className="bg-white p-6 rounded-xl border border-medical-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-medical-primary">
              <Activity className="w-5 h-5 text-indigo-600" />
              Airway & Equipment Sizing ({type.toUpperCase()})
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 uppercase">
              {type === 'adult' ? 'Standard Adult' : type === 'pediatric' ? `Age ${patient.ageNum}y (${patient.weightNum}kg)` : `Neonate (${patient.weightNum}kg)`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ETT Cuffed ID</p>
              <p className="text-lg font-black text-indigo-900">{equipmentSizes.ettCuffed}</p>
              <p className="text-[9px] text-slate-400 mt-0.5">mm ID</p>
            </div>
            
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ETT Uncuffed ID</p>
              <p className="text-lg font-black text-slate-700">{equipmentSizes.ettUncuffed}</p>
              <p className="text-[9px] text-slate-400 mt-0.5">mm ID</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Depth (Oral)</p>
              <p className="text-lg font-black text-indigo-900">{equipmentSizes.depth} <span className="text-xs font-normal">cm</span></p>
              <p className="text-[9px] text-slate-400 mt-0.5">At lip</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">SGA / LMA Size</p>
              <p className="text-lg font-black text-indigo-900">{equipmentSizes.lma}</p>
              <p className="text-[9px] text-slate-400 mt-0.5">Weight-based</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Laryngoscope Blade</p>
              <p className="text-sm font-bold text-slate-800 leading-tight mt-1">{equipmentSizes.blade}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">OPA / Airway</p>
              <p className="text-sm font-bold text-slate-800 leading-tight mt-1">{equipmentSizes.opa}</p>
            </div>
          </div>
        </div>
      )}


      <div className="bg-white rounded-xl border border-medical-border shadow-sm overflow-hidden">
        <div 
          onClick={() => setShowDrugs(!showDrugs)}
          className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-medical-primary">{t('patient.drugsTitle')}</h3>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                copyDoses();
              }}
              className="text-xs font-bold text-medical-accent hover:text-blue-700 transition-colors uppercase tracking-widest"
            >
              {t('patient.copyDoses')}
            </button>
            {showDrugs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-medical-primary text-white px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-medical-accent" />
              <span className="text-sm font-bold">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {showDrugs && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-medical-border">
                <tr>
                  <th className="px-6 py-3 font-semibold text-slate-600">{t('patient.tableName')}</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">{t('patient.tableDose')}</th>
                  <th className="px-6 py-3 font-semibold text-medical-accent">{t('patient.tableCalc')}</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">{t('patient.tableNotes')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-medical-border">
                {emergencyDrugs.map((drug, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-medical-primary">{drug.name}</td>
                    <td className="px-6 py-4 text-slate-600">{drug.dose}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold w-fit">
                          {drug.calculatedDose}
                        </span>
                        {drug.infusionRates && (
                          <div className="grid grid-cols-1 gap-1 mt-1">
                            <div className="flex justify-between text-[10px] font-bold text-slate-500 border-b border-slate-100 pb-1">
                              <span>{t('patient.mcgKgMin')}</span>
                              <span className="text-medical-primary">{drug.infusionRates.mcgKgMin}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-500 border-b border-slate-100 pb-1">
                              <span>{t('patient.mcgKgHr')}</span>
                              <span className="text-medical-primary">{drug.infusionRates.mcgKgHr}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-500">
                              <span>{t('patient.mgHr')}</span>
                              <span className="text-medical-primary">{drug.infusionRates.mgHr}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700">{drug.indication}</p>
                      {drug.notes && <p className="text-xs text-slate-400 mt-1 italic">{drug.notes}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-medical-border shadow-sm overflow-hidden">
        <div 
          onClick={() => setShowAntibiotics(!showAntibiotics)}
          className="w-full px-6 py-4 flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-emerald-900">Antibiotic Dosing & Spectrum Coverage</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-bold text-emerald-700 bg-emerald-200/50 px-2 py-1 rounded">
              CrCl: {activeCrcl.toFixed(0)} mL/min
            </div>
            {showAntibiotics ? <ChevronUp className="w-5 h-5 text-emerald-700" /> : <ChevronDown className="w-5 h-5 text-emerald-700" />}
          </div>
        </div>

        {showAntibiotics && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-medical-border">
                <tr>
                  <th className="px-6 py-3 font-semibold text-slate-600">Antibiotic</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Dose & Interval</th>
                  <th className="px-6 py-3 font-semibold text-slate-600 w-64">Spectrum Matrix</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Clinical Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-medical-border">
                {antibioticsList.map((med, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-emerald-800">{med.name}</p>
                      <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-wider">{med.class}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-black text-slate-800">{med.dose}</div>
                      <div className="text-emerald-700 font-bold text-xs mt-0.5">{med.interval}</div>
                      
                      {/* Optional Infusion Rules */}
                      {med.infusion && (
                        <div className="mt-2 p-2 bg-emerald-50 rounded border border-emerald-100/50">
                          <p className="text-[10px] font-bold text-emerald-800 uppercase mb-1">{med.infusion.method}</p>
                          <p className="text-xs text-emerald-700 font-medium mb-1">{med.infusion.rate}</p>
                          <p className="text-[10px] text-slate-500 italic">{med.infusion.alternative}</p>
                        </div>
                      )}
                      
                      <div className="text-[10px] text-slate-500 mt-2 italic leading-tight">{med.baseWeight}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.gramPos === 2 ? 'bg-blue-100 text-blue-700' : med.spectrum.gramPos === 1 ? 'bg-blue-50 text-blue-400 border border-blue-200' : 'bg-slate-100 text-slate-300'}`}>Gram+</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.gramNeg === 2 ? 'bg-emerald-100 text-emerald-700' : med.spectrum.gramNeg === 1 ? 'bg-emerald-50 text-emerald-400 border border-emerald-200' : 'bg-slate-100 text-slate-300'}`}>Gram-</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.anaerobes === 2 ? 'bg-purple-100 text-purple-700' : med.spectrum.anaerobes === 1 ? 'bg-purple-50 text-purple-400 border border-purple-200' : 'bg-slate-100 text-slate-300'}`}>Anaerobes</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.pseudomonas === 2 ? 'bg-orange-100 text-orange-700' : med.spectrum.pseudomonas === 1 ? 'bg-orange-50 text-orange-400 border border-orange-200' : 'bg-slate-100 text-slate-300'}`}>Pseudo</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.mrsa === 2 ? 'bg-rose-100 text-rose-700' : med.spectrum.mrsa === 1 ? 'bg-rose-50 text-rose-400 border border-rose-200' : 'bg-slate-100 text-slate-300'}`}>MRSA</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{med.notes}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
