import { useState } from 'react';
import { Droplets, Activity, AlertTriangle, Gauge, FlaskConical } from 'lucide-react';
import { usePatient } from '../../contexts/PatientContext';
import { PatientParameterCard } from '../../components/PatientParameterCard';
import { pulsePressureVariation, correctedCalcium, correctedSodium } from '../../lib/fluidCalculators';

export default function FluidsModule() {
  const { weightNum } = usePatient();
  const [startHct, setStartHct] = useState<number>(45);
  const [targetHct, setTargetHct] = useState<number>(30);
  const [fastingHours, setFastingHours] = useState<number>(8);

  // Fluid responsiveness
  const [ppMax, setPpMax] = useState<number>(120);
  const [ppMin, setPpMin] = useState<number>(104);
  const ppv = pulsePressureVariation(ppMax, ppMin);

  // Electrolyte corrections
  const [calcium, setCalcium] = useState<number>(8.0);
  const [albumin, setAlbumin] = useState<number>(3.0);
  const [sodium, setSodium] = useState<number>(135);
  const [glucose, setGlucose] = useState<number>(180);
  const adjCalcium = correctedCalcium(calcium, albumin);
  const adjSodium = correctedSodium(sodium, glucose);

  // EBV (Estimated Blood Volume) - using 70 ml/kg for average adult as default approximation
  const ebv = weightNum * 70;

  // MABL (Maximum Allowable Blood Loss)
  const mabl = ebv * ((startHct - targetHct) / startHct);

  // 4-2-1 Rule for maintenance fluids
  const getMaintenanceRate = (w: number) => {
    if (w <= 10) return w * 4;
    if (w <= 20) return 40 + ((w - 10) * 2);
    return 60 + (w - 20);
  };

  const maintenanceRate = getMaintenanceRate(weightNum);
  const fastingDeficit = maintenanceRate * fastingHours;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <PatientParameterCard showHeight={false} showAge={false} />

      {/* Input Parameters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-800">Hematology & Fasting</h3>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Starting Hct (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={startHct}
              onChange={(e) => setStartHct(Number(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Target Hct (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={targetHct}
              onChange={(e) => setTargetHct(Number(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Fasting Hours</label>
            <input
              type="number"
              min="0"
              value={fastingHours}
              onChange={(e) => setFastingHours(Number(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </div>

      {/* MABL & Fluids Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MABL */}
        <div className="bg-red-50/50 rounded-xl shadow-sm border border-red-100 overflow-hidden">
          <div className="p-4 border-b border-red-100 bg-red-50 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-red-900">Blood Management</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-end border-b border-red-100 pb-2">
              <span className="text-sm font-medium text-red-800">Estimated Blood Vol (EBV)</span>
              <span className="text-lg font-bold text-red-600">{Math.round(ebv)} <span className="text-sm font-normal text-red-500">mL</span></span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-red-800">Max Allowable Blood Loss (MABL)</span>
              <span className="text-2xl font-bold text-red-600">{Math.max(0, Math.round(mabl))} <span className="text-sm font-normal text-red-500">mL</span></span>
            </div>
          </div>
        </div>

        {/* Maintenance Fluids */}
        <div className="bg-indigo-50/50 rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
          <div className="p-4 border-b border-indigo-100 bg-indigo-50 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-indigo-900">Fluid Management (4-2-1)</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-end border-b border-indigo-100 pb-2">
              <span className="text-sm font-medium text-indigo-800">Maintenance Rate</span>
              <span className="text-lg font-bold text-indigo-600">{Math.round(maintenanceRate)} <span className="text-sm font-normal text-indigo-500">mL/hr</span></span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-indigo-800">Fasting Deficit</span>
              <span className="text-2xl font-bold text-indigo-600">{Math.round(fastingDeficit)} <span className="text-sm font-normal text-indigo-500">mL</span></span>
            </div>
            <p className="text-xs text-indigo-700 italic mt-2 text-center">Replace 1/2 deficit in 1st hour, 1/4 in 2nd, 1/4 in 3rd.</p>
          </div>
        </div>
      </div>

       {/* Fluid Responsiveness */}
       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
           <Gauge className="w-5 h-5 text-indigo-600" />
           <h3 className="font-bold text-slate-800">Fluid Responsiveness (Dynamic Indices)</h3>
         </div>
         <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-4">
             <div className="grid grid-cols-2 gap-3">
               <div>
                 <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Pulse Pressure Max (mmHg)</label>
                 <input type="number" value={ppMax} onChange={(e) => setPpMax(Number(e.target.value) || 0)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20" />
               </div>
               <div>
                 <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Pulse Pressure Min (mmHg)</label>
                 <input type="number" value={ppMin} onChange={(e) => setPpMin(Number(e.target.value) || 0)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20" />
               </div>
             </div>
             <div aria-live="polite" className={`p-4 rounded-xl border ${ppv >= 13 ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
               <div className="flex items-baseline justify-between">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pulse Pressure Variation</span>
                 <span className={`text-3xl font-black ${ppv >= 13 ? 'text-emerald-700' : 'text-slate-700'}`}>{ppv.toFixed(1)}%</span>
               </div>
               <p className="text-[11px] text-slate-600 mt-1">
                 {ppv >= 13
                   ? 'Likely fluid responsive (> 13%) — valid if mechanically ventilated, sinus rhythm and VT ≥ 8 mL/kg PBW.'
                   : 'Below the 13% threshold — fluid responsiveness unlikely.'}
               </p>
             </div>
           </div>
           <div className="space-y-2 text-xs">
             <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-1">Other dynamic markers</h4>
             <ul className="space-y-2 text-slate-600">
               <li className="flex gap-2"><span className="text-indigo-400">•</span> SVV &gt; 13% — stroke-volume variation on a monitored arterial line.</li>
               <li className="flex gap-2"><span className="text-indigo-400">•</span> IVC collapsibility &gt; 50% (spontaneous) or distensibility &gt; 18% (ventilated).</li>
               <li className="flex gap-2"><span className="text-indigo-400">•</span> Passive leg raise / fluid challenge → &gt; 10% rise in cardiac output.</li>
               <li className="flex gap-2"><span className="text-indigo-400">•</span> Dynamic indices require: mechanical ventilation, sinus rhythm, no spontaneous effort, adequate VT.</li>
             </ul>
           </div>
         </div>
       </div>

       {/* Electrolyte corrections */}
       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
           <FlaskConical className="w-5 h-5 text-indigo-600" />
           <h3 className="font-bold text-slate-800">Electrolyte Corrections</h3>
         </div>
         <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3" aria-live="polite">
             <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Albumin-corrected calcium</h4>
             <div className="grid grid-cols-2 gap-3">
               <div>
                 <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Ca²⁺ (mg/dL)</label>
                 <input type="number" step="0.1" value={calcium} onChange={(e) => setCalcium(Number(e.target.value) || 0)}
                   className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20" />
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Albumin (g/dL)</label>
                 <input type="number" step="0.1" value={albumin} onChange={(e) => setAlbumin(Number(e.target.value) || 0)}
                   className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20" />
               </div>
             </div>
             <div className="flex items-baseline justify-between border-t border-slate-200 pt-2">
               <span className="text-xs font-medium text-slate-500">Corrected Ca²⁺</span>
               <span className="text-xl font-black text-indigo-700">{adjCalcium.toFixed(2)} <span className="text-xs font-normal">mg/dL</span></span>
             </div>
             <p className="text-[10px] italic text-slate-400">Ca + 0.8 × (4.0 − albumin g/dL).</p>
           </div>

           <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3" aria-live="polite">
             <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Glucose-corrected sodium</h4>
             <div className="grid grid-cols-2 gap-3">
               <div>
                 <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Na⁺ (mmol/L)</label>
                 <input type="number" value={sodium} onChange={(e) => setSodium(Number(e.target.value) || 0)}
                   className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20" />
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Glucose (mg/dL)</label>
                 <input type="number" value={glucose} onChange={(e) => setGlucose(Number(e.target.value) || 0)}
                   className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20" />
               </div>
             </div>
             <div className="flex items-baseline justify-between border-t border-slate-200 pt-2">
               <span className="text-xs font-medium text-slate-500">Corrected Na⁺</span>
               <span className="text-xl font-black text-indigo-700">{adjSodium.toFixed(1)} <span className="text-xs font-normal">mmol/L</span></span>
             </div>
             <p className="text-[10px] italic text-slate-400">Na + 0.016 × (glucose mg/dL − 100).</p>
           </div>
         </div>
         <div className="px-5 pb-5">
           <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
             <strong className="text-slate-800">Potassium replacement guide:</strong> K⁺ 3.0–3.5 → ~20–40 mmol; 2.5–3.0 → ~40–60 mmol; &lt; 2.5 → 60–80 mmol.
             Peripheral line max 40 mmol/L and 20 mmol/h; central line up to 40 mmol/h with continuous ECG monitoring. Always correct hypomagnesaemia concurrently.
           </div>
         </div>
       </div>

       {/* MTP Quick Reference */}
       <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex gap-3 items-start">
         <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
         <div>
           <h3 className="font-bold text-slate-800 text-sm">Massive Transfusion Protocol (MTP)</h3>
           <p className="text-xs text-slate-600 mt-1">Definition: Replacement of &gt;1 blood volume in 24h, or &gt;50% in 4h.<br/>Goal Ratio: 1:1:1 (PRBC : FFP : Platelets).<br/>Remember to monitor and treat: Hypothermia, Acidosis, Hypocalcemia (administer Calcium after every few units of blood products).</p>
         </div>
       </div>

    </div>
  );
}

