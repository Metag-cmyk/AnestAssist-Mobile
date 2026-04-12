import { useState } from 'react';
import { Droplets, Activity, AlertTriangle } from 'lucide-react';

export default function FluidsModule() {
  const [weight, setWeight] = useState<number>(70);
  const [startHct, setStartHct] = useState<number>(45);
  const [targetHct, setTargetHct] = useState<number>(30);
  const [fastingHours, setFastingHours] = useState<number>(8);

  // EBV (Estimated Blood Volume) - using 70 ml/kg for average adult as default approximation
  const ebv = weight * 70;

  // MABL (Maximum Allowable Blood Loss)
  const mabl = ebv * ((startHct - targetHct) / startHct);

  // 4-2-1 Rule for maintenance fluids
  const getMaintenanceRate = (w: number) => {
    if (w <= 10) return w * 4;
    if (w <= 20) return 40 + ((w - 10) * 2);
    return 60 + (w - 20);
  };

  const maintenanceRate = getMaintenanceRate(weight);
  const fastingDeficit = maintenanceRate * fastingHours;

  return (
    <div className="space-y-6">

      {/* Input Parameters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <Activity className="w-5 h-5 text-medical-primary" />
          <h3 className="font-bold text-slate-800">Patient Parameters</h3>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Weight (kg)</label>
            <input
              type="number"
              min="0"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Starting Hct (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={startHct}
              onChange={(e) => setStartHct(Number(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-accent"
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
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Fasting Hours</label>
            <input
              type="number"
              min="0"
              value={fastingHours}
              onChange={(e) => setFastingHours(Number(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-accent"
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
        <div className="bg-blue-50/50 rounded-xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="p-4 border-b border-blue-100 bg-blue-50 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-blue-900">Fluid Management (4-2-1)</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-end border-b border-blue-100 pb-2">
              <span className="text-sm font-medium text-blue-800">Maintenance Rate</span>
              <span className="text-lg font-bold text-blue-600">{Math.round(maintenanceRate)} <span className="text-sm font-normal text-blue-500">mL/hr</span></span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-blue-800">Fasting Deficit</span>
              <span className="text-2xl font-bold text-blue-600">{Math.round(fastingDeficit)} <span className="text-sm font-normal text-blue-500">mL</span></span>
            </div>
            <p className="text-xs text-blue-700 italic mt-2 text-center">Replace 1/2 deficit in 1st hour, 1/4 in 2nd, 1/4 in 3rd.</p>
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
