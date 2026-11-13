/**
 * JANSEVA RULE-BASED ELIGIBILITY MATCHING ENGINE
 * 
 * Reusable, purely functional, and database-driven matching engine.
 * Compares any user profile data against configurable eligibility rules stored in PostgreSQL.
 * 
 * Classifications:
 * - 'eligible': All mandatory rules satisfied.
 * - 'possibly_eligible': No mandatory rule failed, but some information is missing.
 * - 'not_eligible': At least one mandatory rule evaluated to false.
 */

/**
 * Evaluates a single rule against a profile value.
 * @param {Object} rule - Rule record from DB { field_name, operator, expected_value, is_mandatory, rule_description_en, rule_description_kn }
 * @param {Object} profile - User profile inputs
 * @returns {Object} { status: 'passed' | 'failed' | 'missing', reason_en: string, reason_kn: string }
 */
export function evaluateRule(rule, profile) {
  const { field_name, operator, expected_value, is_mandatory, rule_description_en, rule_description_kn } = rule;
  const userValue = profile[field_name];

  // Check for missing/unprovided inputs
  if (userValue === undefined || userValue === null || userValue === '') {
    return {
      rule,
      status: 'missing',
      field_name,
      reason_en: `Information for "${field_name}" was not provided. (${rule_description_en})`,
      reason_kn: `"${field_name}" ಗಾಗಿ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಲಾಗಿಲ್ಲ. (${rule_description_kn})`,
      is_mandatory
    };
  }

  let passed = false;

  try {
    switch (operator) {
      case 'equals': {
        const expected = typeof expected_value === 'string' ? expected_value.trim().toLowerCase() : expected_value;
        const actual = typeof userValue === 'string' ? userValue.trim().toLowerCase() : userValue;
        passed = String(actual) === String(expected);
        break;
      }

      case 'not_equals': {
        const expected = typeof expected_value === 'string' ? expected_value.trim().toLowerCase() : expected_value;
        const actual = typeof userValue === 'string' ? userValue.trim().toLowerCase() : userValue;
        passed = String(actual) !== String(expected);
        break;
      }

      case 'greater_than_or_equal': {
        const numUser = Number(userValue);
        const numExpected = Number(expected_value);
        passed = !isNaN(numUser) && !isNaN(numExpected) && numUser >= numExpected;
        break;
      }

      case 'less_than_or_equal': {
        const numUser = Number(userValue);
        const numExpected = Number(expected_value);
        passed = !isNaN(numUser) && !isNaN(numExpected) && numUser <= numExpected;
        break;
      }

      case 'in': {
        // expected_value can be an array or JSON string
        let allowedArray = expected_value;
        if (typeof allowedArray === 'string') {
          try {
            allowedArray = JSON.parse(allowedArray);
          } catch {
            allowedArray = [allowedArray];
          }
        }
        if (Array.isArray(allowedArray)) {
          const userStr = String(userValue).trim().toLowerCase();
          passed = allowedArray.some(item => String(item).trim().toLowerCase() === userStr);
        }
        break;
      }

      case 'not_in': {
        let excludedArray = expected_value;
        if (typeof excludedArray === 'string') {
          try {
            excludedArray = JSON.parse(excludedArray);
          } catch {
            excludedArray = [excludedArray];
          }
        }
        if (Array.isArray(excludedArray)) {
          const userStr = String(userValue).trim().toLowerCase();
          passed = !excludedArray.some(item => String(item).trim().toLowerCase() === userStr);
        }
        break;
      }

      case 'contains': {
        const expStr = String(expected_value).toLowerCase();
        const userStr = String(userValue).toLowerCase();
        passed = userStr.includes(expStr);
        break;
      }

      default:
        console.warn(`[EligibilityEngine] Unknown operator: ${operator}`);
        passed = false;
    }
  } catch (err) {
    console.error(`[EligibilityEngine] Error evaluating rule:`, rule, err);
    passed = false;
  }

  if (passed) {
    return {
      rule,
      status: 'passed',
      field_name,
      reason_en: rule_description_en,
      reason_kn: rule_description_kn,
      is_mandatory
    };
  } else {
    return {
      rule,
      status: 'failed',
      field_name,
      reason_en: `Requirement not met: ${rule_description_en} (Your value: ${userValue})`,
      reason_kn: `ಷರತ್ತು ಪೂರೈಸಲಾಗಿಲ್ಲ: ${rule_description_kn} (ನಿಮ್ಮ ವಿವರ: ${userValue})`,
      is_mandatory
    };
  }
}

