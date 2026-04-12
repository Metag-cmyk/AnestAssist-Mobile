import { useState } from 'react';
import { Stethoscope, Activity, FileText } from 'lucide-react';

export default function AirwayModule() {
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);

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
          <Stethoscope className="w-5 h-5 text-medical-primary" />
          <h3 className="font-bold text-slate-800">LEMON Assessment (Difficult Airway)</h3>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <p><strong className="text-slate-800">L - Look externally:</strong> Facial trauma, large incisors, beard/moustache, large tongue.</p>
            <p className="mt-2"><strong className="text-slate-800">E - Evaluate 3-3-2 rule:</strong> Incisor distance &lt; 3 fingers, hyoid-mental &lt; 3 fingers, thyroid-to-mouth &lt; 2 fingers.</p>
            <p className="mt-2"><strong className="text-slate-800">M - Mallampati Score:</strong> Score &ge; 3 indicates difficult intubation.</p>
          </div>
          <div>
            <p><strong className="text-slate-800">O - Obstruction:</strong> Epiglottitis, quinsy, trauma, tumor.</p>
            <p className="mt-2"><strong className="text-slate-800">N - Neck mobility:</strong> Limited extension/flexion, cervical spine injury/collar.</p>
          </div>
        </div>
      </div>

      {/* Equipment Sizing */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <Activity className="w-5 h-5 text-medical-primary" />
          <h3 className="font-bold text-slate-800">Equipment Sizing Calculator</h3>
        </div>
        <div className="p-4">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Age (Years)</label>
              <input
                type="number"
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-accent"
              />
            </div>
          </div>
          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">Endotracheal Tube</p>
              <p className="text-lg font-bold text-medical-primary">{equipment.ett}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">Laryngoscope Blade</p>
              <p className="text-lg font-bold text-medical-primary">{equipment.blade}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">LMA Size</p>
              <p className="text-lg font-bold text-medical-primary">{equipment.lma}</p>
            </div>
          </div>
        </div>
      </div>

       {/* Quick Algorithm Note */}
       <div className="bg-orange-50 rounded-xl shadow-sm border border-orange-200 p-4 flex gap-3 items-start">
         <FileText className="w-5 h-5 text-orange-600 mt-0.5" />
         <div>
           <h3 className="font-bold text-orange-800 text-sm">Difficult Airway Algorithm Key Steps</h3>
           <p className="text-xs text-orange-700 mt-1">1. Call for help immediately.<br/>2. Maintain oxygenation (Bag-mask ventilation).<br/>3. Consider supraglottic airway (SGA/LMA).<br/>4. If cannot ventilate, cannot intubate (CICO) &rarr; Emergency Surgical Airway (Cricothyroidotomy).</p>
         </div>
       </div>
    </div>
  );
}
