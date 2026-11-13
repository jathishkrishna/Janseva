import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { schemeService } from '../../services/schemeService';
import ManageSchemes from './ManageSchemes';
import ManageRules from './ManageRules';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  ShieldCheck, 
  Layers, 
  Settings2, 
  FilePlus, 
  CheckCircle, 
  Building, 
  GraduationCap, 
  Database,
  BarChart3,
  RefreshCw,
  FolderTree
} from 'lucide-react';

export default function AdminDashboard() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('schemes'); // 'overview' | 'schemes' | 'rules'
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await schemeService.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight">{t('adminTitle')}</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Authorized Session
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t('adminSubtitle')}</p>
            <p className="text-xs text-slate-500 mt-1">Logged in as: <strong className="text-slate-300">{user?.email}</strong></p>
          </div>
        </div>

        <button
          onClick={loadStats}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Schemes</p>
          <p className="text-3xl font-black text-slate-900">{stats?.totalSchemes || 0}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">{stats?.verifiedSchemes || 0} Verified</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Karnataka State</p>
          <p className="text-3xl font-black text-amber-600">{stats?.karnatakaSchemes || 0}</p>
          <p className="text-[11px] text-slate-500">State Ministries</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Central Govt</p>
          <p className="text-3xl font-black text-blue-600">{stats?.centralSchemes || 0}</p>
          <p className="text-[11px] text-slate-500">Union Ministries</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Eligibility Rules</p>
          <p className="text-3xl font-black text-purple-600">{stats?.activeRulesCount || 0}</p>
          <p className="text-[11px] text-purple-700 font-semibold">Active Engine Rules</p>
        </div>

        <div className="col-span-2 lg:col-span-1 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Categories</p>
          <p className="text-3xl font-black text-emerald-600">{stats?.categoriesCount || 4}</p>
          <p className="text-[11px] text-slate-500">Core Pillars</p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-200 gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('schemes')}
          className={`px-5 py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'schemes'
              ? 'border-janseva-navy-900 text-janseva-navy-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{t('adminTabSchemes')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rules')}
          className={`px-5 py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'rules'
              ? 'border-janseva-navy-900 text-janseva-navy-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings2 className="w-4 h-4" />
          <span>{t('adminTabRules')}</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'schemes' && (
        <ManageSchemes onDataChanged={loadStats} />
      )}

      {activeTab === 'rules' && (
        <ManageRules onDataChanged={loadStats} />
      )}
    </div>
  );
}
