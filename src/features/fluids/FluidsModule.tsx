import { useState } from 'react';
import { Droplets, Activity, AlertTriangle } from 'lucide-react';
import { usePatient } from '../../contexts/PatientContext';
import { PatientParameterCard } from '../../components/PatientParameterCard';

export default function FluidsModule() {
  const { weightNum } = usePatient();
  const [startHct, setStartHct] = useState<number>(45);
  const [targetHct, setTargetHct] = useState<number>(30);
  const [fastingHours, setFastingHours] = useState<number>(8);

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
