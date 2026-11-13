import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('janseva_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('janseva_lang', lang);
      document.documentElement.lang = lang;
      if (lang === 'kn') {
        document.body.classList.add('font-kannada');
      } else {
        document.body.classList.remove('font-kannada');
      }
    } catch (e) {
      console.error('Could not persist language choice:', e);
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'kn' : 'en'));
  };

  /**
   * Translate a UI text key
   */
  const t = (key) => {
    const dict = translations[lang] || translations.en;
    if (dict[key] !== undefined) {
      return dict[key];
    }
    // Fallback to English
    return translations.en[key] || key;
  };

  /**
   * Helper to retrieve localized field from scheme/category models
   * e.g., getLocalized(scheme, 'scheme_name') -> scheme_name_kn or scheme_name_en
   */
  const getLocalized = (obj, fieldPrefix) => {
    if (!obj) return '';
    const localizedKey = `${fieldPrefix}_${lang}`;
    if (obj[localizedKey]) return obj[localizedKey];
    const fallbackKey = `${fieldPrefix}_en`;
    return obj[fallbackKey] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, getLocalized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
