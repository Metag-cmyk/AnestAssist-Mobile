import { useState, useEffect } from 'react';
import { Activity, Droplet, RefreshCcw, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateCRRT, calculateIHD, calculatePlasmaExchange, calculateAKIStage, interpretFST, calculateFluidOverload, calculateRCA } from '../../lib/RenalCalculators';

// Fixed import error in previous thought: it's lucide-react, not luc David-react
import { Activity as ActivityIcon, Droplet as DropletIcon, RefreshCcw as RefreshCcwIcon, Waves as WavesIcon } from 'lucide-react';

type SubTab = 'crrt' | 'ihd' | 'tpe' | 'aki' | 'rca';

export default function RenalModule() {
  // Persistence Keys
  const K_TAB = 'anestassist_renal_active_subtab';
  const K_WEIGHT = 'anestassist_patient_weight';
  const K_HEIGHT = 'anestassist_patient_height';
  const K_AGE = 'anestassist_patient_age';
  const K_GENDER = 'anestassist_patient_gender';

  const [activeTab, setActiveTab] = useState<SubTab>(() => {
    return (localStorage.getItem(K_TAB) as SubTab) || 'crrt';
  });

  // Shared Patient State (Persistent)
  const [weight, setWeight] = useState(() => localStorage.getItem(K_WEIGHT) || '70');
  const [height, setHeight] = useState(() => localStorage.getItem(K_HEIGHT) || '175');
  const [age, setAge] = useState(() => localStorage.getItem(K_AGE) || '30');
  const [isMale, setIsMale] = useState(() => localStorage.getItem(K_GENDER) !== 'female');

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

  // AKI & FO Specific State
  const [baselineCr, setBaselineCr] = useState('80');
  const [currentCr, setCurrentCr] = useState('120');
  const [uoTotal, setUoTotal] = useState('500');
  const [uoHours, setUoHours] = useState('12');
  const [fstUo, setFstUo] = useState('150');
  const [intakeL, setIntakeL] = useState('5');
  const [outputL, setOutputL] = useState('3');

  // RCA Specific State
  const [rcaTarget, setRcaTarget] = useState('3.0');
  const [rcaCitrateConc, setRcaCitrateConc] = useState('136');
  const [rcaCalciumConc, setRcaCalciumConc] = useState('0.22');

  // Persistence Effects
  useEffect(() => { localStorage.setItem(K_TAB, activeTab); }, [activeTab]);
  useEffect(() => { localStorage.setItem(K_WEIGHT, weight); }, [weight]);
  useEffect(() => { localStorage.setItem(K_HEIGHT, height); }, [height]);
  useEffect(() => { localStorage.setItem(K_AGE, age); }, [age]);
  useEffect(() => { localStorage.setItem(K_GENDER, isMale ? 'male' : 'female'); }, [isMale]);

  const crrtResults = calculateCRRT({
    weightKg: parseFloat(weight) || 0,
    hctPercent: parseFloat(crrtHct) || 0,
    bloodFlowMlMin: parseFloat(crrtQb) || 0,
    preFilterPercent: parseFloat(crrtPreFilter) || 0,
    targetDoseMlKgHr: parseFloat(crrtTarget) || 0,
    netUfrMlHr: parseFloat(crrtNetUfr) || 0,
    pbpMlHr: parseFloat(crrtPbp) || 0
  });

  const tpeResults = calculatePlasmaExchange(parseFloat(weight) || 0, parseFloat(crrtHct) || 35);

  const ihdResults = calculateIHD({
    preUrea: parseFloat(ihdPreUrea) || 0,
    postUrea: parseFloat(ihdPostUrea) || 0,
    durationHours: 4,
    weightKg: parseFloat(weight) || 0,
    isMale: isMale,
    age: parseFloat(age) || 0,
    heightCm: parseFloat(height) || 0
  });

  const akiResults = calculateAKIStage({
    baselineCr: parseFloat(baselineCr) || 0,
    currentCr: parseFloat(currentCr) || 0,
    urineOutTotal: parseFloat(uoTotal) || 0,
    hours: parseFloat(uoHours) || 0,
    weightKg: parseFloat(weight) || 0
  });

  const fstResults = interpretFST(parseFloat(fstUo) || 0);

  const foPercent = calculateFluidOverload(
    parseFloat(intakeL) || 0,
    parseFloat(outputL) || 0,
    parseFloat(weight) || 0
  );

  const rcaResults = calculateRCA({
    bloodFlowMlMin: parseFloat(crrtQb) || 0,
    targetCitrateDose: parseFloat(rcaTarget) || 3.0,
    citrateConcentration: parseFloat(rcaCitrateConc) || 136,
    calciumConcentration: parseFloat(rcaCalciumConc) || 0.22
  });

  return (
    <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl shadow-xl overflow-hidden text-slate-200">
      
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
        <button
          onClick={() => setActiveTab('aki')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${activeTab === 'aki' ? 'bg-red-600/20 text-red-500 border-b-2 border-red-600' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <ActivityIcon className="w-4 h-4" /> Diagnostics & FO%
        </button>
        <button
          onClick={() => setActiveTab('rca')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${activeTab === 'rca' ? 'bg-red-600/20 text-red-500 border-b-2 border-red-600' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <WavesIcon className="w-4 h-4" /> Citrate (RCA)
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
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Weight (kg)</label>
                      <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
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
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Pre-Filter Ratio (%) - Replace</label>
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
                  <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-2">Anthropometrics & Urea</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Sex</label>
                      <select value={isMale ? '1' : '0'} onChange={e => setIsMale(e.target.value === '1')} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500">
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Age (yrs)</label>
                      <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Height (cm)</label>
                      <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Weight (kg)</label>
                      <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4 mt-2 border-t border-slate-700 pt-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Pre-BUN/Urea (mmol/L)</label>
                        <input type="number" step="0.1" value={ihdPreUrea} onChange={e => setIhdPreUrea(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Post-BUN/Urea (mmol/L)</label>
                        <input type="number" step="0.1" value={ihdPostUrea} onChange={e => setIhdPostUrea(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                      </div>
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
                  <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-2">Patient Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Weight (kg)</label>
                      <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                    </div>
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

          {/* AKI & Fluid Overload */}
          {activeTab === 'aki' && (
            <motion.div key="aki" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Inputs */}
                <div className="space-y-6">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 space-y-4">
                    <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wider">KDIGO Staging Parameters</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Baseline Cr (µmol/L)</label>
                        <input type="number" value={baselineCr} onChange={e => setBaselineCr(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Current Cr (µmol/L)</label>
                        <input type="number" value={currentCr} onChange={e => setCurrentCr(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">UO Total (mL)</label>
                        <input type="number" value={uoTotal} onChange={e => setUoTotal(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">UO Duration (hrs)</label>
                        <input type="number" value={uoHours} onChange={e => setUoHours(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 space-y-4">
                    <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wider">Fluid Balance</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Total Intake (L)</label>
                        <input type="number" step="0.1" value={intakeL} onChange={e => setIntakeL(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Total Output (L)</label>
                        <input type="number" step="0.1" value={outputL} onChange={e => setOutputL(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 space-y-4">
                    <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wider">Furosemide Stress Test</h3>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">2-Hour Post-FST Output (mL)</label>
                      <input type="number" value={fstUo} onChange={e => setFstUo(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500" />
                    </div>
                  </div>
                </div>

                {/* Results Dashboard */}
                <div className="space-y-6">
                  {/* KDIGO Badge */}
                  <div className={`p-6 rounded-2xl border-2 text-center transition-all ${akiResults.stage === 0 ? 'bg-slate-900 border-slate-700' : akiResults.stage === 1 ? 'bg-amber-900/30 border-amber-600' : akiResults.stage === 2 ? 'bg-orange-900/30 border-orange-600' : 'bg-red-900/30 border-red-600'}`}>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Current KDIGO AKI Stage</p>
                    <h4 className={`text-5xl font-black ${akiResults.stage === 0 ? 'text-slate-100' : akiResults.stage === 1 ? 'text-amber-500' : akiResults.stage === 2 ? 'text-orange-500' : 'text-red-500'}`}>
                      {akiResults.stage === 0 ? 'NONE' : `STAGE ${akiResults.stage}`}
                    </h4>
                    <p className="text-[10px] font-bold mt-2 text-slate-500 uppercase tracking-tighter">Criteria: {akiResults.reason}</p>
                  </div>

                  {/* Fluid Overload Gauge */}
                  <div className={`p-5 rounded-xl border flex justify-between items-center ${foPercent > 10 ? 'bg-rose-950/50 border-rose-500' : 'bg-slate-900 border-slate-700'}`}>
                    <div className="space-y-1">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Fluid Overload % (FO%)</span>
                      <span className={`block text-[10px] font-black ${foPercent > 10 ? 'text-rose-400' : 'text-slate-500'}`}>
                        {foPercent > 10 ? 'HIGH MORTALITY RISK (>10%)' : 'NORMAL RANGE'}
                      </span>
                    </div>
                    <span className={`font-mono text-3xl font-black ${foPercent > 10 ? 'text-rose-500' : 'text-blue-400'}`}>
                      {foPercent.toFixed(1)}%
                    </span>
                  </div>

                  {/* FST Card */}
                  <div className={`p-5 rounded-xl border border-slate-700 bg-slate-900/80 ${typeof fstResults === 'string' ? '' : fstResults.isPositive ? 'border-emerald-500/50' : 'border-red-500'}`}>
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">FST Response Interpretation</h5>
                    {typeof fstResults === 'string' ? (
                      <p className="text-sm font-bold text-slate-400 italic">No FST data provided.</p>
                    ) : (
                      <>
                        <p className={`text-lg font-black ${fstResults.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                          {fstResults.risk}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 font-medium italic">
                          "{fstResults.recommendation}"
                        </p>
                      </>
                    )}
                  </div>

                  {/* Recommendations */}
                  <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                      <ActivityIcon className="w-3 h-3" /> Management Guidance
                    </p>
                    <ul className="text-[11px] text-slate-400 space-y-2 list-disc pl-4 font-medium">
                      {akiResults.stage >= 1 && <li>Stop nephrotoxic agents (NSAIDs, ACEi/ARBs, contrast).</li>}
                      {akiResults.stage >= 2 && <li>Adjust medication doses and consider early nephrology referral.</li>}
                      {akiResults.stage === 3 && <li className="text-red-400 font-bold">Evaluate for urgent RRT initiation (AEIOU criteria).</li>}
                      {foPercent > 10 && <li className="text-rose-400 font-bold">Fluid overload &gt; 10%: Start ultrafiltration/CRRT.</li>}
                      <li>Monitor electrolytes and acid-base status Q6-12h.</li>
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          )}


          {/* RCA Anticoagulation */}
          {activeTab === 'rca' && (
            <motion.div key="rca" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Inputs */}
                <div className="space-y-6">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 space-y-4">
                    <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wider">Citrate Prescription</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Blood Flow (Qb) mL/min</label>
                        <input type="number" value={crrtQb} onChange={e => setCrrtQb(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                        <span className="text-[10px] text-slate-500 italic mt-1 block">Synced with CRRT tab</span>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Target Citrate Dose</label>
                        <input type="number" step="0.1" value={rcaTarget} onChange={e => setRcaTarget(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500" />
                        <span className="text-[10px] text-slate-500 italic mt-1 block">mmol/L blood (Default 3.0)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 space-y-4">
                    <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wider">Fluid Concentrations</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Citrate (mmol/L)</label>
                        <input type="number" value={rcaCitrateConc} onChange={e => setRcaCitrateConc(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
                        <span className="text-[10px] text-slate-500 italic mt-1 block">4% NaCitrate = 136</span>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Calcium Gluconate (mmol/mL)</label>
                        <input type="number" step="0.01" value={rcaCalciumConc} onChange={e => setRcaCalciumConc(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" />
                        <span className="text-[10px] text-slate-500 italic mt-1 block">10% Gluconate = 0.22</span>
                      </div>
                    </div>
                  </div>

                  {/* Adjustment Guide Table */}
                  <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-850">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Post-Filter iCa Adjustments</h4>
                    <div className="space-y-1">
                      <div className="grid grid-cols-2 text-[10px] font-black text-slate-500 py-1 uppercase border-b border-slate-800">
                        <span>Post-Filter iCa</span>
                        <span className="text-right text-medical-primary">Action (Qcit)</span>
                      </div>
                      {[
                        { range: '> 0.50', action: '+ 0.5 mmol/L' },
                        { range: '0.35 - 0.50', action: '+ 0.2 mmol/L' },
                        { range: '0.25 - 0.35', action: 'NO CHANGE' },
                        { range: '< 0.25', action: '- 0.2 mmol/L' },
                      ].map((row, i) => (
                        <div key={i} className={`grid grid-cols-2 py-2 text-[11px] font-bold border-b border-slate-900/50 ${row.range === '0.25 - 0.35' ? 'text-emerald-400' : 'text-slate-400'}`}>
                          <span>{row.range} mmol/L</span>
                          <span className="text-right">{row.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dashboard Results */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Citrate Result */}
                    <div className="bg-slate-900 p-6 rounded-2xl border-2 border-blue-600/30 shadow-lg">
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Standard Citrate Rate (Qcit)</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white">{rcaResults.citrateRate.toFixed(0)}</span>
                        <span className="text-xl font-bold text-slate-500 underline decoration-blue-500/50">mL/h</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium mt-3 italic leading-relaxed">
                        Infuse pre-filter or via dedicated venous accessory line.
                      </p>
                    </div>

                    {/* Calcium Result */}
                    <div className="bg-slate-900 p-6 rounded-2xl border-2 border-emerald-600/30 shadow-lg">
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Systemic Calcium Rate (QCa)</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white">{rcaResults.calciumRate.toFixed(1)}</span>
                        <span className="text-xl font-bold text-slate-500 underline decoration-emerald-500/50">mL/h</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-tight">
                        Starting dose: {rcaResults.calciumMmolHr.toFixed(2)} mmol/h
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-3 italic leading-relaxed">
                        Infuse into blood return line (post-filter) or central access.
                      </p>
                    </div>
                  </div>

                  {/* Systemic iCa titration */}
                  <div className="bg-rose-900/10 p-5 rounded-2xl border border-rose-900/30">
                    <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <DropletIcon className="w-3 h-3" /> Systemic Calcium Adjustment
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-300">
                        <span>iCa &gt; 1.45</span>
                        <span className="text-rose-400">- 20% Rate</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-300">
                        <span>iCa 1.10 - 1.30</span>
                        <span className="text-emerald-400">NO CHANGE (Target)</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-300">
                        <span>iCa &lt; 0.90</span>
                        <span className="text-rose-400">Bolus Ca + Increase 20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-900/20 border border-amber-900/50 rounded-xl flex gap-3 items-start">
                    <ActivityIcon className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-100 font-medium leading-relaxed italic">
                      Monitor systemic iCa and post-filter iCa every 1-2 hours initially, then Q6-12h once stable. Watch for "Citrate Gap" (Total Ca / Ionized Ca &gt; 2.5) indicating citrate toxicity.
                    </p>
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
