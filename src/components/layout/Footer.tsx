import { useLanguage } from '../../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
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
  );
}
