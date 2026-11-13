import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { schemeService } from '../services/schemeService';
import BenefitCard from '../components/BenefitCard';
import SearchBar from '../components/SearchBar';
import { BenefitCardSkeleton } from '../components/LoadingSpinner';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Coins, 
  FileCheck, 
  CheckCircle2, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Database,
  ExternalLink,
  Users,
  Compass,
  CheckCircle
} from 'lucide-react';

export default function Home() {
  const { t, getLocalized, lang } = useLanguage();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [featuredSchemes, setFeaturedSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [statsData, featuredData, categoriesData] = await Promise.all([
          schemeService.getStats(),
          schemeService.getSchemes({ isFeaturedOnly: true, pageSize: 6 }),
          schemeService.getCategories()
        ]);

        setStats(statsData);
        setFeaturedSchemes(featuredData.data || []);
        setCategories(categoriesData.data || []);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleHeroSearch = (query) => {
    if (query && query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'scholarships':
        return <GraduationCap className="w-7 h-7 text-blue-600" />;
      case 'schemes':
        return <Building2 className="w-7 h-7 text-amber-600" />;
      case 'financial-assistance':
        return <Coins className="w-7 h-7 text-emerald-600" />;
      case 'public-services':
        return <FileCheck className="w-7 h-7 text-purple-600" />;
      default:
        return <GraduationCap className="w-7 h-7 text-janseva-navy-800" />;
    }
  };

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-janseva-navy-900 to-janseva-navy-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-janseva-saffron/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-janseva-green/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-janseva-saffron-light">
            <Sparkles className="w-4 h-4 text-janseva-saffron animate-pulse" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] font-sans">
              {t('heroHeadline')}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Prominent Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <SearchBar
                onSearch={handleHeroSearch}
                placeholder={t('heroSearchPlaceholder')}
                showTags={true}
                className="text-left"
              />
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/eligibility"
              className="px-6 py-3.5 bg-janseva-saffron hover:bg-janseva-saffron-dark text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-janseva-saffron/30 transition-all flex items-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>{t('btnCheckEligibility')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/explore"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Compass className="w-5 h-5 text-slate-300" />
              <span>{t('btnExplore')}</span>
            </Link>
          </div>

          {/* Direct verification metrics guarantee */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Direct Official Government Sources
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Zero Middlemen / 100% Free
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              English & ಕನ್ನಡ Supported
            </span>
          </div>
        </div>
      </section>

      {/* 2. FOUR BENEFIT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const catName = getLocalized(cat, 'name');
            const catDesc = getLocalized(cat, 'description');

            return (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                className="group p-6 bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {getCategoryIcon(cat.slug)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-janseva-navy-800 transition-colors">
                    {catName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {catDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-janseva-navy-900 group-hover:text-janseva-saffron-600 transition-colors">
                  <span>{t('viewAllSchemes')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED SCHEMES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-janseva-saffron-50 text-janseva-saffron-600 border border-janseva-saffron-200 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Karnataka & Central Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('featuredTitle')}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {t('featuredSubtitle')}
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-janseva-navy-900 hover:text-janseva-saffron-600 transition"
          >
            <span>{t('viewAllSchemes')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCardSkeleton />
            <BenefitCardSkeleton />
            <BenefitCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSchemes.map((scheme) => (
              <BenefitCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        )}
      </section>

      {/* 4. REAL DATABASE-DERIVED STATISTICS SECTION */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t('statsTitle')}
            </h2>
            <p className="text-sm text-slate-400">
              {t('statsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <p className="text-3xl sm:text-4xl font-black text-janseva-saffron-light">
                {stats?.totalSchemes || 10}
              </p>
              <p className="text-xs text-slate-300 font-medium mt-2">
                {t('statTotalSchemes')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <p className="text-3xl sm:text-4xl font-black text-amber-400">
                {stats?.karnatakaSchemes || 5}
              </p>
              <p className="text-xs text-slate-300 font-medium mt-2">
                {t('statKarnatakaSchemes')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <p className="text-3xl sm:text-4xl font-black text-blue-400">
                {stats?.centralSchemes || 5}
              </p>
              <p className="text-xs text-slate-300 font-medium mt-2">
                {t('statCentralSchemes')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <p className="text-3xl sm:text-4xl font-black text-purple-400">
                {stats?.categoriesCount || 4}
              </p>
              <p className="text-xs text-slate-300 font-medium mt-2">
                {t('statCategoriesCount')}
              </p>
            </div>

            <div className="col-span-2 lg:col-span-1 p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">
                {stats?.activeRulesCount || 25}
              </p>
              <p className="text-xs text-slate-300 font-medium mt-2">
                {t('statActiveRules')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW JANSEVA WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('howItWorksTitle')}
          </h2>
          <p className="text-sm text-slate-500">
            {t('howItWorksSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm relative group hover:shadow-card-hover transition-all">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 mx-auto flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              {t('step1Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('step1Desc')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm relative group hover:shadow-card-hover transition-all">
            <div className="w-14 h-14 rounded-2xl bg-janseva-saffron-50 text-janseva-saffron-600 mx-auto flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              {t('step2Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('step2Desc')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm relative group hover:shadow-card-hover transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              {t('step3Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('step3Desc')}
            </p>
          </div>
        </div>

        {/* CTA banner linking to checker */}
        <div className="rounded-2xl bg-gradient-to-r from-janseva-navy-900 to-janseva-navy-800 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              {lang === 'kn' ? 'ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಈಗಲೇ ಪರಿಶೀಲಿಸಿ' : 'Ready to discover benefits you qualify for?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {lang === 'kn'
                ? 'ವಯಸ್ಸು, ಶಿಕ್ಷಣ ಮತ್ತು ಆದಾಯದ ಸರಳ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ ಕೆಲವೇ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಫಲಿತಾಂಶ ಪಡೆಯಿರಿ.'
                : 'Takes less than 2 minutes. No Aadhaar or sensitive bank info required.'}
            </p>
          </div>

          <Link
            to="/eligibility"
            className="px-6 py-3.5 bg-janseva-saffron hover:bg-janseva-saffron-dark text-white font-bold text-sm rounded-xl shadow-lg transition shrink-0"
          >
            {t('btnCheckEligibility')}
          </Link>
        </div>
      </section>

      {/* 6. BENEFITS OF USING JANSEVA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('whyTitle')}
          </h2>
          <p className="text-sm text-slate-500">
            {t('whySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              ✓
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t('why1Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('why1Desc')}</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              文
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t('why2Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('why2Desc')}</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              ⚙
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t('why3Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('why3Desc')}</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              🔒
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t('why4Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('why4Desc')}</p>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('faqTitle')}
          </h2>
          <p className="text-sm text-slate-500">
            {t('faqSubtitle')}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
