import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { 
  Building, 
  Calendar, 
  CheckCircle, 
  Heart, 
  ArrowRight, 
  Users, 
  Award, 
  Sparkles,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function BenefitCard({ scheme, isSavedInitially = false, onToggleSave }) {
  const { t, getLocalized, lang } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(isSavedInitially);
  const [saving, setSaving] = useState(false);

  const schemeName = getLocalized(scheme, 'scheme_name');
  const shortDesc = getLocalized(scheme, 'short_description');
  const dept = getLocalized(scheme, 'department');
  const beneficiaries = getLocalized(scheme, 'target_beneficiaries');
  const eligibility = getLocalized(scheme, 'eligibility_summary');
  const categoryName = scheme.categories ? getLocalized(scheme.categories, 'name') : '';

  const isKarnataka = scheme.government_level === 'Karnataka';

  const handleSaveClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert(lang === 'kn' ? 'ಯೋಜನೆಗಳನ್ನು ಉಳಿಸಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಆಗಿ.' : 'Please sign in to save schemes to your dashboard.');
      return;
    }

    try {
      setSaving(true);
      const res = await authService.toggleSaveScheme(user.id, scheme.id);
      setIsSaved(res.saved);
      if (onToggleSave) onToggleSave(scheme.id, res.saved);
    } catch (err) {
      console.error('Error toggling scheme save:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Top Accent Strip based on Government Level */}
      <div className={`h-1.5 w-full ${
        isKarnataka ? 'bg-gradient-to-r from-amber-500 via-red-500 to-amber-600' : 'bg-gradient-to-r from-blue-700 via-slate-400 to-emerald-600'
      }`} />

      <div className="p-6 flex-1 flex flex-col">
        {/* Top Badges and Bookmark Button */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Gov Level Badge */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isKarnataka 
                ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              <Building className="w-3 h-3" />
              {isKarnataka ? (lang === 'kn' ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ' : 'Karnataka Govt') : (lang === 'kn' ? 'ಕೇಂದ್ರ ಸರ್ಕಾರ' : 'Central Govt')}
            </span>

            {/* Category Badge */}
            {categoryName && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                {categoryName}
              </span>
            )}

            {/* Verification Badge */}
            {scheme.verification_status === 'verified' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200" title="Verified against official gazette or portal">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {lang === 'kn' ? 'ದೃಢೀಕೃತ' : 'Verified'}
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={saving}
            className={`p-2 rounded-xl transition-colors shrink-0 ${
              isSaved 
                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                : 'bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-slate-100'
            }`}
            title={isSaved ? t('btnSaved') : t('btnSave')}
            aria-label="Bookmark scheme"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-red-600' : ''}`} />
          </button>
        </div>

        {/* Scheme Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-janseva-navy-800 transition-colors line-clamp-2 leading-snug">
          <Link to={`/schemes/${scheme.slug || scheme.id}`}>
            {schemeName}
          </Link>
        </h3>

        {/* Department */}
        <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
          {dept}
        </p>

        {/* Short Description */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {shortDesc}
        </p>

        {/* Key Attributes Grid */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
          {beneficiaries && (
            <div className="flex items-start gap-2 text-slate-700">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div className="line-clamp-1">
                <span className="font-semibold text-slate-900">{t('cardBeneficiariesLabel')}: </span>
                <span>{beneficiaries}</span>
              </div>
            </div>
          )}

          {eligibility && (
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="line-clamp-2">
                <span className="font-semibold text-slate-900">{t('cardEligibilityLabel')}: </span>
                <span>{eligibility}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Deadline and View Details Action */}
      <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {scheme.application_end_date ? (
              <>
                <span className="text-slate-400">{t('cardDeadlineLabel')}: </span>
                <strong className="text-slate-700">{new Date(scheme.application_end_date).toLocaleDateString()}</strong>
              </>
            ) : (
              <span className="text-emerald-700 font-medium">{t('statusActive')}</span>
            )}
          </span>
        </div>

        <Link
          to={`/schemes/${scheme.slug || scheme.id}`}
          className="inline-flex items-center gap-1 font-bold text-janseva-navy-900 hover:text-janseva-saffron-600 transition group/link shrink-0"
        >
          <span>{t('btnViewDetails')}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
