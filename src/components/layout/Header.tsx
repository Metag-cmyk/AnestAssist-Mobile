import { useState } from 'react';
import {
  BookOpen,
  Stethoscope,
  Calculator,
  Menu,
  X,
  UserCircle,
  ClipboardList,
  Scissors,
  Activity,
  Wind,
  Syringe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { TabType } from '../../types';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { activeTab, setActiveTab } = useNavigation();

  const tabs = [
    { id: 'guidelines', label: t('nav.guidelines'), icon: BookOpen },
    { id: 'patient', label: t('nav.patient'), icon: UserCircle },
    { id: 'scores', label: t('nav.scores'), icon: ClipboardList },
    { id: 'surgery', label: t('nav.surgery'), icon: Scissors },
    { id: 'conditions', label: t('nav.conditions'), icon: Stethoscope },
    { id: 'ventilator', label: 'Ventilator', icon: Wind },
    { id: 'renal', label: 'Renal Replace', icon: Activity },
    { id: 'regional', label: 'Regional', icon: Syringe },
    { id: 'converter', label: t('nav.converter'), icon: Calculator },
  ];

  return (
    <header className="bg-medical-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-medical-accent p-1.5 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">{t('app.title')}</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold -mt-1">{t('app.subtitle')}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-medical-primary border-t border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-md text-base font-medium ${
                    activeTab === tab.id
                      ? 'bg-medical-accent text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
