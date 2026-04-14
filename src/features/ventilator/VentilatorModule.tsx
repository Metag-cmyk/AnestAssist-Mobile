import { useState, useEffect } from 'react';
import { Wind, Ruler, Activity, CheckCircle2, ActivitySquare, Waves, AlertTriangle, Info, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PatientContextBanner } from '../../components/PatientContextBanner';
import { ClinicalCondition, getTargetVolumes, getStrategyDetails, getWaveform, ARDS_LOW_PEEP, ARDS_HIGH_PEEP, getARDSClassification } from './ventilatorData';

import { usePatient } from '../../contexts/PatientContext';

export default function VentilatorModule() {
  const { patient, setPatient, ibw } = usePatient();
  const K_CONDITION = 'anestassist_ventilator_condition';

  const [condition, setCondition] = useState<ClinicalCondition>(() => {
    return (localStorage.getItem(K_CONDITION) as ClinicalCondition) || 'standard';
  });

  const [plateau, setPlateau] = useState<string>('');
  const [peepInput, setPeepInput] = useState<string>('');
  const [pao2, setPao2] = useState<string>('');
  const [fio2Input, setFio2Input] = useState<string>('');

  const [showARDSNet, setShowARDSNet] = useState(false);
  const [ardsNetType, setArdsNetType] = useState<'low' | 'high'>('low');

  useEffect(() => {
    localStorage.setItem(K_CONDITION, condition);
  }, [condition]);

  const heightCm = patient.heightCm.toString();
  const isMale = patient.sex === 'male';

  const setHeightCm = (val: string) => setPatient({ heightCm: val === '' ? '' : parseFloat(val) });
  const setIsMale = (val: boolean) => setPatient({ sex: val ? 'male' : 'female' });

  const targets = getTargetVolumes(condition, ibw);
  const strategy = getStrategyDetails(condition) as any;
  const { pPath, fPath, pvPath } = getWaveform(condition);

  const drivingPressureValue = (parseFloat(plateau) || 0) - (parseFloat(peepInput) || 0);
  const isDrivingPressureSafe = drivingPressureValue < 15;

  const { severity, ratio, advice } = getARDSClassification(parseFloat(pao2), parseFloat(fio2Input));

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4">
      <PatientContextBanner theme="sky" />

      {/* Header Section */}
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative border border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent pointer-events-none" />
        <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="bg-sky-500/20 p-4 rounded-2xl backdrop-blur-md border border-sky-400/30">
              <Wind className="w-10 h-10 text-sky-400" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2 text-wrap sm:text-nowrap">
                Ventilator Command Center
                <span className="hidden sm:inline text-[10px] bg-sky-500/30 text-sky-300 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold border border-sky-500/50">HIFI-Clinical</span>
              </h2>
              <p className="text-sky-100/60 text-sm mt-1 max-w-md font-medium">Precision mechanical ventilation strategies & condition-matched scalars.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-inner group">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1 group-hover:text-sky-400 transition-colors inline-flex items-center gap-1">
                  <Ruler className="w-3 h-3" /> Theoretical IBW
                </div>
                <div className="text-2xl font-black text-white">
                  {ibw > 0 ? ibw.toFixed(1) : '--'} <span className="text-xs text-slate-500 uppercase">kg</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Patient Details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-5 pb-3 border-b border-slate-100 uppercase tracking-tighter text-sm">
              <Activity className="w-4 h-4 text-sky-600" />
              Anthropometrics
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Sex</label>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button 
                    onClick={() => setIsMale(true)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${isMale ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    M
                  </button>
                  <button 
                    onClick={() => setIsMale(false)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!isMale ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    F
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Height (cm)</label>
                <input 
                  type="number" 
                  value={heightCm} 
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-300 shadow-inner"
                  placeholder="175"
                />
              </div>
            </div>
          </div>

          {/* ARDS Berlin Criteria Diagnostic */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 p-4" />
            <h3 className="font-bold text-white flex items-center gap-2 mb-4 pb-3 border-b border-white/10 uppercase tracking-widest text-[10px]">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              ARDS Berlin Criteria
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">PaO2 (mmHg)</label>
                <input 
                  type="number" 
                  value={pao2}
                  onChange={(e) => setPao2(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                  placeholder="85"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">FiO2 (%)</label>
                <input 
                  type="number" 
                  value={fio2Input}
                  onChange={(e) => setFio2Input(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                  placeholder="40"
                />
              </div>
            </div>

            <div className={`p-4 rounded-xl flex flex-col gap-1 transition-all ${severity === 'none' ? 'bg-slate-800' : severity === 'mild' ? 'bg-yellow-500/10 border border-yellow-500/20' : severity === 'moderate' ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${severity === 'none' ? 'text-slate-500' : 'text-white'}`}>P/F Ratio</span>
                <span className={`text-3xl font-black ${severity === 'none' ? 'text-slate-600' : 'text-white'}`}>
                  {pao2 && fio2Input ? ratio : '--'}
                </span>
              </div>
              {severity !== 'none' && (
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${severity === 'mild' ? 'bg-yellow-500 text-black' : severity === 'moderate' ? 'bg-orange-500 text-white' : 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'}`}>
                    {severity} ARDS
                  </span>
                </div>
              )}
              {pao2 && fio2Input && (
                <p className={`text-[10px] mt-2 italic flex items-start gap-1 font-bold ${severity === 'none' ? 'text-slate-400' : 'text-slate-100'}`}>
                   {advice}
                </p>
              )}
            </div>
          </div>

          {/* Driving Pressure Calculator Widget */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 p-4" />
            <h3 className="font-bold text-white flex items-center gap-2 mb-4 pb-3 border-b border-white/10 uppercase tracking-widest text-[10px]">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              Dynamic Driving Pressure ($\Delta P$)
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">P-Plateau</label>
                <input 
                  type="number" 
                  value={plateau}
                  onChange={(e) => setPlateau(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                  placeholder="25"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">PEEP</label>
                <input 
                  type="number" 
                  value={peepInput}
                  onChange={(e) => setPeepInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                  placeholder="8"
                />
              </div>
            </div>

            <div className={`p-4 rounded-xl flex flex-col gap-1 transition-all ${!plateau || !peepInput ? 'bg-slate-800' : isDrivingPressureSafe ? 'bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-red-500/10 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'}`}>
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${!plateau || !peepInput ? 'text-slate-500' : isDrivingPressureSafe ? 'text-emerald-400' : 'text-red-400'}`}>Calculated $\Delta P$</span>
                <span className={`text-3xl font-black ${!plateau || !peepInput ? 'text-slate-600' : isDrivingPressureSafe ? 'text-emerald-400' : 'text-red-400'}`}>
                  {plateau && peepInput ? drivingPressureValue : '--'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: plateau && peepInput ? `${Math.min((drivingPressureValue / 30) * 100, 100)}%` : 0 }}
                  className={`h-full rounded-full transition-all duration-500 ${isDrivingPressureSafe ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}
                />
              </div>
              {plateau && peepInput && (
                <p className={`text-[10px] mt-2 italic flex items-center gap-1 font-bold ${isDrivingPressureSafe ? 'text-emerald-500/80' : 'text-red-400'}`}>
                  <AlertTriangle className="w-3 h-3" />
                  {isDrivingPressureSafe ? 'Physiologic Safety Target Maintained (< 15)' : 'CRITICAL: High Driving Pressure Risk! (VILI)'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Visuals & Strategy */}
        <div className="lg:col-span-8 space-y-8">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={condition}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col min-h-[600px]"
            >
              {/* Strategy Header */}
              <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                   <Wind className="w-64 h-64 text-sky-900" />
                </div>
                <div className="relative z-10">
                  <div className="inline-block px-4 py-1 rounded-full bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg shadow-sky-500/20">
                    Clinical Strategy Card
                  </div>
                  <h3 className="text-4xl font-black text-slate-800 leading-tight tracking-tight">{strategy.title}</h3>
                  <p className="text-slate-600 mt-3 text-lg font-medium leading-relaxed max-w-2xl">{strategy.desc}</p>
                </div>
              </div>

              <div className="p-8 space-y-10 flex-1">
                
                {/* Waveform Dashboard */}
                <div className="space-y-5">
                  <div className="flex justify-between items-end mb-1">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                      <Waves className="w-4 h-4 text-sky-500" /> Scalars & Dynamic Diagnostics
                    </h4>
                    <div className="flex gap-2 items-center">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Sim</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Pressure Scalar */}
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl relative h-[160px] group transition-all hover:border-sky-500/30 overflow-hidden">
                      <span className="absolute top-3 left-4 text-[9px] font-black text-yellow-500/80 uppercase tracking-widest z-10">Pressure (cmH2O)</span>
                      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                        <line x1="0" y1="10" x2="100" y2="10" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4" />
                        <line x1="0" y1="25" x2="100" y2="25" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4" />
                        <line x1="0" y1="40" x2="100" y2="40" stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.2" />
                        <motion.path 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          d={pPath} fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                        />
                        {(condition === 'ards' || condition === 'restrictive') && (
                          <g className="animate-pulse">
                            <circle cx="20" cy="5" r="4.5" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" />
                            <text x="26" y="9" fill="#ef4444" fontSize="4.5" fontWeight="black" className="uppercase font-sans tracking-tighter">High P-Peak</text>
                          </g>
                        )}
                        {condition === 'neuromuscular' && (
                          <circle cx="10" cy="45" r="4" fill="#ef4444" className="animate-bounce shadow-lg" stroke="white" strokeWidth="0.5" />
                        )}
                      </svg>
                    </div>

                    {/* Flow Scalar */}
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl relative h-[160px] hover:border-emerald-500/30 transition-all overflow-hidden">
                      <span className="absolute top-3 left-4 text-[9px] font-black text-emerald-400/80 uppercase tracking-widest z-10">Flow (L/min)</span>
                      {condition === 'obstructive' && (
                        <div className="absolute bottom-3 right-4 flex items-center gap-1 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-lg animate-pulse z-10">
                          <AlertTriangle className="w-2.5 h-2.5" /> AUTO-PEEP
                        </div>
                      )}
                      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                        <line x1="0" y1="25" x2="100" y2="25" stroke="#34d399" strokeWidth="0.5" strokeOpacity="0.2" />
                        <motion.path 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          d={fPath} fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                        />
                        {condition === 'obstructive' && (
                          <g className="animate-pulse">
                            <circle cx="85" cy="30" r="3.5" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="1.5" />
                            <text x="45" y="46" fill="#ef4444" fontSize="4" fontWeight="black" className="uppercase tracking-widest">Trapped Vol</text>
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* P/V Loop */}
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl relative h-[160px] hover:border-indigo-500/30 transition-all overflow-hidden">
                      <span className="absolute top-3 left-4 text-[9px] font-black text-indigo-400/80 uppercase tracking-widest z-10">P/V Loop</span>
                      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(129,140,248,0.2)]">
                        {[20, 50, 80].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="5" />)}
                        {[20, 50, 80].map(x => <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="5" />)}
                        <line x1="5" y1="95" x2="95" y2="95" stroke="#475569" strokeWidth="1.5" />
                        <line x1="5" y1="5" x2="5" y2="95" stroke="#475569" strokeWidth="1.5" />
                        <motion.path 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "linear" }}
                          d={pvPath} fill="rgba(129, 140, 248, 0.08)" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
                        />
                        {(condition === 'ards' || condition === 'restrictive') && (
                          <motion.path 
                            animate={{ opacity: [0.1, 0.6, 0.1] }} 
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            d="M 35 80 L 85 60" 
                            stroke="#ef4444" 
                            strokeWidth="1.5" 
                            strokeDasharray="4" 
                          />
                        )}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Targets & Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                       <TrendingUp className="w-4 h-4 text-emerald-500" /> Volumetric Alignment
                    </h4>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] border border-slate-700 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                           <ActivitySquare className="w-24 h-24 text-white" />
                        </div>
                        <div className="relative z-10 flex justify-between items-center mb-4">
                           <span className="text-[11px] font-black text-sky-400 uppercase tracking-[0.2em]">{targets?.label || 'Tidal Volume'}</span>
                           <Info className="w-4 h-4 text-slate-500 cursor-help hover:text-white transition-colors" />
                        </div>
                        <div className="text-6xl font-black text-white tracking-tighter flex items-baseline gap-2 relative z-10">
                          {ibw > 0 ? `${targets.min} - ${targets.max}` : '---'}
                          <span className="text-2xl font-bold text-sky-500 uppercase tracking-widest">mL</span>
                        </div>
                        {ibw > 0 && (
                          <div className="mt-6 p-4 bg-sky-500/10 rounded-2xl border border-sky-500/20 text-[11px] text-sky-100 font-bold leading-relaxed italic backdrop-blur-sm">
                             Optimized for protective ventilation targets based on clinician-verified IBW.
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4 text-sky-500" /> Tactical Monitoring
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Resp Rate (RR)', val: strategy.rr, icon: Activity, color: 'sky' },
                        { label: 'PEEP Level', val: strategy.peep, icon: ChevronUp, color: 'sky' },
                        { label: 'I:E Ratio', val: strategy.ie, icon: Waves, color: 'sky' },
                        { label: 'O2 Sat Target', val: strategy.targets.split('.')[1]?.trim() || '94-98%', icon: Wind, color: 'sky' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-3xl hover:border-slate-400 transition-all group shadow-sm">
                          <div className="text-[9px] uppercase font-black text-slate-400 mb-2 flex items-center gap-1.5 group-hover:text-slate-600">
                             <item.icon className="w-3 h-3" /> {item.label}
                          </div>
                          <div className="font-black text-slate-900 text-sm tracking-tight">{item.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ARDSNet Integrated Table Section */}
                {condition === 'ards' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-6 border-t border-slate-100"
                  >
                    <button 
                      onClick={() => setShowARDSNet(!showARDSNet)}
                      className="w-full flex justify-between items-center p-6 bg-slate-950 rounded-3xl text-white font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-slate-900/40 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="bg-amber-500/20 p-2 rounded-lg border border-amber-500/30">
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                        </div>
                        ARDSNet Protocol: FiO2 / PEEP Guidelines
                      </div>
                      {showARDSNet ? <ChevronUp className="w-5 h-5 opacity-50" /> : <ChevronDown className="w-5 h-5 opacity-50" />}
                    </button>

                    <AnimatePresence>
                      {showARDSNet && (
                        <motion.div 
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="mt-6 bg-slate-50 rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-inner"
                        >
                          <div className="flex p-2 gap-2 bg-slate-200/50 backdrop-blur-md">
                            <button 
                              onClick={() => setArdsNetType('low')}
                              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${ardsNetType === 'low' ? 'bg-white text-sky-600 shadow-xl' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Low PEEP Strategy
                            </button>
                            <button 
                              onClick={() => setArdsNetType('high')}
                              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${ardsNetType === 'high' ? 'bg-white text-amber-600 shadow-xl' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              High PEEP Strategy
                            </button>
                          </div>

                          <div className="p-8">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
                              {(ardsNetType === 'low' ? ARDS_LOW_PEEP : ARDS_HIGH_PEEP).map((row, idx) => (
                                <div key={idx} className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-sky-400 transition-all hover:shadow-xl group/row translate-y-0 hover:-translate-y-1">
                                  <div className="bg-slate-50 py-2.5 px-2 text-[10px] font-black text-slate-500 text-center border-b border-slate-100 uppercase tracking-tighter">
                                    {(row.fio2 * 100).toFixed(0)}% <span className="opacity-40 font-normal ml-0.5">FiO2</span>
                                  </div>
                                  <div className={`py-3 px-2 text-center font-black text-xl ${ardsNetType === 'low' ? 'text-sky-600' : 'text-amber-600'}`}>
                                    {row.peep}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-8 flex items-start gap-4 bg-amber-100/50 p-6 rounded-[2rem] border border-amber-200 shadow-sm shadow-amber-200/20">
                               <div className="bg-amber-400/20 p-2 rounded-xl">
                                 <Info className="w-5 h-5 text-amber-600" />
                               </div>
                               <p className="text-[12px] text-amber-900 leading-relaxed font-bold">
                                 Recommended {ardsNetType === 'low' ? 'Lower' : 'Higher'} PEEP protocol. Goal: SaO2 88-95% or PaO2 55-80 mmHg. Maintain Plateau Pressure {'<'} 30 cmH2O. Interpretation restricted to clinical practitioners.
                               </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Advanced Mode Card: APRV */}
                {strategy.aprv && (
                  <div className="p-8 bg-gradient-to-br from-indigo-950 to-slate-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                       <ActivitySquare className="w-48 h-48 text-white" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-white text-xl font-black flex items-center gap-3 mb-6">
                         <span className="bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-black shadow-lg shadow-indigo-600/30">Support Protocol</span>
                         Airway Pressure Release Ventilation (APRV)
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
                         {[
                           { label: 'P-High', val: strategy.aprv.phigh, detail: 'Recruitment' },
                           { label: 'P-Low', val: strategy.aprv.plow, detail: 'Exhalation' },
                           { label: 'T-High', val: strategy.aprv.thigh, detail: 'Inspiration' },
                           { label: 'T-Low', val: strategy.aprv.tlow, detail: 'Release' }
                         ].map((param, idx) => (
                           <div key={idx} className="bg-indigo-500/10 p-5 rounded-3xl border border-indigo-400/20 backdrop-blur-md">
                             <div className="text-[10px] uppercase font-black text-indigo-400 tracking-widest mb-1">{param.label}</div>
                             <div className="text-white font-black text-lg mb-1">{param.val}</div>
                             <div className="text-[8px] text-indigo-300/50 uppercase font-bold tracking-widest italic">{param.detail}</div>
                           </div>
                         ))}
                      </div>
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-[11px] text-indigo-100 font-medium leading-relaxed italic">
                        <strong className="text-white">Note:</strong> T-Low should be adjusted to terminate at 50-75% of peak expiratory flow to maintain alveolar recruitment (PEEPi).
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Section */}
                <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="flex items-start gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-200/50 group hover:border-slate-300 transition-colors">
                     <AlertTriangle className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors shrink-0" />
                     <p className="text-[11px] font-bold text-slate-500 leading-relaxed max-w-lg">
                       Theoretical IBW-based tidal volumes and scalars are generated for didactic and clinical decision-support purposes. Strictly monitor for driving pressure trends and patient-ventilator synchrony.
                     </p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                     AnestAssist <span className="text-sky-500">v2.0</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
