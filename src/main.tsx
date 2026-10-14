import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Self-hosted fonts (bundled by Vite) so the PWA works offline.
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';

// Import the virtual module for PWA
import { registerSW } from 'virtual:pwa-register';

// Register the service worker
const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
