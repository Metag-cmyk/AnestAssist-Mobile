import { useState } from 'react';
import { HeartPulse, Droplets, Clock, AlertCircle } from 'lucide-react';
import { usePatient } from '../../contexts/PatientContext';

export default function PediatricsView() {
  const { patient } = usePatient();
  const weight = patient.weightKg || 15; // default 15kg if not set

  // Calculate 4-2-1 rule
  const calculateFluids = (kg: number) => {
    let rate = 0;
    if (kg <= 10) {
      rate = kg * 4;
    } else if (kg <= 20) {
      rate = 40 + ((kg - 10) * 2);
    } else {
      rate = 60 + ((kg - 20) * 1);
    }
    return rate;
  };

  const maintRate = calculateFluids(weight);

  return (
    <div className="space-y-6">
      
      {/* 4-2-1 Fluid Calculator Card */}
      <div className="bg-white rounded-3xl border border-teal-100 shadow-sm overflow-hidden">
        <div className="bg-teal-50 border-b border-teal-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-teal-900 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-teal-600" />
              Pediatric Fluid Maintenance (4-2-1 Rule)
            </h3>
            <p className="text-sm text-teal-700 mt-1">Based on global Patient Weight context</p>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Input Weight</p>
            <div className="text-4xl font-black text-slate-800">
              {weight} <span className="text-xl text-slate-400">kg</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">First 10kg: 4mL/kg/h<br/>Next 10kg: 2mL/kg/h<br/>Remaining: 1mL/kg/h</p>
          </div>
          <div className="p-6 bg-teal-500 rounded-2xl text-white shadow-lg shadow-teal-500/20 text-right">
            <h4 className="text-sm font-bold text-teal-100 uppercase tracking-widest mb-1">Maintenance Rate</h4>
            <p className="text-5xl font-black">{maintRate} <span className="text-2xl text-teal-100">mL/h</span></p>
            <p className="text-xs text-teal-100 mt-2 font-medium bg-teal-600/50 inline-block px-2 py-1 rounded">Isotonic fluids (e.g., Plasmalyte or NS) advised</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fasting Guidelines */}
        <div className="bg-white rounded-3xl border border-indigo-100 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-indigo-50 border-b border-indigo-100 p-6">
            <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Pre-Operative Fasting
            </h3>
            <p className="text-sm text-indigo-700 mt-1">Standard 2-4-6-8 Guidelines</p>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="space-y-4">
              {[
                { time: '2 hr', desc: 'Clear Liquids (Water, clear juice without pulp, carbonated beverages, pedialyte)', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                { time: '4 hr', desc: 'Breast Milk', color: 'bg-indigo-100/50 text-indigo-800 border-indigo-200' },
                { time: '6 hr', desc: 'Infant Formula, Non-Human Milk, Light Meal (toast and clear liquid)', color: 'bg-indigo-200/50 text-indigo-900 border-indigo-300' },
                { time: '8 hr', desc: 'Heavy Meal (fried/fatty foods, meat)', color: 'bg-indigo-300/50 text-indigo-950 border-indigo-400' },
              ].map(item => (
                <div key={item.time} className={`flex items-center gap-4 p-3 rounded-xl border ${item.color}`}>
                  <div className="w-14 text-center font-black text-lg flex-shrink-0">{item.time}</div>
                  <div className="text-sm font-medium">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Routine medications can usually be taken with a sip of water up to 1-2 hours pre-op, subject to anesthesiologist approval.</span>
            </div>
          </div>
        </div>

        {/* NRP Flow */}
        <div className="bg-white rounded-3xl border border-fuchsia-100 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-fuchsia-50 border-b border-fuchsia-100 p-6">
            <h3 className="text-lg font-bold text-fuchsia-900 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-fuchsia-600" />
              Neonatal Resuscitation (NRP)
            </h3>
            <p className="text-sm text-fuchsia-700 mt-1">First Golden Minute Quick Reference</p>
          </div>
          <div className="p-6 space-y-4 flex-1">
            
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800 text-sm">1. Initial Evaluation (Birth)</p>
              <p className="text-xs text-slate-600 mt-1">Term gestation? Good tone? Breathing or crying?<br/>If <span className="font-bold text-rose-500">NO</span> &rarr; Warm, clear airway, dry, stimulate.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800 text-sm flex justify-between items-center">
                <span>2. HR {"<"} 100 bpm or Apnea/Gasping?</span>
                <span className="text-[10px] bg-fuchsia-100 text-fuchsia-700 px-2 py-0.5 rounded font-black uppercase">At 1 Min</span>
              </p>
              <p className="text-xs text-slate-600 mt-1">Start Positive Pressure Ventilation (PPV). SPO2 monitor.<br/>Consider ECG.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-rose-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
              <p className="font-bold text-rose-800 text-sm">3. HR {"<"} 60 bpm after 30s of effective PPV?</p>
              <p className="text-xs text-rose-700 mt-1 font-medium">100% O2 + Chest Compressions (3:1 ratio with breaths).<br/>Intubate if not already done. UVC access.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-rose-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-600" />
              <p className="font-bold text-rose-900 text-sm">4. HR remains {"<"} 60 bpm?</p>
              <p className="text-xs text-rose-800 mt-1"><span className="font-bold">Epinephrine:</span> 0.01 - 0.03 mg/kg IV every 3-5 mins.<br/>Consider volume expander (O-negative blood or NS 10 mL/kg) if hypovolemia suspected.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
