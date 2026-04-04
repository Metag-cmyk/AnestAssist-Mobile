import { useMemo } from 'react';
import { EquipmentSizes } from '../types';
import { PatientData } from '../../../contexts/PatientContext';

export const useEquipmentSizes = (patient: PatientData): EquipmentSizes | null => {
  return useMemo(() => {
    if (patient.type === 'adult') return null;
    
    let ett = 0;
    let depth = 0;
    let lma = 0;
    let blade = 0;
    const age = Number(patient.age) || 0;
    const weight = Number(patient.weightKg) || 0;

    if (patient.type === 'neonatal') {
      ett = age < 30 ? 3.0 : 3.5;
      depth = 9;
      lma = 1;
      blade = 0;
    } else {
      ett = (age / 4) + 4; 
      depth = (age / 2) + 12;
      
      if (weight < 5) lma = 1;
      else if (weight < 10) lma = 1.5;
      else if (weight < 20) lma = 2;
      else if (weight < 30) lma = 2.5;
      else lma = 3;

      if (age < 1) blade = 1;
      else if (age < 5) blade = 2;
      else blade = 3;
    }

    return { ett: ett.toFixed(1), depth: depth.toFixed(1), lma, blade };
  }, [patient.type, patient.age, patient.weightKg]);
};
