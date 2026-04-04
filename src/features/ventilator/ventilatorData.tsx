import React from 'react';
import { Waves } from 'lucide-react';

export type ClinicalCondition = 'standard' | 'ards' | 'obstructive' | 'neuro' | 'restrictive' | 'cardiogenic' | 'neuromuscular' | 'pregnancy' | 'laparoscopy' | 'olv' | 'trauma';

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
        targets: 'Plateau < 30 cmH2O. Permissive hypercapnia is acceptable. Target SpO2 88-95%.'
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
  let pvPath="M 20 80 Q 40 20 60 20 Q 50 85 20 80"; // Standard Loop

  switch (cond) {
    case 'laparoscopy':
      pPath = "M 10 35 L 20 5 L 40 5 L 50 35 L 90 35"; // Steep pressure rise
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
      pvPath = "M 45 80 Q 60 40 85 40 Q 65 90 45 80"; // Shifted right, flattened
      break;
    case 'pregnancy':
      pPath = "M 10 40 L 20 15 L 40 15 L 50 40 L 90 40";
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 75 25 L 90 25"; // Rapid exp flow
      pvPath = "M 30 80 Q 50 30 75 30 Q 55 90 30 80"; 
      break;
    case 'trauma':
      pPath = "M 10 45 L 20 25 L 40 25 L 50 45 L 90 45"; // Low PEEP, cautious rise
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
      pvPath = "M 15 90 Q 40 40 65 40 Q 45 95 15 90";
      break;
    case 'obstructive':
      pPath = "M 10 40 L 15 15 L 40 15 L 50 40 L 90 40";
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 85 30 L 90 30"; 
      pvPath = "M 20 60 Q 50 10 80 15 Q 50 70 20 60"; // Wider (Resistance), Higher Baseline (PEEPi)
      break;
    case 'ards':
    case 'restrictive':
    case 'olv':
      pPath = "M 10 40 L 20 5 L 30 15 L 40 15 L 50 40 L 90 40"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 40 L 70 25 L 90 25";
      pvPath = "M 35 80 Q 55 60 85 60 Q 65 85 35 80"; // Flattened (Low Compliance), Shifted Right
      break;
    case 'neuromuscular':
      pPath = "M 5 40 L 10 45 L 15 10 L 40 10 L 50 40 L 90 40"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
      pvPath = "M 20 85 L 15 85 Q 35 25 60 25 Q 50 90 20 85"; // Small trigger dip
      break;
    case 'cardiogenic':
      pPath = "M 10 30 L 20 5 L 40 5 L 50 30 L 90 30"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
      pvPath = "M 40 80 Q 55 30 75 30 Q 60 85 40 80"; // High PEEP Shift
      break;
    case 'standard':
    case 'neuro':
    default:
      pPath = "M 10 40 L 20 15 L 40 15 L 50 40 L 90 40"; 
      fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 40 L 80 25 L 90 25";
      pvPath = "M 20 80 Q 40 25 65 25 Q 50 85 20 80"; // Standard
      break;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
        <Waves className="w-4 h-4" /> 
        Diagnostic Scalars & Graphics
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative h-[140px] flex items-center justify-center">
          <span className="absolute top-2 left-3 text-[10px] font-bold text-yellow-500 uppercase">Pressure (cmH2O)</span>
          <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-md">
            <line x1="0" y1="10" x2="100" y2="10" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="40" x2="100" y2="40" stroke="#fbbf24" strokeWidth="0.5" />
            <path d={pPath} fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {cond === 'neuromuscular' && (
              <circle cx="10" cy="45" r="3" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
            )}
            {(cond === 'ards' || cond === 'restrictive') && (
              <circle cx="20" cy="5" r="3" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
            )}
          </svg>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative h-[140px] flex items-center justify-center">
          <span className="absolute top-2 left-3 text-[10px] font-bold text-emerald-400 uppercase">Flow (L/min)</span>
          {cond === 'obstructive' && (
            <span className="absolute bottom-2 right-3 text-[10px] font-bold text-red-400 animate-pulse bg-red-900/50 px-2 py-0.5 rounded">AUTO-PEEP WARNING</span>
          )}
          <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-md">
            <line x1="0" y1="25" x2="100" y2="25" stroke="#34d399" strokeWidth="0.5" />
            <path d={fPath} fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {cond === 'obstructive' && (
              <circle cx="90" cy="30" r="3" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-pulse" />
            )}
          </svg>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative h-[140px] flex items-center justify-center">
          <span className="absolute top-2 left-3 text-[10px] font-bold text-indigo-400 uppercase">P/V Loop (Dyn Compliance)</span>
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
            <line x1="0" y1="20" x2="100" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="20" y1="0" x2="20" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="80" y1="0" x2="80" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="5" y1="95" x2="95" y2="95" stroke="#818cf8" strokeWidth="1" />
            <line x1="5" y1="5" x2="5" y2="95" stroke="#818cf8" strokeWidth="1" />
            <path d={pvPath} fill="rgba(129, 140, 248, 0.1)" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {(cond === 'ards' || cond === 'restrictive') && (
              <path d="M 35 80 L 85 60" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1" strokeDasharray="2" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
