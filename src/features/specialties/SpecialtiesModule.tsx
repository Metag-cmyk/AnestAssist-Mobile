import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ObstetricsView from './ObstetricsView';
import PediatricsView from './PediatricsView';
import PreopView from './PreopView';
import { PatientContextBanner } from '../../components/PatientContextBanner';

export default function SpecialtiesModule() {
  const [activeView, setActiveView] = useState<'preop' | 'obstetrics' | 'pediatrics'>('preop');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Universal Patient Context Banner using the medical theme */}
      <PatientContextBanner theme="medical" />

      {/* Segmented Control */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
        <button
          onClick={() => setActiveView('preop')}
          className={`flex-1 py-3 px-2 sm:px-6 rounded-xl font-bold text-sm transition-all text-center ${
            activeView === 'preop'
              ? 'bg-indigo-500 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Pre-Op
        </button>
        <button
          onClick={() => setActiveView('obstetrics')}
          className={`flex-1 py-3 px-2 sm:px-6 rounded-xl font-bold text-sm transition-all text-center ${
            activeView === 'obstetrics'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Obstetrics
        </button>
        <button
          onClick={() => setActiveView('pediatrics')}
          className={`flex-1 py-3 px-2 sm:px-6 rounded-xl font-bold text-sm transition-all text-center ${
            activeView === 'pediatrics'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Pediatrics
        </button>
      </div>

      {/* View Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeView === 'preop' && <PreopView />}
          {activeView === 'obstetrics' && <ObstetricsView />}
          {activeView === 'pediatrics' && <PediatricsView />}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
