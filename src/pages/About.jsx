import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  HeartHandshake, 
  FileCheck,
  CheckCircle,
  Database,
  Users
} from 'lucide-react';

export default function About() {
  const { t, lang } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-janseva-saffron-50 text-janseva-saffron-600 border border-janseva-saffron-200 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-janseva-saffron" />
          <span>About JANSEVA Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Your Rights. Your Benefits. One Platform.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          "JanSeva bridges the information gap between citizens and government benefits by bringing opportunities, eligibility information and official application resources together in one accessible platform."
        </p>
      </div>

      {/* Social Impact & Motivation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">
            {lang === 'kn' ? 'ನಾಗರಿಕ-ಕೇಂದ್ರಿತ ವಿನ್ಯಾಸ' : 'Citizen-Centric Design'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Millions of eligible citizens miss out on scholarships, farmer funds and livelihood grants simply because they do not know these schemes exist. JanSeva provides clear, simplified discovery.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">
            {lang === 'kn' ? 'ಅಧಿಕೃತ ಮೂಲಗಳು ಮಾತ್ರ' : 'Direct Official Portals'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We never charge fees, host middlemen, or replicate government forms. We provide direct deep links to certified portals like Seva Sindhu, SSP Karnataka, and the National Scholarship Portal.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
            <Lock className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">
            {lang === 'kn' ? 'ಖಾಸಗಿತನ ಮತ್ತು ಸುರಕ್ಷತೆ' : 'Zero Sensitive Data Storage'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            JanSeva deliberately avoids asking for Aadhaar numbers, biometric certificates, or bank account credentials. The rule-based engine operates completely transparently.
          </p>
        </div>
      </div>

      {/* Coverage & Governance */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Government Coverage & Portals
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          JanSeva curates flagship public benefits from two core jurisdictions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">State Level</span>
            <h3 className="text-lg font-bold">Karnataka State Government</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Covering initiatives from Karnataka Social Welfare, Backward Classes Welfare (BCWD), Youth Empowerment & Sports (Yuva Nidhi), Women & Child Development (Gruha Lakshmi), and e-Governance (Seva Sindhu).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Union Level</span>
            <h3 className="text-lg font-bold">Government of India (Central)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curating high-impact central schemes including PM-KISAN, PM Awas Yojana - Gramin, National Means-cum-Merit Scholarship (NMMSS), Pradhan Mantri Mudra Yojana (PMMY), and Atal Pension Yojana (APY).
            </p>
          </div>
        </div>
      </div>

      {/* Official Disclaimer Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-base text-amber-900">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>Official Public Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          "JanSeva is an independent information and discovery platform. It is not affiliated with or operated by any government department. Scheme eligibility and application approval are determined by the respective authorities."
        </p>
      </div>
    </div>
  );
}
