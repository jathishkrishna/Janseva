import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Shield, ExternalLink, Heart, CheckCircle2, Info, Building } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-janseva-navy-950 text-slate-300 border-t border-slate-800">
      {/* Tricolor Accent Line */}
      <div className="tricolor-border" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="JanSeva Emblem" className="w-10 h-10" />
              <div>
                <span className="text-2xl font-black text-white tracking-tight font-sans">
                  JAN<span className="text-janseva-saffron-500">SEVA</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">
                  {t('footerTagline')}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t('footerDisclaimerText')}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 text-emerald-400 border border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Karnataka State & Central Coverage
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 text-janseva-saffron-light border border-slate-700">
                100% Free & Open Information
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition">
                  {t('navExplore')}
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="hover:text-white transition text-janseva-saffron-light font-semibold">
                  {t('navEligibility')} ★
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  {t('navLogin')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  {t('navDashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Benefit Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('filterCategory')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/explore?category=scholarships" className="hover:text-white transition">
                  {t('catScholarships')}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=schemes" className="hover:text-white transition">
                  {t('catSchemes')}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=financial-assistance" className="hover:text-white transition">
                  {t('catFinancial')}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=public-services" className="hover:text-white transition">
                  {t('catPublicServices')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Government Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('footerGovPortals')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://sevasindhu.karnataka.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  {t('footerPortalSevaSindhu')}
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ssp.postmatric.karnataka.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  {t('footerPortalSSP')}
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.myscheme.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  {t('footerPortalMyScheme')}
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  {t('footerPortalNSP')}
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  {t('footerPortalIndiaGov')}
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Callout Box */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <Info className="w-5 h-5 text-janseva-saffron-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-200">
              {t('detailsDisclaimerTitle')}:
            </p>
            <p className="leading-relaxed">
              "JanSeva is an independent information and discovery platform. It is not affiliated with or operated by any government department. Scheme eligibility and application approval are determined by the respective authorities."
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>{t('footerCopyright')}</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-300 transition">
              {t('navAbout')}
            </Link>
            <span className="text-slate-700">•</span>
            <span>Security: Zero Sensitive Docs Stored</span>
            <span className="text-slate-700">•</span>
            <span>Karnataka & Central Portals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
