import { useMemo } from 'react';
import { Antibiotic } from '../types';

export const useAntibiotics = (weightKg: number | '', ibw: number, activeCrcl: number): Antibiotic[] => {
  return useMemo(() => {
    const actW = Number(weightKg) || 0;
    const currentIbw = ibw;
    const adjBW = actW > (1.2 * currentIbw) ? (currentIbw + 0.4 * (actW - currentIbw)) : actW;
    const currentCrcl = activeCrcl;

    return [
      {
        name: "Cefazolin",
        class: "1st Gen Cephalosporin",
        dose: actW > 120 ? "3g IV" : (actW > 80 ? "2g IV" : "1g IV"),
        interval: currentCrcl > 50 ? "q8h" : (currentCrcl >= 10 ? "q12h" : "q24h"),
        notes: "Standard surgical prophylaxis.",
        baseWeight: "Actual weight used for dosing.",
        spectrum: { gramPos: 2, gramNeg: 1, anaerobes: 0, mrsa: 0, pseudomonas: 0 }
      },
      {
        name: "Cefuroxime",
        class: "2nd Gen Cephalosporin",
        dose: "1.5g IV",
        interval: currentCrcl > 20 ? "q8h" : "q12-24h",
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
        dose: `Load: 4.5g IV | Maint: ${currentCrcl > 40 ? "4.5g IV" : (currentCrcl > 20 ? "3.375g IV" : "2.25g IV")}`,
        interval: currentCrcl > 40 ? "q6-8h" : "q6h",
        infusion: { 
          method: "Extended Infusion", 
          rate: "Load: infuse over 30 mins. Maint: infuse over 4 hours.", 
          alternative: "Begin maintenance dose 4 hours after loading dose completion." 
        },
        notes: "Prolonged infusion limits mortality in severe sepsis.",
        baseWeight: "Renally adjusted dose.",
        spectrum: { gramPos: 2, gramNeg: 2, anaerobes: 2, mrsa: 0, pseudomonas: 2 }
      },
      {
        name: "Meropenem",
        class: "Carbapenem",
        dose: `Load: 1g IV | Maint: ${currentCrcl > 50 ? "1g IV" : (currentCrcl >= 26 ? "1g IV" : "500mg IV")}`,
        interval: currentCrcl > 50 ? "q8h" : (currentCrcl >= 26 ? "q12h" : "q12h"),
        infusion: { 
          method: "Extended Infusion", 
          rate: "Load: infuse over 30 mins. Maint: infuse over 3 hours.", 
          alternative: "Begin maintenance dose 3 hours after loading dose completion." 
        },
        notes: "Reserved for ESBL or severe multi-drug resistant infections.",
        baseWeight: "Renally adjusted dose.",
        spectrum: { gramPos: 2, gramNeg: 2, anaerobes: 2, mrsa: 0, pseudomonas: 2 }
      },
      {
        name: "Vancomycin",
        class: "Glycopeptide",
        dose: `Load: ${(Math.min(2500, actW * 15)).toFixed(0)}-${(Math.min(2500, actW * 20)).toFixed(0)}mg | Maint: ${(Math.min(2000, actW * 15)).toFixed(0)}mg`,
        interval: currentCrcl > 90 ? "q8-12h" : (currentCrcl > 50 ? "q12-24h" : "q24-48h"),
        infusion: { 
          method: "Rate-Controlled Infusion", 
          rate: "Max rate 10-15 mg/min (Infuse over ≥ " + Math.max(60, Math.ceil(actW * 15 / 10)) + " mins).", 
          alternative: "Begin 1st maintenance dose exactly 1 interval period after loading dose." 
        },
        notes: "Target trough 15-20 mcg/mL. Infuse slowly to avoid red-man syndrome.",
        baseWeight: `Uses Actual Body Weight (${actW}kg). Renally adjusted interval.`,
        spectrum: { gramPos: 2, gramNeg: 0, anaerobes: 0, mrsa: 2, pseudomonas: 0 }
      },
      {
        name: "Gentamicin",
        class: "Aminoglycoside",
        dose: (adjBW * 2).toFixed(0) + " mg IV (Traditional Load)",
        interval: currentCrcl > 60 ? "q8h" : (currentCrcl > 40 ? "q12h" : "q24h"),
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
  }, [weightKg, ibw, activeCrcl]);
};
