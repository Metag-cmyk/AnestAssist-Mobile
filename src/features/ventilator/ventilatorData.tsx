import React from 'react';
import { Waves } from 'lucide-react';

export type ClinicalCondition = 'standard' | 'ards' | 'obstructive' | 'neuro' | 'restrictive' | 'cardiogenic' | 'neuromuscular' | 'pregnancy' | 'laparoscopy' | 'olv' | 'trauma';

export interface ARDSNetRow {
  fio2: number;
  peep: number;
}

export type ARDSSeverity = 'none' | 'mild' | 'moderate' | 'severe';

export const getARDSClassification = (pao2: number, fio2: number): { severity: ARDSSeverity; ratio: number; advice: string } => {
  if (!pao2 || !fio2) return { severity: 'none', ratio: 0, advice: '' };
  
  const fio2Decimal = fio2 <= 1 ? fio2 : fio2 / 100;
  const ratio = Math.round(pao2 / fio2Decimal);
  
  if (ratio > 300) return { severity: 'none', ratio, advice: 'No ARDS (Normal P/F Ratio > 300)' };
  
  if (ratio > 200) return { 
    severity: 'mild', 
    ratio, 
    advice: 'MILD ARDS (200 < P/F ≤ 300). Focus on PEEP titration and lung protection.' 
  };
  
  if (ratio > 100) return { 
    severity: 'moderate', 
    ratio, 
    advice: 'MODERATE ARDS (100 < P/F ≤ 200). Consider prone positioning and higher PEEP.' 
  };
  
  return { 
    severity: 'severe', 
    ratio, 
    advice: 'SEVERE ARDS (P/F ≤ 100). Consider early prone, neuromuscular blockade, and ECMO evaluation.' 
  };
};

export const ARDS_LOW_PEEP: ARDSNetRow[] = [
  { fio2: 0.3, peep: 5 }, { fio2: 0.4, peep: 5 }, { fio2: 0.4, peep: 8 },
  { fio2: 0.5, peep: 8 }, { fio2: 0.5, peep: 10 }, { fio2: 0.6, peep: 10 },
  { fio2: 0.7, peep: 10 }, { fio2: 0.7, peep: 12 }, { fio2: 0.7, peep: 14 },
  { fio2: 0.8, peep: 14 }, { fio2: 0.9, peep: 14 }, { fio2: 0.9, peep: 16 },
  { fio2: 0.9, peep: 18 }, { fio2: 1.0, peep: 18 }, { fio2: 1.0, peep: 20 },
  { fio2: 1.0, peep: 22 }, { fio2: 1.0, peep: 24 }
];

export const ARDS_HIGH_PEEP: ARDSNetRow[] = [
  { fio2: 0.3, peep: 12 }, { fio2: 0.3, peep: 14 }, { fio2: 0.4, peep: 14 },
  { fio2: 0.4, peep: 16 }, { fio2: 0.5, peep: 16 }, { fio2: 0.5, peep: 18 },
  { fio2: 0.5, peep: 20 }, { fio2: 0.6, peep: 20 }, { fio2: 0.7, peep: 20 },
  { fio2: 0.8, peep: 20 }, { fio2: 0.8, peep: 22 }, { fio2: 0.9, peep: 22 },
  { fio2: 1.0, peep: 22 }, { fio2: 1.0, peep: 24 }
];

export const getTargetVolumes = (conditionType: ClinicalCondition, ibw: number) => {
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

export const getStrategyDetails = (cond: ClinicalCondition) => {
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
        targets: 'Plateau < 30 cmH2O. Permissive hypercapnia is acceptable. Target SpO2 88-95%.',
        aprv: { phigh: 'P-Plat target', plow: '0 cmH2O', thigh: '4-6s', tlow: '0.5-0.8s' }
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

export const getWaveform = (cond: ClinicalCondition) => {
  let pPath="M 10 40 L 20 10 L 40 10 L 50 40 L 90 40"; 
  let fPath="M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25"; 
  let pvPath="M 20 80 Q 40 20 60 20 Q 50 85 20 80"; 

  switch (cond) {
    case 'laparoscopy':
      pPath = "M 10 35 L 20 5 L 40 5 L 50 35 L 90 35"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
      pvPath = "M 45 80 Q 60 40 85 40 Q 65 90 45 80"; 
      break;
    case 'pregnancy':
      pPath = "M 10 40 L 20 15 L 40 15 L 50 40 L 90 40";
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 75 25 L 90 25"; 
      pvPath = "M 30 80 Q 50 30 75 30 Q 55 90 30 80"; 
      break;
    case 'trauma':
      pPath = "M 10 45 L 20 25 L 40 25 L 50 45 L 90 45"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
      pvPath = "M 15 90 Q 40 40 65 40 Q 45 95 15 90";
      break;
    case 'obstructive':
      pPath = "M 10 40 L 15 15 L 40 15 L 50 40 L 90 40";
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 85 30 L 90 30"; 
      pvPath = "M 20 60 Q 50 10 80 15 Q 50 70 20 60"; 
      break;
    case 'ards':
    case 'restrictive':
    case 'olv':
      pPath = "M 10 40 L 20 5 L 30 15 L 40 15 L 50 40 L 90 40"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 40 L 70 25 L 90 25";
      pvPath = "M 35 80 Q 55 60 85 60 Q 65 85 35 80"; 
      break;
    case 'neuromuscular':
      pPath = "M 5 40 L 10 45 L 15 10 L 40 10 L 50 40 L 90 40"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
      pvPath = "M 20 85 L 15 85 Q 35 25 60 25 Q 50 90 20 85"; 
      break;
    case 'cardiogenic':
      pPath = "M 10 30 L 20 5 L 40 5 L 50 30 L 90 30"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
      pvPath = "M 40 80 Q 55 30 75 30 Q 60 85 40 80"; 
      break;
    case 'standard':
    case 'neuro':
    default:
      pPath = "M 10 40 L 20 15 L 40 15 L 50 40 L 90 40"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 40 L 80 25 L 90 25";
      pvPath = "M 20 80 Q 40 25 65 25 Q 50 85 20 80"; 
      break;
  }

  return { pPath, fPath, pvPath };
};
