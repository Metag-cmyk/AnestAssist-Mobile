import React, { Suspense } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigation } from '../../contexts/NavigationContext';

const GuidelinesDiagrams = React.lazy(() => import('../../features/guidelines/GuidelinesDiagrams'));
const Conditions = React.lazy(() => import('../../features/conditions/Conditions'));
const Converter = React.lazy(() => import('../../features/converter/Converter'));
const PatientCalculator = React.lazy(() => import('../../features/patient/PatientCalculator'));
const ClinicalScores = React.lazy(() => import('../../features/scores/ClinicalScores'));
const Surgery = React.lazy(() => import('../../features/surgery/Surgery'));
const VentilatorModule = React.lazy(() => import('../../features/ventilator/VentilatorModule'));
const RenalModule = React.lazy(() => import('../../features/renal/RenalModule'));
const RegionalLibrary = React.lazy(() => import('../../features/regional/RegionalLibrary'));

export default function MainContent() {
  const { t } = useLanguage();
  const { activeTab } = useNavigation();

  // Define tab labels here again for the title since we moved the array to Header
  const getTabLabel = (id: string) => {
      switch(id) {
          case 'guidelines': return t('nav.guidelines');
          case 'patient': return t('nav.patient');
          case 'scores': return t('nav.scores');
          case 'surgery': return t('nav.surgery');
          case 'conditions': return t('nav.conditions');
          case 'ventilator': return 'Ventilator';
          case 'renal': return 'Renal Replace';
          case 'regional': return 'Regional';
          case 'converter': return t('nav.converter');
          default: return '';
      }
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-medical-accent uppercase tracking-widest mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t('header.evidence')}
        </div>
        <h2 className="text-3xl font-bold text-medical-primary">
          {getTabLabel(activeTab)}
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
          {activeTab === 'converter' && t('converter.desc')}
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
          <Suspense fallback={<div className="flex justify-center items-center h-64 text-slate-400">Loading...</div>}>
            {activeTab === 'guidelines' && <GuidelinesDiagrams />}
            {activeTab === 'patient' && <PatientCalculator />}
            {activeTab === 'scores' && <ClinicalScores />}
            {activeTab === 'conditions' && <Conditions />}
            {activeTab === 'surgery' && <Surgery />}
            {activeTab === 'ventilator' && <VentilatorModule />}
            {activeTab === 'renal' && <RenalModule />}
            {activeTab === 'regional' && <RegionalLibrary />}
            {activeTab === 'converter' && <Converter />}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
