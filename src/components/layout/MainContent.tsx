import React, { Suspense } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { navigationItems, isTranslationKey } from '../../config/navigation';

// Lazy load modules for performance
const Pharmacology = React.lazy(() => import('../../features/pharma/Pharmacology'));
const VentilatorModule = React.lazy(() => import('../../features/ventilator/VentilatorModule'));
const RenalModule = React.lazy(() => import('../../features/renal/RenalModule'));
const SpecialtiesModule = React.lazy(() => import('../../features/specialties/SpecialtiesModule'));
const NutritionModule = React.lazy(() => import('../../features/nutrition/NutritionModule'));
const AssessmentModule = React.lazy(() => import('../../features/assessment/AssessmentModule'));
const ClinicModule = React.lazy(() => import('../../features/clinic/ClinicModule'));

// PR Feature additions
const AirwayModule = React.lazy(() => import('../../features/airway/AirwayModule'));
const FluidsModule = React.lazy(() => import('../../features/fluids/FluidsModule'));

function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-red-50 rounded-2xl border border-red-100">
      <div className="text-red-500 mb-4 bg-white p-4 rounded-full shadow-sm">
        <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-slate-800">Module Load Failure</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
        {error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="mt-6 px-6 py-2.5 bg-medical-accent text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-md active:scale-95"
      >
        Retry Module
      </button>
    </div>
  );
}

export default function MainContent() {
  const { t } = useLanguage();
  const location = useLocation();

  const currentTab = navigationItems.find(item => location.pathname.startsWith(item.path)) || navigationItems[0];
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
        <p className="text-slate-500 mt-1 max-w-2xl">
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
            <Suspense fallback={
              <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
                <div className="w-12 h-12 border-4 border-medical-accent border-t-transparent rounded-full animate-spin"></div>
                <div className="text-slate-400 font-medium animate-pulse">Initializing Module...</div>
              </div>
            }>
              <Routes location={location}>
                <Route path="/assessment/*" element={<AssessmentModule />} />
                <Route path="/clinic/*" element={<ClinicModule />} />
                <Route path="/pharmacology" element={<Pharmacology />} />
                <Route path="/ventilator" element={<VentilatorModule />} />
                <Route path="/renal" element={<RenalModule />} />
                <Route path="/specialties" element={<SpecialtiesModule />} />
                <Route path="/nutrition" element={<NutritionModule />} />
                <Route path="/airway" element={<AirwayModule />} />
                <Route path="/fluids" element={<FluidsModule />} />
                <Route path="*" element={<Navigate to="/assessment" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
