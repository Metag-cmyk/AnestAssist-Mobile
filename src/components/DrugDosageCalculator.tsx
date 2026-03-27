import React, { useState } from 'react';
import { Syringe, Calculator, Info } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';
import { motion } from 'motion/react';

interface Drug {
  id: string;
  name: string;
  doseMgPerKg: number;
  maxDoseMg?: number;
  notes: string;
}

const COMMON_DRUGS: Drug[] = [
  { id: 'propofol', name: 'Propofol', doseMgPerKg: 2.0, notes: 'Induction dose (1.5-2.5 mg/kg)' },
  { id: 'fentanyl', name: 'Fentanyl', doseMgPerKg: 0.002, notes: 'Induction dose (1-2 mcg/kg)' },
  { id: 'rocuronium', name: 'Rocuronium', doseMgPerKg: 0.6, notes: 'Intubation dose (0.6 mg/kg)' },
  { id: 'suxamethonium', name: 'Suxamethonium', doseMgPerKg: 1.0, maxDoseMg: 150, notes: 'Intubation dose (1-1.5 mg/kg)' }
];

export default function DrugDosageCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [selectedDrug, setSelectedDrug] = useState<string>(COMMON_DRUGS[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmedDosage, setConfirmedDosage] = useState<{dose: number, msg: string} | null>(null);

  const drug = COMMON_DRUGS.find(d => d.id === selectedDrug)!;
  
  const calculateDose = () => {
    const w = parseFloat(weight);
    if (!w || isNaN(w)) return 0;
    
    let dose = w * drug.doseMgPerKg;
    if (drug.maxDoseMg && dose > drug.maxDoseMg) {
      dose = drug.maxDoseMg;
    }
    return dose;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseFloat(weight) > 0) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => {
    const dose = calculateDose();
    let msg = `${dose.toFixed(2)} mg`;
    if (drug.id === 'fentanyl') {
       msg = `${(dose * 1000).toFixed(0)} mcg`;
    }
    setConfirmedDosage({ dose, msg });
    setIsModalOpen(false);
  };

  const formatDoseUnits = (doseRaw: number, drugId: string) => {
    if (drugId === 'fentanyl') return `${(doseRaw * 1000).toFixed(0)} mcg`;
    return `${doseRaw.toFixed(1)} mg`;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2 bg-blue-50 text-medical-accent rounded-lg">
            <Syringe className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Drug Dosage Calculator</h2>
        </div>

        <form onSubmit={handleCalculate} className="space-y-5" aria-label="Dosage Calculator Form">
          <div className="space-y-4">
            <div>
              <label htmlFor="patient-weight" className="block text-sm font-semibold text-slate-700 mb-1">
                Patient Weight (kg)
              </label>
              <input
                id="patient-weight"
                type="number"
                min="0.1"
                step="0.1"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-medical-accent focus:border-transparent transition-shadow outline-none text-lg"
                placeholder="e.g. 70"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="drug-select" className="block text-sm font-semibold text-slate-700 mb-1">
                Select Drug
              </label>
              <select
                id="drug-select"
                value={selectedDrug}
                onChange={(e) => setSelectedDrug(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-medical-accent focus:border-transparent transition-shadow outline-none text-lg bg-white"
              >
                {COMMON_DRUGS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-3">
              <Info className="w-5 h-5 text-medical-accent shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-slate-600">
                <strong>Standard Dose:</strong> {drug.notes} <br/>
                {drug.maxDoseMg && <span className="text-amber-600">Maximum dose: {drug.maxDoseMg} mg</span>}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!weight || parseFloat(weight) <= 0}
            className="w-full py-3 px-4 bg-medical-accent hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 text-lg focus:outline-none focus:ring-2 focus:ring-medical-accent focus:ring-offset-2"
          >
            <Calculator className="w-5 h-5" aria-hidden="true" />
            Calculate Dosage
          </button>
        </form>

        {confirmedDosage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-5 bg-green-50 border border-green-200 rounded-lg text-center"
            role="alert"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-1">Confirmed Dosage</p>
            <p className="text-3xl font-bold text-green-700">
              {drug.name}: {confirmedDosage.msg}
            </p>
          </motion.div>
        )}
      </motion.div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Dosage Calculation"
        confirmText="Acknowledge & Calculate"
      >
        <div className="space-y-4 text-base">
          <p>You are about to calculate a dosage for:</p>
          <div className="bg-white border rounded-lg p-4 font-mono text-sm shadow-sm">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Patient Weight:</span>
              <span className="font-bold">{weight} kg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Selected Drug:</span>
              <span className="font-bold">{drug.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Dose base:</span>
              <span className="font-bold">{drug.doseMgPerKg} mg/kg</span>
            </div>
            <div className="flex justify-between py-1 bg-amber-50 rounded mt-2 px-2">
              <span className="text-amber-800 font-semibold">Calculated Total:</span>
              <span className="font-bold text-amber-900 border-b-2 border-amber-500">
                {formatDoseUnits(calculateDose(), drug.id)}
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-500 bg-red-50 p-3 rounded text-red-800 border-l-4 border-red-500">
            <strong>Warning:</strong> Always verify clinical guidelines and adjust for patient condition. This calculator is a tool and does not substitute clinical judgment.
          </p>
        </div>
      </ConfirmationModal>
    </div>
  );
}
