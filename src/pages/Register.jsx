import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import { UserPlus, AlertCircle } from 'lucide-react';

export default function Register() {
  const { t, lang } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    preferred_language: lang,
    state: 'Karnataka',
    district: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.full_name.trim()) {
      setError('Please enter your full name');
      return;
    }

    const emailErr = validateEmail(formData.email);
    if (emailErr) {
      setError(emailErr);
      return;
    }

    const passErr = validatePassword(formData.password);
    if (passErr) {
      setError(passErr);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-janseva-saffron-500 text-white mx-auto flex items-center justify-center font-bold">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {t('btnRegisterSubmit')}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'kn' ? 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಉಳಿಸಿದ ಸೌಲಭ್ಯಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಖಾತೆ ರಚಿಸಿ' : 'Save schemes, track eligibility and personalize benefits'}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {t('fullNameLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="e.g. Ramesh Gowda"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {t('emailLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. citizen@example.com"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {t('passwordLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {t('confirmPasswordLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.confirm_password}
                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                placeholder="••••••••"
                className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {t('profileState')}
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5"
              >
                <option value="Karnataka">Karnataka</option>
                <option value="Other">Other State</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {t('preferredLangLabel')}
              </label>
              <select
                value={formData.preferred_language}
                onChange={(e) => setFormData({ ...formData, preferred_language: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-janseva-saffron hover:bg-janseva-saffron-dark text-white rounded-xl font-bold text-sm shadow-md transition"
          >
            {loading ? 'Creating Account...' : t('btnRegisterSubmit')}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>{t('alreadyHaveAccount')} </span>
          <Link to="/login" className="font-bold text-janseva-navy-900 hover:underline">
            {t('btnLoginSubmit')}
          </Link>
        </div>
      </div>
    </div>
  );
}
