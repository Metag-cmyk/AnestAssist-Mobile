import { useState, useMemo } from 'react';
import { Flame, Activity, ShieldAlert, Scale, ChevronRight, CheckCircle2, AlertTriangle, ThermometerSun, Wind, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePatient } from '../../contexts/PatientContext';
import { 
  calculateMifflinStJeor, 
  calculatePennState, 
  calculateProteinTargets, 
  calculateNUTRIC,
  RefeedingChecklist 
} from '../../lib/NutritionCalculators';

type SubTab = 'targets' | 'nutric' | 'refeeding';

export default function NutritionModule() {
  const { patient, setPatient, bsa, ibw, bmi, lbm, crcl } = usePatient();
  const { weightKg: weight, heightCm: height, age, sex } = patient;
  const isMale = sex === 'male';
  
  const [activeTab, setActiveTab] = useState<SubTab>('targets');
  
  // Targets State
  const [isVentilated, setIsVentilated] = useState(false);
  const [tMax, setTMax] = useState('38.0');
  const [vE, setVE] = useState('8.5');
  const [isRRT, setIsRRT] = useState(false);
  const [activityLevel, setActivityLevel] = useState<'low' | 'standard' | 'high'>('standard');

  // NUTRIC State
  const [apacheII, setApacheII] = useState('18');
  const [sofa, setSofa] = useState('7');
  const [comorbidities, setComorbidities] = useState('1');
  const [hospDays, setHospDays] = useState('0');

  // Refeeding State
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  const bmr = useMemo(() => calculateMifflinStJeor({
    weightKg: Number(weight) || 0,
    heightCm: Number(height) || 0,
    age: Number(age) || 0,
    isMale
  }), [weight, height, age, isMale]);

  const caloricTarget = useMemo(() => {
    if (isVentilated) {
      return calculatePennState(bmr, parseFloat(tMax) || 37, parseFloat(vE) || 5);
    }
    return bmr * (activityLevel === 'low' ? 1.1 : activityLevel === 'high' ? 1.5 : 1.3);
  }, [bmr, isVentilated, tMax, vE, activityLevel]);

  const protein = useMemo(() => calculateProteinTargets({
    weightKg: Number(weight) || 0,
    bmi: bmi || 0,
    isRRT,
    activityLevel
  }), [weight, bmi, isRRT, activityLevel]);

  const nutricResults = useMemo(() => calculateNUTRIC({
    age: Number(age) || 0,
    apacheII: parseInt(apacheII) || 0,
    sofa: parseInt(sofa) || 0,
    comorbidities: parseInt(comorbidities) || 0,
    daysInHospitalPreICU: parseInt(hospDays) || 0
  }), [age, apacheII, sofa, comorbidities, hospDays]);

  return (
    <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-lg">
            <Flame className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">NUTRITION & METABOLISM</h1>
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest opacity-80">Critical Care Support</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950">
        {[
          { id: 'targets', label: 'Energy Targets', icon: Scale },
          { id: 'nutric', label: 'NUTRIC Risk', icon: Activity },
          { id: 'refeeding', label: 'Refeeding Risk', icon: ShieldAlert },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as SubTab)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'targets' && (
            <motion.div key="targets" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                  {/* Patient Parameters Card */}
                  <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest flex items-center gap-2">
                       <UserCircle className="w-3 h-3 text-blue-500" /> Patient Parameters
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Weight (kg)</label>
                        <input 
                          type="number" 
                          value={weight} 
                          onChange={e => setPatient({ weightKg: Number(e.target.value) || '' })} 
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:border-blue-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Height (cm)</label>
                        <input 
                          type="number" 
                          value={height} 
                          onChange={e => setPatient({ heightCm: Number(e.target.value) || '' })} 
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:border-blue-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Age (years)</label>
                        <input 
                          type="number" 
                          value={age} 
                          onChange={e => setPatient({ age: Number(e.target.value) || '' })} 
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:border-blue-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Biological Sex</label>
                        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                          <button 
                            onClick={() => setPatient({ sex: 'male' })}
                            className={`flex-1 py-1 text-[10px] font-bold rounded ${sex === 'male' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                          >
                            MALE
                          </button>
                          <button 
                            onClick={() => setPatient({ sex: 'female' })}
                            className={`flex-1 py-1 text-[10px] font-bold rounded ${sex === 'female' ? 'bg-rose-600 text-white' : 'text-slate-500'}`}
                          >
                            FEMALE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800 space-y-4">

                    {isVentilated ? (
                      <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                            <ThermometerSun className="w-3 h-3" /> Max Temp (°C)
                          </label>
                          <input type="number" step="0.1" value={tMax} onChange={e => setTMax(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                            <Wind className="w-3 h-3" /> Minute Vent (L/min)
                          </label>
                          <input type="number" step="0.1" value={vE} onChange={e => setVE(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-[10px] text-slate-500 font-medium italic">Standard weight-based Mifflin-St Jeor equation. Adjust activity level below.</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest">Adjustments</h3>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setIsRRT(!isRRT)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isRRT ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                        {isRRT ? 'RRT Active (+0.5g/kg Protein)' : 'No RRT'}
                      </button>
                      {(['low', 'standard', 'high'] as const).map(lvl => (
                        <button key={lvl} onClick={() => setActivityLevel(lvl)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activityLevel === lvl ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                          {lvl.toUpperCase()} STRESS
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dashboard */}
                <div className="space-y-6">
                   <div className="bg-slate-950 p-6 rounded-3xl border-2 border-orange-500/20 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
                      <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-2">Total Energy Goal</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-white">{caloricTarget.toFixed(0)}</span>
                        <span className="text-xl font-bold text-slate-500 underline decoration-orange-500/30">Kcal/day</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Basal BMR: {bmr.toFixed(0)} kcal</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${isVentilated ? 'bg-indigo-900/50 text-indigo-400' : 'bg-orange-900/50 text-orange-400'}`}>
                          {isVentilated ? 'DYNAMIC MODEL' : 'ESTIMATED'}
                        </span>
                      </div>
                   </div>

                   <div className="bg-slate-950 p-6 rounded-3xl border-2 border-blue-500/20 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2">Protein Target</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white">{protein.min.toFixed(0)}-{protein.max.toFixed(0)}</span>
                        <span className="text-xl font-bold text-slate-500 underline decoration-blue-500/30">g/day</span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <span className="text-[10px] font-bold px-2 py-1 bg-slate-900 rounded-lg text-slate-400">Unit Dose: {protein.doseGkg.toFixed(1)} g/kg/d</span>
                        {bmi && bmi >= 30 && <span className="text-[10px] font-bold px-2 py-1 bg-rose-900/30 text-rose-400 rounded-lg">Obesity Adjusted</span>}
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'nutric' && (
            <motion.div key="nutric" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 space-y-4">
                       <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-2">NUTRIC Parameters</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">APACHE II</label>
                            <input type="number" value={apacheII} onChange={e => setApacheII(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">SOFA Score</label>
                            <input type="number" value={sofa} onChange={e => setSofa(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Comorbidities</label>
                            <input type="number" value={comorbidities} onChange={e => setComorbidities(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hosp Days (Pre-ICU)</label>
                            <input type="number" value={hospDays} onChange={e => setHospDays(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono" />
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className={`p-8 rounded-3xl border-2 text-center transition-all ${nutricResults.isHighRisk ? 'bg-rose-900/20 border-rose-600' : 'bg-emerald-900/20 border-emerald-600'}`}>
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400">NUTRIC Score (mNUTRIC)</p>
                       <h4 className={`text-7xl font-black ${nutricResults.isHighRisk ? 'text-rose-500' : 'text-emerald-500'}`}>{nutricResults.score}</h4>
                       <p className={`mt-4 text-xs font-bold ${nutricResults.isHighRisk ? 'text-rose-300' : 'text-emerald-300'}`}>
                         {nutricResults.isHighRisk ? 'HIGH NUTRITIONAL RISK' : 'LOW NUTRITIONAL RISK'}
                       </p>
                    </div>

                    <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 flex gap-4 items-start">
                       <CheckCircle2 className={`w-6 h-6 flex-shrink-0 ${nutricResults.isHighRisk ? 'text-rose-500' : 'text-emerald-500'}`} />
                       <div>
                         <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                           "{nutricResults.recommendation}"
                         </p>
                         <p className="text-[10px] text-slate-500 mt-2">Score calibrated without IL-6 integration.</p>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'refeeding' && (
            <motion.div key="refeeding" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
               <div className="flex gap-4 p-5 bg-rose-900/10 border border-rose-900/40 rounded-2xl mb-8">
                  <AlertTriangle className="w-6 h-6 text-rose-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-rose-400 font-black text-sm uppercase">Refeeding Syndrome Risk Assessment</h4>
                    <p className="text-[10px] text-rose-300/80 font-medium italic mt-1 leading-relaxed">
                      Refeeding syndrome (RFS) can cause lethal electrolyte shifts (K+, PO4-, Mg++). If risk is high, initiate nutrition at 10-20 kcal/kg/day and advance slowly over 4-7 days.
                    </p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RefeedingChecklist.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setChecks({...checks, [item.id]: !checks[item.id]})}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                        checks[item.id] ? 'bg-rose-900/20 border-rose-500 shadow-lg' : 'bg-slate-900/50 border-slate-800'
                      }`}
                    >
                      <div className="space-y-1">
                        <p className={`text-xs font-bold ${checks[item.id] ? 'text-rose-200' : 'text-slate-300'}`}>{item.label}</p>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${checks[item.id] ? 'text-rose-400' : 'text-slate-500'}`}>{item.risk} RISK CRITERIA</p>
                      </div>
                      {checks[item.id] && <CheckCircle2 className="w-5 h-5 text-rose-500" />}
                    </button>
                  ))}
               </div>

               {Object.values(checks).filter(Boolean).length > 0 && (
                 <div className="mt-8 p-6 bg-rose-600 rounded-2xl text-center shadow-xl shadow-rose-900/20 animate-bounce">
                    <p className="text-white font-black text-sm uppercase tracking-widest">HIGH RS RISK DETECTED</p>
                    <p className="text-rose-100 text-[10px] font-bold mt-1">START SLOW: 10 kcal/kg MAX • CHECK LABS Q6H</p>
                 </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
