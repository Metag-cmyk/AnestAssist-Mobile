import {
  BookOpen,
  Stethoscope,
  Calculator,
  UserCircle,
  ClipboardList,
  Scissors,
  Activity,
  Wind,
  Syringe,
  Droplets
} from 'lucide-react';
import { TabType } from '../types';
import { ElementType } from 'react';

export interface NavigationItem {
  id: TabType;
  path: string;
  labelKey: string; // Translation key or raw string if translation isn't available
  icon: ElementType;
  descKey: string; // Description translation key or raw string
}

export const navigationItems: NavigationItem[] = [
  { id: 'guidelines', path: '/guidelines', labelKey: 'nav.guidelines', icon: BookOpen, descKey: 'guidelines.desc' },
  { id: 'patient', path: '/patient', labelKey: 'nav.patient', icon: UserCircle, descKey: 'patient.desc' },
  { id: 'scores', path: '/scores', labelKey: 'nav.scores', icon: ClipboardList, descKey: 'common.selectScoreDesc' },
  { id: 'surgery', path: '/surgery', labelKey: 'nav.surgery', icon: Scissors, descKey: 'surgery.desc' },
  { id: 'conditions', path: '/conditions', labelKey: 'nav.conditions', icon: Stethoscope, descKey: 'conditions.desc' },
  { id: 'ventilator', path: '/ventilator', labelKey: 'Ventilator', icon: Wind, descKey: 'Condition-based mechanical ventilation strategies & targets.' },
  { id: 'renal', path: '/renal', labelKey: 'Renal Replace', icon: Activity, descKey: 'CRRT, IHD targets, and Plasma Exchange calculators.' },
  { id: 'regional', path: '/regional', labelKey: 'Regional', icon: Syringe, descKey: 'Ultrasound-guided regional anesthesia library & safety calculator.' },
  { id: 'airway', path: '/airway', labelKey: 'Airway', icon: Stethoscope, descKey: 'Difficult airway algorithms & equipment sizing.' },
  { id: 'fluids', path: '/fluids', labelKey: 'Fluids & Blood', icon: Droplets, descKey: 'MABL, fluid deficits, and transfusion protocols.' },
  { id: 'converter', path: '/converter', labelKey: 'nav.converter', icon: Calculator, descKey: 'converter.desc' },
];

// Helper to determine if a string is a translation key or raw text.
// If it starts with a lowercase letter and contains a dot or is a single word, it's likely a key.
export const isTranslationKey = (str: string) => {
    return /^[a-z]+(\.[a-zA-Z]+)?$/.test(str) || ['nav.guidelines', 'nav.patient', 'nav.scores', 'nav.surgery', 'nav.conditions', 'nav.converter', 'guidelines.desc', 'patient.desc', 'conditions.desc', 'surgery.desc', 'common.selectScoreDesc', 'converter.desc'].includes(str);
};
