-- ====================================================================
-- JANSEVA SEED DATA: 03_seed_data.sql / seed.sql
-- High-Quality Real Government Schemes from Karnataka & Central India
-- ====================================================================

-- 1. Insert Categories
INSERT INTO categories (id, slug, name_en, name_kn, description_en, description_kn, icon, display_order)
VALUES 
  ('11111111-1111-1111-1111-111111111101', 'scholarships', 'Scholarships', 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು', 'Financial support for school, college, technical and higher education students.', 'ಶಾಲೆ, ಕಾಲೇಜು, ತಾಂತ್ರಿಕ ಮತ್ತು ಉನ್ನತ ಶಿಕ್ಷಣದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆರ್ಥಿಕ ನೆರವು.', 'GraduationCap', 1),
  ('11111111-1111-1111-1111-111111111102', 'schemes', 'Government Schemes', 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', 'Welfare, housing, health, and livelihood programs for individuals and families.', 'ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಕುಟುಂಬಗಳಿಗೆ ಕಲ್ಯಾಣ, ವಸತಿ, ಆರೋಗ್ಯ ಮತ್ತು ಜೀವನೋಪಾಯ ಕಾರ್ಯಕ್ರಮಗಳು.', 'Building2', 2),
  ('11111111-1111-1111-1111-111111111103', 'financial-assistance', 'Financial Assistance & Funds', 'ಆರ್ಥಿಕ ನೆರವು ಮತ್ತು ನಿಧಿಗಳು', 'Direct cash transfers, pension plans, unemployment stipends and farmer aid.', 'ನೇರ ನಗದು ವರ್ಗಾವಣೆ, ಪಿಂಚಣಿ ಯೋಜನೆಗಳು, ನಿರುದ್ಯೋಗ ಭತ್ಯೆ ಮತ್ತು ರೈತ ನೆರವು.', 'Coins', 3),
  ('11111111-1111-1111-1111-111111111104', 'public-services', 'Public Services', 'ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳು', 'Certificates, citizen entitlements, digital governance and official documentation.', 'ಪ್ರಮಾಣಪತ್ರಗಳು, ನಾಗರಿಕ ಹಕ್ಕುಗಳು, ಡಿಜಿಟಲ್ ಆಡಳಿತ ಮತ್ತು ಅಧಿಕೃತ ದಾಖಲೆಗಳು.', 'FileCheck', 4)
ON CONFLICT (slug) DO UPDATE 
SET name_en = EXCLUDED.name_en, name_kn = EXCLUDED.name_kn;

-- 2. Insert Schemes
INSERT INTO schemes (
  id, slug, scheme_name_en, scheme_name_kn, 
  short_description_en, short_description_kn,
  description_en, description_kn,
  government_level, category_id, 
  department_en, department_kn,
  target_beneficiaries_en, target_beneficiaries_kn,
  benefits_en, benefits_kn,
  eligibility_summary_en, eligibility_summary_kn,
  application_procedure_en, application_procedure_kn,
  application_url, official_source_url,
  application_start_date, application_end_date,
  verification_status, last_verified_at, is_featured
) VALUES 
-- Scheme 1: Karnataka SSP Post-Matric Scholarship
(
  '22222222-2222-2222-2222-222222222201',
  'karnataka-ssp-post-matric-scholarship',
  'Karnataka SSP Post-Matric Scholarship',
  'ಕರ್ನಾಟಕ ಎಸ್‌ಎಸ್‌ಪಿ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ',
  'Financial aid and fee concessions for post-matriculation studies for SC/ST, OBC, and minority students domiciled in Karnataka.',
  'ಕರ್ನಾಟಕದ ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ, ಒಬಿಸಿ ಮತ್ತು ಅಲ್ಪಸಂಖ್ಯಾತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮೆಟ್ರಿಕ್ ನಂತರದ ವ್ಯಾಸಂಗಕ್ಕೆ ಆರ್ಥಿಕ ನೆರವು ಮತ್ತು ಶುಲ್ಕ ರಿಯಾಯಿತಿ.',
  'The State Scholarship Portal (SSP) Post-Matric Scholarship is a unified portal operated by the Government of Karnataka covering Social Welfare, Tribal Welfare, Backward Classes Welfare, and Minorities Welfare departments. It credits tuition fees, maintenance allowance, and laboratory charges directly to the Aadhaar-seeded bank accounts of eligible students.',
  'ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ತಂತ್ರಾಂಶ (ಎಸ್‌ಎಸ್‌ಪಿ) ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಸಮಾಜ ಕಲ್ಯಾಣ, ಪರಿಶಿಷ್ಟ ಪಂಗಡಗಳ ಕಲ್ಯಾಣ, ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಮತ್ತು ಅಲ್ಪಸಂಖ್ಯಾತರ ಕಲ್ಯಾಣ ಇಲಾಖೆಗಳು ಜಂಟಿಯಾಗಿ ನಡೆಸುವ ಏಕೀಕೃತ ತಂತ್ರಾಂಶವಾಗಿದೆ. ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಬೋಧನಾ ಶುಲ್ಕ, ನಿರ್ವಹಣಾ ಭತ್ಯೆ ಮತ್ತು ಶುಲ್ಕ ಮರುಪಾವತಿಯನ್ನು ನೇರವಾಗಿ ಆಧಾರ-ಜೋಡಿಸಲಾದ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ ಮಾಡಲಾಗುತ್ತದೆ.',
  'Karnataka',
  '11111111-1111-1111-1111-111111111101',
  'Social Welfare & Backward Classes Welfare Dept, Govt. of Karnataka',
  'ಸಮಾಜ ಕಲ್ಯಾಣ ಮತ್ತು ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
  'Post-Matric (PUC, Diploma, ITI, Degree, PG, Engineering, Medical) students from Karnataka',
  'ಕರ್ನಾಟಕದ ಪಿಯುಸಿ, ಡಿಪ್ಲೊಮಾ, ಪದವಿ, ಸ್ನಾತಕೋತ್ತರ, ಇಂಜಿನಿಯರಿಂಗ್, ವೈದ್ಯಕೀಯ ವಿದ್ಯಾರ್ಥಿಗಳು',
  'Full or partial tuition fee reimbursement plus monthly maintenance allowance between ₹2,500 and ₹15,000 per academic year based on course and category.',
  'ಕೋರ್ಸ್ ಮತ್ತು ಜಾತಿ ವರ್ಗಕ್ಕೆ ಅನುಗುಣವಾಗಿ ವಾರ್ಷಿಕ ₹2,500 ರಿಂದ ₹15,000 ವರೆಗೆ ನಿರ್ವಹಣಾ ಭತ್ಯೆ ಮತ್ತು ಸಂಪೂರ್ಣ ಅಥವಾ ಭಾಗಶಃ ಬೋಧನಾ ಶುಲ್ಕ ಮರುಪಾವತಿ.',
  'Must be a permanent resident of Karnataka, studying in a recognized post-matric course, with annual family income within specified limits (Up to ₹2.5 Lakhs for SC/ST, up to ₹1 Lakh to ₹2.5 Lakhs for Cat-1 and OBC).',
  'ಕರ್ನಾಟಕದ ಖಾಯಂ ನಿವಾಸಿಯಾಗಿರಬೇಕು, ಮಾನ್ಯತೆ ಪಡೆದ ಕಾಲೇಜಿನಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರಬೇಕು, ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ಮಿತಿಯೊಳಗಿರಬೇಕು (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿಗೆ ₹2.5 ಲಕ್ಷದವರೆಗೆ, ಇತರೆ ಹಿಂದುಳಿದ ವರ್ಗಗಳಿಗೆ ₹1 ರಿಂದ ₹2.5 ಲಕ್ಷ).',
  '1. Obtain Kutumba ID and enter Aadhaar details.\n2. Login to SSP Portal using Student Account.\n3. Enter College/University registration number and fetch e-Attestation.\n4. Submit online application with RD numbers of Caste and Income certificates.',
  '1. ಕುಟುಂಬ ಐಡಿ ಮತ್ತು ಆಧಾರ್ ವಿವರಗಳನ್ನು ಪಡೆಯಿರಿ.\n2. ಎಸ್‌ಎಸ್‌ಪಿ ತಂತ್ರಾಂಶದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಖಾತೆಗೆ ಲಾಗಿನ್ ಆಗಿ.\n3. ಕಾಲೇಜು ನೋಂದಣಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ಇ-ದೃಢೀಕರಣ ಪರಿಶೀಲಿಸಿ.\n4. ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದ ಆರ್‌ಡಿ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
  'https://ssp.postmatric.karnataka.gov.in',
  'https://ssp.postmatric.karnataka.gov.in',
  '2026-08-01',
  '2026-12-31',
  'verified',
  NOW(),
  true
),

-- Scheme 2: Karnataka Yuva Nidhi Scheme
(
  '22222222-2222-2222-2222-222222222202',
  'karnataka-yuva-nidhi-scheme',
  'Karnataka Yuva Nidhi Scheme',
  'ಕರ್ನಾಟಕ ಯುವ ನಿಧಿ ಯೋಜನೆ',
  'Monthly financial assistance of ₹3,000 for unemployed graduates and ₹1,500 for unemployed diploma holders in Karnataka.',
  'ಕರ್ನಾಟಕದ ನಿರುದ್ಯೋಗಿ ಪದವೀಧರರಿಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹3,000 ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಪಡೆದವರಿಗೆ ₹1,500 ಮಾಸಿಕ ಆರ್ಥಿಕ ನೆರವು.',
  'Under the Karnataka Guarantee Schemes, the Yuva Nidhi initiative provides crucial financial runway to young men and women who have completed degrees or diplomas in the current or preceding academic year but have not yet secured formal employment or higher education seats, supporting them during job search and skill development.',
  'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಗ್ಯಾರಂಟಿ ಯೋಜನೆಗಳ ಅಡಿಯಲ್ಲಿ, ಯುವ ನಿಧಿ ಯೋಜನೆಯು ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ ಮುಗಿಸಿ ಇನ್ನೂ ಉದ್ಯೋಗ ಪಡೆಯದ ಅಥವಾ ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕೆ ಸೇರದ ಯುವಕ-ಯುವತಿಯರಿಗೆ ಉದ್ಯೋಗ ಹುಡುಕಾಟ ಮತ್ತು ಕೌಶಲ್ಯ ತರಬೇತಿಯ ಅವಧಿಯಲ್ಲಿ ಆರ್ಥಿಕ ಭದ್ರತೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ.',
  'Karnataka',
  '11111111-1111-1111-1111-111111111103',
  'Department of Youth Empowerment and Sports / Skill Development, Govt. of Karnataka',
  'ಯುವ ಸಬಲೀಕರಣ ಮತ್ತು ಕ್ರೀಡಾ ಇಲಾಖೆ / ಕೌಶಲ್ಯಾಭಿವೃದ್ಧಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
  'Unemployed Degree and Diploma holders domiciled in Karnataka for at least 6 years',
  'ಕನಿಷ್ಠ 6 ವರ್ಷ ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸಿರುವ ನಿರುದ್ಯೋಗಿ ಪದವಿ ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಹೊಂದಿರುವವರು',
  '₹3,000 per month for degree holders and ₹1,500 per month for diploma holders transferred directly into the bank account (DBT) for up to 2 years or until employment is secured.',
  'ಪದವೀಧರರಿಗೆ ಮಾಸಿಕ ₹3,000 ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಹೊಂದಿದವರಿಗೆ ಮಾಸಿಕ ₹1,500 ನೇರ ನಗದು ವರ್ಗಾವಣೆ (ಡಿಬಿಟಿ) ಮೂಲಕ ಗರಿಷ್ಠ 2 ವರ್ಷಗಳವರೆಗೆ ಅಥವಾ ಉದ್ಯೋಗ ದೊರೆಯುವವರೆಗೆ.',
  'Karnataka domicile for at least 6 years; Passed Degree or Diploma; Unemployed for at least 180 days post-passing; Not enrolled in higher studies; Not an apprentice or self-employed receiving formal income.',
  'ಕನಿಷ್ಠ 6 ವರ್ಷಗಳ ಕರ್ನಾಟಕ ವಾಸಸ್ಥಳ; ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ ಉತ್ತೀರ್ಣ; ಫಲಿತಾಂಶ ಬಂದ 180 ದಿನಗಳವರೆಗೆ ಉದ್ಯೋಗವಿಲ್ಲದಿರುವುದು; ಉನ್ನತ ವ್ಯಾಸಂಗ ಮುಂದುವರಿಸದಿರುವುದು.',
  '1. Visit Seva Sindhu or dedicated Yuva Nidhi portal.\n2. Authenticate using Aadhaar and Nadakacheri Domicile/Study Certificate.\n3. Enter University degree/diploma roll number.\n4. Complete monthly self-declaration of unemployment status.',
  '1. ಸೇವಾ ಸಿಂಧು ಅಥವಾ ಯುವ ನಿಧಿ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.\n2. ಆಧಾರ್ ಮತ್ತು ನಾಡಕಚೇರಿ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಬಳಸಿ ದೃಢೀಕರಿಸಿ.\n3. ವಿಶ್ವವಿದ್ಯಾಲಯದ ರೋಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.\n4. ಪ್ರತಿ ತಿಂಗಳು ನಿರುದ್ಯೋಗ ಸ್ಥಿತಿಯ ಸ್ವಯಂ ಘೋಷಣೆ ಸಲ್ಲಿಸಿ.',
  'https://sevasindhugs.karnataka.gov.in',
  'https://sevasindhu.karnataka.gov.in',
  '2026-01-01',
  '2026-12-31',
  'verified',
  NOW(),
  true
),

-- Scheme 3: Karnataka Gruha Lakshmi Scheme
(
  '22222222-2222-2222-2222-222222222203',
  'karnataka-gruha-lakshmi-scheme',
  'Karnataka Gruha Lakshmi Scheme',
  'ಕರ್ನಾಟಕ ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆ',
  'Direct financial assistance of ₹2,000 every month to the female head of eligible Antyodaya and BPL/APL families in Karnataka.',
  'ಕರ್ನಾಟಕದ ಅರ್ಹ ಅಂತ್ಯೋದಯ, ಬಿಪಿಎಲ್ ಮತ್ತು ಎಪಿಎಲ್ ಕುಟುಂಬಗಳ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರ ಆರ್ಥಿಕ ನೆರವು.',
  'Gruha Lakshmi is one of the flagship guarantee schemes instituted by the Government of Karnataka to empower homemakers and women heads of households. Every month, ₹2,000 is transferred via Direct Benefit Transfer (DBT) to the female head of the family as recognized in the Ration Card.',
  'ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆಯು ಕುಟುಂಬದ ಯಜಮಾನಿ ಮಹಿಳೆಯರ ಆರ್ಥಿಕ ಸಬಲೀಕರಣಕ್ಕಾಗಿ ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಜಾರಿಗೆ ತಂದ ಪ್ರಮುಖ ಗ್ಯಾರಂಟಿ ಯೋಜನೆಯಾಗಿದೆ. ಪಡಿತರ ಚೀಟಿಯಲ್ಲಿ ನಮೂದಿಸಲಾದ ಮನೆಯ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರ ನಗದು ವರ್ಗಾವಣೆ (ಡಿಬಿಟಿ) ಮೂಲಕ ನೀಡಲಾಗುತ್ತದೆ.',
  'Karnataka',
  '11111111-1111-1111-1111-111111111103',
  'Women and Child Development Department, Govt. of Karnataka',
  'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
  'Female head of household holding valid Karnataka Ration Card (BPL / Antyodaya / APL)',
  'ಕರ್ನಾಟಕದ ಮಾನ್ಯತೆ ಪಡೆದ ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವ ಮನೆಯ ಮುಖ್ಯಸ್ಥೆ ಮಹಿಳೆ',
  '₹2,000 per month recurring payment deposited into bank account linked to Aadhaar.',
  'ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರ ಜಮೆ.',
  'Woman must be identified as head of family in Ration Card (RC); Neither the woman nor her husband can be income tax payees or GST taxpayers.',
  'ಪಡಿತರ ಚೀಟಿಯಲ್ಲಿ ಮಹಿಳೆಯು ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥೆಯಾಗಿರಬೇಕು; ಮಹಿಳೆ ಅಥವಾ ಆಕೆಯ ಪತಿ ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರು ಅಥವಾ ಜಿಎಸ್‌ಟಿ ಪಾವತಿದಾರರಾಗಿರಬಾರದು.',
  '1. Check appointment slot via SMS or Karnataka One / Bangalore One / Grama One centers.\n2. Present Ration Card number and Aadhaar of woman and spouse.\n3. Biometric / OTP authentication for instant enrollment.',
  '1. ಗ್ರಾಮ ಒನ್ / ಕರ್ನಾಟಕ ಒನ್ / ಬೆಂಗಳೂರು ಒನ್ ಕೇಂದ್ರಗಳಿಗೆ ಭೇಟಿ ನೀಡಿ.\n2. ಪಡಿತರ ಚೀಟಿ ಸಂಖ್ಯೆ ಮತ್ತು ಆಧಾರ್ ಕಾರ್ಡ್ ವಿವರಗಳನ್ನು ನೀಡಿ.\n3. ಬಯೋಮೆಟ್ರಿಕ್ ಅಥವಾ ಒಟಿಪಿ ದೃಢೀಕರಣದ ಮೂಲಕ ನೋಂದಾಯಿಸಿ.',
  'https://sevasindhugs.karnataka.gov.in',
  'https://wcd.karnataka.gov.in',
  '2026-01-01',
  '2026-12-31',
  'verified',
  NOW(),
  true
),

-- Scheme 4: Vidyasiri (Food and Accommodation Scheme)
(
  '22222222-2222-2222-2222-222222222204',
  'karnataka-vidyasiri-scheme',
  'Karnataka Vidyasiri (Food & Accommodation) Scheme',
  'ಕರ್ನಾಟಕ ವಿದ್ಯಾಸಿರಿ (ಊಟ ಮತ್ತು ವಸತಿ ಸಹಾಯ) ಯೋಜನೆ',
  'Monthly financial assistance of ₹1,500 for rural and backward class students pursuing post-matric studies without government hostel access.',
  'ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್ ಪ್ರವೇಶಾವಕಾಶ ಸಿಗದ, ಮೆಟ್ರಿಕ್ ನಂತರದ ವ್ಯಾಸಂಗ ಮಾಡುವ ಗ್ರಾಮೀಣ ಮತ್ತು ಹಿಂದುಳಿದ ವರ್ಗದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮಾಸಿಕ ₹1,500 ನೆರವು.',
  'The Vidyasiri (Bhojana Matthu Vasathi Sahaya Yojane) supports eligible Other Backward Classes (OBC), SC, and ST students who are studying in post-matric courses at a distance greater than 5 km from their hometown and were not allotted a government post-matric hostel.',
  'ವಿದ್ಯಾಸಿರಿ (ಭೋಜನ ಮತ್ತು ವಸತಿ ಸಹಾಯ ಯೋಜನೆ) ತಮ್ಮ ಊರಿನಿಂದ 5 ಕಿಮೀಗಿಂತ ಹೆಚ್ಚು ದೂರದಲ್ಲಿರುವ ಕಾಲೇಜಿನಲ್ಲಿ ಮೆಟ್ರಿಕ್ ನಂತರದ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರುವ ಹಾಗೂ ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್ ಪ್ರವೇಶ ಸಿಗದ ಒಬಿಸಿ, ಎಸ್‌ಸಿ, ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಸತಿ ಮತ್ತು ಊಟದ ವೆಚ್ಚ ಭರಿಸಲು ಆರ್ಥಿಕ ನೆರವು ನೀಡುತ್ತದೆ.',
  'Karnataka',
  '11111111-1111-1111-1111-111111111101',
  'Backward Classes Welfare Department, Govt. of Karnataka',
  'ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
  'OBC / Cat-1 / SC / ST students studying at least 5km from native residence without hostel accommodation',
  'ಹಾಸ್ಟೆಲ್ ಸೌಲಭ್ಯವಿಲ್ಲದ ಮತ್ತು ಕಾಲೇಜು 5 ಕಿಮೀಗಿಂತ ದೂರವಿರುವ ಒಬಿಸಿ / ಎಸ್‌ಸಿ / ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳು',
  '₹1,500 per month for 10 academic months (Total ₹15,000 per year) credited directly to student bank account.',
  'ಶೈಕ್ಷಣಿಕ ವರ್ಷದ 10 ತಿಂಗಳುಗಳ ಕಾಲ ಪ್ರತಿ ತಿಂಗಳು ₹1,500 (ಒಟ್ಟು ವಾರ್ಷಿಕ ₹15,000) ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಜಮೆ.',
  'Karnataka resident; Belong to SC/ST or Backward Classes (Cat-1, 2A, 2B, 3A, 3B); Minimum 75% attendance; Family income up to ₹2.5 Lakhs (Cat-1) or ₹1 Lakh (Cat-2A/2B/3A/3B); Must not stay in government/free hostel.',
  'ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು; ಹಿಂದುಳಿದ ವರ್ಗ ಅಥವಾ ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿದವರಾಗಿರಬೇಕು; ಕನಿಷ್ಠ 75% ಹಾಜರಾತಿ ಇರಬೇಕು; ಕುಟುಂಬದ ಆದಾಯ ₹2.5 ಲಕ್ಷ ಅಥವಾ ₹1 ಲಕ್ಷದ ಒಳಗಿರಬೇಕು; ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್‌ನಲ್ಲಿ ಇರಬಾರದು.',
  '1. Apply through Karnataka SSP Portal.\n2. Select Vidyasiri Food & Accommodation module.\n3. Enter distance certificate and rent agreement if applicable.\n4. Verify biometric attendance via college portal.',
  '1. ಕರ್ನಾಟಕ ಎಸ್‌ಎಸ್‌ಪಿ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.\n2. ವಿದ್ಯಾಸಿರಿ ಊಟ ಮತ್ತು ವಸತಿ ಆಯ್ಕೆ ಮಾಡಿ.\n3. ದೂರ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಬಾಡಿಗೆ ಕರಾರು ನಮೂದಿಸಿ.\n4. ಕಾಲೇಜು ಹಾಜರಾತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
  'https://ssp.postmatric.karnataka.gov.in',
  'https://bcwd.karnataka.gov.in',
  '2026-08-01',
  '2026-11-30',
  'verified',
  NOW(),
  false
),

-- Scheme 5: Seva Sindhu Citizen Services (Caste, Income & Domicile)
(
  '22222222-2222-2222-2222-222222222205',
  'karnataka-seva-sindhu-citizen-services',
  'Seva Sindhu Citizen Certificate Services (Nadakacheri)',
  'ಸೇವಾ ಸಿಂಧು ನಾಗರಿಕ ಪ್ರಮಾಣಪತ್ರ ಸೇವೆಗಳು (ನಾಡಕಚೇರಿ)',
  'Single digital window for digital issuance of Caste, Income, Residence, Birth and Death certificates across Karnataka.',
  'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಜಾತಿ, ಆದಾಯ, ವಾಸಸ್ಥಳ, ಜನನ ಮತ್ತು ಮರಣ ಪ್ರಮಾಣಪತ್ರಗಳ ಡಿಜಿಟಲ್ ವಿತರಣೆಗೆ ಏಕೀಕೃತ ಡಿಜಿಟಲ್ ವೇದಿಕೆ.',
  'Seva Sindhu is the flagship citizen service delivery portal of the Government of Karnataka under the Department of e-Governance. It provides tamper-proof, digitally signed certificates with RD numbers that integrate seamlessly with state welfare schemes and scholarships.',
  'ಸೇವಾ ಸಿಂಧು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಇ-ಆಡಳಿತ ಇಲಾಖೆಯ ಪ್ರಮುಖ ನಾಗರಿಕ ಸೇವಾ ವೇದಿಕೆಯಾಗಿದೆ. ಇದು ಆರ್‌ಡಿ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಡಿಜಿಟಲ್ ಸಹಿ ಮಾಡಿದ ಭದ್ರ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ನೀಡುತ್ತದೆ, ಇದು ರಾಜ್ಯ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಯೋಜನೆಗೊಳ್ಳುತ್ತದೆ.',
  'Karnataka',
  '11111111-1111-1111-1111-111111111104',
  'Department of Personnel and Administrative Reforms (e-Governance), Govt. of Karnataka',
  'ಸಿಬ್ಬಂದಿ ಮತ್ತು ಆಡಳಿತ ಸುಧಾರಣಾ ಇಲಾಖೆ (ಇ-ಆಡಳಿತ), ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
  'All citizens residing in Karnataka requiring official revenue and welfare certificates',
  'ಅಧಿಕೃತ ಕಂದಾಯ ಮತ್ತು ಕಲ್ಯಾಣ ಪ್ರಮಾಣಪತ್ರಗಳ ಅಗತ್ಯವಿರುವ ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ನಾಗರಿಕರು',
  'Legally valid digital certificates issued within statutory Sakala timeframes (typically 7 to 21 working days) directly downloadable via DigiLocker and Seva Sindhu.',
  'ಸಕಾಲ ಕಾಯಿದೆಯ ಮಿತಿಯೊಳಗೆ (7 ರಿಂದ 21 ದಿನಗಳು) ಕಾನೂನುಬದ್ಧ ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರಗಳು ಡಿಜಿಲಾಕರ್ ಮತ್ತು ಸೇವಾ ಸಿಂಧು ಮೂಲಕ ಲಭ್ಯ.',
  'Resident of Karnataka; Valid Aadhaar and mobile number for OTP; Supporting local revenue documentation for verification by Revenue Inspector and Tahsildar.',
  'ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು; ಮಾನ್ಯ ಆಧಾರ್ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಇರಬೇಕು; ಕಂದಾಯ ಪರಿಶೀಲನೆಗೆ ಅಗತ್ಯ ದಾಖಲೆಗಳು ಇರಬೇಕು.',
  '1. Login to Seva Sindhu using Aadhaar OTP.\n2. Select desired Revenue/Welfare certificate (Income, Caste, Domicile, Agriculture).\n3. Fill applicant details and upload ration card or electricity bill.\n4. Pay nominal statutory fee (₹25-₹40) and track RD number status.',
  '1. ಸೇವಾ ಸಿಂಧು ತಂತ್ರಾಂಶಕ್ಕೆ ಆಧಾರ್ ಒಟಿಪಿ ಬಳಸಿ ಲಾಗಿನ್ ಆಗಿ.\n2. ಅಗತ್ಯ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.\n3. ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.\n4. ಕನಿಷ್ಠ ಶುಲ್ಕ ಪಾವತಿಸಿ ಆರ್‌ಡಿ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
  'https://sevasindhu.karnataka.gov.in',
  'https://nadakacheri.karnataka.gov.in',
  '2026-01-01',
  '2026-12-31',
  'verified',
  NOW(),
  false
),

-- Scheme 6: PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)
(
  '22222222-2222-2222-2222-222222222206',
  'pm-kisan-samman-nidhi',
  'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
  'ಪಿಎಂ-ಕಿಸಾನ್ (ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ)',
  'Income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.',
  'ಭಾರತದ ಎಲ್ಲಾ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ವರ್ಷಕ್ಕೆ ₹6,000 ಮೂರು ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ ಆದಾಯ ನೆರವು.',
  'PM-KISAN is a Central Sector scheme with 100% funding from Government of India. Under the scheme, income support of ₹6,000/- per year in three equal installments of ₹2,000/- each is provided to all landholding farmer families to procure agricultural inputs and meet domestic needs.',
  'ಪಿಎಂ-ಕಿಸಾನ್ ಭಾರತ ಸರ್ಕಾರದ 100% ಆರ್ಥಿಕ ನೆರವಿನ ಕೇಂದ್ರ ವಲಯದ ಯೋಜನೆಯಾಗಿದೆ. ಈ ಯೋಜನೆಯಡಿ, ಎಲ್ಲಾ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ಕೃಷಿ ಪರಿಕರಗಳ ಖರೀದಿ ಮತ್ತು ಕುಟುಂಬ ಅಗತ್ಯಗಳಿಗಾಗಿ ವಾರ್ಷಿಕ ₹6,000 ಮೊತ್ತವನ್ನು ತಲಾ ₹2,000 ದ ಮೂರು ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ ನೀಡಲಾಗುತ್ತದೆ.',
  'Central',
  '11111111-1111-1111-1111-111111111103',
  'Ministry of Agriculture & Farmers Welfare, Government of India',
  'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
  'Small, marginal and all landholder farmer families with cultivable land in India',
  'ಭಾರತದಲ್ಲಿ ಸಾಗುವಳಿ ಭೂಮಿ ಹೊಂದಿರುವ ಸಣ್ಣ, ಅತಿ ಸಣ್ಣ ಮತ್ತು ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳು',
  '₹6,000 annually credited directly in three equal installments of ₹2,000 every 4 months (April-July, August-November, December-March) via Aadhaar-linked DBT.',
  'ಪ್ರತಿ 4 ತಿಂಗಳಿಗೊಮ್ಮೆ ₹2,000 ರಂತೆ ವರ್ಷಕ್ಕೆ ಒಟ್ಟು ₹6,000 ನೇರವಾಗಿ ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ.',
  'Farmer family having cultivable agricultural land registered in their name (Land Record/RTC); Institutional landholders, constitutional post holders, serving/retired government employees, and income tax payers are excluded.',
  'ತಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಸಾಗುವಳಿ ಭೂಮಿಯ ಪಹಣಿ/ಆರ್‌ಟಿಸಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬ; ಸಾಂಸ್ಥಿಕ ಭೂಮಾಲೀಕರು, ಸಾಂವಿಧಾನಿಕ ಹುದ್ದೆ ಹೊಂದಿರುವವರು ಮತ್ತು ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರನ್ನು ಹೊರತುಪಡಿಸಲಾಗಿದೆ.',
  '1. Visit PM-KISAN Portal (Farmers Corner) or nearest Common Service Center (CSC).\n2. Enter Aadhaar number and state land record details (Katha / Survey Number).\n3. Complete mandatory e-KYC using Aadhaar OTP or facial recognition on PM-KISAN App.',
  '1. ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಹೊಸ ರೈತ ನೋಂದಣಿ ಆಯ್ಕೆಮಾಡಿ.\n2. ಆಧಾರ್ ಸಂಖ್ಯೆ ಮತ್ತು ಕೃಷಿ ಭೂಮಿಯ ಪಹಣಿ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.\n3. ಆಧಾರ್ ಒಟಿಪಿ ಅಥವಾ ಮುಖ ಗುರುತಿಸುವಿಕೆ ಮೂಲಕ ಕಡ್ಡಾಯ ಇ-ಕೆವೈಸಿ ಪೂರ್ಣಗೊಳಿಸಿ.',
  'https://pmkisan.gov.in',
  'https://pmkisan.gov.in',
  '2026-01-01',
  '2026-12-31',
  'verified',
  NOW(),
  true
),

-- Scheme 7: Pradhan Mantri Awas Yojana - Gramin (PMAY-G)
(
  '22222222-2222-2222-2222-222222222207',
  'pradhan-mantri-awas-yojana-gramin',
  'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
  'ಪ್ರಧಾನ ಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ - ಗ್ರಾಮೀಣ (ಪಿಎಂಎವೈ-ಜಿ)',
  'Financial grant of ₹1.20 Lakhs for constructing permanent pucca houses for homeless and kutcha-house rural families.',
  'ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ವಸತಿ ರಹಿತ ಮತ್ತು ಕಚ್ಚಾ ಮನೆಗಳಲ್ಲಿ ವಾಸಿಸುವ ಕುಟುಂಬಗಳಿಗೆ ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಿಸಲು ₹1.20 ಲಕ್ಷ ಆರ್ಥಿಕ ಅನುದಾನ.',
  'PMAY-G aims to provide pucca houses with basic amenities (piped water, hygienic toilet, clean LPG cooking through Ujjwala, electricity) to all houseless households and those living in kutcha and dilapidated houses in rural areas of India, identified through SECC and Awaas+ surveys.',
  'ಪಿಎಂಎವೈ-ಜಿ ಯೋಜನೆಯು ಭಾರತದ ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಲ್ಲಿ ವಸತಿ ರಹಿತ ಹಾಗೂ ಕಚ್ಚಾ ಮತ್ತು ಶಿಥಿಲ ಮನೆಗಳಲ್ಲಿ ವಾಸಿಸುವ ಕುಟುಂಬಗಳಿಗೆ ಮೂಲಭೂತ ಸೌಕರ್ಯಗಳೊಂದಿಗೆ (ಕುಡಿಯುವ ನೀರು, ಶೌಚಾಲಯ, ವಿದ್ಯುತ್) ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಿಸಲು ಆರ್ಥಿಕ ನೆರವು ನೀಡುತ್ತದೆ.',
  'Central',
  '11111111-1111-1111-1111-111111111102',
  'Ministry of Rural Development, Government of India',
  'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
  'Houseless rural families and households residing in zero, one or two-room kutcha houses',
  'ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ವಸತಿ ರಹಿತ ಕುಟುಂಬಗಳು ಮತ್ತು ಕಚ್ಚಾ ಮನೆಗಳಲ್ಲಿ ವಾಸಿಸುವವರು',
  'Financial assistance of ₹1,20,000 in plain areas (₹1,30,000 in hilly/difficult areas) released in stages linked to geo-tagged construction progress, plus 90 days of unskilled labor wages under MGNREGA and ₹12,000 for toilet construction.',
  'ಮೈದಾನ ಪ್ರದೇಶಗಳಲ್ಲಿ ₹1,20,000 (ಗುಡ್ಡಗಾಡು ಪ್ರದೇಶಗಳಲ್ಲಿ ₹1,30,000) ಹಂತ-ಹಂತದ ಅನುದಾನ, ಜೊತೆಗೆ ಉದ್ಯೋಗ ಖಾತರಿ ಅಡಿಯಲ್ಲಿ 90 ದಿನಗಳ ಕೂಲಿ ಮತ್ತು ಶೌಚಾಲಯ ನಿರ್ಮಾಣಕ್ಕೆ ₹12,000.',
  'Family must not own a pucca house anywhere in India; Must be listed in SECC 2011 / Awaas+ verified survey; Exclusion if owning motorized 3/4 wheeler, mechanized agricultural equipment, or family member is government employee.',
  'ಕುಟುಂಬವು ಭಾರತದಲ್ಲಿ ಎಲ್ಲಿಯೂ ಪಕ್ಕಾ ಮನೆ ಹೊಂದಿರಬಾರದು; ಗ್ರಾಮೀಣ ಪ್ರದೇಶದಲ್ಲಿ ಕಚ್ಚಾ ಮನೆ ಹೊಂದಿರಬೇಕು; ಕುಟುಂಬದಲ್ಲಿ ಯಾವುದೇ ಸರ್ಕಾರಿ ನೌಕರರು ಇರಬಾರದು.',
  '1. Verification of name in Gram Panchayat Awaas+ priority list.\n2. Gram Sabha approval and geo-tagging of existing kutcha structure by Panchayat Officer.\n3. DBT bank sanction and installment releases upon geo-tagged photo verification at plinth, lintel, and roof stages.',
  '1. ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯ ಆವಾಸ್+ ಆದ್ಯತಾ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ಪರಿಶೀಲಿಸಿ.\n2. ಗ್ರಾಮ ಸಭೆಯ ಅನುಮೋದನೆ ಮತ್ತು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಕಚ್ಚಾ ಮನೆಯ ಜಿಯೋ-ಟ್ಯಾಗಿಂಗ್.\n3. ತಳಪಾಯ, ಲಿಂಟಲ್ ಮತ್ತು ಮೇಲ್ಛಾವಣಿ ಹಂತಗಳ ಜಿಯೋ-ಟ್ಯಾಗ್ ಪರಿಶೀಲನೆಯ ನಂತರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಕಂತುಗಳ ಬಿಡುಗಡೆ.',
  'https://pmayg.nic.in',
  'https://pmayg.nic.in',
  '2026-01-01',
  '2026-12-31',
  'verified',
  NOW(),
  true
),

-- Scheme 8: National Means-cum-Merit Scholarship (NMMSS)
(
  '22222222-2222-2222-2222-222222222208',
  'national-means-cum-merit-scholarship',
  'National Means-cum-Merit Scholarship Scheme (NMMSS)',
  'ರಾಷ್ಟ್ರೀಯ ಮೀನ್ಸ್-ಕಮ್-ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆ (ಎನ್‌ಎಂಎಂಎಸ್‌ಎಸ್)',
  'Scholarship of ₹12,000 per year (₹1,000/month) to meritorious students of economically weaker sections from Class IX to XII.',
  'ಆರ್ಥಿಕವಾಗಿ ಹಿಂದುಳಿದ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ 9 ರಿಂದ 12 ನೇ ತರಗತಿಯವರೆಗೆ ವರ್ಷಕ್ಕೆ ₹12,000 (ಮಾಸಿಕ ₹1,000) ವಿದ್ಯಾರ್ಥಿವೇತನ.',
  'The centrally sponsored National Means-cum-Merit Scholarship Scheme awards 1,00,000 scholarships annually to meritorious students whose parental income is not more than ₹3.5 Lakhs, helping reduce dropouts after Class VIII and encouraging continuation of secondary education.',
  'ಕೇಂದ್ರ ಪುರಸ್ಕೃತ ರಾಷ್ಟ್ರೀಯ ಮೀನ್ಸ್-ಕಮ್-ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಯು 8ನೇ ತರಗತಿಯ ನಂತರ ಶಾಲೆ ಬಿಡುವುದನ್ನು ತಡೆಗಟ್ಟಲು ಮತ್ತು ಪ್ರೌಢ ಶಿಕ್ಷಣವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಲು ವಾರ್ಷಿಕ ₹3.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ಆದಾಯವಿರುವ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪ್ರತಿ ವರ್ಷ 1,00,000 ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ನೀಡುತ್ತದೆ.',
  'Central',
  '11111111-1111-1111-1111-111111111101',
  'Department of School Education & Literacy, Ministry of Education, Govt. of India',
  'ಶಾಲಾ ಶಿಕ್ಷಣ ಮತ್ತು ಸಾಕ್ಷರತಾ ಇಲಾಖೆ, ಶಿಕ್ಷಣ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
  'Meritorious students studying in Class 9-12 in Government, Local Body and Government-aided schools',
  'ಸರ್ಕಾರಿ, ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ ಮತ್ತು ಅನುದಾನಿತ ಶಾಲೆಗಳಲ್ಲಿ 9 ರಿಂದ 12 ನೇ ತರಗತಿ ಓದುತ್ತಿರುವ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳು',
  '₹12,000 per annum (₹1,000 per month) disbursed directly through State Bank of India into the student account through National Scholarship Portal (NSP).',
  'ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (ಎನ್‌ಎಸ್‌ಪಿ) ಮೂಲಕ ವಿದ್ಯಾರ್ಥಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ವಾರ್ಷಿಕ ₹12,000 (ಮಾಸಿಕ ₹1,000) ನೇರ ಜಮೆ.',
  'Passed Class VII with minimum 55% marks (50% for SC/ST); Studying in regular Government or aided school; Family annual income from all sources not exceeding ₹3,50,000; Must qualify State-level NMMS selection test.',
  '7ನೇ ತರಗತಿಯಲ್ಲಿ ಕನಿಷ್ಠ 55% ಅಂಕ (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿಗೆ 50%); ಸರ್ಕಾರಿ ಅಥವಾ ಅನುದಾನಿತ ಶಾಲೆಯಲ್ಲಿ ಓದುತ್ತಿರಬೇಕು; ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹3,50,000 ಮೀರಬಾರದು; ರಾಜ್ಯ ಮಟ್ಟದ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಉತ್ತೀರ್ಣರಾಗಬೇಕು.',
  '1. Appear for State Level NMMS Selection Exam conducted by DSERT Karnataka.\n2. Upon clearing test, register on National Scholarship Portal (scholarships.gov.in).\n3. Complete Aadhaar e-KYC and submit institutional verification.',
  '1. ಡಿಎಸ್‌ಇಆರ್‌ಟಿ ಕರ್ನಾಟಕ ನಡೆಸುವ ಎನ್‌ಎಂಎಂಎಸ್ ಪರೀಕ್ಷೆಗೆ ಹಾಜರಾಗಿ ಉತ್ತೀರ್ಣರಾಗಿ.\n2. ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ (scholarships.gov.in) ನೋಂದಾಯಿಸಿ.\n3. ಆಧಾರ್ ಇ-ಕೆವೈಸಿ ಮತ್ತು ಶಾಲಾ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಳಿಸಿ.',
  'https://scholarships.gov.in',
  'https://www.education.gov.in',
  '2026-07-01',
  '2026-11-15',
  'verified',
  NOW(),
  false
),

-- Scheme 9: Pradhan Mantri Mudra Yojana (PMMY)
(
  '22222222-2222-2222-2222-222222222209',
  'pradhan-mantri-mudra-yojana',
  'Pradhan Mantri Mudra Yojana (PMMY)',
  'ಪ್ರಧಾನ ಮಂತ್ರಿ ಮುದ್ರಾ ಯೋಜನೆ (ಪಿಎಂಎಂವೈ)',
  'Collateral-free business loans up to ₹10 Lakhs (Shishu, Kishore, Tarun) for non-farm micro and small enterprises.',
  'ಕೃಷಿಯೇತರ ಸಣ್ಣ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಉದ್ಯಮಗಳಿಗೆ ₹10 ಲಕ್ಷದವರೆಗೆ ಯಾವುದೇ ಆಧಾರವಿಲ್ಲದ (ಕೊಲ್ಯಾಟರಲ್-ಮುಕ್ತ) ಸಾಲಗಳು.',
  'PMMY promotes micro-enterprises and entrepreneurship across India by enabling access to affordable institutional credit without collateral security for manufacturing, trading, and service sector micro units under three categories: Shishu (loans up to ₹50,000), Kishore (loans ₹50,001 to ₹5 Lakhs), and Tarun (loans ₹5,00,001 to ₹10 Lakhs).',
  'ಪಿಎಂಎಂವೈ ಯೋಜನೆಯು ಉತ್ಪಾದನೆ, ವ್ಯಾಪಾರ ಮತ್ತು ಸೇವಾ ವಲಯದ ಸೂಕ್ಷ್ಮ ಘಟಕಗಳಿಗೆ ಯಾವುದೇ ಭದ್ರತೆಯಿಲ್ಲದೆ ಕೈಗೆಟುಕುವ ಸಾಲವನ್ನು ಒದಗಿಸುತ್ತದೆ: ಶಿಶು (₹50,000 ವರೆಗೆ), ಕಿಶೋರ್ (₹50,001 ರಿಂದ ₹5 ಲಕ್ಷದವರೆಗೆ), ಮತ್ತು ತರುಣ್ (₹5,00,001 ರಿಂದ ₹10 ಲಕ್ಷದವರೆಗೆ).',
  'Central',
  '11111111-1111-1111-1111-111111111103',
  'Department of Financial Services, Ministry of Finance, Govt. of India',
  'ಹಣಕಾಸು ಸೇವೆಗಳ ಇಲಾಖೆ, ಹಣಕಾಸು ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
  'Small business owners, shopkeepers, artisans, manufacturers, women entrepreneurs, startups',
  'ಸಣ್ಣ ವ್ಯಾಪಾರಿಗಳು, ಅಂಗಡಿಕಾರರು, ಕುಶಲಕರ್ಮಿಗಳು, ಮಹಿಳಾ ಉದ್ಯಮಿಗಳು, ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳು',
  'Collateral-free loans up to ₹10,00,000 at competitive interest rates with Mudra Card for working capital overdraft needs.',
  'ಕಾರ್ಯನಿರತ ಬಂಡವಾಳ ಮತ್ತು ವ್ಯಾಪಾರ ವಿಸ್ತರಣೆಗೆ ಸ್ಪರ್ಧಾತ್ಮಕ ಬಡ್ಡಿದರದಲ್ಲಿ ₹10 ಲಕ್ಷದವರೆಗೆ ಜಾಮೀನು ರಹಿತ ಸಾಲ.',
  'Indian citizen aged 18+; Having a viable business plan for non-farm income generating activity; Must not be a defaulter with any financial institution.',
  '18 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಭಾರತೀಯ ಪ್ರಜೆ; ಕೃಷಿಯೇತರ ಆದಾಯ ನೀಡುವ ವ್ಯವಹಾರ ಯೋಜನೆ ಹೊಂದಿರಬೇಕು; ಯಾವುದೇ ಬ್ಯಾಂಕಿನಲ್ಲಿ ಸಾಲ ಮರುಪಾವತಿ ಸುಸ್ತಿದಾರರಾಗಿರಬಾರದು.',
  '1. Prepare business proposal and quotations for machinery/inventory.\n2. Apply online through Udyamimitra portal or approach any scheduled commercial bank or RRB.\n3. Submit KYC, business address proof and last 6 months bank statement.',
  '1. ವ್ಯವಹಾರ ಯೋಜನೆ ಮತ್ತು ಯಂತ್ರೋಪಕರಣಗಳ ಕೊಟೇಶನ್ ತಯಾರಿಸಿ.\n2. ಉದ್ಯಮಿ ಮಿತ್ರ (udyamimitra.in) ಪೋರ್ಟಲ್ ಮೂಲಕ ಅಥವಾ ಯಾವುದೇ ಬ್ಯಾಂಕಿನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.\n3. ಕೆವೈಸಿ ಮತ್ತು ವ್ಯಾಪಾರದ ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಿ.',
  'https://www.mudra.org.in',
  'https://www.udyamimitra.in',
  '2026-01-01',
  '2026-12-31',
  'verified',
  NOW(),
  true
),

-- Scheme 10: Atal Pension Yojana (APY)
(
  '22222222-2222-2222-2222-222222222210',
  'atal-pension-yojana',
  'Atal Pension Yojana (APY)',
  'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ (ಎಪಿವೈ)',
  'Government guaranteed monthly pension of ₹1,000 to ₹5,000 for unorganized sector workers after attaining 60 years of age.',
  'ಅಸಂಘಟಿತ ವಲಯದ ಕಾರ್ಮಿಕರಿಗೆ 60 ವರ್ಷ ತುಂಬಿದ ನಂತರ ತಿಂಗಳಿಗೆ ₹1,000 ರಿಂದ ₹5,000 ವರೆಗೆ ಸರ್ಕಾರದ ಖಾತರಿಯ ಮಾಸಿಕ ಪಿಂಚಣಿ.',
  'Atal Pension Yojana is a social security scheme administered by PFRDA aimed at creating a universal social security net for all Indians, especially workers in the unorganized sector. Subscribers contribute small monthly savings between ages 18 and 40 to receive a guaranteed minimum monthly pension from age 60.',
  'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆಯು ಅಸಂಘಟಿತ ವಲಯದ ಕಾರ್ಮಿಕರಿಗೆ ವೃದ್ಧಾಪ್ಯ ಭದ್ರತೆ ಒದಗಿಸಲು ಪಿಎಫ್‌ಆರ್‌ಡಿಎ ನಿರ್ವಹಿಸುವ ಸಾಮಾಜಿಕ ಭದ್ರತಾ ಯೋಜನೆಯಾಗಿದೆ. 18 ರಿಂದ 40 ವರ್ಷ ವಯಸ್ಸಿನ ಚಂದಾದಾರರು ಸಣ್ಣ ಮಾಸಿಕ ಉಳಿತಾಯ ಮಾಡುವ ಮೂಲಕ 60 ವರ್ಷದ ನಂತರ ಮಾಸಿಕ ಖಚಿತ ಪಿಂಚಣಿ ಪಡೆಯಬಹುದು.',
  'Central',
  '11111111-1111-1111-1111-111111111103',
  'Pension Fund Regulatory and Development Authority (PFRDA) / Ministry of Finance',
  'ಪಿಎಫ್‌ಆರ್‌ಡಿಎ / ಹಣಕಾಸು ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
  'All Indian citizens in the unorganized sector aged between 18 and 40 years',
  '18 ರಿಂದ 40 ವರ್ಷ ವಯಸ್ಸಿನ ಅಸಂಘಟಿತ ವಲಯದಲ್ಲಿ ಕೆಲಸ ಮಾಡುವ ಎಲ್ಲಾ ಭಾರತೀಯ ನಾಗರಿಕರು',
  'Guaranteed lifelong monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 post 60; Same pension continues to spouse upon death; Return of accumulated pension corpus to nominee.',
  '60 ವರ್ಷದ ನಂತರ ₹1,000 ದಿಂದ ₹5,000 ವರೆಗೆ ಆಜೀವ ಮಾಸಿಕ ಪಿಂಚಣಿ; ನಿಧನದ ನಂತರ ಸಂಗಾತಿಗೆ ಪಿಂಚಣಿ ಮುಂದುವರಿಕೆ; ನಾಮಿನಿಗೆ ಸಂಪೂರ್ಣ ಠೇವಣಿ ಮೊತ್ತ ವಾಪಸ್.',
  'Citizen of India; Age between 18 and 40 years; Possess an active savings bank or post office account; Not an income taxpayer as per current scheme rules.',
  'ಭಾರತೀಯ ಪ್ರಜೆ; 18 ರಿಂದ 40 ವರ್ಷ ವಯೋಮಿತಿ; ಸಕ್ರಿಯ ಉಳಿತಾಯ ಬ್ಯಾಂಕ್ ಖಾತೆ ಹೊಂದಿರಬೇಕು; ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರಾಗಿರಬಾರದು.',
  '1. Approach your bank branch or use Internet Banking / mobile banking.\n2. Fill APY registration form with nominee details.\n3. Authorize monthly auto-debit from savings account.',
  '1. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಬಳಸಿ.\n2. ನಾಮಿನಿ ವಿವರಗಳೊಂದಿಗೆ ಎಪಿವೈ ಅರ್ಜಿ ಭರ್ತಿ ಮಾಡಿ.\n3. ಉಳಿತಾಯ ಖಾತೆಯಿಂದ ಮಾಸಿಕ ಸ್ವಯಂ-ಕಡಿತಕ್ಕೆ ಅನುಮತಿ ನೀಡಿ.',
  'https://www.npscra.nsdl.co.in',
  'https://www.pfrda.org.in',
  '2026-01-01',
  '2026-12-31',
  'verified',
  NOW(),
  false
);

-- 3. Insert Configurable Eligibility Rules for Schemes
-- These rules power the JanSeva Eligibility Matching Engine!
INSERT INTO eligibility_rules (scheme_id, field_name, operator, expected_value, is_mandatory, rule_description_en, rule_description_kn)
VALUES 
-- Rules for Karnataka SSP Post-Matric Scholarship
('22222222-2222-2222-2222-222222222201', 'state', 'equals', '"Karnataka"', true, 'Applicant must be a resident of Karnataka State', 'ಅರ್ಜಿದಾರರು ಕರ್ನಾಟಕ ರಾಜ್ಯದ ನಿವಾಸಿಯಾಗಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222201', 'education', 'in', '["Higher Secondary (11-12/PUC)", "Diploma", "Undergraduate Degree", "Postgraduate Degree", "Doctorate/PhD"]', true, 'Must be pursuing post-matric studies', 'ಮೆಟ್ರಿಕ್ ನಂತರದ ಕೋರ್ಸ್ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222201', 'annual_income', 'less_than_or_equal', '250000', true, 'Annual family income must not exceed ₹2,50,000', 'ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹2.5 ಲಕ್ಷ ಮೀರಬಾರದು'),

-- Rules for Karnataka Yuva Nidhi Scheme
('22222222-2222-2222-2222-222222222202', 'state', 'equals', '"Karnataka"', true, 'Must have Karnataka domicile for at least 6 years', 'ಕನಿಷ್ಠ 6 ವರ್ಷ ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಸ್ಥಳ ಹೊಂದಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222202', 'education', 'in', '["Diploma", "Undergraduate Degree", "Postgraduate Degree"]', true, 'Must have completed a Degree or Diploma', 'ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ ಪೂರ್ಣಗೊಳಿಸಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222202', 'occupation', 'equals', '"Unemployed"', true, 'Must be currently unemployed and not in higher studies', 'ಪ್ರಸ್ತುತ ನಿರುದ್ಯೋಗಿಯಾಗಿರಬೇಕು ಮತ್ತು ಉನ್ನತ ವ್ಯಾಸಂಗದಲ್ಲಿರಬಾರದು'),
('22222222-2222-2222-2222-222222222202', 'age', 'less_than_or_equal', '35', false, 'Recommended age range is under 35 years', 'ವಯಸ್ಸು 35 ವರ್ಷದೊಳಗಿರಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ'),

-- Rules for Karnataka Gruha Lakshmi Scheme
('22222222-2222-2222-2222-222222222203', 'state', 'equals', '"Karnataka"', true, 'Applicant must be domiciled in Karnataka', 'ಅರ್ಜಿದಾರರು ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222203', 'gender', 'equals', '"Female"', true, 'Only female head of the household is eligible', 'ಮನೆಯ ಮುಖ್ಯಸ್ಥೆ ಮಹಿಳೆ ಮಾತ್ರ ಅರ್ಹರು'),
('22222222-2222-2222-2222-222222222203', 'age', 'greater_than_or_equal', '18', true, 'Must be at least 18 years of age', 'ಕನಿಷ್ಠ 18 ವರ್ಷ ವಯಸ್ಸಾಗಿರಬೇಕು'),

-- Rules for Karnataka Vidyasiri Scheme
('22222222-2222-2222-2222-222222222204', 'state', 'equals', '"Karnataka"', true, 'Applicant must be a permanent resident of Karnataka', 'ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222204', 'education', 'in', '["Higher Secondary (11-12/PUC)", "Diploma", "Undergraduate Degree", "Postgraduate Degree"]', true, 'Pursuing post-matric courses away from home', 'ಸ್ವಂತ ಊರಿನಿಂದ ದೂರದಲ್ಲಿ ಮೆಟ್ರಿಕ್ ನಂತರದ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222204', 'annual_income', 'less_than_or_equal', '250000', true, 'Annual family income must not exceed ₹2.5 Lakhs', 'ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹2.5 ಲಕ್ಷ ಮೀರಬಾರದು'),

-- Rules for Seva Sindhu Citizen Services
('22222222-2222-2222-2222-222222222205', 'state', 'equals', '"Karnataka"', true, 'Applicant must reside in Karnataka', 'ಅರ್ಜಿದಾರರು ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸುತ್ತಿರಬೇಕು'),

-- Rules for PM-KISAN
('22222222-2222-2222-2222-222222222206', 'occupation', 'equals', '"Farmer / Cultivator"', true, 'Must be an active cultivator with landholding in family', 'ಕುಟುಂಬದಲ್ಲಿ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಕೃಷಿಕರಾಗಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222206', 'age', 'greater_than_or_equal', '18', true, 'Applicant must be an adult aged 18 or above', 'ಕನಿಷ್ಠ 18 ವರ್ಷ ತುಂಬಿರಬೇಕು'),

-- Rules for PMAY-G
('22222222-2222-2222-2222-222222222207', 'age', 'greater_than_or_equal', '18', true, 'Head of household must be an adult', 'ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರು ವಯಸ್ಕರಾಗಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222207', 'annual_income', 'less_than_or_equal', '300000', true, 'Must be in low-income or BPL category', 'ಕಡಿಮೆ ಆದಾಯ ಅಥವಾ ಬಿಪಿಎಲ್ ವರ್ಗಕ್ಕೆ ಸೇರಿರಬೇಕು'),

-- Rules for NMMSS Scholarship
('22222222-2222-2222-2222-222222222208', 'education', 'in', '["Secondary School (Class 9-10)", "Higher Secondary (11-12/PUC)"]', true, 'Must be enrolled in Class IX, X, XI, or XII', '9, 10, 11 ಅಥವಾ 12 ನೇ ತರಗತಿಯಲ್ಲಿ ಓದುತ್ತಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222208', 'annual_income', 'less_than_or_equal', '350000', true, 'Parental annual income from all sources must be within ₹3,50,000', 'ಪೋಷಕರ ವಾರ್ಷಿಕ ಆದಾಯ ₹3,50,000 ಮೀರಬಾರದು'),
('22222222-2222-2222-2222-222222222208', 'age', 'less_than_or_equal', '19', true, 'School student typically below 19 years old', 'ಶಾಲಾ ವಿದ್ಯಾರ್ಥಿ 19 ವರ್ಷದೊಳಗಿರಬೇಕು'),

-- Rules for PM Mudra Yojana
('22222222-2222-2222-2222-222222222209', 'age', 'greater_than_or_equal', '18', true, 'Applicant must be an adult (18+ years)', 'ಕನಿಷ್ಠ 18 ವರ್ಷ ವಯಸ್ಸಾಗಿರಬೇಕು'),
('22222222-2222-2222-2222-222222222209', 'occupation', 'in', '["Self-Employed / Business", "Artisan / Small Vendor", "Unemployed"]', true, 'Operating or launching a micro enterprise or self-employment', 'ಸ್ವಯಂ ಉದ್ಯೋಗ ಅಥವಾ ಸಣ್ಣ ವ್ಯಾಪಾರ ನಡೆಸುತ್ತಿರಬೇಕು'),

-- Rules for Atal Pension Yojana
('22222222-2222-2222-2222-222222222210', 'age', 'greater_than_or_equal', '18', true, 'Minimum entry age is 18 years', 'ಕನಿಷ್ಠ ವಯಸ್ಸು 18 ವರ್ಷ'),
('22222222-2222-2222-2222-222222222210', 'age', 'less_than_or_equal', '40', true, 'Maximum entry age is 40 years', 'ಗರಿಷ್ಠ ವಯಸ್ಸು 40 ವರ್ಷ');

-- 4. Insert Required Documents for Schemes
INSERT INTO required_documents (scheme_id, document_name_en, document_name_kn, is_mandatory, description_en, description_kn)
VALUES
-- Documents for SSP Scholarship
('22222222-2222-2222-2222-222222222201', 'Aadhaar Card (Aadhaar Seeding with Bank)', 'ಆಧಾರ್ ಕಾರ್ಡ್ (ಬ್ಯಾಂಕ್ ಜೋಡಣೆ)', true, 'Used for identity and Direct Benefit Transfer authentication', 'ಗುರುತು ಮತ್ತು ಡಿಬಿಟಿ ನಗದು ವರ್ಗಾವಣೆಗೆ'),
('22222222-2222-2222-2222-222222222201', 'Caste and Income Certificate (RD Number)', 'ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (ಆರ್‌ಡಿ ಸಂಖ್ಯೆ)', true, 'Issued by Nadakacheri revenue department', 'ನಾಡಕಚೇರಿಯಿಂದ ನೀಡಲಾದ ಪ್ರಮಾಣಪತ್ರ'),
('22222222-2222-2222-2222-222222222201', 'College Admission Receipt / Bonafide Certificate', 'ಕಾಲೇಜು ಪ್ರವೇಶ ರಸೀದಿ / ವ್ಯಾಸಂಗ ದೃಢೀಕರಣ', true, 'Verification of college enrollment and fee structure', 'ಕಾಲೇಜು ಪ್ರವೇಶ ಮತ್ತು ಶುಲ್ಕ ಪರಿಶೀಲನೆ'),
('22222222-2222-2222-2222-222222222201', 'SSLC / Previous Exam Marksheet', 'ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ / ಹಿಂದಿನ ತರಗತಿಯ ಅಂಕಪಟ್ಟಿ', true, 'Academic performance and eligibility verification', 'ಶೈಕ್ಷಣಿಕ ಅಂಕಗಳ ಪರಿಶೀಲನೆಗೆ'),

-- Documents for Yuva Nidhi
('22222222-2222-2222-2222-222222222202', 'Aadhaar Card', 'ಆಧಾರ್ ಕಾರ್ಡ್', true, 'Personal identification and address verification', 'ವೈಯಕ್ತಿಕ ಗುರುತು ಮತ್ತು ವಿಳಾಸ ಪರಿಶೀಲನೆ'),
('22222222-2222-2222-2222-222222222202', 'Karnataka Domicile / 6-Year Study Certificate', 'ಕರ್ನಾಟಕ ವಾಸಸ್ಥಳ / 6 ವರ್ಷಗಳ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣಪತ್ರ', true, 'Proof of study or domicile in Karnataka for 6 years', 'ಕರ್ನಾಟಕದಲ್ಲಿ 6 ವರ್ಷ ಅಧ್ಯಯನ ಮಾಡಿದ ಪುರಾವೆ'),
('22222222-2222-2222-2222-222222222202', 'Degree / Diploma Passing Certificate & Marks Cards', 'ಪದವಿ / ಡಿಪ್ಲೊಮಾ ಉತ್ತೀರ್ಣ ಪ್ರಮಾಣಪತ್ರ', true, 'Documenting year of graduation and qualifying status', 'ಪದವಿ ಪೂರ್ಣಗೊಳಿಸಿದ ವರ್ಷದ ಪುರಾವೆ'),
('22222222-2222-2222-2222-222222222202', 'Aadhaar-seeded Bank Account Passbook', 'ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್', true, 'For direct monthly unemployment stipend credit', 'ಮಾಸಿಕ ನಿರುದ್ಯೋಗ ಭತ್ಯೆ ಜಮೆಗೆ'),

-- Documents for Gruha Lakshmi
('22222222-2222-2222-2222-222222222203', 'Karnataka Ration Card (BPL / Antyodaya / APL)', 'ಪಡಿತರ ಚೀಟಿ (ಬಿಪಿಎಲ್ / ಅಂತ್ಯೋದಯ / ಎಪಿಎಲ್)', true, 'Showing woman as head of household', 'ಮಹಿಳೆ ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥೆಯಾಗಿರುವ ದಾಖಲೆ'),
('22222222-2222-2222-2222-222222222203', 'Aadhaar Card of Woman and Spouse', 'ಮಹಿಳೆ ಮತ್ತು ಪತಿಯ ಆಧಾರ್ ಕಾರ್ಡ್', true, 'Identity and marital verification', 'ಗುರುತಿನ ಪರಿಶೀಲನೆಗೆ'),
('22222222-2222-2222-2222-222222222203', 'Aadhaar-linked Bank Account details', 'ಬ್ಯಾಂಕ್ ಖಾತೆಯ ವಿವರಗಳು', true, 'For DBT ₹2,000 monthly credit', 'ಮಾಸಿಕ ₹2,000 ಜಮೆಗೆ'),

-- Documents for Vidyasiri
('22222222-2222-2222-2222-222222222204', 'Aadhaar Card', 'ಆಧಾರ್ ಕಾರ್ಡ್', true, 'Identity verification', 'ಗುರುತಿನ ಪರಿಶೀಲನೆ'),
('22222222-2222-2222-2222-222222222204', 'Income Certificate (RD Number)', 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ', true, 'Income proof within threshold', 'ಆದಾಯ ಮಿತಿ ಪರಿಶೀಲನೆ'),
('22222222-2222-2222-2222-222222222204', 'Distance / Commute Certificate from Tahsildar / College', 'ದೂರ ಪ್ರಮಾಣಪತ್ರ (ಕನಿಷ್ಠ 5 ಕಿಮೀ)', true, 'Proof that college is >5 km from residence', 'ಮನೆಯಿಂದ ಕಾಲೇಜು 5 ಕಿಮೀಗಿಂತ ದೂರವಿರುವ ದಾಖಲೆ'),

-- Documents for PM-KISAN
('22222222-2222-2222-2222-222222222206', 'Aadhaar Card', 'ಆಧಾರ್ ಕಾರ್ಡ್', true, 'Mandatory for e-KYC', 'ಇ-ಕೆವೈಸಿ ಪರಿಶೀಲನೆಗೆ ಕಡ್ಡಾಯ'),
('22222222-2222-2222-2222-222222222206', 'Land Record / RTC (Pahani) Document', 'ಕೃಷಿ ಭೂಮಿಯ ಪಹಣಿ / ಆರ್‌ಟಿಸಿ', true, 'Proof of cultivable land ownership in applicant name', 'ಅರ್ಜಿದಾರರ ಹೆಸರಿನಲ್ಲಿ ಕೃಷಿ ಭೂಮಿ ಮಾಲೀಕತ್ವದ ಪುರಾವೆ'),
('22222222-2222-2222-2222-222222222206', 'Bank Account Passbook (NPCI mapped)', 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ (ಎನ್‌ಪಿಸಿಐ ಮ್ಯಾಪ್ಡ್)', true, 'For direct central transfer', 'ಕೇಂದ್ರ ಸರ್ಕಾರದ ನೇರ ವರ್ಗಾವಣೆಗೆ'),

-- Documents for PMAY-G
('22222222-2222-2222-2222-222222222207', 'Aadhaar Card of all family members', 'ಕುಟುಂಬದ ಎಲ್ಲರ ಆಧಾರ್ ಕಾರ್ಡ್', true, 'Family census validation', 'ಕುಟುಂಬ ಸದಸ್ಯರ ಪರಿಶೀಲನೆ'),
('22222222-2222-2222-2222-222222222207', 'MGNREGA Job Card', 'ಉದ್ಯೋಗ ಖಾತರಿ ಜಾಬ್ ಕಾರ್ಡ್', true, 'For 90/95 days unskilled labor wages', 'ಅಕುಶಲ ಕಾರ್ಮಿಕ ಕೂಲಿ ಪಾವತಿಗೆ'),
('22222222-2222-2222-2222-222222222207', 'Land Site Ownership or Allotment Hakku Patra', 'ನಿವೇಶನ ಹಕ್ಕು ಪತ್ರ / ನಿವೇಶನ ಮಾಲೀಕತ್ವ', true, 'Proof of homestead land for construction', 'ಮನೆ ನಿರ್ಮಾಣದ ಜಾಗದ ಹಕ್ಕು ಪತ್ರ'),

-- Documents for PM Mudra Yojana
('22222222-2222-2222-2222-222222222209', 'Aadhaar / Voter ID / Passport (KYC)', 'ಆಧಾರ್ / ವೋಟರ್ ಐಡಿ (ಕೆವೈಸಿ)', true, 'Proof of identity and residence', 'ಗುರುತು ಮತ್ತು ವಾಸಸ್ಥಳ ಪುರಾವೆ'),
('22222222-2222-2222-2222-222222222209', 'Business Enterprise Registration / Udyam Certificate', 'ಉದ್ಯಮ ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರ', false, 'Optional for Shishu, recommended for Kishore/Tarun', 'ವ್ಯವಹಾರ ನೋಂದಣಿ ಪುರಾವೆ'),
('22222222-2222-2222-2222-222222222209', 'Bank Statement of last 6 months', 'ಕಳೆದ 6 ತಿಂಗಳ ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್', true, 'Banking and cash flow history', 'ಹಣಕಾಸು ವಹಿವಾಟು ಪರಿಶೀಲನೆ');
