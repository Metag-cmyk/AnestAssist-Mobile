import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';

// Import the virtual module for PWA
import { registerSW } from 'virtual:pwa-register';

// Register the service worker
const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})

import { PatientProvider } from './contexts/PatientContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <PatientProvider>
        <App />
      </PatientProvider>
    </LanguageProvider>
  </StrictMode>,
);
