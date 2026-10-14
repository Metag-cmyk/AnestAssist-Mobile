import {
  BookOpen,
  Stethoscope,
  Calculator,
  UserCircle,
  ClipboardList,
  ClipboardCheck,
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
  { id: 'preop', path: '/preop', labelKey: 'nav.preop', icon: ClipboardCheck, descKey: 'preop.desc' },
  { id: 'scores', path: '/scores', labelKey: 'nav.scores', icon: ClipboardList, descKey: 'common.selectScoreDesc' },
  { id: 'surgery', path: '/surgery', labelKey: 'nav.surgery', icon: Scissors, descKey: 'surgery.desc' },
  { id: 'conditions', path: '/conditions', labelKey: 'nav.conditions', icon: Stethoscope, descKey: 'conditions.desc' },
  { id: 'therapies', path: '/therapies', labelKey: 'nav.therapies', icon: Syringe, descKey: 'therapies.desc' },
  { id: 'ventilator', path: '/ventilator', labelKey: 'nav.ventilator', icon: Wind, descKey: 'ventilator.desc' },
  { id: 'regional', path: '/regional', labelKey: 'nav.regional', icon: Syringe, descKey: 'regional.desc' },
  { id: 'airway', path: '/airway', labelKey: 'nav.airway', icon: Activity, descKey: 'airway.desc' },
  { id: 'fluids', path: '/fluids', labelKey: 'nav.fluids', icon: Droplets, descKey: 'fluids.desc' },
];
