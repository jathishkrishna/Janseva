import { supabase, isSupabaseConfigured } from './supabase';

const AUTH_USER_KEY = 'janseva_current_user';
const SAVED_SCHEMES_KEY = 'janseva_saved_schemes';
const PROFILES_KEY = 'janseva_profiles';

// Demo admin account for testing when Supabase credentials are not yet configured
const DEMO_ADMIN = {
  id: '99999999-9999-9999-9999-999999999999',
  email: 'admin@janseva.gov.in',
  full_name: 'JanSeva Nodal Administrator',
  role: 'admin',
  preferred_language: 'en',
  state: 'Karnataka',
  created_at: '2026-01-01T00:00:00Z'
};

const DEMO_CITIZEN = {
  id: '88888888-8888-8888-8888-888888888888',
  email: 'citizen@janseva.org',
  full_name: 'Anand Kumar',
  role: 'citizen',
  preferred_language: 'en',
  state: 'Karnataka',
  district: 'Bengaluru Urban',
  age: 22,
  education: 'Undergraduate Degree',
  occupation: 'Student',
  annual_income: 180000,
  gender: 'Male',
  created_at: '2026-01-15T00:00:00Z'
};

function getLocalSavedSchemes() {
  try {
    const list = localStorage.getItem(SAVED_SCHEMES_KEY);
    return list ? JSON.parse(list) : [];
  } catch {
    return [];
  }
}

function setLocalSavedSchemes(list) {
  localStorage.setItem(SAVED_SCHEMES_KEY, JSON.stringify(list));
}

export const authService = {
  /**
   * Get current authenticated user session
   */
  async getCurrentUser() {
    if (isSupabaseConfigured()) {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return null;

      // Fetch user profile and admin role
      const [profileRes, adminRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('admin_roles').select('role').eq('user_id', user.id).single()
      ]);

      const profile = profileRes.data || {};
      const isAdmin = Boolean(adminRes.data?.role);

      return {
        id: user.id,
        email: user.email,
        ...profile,
        role: isAdmin ? (adminRes.data.role || 'admin') : 'citizen',
        isAdmin
      };
    } else {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      if (stored) {
        try {
          const user = JSON.parse(stored);
          return {
            ...user,
            isAdmin: user.role === 'admin' || user.email === 'admin@janseva.gov.in'
          };
        } catch {
          return null;
        }
      }
      return null;
    }
  },

  /**
   * User Registration
   */
  async register({ email, password, full_name, preferred_language = 'en', state = 'Karnataka', district = '' }) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            preferred_language,
            state,
            district
          }
        }
      });
      if (error) throw error;

      if (data.user) {
        // Insert into profiles table
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name,
          email,
          preferred_language,
          state,
          district,
          created_at: new Date().toISOString()
        });
      }

      return { user: data.user };
    } else {
      // Local demo registration
      const newUser = {
        id: crypto.randomUUID(),
        email,
        full_name,
        preferred_language,
        state,
        district,
        role: email.toLowerCase().includes('admin') ? 'admin' : 'citizen',
        created_at: new Date().toISOString()
      };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
      return { user: newUser };
    }
  },

  /**
   * User Login
   */
  async login({ email, password }) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return await this.getCurrentUser();
    } else {
      // Local demo sign in: matches demo admin or demo citizen or any previously registered email
      let user;
      if (email.toLowerCase() === 'admin@janseva.gov.in') {
        user = { ...DEMO_ADMIN };
      } else if (email.toLowerCase() === 'citizen@janseva.org') {
        user = { ...DEMO_CITIZEN };
      } else {
        const stored = localStorage.getItem(AUTH_USER_KEY);
        if (stored) {
          user = JSON.parse(stored);
        } else {
          user = {
            id: crypto.randomUUID(),
            email,
            full_name: email.split('@')[0],
            preferred_language: 'en',
            state: 'Karnataka',
            role: email.toLowerCase().includes('admin') ? 'admin' : 'citizen',
            created_at: new Date().toISOString()
          };
        }
      }

      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      return {
        ...user,
        isAdmin: user.role === 'admin'
      };
    }
  },

  /**
   * User Logout
   */
  async logout() {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  },

  /**
   * Update User Profile
   */
  async updateProfile(userId, profileData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      if (stored) {
        const current = JSON.parse(stored);
        const updated = { ...current, ...profileData, updated_at: new Date().toISOString() };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
        return updated;
      }
      return profileData;
    }
  },

  /**
   * Delete User Profile & Associated Records
   */
  async deleteUserData(userId) {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error) throw error;
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
      // Clean user saved schemes
      const saved = getLocalSavedSchemes().filter(item => item.user_id !== userId);
      setLocalSavedSchemes(saved);
    }
    return true;
  },

  /**
   * Toggle Save / Bookmark Scheme
   */
  async toggleSaveScheme(userId, schemeId) {
    if (!userId) throw new Error('User must be logged in to save schemes');

    if (isSupabaseConfigured()) {
      // Check if already saved
      const { data: existing } = await supabase
        .from('saved_schemes')
        .select('id')
        .eq('user_id', userId)
        .eq('scheme_id', schemeId)
        .maybeSingle();

      if (existing) {
        await supabase.from('saved_schemes').delete().eq('id', existing.id);
        return { saved: false };
      } else {
        await supabase.from('saved_schemes').insert({
          user_id: userId,
          scheme_id: schemeId,
          created_at: new Date().toISOString()
        });
        return { saved: true };
      }
    } else {
      let saved = getLocalSavedSchemes();
      const existingIdx = saved.findIndex(item => item.user_id === userId && item.scheme_id === schemeId);

      if (existingIdx !== -1) {
        saved.splice(existingIdx, 1);
        setLocalSavedSchemes(saved);
        return { saved: false };
      } else {
        saved.push({
          id: crypto.randomUUID(),
          user_id: userId,
          scheme_id: schemeId,
          created_at: new Date().toISOString()
        });
        setLocalSavedSchemes(saved);
        return { saved: true };
      }
    }
  },

  /**
   * Get all saved schemes for a user
   */
  async getSavedSchemes(userId) {
    if (!userId) return [];

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('saved_schemes')
        .select('scheme_id, created_at, schemes(*, categories(*))')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(item => item.schemes);
    } else {
      const saved = getLocalSavedSchemes().filter(item => item.user_id === userId);
      const allSchemes = JSON.parse(localStorage.getItem('janseva_schemes') || '[]');
      const categories = JSON.parse(localStorage.getItem('janseva_categories') || '[]');
      const catMap = new Map(categories.map(c => [c.id, c]));

      return saved.map(s => {
        const scheme = allSchemes.find(item => item.id === s.scheme_id);
        if (!scheme) return null;
        return {
          ...scheme,
          categories: catMap.get(scheme.category_id)
        };
      }).filter(Boolean);
    }
  }
};
