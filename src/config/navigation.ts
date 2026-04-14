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
  Droplets,
  Beaker,
  Baby,
  Utensils
} from 'lucide-react';
import { TabType } from '../types';
import { ElementType } from 'react';

export interface NavigationItem {
  id: TabType;
  path: string;
  labelKey: string;
  icon: ElementType;
  descKey: string;
}

export const navigationItems: NavigationItem[] = [
  { id: 'assessment', path: '/assessment', labelKey: 'Assessment', icon: Activity, descKey: 'Review patient profile, calculate clinical scores, and access ESAIC/ASA guidelines.' },
  { id: 'clinic', path: '/clinic', labelKey: 'Clinic', icon: Stethoscope, descKey: 'Access emergency protocols, surgical guides, and regional anesthesia modules.' },
  { id: 'pharmacology', path: '/pharmacology', labelKey: 'Pharmacology', icon: Beaker, descKey: 'TIVA dosing, pressors, and local anesthetic toxicity (LAST).' },
  { id: 'ventilator', path: '/ventilator', labelKey: 'Ventilator', icon: Wind, descKey: 'Condition-based mechanical ventilation strategies & targets.' },
  { id: 'renal', path: '/renal', labelKey: 'Renal', icon: Calculator, descKey: 'CRRT, IHD targets, and Plasma Exchange calculators.' },
  { id: 'specialties', path: '/specialties', labelKey: 'Pre-Op & Special', icon: Baby, descKey: 'Preoperative optimization and specialized modules for Obstetrics and Pediatrics.' },
  { id: 'nutrition', path: '/nutrition', labelKey: 'Nutrition', icon: Utensils, descKey: 'Caloric targets, protein delivery, and gastric residual management.' },
  // PR additions mapped to routes (even if sub-routes of assessment/clinic)
  { id: 'airway', path: '/airway', labelKey: 'Airway', icon: Stethoscope, descKey: 'Difficult airway algorithms & equipment sizing.' },
  { id: 'fluids', path: '/fluids', labelKey: 'Fluids & Blood', icon: Droplets, descKey: 'MABL, fluid deficits, and sodium correction calculators.' },
];

export const isTranslationKey = (str: string) => {
    return /^[a-z]+(\.[a-zA-Z]+)?$/.test(str);
};
