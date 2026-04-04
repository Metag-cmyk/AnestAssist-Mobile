import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

export type Sex = 'male' | 'female';
export type Ethnicity = 'caucasian' | 'african-american' | 'mexican-american' | 'other';
export type PatientType = 'adult' | 'pediatric' | 'neonatal';

export interface PatientData {
  type: PatientType;
  age: number | '';
  heightCm: number | '';
  weightKg: number | '';
  sex: Sex;
  ethnicity: Ethnicity;
  useIBW: boolean;
}

interface PatientContextType {
  patient: PatientData;
  setPatient: (data: Partial<PatientData>) => void;
  ibw: number;
  bmi: number;
  bsa: number;
  lbm: number;
  crcl: number;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const K_PATIENT_DATA = 'anestassist_patient_data_v2';

const initialData: PatientData = {
  type: 'adult',
  age: 45,
  heightCm: 175,
  weightKg: 80,
  sex: 'male',
  ethnicity: 'caucasian',
  useIBW: false,
};

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patient, setPatientState] = useState<PatientData>(() => {
    const saved = localStorage.getItem(K_PATIENT_DATA);
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(K_PATIENT_DATA, JSON.stringify(patient));
  }, [patient]);

  const setPatient = (data: Partial<PatientData>) => {
    setPatientState(prev => ({ ...prev, ...data }));
  };

  // 1. Ideal Body Weight (IBW)
  const ibw = useMemo(() => {
    const { type, age, heightCm, sex } = patient;
    const h = Number(heightCm) || 0;
    const a = Number(age) || 0;

    if (type === 'adult') {
      if (h < 152.4) return sex === 'male' ? 50 : 45.5; // Base for 5ft
      const base = sex === 'male' ? 50 : 45.5;
      return base + 0.91 * (h - 152.4);
    } else if (type === 'neonatal' || (type === 'pediatric' && a < 1)) {
      // For infants/neonates, "IBW" is often estimated by age
      // simple formula: (age_in_months * 0.5) + 4
      const months = type === 'neonatal' ? a / 30 : a;
      return (0.5 * months) + 4;
    } else {
      // Pediatric (1-12y)
      if (a >= 1 && a <= 5) return (a * 2) + 8;
      if (a >= 6 && a <= 12) return (a * 3) + 7;
      // Teenagers/Adolescents > 12y usually use adult formula or specific charts, defaulting to adult
      const base = sex === 'male' ? 50 : 45.5;
      return h > 152.4 ? base + 0.91 * (h - 152.4) : base;
    }
  }, [patient.type, patient.age, patient.heightCm, patient.sex]);

  // 2. BMI
  const bmi = useMemo(() => {
    const h = Number(patient.heightCm) / 100;
    const w = Number(patient.weightKg);
    if (!h || !w) return 0;
    return w / (h * h);
  }, [patient.heightCm, patient.weightKg]);

  // 3. Body Surface Area (BSA) - Mosteller
  const bsa = useMemo(() => {
    const h = Number(patient.heightCm);
    const w = Number(patient.weightKg);
    if (!h || !w) return 0;
    return Math.sqrt((h * w) / 3600);
  }, [patient.heightCm, patient.weightKg]);

  // 4. Lean Body Mass (LBM) - Boer
  const lbm = useMemo(() => {
    const h = Number(patient.heightCm);
    const w = Number(patient.weightKg);
    if (!h || !w) return 0;
    if (patient.sex === 'male') {
      return 0.407 * w + 0.267 * h - 19.2;
    } else {
      return 0.252 * w + 0.473 * h - 48.3;
    }
  }, [patient.heightCm, patient.weightKg, patient.sex]);

  // 5. Estimated Creatinine Clearance (CrCl) - Cockcroft-Gault / Schwartz
  const crcl = useMemo(() => {
    const { type, age, heightCm, weightKg, sex } = patient;
    const a = Number(age);
    const h = Number(heightCm);
    const w = Number(weightKg);

    if (type === 'adult') {
      const assumedScr = 0.9;
      let cg = ((140 - a) * w) / (72 * assumedScr);
      if (sex === 'female') cg *= 0.85;
      return Math.max(10, Math.min(200, cg));
    } else {
      // Schwartz formula for peds
      const assumedScr = 0.45;
      const k = 0.413; 
      let res = (k * h) / assumedScr;
      return Math.max(10, Math.min(200, res));
    }
  }, [patient.type, patient.age, patient.heightCm, patient.weightKg, patient.sex]);

  const value = {
    patient,
    setPatient,
    ibw: Math.max(0, ibw),
    bmi: Math.max(0, bmi),
    bsa: Math.max(0, bsa),
    lbm: Math.max(0, lbm),
    crcl: Math.max(0, crcl)
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};
