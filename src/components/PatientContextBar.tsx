import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import { User, Scale, Activity, Ruler, ChevronRight, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

interface PatientContextBarProps {
  onSettingsClick: () => void;
}

export const PatientContextBar: React.FC<PatientContextBarProps> = ({ onSettingsClick }) => {
  const { patient, bmi, bsa, ibw } = usePatient();

  if (!patient.weightKg && !patient.heightCm) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-20 left-4 right-4 z-40"
    >
      <div 
        onClick={onSettingsClick}
        className="bg-white/80 backdrop-blur-xl border border-medical-border shadow-2xl rounded-2xl p-4 flex items-center justify-between cursor-pointer group hover:border-medical-accent transition-all duration-300"
      >
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {/* Patient Icon & Basic Info */}
          <div className="flex items-center gap-3 pr-4 border-r border-slate-200 shrink-0">
            <div className="w-10 h-10 rounded-full bg-medical-primary/10 flex items-center justify-center text-medical-primary">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Patient</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-medical-primary whitespace-nowrap">
                  {patient.age || '--'}y • {patient.sex === 'male' ? 'M' : 'F'}
                </span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter ${
                  patient.type === 'adult' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'
                }`}>
                  {patient.type}
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-1">
                <Scale className="w-3 h-3 text-medical-accent" />
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Weight</p>
              </div>
              <p className="text-sm font-black text-medical-primary whitespace-nowrap">
                {patient.weightKg || '--'}<span className="text-[10px] ml-0.5 font-medium opacity-50">kg</span>
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-1">
                <Ruler className="w-3 h-3 text-medical-accent" />
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">IBW</p>
              </div>
              <p className="text-sm font-black text-medical-primary whitespace-nowrap">
                {ibw.toFixed(1)}<span className="text-[10px] ml-0.5 font-medium opacity-50">kg</span>
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-1">
                <Activity className="w-3 h-3 text-medical-accent" />
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">BMI</p>
              </div>
              <p className={`text-sm font-black whitespace-nowrap ${
                bmi > 30 ? 'text-rose-600' : bmi > 25 ? 'text-amber-600' : 'text-medical-primary'
              }`}>
                {bmi.toFixed(1)}
              </p>
            </div>

            <div className="flex flex-col items-center hidden sm:flex">
              <div className="flex items-center gap-1.5 mb-1">
                <Calculator className="w-3 h-3 text-medical-accent" />
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">BSA</p>
              </div>
              <p className="text-sm font-black text-medical-primary whitespace-nowrap">
                {bsa.toFixed(2)}<span className="text-[10px] ml-0.5 font-medium opacity-50">m²</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="ml-4 pl-4 border-l border-slate-200 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-medical-accent text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
