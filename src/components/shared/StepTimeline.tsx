import React from 'react';

export interface Step {
  title: string;
  description: string;
  type?: 'action' | 'decision' | 'warning' | 'info';
}

interface StepTimelineProps {
  steps: Step[];
  title?: string;
  className?: string;
}

export const StepTimeline: React.FC<StepTimelineProps> = ({ 
  steps, 
  title = "Procedure Guide",
  className = ""
}) => {
  return (
    <div className={`space-y-4 my-8 ${className}`}>
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{title}</h4>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                step.type === 'action' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                step.type === 'decision' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                step.type === 'warning' ? 'bg-rose-50 border-rose-200 text-rose-600' :
                'bg-indigo-50 border-indigo-200 text-indigo-600'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-12 bg-slate-100 my-1" />
              )}
            </div>
            <div className={`flex-1 p-4 rounded-xl border ${
              step.type === 'action' ? 'bg-blue-50/30 border-blue-100' :
              step.type === 'decision' ? 'bg-amber-50/30 border-amber-100' :
              step.type === 'warning' ? 'bg-rose-50/30 border-rose-100' :
              'bg-indigo-50/30 border-indigo-100'
            }`}>
              <p className="font-bold text-sm text-slate-800">{step.title}</p>
              <p className="text-xs text-slate-500 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
