import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoSectionProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  bulletColor?: string;
  items: string[];
  columns?: 1 | 2;
  variant?: 'standard' | 'highlight' | 'compact';
}

export const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  icon: Icon,
  iconColor = "text-medical-accent",
  bgColor = "bg-white",
  borderColor = "border-medical-border",
  textColor = "text-slate-600",
  bulletColor = "bg-medical-accent",
  items,
  columns = 1,
  variant = 'standard'
}) => {
  if (!items || items.length === 0) return null;

  const isHighlight = variant === 'highlight';
  const isCompact = variant === 'compact';

  return (
    <section className={`p-5 rounded-2xl border ${bgColor} ${borderColor} ${isHighlight ? 'shadow-sm' : ''} ${isCompact ? 'p-4' : 'p-5'}`}>
      <h3 className={`flex items-center gap-2 font-bold mb-4 ${isCompact ? 'text-xs uppercase tracking-widest' : 'text-sm'}`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <span className={isHighlight ? 'text-medical-primary' : 'text-slate-800'}>{title}</span>
      </h3>
      <ul className={`space-y-3 ${columns === 2 ? 'grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 space-y-0' : ''}`}>
        {items.map((item, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm ${textColor}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${bulletColor} mt-1.5 shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};
