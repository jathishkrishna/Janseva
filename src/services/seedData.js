// Full seed data structure mirroring supabase/seed.sql exactly
// Used for local state management and initial seeding

export const INITIAL_CATEGORIES = [
  {
    id: '11111111-1111-1111-1111-111111111101',
    slug: 'scholarships',
    name_en: 'Scholarships',
    name_kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು',
    description_en: 'Financial support for school, college, technical and higher education students.',
    description_kn: 'ಶಾಲೆ, ಕಾಲೇಜು, ತಾಂತ್ರಿಕ ಮತ್ತು ಉನ್ನತ ಶಿಕ್ಷಣದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆರ್ಥಿಕ ನೆರವು.',
    icon: 'GraduationCap',
    display_order: 1
  },
  {
    id: '11111111-1111-1111-1111-111111111102',
    slug: 'schemes',
    name_en: 'Government Schemes',
    name_kn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    description_en: 'Welfare, housing, health, and livelihood programs for individuals and families.',
    description_kn: 'ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಕುಟುಂಬಗಳಿಗೆ ಕಲ್ಯಾಣ, ವಸತಿ, ಆರೋಗ್ಯ ಮತ್ತು ಜೀವನೋಪಾಯ ಕಾರ್ಯಕ್ರಮಗಳು.',
    icon: 'Building2',
    display_order: 2
  },
  {
    id: '11111111-1111-1111-1111-111111111103',
    slug: 'financial-assistance',
    name_en: 'Financial Assistance & Funds',
    name_kn: 'ಆರ್ಥಿಕ ನೆರವು ಮತ್ತು ನಿಧಿಗಳು',
    description_en: 'Direct cash transfers, pension plans, unemployment stipends and farmer aid.',
    description_kn: 'ನೇರ ನಗದು ವರ್ಗಾವಣೆ, ಪಿಂಚಣಿ ಯೋಜನೆಗಳು, ನಿರುದ್ಯೋಗ ಭತ್ಯೆ ಮತ್ತು ರೈತ ನೆರವು.',
    icon: 'Coins',
    display_order: 3
  },
  {
    id: '11111111-1111-1111-1111-111111111104',
    slug: 'public-services',
    name_en: 'Public Services',
    name_kn: 'ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳು',
    description_en: 'Certificates, citizen entitlements, digital governance and official documentation.',
    description_kn: 'ಪ್ರಮಾಣಪತ್ರಗಳು, ನಾಗರಿಕ ಹಕ್ಕುಗಳು, ಡಿಜಿಟಲ್ ಆಡಳಿತ ಮತ್ತು ಅಧಿಕೃತ ದಾಖಲೆಗಳು.',
    icon: 'FileCheck',
    display_order: 4
  }
];

