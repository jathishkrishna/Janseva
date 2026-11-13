import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../services/supabase';
import LanguageSwitcher from './LanguageSwitcher';
import SupabaseStatusModal from './SupabaseStatusModal';
import { 
  Menu, 
  X, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Database,
  ChevronDown,
  Info
} from 'lucide-react';

export default function Navbar() {
  const { t, lang } = useLanguage();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [dbModalOpen, setDbModalOpen] = useState(false);

  const isConfigured = isSupabaseConfigured();

  const navLinks = [
    { to: '/', label: t('navHome') },
    { to: '/explore', label: t('navExplore') },
    { to: '/eligibility', label: t('navEligibility'), highlight: true },
    { to: '/about', label: t('navAbout') },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Tricolor National/State Top Bar Accent */}
        <div className="tricolor-border" />

        {/* Top Micro-Bar for Trust, State Affiliation & Database Indicator */}
        <div className="bg-slate-900 text-slate-300 text-[11px] px-4 py-1.5 hidden md:flex items-center justify-between font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-janseva-saffron-light">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t('heroBadge')}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{t('officialTagline')}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Database indicator button */}
            <button
              onClick={() => setDbModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-white transition group cursor-pointer text-slate-300"
              title="View database & Supabase connection details"
            >
              <Database className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition" />
              <span>
                DB: {isConfigured ? 'Supabase (Live)' : 'PostgreSQL Schema (Ready)'}
              </span>
              <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
            </button>

            <span className="text-slate-600">|</span>

            <a
              href="https://sevasindhu.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Karnataka Seva Sindhu ↗
            </a>
            <a
              href="https://scholarships.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              National Scholarship Portal ↗
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Tagline */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <img
                src="/logo.svg"
                alt="JanSeva Logo"
                className="w-11 h-11 transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-janseva-navy-950 font-sans">
                    JAN<span className="text-janseva-saffron-600">SEVA</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-janseva-green-50 text-janseva-green-700 border border-janseva-green-200">
                    Karnataka & Central
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 -mt-0.5 tracking-tight line-clamp-1">
                  {t('tagline')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                    link.highlight
                      ? 'bg-janseva-saffron-50 text-janseva-saffron-600 hover:bg-janseva-saffron-100 border border-janseva-saffron-200 shadow-xs'
                      : isActive(link.to)
                      ? 'text-janseva-navy-950 bg-slate-100 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.highlight && <Sparkles className="w-3.5 h-3.5 text-janseva-saffron-600 animate-pulse" />}
                    {link.label}
                  </span>
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive('/admin')
                      ? 'bg-amber-100 text-amber-900 font-bold'
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  {t('navAdmin')}
                </Link>
              )}
            </nav>

            {/* Right Action Cluster: Language Switcher + User State */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* User authentication states */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 text-sm font-medium rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-full bg-janseva-navy-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                      {user?.full_name ? user.full_name[0] : 'U'}
                    </div>
                    <span className="max-w-[100px] truncate text-slate-800 font-semibold text-xs">
                      {user?.full_name?.split(' ')[0] || 'Citizen'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-100 py-1.5 text-sm z-50 animate-in fade-in zoom-in-95"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900 truncate">{user?.full_name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800">
                            Administrator
                          </span>
                        )}
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        {t('navDashboard')}
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-amber-700 hover:bg-amber-50"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-500" />
                          {t('navAdmin')}
                        </Link>
                      )}

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-left border-t border-slate-100"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        {t('navLogout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
                  >
                    {t('navLogin')}
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-semibold text-white bg-janseva-navy-900 hover:bg-janseva-navy-800 rounded-lg shadow-sm transition"
                  >
                    {t('navRegister')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-base font-semibold rounded-lg flex items-center justify-between ${
                    link.highlight
                      ? 'bg-janseva-saffron-50 text-janseva-saffron-600'
                      : isActive(link.to)
                      ? 'bg-slate-100 text-janseva-navy-900'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && <Sparkles className="w-4 h-4 text-janseva-saffron-600" />}
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-base font-semibold rounded-lg bg-amber-50 text-amber-900 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  {t('navAdmin')}
                </Link>
              )}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 text-sm font-semibold text-center text-slate-700 bg-slate-100 rounded-lg"
                  >
                    {t('navDashboard')} ({user?.full_name?.split(' ')[0]})
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-sm font-semibold text-center text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    {t('navLogout')}
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-semibold text-center text-slate-700 border border-slate-300 rounded-lg"
                  >
                    {t('navLogin')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-semibold text-center text-white bg-janseva-navy-900 rounded-lg"
                  >
                    {t('navRegister')}
                  </Link>
                </div>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDbModalOpen(true);
                }}
                className="mt-2 text-xs text-slate-500 flex items-center justify-center gap-1.5 py-1.5 bg-slate-50 rounded-lg"
              >
                <Database className="w-3.5 h-3.5" />
                Backend Status: {isConfigured ? 'Supabase Live' : 'PostgreSQL Schema Active'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Database Connection / Architecture Information Modal */}
      <SupabaseStatusModal
        isOpen={dbModalOpen}
        onClose={() => setDbModalOpen(false)}
      />
    </>
  );
}
