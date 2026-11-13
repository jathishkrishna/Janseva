import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import { ShieldCheck, LogIn, Sparkles, User, AlertCircle } from 'lucide-react';

export default function Login() {
  const { t, lang } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const emailErr = validateEmail(email);
    if (emailErr) {
      setError(emailErr);
      return;
    }

    try {
      setLoading(true);
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // Demo account quick fill for hackathon judges & examiners
  const fillDemoCitizen = () => {
    setEmail('citizen@janseva.org');
    setPassword('citizen123');
    setError(null);
  };

  const fillDemoAdmin = () => {
    setEmail('admin@janseva.gov.in');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-janseva-navy-900 text-white mx-auto flex items-center justify-center font-bold">
            <LogIn className="w-6 h-6 text-janseva-saffron-light" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {t('loginTitle')}
          </h1>
          <p className="text-xs text-slate-500">
            {t('loginSubtitle')}
          </p>
        </div>

        {/* Demo Fast-Login Pills */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
          <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-janseva-saffron-500" />
            Hackathon / Review Quick Access:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={fillDemoCitizen}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:border-janseva-navy-800 rounded-lg text-slate-700 font-semibold text-left transition"
            >
              👤 Demo Citizen
            </button>
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:border-amber-600 rounded-lg text-amber-800 font-semibold text-left transition"
            >
              🛡️ Demo Admin
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {t('emailLabel')}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. citizen@janseva.org"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                {t('passwordLabel')}
              </label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-janseva-navy-900 hover:bg-janseva-navy-800 text-white rounded-xl font-bold text-sm shadow-md transition"
          >
            {loading ? 'Authenticating...' : t('btnLoginSubmit')}
          </button>
        </form>

        {/* Bottom Switcher */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>{t('dontHaveAccount')} </span>
          <Link to="/register" className="font-bold text-janseva-navy-900 hover:underline">
            {t('btnRegisterSubmit')}
          </Link>
        </div>
      </div>
    </div>
  );
}
