import React from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';
import { usePatient } from '../contexts/PatientContext';

interface PatientContextBannerProps {
  theme?: 'medical' | 'sky';
}

export const PatientContextBanner: React.FC<PatientContextBannerProps> = ({ theme = 'medical' }) => {
  const { patient } = usePatient();

  const isSky = theme === 'sky';
  const bgClass = isSky ? 'bg-sky-50 border-sky-100' : 'bg-medical-primary/5 border-medical-primary/10';
  const iconBgClass = isSky ? 'bg-sky-100' : 'bg-medical-primary/10';
  const textClass = isSky ? 'text-sky-600' : 'text-medical-primary';
  const verifiedClass = isSky ? 'text-emerald-600' : 'text-medical-accent';

  return (
    <div className={`${bgClass} border rounded-2xl p-4 flex items-center justify-between shadow-sm`}>
      <div className="flex items-center gap-3">
        <div className={`${iconBgClass} p-2 rounded-lg`}>
          <Activity className={`w-5 h-5 ${textClass}`} />
        </div>
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest ${textClass} opacity-60`}>Global Patient Context</p>
          <h3 className="text-sm font-bold text-slate-800">
            {patient.age ? `${patient.age}y` : 'Age N/A'} • {patient.sex.toUpperCase()} • {patient.weightKg ? `${patient.weightKg}kg` : 'Weight N/A'} • {patient.type.toUpperCase()}
          </h3>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Profile</p>
        <div className={`flex items-center gap-1 text-xs font-bold ${verifiedClass}`}>
          <CheckCircle2 className="w-3 h-3" />
          Verified
        </div>
      </div>
    </div>
  );
};
