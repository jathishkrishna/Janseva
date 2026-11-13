import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { eligibilityService } from '../services/eligibilityService';
import BenefitCard from '../components/BenefitCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  User, 
  Heart, 
  History, 
  Settings, 
  Trash2, 
  Save, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle,
  ExternalLink,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function UserDashboard() {
  const { t, lang } = useLanguage();
  const { user, updateProfile, deleteProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'history' | 'profile'
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [historyChecks, setHistoryChecks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile form state
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    state: user?.state || 'Karnataka',
    district: user?.district || '',
    age: user?.age ? String(user.age) : '',
    gender: user?.gender || '',
    education: user?.education || '',
    occupation: user?.occupation || '',
    annual_income: user?.annual_income ? String(user.annual_income) : ''
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;
      try {
        setLoading(true);
        const [saved, history] = await Promise.all([
          authService.getSavedSchemes(user.id),
          eligibilityService.getUserHistory(user.id)
        ]);
        setSavedSchemes(saved || []);
        setHistoryChecks(history || []);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      await updateProfile({
        ...profileData,
        age: profileData.age ? parseInt(profileData.age, 10) : null,
        annual_income: profileData.annual_income ? parseFloat(profileData.annual_income) : null
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm(t('confirmDeleteProfile'))) {
      try {
        await deleteProfile();
        navigate('/');
      } catch (err) {
        alert('Error deleting data: ' + err.message);
      }
    }
  };

  const handleRemoveSaved = (schemeId) => {
    setSavedSchemes(prev => prev.filter(s => s.id !== schemeId));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Welcome Banner */}
      <div className="bg-gradient-to-r from-janseva-navy-900 to-janseva-navy-800 rounded-3xl text-white p-6 sm:p-10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-black text-janseva-saffron-light uppercase">
            {user?.full_name ? user.full_name[0] : 'C'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight">{user?.full_name || 'Citizen'}</h1>
              {user?.role === 'admin' && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  Administrator
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300">{user?.email}</p>
            <p className="text-xs text-slate-400 mt-1">
              {user?.state || 'Karnataka'} • {user?.district || 'General Jurisdiction'}
            </p>
          </div>
        </div>

        <Link
          to="/eligibility"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-janseva-saffron hover:bg-janseva-saffron-dark text-white text-xs font-bold shadow-md transition self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t('btnCheckEligibility')}</span>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`px-5 py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'saved'
              ? 'border-janseva-navy-900 text-janseva-navy-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{t('tabSaved')} ({savedSchemes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-5 py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'history'
              ? 'border-janseva-navy-900 text-janseva-navy-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>{t('tabHistory')} ({historyChecks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-5 py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'profile'
              ? 'border-janseva-navy-900 text-janseva-navy-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>{t('tabProfile')}</span>
        </button>
      </div>

      {/* Tab 1: Saved Schemes */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          {loading ? (
            <LoadingSpinner text="Retrieving saved schemes..." />
          ) : savedSchemes.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">{t('tabSaved')}</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {t('noSavedSchemes')}
                </p>
              </div>
              <Link
                to="/explore"
                className="inline-block px-5 py-2.5 bg-janseva-navy-900 text-white rounded-xl text-xs font-bold"
              >
                {t('btnExplore')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSchemes.map((scheme) => (
                <BenefitCard 
                  key={scheme.id} 
                  scheme={scheme} 
                  isSavedInitially={true}
                  onToggleSave={handleRemoveSaved}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Eligibility Check History */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {historyChecks.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <History className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">{t('tabHistory')}</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {t('noHistory')}
                </p>
              </div>
              <Link
                to="/eligibility"
                className="inline-block px-5 py-2.5 bg-janseva-saffron text-white rounded-xl text-xs font-bold"
              >
                {t('btnCheckEligibility')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {historyChecks.map((check) => (
                <div key={check.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(check.created_at).toLocaleString()}</span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm">
                      Profile: {check.profile_data?.education || 'General'} • Age {check.profile_data?.age || 'N/A'} • {check.profile_data?.state}
                    </p>
                    <div className="flex items-center gap-4 text-xs pt-1">
                      <span className="text-emerald-700 font-bold">
                        ✓ {check.total_eligible} Eligible
                      </span>
                      <span className="text-amber-700 font-bold">
                        ! {check.total_possibly_eligible} Possibly Eligible
                      </span>
                      <span className="text-slate-400">
                        ✕ {check.total_not_eligible} Not Eligible
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/eligibility"
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition shrink-0 text-center"
                  >
                    Check Again →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile Settings & Purge */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 max-w-2xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              {t('tabProfile')}
            </h2>
            <p className="text-xs text-slate-500">
              Manage your saved personal criteria for instant matching.
            </p>
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{t('profileUpdatedSuccess')}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">{t('fullNameLabel')}</label>
              <input
                type="text"
                value={profileData.full_name}
                onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">{t('profileState')}</label>
                <select
                  value={profileData.state}
                  onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5"
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">{t('profileDistrict')}</label>
                <input
                  type="text"
                  value={profileData.district}
                  onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">{t('profileAge')}</label>
                <input
                  type="number"
                  value={profileData.age}
                  onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">{t('profileIncome')}</label>
                <input
                  type="number"
                  value={profileData.annual_income}
                  onChange={(e) => setProfileData({ ...profileData, annual_income: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="px-6 py-2.5 bg-janseva-navy-900 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-janseva-navy-800 transition"
            >
              {savingProfile ? 'Saving...' : t('btnUpdateProfile')}
            </button>
          </form>

          {/* Delete Profile Data Button */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 text-xs">{t('btnDeleteProfile')}</p>
              <p className="text-[11px] text-slate-500">Purge your account, bookmarks and all eligibility logs.</p>
            </div>
            <button
              type="button"
              onClick={handleDeleteProfile}
              className="px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('btnDeleteProfile')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
