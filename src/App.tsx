import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Stethoscope, 
  Calculator, 
  Menu, 
  X,
  ShieldCheck,
  UserCircle,
  ClipboardList,
  Scissors,
  Activity,
  Wind,
  Syringe,
  ShieldAlert,
  Beaker,
  Baby
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from './types';
import GuidelinesDiagrams from './features/guidelines/GuidelinesDiagrams';
import Conditions from './features/conditions/Conditions';
import Pharmacology from './features/pharma/Pharmacology';
import PatientCalculator from './features/patient/PatientCalculator';
import ClinicalScores from './features/scores/ClinicalScores';
import Surgery from './features/surgery/Surgery';
import VentilatorModule from './features/ventilator/VentilatorModule';
import RenalModule from './features/renal/RenalModule';
import RegionalLibrary from './features/regional/RegionalLibrary';
import SpecialtiesModule from './features/specialties/SpecialtiesModule';
import { useLanguage } from './contexts/LanguageContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const saved = localStorage.getItem('anestassist_active_tab');
    return (saved as TabType) || 'guidelines';
  });

  useEffect(() => {
    localStorage.setItem('anestassist_active_tab', activeTab);
  }, [activeTab]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const handleSettingsClick = () => {
    setActiveTab('patient');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabs = [
    { id: 'guidelines', label: t('nav.guidelines'), icon: BookOpen },
    { id: 'patient', label: t('nav.patient'), icon: UserCircle },
    { id: 'scores', label: t('nav.scores'), icon: ClipboardList },
    { id: 'surgery', label: t('nav.surgery'), icon: Scissors },
    { id: 'conditions', label: t('nav.conditions'), icon: Stethoscope },
    { id: 'ventilator', label: 'Ventilator', icon: Wind },
    { id: 'renal', label: 'Renal Replace', icon: Activity },
    { id: 'regional', label: 'Regional', icon: Syringe },
    { id: 'specialties', label: 'Pre-Op & Special', icon: Baby },
    { id: 'pharmacology', label: 'Pharmacology', icon: Beaker },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-medical-accent uppercase tracking-widest mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t('header.evidence')}
          </div>
          <h2 className="text-3xl font-bold text-medical-primary">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <p className="text-slate-500 mt-1">
            {activeTab === 'guidelines' && t('guidelines.desc')}
            {activeTab === 'patient' && t('patient.desc')}
            {activeTab === 'conditions' && t('conditions.desc')}
            {activeTab === 'surgery' && t('surgery.desc')}
            {activeTab === 'scores' && t('common.selectScoreDesc')}
            {activeTab === 'ventilator' && 'Condition-based mechanical ventilation strategies & targets.'}
            {activeTab === 'renal' && 'CRRT, IHD targets, and Plasma Exchange calculators.'}
            {activeTab === 'regional' && 'Ultrasound-guided regional anesthesia library & safety calculator.'}
            {activeTab === 'specialties' && 'Preoperative optimization and specialized modules for Obstetrics and Pediatrics.'}
            {activeTab === 'pharmacology' && 'TIVA dosing, pressors, and local anesthetic toxicity (LAST).'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'guidelines' && <GuidelinesDiagrams />}
            {activeTab === 'patient' && <PatientCalculator />}
            {activeTab === 'scores' && <ClinicalScores />}
            {activeTab === 'conditions' && <Conditions />}
            {activeTab === 'surgery' && <Surgery />}
            {activeTab === 'ventilator' && <VentilatorModule />}
            {activeTab === 'renal' && <RenalModule />}
            {activeTab === 'regional' && <RegionalLibrary />}
            {activeTab === 'specialties' && <SpecialtiesModule />}
            {activeTab === 'pharmacology' && <Pharmacology />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-medical-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <p className="text-sm text-slate-500">
            {t('footer.copy')}
          </p>
          <p className="text-[10px] text-slate-400 mt-2 max-w-2xl mx-auto leading-relaxed">
            {t('footer.disclaimer')}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 w-full max-w-md">
            <p className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1.5 transition-all">
              Created as a passion project by <span className="font-bold text-medical-primary tracking-wide">Georgi Georgiev</span> 
              <span className="text-[10px]">™</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
