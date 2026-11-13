import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { schemeService } from '../../services/schemeService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  Plus, 
  Trash2, 
  CheckCircle, 
  X, 
  Settings2, 
  ShieldCheck, 
  AlertTriangle,
  Building
} from 'lucide-react';

export default function ManageRules({ onDataChanged }) {
  const { t, getLocalized, lang } = useLanguage();

  const [schemes, setSchemes] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchemeId, setSelectedSchemeId] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state for new rule
  const initialForm = {
    scheme_id: '',
    field_name: 'age',
    operator: 'greater_than_or_equal',
    expected_value: '18',
    is_mandatory: true,
    rule_description_en: '',
    rule_description_kn: ''
  };

  const [form, setForm] = useState(initialForm);

  const loadData = async () => {
    try {
      setLoading(true);
      const [schemesRes, rulesRes] = await Promise.all([
        schemeService.getSchemes({ pageSize: 100 }),
        schemeService.getAllRules()
      ]);
      setSchemes(schemesRes.data || []);
      setRules(rulesRes.data || []);
      if (schemesRes.data?.length > 0 && !form.scheme_id) {
        setForm(prev => ({ ...prev, scheme_id: schemesRes.data[0].id }));
      }
    } catch (err) {
      console.error('Error loading rules for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = (schemeId = null) => {
    setForm({
      ...initialForm,
      scheme_id: schemeId || schemes[0]?.id || ''
    });
    setModalOpen(true);
  };

  const handleDeleteRule = async (ruleId) => {
    if (window.confirm('Are you sure you want to delete this eligibility rule?')) {
      try {
        await schemeService.deleteRule(ruleId);
        await loadData();
        if (onDataChanged) onDataChanged();
      } catch (err) {
        alert('Error deleting rule: ' + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rule_description_en || !form.rule_description_kn) {
      alert('Please provide descriptions in both English and Kannada.');
      return;
    }

    try {
      setSubmitting(true);

      // Parse expected value appropriately
      let parsedVal = form.expected_value;
      if (form.operator === 'greater_than_or_equal' || form.operator === 'less_than_or_equal') {
        parsedVal = Number(form.expected_value);
      } else if (form.operator === 'in' || form.operator === 'not_in') {
        try {
          parsedVal = JSON.parse(form.expected_value);
        } catch {
          parsedVal = form.expected_value.split(',').map(s => s.trim());
        }
      }

      await schemeService.addRule({
        ...form,
        expected_value: parsedVal
      });

      setModalOpen(false);
      await loadData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      alert('Error creating rule: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const schemeMap = new Map(schemes.map(s => [s.id, s]));

  const filteredRules = selectedSchemeId === 'all'
    ? rules
    : rules.filter(r => r.scheme_id === selectedSchemeId);

  return (
    <div className="space-y-6">
      {/* Top Filter and Add Rule Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-600 whitespace-nowrap">Filter by Scheme:</label>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800"
          >
            <option value="all">All Schemes ({rules.length} Rules)</option>
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>{s.scheme_name_en}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => openAddModal()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-janseva-navy-900 text-white text-xs font-bold shadow-sm hover:bg-janseva-navy-800 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t('adminAddRule')}</span>
        </button>
      </div>

      {/* Rules Table */}
      {loading ? (
        <LoadingSpinner text="Loading eligibility rules engine..." />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Scheme Name</th>
                  <th className="px-6 py-3.5">Field</th>
                  <th className="px-6 py-3.5">Condition & Operator</th>
                  <th className="px-6 py-3.5">Expected Value</th>
                  <th className="px-6 py-3.5">Rule Explanation (EN / KN)</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredRules.map((rule) => {
                  const scheme = schemeMap.get(rule.scheme_id);

                  return (
                    <tr key={rule.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4 font-bold text-slate-900 max-w-[200px] truncate">
                        {scheme ? scheme.scheme_name_en : rule.scheme_id}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
                          {rule.field_name}
                        </code>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-janseva-navy-800">
                          {rule.operator}
                        </span>
                        {rule.is_mandatory && (
                          <span className="ml-1.5 px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded">
                            Mandatory
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-700 max-w-[160px] truncate">
                        {typeof rule.expected_value === 'object'
                          ? JSON.stringify(rule.expected_value)
                          : String(rule.expected_value)}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{rule.rule_description_en}</p>
                        <p className="text-slate-500 font-kannada text-[11px] mt-0.5">{rule.rule_description_kn}</p>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteRule(rule.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                          title="Delete Rule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Rule Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base">{t('adminAddRule')}</h3>
                <p className="text-xs text-slate-500">Add configurable condition evaluated by the matching engine</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Select Scheme *</label>
                <select
                  required
                  value={form.scheme_id}
                  onChange={(e) => setForm({ ...form, scheme_id: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  {schemes.map((s) => (
                    <option key={s.id} value={s.id}>{s.scheme_name_en}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminRuleField')} *</label>
                  <select
                    value={form.field_name}
                    onChange={(e) => setForm({ ...form, field_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="state">state</option>
                    <option value="district">district</option>
                    <option value="age">age</option>
                    <option value="gender">gender</option>
                    <option value="education">education</option>
                    <option value="occupation">occupation</option>
                    <option value="annual_income">annual_income</option>
                    <option value="social_category">social_category</option>
                    <option value="is_differently_abled">is_differently_abled</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t('adminRuleOperator')} *</label>
                  <select
                    value={form.operator}
                    onChange={(e) => setForm({ ...form, operator: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="equals">equals (==)</option>
                    <option value="not_equals">not_equals (!=)</option>
                    <option value="greater_than_or_equal">greater_than_or_equal (&gt;=)</option>
                    <option value="less_than_or_equal">less_than_or_equal (&lt;=)</option>
                    <option value="in">in (allowed list)</option>
                    <option value="not_in">not_in (excluded list)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">{t('adminRuleValue')} *</label>
                <input
                  type="text"
                  required
                  value={form.expected_value}
                  onChange={(e) => setForm({ ...form, expected_value: e.target.value })}
                  placeholder='e.g. "Karnataka", 250000, 18, or ["Diploma", "Undergraduate Degree"]'
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">{t('adminRuleDescEn')} *</label>
                <input
                  type="text"
                  required
                  value={form.rule_description_en}
                  onChange={(e) => setForm({ ...form, rule_description_en: e.target.value })}
                  placeholder="e.g. Applicant must be a resident of Karnataka State"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">{t('adminRuleDescKn')} *</label>
                <input
                  type="text"
                  required
                  value={form.rule_description_kn}
                  onChange={(e) => setForm({ ...form, rule_description_kn: e.target.value })}
                  placeholder="ಉದಾ: ಅರ್ಜಿದಾರರು ಕರ್ನಾಟಕ ರಾಜ್ಯದ ನಿವಾಸಿಯಾಗಿರಬೇಕು"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-kannada"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rule_is_mandatory"
                  checked={form.is_mandatory}
                  onChange={(e) => setForm({ ...form, is_mandatory: e.target.checked })}
                  className="rounded text-janseva-navy-900"
                />
                <label htmlFor="rule_is_mandatory" className="font-bold text-slate-700">
                  {t('adminRuleMandatory')}
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-janseva-navy-900 text-white font-bold hover:bg-janseva-navy-800"
                >
                  {submitting ? 'Adding...' : 'Save Rule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