export const INITIAL_SCHEMES = [
  {
    id: '22222222-2222-2222-2222-222222222201',
    slug: 'karnataka-ssp-post-matric-scholarship',
    scheme_name_en: 'Karnataka SSP Post-Matric Scholarship',
    scheme_name_kn: 'ಕರ್ನಾಟಕ ಎಸ್‌ಎಸ್‌ಪಿ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ',
    short_description_en: 'Financial aid and fee concessions for post-matriculation studies for SC/ST, OBC, and minority students domiciled in Karnataka.',
    short_description_kn: 'ಕರ್ನಾಟಕದ ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ, ಒಬಿಸಿ ಮತ್ತು ಅಲ್ಪಸಂಖ್ಯಾತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮೆಟ್ರಿಕ್ ನಂತರದ ವ್ಯಾಸಂಗಕ್ಕೆ ಆರ್ಥಿಕ ನೆರವು ಮತ್ತು ಶುಲ್ಕ ರಿಯಾಯಿತಿ.',
    description_en: 'The State Scholarship Portal (SSP) Post-Matric Scholarship is a unified portal operated by the Government of Karnataka covering Social Welfare, Tribal Welfare, Backward Classes Welfare, and Minorities Welfare departments. It credits tuition fees, maintenance allowance, and laboratory charges directly to the Aadhaar-seeded bank accounts of eligible students.',
    description_kn: 'ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ತಂತ್ರಾಂಶ (ಎಸ್‌ಎಸ್‌ಪಿ) ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಸಮಾಜ ಕಲ್ಯಾಣ, ಪರಿಶಿಷ್ಟ ಪಂಗಡಗಳ ಕಲ್ಯಾಣ, ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಮತ್ತು ಅಲ್ಪಸಂಖ್ಯಾತರ ಕಲ್ಯಾಣ ಇಲಾಖೆಗಳು ಜಂಟಿಯಾಗಿ ನಡೆಸುವ ಏಕೀಕೃತ ತಂತ್ರಾಂಶವಾಗಿದೆ. ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಬೋಧನಾ ಶುಲ್ಕ, ನಿರ್ವಹಣಾ ಭತ್ಯೆ ಮತ್ತು ಶುಲ್ಕ ಮರುಪಾವತಿಯನ್ನು ನೇರವಾಗಿ ಆಧಾರ-ಜೋಡಿಸಲಾದ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ ಮಾಡಲಾಗುತ್ತದೆ.',
    government_level: 'Karnataka',
    category_id: '11111111-1111-1111-1111-111111111101',
    department_en: 'Social Welfare & Backward Classes Welfare Dept, Govt. of Karnataka',
    department_kn: 'ಸಮಾಜ ಕಲ್ಯಾಣ ಮತ್ತು ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'Post-Matric (PUC, Diploma, ITI, Degree, PG, Engineering, Medical) students from Karnataka',
    target_beneficiaries_kn: 'ಕರ್ನಾಟಕದ ಪಿಯುಸಿ, ಡಿಪ್ಲೊಮಾ, ಪದವಿ, ಸ್ನಾತಕೋತ್ತರ, ಇಂಜಿನಿಯರಿಂಗ್, ವೈದ್ಯಕೀಯ ವಿದ್ಯಾರ್ಥಿಗಳು',
    benefits_en: 'Full or partial tuition fee reimbursement plus monthly maintenance allowance between ₹2,500 and ₹15,000 per academic year based on course and category.',
    benefits_kn: 'ಕೋರ್ಸ್ ಮತ್ತು ಜಾತಿ ವರ್ಗಕ್ಕೆ ಅನುಗುಣವಾಗಿ ವಾರ್ಷಿಕ ₹2,500 ರಿಂದ ₹15,000 ವರೆಗೆ ನಿರ್ವಹಣಾ ಭತ್ಯೆ ಮತ್ತು ಸಂಪೂರ್ಣ ಅಥವಾ ಭಾಗಶಃ ಬೋಧನಾ ಶುಲ್ಕ ಮರುಪಾವತಿ.',
    eligibility_summary_en: 'Must be a permanent resident of Karnataka, studying in a recognized post-matric course, with annual family income within specified limits (Up to ₹2.5 Lakhs for SC/ST, up to ₹1 Lakh to ₹2.5 Lakhs for Cat-1 and OBC).',
    eligibility_summary_kn: 'ಕರ್ನಾಟಕದ ಖಾಯಂ ನಿವಾಸಿಯಾಗಿರಬೇಕು, ಮಾನ್ಯತೆ ಪಡೆದ ಕಾಲೇಜಿನಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರಬೇಕು, ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ಮಿತಿಯೊಳಗಿರಬೇಕು (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿಗೆ ₹2.5 ಲಕ್ಷದವರೆಗೆ, ಇತರೆ ಹಿಂದುಳಿದ ವರ್ಗಗಳಿಗೆ ₹1 ರಿಂದ ₹2.5 ಲಕ್ಷ).',
    application_procedure_en: '1. Obtain Kutumba ID and enter Aadhaar details.\n2. Login to SSP Portal using Student Account.\n3. Enter College/University registration number and fetch e-Attestation.\n4. Submit online application with RD numbers of Caste and Income certificates.',
    application_procedure_kn: '1. ಕುಟುಂಬ ಐಡಿ ಮತ್ತು ಆಧಾರ್ ವಿವರಗಳನ್ನು ಪಡೆಯಿರಿ.\n2. ಎಸ್‌ಎಸ್‌ಪಿ ತಂತ್ರಾಂಶದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಖಾತೆಗೆ ಲಾಗಿನ್ ಆಗಿ.\n3. ಕಾಲೇಜು ನೋಂದಣಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ಇ-ದೃಢೀಕರಣ ಪರಿಶೀಲಿಸಿ.\n4. ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದ ಆರ್‌ಡಿ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    application_url: 'https://ssp.postmatric.karnataka.gov.in',
    official_source_url: 'https://ssp.postmatric.karnataka.gov.in',
    application_start_date: '2026-08-01',
    application_end_date: '2026-12-31',
    verification_status: 'verified',
    last_verified_at: '2026-11-01T10:00:00Z',
    is_featured: true
  },
  {
    id: '22222222-2222-2222-2222-222222222202',
    slug: 'karnataka-yuva-nidhi-scheme',
    scheme_name_en: 'Karnataka Yuva Nidhi Scheme',
    scheme_name_kn: 'ಕರ್ನಾಟಕ ಯುವ ನಿಧಿ ಯೋಜನೆ',
    short_description_en: 'Monthly financial assistance of ₹3,000 for unemployed graduates and ₹1,500 for unemployed diploma holders in Karnataka.',
    short_description_kn: 'ಕರ್ನಾಟಕದ ನಿರುದ್ಯೋಗಿ ಪದವೀಧರರಿಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹3,000 ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಪಡೆದವರಿಗೆ ₹1,500 ಮಾಸಿಕ ಆರ್ಥಿಕ ನೆರವು.',
    description_en: 'Under the Karnataka Guarantee Schemes, the Yuva Nidhi initiative provides crucial financial runway to young men and women who have completed degrees or diplomas in the current or preceding academic year but have not yet secured formal employment or higher education seats, supporting them during job search and skill development.',
    description_kn: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಗ್ಯಾರಂಟಿ ಯೋಜನೆಗಳ ಅಡಿಯಲ್ಲಿ, ಯುವ ನಿಧಿ ಯೋಜನೆಯು ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ ಮುಗಿಸಿ ಇನ್ನೂ ಉದ್ಯೋಗ ಪಡೆಯದ ಅಥವಾ ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕೆ ಸೇರದ ಯುವಕ-ಯುವತಿಯರಿಗೆ ಉದ್ಯೋಗ ಹುಡುಕಾಟ ಮತ್ತು ಕೌಶಲ್ಯ ತರಬೇತಿಯ ಅವಧಿಯಲ್ಲಿ ಆರ್ಥಿಕ ಭದ್ರತೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    government_level: 'Karnataka',
    category_id: '11111111-1111-1111-1111-111111111103',
    department_en: 'Department of Youth Empowerment and Sports / Skill Development, Govt. of Karnataka',
    department_kn: 'ಯುವ ಸಬಲೀಕರಣ ಮತ್ತು ಕ್ರೀಡಾ ಇಲಾಖೆ / ಕೌಶಲ್ಯಾಭಿವೃದ್ಧಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'Unemployed Degree and Diploma holders domiciled in Karnataka for at least 6 years',
    target_beneficiaries_kn: 'ಕನಿಷ್ಠ 6 ವರ್ಷ ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸಿರುವ ನಿರುದ್ಯೋಗಿ ಪದವಿ ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಹೊಂದಿರುವವರು',
    benefits_en: '₹3,000 per month for degree holders and ₹1,500 per month for diploma holders transferred directly into the bank account (DBT) for up to 2 years or until employment is secured.',
    benefits_kn: 'ಪದವೀಧರರಿಗೆ ಮಾಸಿಕ ₹3,000 ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಹೊಂದಿದವರಿಗೆ ಮಾಸಿಕ ₹1,500 ನೇರ ನಗದು ವರ್ಗಾವಣೆ (ಡಿಬಿಟಿ) ಮೂಲಕ ಗರಿಷ್ಠ 2 ವರ್ಷಗಳವರೆಗೆ ಅಥವಾ ಉದ್ಯೋಗ ದೊರೆಯುವವರೆಗೆ.',
    eligibility_summary_en: 'Karnataka domicile for at least 6 years; Passed Degree or Diploma; Unemployed for at least 180 days post-passing; Not enrolled in higher studies; Not an apprentice or self-employed receiving formal income.',
    eligibility_summary_kn: 'ಕನಿಷ್ಠ 6 ವರ್ಷಗಳ ಕರ್ನಾಟಕ ವಾಸಸ್ಥಳ; ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ ಉತ್ತೀರ್ಣ; ಫಲಿತಾಂಶ ಬಂದ 180 ದಿನಗಳವರೆಗೆ ಉದ್ಯೋಗವಿಲ್ಲದಿರುವುದು; ಉನ್ನತ ವ್ಯಾಸಂಗ ಮುಂದುವರಿಸದಿರುವುದು.',
    application_procedure_en: '1. Visit Seva Sindhu or dedicated Yuva Nidhi portal.\n2. Authenticate using Aadhaar and Nadakacheri Domicile/Study Certificate.\n3. Enter University degree/diploma roll number.\n4. Complete monthly self-declaration of unemployment status.',
    application_procedure_kn: '1. ಸೇವಾ ಸಿಂಧು ಅಥವಾ ಯುವ ನಿಧಿ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.\n2. ಆಧಾರ್ ಮತ್ತು ನಾಡಕಚೇರಿ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಬಳಸಿ ದೃಢೀಕರಿಸಿ.\n3. ವಿಶ್ವವಿದ್ಯಾಲಯದ ರೋಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.\n4. ಪ್ರತಿ ತಿಂಗಳು ನಿರುದ್ಯೋಗ ಸ್ಥಿತಿಯ ಸ್ವಯಂ ಘೋಷಣೆ ಸಲ್ಲಿಸಿ.',
    application_url: 'https://sevasindhugs.karnataka.gov.in',
    official_source_url: 'https://sevasindhu.karnataka.gov.in',
    application_start_date: '2026-01-01',
    application_end_date: '2026-12-31',
    verification_status: 'verified',
    last_verified_at: '2026-11-05T14:30:00Z',
    is_featured: true
  },
  {
    id: '22222222-2222-2222-2222-222222222203',
    slug: 'karnataka-gruha-lakshmi-scheme',
    scheme_name_en: 'Karnataka Gruha Lakshmi Scheme',
    scheme_name_kn: 'ಕರ್ನಾಟಕ ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆ',
    short_description_en: 'Direct financial assistance of ₹2,000 every month to the female head of eligible Antyodaya and BPL/APL families in Karnataka.',
    short_description_kn: 'ಕರ್ನಾಟಕದ ಅರ್ಹ ಅಂತ್ಯೋದಯ, ಬಿಪಿಎಲ್ ಮತ್ತು ಎಪಿಎಲ್ ಕುಟುಂಬಗಳ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರ ಆರ್ಥಿಕ ನೆರವು.',
    description_en: 'Gruha Lakshmi is one of the flagship guarantee schemes instituted by the Government of Karnataka to empower homemakers and women heads of households. Every month, ₹2,000 is transferred via Direct Benefit Transfer (DBT) to the female head of the family as recognized in the Ration Card.',
    description_kn: 'ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆಯು ಕುಟುಂಬದ ಯಜಮಾನಿ ಮಹಿಳೆಯರ ಆರ್ಥಿಕ ಸಬಲೀಕರಣಕ್ಕಾಗಿ ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಜಾರಿಗೆ ತಂದ ಪ್ರಮುಖ ಗ್ಯಾರಂಟಿ ಯೋಜನೆಯಾಗಿದೆ. ಪಡಿತರ ಚೀಟಿಯಲ್ಲಿ ನಮೂದಿಸಲಾದ ಮನೆಯ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರ ನಗದು ವರ್ಗಾವಣೆ (ಡಿಬಿಟಿ) ಮೂಲಕ ನೀಡಲಾಗುತ್ತದೆ.',
    government_level: 'Karnataka',
    category_id: '11111111-1111-1111-1111-111111111103',
    department_en: 'Women and Child Development Department, Govt. of Karnataka',
    department_kn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'Female head of household holding valid Karnataka Ration Card (BPL / Antyodaya / APL)',
    target_beneficiaries_kn: 'ಕರ್ನಾಟಕದ ಮಾನ್ಯತೆ ಪಡೆದ ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವ ಮನೆಯ ಮುಖ್ಯಸ್ಥೆ ಮಹಿಳೆ',
    benefits_en: '₹2,000 per month recurring payment deposited into bank account linked to Aadhaar.',
    benefits_kn: 'ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರ ಜಮೆ.',
    eligibility_summary_en: 'Woman must be identified as head of family in Ration Card (RC); Neither the woman nor her husband can be income tax payees or GST taxpayers.',
    eligibility_summary_kn: 'ಪಡಿತರ ಚೀಟಿಯಲ್ಲಿ ಮಹಿಳೆಯು ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥೆಯಾಗಿರಬೇಕು; ಮಹಿಳೆ ಅಥವಾ ಆಕೆಯ ಪತಿ ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರು ಅಥವಾ ಜಿಎಸ್‌ಟಿ ಪಾವತಿದಾರರಾಗಿರಬಾರದು.',
    application_procedure_en: '1. Check appointment slot via SMS or Karnataka One / Bangalore One / Grama One centers.\n2. Present Ration Card number and Aadhaar of woman and spouse.\n3. Biometric / OTP authentication for instant enrollment.',
    application_procedure_kn: '1. ಗ್ರಾಮ ಒನ್ / ಕರ್ನಾಟಕ ಒನ್ / ಬೆಂಗಳೂರು ಒನ್ ಕೇಂದ್ರಗಳಿಗೆ ಭೇಟಿ ನೀಡಿ.\n2. ಪಡಿತರ ಚೀಟಿ ಸಂಖ್ಯೆ ಮತ್ತು ಆಧಾರ್ ಕಾರ್ಡ್ ವಿವರಗಳನ್ನು ನೀಡಿ.\n3. ಬಯೋಮೆಟ್ರಿಕ್ ಅಥವಾ ಒಟಿಪಿ ದೃಢೀಕರಣದ ಮೂಲಕ ನೋಂದಾಯಿಸಿ.',
    application_url: 'https://sevasindhugs.karnataka.gov.in',
    official_source_url: 'https://wcd.karnataka.gov.in',
    application_start_date: '2026-01-01',
    application_end_date: '2026-12-31',
    verification_status: 'verified',
    last_verified_at: '2026-11-08T09:00:00Z',
    is_featured: true
  },
  {
    id: '22222222-2222-2222-2222-222222222204',
    slug: 'karnataka-vidyasiri-scheme',
    scheme_name_en: 'Karnataka Vidyasiri (Food & Accommodation) Scheme',
    scheme_name_kn: 'ಕರ್ನಾಟಕ ವಿದ್ಯಾಸಿರಿ (ಊಟ ಮತ್ತು ವಸತಿ ಸಹಾಯ) ಯೋಜನೆ',
    short_description_en: 'Monthly financial assistance of ₹1,500 for rural and backward class students pursuing post-matric studies without government hostel access.',
    short_description_kn: 'ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್ ಪ್ರವೇಶಾವಕಾಶ ಸಿಗದ, ಮೆಟ್ರಿಕ್ ನಂತರದ ವ್ಯಾಸಂಗ ಮಾಡುವ ಗ್ರಾಮೀಣ ಮತ್ತು ಹಿಂದುಳಿದ ವರ್ಗದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮಾಸಿಕ ₹1,500 ನೆರವು.',
    description_en: 'The Vidyasiri (Bhojana Matthu Vasathi Sahaya Yojane) supports eligible Other Backward Classes (OBC), SC, and ST students who are studying in post-matric courses at a distance greater than 5 km from their hometown and were not allotted a government post-matric hostel.',
    description_kn: 'ವಿದ್ಯಾಸಿರಿ (ಭೋಜನ ಮತ್ತು ವಸತಿ ಸಹಾಯ ಯೋಜನೆ) ತಮ್ಮ ಊರಿನಿಂದ 5 ಕಿಮೀಗಿಂತ ಹೆಚ್ಚು ದೂರದಲ್ಲಿರುವ ಕಾಲೇಜಿನಲ್ಲಿ ಮೆಟ್ರಿಕ್ ನಂತರದ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರುವ ಹಾಗೂ ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್ ಪ್ರವೇಶ ಸಿಗದ ಒಬಿಸಿ, ಎಸ್‌ಸಿ, ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಸತಿ ಮತ್ತು ಊಟದ ವೆಚ್ಚ ಭರಿಸಲು ಆರ್ಥಿಕ ನೆರವು ನೀಡುತ್ತದೆ.',
    government_level: 'Karnataka',
    category_id: '11111111-1111-1111-1111-111111111101',
    department_en: 'Backward Classes Welfare Department, Govt. of Karnataka',
    department_kn: 'ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'OBC / Cat-1 / SC / ST students studying at least 5km from native residence without hostel accommodation',
    target_beneficiaries_kn: 'ಹಾಸ್ಟೆಲ್ ಸೌಲಭ್ಯವಿಲ್ಲದ ಮತ್ತು ಕಾಲೇಜು 5 ಕಿಮೀಗಿಂತ ದೂರವಿರುವ ಒಬಿಸಿ / ಎಸ್‌ಸಿ / ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳು',
    benefits_en: '₹1,500 per month for 10 academic months (Total ₹15,000 per year) credited directly to student bank account.',
    benefits_kn: 'ಶೈಕ್ಷಣಿಕ ವರ್ಷದ 10 ತಿಂಗಳುಗಳ ಕಾಲ ಪ್ರತಿ ತಿಂಗಳು ₹1,500 (ಒಟ್ಟು ವಾರ್ಷಿಕ ₹15,000) ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಜಮೆ.',
    eligibility_summary_en: 'Karnataka resident; Belong to SC/ST or Backward Classes (Cat-1, 2A, 2B, 3A, 3B); Minimum 75% attendance; Family income up to ₹2.5 Lakhs (Cat-1) or ₹1 Lakh (Cat-2A/2B/3A/3B); Must not stay in government/free hostel.',
    eligibility_summary_kn: 'ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು; ಹಿಂದುಳಿದ ವರ್ಗ ಅಥವಾ ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿದವರಾಗಿರಬೇಕು; ಕನಿಷ್ಠ 75% ಹಾಜರಾತಿ ಇರಬೇಕು; ಕುಟುಂಬದ ಆದಾಯ ₹2.5 ಲಕ್ಷ ಅಥವಾ ₹1 ಲಕ್ಷದ ಒಳಗಿರಬೇಕು; ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್‌ನಲ್ಲಿ ಇರಬಾರದು.',
    application_procedure_en: '1. Apply through Karnataka SSP Portal.\n2. Select Vidyasiri Food & Accommodation module.\n3. Enter distance certificate and rent agreement if applicable.\n4. Verify biometric attendance via college portal.',
    application_procedure_kn: '1. ಕರ್ನಾಟಕ ಎಸ್‌ಎಸ್‌ಪಿ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.\n2. ವಿದ್ಯಾಸಿರಿ ಊಟ ಮತ್ತು ವಸತಿ ಆಯ್ಕೆ ಮಾಡಿ.\n3. ದೂರ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಬಾಡಿಗೆ ಕರಾರು ನಮೂದಿಸಿ.\n4. ಕಾಲೇಜು ಹಾಜರಾತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
    application_url: 'https://ssp.postmatric.karnataka.gov.in',
    official_source_url: 'https://bcwd.karnataka.gov.in',
    application_start_date: '2026-08-01',
    application_end_date: '2026-11-30',
    verification_status: 'verified',
    last_verified_at: '2026-11-02T11:00:00Z',
    is_featured: false
  },
  {
    id: '22222222-2222-2222-2222-222222222205',
    slug: 'karnataka-seva-sindhu-citizen-services',
    scheme_name_en: 'Seva Sindhu Citizen Certificate Services (Nadakacheri)',
    scheme_name_kn: 'ಸೇವಾ ಸಿಂಧು ನಾಗರಿಕ ಪ್ರಮಾಣಪತ್ರ ಸೇವೆಗಳು (ನಾಡಕಚೇರಿ)',
    short_description_en: 'Single digital window for digital issuance of Caste, Income, Residence, Birth and Death certificates across Karnataka.',
    short_description_kn: 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಜಾತಿ, ಆದಾಯ, ವಾಸಸ್ಥಳ, ಜನನ ಮತ್ತು ಮರಣ ಪ್ರಮಾಣಪತ್ರಗಳ ಡಿಜಿಟಲ್ ವಿತರಣೆಗೆ ಏಕೀಕೃತ ಡಿಜಿಟಲ್ ವೇದಿಕೆ.',
    description_en: 'Seva Sindhu is the flagship citizen service delivery portal of the Government of Karnataka under the Department of e-Governance. It provides tamper-proof, digitally signed certificates with RD numbers that integrate seamlessly with state welfare schemes and scholarships.',
    description_kn: 'ಸೇವಾ ಸಿಂಧು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಇ-ಆಡಳಿತ ಇಲಾಖೆಯ ಪ್ರಮುಖ ನಾಗರಿಕ ಸೇವಾ ವೇದಿಕೆಯಾಗಿದೆ. ಇದು ಆರ್‌ಡಿ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಡಿಜಿಟಲ್ ಸಹಿ ಮಾಡಿದ ಭದ್ರ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ನೀಡುತ್ತದೆ, ಇದು ರಾಜ್ಯ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಯೋಜನೆಗೊಳ್ಳುತ್ತದೆ.',
    government_level: 'Karnataka',
    category_id: '11111111-1111-1111-1111-111111111104',
    department_en: 'Department of Personnel and Administrative Reforms (e-Governance), Govt. of Karnataka',
    department_kn: 'ಸಿಬ್ಬಂದಿ ಮತ್ತು ಆಡಳಿತ ಸುಧಾರಣಾ ಇಲಾಖೆ (ಇ-ಆಡಳಿತ), ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'All citizens residing in Karnataka requiring official revenue and welfare certificates',
    target_beneficiaries_kn: 'ಅಧಿಕೃತ ಕಂದಾಯ ಮತ್ತು ಕಲ್ಯಾಣ ಪ್ರಮಾಣಪತ್ರಗಳ ಅಗತ್ಯವಿರುವ ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ನಾಗರಿಕರು',
    benefits_en: 'Legally valid digital certificates issued within statutory Sakala timeframes (typically 7 to 21 working days) directly downloadable via DigiLocker and Seva Sindhu.',
    benefits_kn: 'ಸಕಾಲ ಕಾಯಿದೆಯ ಮಿತಿಯೊಳಗೆ (7 ರಿಂದ 21 ದಿನಗಳು) ಕಾನೂನುಬದ್ಧ ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರಗಳು ಡಿಜಿಲಾಕರ್ ಮತ್ತು ಸೇವಾ ಸಿಂಧು ಮೂಲಕ ಲಭ್ಯ.',
    eligibility_summary_en: 'Resident of Karnataka; Valid Aadhaar and mobile number for OTP; Supporting local revenue documentation for verification by Revenue Inspector and Tahsildar.',
    eligibility_summary_kn: 'ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು; ಮಾನ್ಯ ಆಧಾರ್ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಇರಬೇಕು; ಕಂದಾಯ ಪರಿಶೀಲನೆಗೆ ಅಗತ್ಯ ದಾಖಲೆಗಳು ಇರಬೇಕು.',
    application_procedure_en: '1. Login to Seva Sindhu using Aadhaar OTP.\n2. Select desired Revenue/Welfare certificate (Income, Caste, Domicile, Agriculture).\n3. Fill applicant details and upload ration card or electricity bill.\n4. Pay nominal statutory fee (₹25-₹40) and track RD number status.',
    application_procedure_kn: '1. ಸೇವಾ ಸಿಂಧು ತಂತ್ರಾಂಶಕ್ಕೆ ಆಧಾರ್ ಒಟಿಪಿ ಬಳಸಿ ಲಾಗಿನ್ ಆಗಿ.\n2. ಅಗತ್ಯ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.\n3. ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.\n4. ಕನಿಷ್ಠ ಶುಲ್ಕ ಪಾವತಿಸಿ ಆರ್‌ಡಿ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
    application_url: 'https://sevasindhu.karnataka.gov.in',
    official_source_url: 'https://nadakacheri.karnataka.gov.in',
    application_start_date: '2026-01-01',
    application_end_date: '2026-12-31',
    verification_status: 'verified',
    last_verified_at: '2026-11-06T15:00:00Z',
    is_featured: false
  },
  {
    id: '22222222-2222-2222-2222-222222222206',
    slug: 'pm-kisan-samman-nidhi',
    scheme_name_en: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    scheme_name_kn: 'ಪಿಎಂ-ಕಿಸಾನ್ (ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ)',
    short_description_en: 'Income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.',
    short_description_kn: 'ಭಾರತದ ಎಲ್ಲಾ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ವರ್ಷಕ್ಕೆ ₹6,000 ಮೂರು ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ ಆದಾಯ ನೆರವು.',
    description_en: 'PM-KISAN is a Central Sector scheme with 100% funding from Government of India. Under the scheme, income support of ₹6,000/- per year in three equal installments of ₹2,000/- each is provided to all landholding farmer families to procure agricultural inputs and meet domestic needs.',
    description_kn: 'ಪಿಎಂ-ಕಿಸಾನ್ ಭಾರತ ಸರ್ಕಾರದ 100% ಆರ್ಥಿಕ ನೆರವಿನ ಕೇಂದ್ರ ವಲಯದ ಯೋಜನೆಯಾಗಿದೆ. ಈ ಯೋಜನೆಯಡಿ, ಎಲ್ಲಾ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ಕೃಷಿ ಪರಿಕರಗಳ ಖರೀದಿ ಮತ್ತು ಕುಟುಂಬ ಅಗತ್ಯಗಳಿಗಾಗಿ ವಾರ್ಷಿಕ ₹6,000 ಮೊತ್ತವನ್ನು ತಲಾ ₹2,000 ದ ಮೂರು ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ ನೀಡಲಾಗುತ್ತದೆ.',
    government_level: 'Central',
    category_id: '11111111-1111-1111-1111-111111111103',
    department_en: 'Ministry of Agriculture & Farmers Welfare, Government of India',
    department_kn: 'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'Small, marginal and all landholder farmer families with cultivable land in India',
    target_beneficiaries_kn: 'ಭಾರತದಲ್ಲಿ ಸಾಗುವಳಿ ಭೂಮಿ ಹೊಂದಿರುವ ಸಣ್ಣ, ಅತಿ ಸಣ್ಣ ಮತ್ತು ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳು',
    benefits_en: '₹6,000 annually credited directly in three equal installments of ₹2,000 every 4 months (April-July, August-November, December-March) via Aadhaar-linked DBT.',
    benefits_kn: 'ಪ್ರತಿ 4 ತಿಂಗಳಿಗೊಮ್ಮೆ ₹2,000 ರಂತೆ ವರ್ಷಕ್ಕೆ ಒಟ್ಟು ₹6,000 ನೇರವಾಗಿ ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ.',
    eligibility_summary_en: 'Farmer family having cultivable agricultural land registered in their name (Land Record/RTC); Institutional landholders, constitutional post holders, serving/retired government employees, and income tax payers are excluded.',
    eligibility_summary_kn: 'ತಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಸಾಗುವಳಿ ಭೂಮಿಯ ಪಹಣಿ/ಆರ್‌ಟಿಸಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬ; ಸಾಂಸ್ಥಿಕ ಭೂಮಾಲೀಕರು, ಸಾಂವಿಧಾನಿಕ ಹುದ್ದೆ ಹೊಂದಿರುವವರು ಮತ್ತು ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರನ್ನು ಹೊರತುಪಡಿಸಲಾಗಿದೆ.',
    application_procedure_en: '1. Visit PM-KISAN Portal (Farmers Corner) or nearest Common Service Center (CSC).\n2. Enter Aadhaar number and state land record details (Katha / Survey Number).\n3. Complete mandatory e-KYC using Aadhaar OTP or facial recognition on PM-KISAN App.',
    application_procedure_kn: '1. ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಹೊಸ ರೈತ ನೋಂದಣಿ ಆಯ್ಕೆಮಾಡಿ.\n2. ಆಧಾರ್ ಸಂಖ್ಯೆ ಮತ್ತು ಕೃಷಿ ಭೂಮಿಯ ಪಹಣಿ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.\n3. ಆಧಾರ್ ಒಟಿಪಿ ಅಥವಾ ಮುಖ ಗುರುತಿಸುವಿಕೆ ಮೂಲಕ ಕಡ್ಡಾಯ ಇ-ಕೆವೈಸಿ ಪೂರ್ಣಗೊಳಿಸಿ.',
    application_url: 'https://pmkisan.gov.in',
    official_source_url: 'https://pmkisan.gov.in',
    application_start_date: '2026-01-01',
    application_end_date: '2026-12-31',
    verification_status: 'verified',
    last_verified_at: '2026-11-09T08:30:00Z',
    is_featured: true
  },
  {
    id: '22222222-2222-2222-2222-222222222207',
    slug: 'pradhan-mantri-awas-yojana-gramin',
    scheme_name_en: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    scheme_name_kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ - ಗ್ರಾಮೀಣ (ಪಿಎಂಎವೈ-ಜಿ)',
    short_description_en: 'Financial grant of ₹1.20 Lakhs for constructing permanent pucca houses for homeless and kutcha-house rural families.',
    short_description_kn: 'ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ವಸತಿ ರಹಿತ ಮತ್ತು ಕಚ್ಚಾ ಮನೆಗಳಲ್ಲಿ ವಾಸಿಸುವ ಕುಟುಂಬಗಳಿಗೆ ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಿಸಲು ₹1.20 ಲಕ್ಷ ಆರ್ಥಿಕ ಅನುದಾನ.',
    description_en: 'PMAY-G aims to provide pucca houses with basic amenities (piped water, hygienic toilet, clean LPG cooking through Ujjwala, electricity) to all houseless households and those living in kutcha and dilapidated houses in rural areas of India, identified through SECC and Awaas+ surveys.',
    description_kn: 'ಪಿಎಂಎವೈ-ಜಿ ಯೋಜನೆಯು ಭಾರತದ ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಲ್ಲಿ ವಸತಿ ರಹಿತ ಹಾಗೂ ಕಚ್ಚಾ ಮತ್ತು ಶಿಥಿಲ ಮನೆಗಳಲ್ಲಿ ವಾಸಿಸುವ ಕುಟುಂಬಗಳಿಗೆ ಮೂಲಭೂತ ಸೌಕರ್ಯಗಳೊಂದಿಗೆ (ಕುಡಿಯುವ ನೀರು, ಶೌಚಾಲಯ, ವಿದ್ಯುತ್) ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಿಸಲು ಆರ್ಥಿಕ ನೆರವು ನೀಡುತ್ತದೆ.',
    government_level: 'Central',
    category_id: '11111111-1111-1111-1111-111111111102',
    department_en: 'Ministry of Rural Development, Government of India',
    department_kn: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'Houseless rural families and households residing in zero, one or two-room kutcha houses',
    target_beneficiaries_kn: 'ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ವಸತಿ ರಹಿತ ಕುಟುಂಬಗಳು ಮತ್ತು ಕಚ್ಚಾ ಮನೆಗಳಲ್ಲಿ ವಾಸಿಸುವವರು',
    benefits_en: 'Financial assistance of ₹1,20,000 in plain areas (₹1,30,000 in hilly/difficult areas) released in stages linked to geo-tagged construction progress, plus 90 days of unskilled labor wages under MGNREGA and ₹12,000 for toilet construction.',
    benefits_kn: 'ಮೈದಾನ ಪ್ರದೇಶಗಳಲ್ಲಿ ₹1,20,000 (ಗುಡ್ಡಗಾಡು ಪ್ರದೇಶಗಳಲ್ಲಿ ₹1,30,000) ಹಂತ-ಹಂತದ ಅನುದಾನ, ಜೊತೆಗೆ ಉದ್ಯೋಗ ಖಾತರಿ ಅಡಿಯಲ್ಲಿ 90 ದಿನಗಳ ಕೂಲಿ ಮತ್ತು ಶೌಚಾಲಯ ನಿರ್ಮಾಣಕ್ಕೆ ₹12,000.',
    eligibility_summary_en: 'Family must not own a pucca house anywhere in India; Must be listed in SECC 2011 / Awaas+ verified survey; Exclusion if owning motorized 3/4 wheeler, mechanized agricultural equipment, or family member is government employee.',
    eligibility_summary_kn: 'ಕುಟುಂಬವು ಭಾರತದಲ್ಲಿ ಎಲ್ಲಿಯೂ ಪಕ್ಕಾ ಮನೆ ಹೊಂದಿರಬಾರದು; ಗ್ರಾಮೀಣ ಪ್ರದೇಶದಲ್ಲಿ ಕಚ್ಚಾ ಮನೆ ಹೊಂದಿರಬೇಕು; ಕುಟುಂಬದಲ್ಲಿ ಯಾವುದೇ ಸರ್ಕಾರಿ ನೌಕರರು ಇರಬಾರದು.',
    application_procedure_en: '1. Verification of name in Gram Panchayat Awaas+ priority list.\n2. Gram Sabha approval and geo-tagging of existing kutcha structure by Panchayat Officer.\n3. DBT bank sanction and installment releases upon geo-tagged photo verification at plinth, lintel, and roof stages.',
    application_procedure_kn: '1. ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯ ಆವಾಸ್+ ಆದ್ಯತಾ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ಪರಿಶೀಲಿಸಿ.\n2. ಗ್ರಾಮ ಸಭೆಯ ಅನುಮೋದನೆ ಮತ್ತು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಕಚ್ಚಾ ಮನೆಯ ಜಿಯೋ-ಟ್ಯಾಗಿಂಗ್.\n3. ತಳಪಾಯ, ಲಿಂಟಲ್ ಮತ್ತು ಮೇಲ್ಛಾವಣಿ ಹಂತಗಳ ಜಿಯೋ-ಟ್ಯಾಗ್ ಪರಿಶೀಲನೆಯ ನಂತರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಕಂತುಗಳ ಬಿಡುಗಡೆ.',
    application_url: 'https://pmayg.nic.in',
    official_source_url: 'https://pmayg.nic.in',
    application_start_date: '2026-01-01',
    application_end_date: '2026-12-31',
    verification_status: 'verified',
    last_verified_at: '2026-11-04T12:00:00Z',
    is_featured: true
  },
  {
    id: '22222222-2222-2222-2222-222222222208',
    slug: 'national-means-cum-merit-scholarship',
    scheme_name_en: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
    scheme_name_kn: 'ರಾಷ್ಟ್ರೀಯ ಮೀನ್ಸ್-ಕಮ್-ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆ (ಎನ್‌ಎಂಎಂಎಸ್‌ಎಸ್)',
    short_description_en: 'Scholarship of ₹12,000 per year (₹1,000/month) to meritorious students of economically weaker sections from Class IX to XII.',
    short_description_kn: 'ಆರ್ಥಿಕವಾಗಿ ಹಿಂದುಳಿದ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ 9 ರಿಂದ 12 ನೇ ತರಗತಿಯವರೆಗೆ ವರ್ಷಕ್ಕೆ ₹12,000 (ಮಾಸಿಕ ₹1,000) ವಿದ್ಯಾರ್ಥಿವೇತನ.',
    description_en: 'The centrally sponsored National Means-cum-Merit Scholarship Scheme awards 1,00,000 scholarships annually to meritorious students whose parental income is not more than ₹3.5 Lakhs, helping reduce dropouts after Class VIII and encouraging continuation of secondary education.',
    description_kn: 'ಕೇಂದ್ರ ಪುರಸ್ಕೃತ ರಾಷ್ಟ್ರೀಯ ಮೀನ್ಸ್-ಕಮ್-ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಯು 8ನೇ ತರಗತಿಯ ನಂತರ ಶಾಲೆ ಬಿಡುವುದನ್ನು ತಡೆಗಟ್ಟಲು ಮತ್ತು ಪ್ರೌಢ ಶಿಕ್ಷಣವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಲು ವಾರ್ಷಿಕ ₹3.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ಆದಾಯವಿರುವ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪ್ರತಿ ವರ್ಷ 1,00,000 ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ನೀಡುತ್ತದೆ.',
    government_level: 'Central',
    category_id: '11111111-1111-1111-1111-111111111101',
    department_en: 'Department of School Education & Literacy, Ministry of Education, Govt. of India',
    department_kn: 'ಶಾಲಾ ಶಿಕ್ಷಣ ಮತ್ತು ಸಾಕ್ಷರತಾ ಇಲಾಖೆ, ಶಿಕ್ಷಣ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'Meritorious students studying in Class 9-12 in Government, Local Body and Government-aided schools',
    target_beneficiaries_kn: 'ಸರ್ಕಾರಿ, ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ ಮತ್ತು ಅನುದಾನಿತ ಶಾಲೆಗಳಲ್ಲಿ 9 ರಿಂದ 12 ನೇ ತರಗತಿ ಓದುತ್ತಿರುವ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳು',
    benefits_en: '₹12,000 per annum (₹1,000 per month) disbursed directly through State Bank of India into the student account through National Scholarship Portal (NSP).',
    benefits_kn: 'ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (ಎನ್‌ಎಸ್‌ಪಿ) ಮೂಲಕ ವಿದ್ಯಾರ್ಥಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ವಾರ್ಷಿಕ ₹12,000 (ಮಾಸಿಕ ₹1,000) ನೇರ ಜಮೆ.',
    eligibility_summary_en: 'Passed Class VII with minimum 55% marks (50% for SC/ST); Studying in regular Government or aided school; Family annual income from all sources not exceeding ₹3,50,000; Must qualify State-level NMMS selection test.',
    eligibility_summary_kn: '7ನೇ ತರಗತಿಯಲ್ಲಿ ಕನಿಷ್ಠ 55% ಅಂಕ (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿಗೆ 50%); ಸರ್ಕಾರಿ ಅಥವಾ ಅನುದಾನಿತ ಶಾಲೆಯಲ್ಲಿ ಓದುತ್ತಿರಬೇಕು; ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹3,50,000 ಮೀರಬಾರದು; ರಾಜ್ಯ ಮಟ್ಟದ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಉತ್ತೀರ್ಣರಾಗಬೇಕು.',
    application_procedure_en: '1. Appear for State Level NMMS Selection Exam conducted by DSERT Karnataka.\n2. Upon clearing test, register on National Scholarship Portal (scholarships.gov.in).\n3. Complete Aadhaar e-KYC and submit institutional verification.',
    application_procedure_kn: '1. ಡಿಎಸ್‌ಇಆರ್‌ಟಿ ಕರ್ನಾಟಕ ನಡೆಸುವ ಎನ್‌ಎಂಎಂಎಸ್ ಪರೀಕ್ಷೆಗೆ ಹಾಜರಾಗಿ ಉತ್ತೀರ್ಣರಾಗಿ.\n2. ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ (scholarships.gov.in) ನೋಂದಾಯಿಸಿ.\n3. ಆಧಾರ್ ಇ-ಕೆವೈಸಿ ಮತ್ತು ಶಾಲಾ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಳಿಸಿ.',
    application_url: 'https://scholarships.gov.in',
    official_source_url: 'https://www.education.gov.in',
    application_start_date: '2026-07-01',
    application_end_date: '2026-11-15',
    verification_status: 'verified',
    last_verified_at: '2026-11-03T16:00:00Z',
    is_featured: false
  },
  {
    id: '22222222-2222-2222-2222-222222222209',
    slug: 'pradhan-mantri-mudra-yojana',
    scheme_name_en: 'Pradhan Mantri Mudra Yojana (PMMY)',
    scheme_name_kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಮುದ್ರಾ ಯೋಜನೆ (ಪಿಎಂಎಂವೈ)',
    short_description_en: 'Collateral-free business loans up to ₹10 Lakhs (Shishu, Kishore, Tarun) for non-farm micro and small enterprises.',
    short_description_kn: 'ಕೃಷಿಯೇತರ ಸಣ್ಣ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಉದ್ಯಮಗಳಿಗೆ ₹10 ಲಕ್ಷದವರೆಗೆ ಯಾವುದೇ ಆಧಾರವಿಲ್ಲದ (ಕೊಲ್ಯಾಟರಲ್-ಮುಕ್ತ) ಸಾಲಗಳು.',
    description_en: 'PMMY promotes micro-enterprises and entrepreneurship across India by enabling access to affordable institutional credit without collateral security for manufacturing, trading, and service sector micro units under three categories: Shishu (loans up to ₹50,000), Kishore (loans ₹50,001 to ₹5 Lakhs), and Tarun (loans ₹5,00,001 to ₹10 Lakhs).',
    description_kn: 'ಪಿಎಂಎಂವೈ ಯೋಜನೆಯು ಉತ್ಪಾದನೆ, ವ್ಯಾಪಾರ ಮತ್ತು ಸೇವಾ ವಲಯದ ಸೂಕ್ಷ್ಮ ಘಟಕಗಳಿಗೆ ಯಾವುದೇ ಭದ್ರತೆಯಿಲ್ಲದೆ ಕೈಗೆಟುಕುವ ಸಾಲವನ್ನು ಒದಗಿಸುತ್ತದೆ: ಶಿಶು (₹50,000 ವರೆಗೆ), ಕಿಶೋರ್ (₹50,001 ರಿಂದ ₹5 ಲಕ್ಷದವರೆಗೆ), ಮತ್ತು ತರುಣ್ (₹5,00,001 ರಿಂದ ₹10 ಲಕ್ಷದವರೆಗೆ).',
    government_level: 'Central',
    category_id: '11111111-1111-1111-1111-111111111103',
    department_en: 'Department of Financial Services, Ministry of Finance, Govt. of India',
    department_kn: 'ಹಣಕಾಸು ಸೇವೆಗಳ ಇಲಾಖೆ, ಹಣಕಾಸು ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'Small business owners, shopkeepers, artisans, manufacturers, women entrepreneurs, startups',
    target_beneficiaries_kn: 'ಸಣ್ಣ ವ್ಯಾಪಾರಿಗಳು, ಅಂಗಡಿಕಾರರು, ಕುಶಲಕರ್ಮಿಗಳು, ಮಹಿಳಾ ಉದ್ಯಮಿಗಳು, ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳು',
    benefits_en: 'Collateral-free loans up to ₹10,00,000 at competitive interest rates with Mudra Card for working capital overdraft needs.',
    benefits_kn: 'ಕಾರ್ಯನಿರತ ಬಂಡವಾಳ ಮತ್ತು ವ್ಯಾಪಾರ ವಿಸ್ತರಣೆಗೆ ಸ್ಪರ್ಧಾತ್ಮಕ ಬಡ್ಡಿದರದಲ್ಲಿ ₹10 ಲಕ್ಷದವರೆಗೆ ಜಾಮೀನು ರಹಿತ ಸಾಲ.',
    eligibility_summary_en: 'Indian citizen aged 18+; Having a viable business plan for non-farm income generating activity; Must not be a defaulter with any financial institution.',
    eligibility_summary_kn: '18 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಭಾರತೀಯ ಪ್ರಜೆ; ಕೃಷಿಯೇತರ ಆದಾಯ ನೀಡುವ ವ್ಯವಹಾರ ಯೋಜನೆ ಹೊಂದಿರಬೇಕು; ಯಾವುದೇ ಬ್ಯಾಂಕಿನಲ್ಲಿ ಸಾಲ ಮರುಪಾವತಿ ಸುಸ್ತಿದಾರರಾಗಿರಬಾರದು.',
    application_procedure_en: '1. Prepare business proposal and quotations for machinery/inventory.\n2. Apply online through Udyamimitra portal or approach any scheduled commercial bank or RRB.\n3. Submit KYC, business address proof and last 6 months bank statement.',
    application_procedure_kn: '1. ವ್ಯವಹಾರ ಯೋಜನೆ ಮತ್ತು ಯಂತ್ರೋಪಕರಣಗಳ ಕೊಟೇಶನ್ ತಯಾರಿಸಿ.\n2. ಉದ್ಯಮಿ ಮಿತ್ರ (udyamimitra.in) ಪೋರ್ಟಲ್ ಮೂಲಕ ಅಥವಾ ಯಾವುದೇ ಬ್ಯಾಂಕಿನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.\n3. ಕೆವೈಸಿ ಮತ್ತು ವ್ಯಾಪಾರದ ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಿ.',
    application_url: 'https://www.mudra.org.in',
    official_source_url: 'https://www.udyamimitra.in',
    application_start_date: '2026-01-01',
    application_end_date: '2026-12-31',
    verification_status: 'verified',
    last_verified_at: '2026-11-07T13:00:00Z',
    is_featured: true
  },
  {
    id: '22222222-2222-2222-2222-222222222210',
    slug: 'atal-pension-yojana',
    scheme_name_en: 'Atal Pension Yojana (APY)',
    scheme_name_kn: 'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ (ಎಪಿವೈ)',
    short_description_en: 'Government guaranteed monthly pension of ₹1,000 to ₹5,000 for unorganized sector workers after attaining 60 years of age.',
    short_description_kn: 'ಅಸಂಘಟಿತ ವಲಯದ ಕಾರ್ಮಿಕರಿಗೆ 60 ವರ್ಷ ತುಂಬಿದ ನಂತರ ತಿಂಗಳಿಗೆ ₹1,000 ರಿಂದ ₹5,000 ವರೆಗೆ ಸರ್ಕಾರದ ಖಾತರಿಯ ಮಾಸಿಕ ಪಿಂಚಣಿ.',
    description_en: 'Atal Pension Yojana is a social security scheme administered by PFRDA aimed at creating a universal social security net for all Indians, especially workers in the unorganized sector. Subscribers contribute small monthly savings between ages 18 and 40 to receive a guaranteed minimum monthly pension from age 60.',
    description_kn: 'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆಯು ಅಸಂಘಟಿತ ವಲಯದ ಕಾರ್ಮಿಕರಿಗೆ ವೃದ್ಧಾಪ್ಯ ಭದ್ರತೆ ಒದಗಿಸಲು ಪಿಎಫ್‌ಆರ್‌ಡಿಎ ನಿರ್ವಹಿಸುವ ಸಾಮಾಜಿಕ ಭದ್ರತಾ ಯೋಜನೆಯಾಗಿದೆ. 18 ರಿಂದ 40 ವರ್ಷ ವಯಸ್ಸಿನ ಚಂದಾದಾರರು ಸಣ್ಣ ಮಾಸಿಕ ಉಳಿತಾಯ ಮಾಡುವ ಮೂಲಕ 60 ವರ್ಷದ ನಂತರ ಮಾಸಿಕ ಖಚಿತ ಪಿಂಚಣಿ ಪಡೆಯಬಹುದು.',
    government_level: 'Central',
    category_id: '11111111-1111-1111-1111-111111111103',
    department_en: 'Pension Fund Regulatory and Development Authority (PFRDA) / Ministry of Finance',
    department_kn: 'ಪಿಎಫ್‌ಆರ್‌ಡಿಎ / ಹಣಕಾಸು ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    target_beneficiaries_en: 'All Indian citizens in the unorganized sector aged between 18 and 40 years',
    target_beneficiaries_kn: '18 ರಿಂದ 40 ವರ್ಷ ವಯಸ್ಸಿನ ಅಸಂಘಟಿತ ವಲಯದಲ್ಲಿ ಕೆಲಸ ಮಾಡುವ ಎಲ್ಲಾ ಭಾರತೀಯ ನಾಗರಿಕರು',
    benefits_en: 'Guaranteed lifelong monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 post 60; Same pension continues to spouse upon death; Return of accumulated pension corpus to nominee.',
    benefits_kn: '60 ವರ್ಷದ ನಂತರ ₹1,000 ದಿಂದ ₹5,000 ವರೆಗೆ ಆಜೀವ ಮಾಸಿಕ ಪಿಂಚಣಿ; ನಿಧನದ ನಂತರ ಸಂಗಾತಿಗೆ ಪಿಂಚಣಿ ಮುಂದುವರಿಕೆ; ನಾಮಿನಿಗೆ ಸಂಪೂರ್ಣ ಠೇವಣಿ ಮೊತ್ತ ವಾಪಸ್.',
    eligibility_summary_en: 'Citizen of India; Age between 18 and 40 years; Possess an active savings bank or post office account; Not an income taxpayer as per current scheme rules.',
    eligibility_summary_kn: 'ಭಾರತೀಯ ಪ್ರಜೆ; 18 ರಿಂದ 40 ವರ್ಷ ವಯೋಮಿತಿ; ಸಕ್ರಿಯ ಉಳಿತಾಯ ಬ್ಯಾಂಕ್ ಖಾತೆ ಹೊಂದಿರಬೇಕು; ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರಾಗಿರಬಾರದು.',
    application_procedure_en: '1. Approach your bank branch or use Internet Banking / mobile banking.\n2. Fill APY registration form with nominee details.\n3. Authorize monthly auto-debit from savings account.',
    application_procedure_kn: '1. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಬಳಸಿ.\n2. ನಾಮಿನಿ ವಿವರಗಳೊಂದಿಗೆ ಎಪಿವೈ ಅರ್ಜಿ ಭರ್ತಿ ಮಾಡಿ.\n3. ಉಳಿತಾಯ ಖಾತೆಯಿಂದ ಮಾಸಿಕ ಸ್ವಯಂ-ಕಡಿತಕ್ಕೆ ಅನುಮತಿ ನೀಡಿ.',
    application_url: 'https://www.npscra.nsdl.co.in',
    official_source_url: 'https://www.pfrda.org.in',
    application_start_date: '2026-01-01',
    application_end_date: '2026-12-31',
    verification_status: 'verified',
    last_verified_at: '2026-11-01T10:00:00Z',
    is_featured: false
  }
];

