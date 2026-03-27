import { useState } from 'react';
import { Calculator, ArrowRightLeft, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Converter() {
  const [weight, setWeight] = useState<number>(70);
  const [dose, setDose] = useState<number>(0);
  const [concentration, setConcentration] = useState<number>(1); // mg/ml
  const [unit, setUnit] = useState<'mcg/kg/min' | 'mcg/kg/h' | 'mg/h'>('mcg/kg/min');
  const { t } = useLanguage();
  
  const calculateRate = () => {
    if (concentration <= 0) return 0;
    
    let rateMlH = 0;
    if (unit === 'mcg/kg/min') {
      // mcg/kg/min -> mg/h: (dose * weight * 60) / 1000
      // rate (ml/h) = (mg/h) / concentration
      rateMlH = (dose * weight * 60) / (1000 * concentration);
    } else if (unit === 'mcg/kg/h') {
      rateMlH = (dose * weight) / (1000 * concentration);
    } else if (unit === 'mg/h') {
      rateMlH = dose / concentration;
    }
    
    return rateMlH.toFixed(2);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-medical-border shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-medical-accent" />
          {t('converter.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('converter.weight')}</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full p-2 border border-medical-border rounded-md outline-none focus:ring-2 focus:ring-medical-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('converter.concentration')}</label>
              <input
                type="number"
                value={concentration}
                onChange={(e) => setConcentration(Number(e.target.value))}
                className="w-full p-2 border border-medical-border rounded-md outline-none focus:ring-2 focus:ring-medical-accent"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('converter.dose')}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={dose}
                  onChange={(e) => setDose(Number(e.target.value))}
                  className="flex-1 p-2 border border-medical-border rounded-md outline-none focus:ring-2 focus:ring-medical-accent"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as any)}
                  className="p-2 border border-medical-border rounded-md bg-slate-50 text-sm"
                >
                  <option value="mcg/kg/min">mcg/kg/min</option>
                  <option value="mcg/kg/h">mcg/kg/h</option>
                  <option value="mg/h">mg/h</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-medical-primary text-white rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">{t('converter.rate')}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{calculateRate()}</span>
              <span className="text-xl text-slate-300">mL/h</span>
            </div>
          </div>
          <div className="p-3 bg-white/10 rounded-full">
            <ArrowRightLeft className="w-8 h-8" />
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-lg text-blue-800 text-sm">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            {t('converter.safety')}
          </p>
        </div>
      </div>
    </div>
  );
}
