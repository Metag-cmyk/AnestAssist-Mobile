import { useState, useEffect } from 'react';
import { Activity, Droplet, RefreshCcw, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateCRRT, calculateIHD, calculatePlasmaExchange } from '../../lib/RenalCalculators';
import { usePatient } from '../../contexts/PatientContext';
import { STORAGE_KEYS } from '../../config/storageKeys';
import { PatientParameterCard } from '../../components/PatientParameterCard';

// Fixed import error in previous thought: it's lucide-react, not luc David-react
import { Activity as ActivityIcon, Droplet as DropletIcon, RefreshCcw as RefreshCcwIcon, Waves as WavesIcon } from 'lucide-react';

type SubTab = 'crrt' | 'ihd' | 'tpe';

export default function RenalModule() {
  const { weight, weightNum, heightNum, ageNum, gender, genderNum } = usePatient() as any; 
  // Note: I'll use the proper types from usePatient
  const patient = usePatient();

  const [activeTab, setActiveTab] = useState<SubTab>(() => {
    return (localStorage.getItem(STORAGE_KEYS.RENAL_ACTIVE_TAB) as SubTab) || 'crrt';
  });

  // CRRT Specific State
  const [crrtHct, setCrrtHct] = useState('35');
  const [crrtQb, setCrrtQb] = useState('150');
  const [crrtPreFilter, setCrrtPreFilter] = useState('50');
  const [crrtTarget, setCrrtTarget] = useState('25');
  const [crrtNetUfr, setCrrtNetUfr] = useState('100');
  const [crrtPbp, setCrrtPbp] = useState('0');

  // IHD Specific State
  const [ihdPreUrea, setIhdPreUrea] = useState('30');
  const [ihdPostUrea, setIhdPostUrea] = useState('10');

  // Persistence Effects
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.RENAL_ACTIVE_TAB, activeTab); }, [activeTab]);

  const crrtResults = calculateCRRT({
    weightKg: patient.weightNum,
    hctPercent: parseFloat(crrtHct) || 0,
    bloodFlowMlMin: parseFloat(crrtQb) || 0,
    preFilterPercent: parseFloat(crrtPreFilter) || 0,
    targetDoseMlKgHr: parseFloat(crrtTarget) || 0,
    netUfrMlHr: parseFloat(crrtNetUfr) || 0,
    pbpMlHr: parseFloat(crrtPbp) || 0
  });

  const tpeResults = calculatePlasmaExchange(patient.weightNum, parseFloat(crrtHct) || 35);

  const ihdResults = calculateIHD({
    preUrea: parseFloat(ihdPreUrea) || 0,
    postUrea: parseFloat(ihdPostUrea) || 0,
    durationHours: 4,
    weightKg: patient.weightNum,
    isMale: patient.gender === 'male',
    age: patient.ageNum,
    heightCm: patient.heightNum
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <PatientParameterCard />

      <div className="bg-slate-900 rounded-xl shadow-xl overflow-hidden text-slate-200 border border-slate-800">
        
        {/* Header */}
        <div className="bg-red-900/30 p-6 border-b border-red-900/50">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <ActivityIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-red-50">Renal Replacement Therapy</h2>
          </div>
        </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('crrt')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${activeTab === 'crrt' ? 'bg-red-600/20 text-red-500 border-b-2 border-red-600' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <RefreshCcwIcon className="w-4 h-4" /> CRRT
        </button>
        <button
          onClick={() => setActiveTab('ihd')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${activeTab === 'ihd' ? 'bg-red-600/20 text-red-500 border-b-2 border-red-600' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <WavesIcon className="w-4 h-4" /> IHD Target
        </button>
        <button
          onClick={() => setActiveTab('tpe')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${activeTab === 'tpe' ? 'bg-red-600/20 text-red-500 border-b-2 border-red-600' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <DropletIcon className="w-4 h-4" /> Plasma Exchange
        </button>
      </div>

      {/* Content */}
      <div className="p-6 bg-slate-800">
        <AnimatePresence mode="wait">
          
          {/* CRRT */}
          {activeTab === 'crrt' && (
            <motion.div key="crrt" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-2">CRRT Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Hct (%)</label>
                      <input type="number" value={crrtHct} onChange={e => setCrrtHct(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Blood Flow ($Q_b$ ml/min)</label>
                      <input type="number" value={crrtQb} onChange={e => setCrrtQb(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Target Dose (mL/kg/hr)</label>
                      <input type="number" value={crrtTarget} onChange={e => setCrrtTarget(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Net UFR (Patient mL/hr)</label>
                      <input type="number" value={crrtNetUfr} onChange={e => setCrrtNetUfr(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Pre-Blood Pump (PBP mL/hr)</label>
                      <input type="number" value={crrtPbp} onChange={e => setCrrtPbp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-pink-500" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Pre-Filter Ratio (%)</label>
                      <input type="range" min="0" max="100" value={crrtPreFilter} onChange={e => setCrrtPreFilter(e.target.value)} className="w-full accent-red-600" />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>{crrtPreFilter}% Pre</span>
                        <span>{100 - parseInt(crrtPreFilter)}% Post</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2">Ideal Prescription (KDIGO)</h3>
                  
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 text-sm">Target Effluent Rate</span>
                    <span className="font-mono text-lg font-bold text-white">{crrtResults.totalEffluentHr.toFixed(0)} mL/hr</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-1 border-t border-slate-800">
                    <span className="text-slate-400 text-sm">Predicted CrCl</span>
                    <span className="font-mono font-bold text-purple-400">{crrtResults.predictedCrCl.toFixed(1)} mL/min</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-800">
                    <span className="text-slate-400 text-sm">Delivered UFR Dose</span>
                    <span className="font-mono font-medium text-amber-300">{crrtResults.deliveredUfrDose.toFixed(1)} mL/kg/hr</span>
                  </div>

                  {crrtResults.pbpRateHr > 0 && (
                    <div className="flex justify-between items-center py-1 border-t border-slate-800">
                      <span className="text-slate-400 text-sm">Pre-Blood Pump (PBP)</span>
                      <span className="font-mono font-medium text-pink-300">{crrtResults.pbpRateHr.toFixed(0)} mL/hr</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-1 border-t border-slate-800">
                    <span className="text-slate-400 text-sm">Dialysate Rate</span>
                    <span className="font-mono font-medium text-blue-300">{crrtResults.dialysateRateHr.toFixed(0)} mL/hr</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-800">
                    <span className="text-slate-400 text-sm">Pre-Filter Replacement</span>
                    <span className="font-mono font-medium text-emerald-300">{crrtResults.preFilterRateHr.toFixed(0)} mL/hr</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-800">
                    <span className="text-slate-400 text-sm">Post-Filter Replacement</span>
                    <span className="font-mono font-medium text-orange-300">{crrtResults.postFilterRateHr.toFixed(0)} mL/hr</span>
                  </div>

                  <div className={`mt-4 p-3 rounded-lg flex justify-between items-center border ${crrtResults.isHighClottingRisk ? 'bg-red-950/50 border-red-500' : 'bg-slate-800 border-slate-700'}`}>
                    <div>
                      <span className="block text-sm font-semibold text-slate-300">Filtration Fraction (FF)</span>
                      {crrtResults.isHighClottingRisk && <span className="text-xs text-red-400 font-bold block mt-1">High Clotting Risk (FF &gt; 25%)</span>}
                    </div>
                    <span className={`font-mono text-2xl font-bold ${crrtResults.isHighClottingRisk ? 'text-red-500' : 'text-green-400'}`}>
                      {crrtResults.filtrationFraction.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* IHD */}
          {activeTab === 'ihd' && (
            <motion.div key="ihd" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-2">Urea Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Pre-BUN/Urea</label>
                      <input type="number" value={ihdPreUrea} onChange={e => setIhdPreUrea(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Post-BUN/Urea</label>
                      <input type="number" value={ihdPostUrea} onChange={e => setIhdPostUrea(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2">Target Outputs</h3>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400 text-sm">Volume of Distribution (V)</span>
                    <span className="font-mono text-lg font-medium text-white">{ihdResults.estimatedVolumeLiters > 0 ? ihdResults.estimatedVolumeLiters.toFixed(1) : '-'} L</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-t border-slate-800">
                    <span className="text-slate-400 text-sm font-bold">Urea Reduction Ratio (URR)</span>
                    <span className="font-mono text-2xl font-bold text-blue-400">{ihdResults.urr > 0 ? ihdResults.urr.toFixed(1) : '-'}%</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-t border-slate-800">
                    <span className="text-slate-400 text-sm font-bold">Estimated spKt/V</span>
                    <span className="font-mono text-2xl font-bold text-red-400">{ihdResults.estimatedKtV > 0 ? ihdResults.estimatedKtV.toFixed(2) : '-'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TPE */}
          {activeTab === 'tpe' && (
            <motion.div key="tpe" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-2">Treatment Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Hct (%)</label>
                      <input type="number" value={crrtHct} onChange={e => setCrrtHct(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
                  </div>
                  <div className="p-3 mt-4 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-700">
                    Calculated using Kaplan Formula: EPV = (0.065 × Wt) × (1 - Hct)
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2">Exchange Volumes</h3>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400 text-sm">Estimated Plasma Volume (EPV)</span>
                    <span className="font-mono text-lg font-bold text-white">{tpeResults.epvLiters.toFixed(2)} L</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-t border-slate-800">
                    <span className="text-slate-400 text-sm font-bold">1.0x Volume Exchange</span>
                    <span className="font-mono text-2xl font-bold text-red-400">{tpeResults.oneVolumeExchangeLiters.toFixed(2)} L</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-t border-slate-800">
                    <span className="text-slate-400 text-sm font-bold">1.5x Volume Exchange</span>
                    <span className="font-mono text-2xl font-bold text-orange-400">{tpeResults.onePointFiveExchangeLiters.toFixed(2)} L</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  </div>
);
}
