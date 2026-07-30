import React, { Suspense } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { navigationItems, isTranslationKey } from '../../config/navigation';

const GuidelinesDiagrams = React.lazy(() => import('../../features/guidelines/GuidelinesDiagrams'));
const Conditions = React.lazy(() => import('../../features/conditions/Conditions'));
const Converter = React.lazy(() => import('../../features/converter/Converter'));
const PatientCalculator = React.lazy(() => import('../../features/patient/PatientCalculator'));
const ClinicalScores = React.lazy(() => import('../../features/scores/ClinicalScores'));
const Surgery = React.lazy(() => import('../../features/surgery/Surgery'));
const VentilatorModule = React.lazy(() => import('../../features/ventilator/VentilatorModule'));
const RegionalLibrary = React.lazy(() => import('../../features/regional/RegionalLibrary'));

const TherapiesModule = React.lazy(() => import('../../features/therapies/TherapiesModule'));



function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="text-red-500 mb-4">
        <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-800">Something went wrong loading this module</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-md">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-medical-accent text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

export default function MainContent() {
  const { t } = useLanguage();
  const location = useLocation();

  const currentTab = navigationItems.find(item => item.path === location.pathname) || navigationItems[0];
  const getLabel = (labelKey: string) => isTranslationKey(labelKey) ? t(labelKey) : labelKey;

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-medical-accent uppercase tracking-widest mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t('header.evidence')}
        </div>
        <h2 className="text-3xl font-bold text-medical-primary">
          {getLabel(currentTab.labelKey)}
        </h2>
        <p className="text-slate-500 mt-1">
          {getLabel(currentTab.descKey)}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div className="flex justify-center items-center h-64 text-slate-400">Loading...</div>}>
              <Routes location={location}>
                <Route path="/guidelines" element={<GuidelinesDiagrams />} />
                <Route path="/patient" element={<PatientCalculator />} />
                <Route path="/scores" element={<ClinicalScores />} />
                <Route path="/conditions" element={<Conditions />} />
                <Route path="/surgery" element={<Surgery />} />
                <Route path="/ventilator" element={<VentilatorModule />} />
                <Route path="/regional" element={<RegionalLibrary />} />
                <Route path="/therapies" element={<TherapiesModule />} />
                <Route path="*" element={<Navigate to="/guidelines" replace />} />

              </Routes>
            </Suspense>
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
