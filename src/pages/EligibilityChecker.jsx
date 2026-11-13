import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { eligibilityService } from '../services/eligibilityService';
import { validateAge, validateIncome } from '../utils/validation';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Building, 
  GraduationCap, 
  Coins, 
  FileText, 
  ExternalLink,
  ShieldAlert,
  Info,
  Heart,
  BookmarkCheck
} from 'lucide-react';

export default function EligibilityChecker() {
  const { t, getLocalized, lang } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Form profile values
  const [profile, setProfile] = useState({
    state: user?.state || 'Karnataka',
    district: user?.district || '',
    age: user?.age ? String(user.age) : '21',
    gender: user?.gender || '',
    education: user?.education || 'Undergraduate Degree',
    occupation: user?.occupation || 'Student',
    annual_income: user?.annual_income ? String(user.annual_income) : '150000',
    social_category: user?.social_category || 'categoryGeneral',
    is_differently_abled: user?.is_differently_abled || false
  });

  const [errors, setErrors] = useState({});
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [activeTab, setActiveTab] = useState('eligible'); // 'eligible' | 'possibly_eligible' | 'not_eligible'
  const [savedCheckId, setSavedCheckId] = useState(null);

  // Field change handler
  const handleField = (field, val) => {
    setProfile(prev => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Step validation
  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!profile.state) errs.state = 'Please select a state of residence.';
      const ageErr = validateAge(profile.age);
      if (ageErr) errs.age = ageErr;
    } else if (step === 3) {
      const incErr = validateIncome(profile.annual_income);
      if (incErr) errs.annual_income = incErr;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Run the eligibility engine
  const handleFindBenefits = async () => {
    if (!validateStep(3)) return;

    try {
      setEvaluating(true);
      const res = await eligibilityService.checkEligibility(profile, user?.id || null);
      setEvaluationResult(res.evaluation);
      setSavedCheckId(res.checkRecord?.id);

      // Trigger celebration confetti if eligible schemes found!
      if (res.evaluation.eligible.length > 0) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore if canvas not supported
        }
      }

      // Default active tab based on results
      if (res.evaluation.eligible.length > 0) {
        setActiveTab('eligible');
      } else if (res.evaluation.possibly_eligible.length > 0) {
        setActiveTab('possibly_eligible');
      } else {
        setActiveTab('not_eligible');
      }

      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err) {
      console.error('Eligibility evaluation error:', err);
      alert('Error running eligibility matching: ' + (err.message || 'Please try again.'));
    } finally {
      setEvaluating(false);
    }
  };

  const handleResetCheck = () => {
    setEvaluationResult(null);
    setCurrentStep(1);
    setSavedCheckId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-janseva-saffron-50 text-janseva-saffron-600 border border-janseva-saffron-200 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-janseva-saffron animate-pulse" />
          <span>{lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ನಿಯಮ-ಆಧಾರಿತ ಮ್ಯಾಚಿಂಗ್' : 'Smart Rule-Based Eligibility Engine'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('checkerTitle')}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          {t('checkerSubtitle')}
        </p>
      </div>

      {!evaluationResult ? (
        /* ================= MULTI-STEP FORM ================= */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-slate-50 px-6 sm:px-10 py-5 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-3">
              <span className={currentStep >= 1 ? 'text-janseva-navy-900' : 'text-slate-400'}>
                {t('stepBasic')}
              </span>
              <span className={currentStep >= 2 ? 'text-janseva-navy-900' : 'text-slate-400'}>
                {t('stepEducation')}
              </span>
              <span className={currentStep >= 3 ? 'text-janseva-navy-900' : 'text-slate-400'}>
                {t('stepEconomic')}
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-janseva-navy-900 to-janseva-saffron transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* STEP 1: Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-lg">
                    {t('stepBasic')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'kn' ? 'ನಿಮ್ಮ ವಾಸಸ್ಥಳ ಮತ್ತು ಮೂಲ ವಿವರಗಳನ್ನು ತಿಳಿಸಿ' : 'Your residence and demographic profile'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* State */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t('fieldState')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={profile.state}
                      onChange={(e) => handleField('state', e.target.value)}
                      className="w-full text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
                    >
                      <option value="Karnataka">Karnataka (ಕರ್ನಾಟಕ)</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Other State">Other State</option>
                    </select>
                    <p className="text-[11px] text-slate-400">{t('fieldStateHint')}</p>
                    {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
                  </div>

                  {/* District */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t('fieldDistrict')}
                    </label>
                    <input
                      type="text"
                      value={profile.district}
                      onChange={(e) => handleField('district', e.target.value)}
                      placeholder={t('fieldDistrictPlaceholder') + " (e.g. Bengaluru, Mysuru, Hubballi)"}
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t('fieldAge')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="125"
                      value={profile.age}
                      onChange={(e) => handleField('age', e.target.value)}
                      placeholder={t('fieldAgePlaceholder')}
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
                    />
                    {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t('fieldGender')}
                    </label>
                    <select
                      value={profile.gender}
                      onChange={(e) => handleField('gender', e.target.value)}
                      className="w-full text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
                    >
                      <option value="">{t('fieldGenderAny')}</option>
                      <option value="Male">{t('genderMale')}</option>
                      <option value="Female">{t('genderFemale')} (e.g. Gruha Lakshmi)</option>
                      <option value="Transgender">{t('genderTransgender')}</option>
                      <option value="Other">{t('genderOther')}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Education & Occupation */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-lg">
                    {t('stepEducation')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'kn' ? 'ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆ ಮತ್ತು ಪ್ರಸ್ತುತ ಉದ್ಯೋಗ ವಿವರಗಳು' : 'Educational qualification and current occupation'}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Education */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t('fieldEducation')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={profile.education}
                      onChange={(e) => handleField('education', e.target.value)}
                      className="w-full text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
                    >
                      <option value="Primary School (Class 1-8)">{t('eduPrimary')}</option>
                      <option value="Secondary School (Class 9-10)">{t('eduSecondary')}</option>
                      <option value="Higher Secondary (11-12/PUC)">{t('eduHigherSecondary')}</option>
                      <option value="Diploma">{t('eduDiploma')}</option>
                      <option value="Undergraduate Degree">{t('eduUndergrad')}</option>
                      <option value="Postgraduate Degree">{t('eduPostgrad')}</option>
                      <option value="Doctorate/PhD">{t('eduDoctorate')}</option>
                      <option value="No Formal Education">{t('eduNone')}</option>
                    </select>
                  </div>

                  {/* Occupation */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t('fieldOccupation')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={profile.occupation}
                      onChange={(e) => handleField('occupation', e.target.value)}
                      className="w-full text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
                    >
                      <option value="Student">{t('occStudent')}</option>
                      <option value="Unemployed">{t('occUnemployed')} (e.g. Yuva Nidhi eligibility)</option>
                      <option value="Farmer / Cultivator">{t('occFarmer')} (e.g. PM-KISAN, Raitha Siri)</option>
                      <option value="Self-Employed / Business">{t('occSelfEmployed')} (e.g. Mudra loans)</option>
                      <option value="Salaried (Private Sector)">{t('occSalariedPrivate')}</option>
                      <option value="Salaried (Government)">{t('occSalariedGov')}</option>
                      <option value="Daily Wage / Informal Worker">{t('occDailyWage')} (e.g. Atal Pension Yojana)</option>
                      <option value="Homemaker">{t('occHomemaker')}</option>
                      <option value="Retired / Senior Citizen">{t('occRetired')}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Income & Social Category */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-lg">
                    {t('stepEconomic')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'kn' ? 'ಆದಾಯ ಮಿತಿ ಮತ್ತು ಸಾಮಾಜಿಕ ವರ್ಗಾವಣೆ ಮಾನದಂಡಗಳು' : 'Income limits and voluntary reservation category'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Annual Family Income */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">
                      {t('fieldAnnualIncome')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-sm font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        value={profile.annual_income}
                        onChange={(e) => handleField('annual_income', e.target.value)}
                        placeholder={t('fieldAnnualIncomePlaceholder')}
                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">{t('fieldAnnualIncomeHint')}</p>
                    {errors.annual_income && <p className="text-xs text-red-500">{errors.annual_income}</p>}
                  </div>

                  {/* Social Category (Voluntary) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t('fieldSocialCategory')}
                    </label>
                    <select
                      value={profile.social_category}
                      onChange={(e) => handleField('social_category', e.target.value)}
                      className="w-full text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
                    >
                      <option value="General">{t('categoryGeneral')}</option>
                      <option value="OBC">{t('categoryOBC')}</option>
                      <option value="SC">{t('categorySC')}</option>
                      <option value="ST">{t('categoryST')}</option>
                      <option value="Minority">{t('categoryMinority')}</option>
                      <option value="Category-1">{t('categoryCat1')}</option>
                    </select>
                  </div>

                  {/* Disability Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t('fieldDisability')}
                    </label>
                    <select
                      value={profile.is_differently_abled ? 'yes' : 'no'}
                      onChange={(e) => handleField('is_differently_abled', e.target.value === 'yes')}
                      className="w-full text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
                    >
                      <option value="no">{t('disabilityNo')}</option>
                      <option value="yes">{t('disabilityYes')}</option>
                    </select>
                  </div>
                </div>

                {/* Privacy Callout */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-janseva-navy-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {lang === 'kn'
                      ? 'ಜನಸೇವಾ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಗೌಪ್ಯತೆಯನ್ನು ಗೌರವಿಸುತ್ತದೆ. ಯಾವುದೇ ಆಧಾರ್ ಸಂಖ್ಯೆ ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ. ಮಾಹಿತಿ ಮ್ಯಾಚಿಂಗ್ ನಿಮ್ಮ ಬ್ರೌಸರ್ ಅಥವಾ ಸುರಕ್ಷಿತ ಸರ್ವರ್‌ನಲ್ಲಿ ಮಾತ್ರ ನಡೆಯುತ್ತದೆ.'
                      : 'JanSeva never collects or requests Aadhaar numbers, biometric data, or bank account credentials. Profile inputs are strictly processed against official rules.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Form Navigation Controls */}
          <div className="px-6 sm:px-10 py-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('btnBack')}</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-janseva-navy-900 hover:bg-janseva-navy-800 text-white text-xs font-bold transition shadow-sm"
              >
                <span>{t('btnNext')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFindBenefits}
                disabled={evaluating}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-janseva-saffron hover:bg-janseva-saffron-dark text-white text-sm font-bold shadow-lg hover:shadow-janseva-saffron/30 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{evaluating ? 'Evaluating Rules...' : t('btnFindEligible')}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ================= RESULTS DISPLAY ================= */
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Summary Header */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {t('resultsTitle')}
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">
                  {t('resultsDisclaimer')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetCheck}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('btnRecalculate')}</span>
                </button>
              </div>
            </div>

            {/* Results Tabs: Eligible / Possibly Eligible / Not Eligible */}
            <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => setActiveTab('eligible')}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  activeTab === 'eligible'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl font-black text-emerald-600">
                  {evaluationResult.eligible.length}
                </span>
                <span className="text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {t('tabEligible')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('possibly_eligible')}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  activeTab === 'possibly_eligible'
                    ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl font-black text-amber-600">
                  {evaluationResult.possibly_eligible.length}
                </span>
                <span className="text-xs font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  {t('tabPossiblyEligible')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('not_eligible')}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  activeTab === 'not_eligible'
                    ? 'bg-slate-200 border-slate-300 text-slate-900 ring-2 ring-slate-400/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl font-black text-slate-500">
                  {evaluationResult.not_eligible.length}
                </span>
                <span className="text-xs font-bold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                  {t('tabNotEligible')}
                </span>
              </button>
            </div>
          </div>

          {/* Active Tab Content Breakdown */}
          <div className="space-y-6">
            {activeTab === 'eligible' && (
              <div className="space-y-6">
                {evaluationResult.eligible.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                    No schemes fully match all mandatory conditions with current profile. Check "Possibly Eligible" tab for schemes that may need verification.
                  </div>
                ) : (
                  evaluationResult.eligible.map((item) => (
                    <EvaluationCard key={item.scheme.id} evaluation={item} />
                  ))
                )}
              </div>
            )}

            {activeTab === 'possibly_eligible' && (
              <div className="space-y-6">
                {evaluationResult.possibly_eligible.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                    No schemes currently in the verification required category.
                  </div>
                ) : (
                  evaluationResult.possibly_eligible.map((item) => (
                    <EvaluationCard key={item.scheme.id} evaluation={item} />
                  ))
                )}
              </div>
            )}

            {activeTab === 'not_eligible' && (
              <div className="space-y-6">
                {evaluationResult.not_eligible.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                    Congratulations! None of the evaluated schemes failed mandatory conditions.
                  </div>
                ) : (
                  evaluationResult.not_eligible.map((item) => (
                    <EvaluationCard key={item.scheme.id} evaluation={item} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Detailed Evaluation Result Card for a single matched scheme
 */
function EvaluationCard({ evaluation }) {
  const { t, getLocalized, lang } = useLanguage();
  const { scheme, match_status, matched_conditions, missing_conditions, failed_conditions, documents } = evaluation;

  const schemeName = getLocalized(scheme, 'scheme_name');
  const benefits = getLocalized(scheme, 'benefits');
  const procedure = getLocalized(scheme, 'application_procedure');
  const dept = getLocalized(scheme, 'department');

  const statusConfig = {
    eligible: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badge: 'bg-emerald-600 text-white',
      label: t('statusEligible'),
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
    },
    possibly_eligible: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      badge: 'bg-amber-600 text-white',
      label: t('statusPossiblyEligible'),
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />
    },
    not_eligible: {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      badge: 'bg-slate-600 text-white',
      label: t('statusNotEligible'),
      icon: <XCircle className="w-4 h-4 text-slate-500" />
    }
  }[match_status] || {
    bg: 'bg-slate-50 text-slate-700 border-slate-200',
    badge: 'bg-slate-500 text-white',
    label: match_status,
    icon: null
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${statusConfig.badge}`}>
              {statusConfig.label}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {scheme.government_level} Government
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 pt-1">
            <Link to={`/schemes/${scheme.slug || scheme.id}`} className="hover:text-janseva-navy-800 transition">
              {schemeName}
            </Link>
          </h3>
          <p className="text-xs text-slate-500">{dept}</p>
        </div>

        <Link
          to={`/schemes/${scheme.slug || scheme.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-janseva-navy-900 text-white rounded-xl text-xs font-bold hover:bg-janseva-navy-800 transition shrink-0 self-start"
        >
          <span>{t('btnViewDetails')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Matching Condition Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Satisfied Requirements */}
        {matched_conditions.length > 0 && (
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t('conditionsMet')} ({matched_conditions.length})
            </h4>
            <ul className="space-y-1.5 text-emerald-800">
              {matched_conditions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{lang === 'kn' ? (item.reason_kn || item.reason_en) : item.reason_en}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing / Needs Verification */}
        {missing_conditions.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100 space-y-2">
            <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              {t('missingInfoTitle')} ({missing_conditions.length})
            </h4>
            <ul className="space-y-1.5 text-amber-800">
              {missing_conditions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{lang === 'kn' ? (item.reason_kn || item.reason_en) : item.reason_en}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Failed Conditions */}
        {failed_conditions.length > 0 && (
          <div className="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2 md:col-span-2">
            <h4 className="font-bold text-red-900 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-red-600" />
              {t('failedConditionsTitle')} ({failed_conditions.length})
            </h4>
            <ul className="space-y-1.5 text-red-800">
              {failed_conditions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{lang === 'kn' ? (item.reason_kn || item.reason_en) : item.reason_en}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Benefits Offered */}
      {benefits && (
        <div className="space-y-1 text-xs">
          <span className="font-bold text-slate-900">{t('whatYouGet')}:</span>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            {benefits}
          </p>
        </div>
      )}

      {/* Required Documents */}
      {documents && documents.length > 0 && (
        <div className="space-y-2 text-xs">
          <span className="font-bold text-slate-900">{t('detailsDocs')}:</span>
          <div className="flex flex-wrap gap-2">
            {documents.map((doc) => (
              <span 
                key={doc.id}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200 flex items-center gap-1"
              >
                <FileText className="w-3 h-3 text-slate-400" />
                {getLocalized(doc, 'document_name')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Footnotes */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <a
          href={scheme.application_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-bold"
        >
          <span>{t('officialWebsiteBtn')} ↗</span>
        </a>

        <span className="text-slate-400">
          Source: {new URL(scheme.official_source_url || 'https://india.gov.in').hostname}
        </span>
      </div>
    </div>
  );
}
