import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { schemeService } from '../services/schemeService';
import BenefitCard from '../components/BenefitCard';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import { BenefitCardSkeleton } from '../components/LoadingSpinner';
import { 
  Compass, 
  Search, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';

export default function ExploreBenefits() {
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse filters from URL params or use defaults
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    governmentLevel: searchParams.get('gov') || 'all',
    categoryId: searchParams.get('category') || 'all',
    education: searchParams.get('education') || 'all',
    gender: searchParams.get('gender') || 'all',
    sortBy: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: 9
  });

  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state changes with URL query parameters
  useEffect(() => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.governmentLevel !== 'all') params.gov = filters.governmentLevel;
    if (filters.categoryId !== 'all') params.category = filters.categoryId;
    if (filters.education !== 'all') params.education = filters.education;
    if (filters.gender !== 'all') params.gender = filters.gender;
    if (filters.sortBy !== 'newest') params.sort = filters.sortBy;
    if (filters.page > 1) params.page = String(filters.page);
    setSearchParams(params, { replace: true });
  }, [filters]);

  // Load schemes from backend
  useEffect(() => {
    async function loadSchemes() {
      try {
        setLoading(true);
        const [schemesRes, catRes] = await Promise.all([
          schemeService.getSchemes(filters),
          schemeService.getCategories()
        ]);

        setSchemes(schemesRes.data || []);
        setTotal(schemesRes.total || 0);
        setTotalPages(schemesRes.totalPages || 1);
        setCategories(catRes.data || []);
      } catch (err) {
        console.error('Error fetching schemes:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSchemes();
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      governmentLevel: 'all',
      categoryId: 'all',
      education: 'all',
      gender: 'all',
      sortBy: 'newest',
      page: 1,
      pageSize: 9
    });
  };

  const handleSearchChange = (query) => {
    setFilters(prev => ({ ...prev, search: query, page: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
          <Compass className="w-3.5 h-3.5 text-janseva-navy-800" />
          <span>{lang === 'kn' ? 'ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ಕೋಶ' : 'Central & Karnataka Catalog'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('exploreTitle')}
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          {t('exploreSubtitle')}
        </p>
      </div>

      {/* Top Search Bar & Mobile Filter Trigger */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <SearchBar
            value={filters.search}
            onChange={handleSearchChange}
            onSearch={handleSearchChange}
            showTags={false}
          />
        </div>

        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden w-full sm:w-auto px-4 py-3 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center gap-2 shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{lang === 'kn' ? 'ಫಿಲ್ಟರ್‌ಗಳು' : 'Filters'}</span>
        </button>
      </div>

      {/* Main Grid: Filter Sidebar + Scheme Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <FilterPanel
            filters={filters}
            categories={categories}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            totalResults={total}
          />
        </div>

        {/* Mobile Filter Drawer / Toggle */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-1">
            <FilterPanel
              filters={filters}
              categories={categories}
              onFilterChange={(newF) => {
                setFilters(newF);
                setMobileFilterOpen(false);
              }}
              onResetFilters={() => {
                handleResetFilters();
                setMobileFilterOpen(false);
              }}
              totalResults={total}
            />
          </div>
        )}

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Result Count and Sort Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs text-slate-500">
            <span>
              {t('showingResults')} <strong className="text-slate-900 font-bold">{schemes.length}</strong> {t('ofResults')} <strong className="text-slate-900 font-bold">{total}</strong> {t('schemesFound')}
            </span>

            {(filters.governmentLevel !== 'all' || filters.categoryId !== 'all' || filters.search) && (
              <button
                onClick={handleResetFilters}
                className="text-janseva-saffron-600 hover:underline font-semibold"
              >
                {t('clearFilters')}
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BenefitCardSkeleton />
              <BenefitCardSkeleton />
              <BenefitCardSkeleton />
              <BenefitCardSkeleton />
              <BenefitCardSkeleton />
              <BenefitCardSkeleton />
            </div>
          ) : schemes.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <FolderOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">
                  {t('noSchemesFound')}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {t('noSchemesReset')}
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
              >
                {t('clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme) => (
                <BenefitCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                disabled={filters.page <= 1}
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ಹಿಂದಿನದು' : 'Previous'}</span>
              </button>

              <span className="text-xs font-semibold text-slate-600">
                {lang === 'kn' ? 'ಪುಟ' : 'Page'} {filters.page} / {totalPages}
              </span>

              <button
                type="button"
                disabled={filters.page >= totalPages}
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
              >
                <span>{lang === 'kn' ? 'ಮುಂದಿನದು' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
