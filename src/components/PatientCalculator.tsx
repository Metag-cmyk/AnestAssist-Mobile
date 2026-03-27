import { useState, useMemo } from 'react';
import { UserPlus, Scale, Activity, AlertTriangle, Info, ChevronDown, ChevronUp, ShieldX, ShieldCheck, Zap, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

type PatientType = 'adult' | 'pediatric' | 'neonatal';

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
  const [type, setType] = useState<PatientType>('adult');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [showDrugs, setShowDrugs] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [useIBW, setUseIBW] = useState(false);
  const [manualCrcl, setManualCrcl] = useState<string>('');
  const [showAntibiotics, setShowAntibiotics] = useState(true);
  const [showCardio, setShowCardio] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const calculations = useMemo(() => {
    let ibwValue = 0;
    let percentileInfo = "";
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    if (type === 'adult') {
      const heightInInches = height / 2.54;
      const inchesOver5ft = Math.max(0, heightInInches - 60);
      ibwValue = gender === 'male' ? 50 + 2.3 * inchesOver5ft : 45.5 + 2.3 * inchesOver5ft;
      
      if (bmi < 18.5) percentileInfo = "Underweight";
      else if (bmi < 25) percentileInfo = "Normal weight";
      else if (bmi < 30) percentileInfo = "Overweight";
      else percentileInfo = "Obese";
    } else if (type === 'neonatal' || (type === 'pediatric' && age < 1)) {
      const ageMonths = type === 'neonatal' ? age / 30 : age;
      ibwValue = (0.5 * ageMonths) + 4;
      percentileInfo = "Neonatal/Infant: Use WHO Growth Charts";
    } else {
      if (age >= 1 && age <= 5) {
        ibwValue = (age * 2) + 8;
      } else if (age >= 6 && age <= 12) {
        ibwValue = (age * 3) + 7;
      } else {
        const heightInInches = height / 2.54;
        const inchesOver5ft = Math.max(0, heightInInches - 60);
        ibwValue = gender === 'male' ? 50 + 2.3 * inchesOver5ft : 45.5 + 2.3 * inchesOver5ft;
      }

      if (bmi < 14) percentileInfo = "< 5th Percentile (Underweight)";
      else if (bmi < 18) percentileInfo = "5th - 85th Percentile (Healthy)";
      else if (bmi < 21) percentileInfo = "85th - 95th Percentile (Overweight)";
      else percentileInfo = "> 95th Percentile (Obese)";
    }
    let baseCrcl = 120;
    if (type === 'adult') {
      const assumedScr = 0.9;
      let cg = ((140 - age) * weight) / (72 * assumedScr);
      if (gender === 'female') cg = cg * 0.85;
      baseCrcl = Math.max(10, Math.min(200, cg));
    } else {
      const assumedScr = 0.4;
      baseCrcl = (0.413 * height) / assumedScr;
      baseCrcl = Math.max(10, Math.min(200, baseCrcl));
    }

    return { 
      ibw: ibwValue.toFixed(1), 
      bmi: bmi.toFixed(1), 
      category: percentileInfo, 
      rawIbw: ibwValue,
      defaultCrcl: baseCrcl
    };
  }, [type, weight, height, gender, age]);

  const targetWeight = useIBW ? calculations.rawIbw : weight;
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
    const actW = weight;
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
  }, [weight, calculations.rawIbw, activeCrcl]);

  const cardioDrugs = useMemo(() => {
    const w = targetWeight;
    return [
      {
        name: "Amiodarone", route: "IV", class: "Class III Antiarrhythmic",
        dose: "Load: 150mg over 10 min. Maint: 1 mg/min x 6h, then 0.5 mg/min x 18h",
        notes: "For VT/VF/AFib. Can cause hypotension and bradycardia.",
        calculated: `Load: 150mg | Maint: 1 mg/min (60 mg/hr)`
      },
      {
        name: "Amiodarone (PO)", route: "PO", class: "Class III Antiarrhythmic",
        dose: "Load: 400mg PO TID x 1-2 weeks. Maint: 100-200mg PO daily.",
        notes: "Long half-life. Monitor QT interval and thyroid/lung function.",
        calculated: `Standard Dosing`
      },
      {
        name: "Metoprolol Tartrate", route: "IV", class: "Beta-1 Blocker",
        dose: "2.5-5 mg IV every 5 mins (Max 15mg)",
        notes: "Rate control for AFib/Flutter or acute ischemia.",
        calculated: `5mg IV push`
      },
      {
        name: "Metoprolol Succinate", route: "PO", class: "Beta-1 Blocker",
        dose: "25-100 mg PO daily",
        notes: "Extended release. Do not crush.",
        calculated: `Standard Dosing`
      },
      {
        name: "Esmolol", route: "IV", class: "Beta-1 Blocker (Ultrashort)",
        dose: "Load: 500 mcg/kg over 1 min. Maint: 50-300 mcg/kg/min",
        notes: "Half-life ~9 mins. Great for rapid, titratable BP/HR control.",
        calculated: `Load: ${(w * 500 / 1000).toFixed(1)} mg | Maint: ${(w * 50).toFixed(0)}-${(w * 300).toFixed(0)} mcg/min`
      },
      {
        name: "Labetalol", route: "IV", class: "Alpha/Beta Blocker",
        dose: "10-20 mg IV initial, then 20-80 mg IV every 10 mins (Max 300mg)",
        notes: "Drops BP without reflex tachycardia. Infusion: 1-2 mg/min.",
        calculated: `10-20mg IV push`
      },
      {
        name: "Labetalol (PO)", route: "PO", class: "Alpha/Beta Blocker",
        dose: "100-200 mg PO BID",
        notes: "Max 2400mg/day. Often used in pregnancy.",
        calculated: `Standard Dosing`
      },
      {
        name: "Diltiazem", route: "IV", class: "Calcium Channel Blocker",
        dose: "Load: 0.25 mg/kg. Maint: 5-15 mg/hr",
        notes: "First-line rate control for AFib. Avoid in HFrEF.",
        calculated: `Load: ${(w * 0.25).toFixed(1)} mg | Maint: 5-15 mg/hr`
      },
      {
        name: "Nicardipine", route: "IV", class: "Dihydropyridine CCB",
        dose: "5 mg/hr, increase by 2.5 mg/hr every 5-15 mins (Max 15 mg/hr)",
        notes: "Potent arterial vasodilator. Reliable BP titration.",
        calculated: `Start at 5 mg/hr`
      },
      {
        name: "Milrinone", route: "IV", class: "PDE3 Inhibitor (Inodilator)",
        dose: "Load: 50 mcg/kg (often omitted). Maint: 0.375-0.75 mcg/kg/min",
        notes: "Increases contractility whilst dropping SVR. Requires renal adjustment.",
        calculated: `Maint: ${(w * 0.375).toFixed(1)}-${(w * 0.75).toFixed(1)} mcg/min`
      },
      {
        name: "Dobutamine", route: "IV", class: "Beta-1/2 Agonist",
        dose: "2-20 mcg/kg/min",
        notes: "Potent pure inotrope. Can cause tachycardia and arrhthymias.",
        calculated: `${(w * 2).toFixed(0)}-${(w * 20).toFixed(0)} mcg/min`
      },
      {
        name: "Digoxin", route: "IV/PO", class: "Cardiac Glycoside",
        dose: "Load: 0.25-0.5 mg IV/PO, followed by 0.25 mg q6h x 2. Maint: 0.125-0.25 mg daily",
        notes: "Reduce maintenance dose strongly in renal failure (CrCl < 50).",
        calculated: `Standard Dosing`
      }
    ];
  }, [targetWeight]);

  const equipmentSizes = useMemo(() => {
    if (type === 'adult') return null;
    
    let ett = 0;
    let depth = 0;
    let lma = 0;
    let blade = 0;

    if (type === 'neonatal') {
      ett = age < 30 ? 3.0 : 3.5;
      depth = 9;
      lma = 1;
      blade = 0;
    } else {
      // Pediatric formulas
      ett = (age / 4) + 4; // Uncuffed
      depth = (age / 2) + 12;
      
      if (weight < 5) lma = 1;
      else if (weight < 10) lma = 1.5;
      else if (weight < 20) lma = 2;
      else if (weight < 30) lma = 2.5;
      else lma = 3;

      if (age < 1) blade = 1;
      else if (age < 5) blade = 2;
      else blade = 3;
    }

    return { ett: ett.toFixed(1), depth: depth.toFixed(1), lma, blade };
  }, [type, age, weight]);

  const resetData = () => {
    setType('adult');
    setAge(30);
    setWeight(70);
    setHeight(175);
    setGender('male');
    setUseIBW(false);
    setManualCrcl('');
    showToast(t('patient.toastReset'));
  };

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
    if (type === 'pediatric' && age < 1) return t('patient.months');
    return t('patient.years');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-medical-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-medical-accent" />
            {t('patient.title')}
          </h2>
          <button 
            onClick={resetData}
            className="text-xs font-bold text-slate-400 hover:text-medical-accent transition-colors uppercase tracking-widest"
          >
            {t('patient.reset')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('patient.type')}</label>
            <div className="flex flex-col gap-1">
              {(['adult', 'pediatric', 'neonatal'] as PatientType[]).map((tVal) => (
                <button
                  key={tVal}
                  onClick={() => setType(tVal)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border transition-all ${
                    type === tVal ? 'bg-medical-primary text-white border-medical-primary' : 'bg-white text-slate-500 border-medical-border hover:bg-slate-50'
                  }`}
                >
                  {tVal}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              {t('patient.age')} ({getAgeLabel()})
            </label>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-2 border border-medical-border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('patient.weight')}</label>
            <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full p-2 border border-medical-border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('patient.height')}</label>
            <input 
              type="number" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full p-2 border border-medical-border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('patient.gender')}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                  gender === 'male' ? 'bg-medical-accent text-white border-medical-accent' : 'bg-white text-slate-600 border-medical-border hover:bg-slate-50'
                }`}
              >
                {t('patient.male')}
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                  gender === 'female' ? 'bg-medical-accent text-white border-medical-accent' : 'bg-white text-slate-600 border-medical-border hover:bg-slate-50'
                }`}
              >
                {t('patient.female')}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              CrCl (mL/min)
            </label>
            <div className="relative">
              <input 
                type="number" 
                placeholder={calculations.defaultCrcl.toFixed(0)}
                value={manualCrcl} 
                onChange={(e) => setManualCrcl(e.target.value)}
                className="w-full p-2 border border-medical-border rounded-lg text-sm bg-white"
              />
              {!manualCrcl && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none">
                  (Auto: {calculations.defaultCrcl.toFixed(0)})
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-medical-border text-center">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t('patient.ibw')}</p>
            <p className="text-2xl font-bold text-medical-primary">{calculations.ibw} <span className="text-sm font-normal">kg</span></p>
            {type !== 'adult' && <p className="text-[10px] text-slate-400 mt-1">{t('patient.apls')}</p>}
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-medical-border text-center">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">
              {type === 'adult' ? t('patient.bmi') : t('patient.bmiPercentile')}
            </p>
            <p className="text-2xl font-bold text-medical-primary">{calculations.bmi}</p>
            <p className="text-xs text-medical-accent font-medium">{calculations.category}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <p className="text-xs font-bold text-blue-400 uppercase mb-1">{t('patient.targetWeight')}</p>
            <p className="text-2xl font-bold text-blue-700 mb-2">{targetWeight.toFixed(1)} <span className="text-sm font-normal">kg</span></p>
            <div className="flex bg-white/50 p-1 rounded-lg border border-blue-200">
              <button
                onClick={() => setUseIBW(false)}
                className={`flex-1 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                  !useIBW ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-400 hover:text-blue-600'
                }`}
              >
                {t('patient.actual')}
              </button>
              <button
                onClick={() => setUseIBW(true)}
                className={`flex-1 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                  useIBW ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-400 hover:text-blue-600'
                }`}
              >
                {t('patient.ideal')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {equipmentSizes && (
        <div className="bg-white p-6 rounded-xl border border-medical-border shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-medical-primary">
            <Activity className="w-5 h-5 text-medical-accent" />
            {t('patient.equipmentTitle')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-medical-border text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('patient.ettSize')}</p>
              <p className="text-xl font-bold text-medical-primary">{equipmentSizes.ett}</p>
              <p className="text-[10px] text-slate-400 mt-1">{t('patient.cuffedNote')}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-medical-border text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('patient.ettDepth')}</p>
              <p className="text-xl font-bold text-medical-primary">{equipmentSizes.depth} <span className="text-xs font-normal">cm</span></p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-medical-border text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('patient.lmaSize')}</p>
              <p className="text-xl font-bold text-medical-primary">{equipmentSizes.lma}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-medical-border text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('patient.blade')}</p>
              <p className="text-xl font-bold text-medical-primary">{equipmentSizes.blade}</p>
              <p className="text-[10px] text-slate-400 mt-1">{t('patient.millerNote')}</p>
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
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.gramNeg === 2 ? 'bg-rose-100 text-rose-700' : med.spectrum.gramNeg === 1 ? 'bg-rose-50 text-rose-400 border border-rose-200' : 'bg-slate-100 text-slate-300'}`}>Gram-</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.anaerobes === 2 ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-300'}`}>Anaerobic</span>
                        {med.spectrum.mrsa > 0 && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700`}>MRSA</span>
                        )}
                        {med.spectrum.pseudomonas > 0 && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-700`}>Pseudomonas</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      {med.notes}
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
          onClick={() => setShowCardio(!showCardio)}
          className="w-full px-6 py-4 flex items-center justify-between bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-rose-900">Cardiovascular & Hemodynamic Medications</h3>
          </div>
          {showCardio ? <ChevronUp className="w-5 h-5 text-rose-700" /> : <ChevronDown className="w-5 h-5 text-rose-700" />}
        </div>

        {showCardio && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-medical-border">
                <tr>
                  <th className="px-6 py-3 font-semibold text-slate-600">Medication</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Standard Dose</th>
                  <th className="px-6 py-3 font-semibold text-rose-600">Calculated Dose</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Clinical Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-medical-border">
                {cardioDrugs.map((med, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-rose-800">{med.name}</p>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.route === 'IV' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {med.route}
                        </span>
                      </div>
                      <p className="text-[10px] text-rose-600/70 font-bold uppercase tracking-wider mt-0.5">{med.class}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {med.dose}
                    </td>
                    <td className="px-6 py-4">
                      {med.calculated !== 'Standard Dosing' ? (
                        <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-full font-bold w-fit">
                          {med.calculated}
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full font-bold w-fit">
                          {med.calculated}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      {med.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3 items-start">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-bold mb-1">{t('patient.disclaimerTitle')}:</p>
          <p>{t('patient.disclaimerText')}</p>
        </div>
      </div>
    </div>
  );
}