export const INITIAL_RULES = [
  // SSP
  {
    id: '33333333-3333-3333-3333-333333333301',
    scheme_id: '22222222-2222-2222-2222-222222222201',
    field_name: 'state',
    operator: 'equals',
    expected_value: 'Karnataka',
    is_mandatory: true,
    rule_description_en: 'Applicant must be a resident of Karnataka State',
    rule_description_kn: 'ಅರ್ಜಿದಾರರು ಕರ್ನಾಟಕ ರಾಜ್ಯದ ನಿವಾಸಿಯಾಗಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333302',
    scheme_id: '22222222-2222-2222-2222-222222222201',
    field_name: 'education',
    operator: 'in',
    expected_value: ['Higher Secondary (11-12/PUC)', 'Diploma', 'Undergraduate Degree', 'Postgraduate Degree', 'Doctorate/PhD'],
    is_mandatory: true,
    rule_description_en: 'Must be pursuing post-matric studies',
    rule_description_kn: 'ಮೆಟ್ರಿಕ್ ನಂತರದ ಕೋರ್ಸ್ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333303',
    scheme_id: '22222222-2222-2222-2222-222222222201',
    field_name: 'annual_income',
    operator: 'less_than_or_equal',
    expected_value: 250000,
    is_mandatory: true,
    rule_description_en: 'Annual family income must not exceed ₹2,50,000',
    rule_description_kn: 'ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹2.5 ಲಕ್ಷ ಮೀರಬಾರದು'
  },

  // Yuva Nidhi
  {
    id: '33333333-3333-3333-3333-333333333304',
    scheme_id: '22222222-2222-2222-2222-222222222202',
    field_name: 'state',
    operator: 'equals',
    expected_value: 'Karnataka',
    is_mandatory: true,
    rule_description_en: 'Must have Karnataka domicile for at least 6 years',
    rule_description_kn: 'ಕನಿಷ್ಠ 6 ವರ್ಷ ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಸ್ಥಳ ಹೊಂದಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333305',
    scheme_id: '22222222-2222-2222-2222-222222222202',
    field_name: 'education',
    operator: 'in',
    expected_value: ['Diploma', 'Undergraduate Degree', 'Postgraduate Degree'],
    is_mandatory: true,
    rule_description_en: 'Must have completed a Degree or Diploma',
    rule_description_kn: 'ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ ಪೂರ್ಣಗೊಳಿಸಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333306',
    scheme_id: '22222222-2222-2222-2222-222222222202',
    field_name: 'occupation',
    operator: 'equals',
    expected_value: 'Unemployed',
    is_mandatory: true,
    rule_description_en: 'Must be currently unemployed and not in higher studies',
    rule_description_kn: 'ಪ್ರಸ್ತುತ ನಿರುದ್ಯೋಗಿಯಾಗಿರಬೇಕು ಮತ್ತು ಉನ್ನತ ವ್ಯಾಸಂಗದಲ್ಲಿರಬಾರದು'
  },
  {
    id: '33333333-3333-3333-3333-333333333307',
    scheme_id: '22222222-2222-2222-2222-222222222202',
    field_name: 'age',
    operator: 'less_than_or_equal',
    expected_value: 35,
    is_mandatory: false,
    rule_description_en: 'Recommended age range is under 35 years',
    rule_description_kn: 'ವಯಸ್ಸು 35 ವರ್ಷದೊಳಗಿರಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ'
  },

  // Gruha Lakshmi
  {
    id: '33333333-3333-3333-3333-333333333308',
    scheme_id: '22222222-2222-2222-2222-222222222203',
    field_name: 'state',
    operator: 'equals',
    expected_value: 'Karnataka',
    is_mandatory: true,
    rule_description_en: 'Applicant must be domiciled in Karnataka',
    rule_description_kn: 'ಅರ್ಜಿದಾರರು ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333309',
    scheme_id: '22222222-2222-2222-2222-222222222203',
    field_name: 'gender',
    operator: 'equals',
    expected_value: 'Female',
    is_mandatory: true,
    rule_description_en: 'Only female head of the household is eligible',
    rule_description_kn: 'ಮನೆಯ ಮುಖ್ಯಸ್ಥೆ ಮಹಿಳೆ ಮಾತ್ರ ಅರ್ಹರು'
  },
  {
    id: '33333333-3333-3333-3333-333333333310',
    scheme_id: '22222222-2222-2222-2222-222222222203',
    field_name: 'age',
    operator: 'greater_than_or_equal',
    expected_value: 18,
    is_mandatory: true,
    rule_description_en: 'Must be at least 18 years of age',
    rule_description_kn: 'ಕನಿಷ್ಠ 18 ವರ್ಷ ವಯಸ್ಸಾಗಿರಬೇಕು'
  },

  // Vidyasiri
  {
    id: '33333333-3333-3333-3333-333333333311',
    scheme_id: '22222222-2222-2222-2222-222222222204',
    field_name: 'state',
    operator: 'equals',
    expected_value: 'Karnataka',
    is_mandatory: true,
    rule_description_en: 'Applicant must be a permanent resident of Karnataka',
    rule_description_kn: 'ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333312',
    scheme_id: '22222222-2222-2222-2222-222222222204',
    field_name: 'education',
    operator: 'in',
    expected_value: ['Higher Secondary (11-12/PUC)', 'Diploma', 'Undergraduate Degree', 'Postgraduate Degree'],
    is_mandatory: true,
    rule_description_en: 'Pursuing post-matric courses away from home',
    rule_description_kn: 'ಸ್ವಂತ ಊರಿನಿಂದ ದೂರದಲ್ಲಿ ಮೆಟ್ರಿಕ್ ನಂತರದ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333313',
    scheme_id: '22222222-2222-2222-2222-222222222204',
    field_name: 'annual_income',
    operator: 'less_than_or_equal',
    expected_value: 250000,
    is_mandatory: true,
    rule_description_en: 'Annual family income must not exceed ₹2.5 Lakhs',
    rule_description_kn: 'ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹2.5 ಲಕ್ಷ ಮೀರಬಾರದು'
  },

  // Seva Sindhu
  {
    id: '33333333-3333-3333-3333-333333333314',
    scheme_id: '22222222-2222-2222-2222-222222222205',
    field_name: 'state',
    operator: 'equals',
    expected_value: 'Karnataka',
    is_mandatory: true,
    rule_description_en: 'Applicant must reside in Karnataka',
    rule_description_kn: 'ಅರ್ಜಿದಾರರು ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸುತ್ತಿರಬೇಕು'
  },

  // PM-KISAN
  {
    id: '33333333-3333-3333-3333-333333333315',
    scheme_id: '22222222-2222-2222-2222-222222222206',
    field_name: 'occupation',
    operator: 'equals',
    expected_value: 'Farmer / Cultivator',
    is_mandatory: true,
    rule_description_en: 'Must be an active cultivator with landholding in family',
    rule_description_kn: 'ಕುಟುಂಬದಲ್ಲಿ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಕೃಷಿಕರಾಗಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333316',
    scheme_id: '22222222-2222-2222-2222-222222222206',
    field_name: 'age',
    operator: 'greater_than_or_equal',
    expected_value: 18,
    is_mandatory: true,
    rule_description_en: 'Applicant must be an adult aged 18 or above',
    rule_description_kn: 'ಕನಿಷ್ಠ 18 ವರ್ಷ ತುಂಬಿರಬೇಕು'
  },

  // PMAY-G
  {
    id: '33333333-3333-3333-3333-333333333317',
    scheme_id: '22222222-2222-2222-2222-222222222207',
    field_name: 'age',
    operator: 'greater_than_or_equal',
    expected_value: 18,
    is_mandatory: true,
    rule_description_en: 'Head of household must be an adult',
    rule_description_kn: 'ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರು ವಯಸ್ಕರಾಗಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333318',
    scheme_id: '22222222-2222-2222-2222-222222222207',
    field_name: 'annual_income',
    operator: 'less_than_or_equal',
    expected_value: 300000,
    is_mandatory: true,
    rule_description_en: 'Must be in low-income or BPL category',
    rule_description_kn: 'ಕಡಿಮೆ ಆದಾಯ ಅಥವಾ ಬಿಪಿಎಲ್ ವರ್ಗಕ್ಕೆ ಸೇರಿರಬೇಕು'
  },

  // NMMSS
  {
    id: '33333333-3333-3333-3333-333333333319',
    scheme_id: '22222222-2222-2222-2222-222222222208',
    field_name: 'education',
    operator: 'in',
    expected_value: ['Secondary School (Class 9-10)', 'Higher Secondary (11-12/PUC)'],
    is_mandatory: true,
    rule_description_en: 'Must be enrolled in Class IX, X, XI, or XII',
    rule_description_kn: '9, 10, 11 ಅಥವಾ 12 ನೇ ತರಗತಿಯಲ್ಲಿ ಓದುತ್ತಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333320',
    scheme_id: '22222222-2222-2222-2222-222222222208',
    field_name: 'annual_income',
    operator: 'less_than_or_equal',
    expected_value: 350000,
    is_mandatory: true,
    rule_description_en: 'Parental annual income from all sources must be within ₹3,50,000',
    rule_description_kn: 'ಪೋಷಕರ ವಾರ್ಷಿಕ ಆದಾಯ ₹3,50,000 ಮೀರಬಾರದು'
  },
  {
    id: '33333333-3333-3333-3333-333333333321',
    scheme_id: '22222222-2222-2222-2222-222222222208',
    field_name: 'age',
    operator: 'less_than_or_equal',
    expected_value: 19,
    is_mandatory: true,
    rule_description_en: 'School student typically below 19 years old',
    rule_description_kn: 'ಶಾಲಾ ವಿದ್ಯಾರ್ಥಿ 19 ವರ್ಷದೊಳಗಿರಬೇಕು'
  },

  // PM Mudra
  {
    id: '33333333-3333-3333-3333-333333333322',
    scheme_id: '22222222-2222-2222-2222-222222222209',
    field_name: 'age',
    operator: 'greater_than_or_equal',
    expected_value: 18,
    is_mandatory: true,
    rule_description_en: 'Applicant must be an adult (18+ years)',
    rule_description_kn: 'ಕನಿಷ್ಠ 18 ವರ್ಷ ವಯಸ್ಸಾಗಿರಬೇಕು'
  },
  {
    id: '33333333-3333-3333-3333-333333333323',
    scheme_id: '22222222-2222-2222-2222-222222222209',
    field_name: 'occupation',
    operator: 'in',
    expected_value: ['Self-Employed / Business', 'Artisan / Small Vendor', 'Unemployed'],
    is_mandatory: true,
    rule_description_en: 'Operating or launching a micro enterprise or self-employment',
    rule_description_kn: 'ಸ್ವಯಂ ಉದ್ಯೋಗ ಅಥವಾ ಸಣ್ಣ ವ್ಯಾಪಾರ ನಡೆಸುತ್ತಿರಬೇಕು'
  },

  // APY
  {
    id: '33333333-3333-3333-3333-333333333324',
    scheme_id: '22222222-2222-2222-2222-222222222210',
    field_name: 'age',
    operator: 'greater_than_or_equal',
    expected_value: 18,
    is_mandatory: true,
    rule_description_en: 'Minimum entry age is 18 years',
    rule_description_kn: 'ಕನಿಷ್ಠ ವಯಸ್ಸು 18 ವರ್ಷ'
  },
  {
    id: '33333333-3333-3333-3333-333333333325',
    scheme_id: '22222222-2222-2222-2222-222222222210',
    field_name: 'age',
    operator: 'less_than_or_equal',
    expected_value: 40,
    is_mandatory: true,
    rule_description_en: 'Maximum entry age is 40 years',
    rule_description_kn: 'ಗರಿಷ್ಠ ವಯಸ್ಸು 40 ವರ್ಷ'
  }
];

