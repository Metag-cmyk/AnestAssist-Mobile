import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../config/storageKeys';

export type Gender = 'male' | 'female';

interface PatientContextType {
  weight: string;
  height: string;
  age: string;
  gender: Gender;
  setWeight: (v: string) => void;
  setHeight: (v: string) => void;
  setAge: (v: string) => void;
  setGender: (v: Gender) => void;
  weightNum: number;
  heightNum: number;
  ageNum: number;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weight, setWeight] = useState(() => localStorage.getItem(STORAGE_KEYS.PATIENT_WEIGHT) || '70');
  const [height, setHeight] = useState(() => localStorage.getItem(STORAGE_KEYS.PATIENT_HEIGHT) || '175');
  const [age, setAge] = useState(() => localStorage.getItem(STORAGE_KEYS.PATIENT_AGE) || '30');
  const [gender, setGender] = useState<Gender>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.PATIENT_GENDER);
    return (stored as Gender) || 'male';
  });

  useEffect(() => localStorage.setItem(STORAGE_KEYS.PATIENT_WEIGHT, weight), [weight]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.PATIENT_HEIGHT, height), [height]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.PATIENT_AGE, age), [age]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.PATIENT_GENDER, gender), [gender]);

  const value: PatientContextType = {
    weight,
    height,
    age,
    gender,
    setWeight,
    setHeight,
    setAge,
    setGender,
    weightNum: parseFloat(weight) || 0,
    heightNum: parseFloat(height) || 0,
    ageNum: parseFloat(age) || 0,
  };

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};
