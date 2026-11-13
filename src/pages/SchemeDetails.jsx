import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { schemeService } from '../services/schemeService';
import { authService } from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  Building, 
  ExternalLink, 
  CheckCircle, 
  Calendar, 
  FileText, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Clock, 
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Users
} from 'lucide-react';

export default function SchemeDetails() {
  const { id } = useParams();
  const { t, getLocalized, lang } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadScheme() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await schemeService.getSchemeById(id);
        setScheme(data);

        // Check if user has saved this scheme
        if (user) {
          const savedList = await authService.getSavedSchemes(user.id);
          const hasSaved = savedList.some(s => s.id === data.id);
          setIsSaved(hasSaved);
        }
      } catch (err) {
        console.error('Error loading scheme details:', err);
        setError(err.message || 'Scheme not found');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadScheme();
    }
  }, [id, user]);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      alert(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಆಗಿ.' : 'Please sign in to save schemes.');
      return;
    }

    try {
      setSaving(true);
      const res = await authService.toggleSaveScheme(user.id, scheme.id);
      setIsSaved(res.saved);
    } catch (err) {
      console.error('Error toggling save:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: scheme?.scheme_name_en,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <LoadingSpinner fullPage={true} />;

  if (error || !scheme) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900">Scheme Not Found</h2>
        <p className="text-xs text-slate-500">{error || 'The requested scheme could not be retrieved from the database.'}</p>
        <Link to="/explore" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Benefits</span>
        </Link>
      </div>
    );
  }

  const schemeName = getLocalized(scheme, 'scheme_name');
  const dept = getLocalized(scheme, 'department');
  const fullDesc = getLocalized(scheme, 'description');
  const benefits = getLocalized(scheme, 'benefits');
  const eligibilitySummary = getLocalized(scheme, 'eligibility_summary');
  const procedure = getLocalized(scheme, 'application_procedure');
  const categoryName = scheme.categories ? getLocalized(scheme.categories, 'name') : '';
  const isKarnataka = scheme.government_level === 'Karnataka';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'kn' ? 'ಎಲ್ಲಾ ಯೋಜನೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ' : 'Back to All Schemes'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
          </button>

          {/* Bookmark */}
          <button
            type="button"
            onClick={handleToggleSave}
            disabled={saving}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 shadow-xs transition ${
              isSaved
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-red-600' : ''}`} />
            <span>{isSaved ? t('btnSaved') : t('btnSave')}</span>
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            isKarnataka 
              ? 'bg-amber-50 text-amber-900 border border-amber-200' 
              : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}>
            <Building className="w-3.5 h-3.5" />
            {isKarnataka ? (lang === 'kn' ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ' : 'Karnataka State Government') : (lang === 'kn' ? 'ಕೇಂದ್ರ ಸರ್ಕಾರ' : 'Government of India (Central)')}
          </span>

          {categoryName && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
              {categoryName}
            </span>
          )}

          {scheme.verification_status === 'verified' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t('statusVerified')}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {schemeName}
          </h1>
          <p className="text-sm font-semibold text-slate-500">
            {dept}
          </p>
        </div>

        {/* Action Button & Dates Strip */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            {scheme.application_end_date ? (
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{t('detailsEndDate')}: <strong>{new Date(scheme.application_end_date).toLocaleDateString()}</strong></span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <Clock className="w-4 h-4" />
                {t('statusActive')}
              </span>
            )}

            <span className="text-slate-400">|</span>

            <span>
              {t('detailsLastVerified')}: <strong>{new Date(scheme.last_verified_at || Date.now()).toLocaleDateString()}</strong>
            </span>
          </div>

          <a
            href={scheme.application_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-janseva-saffron hover:bg-janseva-saffron-dark text-white text-sm font-bold shadow-lg hover:shadow-janseva-saffron/20 transition-all shrink-0"
          >
            <span>{t('detailsApplyBtn')}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Grid of Scheme Content Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description, Benefits & Procedure (2 spans) */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-janseva-navy-800" />
              {t('detailsAbout')}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {fullDesc}
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              {t('detailsBenefits')}
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl whitespace-pre-line">
              {benefits}
            </div>
          </div>

          {/* Application Procedure */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              {t('detailsProcedure')}
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/80 p-5 rounded-xl whitespace-pre-line font-medium">
              {procedure}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Eligibility, Required Documents & Official Verification (1 span) */}
        <div className="space-y-6">
          {/* Eligibility Rules */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-janseva-navy-800" />
              {t('detailsEligibility')}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {eligibilitySummary}
            </p>

            {scheme.eligibility_rules && scheme.eligibility_rules.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Configured Database Rules:
                </span>
                <ul className="space-y-2 text-xs">
                  {scheme.eligibility_rules.map((rule) => (
                    <li key={rule.id} className="flex items-start gap-2 text-slate-700">
                      <span className="text-janseva-saffron font-bold">•</span>
                      <span>{getLocalized(rule, 'rule_description')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2">
              <Link
                to="/eligibility"
                className="w-full text-center block px-4 py-2.5 rounded-xl bg-janseva-navy-900 text-white font-bold text-xs hover:bg-janseva-navy-800 transition"
              >
                {t('btnCheckEligibility')} →
              </Link>
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-janseva-navy-800" />
              {t('detailsDocs')}
            </h3>

            {scheme.required_documents && scheme.required_documents.length > 0 ? (
              <ul className="space-y-2.5 text-xs">
                {scheme.required_documents.map((doc) => (
                  <li key={doc.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">{getLocalized(doc, 'document_name')}</p>
                      {doc.description_en && (
                        <p className="text-[11px] text-slate-500 mt-0.5">{getLocalized(doc, 'description')}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">Standard KYC documents (Aadhaar, Bank Passbook, Address Proof).</p>
            )}
          </div>

          {/* Official Source & Verification Portal */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">
              {t('detailsOfficialSource')}
            </h4>
            <a
              href={scheme.official_source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1.5 break-all font-medium"
            >
              <span>{scheme.official_source_url}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p>• Department: {dept}</p>
              <p>• Data Verified On: {new Date(scheme.last_verified_at || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Official Disclaimer */}
      <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>{t('detailsDisclaimerTitle')}</span>
        </div>
        <p className="leading-relaxed">
          {t('detailsDisclaimerText')}
        </p>
      </div>
    </div>
  );
}
