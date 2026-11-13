import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200 ${className}`}>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          lang === 'en'
            ? 'bg-janseva-navy-900 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>English</span>
      </button>
      <button
        type="button"
        onClick={() => setLang('kn')}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all font-kannada ${
          lang === 'kn'
            ? 'bg-janseva-saffron-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>ಕನ್ನಡ</span>
      </button>
    </div>
  );
}
