import { useState } from 'react';
import { Droplets, Activity, AlertTriangle, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type SubTab = 'fluids' | 'sodium';
type Sex = 'male' | 'female';
type InfusateType = '3%' | '0.9%' | 'LR' | '0.45%' | 'D5W' | 'Custom';

export default function FluidsModule() {
  const [activeTab, setActiveTab] = useState<SubTab>('fluids');

  // Fluid & Blood State
  const [weight, setWeight] = useState<number>(70);
  const [startHct, setStartHct] = useState<number>(45);
  const [targetHct, setTargetHct] = useState<number>(30);
  const [fastingHours, setFastingHours] = useState<number>(8);

  // EBV (Estimated Blood Volume) - using 70 ml/kg for average adult as default approximation
  const ebv = weight * 70;

  // MABL (Maximum Allowable Blood Loss)
  const mabl = ebv * ((startHct - targetHct) / startHct);

  // 4-2-1 Rule for maintenance fluids
  const getMaintenanceRate = (w: number) => {
    if (w <= 10) return w * 4;
    if (w <= 20) return 40 + ((w - 10) * 2);
    return 60 + (w - 20);
  };

  const maintenanceRate = getMaintenanceRate(weight);
  const fastingDeficit = maintenanceRate * fastingHours;

  // Sodium Correction State
  const [sodiumSex, setSodiumSex] = useState<Sex>('male');
  const [sodiumAge, setSodiumAge] = useState<number>(60);
  const [sodiumWeight, setSodiumWeight] = useState<number>(70);
  const [currentNa, setCurrentNa] = useState<number>(120);
  const [infusateType, setInfusateType] = useState<InfusateType>('3%');
  const [customInfusateNa, setCustomInfusateNa] = useState<number>(513);
  const [customInfusateK, setCustomInfusateK] = useState<number>(0);
  const [targetCorrectionRate, setTargetCorrectionRate] = useState<number>(0.5);

  // Constants for Infusates (mEq/L)
  const infusates: Record<Exclude<InfusateType, 'Custom'>, { na: number, k: number }> = {
    '3%': { na: 513, k: 0 },
    '0.9%': { na: 154, k: 0 },
    'LR': { na: 130, k: 4 },
    '0.45%': { na: 77, k: 0 },
    'D5W': { na: 0, k: 0 }
  };

  // Sodium Correction Calculations (Adrogue-Madias Formula)
  const calculateTBW = (sex: Sex, age: number, weight: number) => {
    let factor = 0.5; // default
    if (sex === 'male') {
      factor = age < 65 ? 0.6 : 0.5;
    } else {
      factor = age < 65 ? 0.5 : 0.45;
    }
    return weight * factor;
  };

  const tbw = calculateTBW(sodiumSex, sodiumAge, sodiumWeight);

  const getInfusateValues = () => {
    if (infusateType === 'Custom') {
      return { na: customInfusateNa, k: customInfusateK };
    }
    return infusates[infusateType];
  };

  const { na: infNa, k: infK } = getInfusateValues();

  // Expected change in serum Na+ per 1 Liter of infusate
  // Formula: ((Infusate Na + Infusate K) - Current Na) / (TBW + 1)
  const naChangePerLiter = ((infNa + infK) - currentNa) / (tbw + 1);

  // Infusion rate (mL/hr) to achieve target correction rate (mEq/L/hr)
  // Need absolute value because we might be correcting hypernatremia (negative change)
  const infusionRateMlHr = naChangePerLiter !== 0
    ? (targetCorrectionRate / Math.abs(naChangePerLiter)) * 1000
    : 0;

  // Expected daily change
  const expected24hrChange = targetCorrectionRate * 24;
  const isHighRisk = expected24hrChange > 8;

  return (
    <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl shadow-xl overflow-hidden text-slate-200">

      {/* Header */}
      <div className="bg-blue-900/30 p-6 border-b border-blue-900/50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-50">Fluids & Electrolytes</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('fluids')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${activeTab === 'fluids' ? 'bg-blue-600/20 text-blue-500 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <Droplets className="w-4 h-4" /> Fluids & Blood
        </button>
        <button
          onClick={() => setActiveTab('sodium')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${activeTab === 'sodium' ? 'bg-blue-600/20 text-blue-500 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
          <Waves className="w-4 h-4" /> Sodium Correction
        </button>
      </div>

      {/* Content */}
      <div className="p-6 bg-slate-800">
        <AnimatePresence mode="wait">
          {activeTab === 'fluids' && (
            <motion.div key="fluids" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="space-y-6">
                {/* Input Parameters */}
                <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <h3 className="font-bold text-slate-100">Patient Parameters</h3>
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        min="0"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value) || 0)}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Starting Hct (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={startHct}
                        onChange={(e) => setStartHct(Number(e.target.value) || 0)}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Target Hct (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={targetHct}
                        onChange={(e) => setTargetHct(Number(e.target.value) || 0)}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Fasting Hours</label>
                      <input
                        type="number"
                        min="0"
                        value={fastingHours}
                        onChange={(e) => setFastingHours(Number(e.target.value) || 0)}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* MABL & Fluids Calculator */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* MABL */}
                  <div className="bg-red-950/30 rounded-xl border border-red-900/50 overflow-hidden">
                    <div className="p-4 border-b border-red-900/50 flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-red-500" />
                      <h3 className="font-bold text-red-100">Blood Management</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-end border-b border-red-900/30 pb-2">
                        <span className="text-sm font-medium text-red-200">Estimated Blood Vol (EBV)</span>
                        <span className="text-lg font-bold text-red-400">{Math.round(ebv)} <span className="text-sm font-normal text-red-500/70">mL</span></span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-red-200">Max Allowable Blood Loss (MABL)</span>
                        <span className="text-2xl font-bold text-red-500">{Math.max(0, Math.round(mabl))} <span className="text-sm font-normal text-red-500/70">mL</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Maintenance Fluids */}
                  <div className="bg-blue-950/30 rounded-xl border border-blue-900/50 overflow-hidden">
                    <div className="p-4 border-b border-blue-900/50 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <h3 className="font-bold text-blue-100">Fluid Management (4-2-1)</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-end border-b border-blue-900/30 pb-2">
                        <span className="text-sm font-medium text-blue-200">Maintenance Rate</span>
                        <span className="text-lg font-bold text-blue-400">{Math.round(maintenanceRate)} <span className="text-sm font-normal text-blue-500/70">mL/hr</span></span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-blue-200">Fasting Deficit</span>
                        <span className="text-2xl font-bold text-blue-500">{Math.round(fastingDeficit)} <span className="text-sm font-normal text-blue-500/70">mL</span></span>
                      </div>
                      <p className="text-xs text-blue-400/80 italic mt-2 text-center">Replace 1/2 deficit in 1st hour, 1/4 in 2nd, 1/4 in 3rd.</p>
                    </div>
                  </div>
                </div>

                 {/* MTP Quick Reference */}
                 <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 flex gap-3 items-start">
                   <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                   <div>
                     <h3 className="font-bold text-slate-100 text-sm">Massive Transfusion Protocol (MTP)</h3>
                     <p className="text-xs text-slate-400 mt-1">Definition: Replacement of &gt;1 blood volume in 24h, or &gt;50% in 4h.<br/>Goal Ratio: 1:1:1 (PRBC : FFP : Platelets).<br/>Remember to monitor and treat: Hypothermia, Acidosis, Hypocalcemia (administer Calcium after every few units of blood products).</p>
                   </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sodium' && (
            <motion.div key="sodium" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="space-y-6">

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Patient Info */}
                  <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-cyan-400" />
                      <h3 className="font-bold text-slate-100">Patient Data</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Sex</label>
                          <select
                            value={sodiumSex}
                            onChange={(e) => setSodiumSex(e.target.value as Sex)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Age (yrs)</label>
                          <input
                            type="number"
                            min="0"
                            value={sodiumAge}
                            onChange={(e) => setSodiumAge(Number(e.target.value) || 0)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Weight (kg)</label>
                          <input
                            type="number"
                            min="0"
                            value={sodiumWeight}
                            onChange={(e) => setSodiumWeight(Number(e.target.value) || 0)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Current Na⁺ (mEq/L)</label>
                          <input
                            type="number"
                            min="100"
                            max="180"
                            value={currentNa}
                            onChange={(e) => setCurrentNa(Number(e.target.value) || 0)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-slate-500 flex justify-between border-t border-slate-800 pt-2">
                        <span>Total Body Water (TBW):</span>
                        <span className="font-mono text-cyan-400">{tbw.toFixed(1)} L</span>
                      </div>
                    </div>
                  </div>

                  {/* Infusate Params */}
                  <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                      <Waves className="w-5 h-5 text-cyan-400" />
                      <h3 className="font-bold text-slate-100">Correction Fluid</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">IV Fluid Type</label>
                        <select
                          value={infusateType}
                          onChange={(e) => setInfusateType(e.target.value as InfusateType)}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                        >
                          <option value="3%">3% NaCl (Hypertonic)</option>
                          <option value="0.9%">0.9% NaCl (Normal Saline)</option>
                          <option value="LR">Lactated Ringer's</option>
                          <option value="0.45%">0.45% NaCl (Half Normal)</option>
                          <option value="D5W">D5W</option>
                          <option value="Custom">Custom</option>
                        </select>
                      </div>

                      {infusateType === 'Custom' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Fluid Na⁺ (mEq/L)</label>
                            <input
                              type="number"
                              value={customInfusateNa}
                              onChange={(e) => setCustomInfusateNa(Number(e.target.value) || 0)}
                              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Fluid K⁺ (mEq/L)</label>
                            <input
                              type="number"
                              value={customInfusateK}
                              onChange={(e) => setCustomInfusateK(Number(e.target.value) || 0)}
                              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Target Rate (mEq/L/hr)</label>
                        <div className="flex items-center gap-2">
                           <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            value={targetCorrectionRate}
                            onChange={(e) => setTargetCorrectionRate(Number(e.target.value) || 0)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Suggested: 0.5 - 1.0 mEq/L/hr for severe symptoms</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="bg-cyan-950/30 rounded-xl border border-cyan-900/50 p-6 space-y-4">
                  <h3 className="font-bold text-cyan-100 border-b border-cyan-900/30 pb-2 mb-4">Adrogue-Madias Calculation</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                        <div className="text-sm font-medium text-slate-400 mb-1">1 Liter of {infusateType === 'Custom' ? 'fluid' : infusateType} will change serum Na⁺ by:</div>
                        <div className="text-3xl font-bold text-white font-mono">
                          {naChangePerLiter > 0 ? '+' : ''}{naChangePerLiter.toFixed(2)} <span className="text-lg text-slate-400">mEq/L</span>
                        </div>
                     </div>

                     <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                        <div className="text-sm font-medium text-slate-400 mb-1">Required Infusion Rate:</div>
                        <div className="text-3xl font-bold text-cyan-400 font-mono">
                          {Math.round(infusionRateMlHr)} <span className="text-lg text-cyan-600/70">mL/hr</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">to achieve {targetCorrectionRate} mEq/L/hr change</div>
                     </div>
                  </div>
                </div>

                {/* Clinical Warnings */}
                {isHighRisk ? (
                  <div className="bg-red-950/50 rounded-xl border border-red-500/50 p-4 flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-red-400 text-sm">High Risk Correction Rate</h3>
                      <p className="text-sm text-red-200/80 mt-1">
                        Current settings result in an expected change of <strong>{expected24hrChange.toFixed(1)} mEq/L</strong> over 24 hours.
                      </p>
                      <p className="text-xs text-red-300 mt-2">
                        Rapid correction (&gt;8-10 mEq/L in 24 hours) strongly increases the risk of Osmotic Demyelination Syndrome (ODS). Use extreme caution.
                      </p>
                    </div>
                  </div>
                ) : (
                   <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">Important Safety Notice</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Do not exceed a correction rate of <strong>8 mEq/L per 24 hours</strong> to avoid Osmotic Demyelination Syndrome.
                        Calculations are estimates; frequent clinical reassessment and serum sodium checks (e.g., every 2-4 hours) are mandatory.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
