import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { schemeService } from '../../services/schemeService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle, 
  X, 
  Building, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function ManageSchemes({ onDataChanged }) {
  const { t, getLocalized, lang } = useLanguage();

  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const initialForm = {
    scheme_name_en: '',
    scheme_name_kn: '',
    short_description_en: '',
    short_description_kn: '',
    description_en: '',
    description_kn: '',
    department_en: '',
    department_kn: '',
    target_beneficiaries_en: '',
    target_beneficiaries_kn: '',
    benefits_en: '',
    benefits_kn: '',
    eligibility_summary_en: '',
    eligibility_summary_kn: '',
    application_procedure_en: '',
    application_procedure_kn: '',
    government_level: 'Karnataka',
    category_id: '',
    application_url: '',
    official_source_url: '',
    verification_status: 'verified',
    is_featured: false
  };

  const [form, setForm] = useState(initialForm);

  const loadData = async () => {
    try {
      setLoading(true);
      const [schemesRes, catRes] = await Promise.all([
        schemeService.getSchemes({ pageSize: 100 }),
        schemeService.getCategories()
      ]);
      setSchemes(schemesRes.data || []);
      setCategories(catRes.data || []);
      if (catRes.data?.length > 0 && !form.category_id) {
        setForm(prev => ({ ...prev, category_id: catRes.data[0].id }));
      }
    } catch (err) {
      console.error('Error loading schemes for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingScheme(null);
    setForm({
      ...initialForm,
      category_id: categories[0]?.id || ''
    });
    setModalOpen(true);
  };

  const openEditModal = (scheme) => {
    setEditingScheme(scheme);
    setForm({
      scheme_name_en: scheme.scheme_name_en || '',
      scheme_name_kn: scheme.scheme_name_kn || '',
      short_description_en: scheme.short_description_en || '',
      short_description_kn: scheme.short_description_kn || '',
      description_en: scheme.description_en || '',
      description_kn: scheme.description_kn || '',
      department_en: scheme.department_en || '',
      department_kn: scheme.department_kn || '',
      target_beneficiaries_en: scheme.target_beneficiaries_en || '',
      target_beneficiaries_kn: scheme.target_beneficiaries_kn || '',
      benefits_en: scheme.benefits_en || '',
      benefits_kn: scheme.benefits_kn || '',
      eligibility_summary_en: scheme.eligibility_summary_en || '',
      eligibility_summary_kn: scheme.eligibility_summary_kn || '',
      application_procedure_en: scheme.application_procedure_en || '',
      application_procedure_kn: scheme.application_procedure_kn || '',
      government_level: scheme.government_level || 'Karnataka',
      category_id: scheme.category_id || categories[0]?.id || '',
      application_url: scheme.application_url || '',
      official_source_url: scheme.official_source_url || '',
      verification_status: scheme.verification_status || 'verified',
      is_featured: Boolean(scheme.is_featured)
    });
    setModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`${t('adminConfirmDelete')}\n\nScheme: "${name}"`)) {
      try {
        await schemeService.deleteScheme(id);
        await loadData();
        if (onDataChanged) onDataChanged();
      } catch (err) {
        alert('Error deleting scheme: ' + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.scheme_name_en || !form.scheme_name_kn) {
      alert('Please provide both English and Kannada scheme names.');
      return;
    }

    try {
      setSubmitting(true);
      if (editingScheme) {
        await schemeService.updateScheme(editingScheme.id, form);
      } else {
        await schemeService.createScheme(form);
      }
      setModalOpen(false);
      await loadData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      alert('Error saving scheme: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredSchemes = schemes.filter(s =>
    (s.scheme_name_en && s.scheme_name_en.toLowerCase().includes(search.toLowerCase())) ||
    (s.scheme_name_kn && s.scheme_name_kn.toLowerCase().includes(search.toLowerCase())) ||
    (s.government_level && s.government_level.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search schemes by name or level..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-janseva-navy-800/10 focus:border-janseva-navy-800"
          />
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-janseva-navy-900 text-white text-xs font-bold shadow-sm hover:bg-janseva-navy-800 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t('adminAddScheme')}</span>
        </button>
      </div>

      {/* Schemes Table */}
      {loading ? (
        <LoadingSpinner text="Loading schemes registry..." />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Scheme Name</th>
                  <th className="px-6 py-3.5">Government</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Verification</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredSchemes.map((scheme) => (
                  <tr key={scheme.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm">{scheme.scheme_name_en}</div>
                      <div className="text-slate-500 font-kannada text-xs mt-0.5">{scheme.scheme_name_kn}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{scheme.department_en}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                        scheme.government_level === 'Karnataka'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'bg-blue-50 text-blue-900 border border-blue-200'
                      }`}>
                        {scheme.government_level}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                      {scheme.categories ? getLocalized(scheme.categories, 'name') : 'General'}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        {scheme.verification_status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(scheme)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-janseva-navy-900 hover:bg-slate-100 transition"
                        title="Edit Scheme"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(scheme.id, scheme.scheme_name_en)}
                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                        title="Delete Scheme"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal Drawer */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="px-8 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  {editingScheme ? t('adminEditScheme') : t('adminAddScheme')}
                </h3>
                <p className="text-xs text-slate-500">Provide official details in both English and Kannada</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminSchemeNameEn')} *</label>
                  <input
                    type="text"
                    required
                    value={form.scheme_name_en}
                    onChange={(e) => setForm({ ...form, scheme_name_en: e.target.value })}
                    placeholder="e.g. Karnataka SSP Post-Matric Scholarship"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminSchemeNameKn')} *</label>
                  <input
                    type="text"
                    required
                    value={form.scheme_name_kn}
                    onChange={(e) => setForm({ ...form, scheme_name_kn: e.target.value })}
                    placeholder="ಉದಾ: ಕರ್ನಾಟಕ ಎಸ್‌ಎಸ್‌ಪಿ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold font-kannada"
                  />
                </div>
              </div>

              {/* Department & Level */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-1">
                  <label className="font-bold text-slate-700">{t('adminGovLevel')} *</label>
                  <select
                    value={form.government_level}
                    onChange={(e) => setForm({ ...form, government_level: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  >
                    <option value="Karnataka">Karnataka State</option>
                    <option value="Central">Central (GoI)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label className="font-bold text-slate-700">{t('adminCategory')} *</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{getLocalized(c, 'name')}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label className="font-bold text-slate-700">{t('adminVerificationStatus')}</label>
                  <select
                    value={form.verification_status}
                    onChange={(e) => setForm({ ...form, verification_status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  >
                    <option value="verified">Verified Official Scheme</option>
                    <option value="pending_review">Under Department Review</option>
                    <option value="demonstration">Demonstration Record</option>
                  </select>
                </div>
              </div>

              {/* Departments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminDeptEn')}</label>
                  <input
                    type="text"
                    value={form.department_en}
                    onChange={(e) => setForm({ ...form, department_en: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminDeptKn')}</label>
                  <input
                    type="text"
                    value={form.department_kn}
                    onChange={(e) => setForm({ ...form, department_kn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-kannada"
                  />
                </div>
              </div>

              {/* Short Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminShortDescEn')}</label>
                  <textarea
                    rows={2}
                    value={form.short_description_en}
                    onChange={(e) => setForm({ ...form, short_description_en: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminShortDescKn')}</label>
                  <textarea
                    rows={2}
                    value={form.short_description_kn}
                    onChange={(e) => setForm({ ...form, short_description_kn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-kannada"
                  />
                </div>
              </div>

              {/* Full Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminFullDescEn')}</label>
                  <textarea
                    rows={3}
                    value={form.description_en}
                    onChange={(e) => setForm({ ...form, description_en: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminFullDescKn')}</label>
                  <textarea
                    rows={3}
                    value={form.description_kn}
                    onChange={(e) => setForm({ ...form, description_kn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-kannada"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminBenefitsEn')}</label>
                  <textarea
                    rows={2}
                    value={form.benefits_en}
                    onChange={(e) => setForm({ ...form, benefits_en: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminBenefitsKn')}</label>
                  <textarea
                    rows={2}
                    value={form.benefits_kn}
                    onChange={(e) => setForm({ ...form, benefits_kn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-kannada"
                  />
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminAppUrl')} *</label>
                  <input
                    type="url"
                    required
                    value={form.application_url}
                    onChange={(e) => setForm({ ...form, application_url: e.target.value })}
                    placeholder="https://ssp.postmatric.karnataka.gov.in"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminSourceUrl')} *</label>
                  <input
                    type="url"
                    required
                    value={form.official_source_url}
                    onChange={(e) => setForm({ ...form, official_source_url: e.target.value })}
                    placeholder="https://sevasindhu.karnataka.gov.in"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  className="rounded text-janseva-navy-900"
                />
                <label htmlFor="is_featured" className="font-bold text-slate-700">
                  Feature this scheme prominently on the Home Page
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-janseva-navy-900 text-white font-bold hover:bg-janseva-navy-800 transition"
                >
                  {submitting ? 'Saving...' : t('adminSaveSchemeBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
