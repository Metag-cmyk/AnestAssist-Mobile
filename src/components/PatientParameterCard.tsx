import React from 'react';
import { User, Ruler, Weight, Calendar, Venus, Mars } from 'lucide-react';
import { usePatient } from '../contexts/PatientContext';

interface PatientParameterCardProps {
  className?: string;
  showWeight?: boolean;
  showAge?: boolean;
  showHeight?: boolean;
}

export const PatientParameterCard: React.FC<PatientParameterCardProps> = ({ 
  className = '', 
  showWeight = true,
  showAge = true, 
  showHeight = true 
}) => {
  const { weight, setWeight, height, setHeight, age, setAge, gender, setGender, weightNum, heightNum, bsa } = usePatient();

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-50 p-2 rounded-xl border border-indigo-100">
          <User className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Patient Demographics</h3>
          <p className="text-[10px] text-slate-400 font-medium">Shared across all calculators & dosing tools</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Weight */}
        {showWeight && (
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
              <Weight className="w-3.5 h-3.5 text-emerald-600" />
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-base font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-center"
            />
          </div>
        )}

        {/* Height */}
        {showHeight && (
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
              <Ruler className="w-3.5 h-3.5 text-blue-600" />
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-base font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-center"
            />
          </div>
        )}

        {/* Age */}
        {showAge && (
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Age (yrs)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-base font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-center"
            />
          </div>
        )}

        {/* Gender */}
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
            <Venus className="w-3 h-3 text-rose-500" /><Mars className="w-3 h-3 text-indigo-600" />
            Gender
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setGender('male')}
              className={`py-2 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-1 ${
                gender === 'male' 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Mars className="w-3.5 h-3.5" />
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`py-2 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-1 ${
                gender === 'female' 
                  ? 'bg-rose-600 border-rose-600 text-white shadow-sm' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Venus className="w-3.5 h-3.5" />
              Female
            </button>
          </div>
        </div>
      </div>

      {/* Derived values shared with the calculators */}
      {showHeight && heightNum > 0 && weightNum > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-[10px] font-bold text-slate-500">
          <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg">BSA {bsa.toFixed(2)} m²</span>
          <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg">
            BMI {(weightNum / Math.pow(heightNum / 100, 2)).toFixed(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PatientParameterCard;
