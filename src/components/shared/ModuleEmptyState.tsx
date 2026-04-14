import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ModuleEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ModuleEmptyState: React.FC<ModuleEmptyStateProps> = ({
  icon: Icon,
  title,
  description
}) => {
  return (
    <div className="bg-white p-12 rounded-2xl border border-medical-border border-dashed flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[600px]">
      <div className="p-6 bg-slate-50 rounded-full">
        <Icon className="w-16 h-16 text-slate-200" />
      </div>
      <div className="max-w-xs">
        <h3 className="text-xl font-bold text-slate-700 mb-2 underline decoration-medical-accent/30 underline-offset-8">{title}</h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
