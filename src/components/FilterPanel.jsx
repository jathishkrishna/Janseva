import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Filter, RotateCcw, Building, Folder, GraduationCap, Coins, Users, Calendar, ArrowUpDown } from 'lucide-react';

export default function FilterPanel({
  filters,
  categories = [],
  onFilterChange,
  onResetFilters,
  totalResults = 0
}) {
  const { t, getLocalized, lang } = useLanguage();

  const handleFieldChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value,
      page: 1 // reset to first page on filter change
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-janseva-navy-800" />
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'kn' ? 'ಫಿಲ್ಟರ್‌ಗಳು' : 'Filters & Refinements'}
          </h3>
        </div>

        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t('clearFilters')}
        </button>
      </div>

      {/* 1. Government Level */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-slate-400" />
          {t('filterGovLevel')}
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {[
            { value: 'all', label: t('filterAllGov') },
            { value: 'Karnataka', label: t('filterKarnataka') },
            { value: 'Central', label: t('filterCentral') }
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleFieldChange('governmentLevel', item.value)}
              className={`flex items-center justify-between px-3.5 py-2 text-xs font-semibold rounded-xl text-left transition ${
                filters.governmentLevel === item.value
                  ? 'bg-janseva-navy-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              {filters.governmentLevel === item.value && (
                <span className="w-1.5 h-1.5 rounded-full bg-janseva-saffron-light" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Category Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Folder className="w-3.5 h-3.5 text-slate-400" />
          {t('filterCategory')}
        </label>
        <select
          value={filters.categoryId || 'all'}
          onChange={(e) => handleFieldChange('categoryId', e.target.value)}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
        >
          <option value="all">{t('filterAllCategories')}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {getLocalized(cat, 'name')}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Education Qualification */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
          {t('filterEducation')}
        </label>
        <select
          value={filters.education || 'all'}
          onChange={(e) => handleFieldChange('education', e.target.value)}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
        >
          <option value="all">{t('filterAllEducation')}</option>
          <option value="Primary School (Class 1-8)">{t('eduPrimary')}</option>
          <option value="Secondary School (Class 9-10)">{t('eduSecondary')}</option>
          <option value="Higher Secondary (11-12/PUC)">{t('eduHigherSecondary')}</option>
          <option value="Diploma">{t('eduDiploma')}</option>
          <option value="Undergraduate Degree">{t('eduUndergrad')}</option>
          <option value="Postgraduate Degree">{t('eduPostgrad')}</option>
          <option value="Doctorate/PhD">{t('eduDoctorate')}</option>
        </select>
      </div>

      {/* 4. Target Gender */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          {t('filterGender')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'all', label: t('filterAllGenders') },
            { value: 'Female', label: t('genderFemale') },
            { value: 'Male', label: t('genderMale') },
            { value: 'Transgender', label: t('genderTransgender') }
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleFieldChange('gender', item.value)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl text-center transition ${
                (filters.gender || 'all') === item.value
                  ? 'bg-janseva-navy-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Sort By */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          {t('sortBy')}
        </label>
        <select
          value={filters.sortBy || 'newest'}
          onChange={(e) => handleFieldChange('sortBy', e.target.value)}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
        >
          <option value="newest">{t('sortNewest')}</option>
          <option value="nameAsc">{t('sortNameAsc')}</option>
          <option value="deadline">{t('sortDeadline')}</option>
        </select>
      </div>
    </div>
  );
}
