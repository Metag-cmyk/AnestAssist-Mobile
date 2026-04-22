import React from 'react';
import { User, Ruler, Weight, Calendar, Venus, Mars } from 'lucide-react';
import { usePatient } from '../contexts/PatientContext';
import { motion } from 'motion/react';

interface PatientParameterCardProps {
  className?: string;
  showAge?: boolean;
  showHeight?: boolean;
}

export const PatientParameterCard: React.FC<PatientParameterCardProps> = ({ 
  className = '', 
  showAge = true, 
  showHeight = true 
}) => {
  const { weight, setWeight, height, setHeight, age, setAge, gender, setGender } = usePatient();

  return (
    <div className={`bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-2xl ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-600/20 p-2 rounded-lg border border-indigo-500/30">
          <User className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Patient Demographics</h3>
          <p className="text-[10px] text-slate-400 font-medium tracking-tight">SHARED ACROSS ALL MODULES</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Weight */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-tighter">
            <Weight className="w-3.5 h-3.5 text-emerald-400" />
            Weight (kg)
          </label>
          <div className="relative group">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-center"
            />
            <div className="absolute inset-0 rounded-xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
          </div>
        </div>

        {/* Height */}
        {showHeight && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-tighter">
              <Ruler className="w-3.5 h-3.5 text-blue-400" />
              Height (cm)
            </label>
            <div className="relative group">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-center"
              />
              <div className="absolute inset-0 rounded-xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
            </div>
          </div>
        )}

        {/* Age */}
        {showAge && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-tighter">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Age (yrs)
            </label>
            <div className="relative group">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-center"
              />
              <div className="absolute inset-0 rounded-xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
            </div>
          </div>
        )}

        {/* Gender */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-tighter">
            <Venus className="w-2.5 h-2.5 text-rose-400" /><Mars className="w-2.5 h-2.5 text-indigo-400" />
            Gender
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setGender('male')}
              className={`py-3 rounded-xl border font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 ${
                gender === 'male' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                  : 'bg-slate-950/50 border-slate-700 text-slate-500 hover:border-slate-600'
              }`}
            >
              <Mars className="w-3.5 h-3.5" />
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`py-3 rounded-xl border font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 ${
                gender === 'female' 
                  ? 'bg-rose-600 border-rose-500 text-white shadow-lg' 
                  : 'bg-slate-950/50 border-slate-700 text-slate-500 hover:border-slate-600'
              }`}
            >
              <Venus className="w-3.5 h-3.5" />
              Female
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
