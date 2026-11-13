/**
 * JANSEVA ELIGIBILITY ENGINE UNIT & INTEGRATION TESTS
 * Run with: node tests/eligibilityEngine.test.js
 */

import { evaluateRule, evaluateSchemeEligibility, runEligibilityEngine } from '../src/utils/eligibilityEngine.js';
import { INITIAL_SCHEMES, INITIAL_RULES, INITIAL_DOCUMENTS } from '../src/services/seedData.js';

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedCount++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failedCount++;
  }
}

console.log('====================================================');
console.log('RUNNING JANSEVA ELIGIBILITY MATCHING ENGINE TESTS');
console.log('====================================================\n');

// 1. Single Rule Evaluation Tests
console.log('--- Test Suite 1: Operator & Rule Evaluations ---');

// Age >= 18
const ruleMinAge18 = {
  field_name: 'age',
  operator: 'greater_than_or_equal',
  expected_value: 18,
  is_mandatory: true,
  rule_description_en: 'Must be at least 18 years old',
  rule_description_kn: 'ಕನಿಷ್ಠ 18 ವರ್ಷ ವಯಸ್ಸಾಗಿರಬೇಕು'
};

assert(
  evaluateRule(ruleMinAge18, { age: 18 }).status === 'passed',
  'Age boundary condition: age 18 meets greater_than_or_equal 18'
);

assert(
  evaluateRule(ruleMinAge18, { age: 25 }).status === 'passed',
  'Age condition: age 25 meets greater_than_or_equal 18'
);

assert(
  evaluateRule(ruleMinAge18, { age: 17 }).status === 'failed',
  'Age boundary failure: age 17 fails greater_than_or_equal 18'
);

assert(
  evaluateRule(ruleMinAge18, {}).status === 'missing',
  'Missing age field correctly evaluated as "missing"'
);

// Income <= 250000
const ruleMaxIncome = {
  field_name: 'annual_income',
  operator: 'less_than_or_equal',
  expected_value: 250000,
  is_mandatory: true,
  rule_description_en: 'Income <= 250000',
  rule_description_kn: 'ಆದಾಯ <= 250000'
};

assert(
  evaluateRule(ruleMaxIncome, { annual_income: 250000 }).status === 'passed',
  'Income boundary condition: 250,000 meets less_than_or_equal 250,000'
);

assert(
  evaluateRule(ruleMaxIncome, { annual_income: 300000 }).status === 'failed',
  'Income condition: 300,000 fails less_than_or_equal 250,000'
);

// State equals 'Karnataka'
const ruleStateKarnataka = {
  field_name: 'state',
  operator: 'equals',
  expected_value: 'Karnataka',
  is_mandatory: true,
  rule_description_en: 'Must be from Karnataka',
  rule_description_kn: 'ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು'
};

assert(
  evaluateRule(ruleStateKarnataka, { state: 'Karnataka' }).status === 'passed',
  'State match: "Karnataka" satisfies rule'
);

assert(
  evaluateRule(ruleStateKarnataka, { state: 'Maharashtra' }).status === 'failed',
  'State restriction: "Maharashtra" fails Karnataka requirement'
);

// Education in list
const ruleEducationIn = {
  field_name: 'education',
  operator: 'in',
  expected_value: ['Diploma', 'Undergraduate Degree', 'Postgraduate Degree'],
  is_mandatory: true,
  rule_description_en: 'Degree or Diploma',
  rule_description_kn: 'ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ'
};

assert(
  evaluateRule(ruleEducationIn, { education: 'Undergraduate Degree' }).status === 'passed',
  'Education "in" operator: "Undergraduate Degree" is valid'
);

assert(
  evaluateRule(ruleEducationIn, { education: 'Primary School' }).status === 'failed',
  'Education "in" operator: "Primary School" fails requirement'
);

console.log('\n--- Test Suite 2: Scheme Eligibility Scenarios ---');

// Scenario A: Eligible Karnataka Student (SSP Scholarship)
const sspScheme = INITIAL_SCHEMES.find(s => s.slug === 'karnataka-ssp-post-matric-scholarship');
const sspRules = INITIAL_RULES.filter(r => r.scheme_id === sspScheme.id);
const sspDocs = INITIAL_DOCUMENTS.filter(d => d.scheme_id === sspScheme.id);

const eligibleStudentProfile = {
  state: 'Karnataka',
  education: 'Undergraduate Degree',
  annual_income: 150000,
  age: 20
};

