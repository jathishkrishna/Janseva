import { schemeService } from './schemeService';
import { runEligibilityEngine } from '../utils/eligibilityEngine';
import { supabase, isSupabaseConfigured } from './supabase';

const ELIGIBILITY_CHECKS_KEY = 'janseva_eligibility_checks';

function getLocalChecks() {
  try {
    const data = localStorage.getItem(ELIGIBILITY_CHECKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalCheck(checkRecord) {
  const checks = getLocalChecks();
  checks.unshift(checkRecord);
  localStorage.setItem(ELIGIBILITY_CHECKS_KEY, JSON.stringify(checks));
}

export const eligibilityService = {
  /**
   * Run the eligibility engine against all schemes in the database
   * @param {Object} profile - User answers
   * @param {String|null} userId - Current user ID if logged in
   */
  async checkEligibility(profile, userId = null) {
    // 1. Fetch schemes, rules, and documents from database
    const [schemesRes, rulesRes, docsRes] = await Promise.all([
      schemeService.getSchemes({ pageSize: 100 }), // retrieve all verified schemes
      schemeService.getAllRules(),
      schemeService.getAllDocuments()
    ]);

    const schemes = schemesRes.data || [];
    const rules = rulesRes.data || [];
    const documents = docsRes.data || [];

    // 2. Execute purely functional, rule-based matching engine
    const evaluation = runEligibilityEngine(schemes, rules, documents, profile);

    // 3. Persist eligibility check record if user is logged in or for history
    const checkRecord = {
      id: crypto.randomUUID(),
      user_id: userId,
      profile_data: profile,
      total_eligible: evaluation.summary.totalEligible,
      total_possibly_eligible: evaluation.summary.totalPossiblyEligible,
      total_not_eligible: evaluation.summary.totalNotEligible,
      created_at: new Date().toISOString(),
      results: evaluation
    };

    if (userId) {
      if (isSupabaseConfigured()) {
        try {
          const { data: insertedCheck } = await supabase
            .from('eligibility_checks')
            .insert({
              id: checkRecord.id,
              user_id: userId,
              profile_data: profile,
              total_eligible: checkRecord.total_eligible,
              total_possibly_eligible: checkRecord.total_possibly_eligible,
              total_not_eligible: checkRecord.total_not_eligible,
              created_at: checkRecord.created_at
            })
            .select()
            .single();

          // Save detailed results for eligible schemes
          const resultsToInsert = [
            ...evaluation.eligible.map(e => ({
              eligibility_check_id: checkRecord.id,
              scheme_id: e.scheme.id,
              match_status: 'eligible',
              matched_conditions: e.matched_conditions,
              missing_conditions: e.missing_conditions,
              failed_conditions: e.failed_conditions
            })),
            ...evaluation.possibly_eligible.map(e => ({
              eligibility_check_id: checkRecord.id,
              scheme_id: e.scheme.id,
              match_status: 'possibly_eligible',
              matched_conditions: e.matched_conditions,
              missing_conditions: e.missing_conditions,
              failed_conditions: e.failed_conditions
            }))
          ];

          if (resultsToInsert.length > 0) {
            await supabase.from('eligibility_results').insert(resultsToInsert);
          }
        } catch (err) {
          console.warn('[EligibilityService] Error saving check to Supabase:', err);
        }
      } else {
        saveLocalCheck(checkRecord);
      }
    }

    return {
      evaluation,
      checkRecord
    };
  },

  /**
   * Get history of eligibility checks for current user
   */
  async getUserHistory(userId) {
    if (!userId) return [];

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('eligibility_checks')
        .select('*, eligibility_results(*, schemes(*))')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      const checks = getLocalChecks();
      return checks.filter(c => c.user_id === userId);
    }
  }
};