/**
 * Matches a user profile against a single scheme and its associated database rules.
 * @param {Object} scheme - Scheme record
 * @param {Array} rules - Array of eligibility_rules records for this scheme
 * @param {Array} documents - Array of required_documents records for this scheme
 * @param {Object} profile - User profile data
 * @returns {Object} Detailed match assessment
 */
export function evaluateSchemeEligibility(scheme, rules = [], documents = [], profile = {}) {
  const matched_conditions = [];
  const missing_conditions = [];
  const failed_conditions = [];

  // If scheme has no rules defined in DB, it is broadly accessible (eligible)
  if (!rules || rules.length === 0) {
    return {
      scheme,
      match_status: 'eligible',
      matched_conditions: [
        {
          reason_en: 'Open to all eligible citizens meeting standard guidelines.',
          reason_kn: 'ಸಾಮಾನ್ಯ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪೂರೈಸುವ ಎಲ್ಲಾ ಅರ್ಹ ನಾಗರಿಕರಿಗೆ ಮುಕ್ತವಾಗಿದೆ.'
        }
      ],
      missing_conditions: [],
      failed_conditions: [],
      documents: documents || []
    };
  }

  for (const rule of rules) {
    const result = evaluateRule(rule, profile);

    if (result.status === 'passed') {
      matched_conditions.push(result);
    } else if (result.status === 'missing') {
      // If mandatory, it makes the scheme 'possibly_eligible' unless already failed
      if (rule.is_mandatory) {
        missing_conditions.push(result);
      }
    } else if (result.status === 'failed') {
      if (rule.is_mandatory) {
        failed_conditions.push(result);
      } else {
        // Non-mandatory recommendation failed
        missing_conditions.push({
          ...result,
          reason_en: `Recommended condition not met: ${result.reason_en}`,
          reason_kn: `ಶಿಫಾರಸು ಮಾಡಿದ ಷರತ್ತು ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ: ${result.reason_kn}`
        });
      }
    }
  }

  // Determine Overall Status
  let match_status = 'eligible';
  if (failed_conditions.length > 0) {
    match_status = 'not_eligible';
  } else if (missing_conditions.length > 0) {
    match_status = 'possibly_eligible';
  }

  return {
    scheme,
    match_status,
    matched_conditions,
    missing_conditions,
    failed_conditions,
    documents: documents || []
  };
}

/**
 * Runs eligibility matching across an entire collection of schemes.
 * @param {Array} schemes - Array of schemes
 * @param {Array} allRules - Array of all eligibility_rules from DB
 * @param {Array} allDocuments - Array of all required_documents from DB
 * @param {Object} profile - User profile data
 * @returns {Object} { eligible: [], possibly_eligible: [], not_eligible: [], summary: {} }
 */
export function runEligibilityEngine(schemes = [], allRules = [], allDocuments = [], profile = {}) {
  // Group rules and documents by scheme_id for O(N) evaluation
  const rulesByScheme = new Map();
  for (const rule of allRules) {
    if (!rulesByScheme.has(rule.scheme_id)) {
      rulesByScheme.set(rule.scheme_id, []);
    }
    rulesByScheme.get(rule.scheme_id).push(rule);
  }

  const docsByScheme = new Map();
  for (const doc of allDocuments) {
    if (!docsByScheme.has(doc.scheme_id)) {
      docsByScheme.set(doc.scheme_id, []);
    }
    docsByScheme.get(doc.scheme_id).push(doc);
  }

  const eligible = [];
  const possibly_eligible = [];
  const not_eligible = [];

  for (const scheme of schemes) {
    const rules = rulesByScheme.get(scheme.id) || [];
    const docs = docsByScheme.get(scheme.id) || [];
    const evaluation = evaluateSchemeEligibility(scheme, rules, docs, profile);

    if (evaluation.match_status === 'eligible') {
      eligible.push(evaluation);
    } else if (evaluation.match_status === 'possibly_eligible') {
      possibly_eligible.push(evaluation);
    } else {
      not_eligible.push(evaluation);
    }
  }

  return {
    eligible,
    possibly_eligible,
    not_eligible,
    summary: {
      totalEvaluated: schemes.length,
      totalEligible: eligible.length,
      totalPossiblyEligible: possibly_eligible.length,
      totalNotEligible: not_eligible.length,
      evaluatedAt: new Date().toISOString()
    }
  };
}
