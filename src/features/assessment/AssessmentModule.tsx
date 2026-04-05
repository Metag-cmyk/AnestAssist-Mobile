import { useState } from 'react';
import { UserCircle, Calculator, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PatientCalculator from '../patient/PatientCalculator';
import ClinicalScores from '../scores/ClinicalScores';
import GuidelinesDiagrams from '../guidelines/GuidelinesDiagrams';

type SubTab = 'patient' | 'scores' | 'guidelines';

export default function AssessmentModule() {
  const [activeTab, setActiveTab] = useState<SubTab>('patient');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Sub-Navigation (Segmented Control) */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200 sticky top-[72px] z-40 backdrop-blur-md bg-white/90">
        <button
          onClick={() => setActiveTab('patient')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'patient'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <UserCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Patient Profile</span>
          <span className="sm:hidden text-[10px]">Patient</span>
        </button>
        <button
          onClick={() => setActiveTab('scores')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'scores'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span className="hidden sm:inline">Clinical Scores</span>
          <span className="sm:hidden text-[10px]">Scores</span>
        </button>
        <button
          onClick={() => setActiveTab('guidelines')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'guidelines'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">ESAIC/ASA Guidelines</span>
          <span className="sm:hidden text-[10px]">Guidelines</span>
        </button>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'patient' && <PatientCalculator />}
          {activeTab === 'scores' && <ClinicalScores />}
          {activeTab === 'guidelines' && <GuidelinesDiagrams />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
