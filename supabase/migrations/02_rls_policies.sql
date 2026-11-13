-- ====================================================================
-- JANSEVA RLS POLICIES: 02_rls_policies.sql
-- Row Level Security for Schemes, Profiles, Saved Schemes & Admin Actions
-- ====================================================================

-- 1. Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE required_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_results ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_roles
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Profiles policies
-- Public cannot read profiles. Users can read and update only their own profile.
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

-- 3. Categories policies
-- Anyone can view categories. Only admins can insert/update/delete.
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  USING (is_admin());

-- 4. Schemes policies
-- Public can view published schemes. Admins can view and manage all schemes.
CREATE POLICY "Public can view verified schemes"
  ON schemes FOR SELECT
  USING (verification_status = 'verified' OR is_admin());

CREATE POLICY "Admins can insert schemes"
  ON schemes FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update schemes"
  ON schemes FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete schemes"
  ON schemes FOR DELETE
  USING (is_admin());

-- 5. Eligibility rules policies
-- Public can view rules for matching. Only admins can modify.
CREATE POLICY "Public can view eligibility rules"
  ON eligibility_rules FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert eligibility rules"
  ON eligibility_rules FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update eligibility rules"
  ON eligibility_rules FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete eligibility rules"
  ON eligibility_rules FOR DELETE
  USING (is_admin());

-- 6. Required documents policies
-- Public can view documents. Only admins can modify.
CREATE POLICY "Public can view required documents"
  ON required_documents FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert required documents"
  ON required_documents FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update required documents"
  ON required_documents FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete required documents"
  ON required_documents FOR DELETE
  USING (is_admin());

-- 7. Saved schemes policies
-- Users can manage only their own saved schemes.
CREATE POLICY "Users can view own saved schemes"
  ON saved_schemes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved schemes"
  ON saved_schemes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved schemes"
  ON saved_schemes FOR DELETE
  USING (auth.uid() = user_id);

-- 8. Eligibility checks policies
-- Users can view their own checks. Anonymous checks are allowed insert.
CREATE POLICY "Users can view own eligibility checks"
  ON eligibility_checks FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert eligibility checks"
  ON eligibility_checks FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 9. Eligibility results policies
CREATE POLICY "Users can view eligibility results"
  ON eligibility_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM eligibility_checks
      WHERE eligibility_checks.id = eligibility_results.eligibility_check_id
      AND (eligibility_checks.user_id = auth.uid() OR eligibility_checks.user_id IS NULL)
    )
  );

CREATE POLICY "Anyone can insert eligibility results"
  ON eligibility_results FOR INSERT
  WITH CHECK (true);

-- 10. Admin roles policies
-- Admins can view who is an admin.
CREATE POLICY "Admins can view admin roles"
  ON admin_roles FOR SELECT
  USING (is_admin());
