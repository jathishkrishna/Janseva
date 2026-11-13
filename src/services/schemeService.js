import { supabase, isSupabaseConfigured } from './supabase';
import {
  INITIAL_CATEGORIES,
  INITIAL_SCHEMES,
  INITIAL_RULES,
  INITIAL_DOCUMENTS
} from './seedData';

const LOCAL_STORAGE_KEYS = {
  CATEGORIES: 'janseva_categories',
  SCHEMES: 'janseva_schemes',
  RULES: 'janseva_rules',
  DOCUMENTS: 'janseva_documents'
};

// Local storage helper functions
function getLocalItem(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving to local storage:', err);
  }
}

// Initialize local database if not already stored
export function initializeLocalStore() {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.CATEGORIES)) {
    setLocalItem(LOCAL_STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.SCHEMES)) {
    setLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
  }
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.RULES)) {
    setLocalItem(LOCAL_STORAGE_KEYS.RULES, INITIAL_RULES);
  }
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.DOCUMENTS)) {
    setLocalItem(LOCAL_STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
  }
}

export const schemeService = {
  /**
   * Fetch all benefit categories
   */
  async getCategories() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return { data, source: 'supabase' };
    } else {
      initializeLocalStore();
      const data = getLocalItem(LOCAL_STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      return { data, source: 'local_store' };
    }
  },

  /**
   * Fetch all schemes with filtering, search, sorting and pagination
   */
  async getSchemes(filters = {}) {
    const {
      search = '',
      governmentLevel = 'all',
      categoryId = 'all',
      education = 'all',
      occupation = 'all',
      maxIncome = null,
      maxAge = null,
      gender = 'all',
      sortBy = 'newest',
      page = 1,
      pageSize = 9,
      isFeaturedOnly = false
    } = filters;

    if (isSupabaseConfigured()) {
      let query = supabase.from('schemes').select('*, categories(*)', { count: 'exact' });

      if (isFeaturedOnly) {
        query = query.eq('is_featured', true);
      }

      if (governmentLevel !== 'all') {
        query = query.eq('government_level', governmentLevel);
      }

      if (categoryId !== 'all') {
        query = query.eq('category_id', categoryId);
      }

      if (search.trim()) {
        const searchTerm = `%${search.trim()}%`;
        query = query.or(`scheme_name_en.ilike.${searchTerm},scheme_name_kn.ilike.${searchTerm},short_description_en.ilike.${searchTerm},department_en.ilike.${searchTerm}`);
      }

      // Sorting
      if (sortBy === 'nameAsc') {
        query = query.order('scheme_name_en', { ascending: true });
      } else if (sortBy === 'deadline') {
        query = query.order('application_end_date', { ascending: true, nullsFirst: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        data: data || [],
        total: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
        source: 'supabase'
      };
    } else {
      // Local store implementation
      initializeLocalStore();
      let allSchemes = getLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
      const categories = getLocalItem(LOCAL_STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      const catMap = new Map(categories.map(c => [c.id, c]));

      let filtered = allSchemes.map(s => ({
        ...s,
        categories: catMap.get(s.category_id)
      }));

      if (isFeaturedOnly) {
        filtered = filtered.filter(s => s.is_featured);
      }

      if (governmentLevel !== 'all') {
        filtered = filtered.filter(s => s.government_level.toLowerCase() === governmentLevel.toLowerCase());
      }

      if (categoryId !== 'all') {
        filtered = filtered.filter(s => s.category_id === categoryId);
      }

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(s =>
          (s.scheme_name_en && s.scheme_name_en.toLowerCase().includes(q)) ||
          (s.scheme_name_kn && s.scheme_name_kn.toLowerCase().includes(q)) ||
          (s.short_description_en && s.short_description_en.toLowerCase().includes(q)) ||
          (s.department_en && s.department_en.toLowerCase().includes(q))
        );
      }

      // Sorting
      if (sortBy === 'nameAsc') {
        filtered.sort((a, b) => a.scheme_name_en.localeCompare(b.scheme_name_en));
      } else if (sortBy === 'deadline') {
        filtered.sort((a, b) => {
          if (!a.application_end_date) return 1;
          if (!b.application_end_date) return -1;
          return new Date(a.application_end_date) - new Date(b.application_end_date);
        });
      } else {
        filtered.sort((a, b) => new Date(b.last_verified_at || 0) - new Date(a.last_verified_at || 0));
      }

      const total = filtered.length;
      const start = (page - 1) * pageSize;
      const paginated = filtered.slice(start, start + pageSize);

      return {
        data: paginated,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
        source: 'local_store'
      };
    }
  },

  /**
   * Fetch scheme by ID or Slug
   */
  async getSchemeById(idOrSlug) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('schemes')
        .select('*, categories(*), eligibility_rules(*), required_documents(*)')
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .single();
      if (error) throw error;
      return { data, source: 'supabase' };
    } else {
      initializeLocalStore();
      const schemes = getLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
      const categories = getLocalItem(LOCAL_STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      const rules = getLocalItem(LOCAL_STORAGE_KEYS.RULES, INITIAL_RULES);
      const docs = getLocalItem(LOCAL_STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);

      const scheme = schemes.find(s => s.id === idOrSlug || s.slug === idOrSlug);
      if (!scheme) throw new Error('Scheme not found');

      const fullScheme = {
        ...scheme,
        categories: categories.find(c => c.id === scheme.category_id),
        eligibility_rules: rules.filter(r => r.scheme_id === scheme.id),
        required_documents: docs.filter(d => d.scheme_id === scheme.id)
      };

      return { data: fullScheme, source: 'local_store' };
    }
  },

  /**
   * Fetch all eligibility rules
   */
  async getAllRules() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('eligibility_rules').select('*');
      if (error) throw error;
      return { data, source: 'supabase' };
    } else {
      initializeLocalStore();
      const data = getLocalItem(LOCAL_STORAGE_KEYS.RULES, INITIAL_RULES);
      return { data, source: 'local_store' };
    }
  },

  /**
   * Fetch all required documents
   */
  async getAllDocuments() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('required_documents').select('*');
      if (error) throw error;
      return { data, source: 'supabase' };
    } else {
      initializeLocalStore();
      const data = getLocalItem(LOCAL_STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
      return { data, source: 'local_store' };
    }
  },

  /**
   * Get database-derived statistics
   */
  async getStats() {
    if (isSupabaseConfigured()) {
      const [schemesRes, rulesRes, catRes] = await Promise.all([
        supabase.from('schemes').select('government_level, verification_status'),
        supabase.from('eligibility_rules').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true })
      ]);

      const schemes = schemesRes.data || [];
      const totalSchemes = schemes.length;
      const karnatakaSchemes = schemes.filter(s => s.government_level === 'Karnataka').length;
      const centralSchemes = schemes.filter(s => s.government_level === 'Central').length;
      const verifiedSchemes = schemes.filter(s => s.verification_status === 'verified').length;

      return {
        totalSchemes,
        karnatakaSchemes,
        centralSchemes,
        verifiedSchemes,
        categoriesCount: catRes.count || 4,
        activeRulesCount: rulesRes.count || 25,
        source: 'supabase'
      };
    } else {
      initializeLocalStore();
      const schemes = getLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
      const rules = getLocalItem(LOCAL_STORAGE_KEYS.RULES, INITIAL_RULES);
      const categories = getLocalItem(LOCAL_STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);

      return {
        totalSchemes: schemes.length,
        karnatakaSchemes: schemes.filter(s => s.government_level === 'Karnataka').length,
        centralSchemes: schemes.filter(s => s.government_level === 'Central').length,
        verifiedSchemes: schemes.filter(s => s.verification_status === 'verified').length,
        categoriesCount: categories.length,
        activeRulesCount: rules.length,
        source: 'local_store'
      };
    }
  },

  /**
   * Create new scheme (Admin only)
   */
  async createScheme(schemeData) {
    const newId = crypto.randomUUID();
    const slug = (schemeData.scheme_name_en || 'scheme')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const record = {
      id: newId,
      slug,
      ...schemeData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_verified_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('schemes').insert([record]).select().single();
      if (error) throw error;
      return { data, source: 'supabase' };
    } else {
      initializeLocalStore();
      const schemes = getLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
      schemes.unshift(record);
      setLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, schemes);
      return { data: record, source: 'local_store' };
    }
  },

  /**
   * Update existing scheme (Admin only)
   */
  async updateScheme(id, schemeData) {
    const updated = {
      ...schemeData,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('schemes')
        .update(updated)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return { data, source: 'supabase' };
    } else {
      initializeLocalStore();
      const schemes = getLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
      const idx = schemes.findIndex(s => s.id === id);
      if (idx === -1) throw new Error('Scheme not found');
      schemes[idx] = { ...schemes[idx], ...updated };
      setLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, schemes);
      return { data: schemes[idx], source: 'local_store' };
    }
  },

  /**
   * Delete scheme (Admin only)
   */
  async deleteScheme(id) {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('schemes').delete().eq('id', id);
      if (error) throw error;
      return { success: true, source: 'supabase' };
    } else {
      initializeLocalStore();
      let schemes = getLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, INITIAL_SCHEMES);
      schemes = schemes.filter(s => s.id !== id);
      setLocalItem(LOCAL_STORAGE_KEYS.SCHEMES, schemes);

      // Also clean up rules & documents for this scheme
      let rules = getLocalItem(LOCAL_STORAGE_KEYS.RULES, INITIAL_RULES);
      rules = rules.filter(r => r.scheme_id !== id);
      setLocalItem(LOCAL_STORAGE_KEYS.RULES, rules);

      let docs = getLocalItem(LOCAL_STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
      docs = docs.filter(d => d.scheme_id !== id);
      setLocalItem(LOCAL_STORAGE_KEYS.DOCUMENTS, docs);

      return { success: true, source: 'local_store' };
    }
  },

  /**
   * Add eligibility rule to scheme (Admin only)
   */
  async addRule(ruleData) {
    const record = {
      id: crypto.randomUUID(),
      ...ruleData,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('eligibility_rules').insert([record]).select().single();
      if (error) throw error;
      return { data, source: 'supabase' };
    } else {
      initializeLocalStore();
      const rules = getLocalItem(LOCAL_STORAGE_KEYS.RULES, INITIAL_RULES);
      rules.push(record);
      setLocalItem(LOCAL_STORAGE_KEYS.RULES, rules);
      return { data: record, source: 'local_store' };
    }
  },

  /**
   * Delete eligibility rule (Admin only)
   */
  async deleteRule(id) {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('eligibility_rules').delete().eq('id', id);
      if (error) throw error;
      return { success: true, source: 'supabase' };
    } else {
      initializeLocalStore();
      let rules = getLocalItem(LOCAL_STORAGE_KEYS.RULES, INITIAL_RULES);
      rules = rules.filter(r => r.id !== id);
      setLocalItem(LOCAL_STORAGE_KEYS.RULES, rules);
      return { success: true, source: 'local_store' };
    }
  }
};
