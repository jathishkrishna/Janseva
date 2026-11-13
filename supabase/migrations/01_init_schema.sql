-- ====================================================================
-- JANSEVA DATABASE SCHEMA: 01_init_schema.sql
-- All Government Benefits in One Place
-- Target: Karnataka Government & Central Government of India
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Drop existing tables if re-running
DROP TABLE IF EXISTS eligibility_results CASCADE;
DROP TABLE IF EXISTS eligibility_checks CASCADE;
DROP TABLE IF EXISTS saved_schemes CASCADE;
DROP TABLE IF EXISTS required_documents CASCADE;
DROP TABLE IF EXISTS eligibility_rules CASCADE;
DROP TABLE IF EXISTS schemes CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS admin_roles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 3. Profiles Table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'kn')),
    state TEXT DEFAULT 'Karnataka',
    district TEXT,
    age INT CHECK (age >= 0 AND age <= 130),
    gender TEXT CHECK (gender IN ('All', 'Male', 'Female', 'Transgender', 'Other', NULL)),
    education TEXT,
    occupation TEXT,
    annual_income NUMERIC(12, 2) CHECK (annual_income >= 0),
    social_category TEXT,
    is_differently_abled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Admin Roles Table (Secure Role-Based Access Control)
CREATE TABLE admin_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Benefit Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_kn TEXT NOT NULL,
    description_en TEXT,
    description_kn TEXT,
    icon TEXT NOT NULL DEFAULT 'Folder',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Schemes Table
CREATE TABLE schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    scheme_name_en TEXT NOT NULL,
    scheme_name_kn TEXT NOT NULL,
    short_description_en TEXT NOT NULL,
    short_description_kn TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_kn TEXT NOT NULL,
    government_level TEXT NOT NULL CHECK (government_level IN ('Karnataka', 'Central')),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    department_en TEXT NOT NULL,
    department_kn TEXT NOT NULL,
    target_beneficiaries_en TEXT NOT NULL,
    target_beneficiaries_kn TEXT NOT NULL,
    benefits_en TEXT NOT NULL,
    benefits_kn TEXT NOT NULL,
    eligibility_summary_en TEXT NOT NULL,
    eligibility_summary_kn TEXT NOT NULL,
    application_procedure_en TEXT NOT NULL,
    application_procedure_kn TEXT NOT NULL,
    application_url TEXT NOT NULL,
    official_source_url TEXT NOT NULL,
    application_start_date DATE,
    application_end_date DATE,
    verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_review', 'demonstration')),
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Eligibility Rules Table (Dynamic & Configurable)
-- Field names correspond to profile keys: age, annual_income, state, district, gender, education, occupation, social_category, is_differently_abled
-- Operators: equals, not_equals, greater_than_or_equal, less_than_or_equal, in, not_in, contains
CREATE TABLE eligibility_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    field_name TEXT NOT NULL,
    operator TEXT NOT NULL CHECK (operator IN ('equals', 'not_equals', 'greater_than_or_equal', 'less_than_or_equal', 'in', 'not_in', 'contains')),
    expected_value JSONB NOT NULL,
    is_mandatory BOOLEAN NOT NULL DEFAULT TRUE,
    rule_description_en TEXT NOT NULL,
    rule_description_kn TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Required Documents Table
CREATE TABLE required_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    document_name_en TEXT NOT NULL,
    document_name_kn TEXT NOT NULL,
    is_mandatory BOOLEAN NOT NULL DEFAULT TRUE,
    description_en TEXT,
    description_kn TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Saved Schemes (Bookmarks / Favourites)
CREATE TABLE saved_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, scheme_id)
);

-- 10. Eligibility Checks Table (History of checks run by users or guests)
CREATE TABLE eligibility_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    profile_data JSONB NOT NULL,
    total_eligible INT DEFAULT 0,
    total_possibly_eligible INT DEFAULT 0,
    total_not_eligible INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Eligibility Results Table (Detailed breakdown per scheme)
CREATE TABLE eligibility_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    eligibility_check_id UUID NOT NULL REFERENCES eligibility_checks(id) ON DELETE CASCADE,
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    match_status TEXT NOT NULL CHECK (match_status IN ('eligible', 'possibly_eligible', 'not_eligible')),
    matched_conditions JSONB DEFAULT '[]'::jsonb,
    missing_conditions JSONB DEFAULT '[]'::jsonb,
    failed_conditions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning-fast search and matching
CREATE INDEX idx_schemes_gov_level ON schemes(government_level);
CREATE INDEX idx_schemes_category ON schemes(category_id);
CREATE INDEX idx_schemes_verification ON schemes(verification_status);
CREATE INDEX idx_eligibility_rules_scheme ON eligibility_rules(scheme_id);
CREATE INDEX idx_required_documents_scheme ON required_documents(scheme_id);
CREATE INDEX idx_saved_schemes_user ON saved_schemes(user_id);
CREATE INDEX idx_eligibility_checks_user ON eligibility_checks(user_id);
CREATE INDEX idx_eligibility_results_check ON eligibility_results(eligibility_check_id);
