import { useState } from 'react';
import { Stethoscope, Scissors, Syringe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Conditions from '../conditions/Conditions';
import Surgery from '../surgery/Surgery';
import RegionalLibrary from '../regional/RegionalLibrary';

type SubTab = 'conditions' | 'surgery' | 'regional';

export default function ClinicModule() {
  const [activeTab, setActiveTab] = useState<SubTab>('conditions');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Sub-Navigation (Segmented Control) */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200 sticky top-[72px] z-40 backdrop-blur-md bg-white/90">
        <button
          onClick={() => setActiveTab('conditions')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'conditions'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span className="hidden sm:inline">Conditions & Protocols</span>
          <span className="sm:hidden text-[10px]">Conditions</span>
        </button>
        <button
          onClick={() => setActiveTab('surgery')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'surgery'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span className="hidden sm:inline">Surgical Guides</span>
          <span className="sm:hidden text-[10px]">Surgery</span>
        </button>
        <button
          onClick={() => setActiveTab('regional')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'regional'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Syringe className="w-4 h-4" />
          <span className="hidden sm:inline">Regional Anesthesia</span>
          <span className="sm:hidden text-[10px]">Regional</span>
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
          {activeTab === 'conditions' && <Conditions />}
          {activeTab === 'surgery' && <Surgery />}
          {activeTab === 'regional' && <RegionalLibrary />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
