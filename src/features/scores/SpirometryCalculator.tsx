import { useState, useMemo, useEffect } from 'react';
import { 
  Wind, 
  Activity, 
  User, 
  Ruler, 
  Calendar,
  Layers,
  AlertCircle,
  Info,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PatientContextBanner } from '../../components/PatientContextBanner';

import { PRECISE_COEFFS, NHANES_III_COEFFS, ETHNICITY_FACTORS, Coefficients } from './spirometryData';

import { usePatient, Sex, Ethnicity } from '../../contexts/PatientContext';

export default function SpirometryCalculator() {
  const { patient, setPatient } = usePatient();
  
  const age = patient.age;
  const height = patient.heightCm;
  const sex = patient.sex;
  const ethnicity = patient.ethnicity;

  const setAge = (val: number | '') => setPatient({ age: val });
  const setHeight = (val: number | '') => setPatient({ heightCm: val });
  const setSex = (val: 'male' | 'female') => setPatient({ sex: val });
  const setEthnicity = (val: Ethnicity) => setPatient({ ethnicity: val });

  // Measured Inputs
  const [obsFEV1, setObsFEV1] = useState<number | ''>(3.5);
  const [obsFVC, setObsFVC] = useState<number | ''>(4.5);


  // Calculations
  const predicted = useMemo(() => {
    if (age === '' || height === '') return { fev1: 0, fvc: 0 };
    
    const calcEthnicity = (ethnicity === 'other' ? 'caucasian' : ethnicity) as 'caucasian' | 'african-american' | 'mexican-american';

    const calculate = (params: Coefficients) => {
      const a = Number(age);
      const h = Number(height);
      return params.b0 + (params.b1 * a) + (params.b2 * Math.pow(a, 2)) + (params.b3 * Math.pow(h, 2));
    };

    return {
      fev1: calculate(PRECISE_COEFFS.fev1[calcEthnicity][sex]),
      fvc: calculate(PRECISE_COEFFS.fvc[calcEthnicity][sex])
    };
  }, [age, height, sex, ethnicity]);

  const results = useMemo(() => {
    if (obsFEV1 === '' || obsFVC === '' || predicted.fev1 === 0) return null;

    const fev1Perc = (obsFEV1 / predicted.fev1) * 100;
    const fvcPerc = (obsFVC / predicted.fvc) * 100;
    const ratioObs = obsFEV1 / obsFVC;
    const ratioPred = predicted.fev1 / predicted.fvc;

    // Interpretation
    let pattern = 'Normal';
    let severity = '';
    let color = 'bg-green-500';
    let textColor = 'text-green-700';
    let borderColor = 'border-green-200';

    if (ratioObs < 0.70) {
      pattern = 'Obstructive';
      color = 'bg-amber-500';
      textColor = 'text-amber-700';
      borderColor = 'border-amber-200';
      
      if (fev1Perc >= 80) severity = 'GOLD 1 (Mild)';
      else if (fev1Perc >= 50) severity = 'GOLD 2 (Moderate)';
      else if (fev1Perc >= 30) {
        severity = 'GOLD 3 (Severe)';
        color = 'bg-rose-500';
        textColor = 'text-rose-700';
        borderColor = 'border-rose-200';
      } else {
        severity = 'GOLD 4 (Very Severe)';
        color = 'bg-rose-600';
        textColor = 'text-rose-800';
        borderColor = 'border-rose-300';
      }
    } else if (fvcPerc < 80) {
      pattern = 'Restrictive Pattern (Suggestive)';
      color = 'bg-medical-primary';
      textColor = 'text-medical-primary';
      borderColor = 'border-medical-primary/20';
    }

    return {
      fev1Perc,
      fvcPerc,
      ratioObs,
      ratioPred,
      pattern,
      severity,
      color,
      textColor,
      borderColor
    };
  }, [obsFEV1, obsFVC, predicted]);

  return (
    <div className="space-y-8 pb-10">
      <PatientContextBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Input Column */}
        <div className="space-y-6">
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-medical-primary mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Demographics
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  Sex
                </label>
                <div className="flex p-1 bg-white rounded-xl border border-slate-100">
                  {(['male', 'female'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSex(s)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${sex === s ? 'bg-medical-primary text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  Ethnicity
                </label>
                <select
                  value={ethnicity}
                  onChange={(e) => setEthnicity(e.target.value as Ethnicity)}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none appearance-none"
                >
                  <option value="caucasian">Caucasian</option>
                  <option value="african-american">African American</option>
                  <option value="mexican-american">Mexican American</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-medical-primary mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Measurements (Observed)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  FEV1 (Liters)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={obsFEV1}
                  onChange={(e) => setObsFEV1(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  FVC (Liters)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={obsFVC}
                  onChange={(e) => setObsFVC(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Results Column */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border-2 border-medical-border shadow-xl relative overflow-hidden h-full">
            <h2 className="text-xl font-bold text-medical-primary mb-8 pb-4 border-b border-slate-100 uppercase tracking-tight">
              Spirometry Results
            </h2>

            {results ? (
              <div className="space-y-8">
                {/* Metric Gauges */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">FEV1 % Pred</p>
                    <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, results.fev1Perc)}%` }}
                        className={`h-full ${results.color}`}
                      />
                    </div>
                    <p className={`text-xl font-black text-center ${results.textColor}`}>{results.fev1Perc.toFixed(1)}%</p>
                    <p className="text-[9px] text-slate-400 text-center font-medium">Pred: {predicted.fev1.toFixed(2)}L</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">FVC % Pred</p>
                    <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, results.fvcPerc)}%` }}
                        className="h-full bg-medical-primary"
                      />
                    </div>
                    <p className="text-xl font-black text-center text-medical-primary">{results.fvcPerc.toFixed(1)}%</p>
                    <p className="text-[9px] text-slate-400 text-center font-medium">Pred: {predicted.fvc.toFixed(2)}L</p>
                  </div>
                </div>

                {/* Ratio Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FEV1 / FVC Ratio</h4>
                    <p className="text-xs font-bold text-medical-primary mt-1">Observed: {results.ratioObs.toFixed(2)}</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 ${results.ratioObs < 0.7 ? 'border-amber-200 text-amber-700' : 'border-green-200 text-green-700'}`}>
                    {results.ratioObs < 0.7 ? 'Obstructive' : 'Normal'}
                  </div>
                </div>

                {/* Classification Banner */}
                <div className={`p-6 rounded-2xl border-2 transition-all ${results.borderColor} ${results.color} bg-opacity-5`}>
                  <div className="flex items-start gap-4">
                    {results.ratioObs < 0.7 ? <TrendingDown className={`w-8 h-8 ${results.textColor}`} /> : <CheckCircle2 className={`w-8 h-8 ${results.textColor}`} />}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Classification</p>
                      <h3 className={`text-xl font-black tracking-tight leading-none mb-2 ${results.textColor}`}>
                        {results.pattern}
                      </h3>
                      {results.severity && (
                        <div className="px-2 py-0.5 rounded-lg bg-white border border-current text-[10px] font-black inline-block">
                          {results.severity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Disclosure */}
                <div className="mt-4 flex items-start gap-2 p-3 bg-slate-50 rounded-xl text-[9px] text-slate-500 leading-relaxed font-medium">
                  <Info className="w-3.5 h-3.5 shrink-0 text-medical-accent" />
                  <p>
                    NHANES III (Hankinson 1999) reference standard used. Obstruction threshold fixed at 0.70 per GOLD guidelines. Clinical correlation required for restrictive patterns (requires TLC measurement).
                  </p>
                </div>

                {/* Clinical Insights Section */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-medical-primary" />
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-tight">Clinical Insights</h3>
                  </div>
                  
                  <AnimatePresence mode="popLayout">
                    {results.ratioObs < 0.7 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-tight">
                          <Activity className="w-4 h-4" />
                          Next Diagnostic Steps
                        </div>
                        <ul className="text-[11px] text-amber-800 space-y-1.5 font-medium leading-relaxed list-disc list-inside">
                          <li>Perform <strong>Bronchodilator Reversibility (BDR)</strong> test (FEV1 ↑ ≥12% and ≥200mL).</li>
                          <li>Distinguish between <strong>Asthma</strong> and <strong>COPD</strong> based on history/reversibility.</li>
                          <li>If symptoms persist despite normal BDR, consider <strong>Methacholine Challenge</strong>.</li>
                        </ul>
                      </motion.div>
                    )}

                    {results.fvcPerc < 80 && results.ratioObs >= 0.7 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="p-4 rounded-2xl bg-medical-primary/5 border border-medical-primary/10 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center gap-2 text-medical-primary font-bold text-xs uppercase tracking-tight">
                          <Layers className="w-4 h-4" />
                          Restrictive Pattern Considerations
                        </div>
                        <ul className="text-[11px] text-slate-700 space-y-1.5 font-medium leading-relaxed list-disc list-inside">
                          <li>Correlate with <strong>Total Lung Capacity (TLC)</strong> to confirm true restriction.</li>
                          <li>Rule out <strong>extrapulmonary causes</strong> (Obesity, Chest Wall Deformity).</li>
                          <li>Consider <strong>Interstitial Lung Disease (ILD)</strong> if DLCO is reduced.</li>
                        </ul>
                      </motion.div>
                    )}

                    {results.fev1Perc < 50 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="p-4 rounded-2xl bg-rose-50 border border-rose-100 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-tight">
                          <AlertCircle className="w-4 h-4" />
                          Preoperative Considerations
                        </div>
                        <p className="text-[11px] text-rose-800 font-medium leading-relaxed">
                          <strong>High Risk for PPCs:</strong> FEV1 &lt; 50% predicted significantly increases risk of postoperative pulmonary complications. 
                        </p>
                        <ul className="text-[11px] text-rose-800/80 space-y-1 font-medium leading-relaxed list-disc list-inside">
                          <li>Strict <strong>smoking cessation</strong> for &gt;8 weeks recommended.</li>
                          <li>Optimization of bronchodilators/ICS before elective surgery.</li>
                          <li>Consider <strong>regional anesthesia</strong> or postoperative <strong>NIV/high-dependency care</strong>.</li>
                        </ul>
                      </motion.div>
                    )}
                    
                    {results.fev1Perc >= 80 && results.fvcPerc >= 80 && results.ratioObs >= 0.7 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="p-4 rounded-2xl bg-green-50 border border-green-100 flex items-center gap-3 shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-green-900">Normal Spirometry</p>
                          <p className="text-[10px] text-green-800 font-medium leading-relaxed">Lung function within expected ranges for demographics.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full space-y-4 opacity-50 py-10">
                <Wind className="w-16 h-16 text-slate-200" />
                <p className="text-xs font-bold text-slate-400">Enter measurements to see interpretation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