export const INITIAL_DOCUMENTS = [
  // SSP
  {
    id: '44444444-4444-4444-4444-444444444401',
    scheme_id: '22222222-2222-2222-2222-222222222201',
    document_name_en: 'Aadhaar Card (Aadhaar Seeding with Bank)',
    document_name_kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ (ಬ್ಯಾಂಕ್ ಜೋಡಣೆ)',
    is_mandatory: true,
    description_en: 'Used for identity and Direct Benefit Transfer authentication',
    description_kn: 'ಗುರುತು ಮತ್ತು ಡಿಬಿಟಿ ನಗದು ವರ್ಗಾವಣೆಗೆ'
  },
  {
    id: '44444444-4444-4444-4444-444444444402',
    scheme_id: '22222222-2222-2222-2222-222222222201',
    document_name_en: 'Caste and Income Certificate (RD Number)',
    document_name_kn: 'ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (ಆರ್‌ಡಿ ಸಂಖ್ಯೆ)',
    is_mandatory: true,
    description_en: 'Issued by Nadakacheri revenue department',
    description_kn: 'ನಾಡಕಚೇರಿಯಿಂದ ನೀಡಲಾದ ಪ್ರಮಾಣಪತ್ರ'
  },
  {
    id: '44444444-4444-4444-4444-444444444403',
    scheme_id: '22222222-2222-2222-2222-222222222201',
    document_name_en: 'College Admission Receipt / Bonafide Certificate',
    document_name_kn: 'ಕಾಲೇಜು ಪ್ರವೇಶ ರಸೀದಿ / ವ್ಯಾಸಂಗ ದೃಢೀಕರಣ',
    is_mandatory: true,
    description_en: 'Verification of college enrollment and fee structure',
    description_kn: 'ಕಾಲೇಜು ಪ್ರವೇಶ ಮತ್ತು ಶುಲ್ಕ ಪರಿಶೀಲನೆ'
  },
  {
    id: '44444444-4444-4444-4444-444444444404',
    scheme_id: '22222222-2222-2222-2222-222222222201',
    document_name_en: 'SSLC / Previous Exam Marksheet',
    document_name_kn: 'ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ / ಹಿಂದಿನ ತರಗತಿಯ ಅಂಕಪಟ್ಟಿ',
    is_mandatory: true,
    description_en: 'Academic performance and eligibility verification',
    description_kn: 'ಶೈಕ್ಷಣಿಕ ಅಂಕಗಳ ಪರಿಶೀಲನೆಗೆ'
  },

  // Yuva Nidhi
  {
    id: '44444444-4444-4444-4444-444444444405',
    scheme_id: '22222222-2222-2222-2222-222222222202',
    document_name_en: 'Aadhaar Card',
    document_name_kn: 'ಆಧಾರ್ ಕಾರ್ಡ್',
    is_mandatory: true,
    description_en: 'Personal identification and address verification',
    description_kn: 'ವೈಯಕ್ತಿಕ ಗುರುತು ಮತ್ತು ವಿಳಾಸ ಪರಿಶೀಲನೆ'
  },
  {
    id: '44444444-4444-4444-4444-444444444406',
    scheme_id: '22222222-2222-2222-2222-222222222202',
    document_name_en: 'Karnataka Domicile / 6-Year Study Certificate',
    document_name_kn: 'ಕರ್ನಾಟಕ ವಾಸಸ್ಥಳ / 6 ವರ್ಷಗಳ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣಪತ್ರ',
    is_mandatory: true,
    description_en: 'Proof of study or domicile in Karnataka for 6 years',
    description_kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ 6 ವರ್ಷ ಅಧ್ಯಯನ ಮಾಡಿದ ಪುರಾವೆ'
  },
  {
    id: '44444444-4444-4444-4444-444444444407',
    scheme_id: '22222222-2222-2222-2222-222222222202',
    document_name_en: 'Degree / Diploma Passing Certificate & Marks Cards',
    document_name_kn: 'ಪದವಿ / ಡಿಪ್ಲೊಮಾ ಉತ್ತೀರ್ಣ ಪ್ರಮಾಣಪತ್ರ',
    is_mandatory: true,
    description_en: 'Documenting year of graduation and qualifying status',
    description_kn: 'ಪದವಿ ಪೂರ್ಣಗೊಳಿಸಿದ ವರ್ಷದ ಪುರಾವೆ'
  },

  // Gruha Lakshmi
  {
    id: '44444444-4444-4444-4444-444444444408',
    scheme_id: '22222222-2222-2222-2222-222222222203',
    document_name_en: 'Karnataka Ration Card (BPL / Antyodaya / APL)',
    document_name_kn: 'ಪಡಿತರ ಚೀಟಿ (ಬಿಪಿಎಲ್ / ಅಂತ್ಯೋದಯ / ಎಪಿಎಲ್)',
    is_mandatory: true,
    description_en: 'Showing woman as head of household',
    description_kn: 'ಮಹಿಳೆ ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥೆಯಾಗಿರುವ ದಾಖಲೆ'
  },
  {
    id: '44444444-4444-4444-4444-444444444409',
    scheme_id: '22222222-2222-2222-2222-222222222203',
    document_name_en: 'Aadhaar Card of Woman and Spouse',
    document_name_kn: 'ಮಹಿಳೆ ಮತ್ತು ಪತಿಯ ಆಧಾರ್ ಕಾರ್ಡ್',
    is_mandatory: true,
    description_en: 'Identity and marital verification',
    description_kn: 'ಗುರುತಿನ ಪರಿಶೀಲನೆಗೆ'
  },

  // PM-KISAN
  {
    id: '44444444-4444-4444-4444-444444444410',
    scheme_id: '22222222-2222-2222-2222-222222222206',
    document_name_en: 'Aadhaar Card',
    document_name_kn: 'ಆಧಾರ್ ಕಾರ್ಡ್',
    is_mandatory: true,
    description_en: 'Mandatory for e-KYC',
    description_kn: 'ಇ-ಕೆವೈಸಿ ಪರಿಶೀಲನೆಗೆ ಕಡ್ಡಾಯ'
  },
  {
    id: '44444444-4444-4444-4444-444444444411',
    scheme_id: '22222222-2222-2222-2222-222222222206',
    document_name_en: 'Land Record / RTC (Pahani) Document',
    document_name_kn: 'ಕೃಷಿ ಭೂಮಿಯ ಪಹಣಿ / ಆರ್‌ಟಿಸಿ',
    is_mandatory: true,
    description_en: 'Proof of cultivable land ownership in applicant name',
    description_kn: 'ಅರ್ಜಿದಾರರ ಹೆಸರಿನಲ್ಲಿ ಕೃಷಿ ಭೂಮಿ ಮಾಲೀಕತ್ವದ ಪುರಾವೆ'
  }
];
