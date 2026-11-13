import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, X, Sparkles } from 'lucide-react';

export default function SearchBar({ value, onChange, onSearch, placeholder, showTags = true, className = '' }) {
  const { t, lang } = useLanguage();
  const [internalValue, setInternalValue] = useState(value || '');

  const quickTags = [
    { label: 'SSP Scholarship', query: 'SSP' },
    { label: 'Yuva Nidhi', query: 'Yuva Nidhi' },
    { label: 'PM-KISAN', query: 'PM-KISAN' },
    { label: 'Gruha Lakshmi', query: 'Gruha Lakshmi' },
    { label: lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'Scholarship', query: 'Scholarship' },
    { label: lang === 'kn' ? 'ರೈತ' : 'Farmer', query: 'Farmer' }
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (onSearch) onSearch(internalValue);
    }
  };

  const handleTagClick = (tagQuery) => {
    setInternalValue(tagQuery);
    if (onChange) onChange(tagQuery);
    if (onSearch) onSearch(tagQuery);
  };

  const handleClear = () => {
    setInternalValue('');
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  };

  return (
    <div className={`w-full space-y-2.5 ${className}`}>
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t('searchPlaceholder')}
          className="w-full pl-12 pr-28 py-3.5 bg-white text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-300 focus:border-janseva-navy-800 focus:ring-2 focus:ring-janseva-navy-800/10 shadow-sm text-sm transition outline-hidden"
        />

        <div className="absolute right-2 flex items-center gap-1.5">
          {internalValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onSearch && onSearch(internalValue)}
            className="px-3.5 py-1.5 bg-janseva-navy-900 hover:bg-janseva-navy-800 text-white text-xs font-semibold rounded-lg shadow-xs transition"
          >
            {t('btnSearch')}
          </button>
        </div>
      </div>

      {showTags && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-janseva-saffron-500" />
            {lang === 'kn' ? 'ಜನಪ್ರಿಯ ಹುಡುಕಾಟಗಳು:' : 'Popular:'}
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag.query}
              type="button"
              onClick={() => handleTagClick(tag.query)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
            >
              {tag.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
