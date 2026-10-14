import { useState, useEffect, Suspense, lazy } from 'react';
import {
  Menu,
  X,
  Activity,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../config/navigation';

// Lazily loaded: its search index imports every dataset, so it must stay out of
// the initial bundle until the user actually opens the palette.
const GlobalSearch = lazy(() => import('../../features/search/GlobalSearch'));

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(open => !open);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="bg-medical-primary text-white sticky top-0 z-50 shadow-lg print:hidden">
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
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-end ml-6 overflow-x-auto scrollbar-hide py-1">
            <nav className="flex space-x-1 whitespace-nowrap">
              {navigationItems.map((tab) => (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  className={({ isActive }) => `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {t(tab.labelKey)}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Search (all sizes) + Mobile Menu Toggle */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Search everything (Ctrl+K)"
              title="Search everything (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5"
              aria-label="Toggle navigation"
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
            className="lg:hidden bg-medical-primary border-t border-white/10 overflow-hidden"
          >

            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((tab) => (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 w-full px-4 py-3 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-medical-accent text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {t(tab.labelKey)}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isSearchOpen && (
        <Suspense fallback={null}>
          <GlobalSearch open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </Suspense>
      )}
    </header>
  );
}
