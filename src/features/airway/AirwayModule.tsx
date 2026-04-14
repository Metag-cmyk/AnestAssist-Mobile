import { useState } from 'react';
import { Stethoscope, Activity, ClipboardList } from 'lucide-react';
import InteractiveAirwayAlgorithm from './InteractiveAirwayAlgorithm';

export default function AirwayModule() {
  const [age, setAge] = useState<number>(30);

  // Basic estimation logic
  const getEquipment = (age: number) => {
    if (age < 1) return { ett: '3.0 - 4.0 uncuffed', blade: 'Miller 0-1', lma: 'Size 1' };
    if (age < 2) return { ett: '4.0 - 4.5 uncuffed', blade: 'Miller 1, Mac 1', lma: 'Size 1.5' };
    if (age < 8) return { ett: `${(age / 4) + 4} uncuffed`, blade: 'Mac 2, Miller 2', lma: 'Size 2-2.5' };
    if (age < 16) return { ett: '6.0 - 7.0 cuffed', blade: 'Mac 3', lma: 'Size 3' };
    return { ett: '7.0 - 8.0 cuffed', blade: 'Mac 3 or 4', lma: 'Size 4-5' };
  };

  const equipment = getEquipment(age);

  return (
    <div className="space-y-6">
      {/* Difficult Airway Assessment (LEMON) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-medical-primary" />
          <h3 className="font-bold text-slate-800">LEMON Assessment (Difficult Airway)</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="font-bold text-slate-800 flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-medical-primary text-white flex items-center justify-center text-[10px]">L</span>
                Look externally
              </p>
              <p className="text-slate-600 text-xs pl-8">Facial trauma, large incisors, beard/moustache, large tongue.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="font-bold text-slate-800 flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-medical-primary text-white flex items-center justify-center text-[10px]">E</span>
                Evaluate 3-3-2 rule
              </p>
              <p className="text-slate-600 text-xs pl-8">Incisor distance &lt; 3 fingers, hyoid-mental &lt; 3 fingers, thyroid-to-mouth &lt; 2 fingers.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="font-bold text-slate-800 flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-medical-primary text-white flex items-center justify-center text-[10px]">M</span>
                Mallampati Score
              </p>
              <p className="text-slate-600 text-xs pl-8">Class III or IV indicates likely difficult visualization.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="font-bold text-slate-800 flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-medical-primary text-white flex items-center justify-center text-[10px]">O</span>
                Obstruction
              </p>
              <p className="text-slate-600 text-xs pl-8">Epiglottitis, quinsy, trauma, tumor (Stridor is a key sign).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="font-bold text-slate-800 flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-medical-primary text-white flex items-center justify-center text-[10px]">N</span>
                Neck mobility
              </p>
              <p className="text-slate-600 text-xs pl-8">Limited extension/flexion, cervical spine injury/collar, ankylosing spondylitis.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Sizing */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-800">Equipment Sizing Calculator</h3>
        </div>
        <div className="p-6">
          <div className="max-w-xs mb-8">
            <label className="block text-xs font-medium text-slate-500 uppercase mb-2 tracking-wider">Patient Age (Years)</label>
            <input
              type="number"
              min="0"
              max="120"
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 text-center shadow-sm">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Endotracheal Tube</p>
              <p className="text-xl font-black text-indigo-900 leading-tight">{equipment.ett}</p>
            </div>
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 text-center shadow-sm">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Laryngoscope Blade</p>
              <p className="text-xl font-black text-indigo-900 leading-tight">{equipment.blade}</p>
            </div>
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 text-center shadow-sm">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">LMA Size</p>
              <p className="text-xl font-black text-indigo-900 leading-tight">{equipment.lma}</p>
            </div>
          </div>
        </div>
      </div>

       {/* Interactive Algorithm */}
       <div className="pt-2">
         <InteractiveAirwayAlgorithm />
       </div>

    </div>
  );
}
