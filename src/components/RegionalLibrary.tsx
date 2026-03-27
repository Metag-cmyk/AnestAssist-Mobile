import React, { useState } from 'react';
import { REGIONAL_BLOCKS } from '../data/blocks';
import { LA_AGENTS, calculateMaxLADose, doseToVolume } from '../lib/BlockCalculators';
import { Search, ChevronRight, Ruler, AlertCircle, Droplets, Info, ShieldAlert, Thermometer, User, Syringe, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function RegionalLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(REGIONAL_BLOCKS[0].id);
  const [activeTab, setActiveTab] = useState<'info' | 'calc'>('info');

  // Calculator State
  const [weight, setWeight] = useState('70');
  const [selectedAgent, setSelectedAgent] = useState('ropivacaine');
  const [hasEpi, setHasEpi] = useState(false);
  const [targetConc, setTargetConc] = useState('0.2');

  const selectedBlock = REGIONAL_BLOCKS.find(b => b.id === selectedId) || REGIONAL_BLOCKS[0];
  const maxMg = calculateMaxLADose(parseFloat(weight) || 0, selectedAgent, hasEpi);
  const maxVol = doseToVolume(maxMg, parseFloat(targetConc) || 0.2);

  const filteredBlocks = REGIONAL_BLOCKS.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full bg-slate-50/50 p-6 rounded-3xl">
      {/* Sidebar */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-2xl border border-medical-border shadow-soft">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Syringe className="w-5 h-5 text-indigo-600" />
            Block Library
          </h2>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search blocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredBlocks.map((block) => (
              <button
                key={block.id}
                onClick={() => setSelectedId(block.id)}
                className={`w-full text-left p-4 rounded-xl text-sm transition-all flex items-center justify-between group border ${
                  selectedId === block.id 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                    : 'bg-white border-slate-100 hover:border-indigo-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-bold">{block.name}</p>
                  <p className={`text-[10px] uppercase tracking-wider font-semibold ${selectedId === block.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {block.category}
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedId === block.id ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Global Safety Alert */}
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-rose-800">LAST SAFETY</p>
            <p className="text-[10px] text-rose-700 leading-relaxed mt-1">
              Always aspirate before injection. Use fractionated doses (5mL) every 30-45s. Maintain verbal contact.
            </p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-8 space-y-6">
        {/* Detail Tabs */}
        <div className="flex gap-2 p-1.5 bg-white border border-medical-border rounded-xl w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'info' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Block Guide
          </button>
          <button
            onClick={() => setActiveTab('calc')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'calc' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            LA Safety Calculator
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'info' ? (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Image / Placeholder */}
              <div className="aspect-[21/9] bg-gradient-to-br from-slate-800 to-indigo-950 rounded-2xl flex flex-col items-center justify-center text-white/40 border border-slate-700 shadow-inner p-8">
                <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4">Sono-Anatomy Visualizer</p>
                <div className="w-24 h-24 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center animate-pulse mb-4">
                  <Droplets className="w-10 h-10 opacity-20" />
                </div>
                <p className="text-[10px] text-center max-w-md opacity-60 leading-relaxed italic">
                  {selectedBlock.imagePrompt}
                </p>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-medical-border shadow-soft h-full">
                  <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-500" />
                    Indications
                  </h3>
                  <ul className="space-y-2">
                    {selectedBlock.indications.map((ind, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-600">
                        <span className="text-indigo-400 mt-1">•</span> {ind}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-medical-border shadow-soft h-full">
                  <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Contraindications
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1">Absolute</p>
                      <ul className="space-y-1">
                        {selectedBlock.contraindications.absolute.map((c, i) => (
                          <li key={i} className="text-[11px] text-slate-600 flex gap-2">
                            <span className="text-rose-300">•</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Relative</p>
                      <ul className="space-y-1">
                        {selectedBlock.contraindications.relative.map((c, i) => (
                          <li key={i} className="text-[11px] text-slate-600 flex gap-2">
                            <span className="text-amber-300">•</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technique Steps */}
              <div className="bg-white p-6 rounded-2xl border border-medical-border shadow-soft">
                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Syringe className="w-4 h-4 text-emerald-500" />
                  Step-by-Step Technique
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedBlock.technique.map((step, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -top-3 -left-3 w-6 h-6 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center text-[10px] font-bold border border-slate-200">
                        {i + 1}
                      </div>
                      <div className="pt-2">
                        <p className="text-xs font-bold text-slate-700 mb-1">{step.title}</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anatomy & Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-soft">
                  <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 underline decoration-indigo-200 decoration-4 underline-offset-4">
                    Key Landmarks
                  </h3>
                  <ul className="space-y-2">
                    {selectedBlock.anatomy.map((a, i) => (
                      <li key={i} className="text-xs text-slate-600 leading-relaxed flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100 shadow-soft">
                  <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 underline decoration-emerald-200 decoration-4 underline-offset-4">
                    Sono-Anatomy Pro Tips
                  </h3>
                  <ul className="space-y-2">
                    {selectedBlock.sonoAnatomyTips.map((tip, i) => (
                      <li key={i} className="text-xs text-slate-600 leading-relaxed flex items-start gap-2 italic">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" /> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="calc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 rounded-2xl border border-medical-border shadow-soft relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Syringe className="w-32 h-32 text-indigo-900" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-indigo-600" />
                  Local Anesthetic Safety Calculator
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block flex items-center gap-2">
                        <User className="w-3 h-3 text-indigo-400" /> Patient Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-lg font-bold focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block flex items-center gap-2">
                        <Droplets className="w-3 h-3 text-emerald-400" /> Selective Agent
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(LA_AGENTS).map(([id, agent]) => (
                          <button
                            key={id}
                            onClick={() => setSelectedAgent(id)}
                            className={`p-3 rounded-xl border text-[11px] font-bold transition-all ${
                              selectedAgent === id 
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                                : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {agent.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-slate-700">Add Epinephrine 1:200k?</span>
                      </div>
                      <button
                        onClick={() => setHasEpi(!hasEpi)}
                        className={`w-12 h-6 rounded-full relative transition-all ${hasEpi ? 'bg-emerald-500' : 'bg-slate-300'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${hasEpi ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                        Target Concentration (%)
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="2.0"
                        step="0.025"
                        value={targetConc}
                        onChange={(e) => setTargetConc(e.target.value)}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2"
                      />
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>Low (Dilute)</span>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md ring-1 ring-indigo-200">{targetConc}%</span>
                        <span>High (Concentrated)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center relative">
                      <div className="absolute top-2 right-4 text-[9px] font-bold opacity-30 tracking-[0.3em] uppercase">Safety Limit</div>
                      <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-2">Maximum Safe Dose</p>
                      <p className="text-5xl font-black mb-1">{Math.floor(maxMg)}<span className="text-xl ml-1 opacity-50">mg</span></p>
                      <div className="w-12 h-1 bg-indigo-500 my-4 rounded-full" />
                      <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-2">Safe Maximum Volume</p>
                      <p className="text-4xl font-black">{maxVol.toFixed(1)}<span className="text-lg ml-1 opacity-50">mL</span></p>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
                      <h4 className="text-xs font-bold text-amber-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Recommended for {selectedBlock.name}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-amber-800/70 font-bold uppercase tracking-wider">Suggested Volume</span>
                          <span className="px-2 py-0.5 bg-amber-200/50 text-amber-900 rounded font-black">{selectedBlock.suggestedVolume}</span>
                        </div>
                        <p className="text-[10px] text-amber-900 leading-relaxed italic opacity-80">
                          Note: {selectedBlock.maxDoseNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
