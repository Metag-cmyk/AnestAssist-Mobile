import { useState } from 'react';
import { Beaker } from 'lucide-react';

const FLUID_OPTIONS = [
  { name: '0.9% Normal Saline', na: 154 },
  { name: '3% Hypertonic Saline', na: 513 },
  { name: 'Lactated Ringer\'s', na: 130 },
  { name: 'Plasmalyte', na: 140 },
  { name: '5% Dextrose (D5W)', na: 0 },
  { name: '0.45% Saline', na: 77 },
];

const TBW_FACTORS = [
  { label: 'Children', value: 0.6 },
  { label: 'Adult Male', value: 0.6 },
  { label: 'Adult Female', value: 0.5 },
  { label: 'Elderly Male', value: 0.5 },
  { label: 'Elderly Female', value: 0.45 },
];

export default function SodiumCorrection() {
  const [weight, setWeight] = useState<number>(70);
  const [serumNa, setSerumNa] = useState<number>(125);
  const [fluidNa, setFluidNa] = useState<number>(154); // Default to NS
  const [tbwFactor, setTbwFactor] = useState<number>(0.6); // Default adult male

  // Calculate Total Body Water
  const tbw = weight * tbwFactor;

  // Adrogué-Madias Formula: Change in Na+ per 1 Liter of infusate = (Infusate Na - Serum Na) / (TBW + 1)
  const changePerLiter = (fluidNa - serumNa) / (tbw + 1);

  // Define safe correction limits (usually max 8-10 mEq/L per 24h for chronic hyponatremia)
  // Let's calculate volume needed to raise Na by 8 mEq (safe 24h target)
  const targetIncrease = 8;
  const volumeNeededForSafeTarget = Math.abs(changePerLiter) > 0 ? (targetIncrease / Math.abs(changePerLiter)) * 1000 : 0;

  // Rate for 24h
  const rateFor24h = volumeNeededForSafeTarget / 24;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <Beaker className="w-5 h-5 text-indigo-600" />
        <h3 className="font-bold text-slate-800">Sodium Correction Calculator</h3>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Weight (kg)</label>
              <input
                type="number"
                min="0"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Patient Type</label>
              <select
                value={tbwFactor}
                onChange={(e) => setTbwFactor(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {TBW_FACTORS.map(f => (
                  <option key={f.label} value={f.value}>{f.label} (x{f.value})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Current Serum Na+</label>
              <div className="relative">
                <input
                  type="number"
                  min="100"
                  max="180"
                  value={serumNa}
                  onChange={(e) => setSerumNa(Number(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-sm">mEq/L</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">IV Fluid Type</label>
              <select
                value={fluidNa}
                onChange={(e) => setFluidNa(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {FLUID_OPTIONS.map(f => (
                  <option key={f.name} value={f.na}>{f.name} ({f.na} mEq/L)</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-indigo-50 rounded-lg border border-indigo-100 p-4 flex flex-col justify-center space-y-4">
          <div className="flex justify-between items-end border-b border-indigo-200 pb-2">
            <span className="text-sm font-medium text-indigo-800">Change in Na+ per 1L IV fluid</span>
            <span className="text-2xl font-bold text-indigo-700">
              {changePerLiter > 0 ? '+' : ''}{changePerLiter.toFixed(2)} <span className="text-sm font-normal text-indigo-500">mEq/L</span>
            </span>
          </div>

          {Math.abs(changePerLiter) > 0.1 && (
            <div className="bg-white/60 p-3 rounded-md">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-indigo-900 font-medium">Safe Correction Target (8 mEq/24h)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <div className="text-xs text-indigo-600 uppercase">Total Volume</div>
                  <div className="font-semibold text-indigo-900">{Math.round(volumeNeededForSafeTarget)} mL</div>
                </div>
                <div>
                  <div className="text-xs text-indigo-600 uppercase">Infusion Rate</div>
                  <div className="font-semibold text-indigo-900">{Math.round(rateFor24h)} mL/hr</div>
                </div>
              </div>
              <p className="text-[10px] text-indigo-600 mt-2 italic">
                *Adrogué-Madias formula. Monitor Na+ frequently. Avoid rapid overcorrection to prevent osmotic demyelination syndrome.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