const evalEligibleStudent = evaluateSchemeEligibility(sspScheme, sspRules, sspDocs, eligibleStudentProfile);
assert(
  evalEligibleStudent.match_status === 'eligible',
  'Student satisfying state, education, and income is ELIGIBLE for SSP'
);
assert(
  evalEligibleStudent.matched_conditions.length === 3,
  'All 3 mandatory conditions recorded as matched'
);

// Scenario B: Failing Income Limit
const wealthyStudentProfile = {
  state: 'Karnataka',
  education: 'Undergraduate Degree',
  annual_income: 600000 // exceeds 250,000
};

const evalWealthyStudent = evaluateSchemeEligibility(sspScheme, sspRules, sspDocs, wealthyStudentProfile);
assert(
  evalWealthyStudent.match_status === 'not_eligible',
  'Student exceeding income limit is NOT ELIGIBLE'
);
assert(
  evalWealthyStudent.failed_conditions.length === 1,
  'Exactly 1 condition failed (annual_income)'
);

// Scenario C: Non-Karnataka Resident
const outOfStateStudent = {
  state: 'Kerala',
  education: 'Undergraduate Degree',
  annual_income: 100000
};
const evalOutOfState = evaluateSchemeEligibility(sspScheme, sspRules, sspDocs, outOfStateStudent);
assert(
  evalOutOfState.match_status === 'not_eligible',
  'Non-Karnataka student is NOT ELIGIBLE for Karnataka SSP'
);

// Scenario D: Missing Information -> Possibly Eligible
const incompleteStudent = {
  state: 'Karnataka',
  education: 'Undergraduate Degree'
  // annual_income not provided!
};
const evalIncomplete = evaluateSchemeEligibility(sspScheme, sspRules, sspDocs, incompleteStudent);
assert(
  evalIncomplete.match_status === 'possibly_eligible',
  'Missing income information results in POSSIBLY ELIGIBLE'
);
assert(
  evalIncomplete.missing_conditions.length === 1,
  'Identifies exactly which information is missing'
);

// Scenario E: Yuva Nidhi Unemployed Graduate
const yuvaNidhiScheme = INITIAL_SCHEMES.find(s => s.slug === 'karnataka-yuva-nidhi-scheme');
const yuvaNidhiRules = INITIAL_RULES.filter(r => r.scheme_id === yuvaNidhiScheme.id);
const yuvaNidhiDocs = INITIAL_DOCUMENTS.filter(d => d.scheme_id === yuvaNidhiScheme.id);

const unemployedGrad = {
  state: 'Karnataka',
  education: 'Undergraduate Degree',
  occupation: 'Unemployed',
  age: 23
};
const evalYuva = evaluateSchemeEligibility(yuvaNidhiScheme, yuvaNidhiRules, yuvaNidhiDocs, unemployedGrad);
assert(
  evalYuva.match_status === 'eligible',
  'Unemployed graduate in Karnataka is ELIGIBLE for Yuva Nidhi'
);

// Employed graduate fails Yuva Nidhi
const employedGrad = {
  state: 'Karnataka',
  education: 'Undergraduate Degree',
  occupation: 'Salaried (Private Sector)',
  age: 23
};
const evalEmployedYuva = evaluateSchemeEligibility(yuvaNidhiScheme, yuvaNidhiRules, yuvaNidhiDocs, employedGrad);
assert(
  evalEmployedYuva.match_status === 'not_eligible',
  'Employed person fails Yuva Nidhi mandatory occupation requirement'
);

console.log('\n--- Test Suite 3: Full Engine Integration Run ---');
const farmerProfile = {
  state: 'Karnataka',
  occupation: 'Farmer / Cultivator',
  age: 42,
  annual_income: 180000
};

const fullRunResult = runEligibilityEngine(INITIAL_SCHEMES, INITIAL_RULES, INITIAL_DOCUMENTS, farmerProfile);
assert(
  fullRunResult.eligible.some(e => e.scheme.slug === 'pm-kisan-samman-nidhi'),
  'Farmer correctly matched as ELIGIBLE for PM-KISAN'
);

console.log(`\nEvaluated: ${fullRunResult.summary.totalEvaluated} schemes`);
console.log(`Eligible: ${fullRunResult.summary.totalEligible}`);
console.log(`Possibly Eligible: ${fullRunResult.summary.totalPossiblyEligible}`);
console.log(`Not Eligible: ${fullRunResult.summary.totalNotEligible}`);

console.log('\n====================================================');
console.log(`TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('====================================================\n');

if (failedCount > 0) {
  process.exit(1);
}
