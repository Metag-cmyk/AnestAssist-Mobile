import { usePatient } from '../../contexts/PatientContext';
import { PatientParameterCard } from '../../components/PatientParameterCard';

export default function AirwayModule() {
  const { ageNum } = usePatient();

  // Basic estimation logic
  const getEquipment = (age: number) => {
    if (age < 1) return { ett: '3.0 - 4.0 uncuffed', blade: 'Miller 0-1', lma: 'Size 1' };
    if (age < 2) return { ett: '4.0 - 4.5 uncuffed', blade: 'Miller 1, Mac 1', lma: 'Size 1.5' };
    if (age < 8) return { ett: `${(age / 4) + 4} uncuffed`, blade: 'Mac 2, Miller 2', lma: 'Size 2-2.5' };
    if (age < 16) return { ett: '6.0 - 7.0 cuffed', blade: 'Mac 3', lma: 'Size 3' };
    return { ett: '7.0 - 8.0 cuffed', blade: 'Mac 3 or 4', lma: 'Size 4-5' };
  };

  const equipment = getEquipment(ageNum);

  return (
    <div className="space-y-6">
      <PatientParameterCard showWeight={false} className="bg-medical-primary/5 border-medical-border" />
      
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
          <h3 className="font-bold text-slate-800">Equipment Sizing Reference</h3>
        </div>
        <div className="p-6">
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Endotracheal Tube</p>
              <p className="text-xl font-black text-medical-primary">{equipment.ett}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Laryngoscope Blade</p>
              <p className="text-xl font-black text-medical-primary">{equipment.blade}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LMA Size</p>
              <p className="text-xl font-black text-medical-primary">{equipment.lma}</p>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 italic text-center">
            Sizes estimated for a {ageNum}-year-old patient. Always have one size smaller and larger available.
          </p>
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
