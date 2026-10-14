import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Activity, 
  Syringe, 
  AlertTriangle, 
  ShieldCheck, 
  HeartPulse, 
  CheckCircle2, 
  ArrowRightLeft, 
  Sliders,
  LineChart,
  TrendingUp,
  Gauge,
  Zap,
  Info,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePatient } from '../../contexts/PatientContext';
import { PatientParameterCard } from '../../components/PatientParameterCard';
import { calculateIBW, adjustedBodyWeight } from '../../lib/medicalDosing';
import { calculateCRRT } from '../../lib/RenalCalculators';
import {
  prepConcentrationPerMl,
  rateMlPerHour,
  doseFromRate,
  doseReadout,
  formatDoseUnit,
  roundToIncrement,
} from '../../lib/infusionRates';
import { INFUSION_PROTOCOLS, RangeTone } from './infusionProtocols';
import { STORAGE_KEYS } from '../../config/storageKeys';

type ActiveModuleTab = 'cvvhdf' | 'infusions' | 'hemodynamics';

/** Reads a finite number from localStorage, falling back when absent/invalid. */
function readStoredNumber(key: string, fallback: number): number {
  const raw = localStorage.getItem(key);
  if (raw == null) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

const RANGE_TONE: Record<RangeTone, { band: string; badge: string; text: string }> = {
  emerald: { band: 'bg-emerald-50 border-emerald-200', badge: 'bg-emerald-500', text: 'text-emerald-700' },
  sky: { band: 'bg-sky-50 border-sky-200', badge: 'bg-sky-500', text: 'text-sky-700' },
  amber: { band: 'bg-amber-50 border-amber-200', badge: 'bg-amber-500', text: 'text-amber-700' },
  rose: { band: 'bg-rose-50 border-rose-200', badge: 'bg-rose-500', text: 'text-rose-700' },
};

export default function TherapiesModule() {
  const patient = usePatient();
  const [activeTab, setActiveTab] = useState<ActiveModuleTab>(
    () => (localStorage.getItem(STORAGE_KEYS.THERAPIES_ACTIVE_TAB) as ActiveModuleTab) || 'cvvhdf'
  );

  // ================= PRISMAFLEX CVVHDF CALCULATOR STATE =================
  const [hct, setHct] = useState<number>(30);
  const [qb, setQb] = useState<number>(180);
  const [targetDose, setTargetDose] = useState<number>(25);
  const [pbpRate, setPbpRate] = useState<number>(500);
  const [netUfr, setNetUfr] = useState<number>(100);
  const [prePostRatio, setPrePostRatio] = useState<number>(60);
  const [filterType, setFilterType] = useState<'M100' | 'M150' | 'HF20'>('M100');

  // ================= UNIFIED INFUSION & RATE CONVERTER STATE =================
  const [selectedInfusionId, setSelectedInfusionId] = useState<string>(
    () => localStorage.getItem(STORAGE_KEYS.INFUSION_DRUG) || INFUSION_PROTOCOLS[0].id
  );
  const [dosingWeightType, setDosingWeightType] = useState<'tbw' | 'ibw' | 'abw'>(
    () => (localStorage.getItem(STORAGE_KEYS.INFUSION_WEIGHT_BASIS) as 'tbw' | 'ibw' | 'abw') || INFUSION_PROTOCOLS[0].defaultWeightBasis
  );
  const [mode, setMode] = useState<'dose' | 'rate'>(
    () => (localStorage.getItem(STORAGE_KEYS.INFUSION_MODE) as 'dose' | 'rate') || 'dose'
  );
  const [doseInput, setDoseInput] = useState<number>(
    () => readStoredNumber(STORAGE_KEYS.INFUSION_DOSE, INFUSION_PROTOCOLS[0].minDose)
  );
  const [rateInput, setRateInput] = useState<number>(() => readStoredNumber(STORAGE_KEYS.INFUSION_RATE, 0));
  const [prepIndex, setPrepIndex] = useState<number>(() => readStoredNumber(STORAGE_KEYS.INFUSION_PREP_INDEX, 0));
  const [concPerMl, setConcPerMl] = useState<number>(0); // in the dose's amount unit per mL
  const [pumpIncrement, setPumpIncrement] = useState<number>(() => readStoredNumber(STORAGE_KEYS.INFUSION_PUMP_STEP, 0.1));
  const [acknowledgedKey, setAcknowledgedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // ================= INVASIVE HEMODYNAMICS CALCULATOR STATE =================
  const [hemoMap, setHemoMap] = useState<number>(() => readStoredNumber(STORAGE_KEYS.HEMO_MAP, 85));
  const [hemoCvp, setHemoCvp] = useState<number>(() => readStoredNumber(STORAGE_KEYS.HEMO_CVP, 8));
  const [hemoMpap, setHemoMpap] = useState<number>(() => readStoredNumber(STORAGE_KEYS.HEMO_MPAP, 20));
  const [hemoPaop, setHemoPaop] = useState<number>(() => readStoredNumber(STORAGE_KEYS.HEMO_PAOP, 10));
  const [hemoCo, setHemoCo] = useState<number>(() => readStoredNumber(STORAGE_KEYS.HEMO_CO, 5.0));
  const [hemoHr, setHemoHr] = useState<number>(() => readStoredNumber(STORAGE_KEYS.HEMO_HR, 75));
  const [dampingState, setDampingState] = useState<'normal' | 'overdamped' | 'underdamped'>(
    () => (localStorage.getItem(STORAGE_KEYS.HEMO_DAMPING) as 'normal' | 'overdamped' | 'underdamped') || 'normal'
  );


  const ibw = useMemo(() => calculateIBW({
    type: 'adult',
    heightCm: patient.heightNum,
    gender: patient.gender,
    ageYears: patient.ageNum
  }), [patient.heightNum, patient.gender, patient.ageNum]);

  const abw = useMemo(
    () => adjustedBodyWeight(ibw, patient.weightNum),
    [ibw, patient.weightNum]
  );

  const activeWeight = useMemo(() => {
    if (dosingWeightType === 'ibw') return ibw > 0 ? ibw : patient.weightNum;
    if (dosingWeightType === 'abw') return abw;
    return patient.weightNum;
  }, [dosingWeightType, ibw, abw, patient.weightNum]);

  // Infusion protocol definitions live in ./infusionProtocols.ts so the rate
  // mathematics in ../../lib/infusionRates.ts can be unit-tested independently.

  const selectedInfusion = useMemo(
    () => INFUSION_PROTOCOLS.find(p => p.id === selectedInfusionId) || INFUSION_PROTOCOLS[0],
    [selectedInfusionId]
  );

  const selectedPrep = selectedInfusion.preps[prepIndex] || selectedInfusion.preps[0];
  const prepConc = prepConcentrationPerMl(selectedPrep, selectedInfusion.doseUnit.amount);

  // Reset inputs to the drug's defaults only when the *user* changes drug.
  // Comparing to the previous id (rather than a "first run" ref) keeps this
  // correct under React StrictMode's double-invoked effects, so persisted
  // selections survive a remount/navigation.
  const prevDrugRef = useRef(selectedInfusionId);
  useEffect(() => {
    if (prevDrugRef.current === selectedInfusionId) return;
    prevDrugRef.current = selectedInfusionId;
    const firstPrep = selectedInfusion.preps[0];
    setDosingWeightType(selectedInfusion.defaultWeightBasis);
    setPrepIndex(0);
    setConcPerMl(prepConcentrationPerMl(firstPrep, selectedInfusion.doseUnit.amount));
    setDoseInput(selectedInfusion.minDose);
    setMode('dose');
    setAcknowledgedKey(null);
    // selectedInfusion is derived from selectedInfusionId.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInfusionId]);

  // Persist the active tab, infusion selections and haemodynamic inputs.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THERAPIES_ACTIVE_TAB, activeTab);
    localStorage.setItem(STORAGE_KEYS.INFUSION_DRUG, selectedInfusionId);
    localStorage.setItem(STORAGE_KEYS.INFUSION_WEIGHT_BASIS, dosingWeightType);
    localStorage.setItem(STORAGE_KEYS.INFUSION_MODE, mode);
    localStorage.setItem(STORAGE_KEYS.INFUSION_DOSE, String(doseInput));
    localStorage.setItem(STORAGE_KEYS.INFUSION_RATE, String(rateInput));
    localStorage.setItem(STORAGE_KEYS.INFUSION_PREP_INDEX, String(prepIndex));
    localStorage.setItem(STORAGE_KEYS.INFUSION_PUMP_STEP, String(pumpIncrement));
    localStorage.setItem(STORAGE_KEYS.HEMO_MAP, String(hemoMap));
    localStorage.setItem(STORAGE_KEYS.HEMO_CVP, String(hemoCvp));
    localStorage.setItem(STORAGE_KEYS.HEMO_MPAP, String(hemoMpap));
    localStorage.setItem(STORAGE_KEYS.HEMO_PAOP, String(hemoPaop));
    localStorage.setItem(STORAGE_KEYS.HEMO_CO, String(hemoCo));
    localStorage.setItem(STORAGE_KEYS.HEMO_HR, String(hemoHr));
    localStorage.setItem(STORAGE_KEYS.HEMO_DAMPING, dampingState);
  }, [
    activeTab, selectedInfusionId, dosingWeightType, mode, doseInput, rateInput, prepIndex,
    pumpIncrement, hemoMap, hemoCvp, hemoMpap, hemoPaop, hemoCo, hemoHr, dampingState,
  ]);

  // Derive the concentration from the chosen preparation (still manually overridable)
  useEffect(() => {
    const prep = selectedInfusion.preps[prepIndex];
    if (prep) setConcPerMl(prepConcentrationPerMl(prep, selectedInfusion.doseUnit.amount));
  }, [prepIndex, selectedInfusion]);

  const weightRequired = selectedInfusion.doseUnit.perKg;
  const weightOk = !weightRequired || activeWeight > 0;
  const isCustomConcentration = Math.abs(concPerMl - prepConc) > 1e-9;

  const computedRate = useMemo(() => rateMlPerHour({
    doseAmount: doseInput,
    unit: selectedInfusion.doseUnit,
    weightKg: activeWeight,
    concPerMl,
  }), [doseInput, selectedInfusion, activeWeight, concPerMl]);

  const computedDose = useMemo(() => doseFromRate({
    rateMlPerHour: rateInput,
    unit: selectedInfusion.doseUnit,
    weightKg: activeWeight,
    concPerMl,
  }), [rateInput, selectedInfusion, activeWeight, concPerMl]);

  const effectiveDose = mode === 'dose' ? doseInput : computedDose;
  const effectiveRate = mode === 'dose' ? computedRate : rateInput;
  const outOfRange = effectiveDose < selectedInfusion.minDose || effectiveDose > selectedInfusion.maxDose;

  const readout = useMemo(
    () => doseReadout(effectiveDose, selectedInfusion.doseUnit, activeWeight),
    [effectiveDose, selectedInfusion, activeWeight]
  );

  const equivalentUnits = useMemo(() => {
    const current = formatDoseUnit(selectedInfusion.doseUnit);
    const chips: string[] = [];
    const add = (label: string, value: number | undefined, digits: number) => {
      if (value == null || label === current) return;
      chips.push(`${value.toFixed(digits)} ${label}`);
    };
    add('units/min', readout.unitsPerMin, 3);
    add('units/h', readout.unitsPerHr, 2);
    add('mcg/kg/min', readout.mcgPerKgMin, 3);
    add('mcg/kg/h', readout.mcgPerKgHr, 2);
    add('mg/h', readout.mgPerHr, 2);
    return chips;
  }, [readout, selectedInfusion]);

  // Clinical dose banding — the first band whose window contains the dose
  const doseRanges = selectedInfusion.doseRanges;
  const currentRange = doseRanges && doseRanges.length > 0
    ? (doseRanges.find(r => effectiveDose >= r.min && effectiveDose < r.max)
        ?? (effectiveDose >= doseRanges[doseRanges.length - 1].max ? doseRanges[doseRanges.length - 1] : doseRanges[0]))
    : null;

  // High-alert gate: hide the pump rate until acknowledged when the dose is out of the usual window
  const ackKey = `${selectedInfusionId}|${mode}|${effectiveDose}`;
  const acknowledged = acknowledgedKey === ackKey;
  const revealRate = weightOk && (!outOfRange || acknowledged);
  const pumpSetting = roundToIncrement(effectiveRate, pumpIncrement);

  const copySummary = () => {
    const unitLabel = formatDoseUnit(selectedInfusion.doseUnit);
    const lines = [
      'AnestAssist infusion summary',
      `Drug: ${selectedInfusion.name} (${selectedInfusion.category})`,
      `Patient: ${activeWeight.toFixed(1)} kg — ${dosingWeightType.toUpperCase()}`,
      `Preparation: ${selectedPrep.label} → ${concPerMl} ${selectedInfusion.doseUnit.amount}/mL`,
      `Dose: ${effectiveDose.toFixed(3)} ${unitLabel}`,
      `Pump rate: ${effectiveRate.toFixed(2)} mL/h (set pump to ${pumpSetting.toFixed(2)} mL/h)`,
    ];
    if (outOfRange) lines.push(`WARNING: outside the usual range (${selectedInfusion.minDose}-${selectedInfusion.maxDose} ${unitLabel}). Verify.`);
    if (selectedInfusion.centralLineRequired) lines.push('High-alert drug: central line required.');
    navigator.clipboard?.writeText(lines.join('\n')).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Prismaflex CVVHDF Precise Calculation Logic (shared with the tested lib/RenalCalculators)
  const cvvhdfResults = useMemo(() => {
    const w = patient.weightNum;
    if (w <= 0 || qb <= 0) return null;

    const r = calculateCRRT({
      weightKg: w,
      hctPercent: hct,
      bloodFlowMlMin: qb,
      preFilterPercent: prePostRatio,
      targetDoseMlKgHr: targetDose,
      netUfrMlHr: netUfr,
      pbpMlHr: pbpRate,
    });

    return {
      totalEffluent: Math.round(r.totalEffluentHr),
      dialysateRate: Math.round(r.dialysateRateHr),
      preFilterRate: Math.round(r.preFilterRateHr),
      postFilterRate: Math.round(r.postFilterRateHr),
      pbpRate: Math.round(r.pbpRateHr),
      netUfr: Math.round(r.netUfrHr),
      plasmaFlowMin: r.plasmaFlowMlMin,
      filtrationFraction: r.filtrationFraction,
      isHighClottingRisk: r.isHighClottingRisk,
      deliveredDose: r.deliveredUfrDose,
    };
  }, [patient.weightNum, hct, qb, targetDose, pbpRate, netUfr, prePostRatio]);

  // Invasive Hemodynamics Calculator & Profiles
  const hemodynamicResults = useMemo(() => {
    const bsa = patient.bsa || 1.73;
    const co = Math.max(0.1, hemoCo);
    const hr = Math.max(1, hemoHr);
    
    // SVR = ((MAP - CVP) * 80) / CO
    const svr = Math.round(((hemoMap - hemoCvp) * 80) / co);
    // PVR = ((MPAP - PAOP) * 80) / CO
    const pvr = Math.round(((hemoMpap - hemoPaop) * 80) / co);
    
    const ci = (co / bsa).toFixed(2);
    const sv = Math.round((co * 1000) / hr);
    const svi = Math.round(sv / bsa);
    const lvswi = Math.round((1.36 * (hemoMap - hemoPaop) * svi) / 100);
    const rvswi = Math.round((1.36 * (hemoMpap - hemoCvp) * svi) / 100);

    return {
      svr,
      pvr,
      ci,
      sv,
      svi,
      lvswi,
      rvswi,
      isSvrLow: svr < 800,
      isSvrHigh: svr > 1200,
      isPvrHigh: pvr > 250,
      isCiLow: Number(ci) < 2.5,
    };
  }, [hemoMap, hemoCvp, hemoMpap, hemoPaop, hemoCo, hemoHr, patient.bsa]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PatientParameterCard />

      {/* Module Navigation Header - Clean Light Theme */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-sm">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">ICU & Anesthesia Therapies</h2>
              <p className="text-slate-500 text-xs mt-0.5">Prismaflex CVVHDF, Vasoactive Infusions & Invasive Hemodynamics.</p>
            </div>
          </div>
        </div>

        {/* Unified Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('cvvhdf')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'cvvhdf' 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" /> Prismaflex CVVHDF
          </button>
          <button
            onClick={() => setActiveTab('infusions')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'infusions' 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <HeartPulse className="w-4 h-4" /> Infusions & Converter
          </button>
          <button
            onClick={() => setActiveTab('hemodynamics')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'hemodynamics' 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LineChart className="w-4 h-4" /> Hemodynamics & Waveforms
          </button>
        </div>

        {/* TAB 1: PRISMAFLEX CVVHDF CALCULATOR */}
        <AnimatePresence mode="wait">
          {activeTab === 'cvvhdf' && (
            <motion.div 
              key="cvvhdf"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-white space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs Column */}
                <div className="lg:col-span-6 space-y-5">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Activity className="w-4 h-4" /> Machine Parameters & Patient Setup
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Blood Flow ($Q_b$ mL/min)</label>
                      <input 
                        type="number" 
                        value={qb} 
                        onChange={e => setQb(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none focus:border-indigo-500 transition-all text-center" 
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-semibold text-slate-500">Target Dose (mL/kg/h)</label>
                        <span className="text-xs font-bold text-indigo-600">{targetDose}</span>
                      </div>
                      <input 
                        type="number" 
                        value={targetDose} 
                        onChange={e => setTargetDose(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 font-bold outline-none focus:border-indigo-500 transition-all text-center mb-1.5" 
                      />
                      <input 
                        type="range"
                        min="15"
                        max="45"
                        step="1"
                        value={targetDose}
                        onChange={e => setTargetDose(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>


                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Hematocrit (Hct %)</label>
                      <input 
                        type="number" 
                        value={hct} 
                        onChange={e => setHct(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 font-bold outline-none focus:border-indigo-500 transition-all text-center" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Net Fluid Removal (mL/h)</label>
                      <input 
                        type="number" 
                        value={netUfr} 
                        onChange={e => setNetUfr(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-emerald-700 font-bold outline-none focus:border-emerald-500 transition-all text-center" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Pre-Blood Pump (PBP mL/h)</label>
                      <input 
                        type="number" 
                        value={pbpRate} 
                        onChange={e => setPbpRate(Number(e.target.value) || 0)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-pink-700 font-bold outline-none focus:border-pink-500 transition-all text-center" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Filter Set Model</label>
                      <select
                        value={filterType}
                        onChange={e => setFilterType(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-bold outline-none focus:border-indigo-500 transition-all text-center"
                      >
                        <option value="M100">AN69 ST M100 (0.9 m²)</option>
                        <option value="M150">AN69 ST M150 (1.5 m²)</option>
                        <option value="HF20">HF20 Pediatric (0.2 m²)</option>
                      </select>
                    </div>
                  </div>

                  {/* Pre/Post Replacement Slider */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-500 uppercase">Replacement Dilution Ratio</span>
                      <span className="text-indigo-600">{prePostRatio}% Pre-Filter / {100 - prePostRatio}% Post-Filter</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={prePostRatio} 
                      onChange={e => setPrePostRatio(Number(e.target.value))} 
                      className="w-full accent-indigo-600 cursor-pointer" 
                    />
                    <p className="text-[10px] text-slate-500 leading-tight italic">
                      Higher pre-filter dilution decreases blood viscosity inside filter fibers, significantly extending filter life and lowering clotting risk.
                    </p>
                  </div>
                </div>

                {/* Machine Pumps Output Column */}
                <div className="lg:col-span-6 space-y-5">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-2">
                    <ShieldCheck className="w-4 h-4" /> Calculated Prismaflex Pump Rates
                  </h3>

                  {cvvhdfResults && (
                    <div aria-live="polite" className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                      {/* Total Effluent */}
                      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase block">Total Target Effluent Rate</span>
                          <span className="text-[10px] text-slate-400">Target KDIGO Dose ({targetDose} mL/kg/h)</span>
                        </div>
                        <span className="text-2xl font-black text-indigo-900">{cvvhdfResults.totalEffluent} <span className="text-sm font-normal text-slate-500">mL/h</span></span>
                      </div>

                      {/* Individual Pumps Breakdown */}
                      <div className="space-y-2.5 text-sm">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-slate-600 font-medium">PBP Pump Rate (Pre-Pump)</span>
                          <span className="font-mono font-bold text-pink-700">{cvvhdfResults.pbpRate} mL/h</span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-t border-slate-200">
                          <span className="text-slate-600 font-medium">Dialysate Pump Rate ($Q_d$)</span>
                          <span className="font-mono font-bold text-blue-700">{cvvhdfResults.dialysateRate} mL/h</span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-t border-slate-200">
                          <span className="text-slate-600 font-medium">Pre-Filter Replacement Pump</span>
                          <span className="font-mono font-bold text-emerald-700">{cvvhdfResults.preFilterRate} mL/h</span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-t border-slate-200">
                          <span className="text-slate-600 font-medium">Post-Filter Replacement Pump</span>
                          <span className="font-mono font-bold text-amber-700">{cvvhdfResults.postFilterRate} mL/h</span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-t border-slate-200">
                          <span className="text-slate-600 font-medium">Patient Net Removal Rate (UFR)</span>
                          <span className="font-mono font-bold text-emerald-700">{cvvhdfResults.netUfr} mL/h</span>
                        </div>
                      </div>

                      {/* Filtration Fraction Warning Box */}
                      <div className={`p-4 rounded-xl border mt-4 flex items-center justify-between ${
                        cvvhdfResults.isHighClottingRisk 
                          ? 'bg-rose-50 border-rose-200 text-rose-800' 
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      }`}>
                        <div>
                          <div className="flex items-center gap-2">
                            {cvvhdfResults.isHighClottingRisk ? <AlertTriangle className="w-5 h-5 text-rose-600" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                            <span className="font-bold text-sm">Filtration Fraction: {cvvhdfResults.filtrationFraction.toFixed(1)}%</span>
                          </div>
                          <p className="text-[10px] opacity-90 mt-1 leading-tight">
                            {cvvhdfResults.isHighClottingRisk 
                              ? 'HIGH CLOTTING RISK (>25%). Increase pre-filter replacement or $Q_b$ to lower hemoconcentration.' 
                              : 'Optimal hemoconcentration risk (FF ≤ 25%). Good filter longevity anticipated.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: UNIFIED INFUSIONS & RATE CONVERTER */}
          {activeTab === 'infusions' && (
            <motion.div 
              key="infusions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-white space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Infusions Sidebar Selection */}
                <div className="lg:col-span-4 space-y-2 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Drug Protocol Library</h3>
                  {INFUSION_PROTOCOLS.map((protocol) => (
                    <button
                      key={protocol.id}
                      onClick={() => setSelectedInfusionId(protocol.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        selectedInfusionId === protocol.id 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.01]' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded block w-fit mb-1 ${
                        selectedInfusionId === protocol.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {protocol.category}
                      </span>
                      <h4 className="font-bold text-sm leading-tight">{protocol.name}</h4>
                    </button>
                  ))}
                </div>

                {/* Main Interactive Dosing & Rate Converter Dashboard */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
                    {/* Header Details */}
                    <div className="flex justify-between items-start border-b border-slate-200 pb-4 gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedInfusion.category}</span>
                          {selectedInfusion.centralLineRequired && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                              Central line
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{selectedInfusion.name}</h3>
                        <p className="text-slate-500 text-xs mt-0.5">{selectedInfusion.indication}</p>
                      </div>

                      {/* Weight Basis Switch */}
                      <div className="flex bg-slate-200 p-1 rounded-xl shrink-0">
                        <button
                          onClick={() => setDosingWeightType('tbw')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            dosingWeightType === 'tbw' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          TBW ({patient.weightNum}kg)
                        </button>
                        <button
                          onClick={() => setDosingWeightType('ibw')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            dosingWeightType === 'ibw' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          IBW ({ibw > 0 ? ibw.toFixed(1) : '--'}kg)
                        </button>
                        <button
                          onClick={() => setDosingWeightType('abw')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            dosingWeightType === 'abw' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          ABW ({abw.toFixed(1)}kg)
                        </button>
                      </div>
                    </div>

                    {/* Integrated Interactive Dose & Rate Converter Panel */}
                    <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                          <Sliders className="w-4 h-4 text-indigo-600" />
                          Live Interactive Rate Converter
                        </div>
                        {/* Direction toggle */}
                        <div className="flex bg-slate-200 p-1 rounded-xl">
                          <button
                            onClick={() => setMode('dose')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                              mode === 'dose' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Dose → Rate
                          </button>
                          <button
                            onClick={() => setMode('rate')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                              mode === 'rate' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Rate → Dose
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Preparation selector */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Preparation</label>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedInfusion.preps.map((prep, idx) => (
                              <button
                                key={prep.label}
                                onClick={() => setPrepIndex(idx)}
                                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                                  prepIndex === idx
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                {prep.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Concentration (in the dose's amount unit) */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-semibold text-slate-500">
                              Concentration ({selectedInfusion.doseUnit.amount}/mL)
                            </label>
                            <span className={`text-[9px] font-bold uppercase ${isCustomConcentration ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {isCustomConcentration ? 'Custom' : 'Matches prep'}
                            </span>
                          </div>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={concPerMl}
                            onChange={e => setConcPerMl(Number(e.target.value) || 0)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-lg font-bold outline-none focus:border-indigo-500 transition-all text-center"
                          />
                        </div>
                      </div>

                      {/* Dose input (Dose → Rate) or rate input (Rate → Dose) */}
                      {mode === 'dose' ? (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-semibold text-slate-500">
                              Target Dose ({formatDoseUnit(selectedInfusion.doseUnit)})
                            </label>
                            <span className="text-xs font-bold text-indigo-600">
                              {doseInput} {formatDoseUnit(selectedInfusion.doseUnit)}
                            </span>
                          </div>
                          <input
                            type="number"
                            step={selectedInfusion.step}
                            value={doseInput}
                            onChange={e => setDoseInput(Number(e.target.value) || 0)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 text-base font-bold outline-none focus:border-indigo-500 transition-all text-center mb-2"
                          />
                          <input
                            type="range"
                            min={selectedInfusion.minDose}
                            max={selectedInfusion.maxDose}
                            step={selectedInfusion.step}
                            value={doseInput}
                            onChange={e => setDoseInput(Number(e.target.value))}
                            className="w-full accent-indigo-600 cursor-pointer"
                          />
                          <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-0.5">
                            <span>Min: {selectedInfusion.minDose}</span>
                            <span>Max: {selectedInfusion.maxDose}</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">
                            Running Pump Rate (mL/h)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={rateInput}
                            onChange={e => setRateInput(Number(e.target.value) || 0)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-lg font-bold outline-none focus:border-indigo-500 transition-all text-center"
                          />
                        </div>
                      )}

                      {/* Dose-range clinical feedback */}
                      {weightOk && currentRange && (
                        <div className={`p-3 rounded-xl border flex items-start gap-3 ${RANGE_TONE[currentRange.tone].band}`}>
                          <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${RANGE_TONE[currentRange.tone].badge}`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[11px] font-black uppercase tracking-wider ${RANGE_TONE[currentRange.tone].text}`}>
                                {currentRange.label}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">
                                {currentRange.min}–{currentRange.max} {formatDoseUnit(selectedInfusion.doseUnit)}
                              </span>
                              {currentRange.receptors?.map(r => (
                                <span key={r} className="text-[9px] font-bold bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                                  {r}
                                </span>
                              ))}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5">{currentRange.description}</p>
                          </div>
                        </div>
                      )}

                      {/* Safety feedback */}
                      {!weightOk && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[11px] font-semibold">
                          Enter a patient weight (kg) to calculate weight-based dosing.
                        </div>
                      )}
                      {weightOk && outOfRange && (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-[11px] font-semibold flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          Dose {effectiveDose.toFixed(2)} {formatDoseUnit(selectedInfusion.doseUnit)} is outside the usual range ({selectedInfusion.minDose}–{selectedInfusion.maxDose}). Confirm before acting.
                        </div>
                      )}

                      {/* Result box: pump speed + delivered dose + equivalents */}
                      <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-3" aria-live="polite">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">Calculated Smart Pump Speed</span>
                            <span className="text-[10px] text-indigo-700 font-medium">Prep: {selectedPrep.label}</span>
                          </div>
                          {revealRate ? (
                            <div className="text-right">
                              <span className="text-3xl font-black text-indigo-600">{effectiveRate.toFixed(2)}</span>
                              <span className="text-sm font-bold text-indigo-800 ml-1.5">mL/h</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => setAcknowledgedKey(ackKey)}
                              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors"
                            >
                              Acknowledge &amp; reveal
                            </button>
                          )}
                        </div>

                        {/* Pump increment + set pump */}
                        <div className="flex items-center justify-between border-t border-indigo-100 pt-3 gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider">Pump step</span>
                            <select
                              value={pumpIncrement}
                              onChange={e => setPumpIncrement(Number(e.target.value))}
                              className="text-[11px] font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 outline-none focus:border-indigo-500"
                            >
                              <option value={0.01}>0.01</option>
                              <option value={0.1}>0.1</option>
                              <option value={1}>1</option>
                            </select>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider block">Set pump to</span>
                            <span className="text-lg font-black text-indigo-700">
                              {revealRate ? pumpSetting.toFixed(2) : '--'} <span className="text-xs font-bold">mL/h</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-indigo-100 pt-3">
                          <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider">Delivered Dose</span>
                          <span className="text-lg font-black text-indigo-700">
                            {weightOk ? effectiveDose.toFixed(3) : '--'}{' '}
                            <span className="text-xs font-bold">{formatDoseUnit(selectedInfusion.doseUnit)}</span>
                          </span>
                        </div>

                        {weightOk && equivalentUnits.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 border-t border-indigo-100 pt-3">
                            {equivalentUnits.map(chip => (
                              <span key={chip} className="px-2 py-0.5 bg-white border border-indigo-100 rounded-md text-[10px] font-bold text-indigo-700">
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={copySummary}
                          className="w-full mt-1 py-2 rounded-xl bg-white border border-indigo-200 hover:border-indigo-400 text-indigo-700 text-[11px] font-bold transition-colors"
                        >
                          {copied ? 'Copied to clipboard ✓' : 'Copy double-check summary'}
                        </button>
                      </div>
                    </div>

                    {/* Dosing & Titration Details */}
                    <div className="space-y-4 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-1">Standard Dose Range Reference</h4>
                        <p className="text-slate-600 bg-white p-3 rounded-lg border border-slate-200 font-mono">
                          {selectedInfusion.minDose} – {selectedInfusion.maxDose} {formatDoseUnit(selectedInfusion.doseUnit)}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-1">Clinical Titration & Monitoring</h4>
                        <ul className="space-y-1.5 text-slate-600 bg-white p-4 rounded-lg border border-slate-200 list-disc list-inside">
                          {selectedInfusion.titrationTips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-rose-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Safety & Extravasation Warnings
                        </h4>
                        <ul className="space-y-1.5 text-rose-700 bg-rose-50 p-4 rounded-lg border border-rose-200 list-disc list-inside">
                          {selectedInfusion.safetyWarnings.map((warn, idx) => (
                            <li key={idx}>{warn}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === 'hemodynamics' && (
            <motion.div
              key="hemodynamics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-white space-y-8"
            >
              {/* SECTION 1: INVASIVE HEMODYNAMIC CALCULATOR */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                  <Gauge className="w-4 h-4 text-indigo-600" />
                  Invasive Hemodynamic Parameter Calculator & Derived Indices
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Parameter Inputs Column */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                      <span>Primary Measurements</span>
                      <span className="text-[10px] text-slate-400 font-normal">Live Inputs</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">MAP (mmHg)</label>
                        <input
                          type="number"
                          value={hemoMap}
                          onChange={e => setHemoMap(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">CVP (mmHg)</label>
                        <input
                          type="number"
                          value={hemoCvp}
                          onChange={e => setHemoCvp(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">MPAP (mmHg)</label>
                        <input
                          type="number"
                          value={hemoMpap}
                          onChange={e => setHemoMpap(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">PAOP / Wedge</label>
                        <input
                          type="number"
                          value={hemoPaop}
                          onChange={e => setHemoPaop(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cardiac Output (L/min)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={hemoCo}
                          onChange={e => setHemoCo(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Heart Rate (bpm)</label>
                        <input
                          type="number"
                          value={hemoHr}
                          onChange={e => setHemoHr(Number(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-900">
                      <span className="font-bold block">Patient BSA:</span> {patient.bsa > 0 ? `${patient.bsa.toFixed(2)} m² (Mosteller)` : '1.73 m² (Standard Default)'}
                    </div>
                  </div>

                  {/* Derived Calculations Grid */}
                  <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {/* SVR Card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      hemodynamicResults.isSvrLow 
                        ? 'bg-amber-50 border-amber-200' 
                        : hemodynamicResults.isSvrHigh 
                        ? 'bg-rose-50 border-rose-200' 
                        : 'bg-emerald-50/50 border-emerald-200'
                    }`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">SVR (Systemic Vasc Res)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.svr}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">dynes·sec/cm⁵</span>
                      <div className="mt-2 text-[10px] font-bold flex items-center gap-1">
                        {hemodynamicResults.isSvrLow && <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Vasodilation / Vasoplegia</span>}
                        {hemodynamicResults.isSvrHigh && <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">Vasoconstriction</span>}
                        {!hemodynamicResults.isSvrLow && !hemodynamicResults.isSvrHigh && <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Normal (800-1200)</span>}
                      </div>
                    </div>

                    {/* PVR Card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      hemodynamicResults.isPvrHigh ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50/50 border-emerald-200'
                    }`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">PVR (Pulm Vasc Res)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.pvr}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">dynes·sec/cm⁵</span>
                      <div className="mt-2 text-[10px] font-bold">
                        {hemodynamicResults.isPvrHigh ? (
                          <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">High (Pulm HTN / PE)</span>
                        ) : (
                          <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Normal (100-250)</span>
                        )}
                      </div>
                    </div>

                    {/* Cardiac Index Card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      hemodynamicResults.isCiLow ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50/50 border-emerald-200'
                    }`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Cardiac Index (CI)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.ci}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">L/min/m²</span>
                      <div className="mt-2 text-[10px] font-bold">
                        {hemodynamicResults.isCiLow ? (
                          <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Low Output (&lt; 2.5)</span>
                        ) : (
                          <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Normal (2.5-4.0)</span>
                        )}
                      </div>
                    </div>

                    {/* Stroke Volume Index */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Stroke Vol Index (SVI)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.svi}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">mL/m² (Normal: 33-47)</span>
                    </div>

                    {/* LVSWI */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">LVSWI (LV Work Index)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.lvswi}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">g-m/m²/beat (Normal: 45-60)</span>
                    </div>

                    {/* RVSWI */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">RVSWI (RV Work Index)</span>
                      <span className="text-2xl font-black text-slate-900">{hemodynamicResults.rvswi}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block">g-m/m²/beat (Normal: 7-12)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: ARTERIAL LINE WAVEFORM & DAMPING ANALYZER */}
              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    Arterial Line Waveform & Damping Analysis (Square-Wave Flush Test)
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setDampingState('normal')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        dampingState === 'normal' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Normal Damping
                    </button>
                    <button
                      onClick={() => setDampingState('overdamped')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        dampingState === 'overdamped' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Overdamped
                    </button>
                    <button
                      onClick={() => setDampingState('underdamped')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        dampingState === 'underdamped' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Underdamped
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Interactive Waveform SVG Renderer */}
                  <div className="bg-slate-950 p-4 rounded-2xl text-white space-y-3 shadow-inner">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-emerald-400 font-bold">ART PRESS: 120/80 (85) mmHg</span>
                      <span className="text-[10px] text-slate-400 font-mono">Damping Coefficient (ζ): {
                        dampingState === 'normal' ? '0.6 - 0.7 (Optimal)' : dampingState === 'overdamped' ? '> 1.0 (High Damping)' : '< 0.4 (Low Damping)'
                      }</span>
                    </div>

                    <div className="h-40 w-full flex items-center justify-center bg-slate-900/60 rounded-xl overflow-hidden p-2 relative">
                      <svg viewBox="0 0 400 120" className="w-full h-full stroke-current text-emerald-400 fill-none" strokeWidth="2.5">
                        {dampingState === 'normal' && (
                          <path d="M 10 90 L 30 90 L 45 20 L 55 50 L 62 45 L 75 80 L 100 90 L 140 90 L 145 10 L 145 100 L 155 85 L 165 92 L 180 90 L 220 90 L 235 20 L 245 50 L 252 45 L 265 80 L 300 90 L 390 90" />
                        )}
                        {dampingState === 'overdamped' && (
                          <path d="M 10 90 L 40 90 L 60 40 L 90 75 L 120 90 L 140 90 L 145 10 L 145 100 L 160 90 L 220 90 L 240 40 L 270 75 L 300 90 L 390 90" />
                        )}
                        {dampingState === 'underdamped' && (
                          <path d="M 10 90 L 30 90 L 40 5 L 50 65 L 55 35 L 62 85 L 68 75 L 75 90 L 140 90 L 145 10 L 145 100 L 150 20 L 155 105 L 160 70 L 165 95 L 170 88 L 180 90 L 220 90 L 230 5 L 240 65 L 245 35 L 252 85 L 260 90 L 390 90" />
                        )}
                      </svg>
                    </div>

                    <div className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      {dampingState === 'normal' && (
                        <p><strong className="text-emerald-400">Normal Waveform:</strong> Sharp upstroke, distinct dicrotic notch (aortic valve closure), and 1-2 small oscillations following the square-wave flush. SBP & DBP are accurately measured.</p>
                      )}
                      {dampingState === 'overdamped' && (
                        <p><strong className="text-amber-400">Overdamped Waveform:</strong> Slurred upstroke, loss of dicrotic notch, and zero post-flush oscillations. Falsely LOW SBP and falsely HIGH DBP (MAP remains accurate).</p>
                      )}
                      {dampingState === 'underdamped' && (
                        <p><strong className="text-rose-400">Underdamped Waveform:</strong> Overshooting tall narrow peak with multiple excessive post-flush oscillations (&gt;2). Falsely HIGH SBP and falsely LOW DBP.</p>
                      )}
                    </div>
                  </div>

                  {/* Troubleshooting & Clinical Action Guide */}
                  <div className="space-y-3 text-xs">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-indigo-600" />
                        Square-Wave Flush Test & Troubleshooting
                      </h4>
                      {dampingState === 'overdamped' && (
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          <li><strong>Common Causes:</strong> Air bubbles in tubing/transducer, blood clot at catheter tip, kinked catheter, soft/compliant extension tubing, loose stopcock.</li>
                          <li><strong>Correction Protocol:</strong> Flush line to clear blood/bubbles, check for kinks, aspirate clot, ensure short non-compliant pressure tubing.</li>
                        </ul>
                      )}
                      {dampingState === 'underdamped' && (
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          <li><strong>Common Causes:</strong> Excessive tubing length, multiple stopcocks, catheter whipping, hypothermia, hyperdynamic circulation.</li>
                          <li><strong>Correction Protocol:</strong> Remove unnecessary extension tubing/stopcocks, use a damping device (e.g. Accudamp), rely on MAP rather than peak SBP.</li>
                        </ul>
                      )}
                      {dampingState === 'normal' && (
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          <li><strong>Flush Test Criteria:</strong> High-pressure flush generates a square wave followed by 1-2 rebound oscillations before resuming normal arterial wave.</li>
                          <li><strong>Pulse Pressure Variation (PPV):</strong> PPV &gt; 13% predicts volume responsiveness ONLY if mechanically ventilated, tidal volume &ge; 8 mL/kg PBW, and sinus rhythm.</li>
                        </ul>
                      )}
                    </div>

                    <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100 space-y-1.5">
                      <h4 className="font-bold text-indigo-900 uppercase tracking-wider">Pulse Pressure Variation (PPV) Rules</h4>
                      <p className="text-indigo-800 leading-relaxed font-mono text-xs">
                        PPV (%) = [(PPmax - PPmin) / PPmean] × 100
                      </p>
                      <p className="text-indigo-800 leading-relaxed">
                        Values &gt; 13% indicate the patient is on the steep ascending limb of the Frank-Starling curve and will increase Cardiac Output with fluid boluses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: CENTRAL VENOUS PRESSURE (CVP) WAVEFORM ANALYSIS */}
              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  Central Venous Pressure (CVP) Waveform Analysis & Pathological Signs
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Waveform Components Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="p-3">Wave / Descent</th>
                          <th className="p-3">Cardiac Cycle Event</th>
                          <th className="p-3">ECG Timing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium text-slate-600">
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">a wave</td>
                          <td className="p-3">Right Atrial contraction</td>
                          <td className="p-3">Just after P wave</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">c wave</td>
                          <td className="p-3">Tricuspid valve bulging into RA (isovolumetric contraction)</td>
                          <td className="p-3">End of QRS complex</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">x descent</td>
                          <td className="p-3">Atrial relaxation & downward displacement of tricuspid valve</td>
                          <td className="p-3">ST segment</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">v wave</td>
                          <td className="p-3">Venous filling of RA against closed tricuspid valve</td>
                          <td className="p-3">End of T wave</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-indigo-600">y descent</td>
                          <td className="p-3">Tricuspid valve opening & rapid passive ventricular filling</td>
                          <td className="p-3">Before P wave</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Pathological Signs */}
                  <div className="space-y-3 text-xs">
                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2">
                      <h4 className="font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        Key Pathological CVP Waveform Patterns
                      </h4>
                      <ul className="space-y-2 text-rose-800">
                        <li>
                          <strong>Cannon a Waves:</strong> Atrium contracts against a closed tricuspid valve. Seen in Complete Heart Block (3rd degree AV block), Junctional Rhythm, and VT.
                        </li>
                        <li>
                          <strong>Giant v Waves:</strong> Severe Tricuspid Regurgitation (systolic backflow into RA during RV contraction obliterates x descent).
                        </li>
                        <li>
                          <strong>Friedreich Sign (Deep y descent):</strong> Constrictive Pericarditis (rapid initial filling followed by sudden abrupt ventricular restriction).
                        </li>
                        <li>
                          <strong>Blunted / Absent y descent:</strong> Cardiac Tamponade (high intrapericardial pressure prevents rapid passive filling during diastole).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: SHOCK PROFILES REFERENCE MATRIX */}
              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Invasive Hemodynamic Profiles in Shock States
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="p-3">Shock Classification</th>
                        <th className="p-3">CVP</th>
                        <th className="p-3">PAOP / Wedge</th>
                        <th className="p-3">CO / CI</th>
                        <th className="p-3">SVR</th>
                        <th className="p-3">SvO₂</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Hypovolemic Shock</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                        <td className="p-3 text-rose-600 font-bold">↓</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-rose-600 font-bold">↓</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Cardiogenic Shock</td>
                        <td className="p-3 text-emerald-600 font-bold">↑</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑ (&gt;18)</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓ (&lt;2.2)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Distributive (Septic / Vasoplegic)</td>
                        <td className="p-3 text-slate-500 font-bold">↔ / ↓</td>
                        <td className="p-3 text-slate-500 font-bold">↔ / ↓</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑ (Early)</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓ (&lt;800)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑ (Impaired extraction)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Obstructive (Tamponade)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑ (Equalized)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑ (Equalized)</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-rose-600 font-bold">↓</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Obstructive (Massive PE)</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-slate-500 font-bold">Normal / Low</td>
                        <td className="p-3 text-rose-600 font-bold">↓↓</td>
                        <td className="p-3 text-emerald-600 font-bold">↑↑</td>
                        <td className="p-3 text-rose-600 font-bold">↓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
