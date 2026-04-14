import { useState } from 'react';
import { ArrowRight, AlertTriangle, RotateCcw, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AlgorithmState =
  | 'start'
  | 'intubation_failed'
  | 'face_mask'
  | 'sga'
  | 'cico'
  | 'success_intubation'
  | 'success_ventilation'
  | 'surgical_airway';

export default function InteractiveAirwayAlgorithm() {
  const [currentState, setCurrentState] = useState<AlgorithmState>('start');

  const content = {
    start: {
      question: "Initial Intubation Attempt",
      desc: "Attempt laryngoscopy and intubation.",
      options: [
        { label: "Successful", next: 'success_intubation', type: 'success' },
        { label: "Failed", next: 'intubation_failed', type: 'danger' }
      ]
    },
    intubation_failed: {
      question: "Call for Help & Return to Face Mask",
      desc: "Is face mask ventilation adequate?",
      options: [
        { label: "Yes", next: 'face_mask', type: 'success' },
        { label: "No", next: 'sga', type: 'danger' }
      ]
    },
    face_mask: {
      question: "Adequate Face Mask Ventilation",
      desc: "Consider alternatives: wake patient, video laryngoscopy, intubating LMA, or fiberoptic. Maintain oxygenation.",
      options: [
        { label: "Resolved", next: 'success_ventilation', type: 'success' },
        { label: "Deteriorates", next: 'sga', type: 'danger' }
      ]
    },
    sga: {
      question: "Place Supraglottic Airway (SGA)",
      desc: "Is ventilation adequate via SGA?",
      options: [
        { label: "Yes", next: 'success_ventilation', type: 'success' },
        { label: "No", next: 'cico', type: 'danger' }
      ]
    },
    cico: {
      question: "CICO: Cannot Intubate, Cannot Oxygenate",
      desc: "EMERGENCY: Proceed immediately to front of neck access.",
      options: [
        { label: "Perform Cricothyroidotomy", next: 'surgical_airway', type: 'danger' }
      ]
    },
    success_intubation: {
      terminal: true,
      success: true,
      title: "Airway Secured",
      desc: "Confirm with ETCO2. Secure the tube."
    },
    success_ventilation: {
      terminal: true,
      success: true,
      title: "Oxygenation Maintained",
      desc: "Airway not definitively secured, but patient is safely oxygenated."
    },
    surgical_airway: {
      terminal: true,
      success: false,
      title: "Surgical Airway Performed",
      desc: "Ventilate via surgical airway. Confirm with ETCO2."
    }
  };

  const current = (content as any)[currentState];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-800">Difficult Airway Algorithm (Interactive)</h3>
        </div>
        {currentState !== 'start' && (
          <button
            onClick={() => setCurrentState('start')}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentState}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div>
              {current.terminal && !current.success && (
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3 animate-pulse" />
              )}
              <h4 className={`text-xl font-bold mb-2 ${current.terminal ? (current.success ? 'text-green-600' : 'text-red-600') : 'text-slate-800'}`}>
                {current.terminal ? current.title : current.question}
              </h4>
              <p className={`text-sm max-w-md mx-auto ${current.terminal && !current.success ? 'text-red-500 font-medium' : 'text-slate-600'}`}>
                {current.desc}
              </p>
            </div>

            {!current.terminal && (
              <div className="flex flex-wrap justify-center gap-4 w-full max-w-md">
                {current.options.map((opt: any) => (
                  <button
                    key={opt.label}
                    onClick={() => setCurrentState(opt.next)}
                    className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2
                      ${opt.type === 'success'
                        ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-300'
                        : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300'}`}
                  >
                    {opt.label}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
