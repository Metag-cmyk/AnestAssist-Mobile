import React from 'react';
import { ShieldAlert, Printer } from 'lucide-react';

interface CommandCardProps {
  strategies: string[];
  title?: string;
  onPrint?: () => void;
}

export const CommandCard: React.FC<CommandCardProps> = ({ 
  strategies, 
  title = "Anesthesia Command & Strategy",
  onPrint 
}) => {
  if (!strategies || strategies.length === 0) return null;

  return (
    <section className="mb-10 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-medical-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="flex items-center gap-2 text-xs font-black text-medical-accent uppercase tracking-[0.2em]">
            <ShieldAlert className="w-4 h-4" />
            {title}
          </h3>
          {onPrint && (
            <button 
              onClick={onPrint}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group print:hidden"
              title="Print Protocol"
            >
              <Printer className="w-4 h-4 text-white/60 group-hover:text-white" />
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ul className="space-y-3">
            {strategies.slice(0, Math.ceil(strategies.length / 2)).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] font-bold text-slate-100 leading-relaxed text-balance">
                <div className="w-1.5 h-1.5 rounded-full bg-medical-accent mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {strategies.slice(Math.ceil(strategies.length / 2)).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] font-bold text-slate-100 leading-relaxed text-balance">
                <div className="w-1.5 h-1.5 rounded-full bg-medical-accent mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
