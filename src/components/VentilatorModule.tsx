import React, { useState } from 'react';
import { Wind, Ruler, ActivitySquare, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ClinicalCondition = 'standard' | 'ards' | 'obstructive' | 'neuro' | 'restrictive' | 'cardiogenic' | 'neuromuscular';

export default function VentilatorModule() {
  const [heightCm, setHeightCm] = useState('170');
  const [isMale, setIsMale] = useState(true);
  const [condition, setCondition] = useState<ClinicalCondition>('standard');

  const calculateIBW = (height: number, male: boolean) => {
    if (!height || height < 100) return 0;
    if (male) {
      return 50 + 0.91 * (height - 152.4);
    } else {
      return 45.5 + 0.91 * (height - 152.4);
    }
  };

  const ibw = calculateIBW(parseFloat(heightCm) || 0, isMale);

  const getTargetVolumes = (conditionType: ClinicalCondition, ibw: number) => {
    if (ibw <= 0) return { min: 0, max: 0, label: '' };
    switch (conditionType) {
      case 'ards': 
      case 'restrictive': 
        return { min: Math.round(ibw * 4), max: Math.round(ibw * 6), label: '4-6 mL/kg IBW' };
      case 'cardiogenic':
      case 'standard': 
      case 'obstructive': 
      case 'neuro': 
        return { min: Math.round(ibw * 6), max: Math.round(ibw * 8), label: '6-8 mL/kg IBW' };
      case 'neuromuscular': 
        return { min: Math.round(ibw * 8), max: Math.round(ibw * 10), label: '8-10 mL/kg IBW (Avoid Atelectasis)' };
      default: return { min: 0, max: 0, label: '' };
    }
  };

  const targets = getTargetVolumes(condition, ibw);

  const getStrategyDetails = (cond: ClinicalCondition) => {
    switch (cond) {
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

  const strategy = getStrategyDetails(condition);

  // Helper to draw the conceptual Waveform SVG SVGs based on condition
  const getWaveform = (cond: ClinicalCondition) => {
    // We will draw simple paths for P(t) and F(t)
    // Scale: 0 to 100 x, 0 to 50 y
    
    let pPath="M 10 40 L 20 10 L 40 10 L 50 40 L 90 40"; // Default Volume Control (square flow, ascending pressure)
    let fPath="M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25"; // Square inspire, decelerate expire

    const baseLineP = 40; // Y
    const baseLineF = 25; // Y

    switch (cond) {
      case 'obstructive':
        pPath = "M 10 40 L 15 15 L 40 15 L 50 40 L 90 40";
        // Flow expires but doesn't reach 25 (baseline) before next breath starts (Auto-PEEP)
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 85 30 L 90 30"; 
        break;
      case 'ards':
      case 'restrictive':
        // High Peak Pressure, very steep
        pPath = "M 10 40 L 20 5 L 30 15 L 40 15 L 50 40 L 90 40"; 
        // Flow standard but might be shorter due to stiff lungs
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 40 L 70 25 L 90 25";
        break;
      case 'neuromuscular':
        // Negative deflection triggering breath
        pPath = "M 5 40 L 10 45 L 15 10 L 40 10 L 50 40 L 90 40"; 
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
        break;
      case 'cardiogenic':
        // High baseline PEEP (shifted up)
        pPath = "M 10 30 L 20 5 L 40 5 L 50 30 L 90 30"; 
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 45 L 80 25 L 90 25";
        break;
      case 'standard':
      case 'neuro':
      default:
        pPath = "M 10 40 L 20 15 L 40 15 L 50 40 L 90 40"; 
        fPath = "M 10 25 L 10 5 L 40 5 L 40 25 L 40 40 L 80 25 L 90 25";
        break;
    }

    return (
      <div className="flex flex-col gap-4 w-full">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
          <Waves className="w-4 h-4" /> 
          Diagnostic Scalars (Time)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pressure Time */}
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative h-[140px] flex items-center justify-center">
            <span className="absolute top-2 left-3 text-[10px] font-bold text-yellow-500 uppercase">Pressure (cmH2O)</span>
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-md">
              {/* Grid Lines */}
              <line x1="0" y1="10" x2="100" y2="10" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="#fbbf24" strokeWidth="0.5" />
              {/* Data Path */}
              <path d={pPath} fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Highlight Auto-PEEP or Trigger based on condition */}
              {cond === 'neuromuscular' && (
                <circle cx="10" cy="45" r="3" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
              )}
              {(cond === 'ards' || cond === 'restrictive') && (
                <circle cx="20" cy="5" r="3" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
              )}
            </svg>
          </div>

          {/* Flow Time */}
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative h-[140px] flex items-center justify-center">
            <span className="absolute top-2 left-3 text-[10px] font-bold text-emerald-400 uppercase">Flow (L/min)</span>
            {cond === 'obstructive' && (
              <span className="absolute bottom-2 right-3 text-[10px] font-bold text-red-400 animate-pulse bg-red-900/50 px-2 py-0.5 rounded">AUTO-PEEP WARNING</span>
            )}
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-md">
              {/* Baseline Flow zero */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#34d399" strokeWidth="0.5" />
              {/* Data Path */}
              <path d={fPath} fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Flow fails to reach zero (Auto-PEEP) marker */}
              {cond === 'obstructive' && (
                <circle cx="90" cy="30" r="3" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-pulse" />
              )}
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-sky-900 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 bg-gradient-to-r from-sky-800 to-sky-900 flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <Wind className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Ventilator Strategies</h2>
            <p className="text-sky-100/80 text-sm mt-1">Condition-based prescriptive ventilation parameters & scalar diagnostics.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col - Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <Ruler className="w-4 h-4 text-sky-600" />
              Patient Anthropometrics
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Sex</label>
                  <select 
                    value={isMale ? 'male' : 'female'} 
                    onChange={(e) => setIsMale(e.target.value === 'male')}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Height (cm)</label>
                  <input 
                    type="number" 
                    value={heightCm} 
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="bg-sky-50 p-4 rounded-xl flex justify-between items-center border border-sky-100 shadow-inner">
                  <span className="text-sm font-bold text-sky-900">Ideal Body Wt:</span>
                  <span className="text-2xl font-black text-sky-600">{ibw > 0 ? ibw.toFixed(1) : '--'} <span className="text-base font-bold">kg</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 relative">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
              <ActivitySquare className="w-4 h-4 text-sky-600" />
              Clinical Condition Match
            </h3>
            
            <div className="grid grid-cols-1 gap-1.5 mt-1 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
              <button onClick={() => setCondition('standard')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'standard' ? 'bg-sky-50 border-sky-300 text-sky-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Standard / Post-Op</button>
              <button onClick={() => setCondition('ards')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'ards' ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>ARDS (Acute Resp Distress)</button>
              <button onClick={() => setCondition('restrictive')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'restrictive' ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Restrictive (Fibrosis)</button>
              <button onClick={() => setCondition('obstructive')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'obstructive' ? 'bg-purple-50 border-purple-300 text-purple-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Obstructive (Asthma/COPD)</button>
              <button onClick={() => setCondition('cardiogenic')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'cardiogenic' ? 'bg-blue-50 border-blue-300 text-blue-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Cardiogenic Shock / Edema</button>
              <button onClick={() => setCondition('neuro')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'neuro' ? 'bg-indigo-50 border-indigo-300 text-indigo-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Neuro-Critical Care</button>
              <button onClick={() => setCondition('neuromuscular')} className={`text-left p-3 rounded-lg text-sm transition-colors border ${condition === 'neuromuscular' ? 'bg-teal-50 border-teal-300 text-teal-800 font-bold shadow-sm' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>Neuromuscular Weakness</button>
            </div>
          </div>
        </div>

        {/* Right Col - Outputs */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={condition}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">{strategy.title}</h3>
                <p className="text-slate-600 text-sm mt-1">{strategy.desc}</p>
              </div>

              <div className="p-6 flex-1 flex flex-col gap-6">
                
                {/* Visual Scalars */}
                {getWaveform(condition)}

                <hr className="border-slate-100" />

                {/* Tidal Volume Targets */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Tidal Volume ($V_t$) Target</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex-1 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-sky-800 mb-1">Strict Output ({targets?.label})</div>
                        <div className="text-3xl font-black text-sky-600">
                          {ibw > 0 ? `${targets.min} - ${targets.max}` : '---'} <span className="text-lg font-bold">mL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specific Settings Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Core Settings Dashboard</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Respiratory Rate (RR)</div>
                      <div className="font-semibold text-slate-800">{strategy.rr}</div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">PEEP Strategy</div>
                      <div className="font-semibold text-slate-800">{strategy.peep}</div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Target I:E Ratio</div>
                      <div className="font-semibold text-slate-800">{strategy.ie}</div>
                    </div>
                    <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Clinical Execution Targets</div>
                      <div className="font-semibold text-slate-800 text-sm leading-tight">{strategy.targets}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                  <p className="text-xs text-orange-800">
                    <strong>Disclaimer:</strong> Always interpret theoretical IBW-based tidal volumes and shapes within the clinical context of the patient. Monitor driving pressures (ΔP {'<'} 15 cmH2O) strictly.
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
