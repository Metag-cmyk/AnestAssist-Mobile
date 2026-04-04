import { useState, useMemo, useEffect } from 'react';
import { UserPlus, Scale, Activity, AlertTriangle, Info, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePatient, PatientType } from '../../contexts/PatientContext';

import { useEmergencyDrugs } from './hooks/useEmergencyDrugs';
import { useAntibiotics } from './hooks/useAntibiotics';
import { useEquipmentSizes } from './hooks/useEquipmentSizes';

export default function PatientCalculator() {
  const { t } = useLanguage();
  const { patient, setPatient, ibw, bmi, crcl } = usePatient();
  
  const [showDrugs, setShowDrugs] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [manualCrcl, setManualCrcl] = useState<string>('');
  const [showAntibiotics, setShowAntibiotics] = useState(true);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const calculations = useMemo(() => {
    let percentileInfo = "";
    const type = patient.type;
    const age = Number(patient.age) || 0;
    const currentBmi = bmi;

    if (type === 'adult') {
      if (currentBmi < 18.5) percentileInfo = "Underweight";
      else if (currentBmi < 25) percentileInfo = "Normal weight";
      else if (currentBmi < 30) percentileInfo = "Overweight";
      else percentileInfo = "Obese";
    } else if (type === 'neonatal' || (type === 'pediatric' && age < 1)) {
      percentileInfo = "Neonatal/Infant: Use WHO Growth Charts";
    } else {
      if (currentBmi < 14) percentileInfo = "< 5th Percentile (Underweight)";
      else if (currentBmi < 18) percentileInfo = "5th - 85th Percentile (Healthy)";
      else if (currentBmi < 21) percentileInfo = "85th - 95th Percentile (Overweight)";
      else percentileInfo = "> 95th Percentile (Obese)";
    }

    return { 
      ibw: ibw.toFixed(1), 
      bmi: currentBmi.toFixed(1), 
      category: percentileInfo, 
      rawIbw: ibw,
      defaultCrcl: crcl
    };
  }, [patient.type, patient.age, bmi, ibw, crcl]);

  const targetWeight = patient.useIBW ? calculations.rawIbw : (Number(patient.weightKg) || 0);
  const activeCrcl = manualCrcl === '' ? calculations.defaultCrcl : (parseFloat(manualCrcl) || calculations.defaultCrcl);

  const emergencyDrugs = useEmergencyDrugs(targetWeight);
  const antibioticsList = useAntibiotics(patient.weightKg, ibw, activeCrcl);
  const equipmentSizes = useEquipmentSizes(patient);

  const resetData = () => {
    setPatient({
      type: 'adult',
      age: 45,
      weightKg: 80,
      heightCm: 175,
      sex: 'male',
      useIBW: false
    });
    setManualCrcl('');
    showToast(t('patient.toastReset'));
  };

  const copyDoses = () => {
    const text = emergencyDrugs.map(d => {
      let base = `${d.name}: ${d.calculatedDose}`;
      if (d.infusionRates) {
        base += `\n  - ${d.infusionRates.mcgKgMin} mcg/kg/min\n  - ${d.infusionRates.mcgKgHr} mcg/kg/h\n  - ${d.infusionRates.mgHr} mg/h`;
      }
      return base;
    }).join('\n\n');
    navigator.clipboard.writeText(text);
    showToast(t('patient.toastCopy'));
  };

  const getAgeLabel = () => {
    if (patient.type === 'neonatal') return t('patient.days');
    if (patient.type === 'pediatric' && (Number(patient.age) || 0) < 1) return t('patient.months');
    return t('patient.years');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white p-6 rounded-xl border border-medical-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-medical-accent" />
            {t('patient.title')}
          </h2>
          <button 
            onClick={resetData}
            className="text-xs font-bold text-slate-400 hover:text-medical-accent transition-colors uppercase tracking-widest"
          >
            {t('patient.reset')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('patient.type')}</label>
            <div className="flex flex-col gap-1">
              {(['adult', 'pediatric', 'neonatal'] as PatientType[]).map((tVal) => (
                <button
                  key={tVal}
                  onClick={() => setPatient({ type: tVal })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border transition-all ${
                    patient.type === tVal ? 'bg-medical-primary text-white border-medical-primary' : 'bg-white text-slate-500 border-medical-border hover:bg-slate-50'
                  }`}
                >
                  {tVal}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              {t('patient.age')} ({getAgeLabel()})
            </label>
            <input 
              type="number" 
              value={patient.age} 
              onChange={(e) => setPatient({ age: e.target.value === '' ? '' : Number(e.target.value) })}
              className="w-full p-2 border border-medical-border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('patient.weight')}</label>
            <input 
              type="number" 
              value={patient.weightKg} 
              onChange={(e) => setPatient({ weightKg: e.target.value === '' ? '' : Number(e.target.value) })}
              className="w-full p-2 border border-medical-border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('patient.height')}</label>
            <input 
              type="number" 
              value={patient.heightCm} 
              onChange={(e) => setPatient({ heightCm: e.target.value === '' ? '' : Number(e.target.value) })}
              className="w-full p-2 border border-medical-border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('patient.gender')}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setPatient({ sex: 'male' })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                  patient.sex === 'male' ? 'bg-medical-accent text-white border-medical-accent' : 'bg-white text-slate-600 border-medical-border hover:bg-slate-50'
                }`}
              >
                {t('patient.male')}
              </button>
              <button
                onClick={() => setPatient({ sex: 'female' })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                  patient.sex === 'female' ? 'bg-medical-accent text-white border-medical-accent' : 'bg-white text-slate-600 border-medical-border hover:bg-slate-50'
                }`}
              >
                {t('patient.female')}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              CrCl (mL/min)
            </label>
            <div className="relative">
              <input 
                type="number" 
                placeholder={calculations.defaultCrcl.toFixed(0)}
                value={manualCrcl} 
                onChange={(e) => setManualCrcl(e.target.value)}
                className="w-full p-2 border border-medical-border rounded-lg text-sm bg-white"
              />
              {!manualCrcl && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none">
                  (Auto: {calculations.defaultCrcl.toFixed(0)})
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-medical-border text-center">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t('patient.ibw')}</p>
            <p className="text-2xl font-bold text-medical-primary">{calculations.ibw} <span className="text-sm font-normal">kg</span></p>
            {patient.type !== 'adult' && <p className="text-[10px] text-slate-400 mt-1">{t('patient.apls')}</p>}
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-medical-border text-center">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">
              {patient.type === 'adult' ? t('patient.bmi') : t('patient.bmiPercentile')}
            </p>
            <p className="text-2xl font-bold text-medical-primary">{calculations.bmi}</p>
            <p className="text-xs text-medical-accent font-medium">{calculations.category}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <p className="text-xs font-bold text-blue-400 uppercase mb-1">{t('patient.targetWeight')}</p>
            <p className="text-2xl font-bold text-blue-700 mb-2">{targetWeight.toFixed(1)} <span className="text-sm font-normal">kg</span></p>
            <div className="flex bg-white/50 p-1 rounded-lg border border-blue-200">
              <button
                onClick={() => setPatient({ useIBW: false })}
                className={`flex-1 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                  !patient.useIBW ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-400 hover:text-blue-600'
                }`}
              >
                {t('patient.actual')}
              </button>
              <button
                onClick={() => setPatient({ useIBW: true })}
                className={`flex-1 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                  patient.useIBW ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-400 hover:text-blue-600'
                }`}
              >
                {t('patient.ideal')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {equipmentSizes && (
        <div className="bg-white p-6 rounded-xl border border-medical-border shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-medical-primary">
            <Activity className="w-5 h-5 text-medical-accent" />
            {t('patient.equipmentTitle')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-medical-border text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('patient.ettSize')}</p>
              <p className="text-xl font-bold text-medical-primary">{equipmentSizes.ett}</p>
              <p className="text-[10px] text-slate-400 mt-1">{t('patient.cuffedNote')}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-medical-border text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('patient.ettDepth')}</p>
              <p className="text-xl font-bold text-medical-primary">{equipmentSizes.depth} <span className="text-xs font-normal">cm</span></p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-medical-border text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('patient.lmaSize')}</p>
              <p className="text-xl font-bold text-medical-primary">{equipmentSizes.lma}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-medical-border text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('patient.blade')}</p>
              <p className="text-xl font-bold text-medical-primary">{equipmentSizes.blade}</p>
              <p className="text-[10px] text-slate-400 mt-1">{t('patient.millerNote')}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-medical-border shadow-sm overflow-hidden">
        <div 
          onClick={() => setShowDrugs(!showDrugs)}
          className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-medical-primary">{t('patient.drugsTitle')}</h3>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                copyDoses();
              }}
              className="text-xs font-bold text-medical-accent hover:text-blue-700 transition-colors uppercase tracking-widest"
            >
              {t('patient.copyDoses')}
            </button>
            {showDrugs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-medical-primary text-white px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-medical-accent" />
              <span className="text-sm font-bold">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {showDrugs && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-medical-border">
                <tr>
                  <th className="px-6 py-3 font-semibold text-slate-600">{t('patient.tableName')}</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">{t('patient.tableDose')}</th>
                  <th className="px-6 py-3 font-semibold text-medical-accent">{t('patient.tableCalc')}</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">{t('patient.tableNotes')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-medical-border">
                {emergencyDrugs.map((drug, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-medical-primary">{drug.name}</td>
                    <td className="px-6 py-4 text-slate-600">{drug.dose}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold w-fit">
                          {drug.calculatedDose}
                        </span>
                        {drug.infusionRates && (
                          <div className="grid grid-cols-1 gap-1 mt-1">
                            <div className="flex justify-between text-[10px] font-bold text-slate-500 border-b border-slate-100 pb-1">
                              <span>{t('patient.mcgKgMin')}</span>
                              <span className="text-medical-primary">{drug.infusionRates.mcgKgMin}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-500 border-b border-slate-100 pb-1">
                              <span>{t('patient.mcgKgHr')}</span>
                              <span className="text-medical-primary">{drug.infusionRates.mcgKgHr}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-500">
                              <span>{t('patient.mgHr')}</span>
                              <span className="text-medical-primary">{drug.infusionRates.mgHr}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700">{drug.indication}</p>
                      {drug.notes && <p className="text-xs text-slate-400 mt-1 italic">{drug.notes}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-medical-border shadow-sm overflow-hidden">
        <div 
          onClick={() => setShowAntibiotics(!showAntibiotics)}
          className="w-full px-6 py-4 flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-emerald-900">Antibiotic Dosing & Spectrum Coverage</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-bold text-emerald-700 bg-emerald-200/50 px-2 py-1 rounded">
              CrCl: {activeCrcl.toFixed(0)} mL/min
            </div>
            {showAntibiotics ? <ChevronUp className="w-5 h-5 text-emerald-700" /> : <ChevronDown className="w-5 h-5 text-emerald-700" />}
          </div>
        </div>

        {showAntibiotics && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-medical-border">
                <tr>
                  <th className="px-6 py-3 font-semibold text-slate-600">Antibiotic</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Dose & Interval</th>
                  <th className="px-6 py-3 font-semibold text-slate-600 w-64">Spectrum Matrix</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Clinical Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-medical-border">
                {antibioticsList.map((med, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-emerald-800">{med.name}</p>
                      <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-wider">{med.class}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-black text-slate-800">{med.dose}</div>
                      <div className="text-emerald-700 font-bold text-xs mt-0.5">{med.interval}</div>
                      
                      {med.infusion && (
                        <div className="mt-2 p-2 bg-emerald-50 rounded border border-emerald-100/50">
                          <p className="text-[10px] font-bold text-emerald-800 uppercase mb-1">{med.infusion.method}</p>
                          <p className="text-xs text-emerald-700 font-medium mb-1">{med.infusion.rate}</p>
                          <p className="text-[10px] text-slate-500 italic">{med.infusion.alternative}</p>
                        </div>
                      )}
                      
                      <div className="text-[10px] text-slate-500 mt-2 italic leading-tight">{med.baseWeight}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.gramPos === 2 ? 'bg-blue-100 text-blue-700' : med.spectrum.gramPos === 1 ? 'bg-blue-50 text-blue-400 border border-blue-200' : 'bg-slate-100 text-slate-300'}`}>Gram+</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.gramNeg === 2 ? 'bg-emerald-100 text-emerald-700' : med.spectrum.gramNeg === 1 ? 'bg-emerald-50 text-emerald-400 border border-emerald-200' : 'bg-slate-100 text-slate-300'}`}>Gram-</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.anaerobes === 2 ? 'bg-purple-100 text-purple-700' : med.spectrum.anaerobes === 1 ? 'bg-purple-50 text-purple-400 border border-purple-200' : 'bg-slate-100 text-slate-300'}`}>Anaerobes</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.pseudomonas === 2 ? 'bg-orange-100 text-orange-700' : med.spectrum.pseudomonas === 1 ? 'bg-orange-50 text-orange-400 border border-orange-200' : 'bg-slate-100 text-slate-300'}`}>Pseudo</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${med.spectrum.mrsa === 2 ? 'bg-rose-100 text-rose-700' : med.spectrum.mrsa === 1 ? 'bg-rose-50 text-rose-400 border border-rose-200' : 'bg-slate-100 text-slate-300'}`}>MRSA</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{med.notes}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
