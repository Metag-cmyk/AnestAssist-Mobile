import { useState, useMemo } from 'react';
import { 
  Droplets, 
  Activity, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { usePatient } from '../../contexts/PatientContext';

export default function AcidBaseInterpreter() {
  const { ageNum } = usePatient();
  // ABG Inputs
  const [ph, setPh] = useState<number | ''>(7.40);
  const [pco2, setPco2] = useState<number | ''>(40);
  const [hco3, setHco3] = useState<number | ''>(24);
  
  // Biochemical Inputs (Optional)
  const [na, setNa] = useState<number | ''>('');
  const [cl, setCl] = useState<number | ''>('');
  const [albumin, setAlbumin] = useState<number | ''>('');
  
  // Respiratory Gap Inputs (Optional)
  const [pao2, setPao2] = useState<number | ''>('');
  const [fio2, setFio2] = useState<number | ''>(21);
  
  // Settings
  const [isChronic, setIsChronic] = useState(false);

  // Interpretation Logic
  const interpretation = useMemo(() => {
    if (ph === '' || pco2 === '' || hco3 === '') return null;

    let primaryDisturbance = 'Normal';
    let compensationStatus = 'N/A';
    let secondaryDisorders: string[] = [];
    let diagnosticSteps: string[] = [];
    let differentialMnemonics: { title: string; items: string[] }[] = [];

    // 1. Determine Primary Abnormality
    const isAcidemia = ph < 7.35;
    const isAlkalemia = ph > 7.45;
    
    diagnosticSteps.push(`pH is ${ph}: ${isAcidemia ? 'Acidemia' : isAlkalemia ? 'Alkalemia' : 'Normal range'}`);

    if (isAcidemia) {
      if (pco2 > 40 && hco3 >= 24) {
        primaryDisturbance = 'Respiratory Acidosis';
      } else if (hco3 < 24 && pco2 <= 40) {
        primaryDisturbance = 'Metabolic Acidosis';
      } else if (pco2 > 40 && hco3 < 24) {
        primaryDisturbance = 'Mixed Respiratory & Metabolic Acidosis';
      }
    } else if (isAlkalemia) {
      if (pco2 < 40 && hco3 <= 24) {
        primaryDisturbance = 'Respiratory Alkalosis';
      } else if (hco3 > 24 && pco2 >= 40) {
        primaryDisturbance = 'Metabolic Alkalosis';
      } else if (pco2 < 40 && hco3 > 24) {
        primaryDisturbance = 'Mixed Respiratory & Metabolic Alkalosis';
      }
    } else {
      if (pco2 !== 40 || hco3 !== 24) primaryDisturbance = 'Mixed Disorder (Compensated)';
    }

    // 2. Compensation Logic
    if (primaryDisturbance.includes('Metabolic Acidosis')) {
      const expectedPco2 = 1.5 * hco3 + 8;
      const minPco2 = expectedPco2 - 2;
      const maxPco2 = expectedPco2 + 2;
      
      if (pco2 > maxPco2) {
        compensationStatus = 'Incomplete (Concurrent Resp. Acidosis)';
        secondaryDisorders.push('Respiratory Acidosis');
      } else if (pco2 < minPco2) {
        compensationStatus = 'Excessive (Concurrent Resp. Alkalosis)';
        secondaryDisorders.push('Respiratory Alkalosis');
      } else {
        compensationStatus = 'Appropriate (Winter\'s Formula met)';
      }
      diagnosticSteps.push(`Expected pCO2: ${minPco2.toFixed(1)}-${maxPco2.toFixed(1)}`);
    } 
    else if (primaryDisturbance.includes('Metabolic Alkalosis')) {
      const expectedPco2 = 0.7 * (hco3 - 24) + 40;
      const minPco2 = expectedPco2 - 2;
      const maxPco2 = expectedPco2 + 2;

      if (pco2 > maxPco2) {
        compensationStatus = 'Excessive (Concurrent Resp. Acidosis)';
        secondaryDisorders.push('Respiratory Acidosis');
      } else if (pco2 < minPco2) {
        compensationStatus = 'Incomplete (Concurrent Resp. Alkalosis)';
        secondaryDisorders.push('Respiratory Alkalosis');
      } else {
        compensationStatus = 'Appropriate';
      }
      diagnosticSteps.push(`Expected pCO2: ${minPco2.toFixed(1)}-${maxPco2.toFixed(1)}`);
      
      differentialMnemonics.push({
        title: 'Metabolic Alkalosis Causes',
        items: ['Vomiting/Suction (NaCl Responsive)', 'Diuretics (NaCl Responsive)', 'Mineralocorticoid Excess (NaCl Resistant)']
      });
    }
    else if (primaryDisturbance.includes('Respiratory Acidosis')) {
      const deltaPco2 = pco2 - 40;
      const expectedHco3 = isChronic ? 24 + (deltaPco2 / 10) * 3.5 : 24 + (deltaPco2 / 10) * 1;
      
      if (hco3 > expectedHco3 + 2) {
        compensationStatus = 'Excessive (Concurrent Met. Alkalosis)';
        secondaryDisorders.push('Metabolic Alkalosis');
      } else if (hco3 < expectedHco3 - 2) {
        compensationStatus = 'Incomplete (Concurrent Met. Acidosis)';
        secondaryDisorders.push('Metabolic Acidosis');
      } else {
        compensationStatus = 'Appropriate';
      }
      diagnosticSteps.push(`Expected HCO3: ${expectedHco3.toFixed(1)}`);
    }
    else if (primaryDisturbance.includes('Respiratory Alkalosis')) {
      const deltaPco2 = 40 - pco2;
      const expectedHco3 = isChronic ? 24 - (deltaPco2 / 10) * 4 : 24 - (deltaPco2 / 10) * 2;

      if (hco3 > expectedHco3 + 2) {
        compensationStatus = 'Incomplete (Concurrent Met. Alkalosis)';
        secondaryDisorders.push('Metabolic Alkalosis');
      } else if (hco3 < expectedHco3 - 2) {
        compensationStatus = 'Excessive (Concurrent Met. Acidosis)';
        secondaryDisorders.push('Metabolic Acidosis');
      } else {
        compensationStatus = 'Appropriate';
      }
      diagnosticSteps.push(`Expected HCO3: ${expectedHco3.toFixed(1)}`);
    }

    // 3. AG & Delta-Delta Logic
    let anionGap: number | null = null;
    let adjAnionGap: number | null = null;
    let hagma = false;
    let deltaDelta: number | null = null;

    if (na !== '' && cl !== '') {
      anionGap = na - (cl + hco3);
      adjAnionGap = anionGap;
      
      if (albumin !== '') {
        adjAnionGap = anionGap + 2.5 * (4 - albumin);
      }

      if (adjAnionGap > 12) {
        hagma = true;
        secondaryDisorders.push('High Anion Gap Metabolic Acidosis (HAGMA)');
        differentialMnemonics.push({
          title: 'HAGMA (GOLD MARK)',
          items: ['G: Glycols (Ethylene/Propylene)', 'O: Oxoproline (Acetaminophen)', 'L: L-lactate', 'D: D-lactate', 'M: Methanol', 'A: Aspirin', 'R: Renal Failure (Uremia)', 'K: Ketoacidosis']
        });

        if (24 - hco3 !== 0) {
          deltaDelta = (adjAnionGap - 12) / (24 - hco3);
          if (deltaDelta > 2.0) secondaryDisorders.push('Concurrent Metabolic Alkalosis (Delta-Delta > 2)');
          else if (deltaDelta < 0.4) secondaryDisorders.push('Concurrent NAGMA (Delta-Delta < 0.4)');
        }
      } else if (primaryDisturbance.includes('Metabolic Acidosis')) {
        differentialMnemonics.push({
          title: 'NAGMA (USED CARS)',
          items: ['U: Ureterostomy', 'S: Saline (Hyperchloremia)', 'E: Endocrine (Addison\'s)', 'D: Diarrhea', 'C: Carbonic Anhydrase Inhibitors', 'A: Ammonium Chloride', 'R: Renal Tubular Acidosis', 'S: Spironolactone']
        });
      }
    }

    // 4. Oxygenation Gradient (Alveolar Equation)
    let aaGradient: number | null = null;
    if (pao2 !== '' && fio2 !== '') {
      const patm = 760;
      const ph2o = 47;
      const paO2Alv = (fio2 / 100) * (patm - ph2o) - (pco2 / 0.8);
      aaGradient = paO2Alv - pao2;
    }

    return {
      primaryDisturbance,
      compensationStatus,
      secondaryDisorders: Array.from(new Set(secondaryDisorders)),
      diagnosticSteps,
      anionGap,
      adjAnionGap,
      hagma,
      deltaDelta,
      aaGradient,
      differentialMnemonics,
      age: ageNum // Using context age
    };
  }, [ph, pco2, hco3, na, cl, albumin, pao2, fio2, isChronic, ageNum]);

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Column */}
        <div className="space-y-6">
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-medical-primary mb-4 flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              ABG Values
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">pH</label>
                <input type="number" step="0.01" value={ph} onChange={(e) => setPh(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">pCO2</label>
                <input type="number" value={pco2} onChange={(e) => setPco2(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">HCO3</label>
                <input type="number" value={hco3} onChange={(e) => setHco3(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">PaO2 (Oxy)</label>
                <input type="number" value={pao2} onChange={(e) => setPao2(e.target.value === '' ? '' : parseFloat(e.target.value))} placeholder="90" className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">FiO2 (%)</label>
                <input type="number" value={fio2} onChange={(e) => setFio2(e.target.value === '' ? '' : parseFloat(e.target.value))} placeholder="21" className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between p-2 bg-white rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-2">Respiratory Pattern</span>
              <div className="flex gap-1">
                <button onClick={() => setIsChronic(false)} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${!isChronic ? 'bg-medical-primary text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Acute</button>
                <button onClick={() => setIsChronic(true)} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${isChronic ? 'bg-medical-primary text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Chronic</button>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-medical-primary mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Biochemistry (Optional)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Na+</label>
                <input type="number" value={na} onChange={(e) => setNa(e.target.value === '' ? '' : parseFloat(e.target.value))} placeholder="140" className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Cl-</label>
                <input type="number" value={cl} onChange={(e) => setCl(e.target.value === '' ? '' : parseFloat(e.target.value))} placeholder="104" className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Albumin</label>
                <input type="number" step="0.1" value={albumin} onChange={(e) => setAlbumin(e.target.value === '' ? '' : parseFloat(e.target.value))} placeholder="4.0" className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-medical-accent outline-none" />
              </div>
            </div>
          </section>
        </div>

        {/* Results Column */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border-2 border-medical-border shadow-xl h-full flex flex-col min-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-bold text-medical-primary mb-8 pb-4 border-b border-slate-100 uppercase tracking-tight">Interpretation Result</h2>

            {interpretation ? (
              <div className="space-y-6 flex-1">
                <div className={`p-6 rounded-2xl border-2 transition-all ${interpretation.primaryDisturbance.includes('Normal') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Primary Assessment</p>
                  <h3 className="text-xl font-black tracking-tight leading-none">{interpretation.primaryDisturbance}</h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Diagnostic Logic</h4>
                  {interpretation.diagnosticSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs font-medium text-slate-600">
                      <ArrowRight className="w-3 h-3 mt-0.5 text-medical-accent shrink-0" />
                      {step}
                    </div>
                  ))}
                  <div className="flex items-start gap-3 text-xs font-bold text-medical-primary">
                    <ArrowRight className="w-3 h-3 mt-0.5 text-medical-accent shrink-0" />
                    Comp: {interpretation.compensationStatus}
                  </div>
                </div>

                {interpretation.aaGradient !== null && (
                  <div className="p-5 bg-medical-primary text-white rounded-2xl shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Activity className="w-16 h-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">A-a Gradient</p>
                    <div className="flex items-end gap-2">
                       <span className="text-3xl font-black">{interpretation.aaGradient.toFixed(1)}</span>
                       <span className="text-xs mb-1 opacity-60">mmHg</span>
                    </div>
                    <p className="text-[10px] mt-2 font-medium">Normal: {(10 * ((Number(fio2) || 21)/21) + (ageNum || 40)/4).toFixed(0)} mmHg (Est.)</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {interpretation.adjAnionGap !== null && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Adj Anion Gap</p>
                      <p className={`text-2xl font-black ${interpretation.hagma ? 'text-rose-600' : 'text-medical-primary'}`}>{interpretation.adjAnionGap.toFixed(1)}</p>
                    </div>
                  )}
                  {interpretation.deltaDelta !== null && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Delta-Delta</p>
                      <p className="text-2xl font-black text-medical-primary">{interpretation.deltaDelta.toFixed(2)}</p>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {interpretation.differentialMnemonics.map((mnem, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mnem.title}</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {mnem.items.map((item, i) => (
                          <div key={i} className="px-4 py-2 bg-amber-50 rounded-xl border border-amber-100 text-[11px] font-bold text-amber-800 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-6 flex-1 opacity-40 py-10">
                <Activity className="w-16 h-16 text-slate-200" />
                <p className="text-xs font-bold text-slate-500">Enter ABG values to analyze</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
