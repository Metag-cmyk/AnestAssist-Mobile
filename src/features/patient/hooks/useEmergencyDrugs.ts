import { useMemo } from 'react';
import { Drug } from '../types';

export const useEmergencyDrugs = (targetWeight: number): Drug[] => {
  return useMemo((): Drug[] => {
    const w = targetWeight;
    return [
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
  }, [targetWeight]);
};
