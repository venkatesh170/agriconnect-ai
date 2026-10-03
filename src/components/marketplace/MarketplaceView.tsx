import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  LayoutGrid,
  List,
  Sparkles,
  ShieldCheck,
  X,
  Scale
} from 'lucide-react';
import { ProductCategory } from '../../types';
import { CATEGORIES } from '../../data/seedData';

export const MarketplaceView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    compareList,
    setIsCompareOpen,
    clearCompare,
    t
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'freshness'>('featured');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchFarmer = p.farmerName.toLowerCase().includes(q);
          const matchLocation = p.farmerLocation.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchFarmer && !matchLocation && !matchCategory && !matchTags) {
            return false;
          }
        }
        // Organic filter
        if (organicOnly && !p.isOrganic) {
          return false;
        }
        // Price filter
        const price = p.discountPrice ?? p.price;
        if (price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'freshness') return (b.expiryEstimateDays || 0) - (a.expiryEstimateDays || 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, organicOnly, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setOrganicOnly(false);
    setMaxPrice(1200);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen py-8 bg-slatebg dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Direct Farm Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse harvest-ready produce directly from verified farmers with transparent mandi benchmarking.
          </p>
        </div>

        {/* Horizontal Category Pill Carousel */}
        <div className="mb-6 overflow-x-auto pb-2 flex items-center gap-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-brand-600 text-white shadow-soft-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-brand-500'
            }`}
          >
            All Produce ({products.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.name
                  ? 'bg-brand-600 text-white shadow-soft-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-brand-500'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Main Layout: Filters Sidebar Left + Products Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                <span>Filters</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-[11px] text-brand-600 dark:text-emerald-400 hover:underline font-semibold"
              >
                Reset All
              </button>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                <span>Max Price:</span>
                <span className="text-brand-600 dark:text-emerald-400">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="30"
                max="1200"
                step="10"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹30</span>
                <span>₹1200+</span>
              </div>
            </div>

            {/* Organic Verification Filter */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={organicOnly}
                  onChange={e => setOrganicOnly(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Certified Organic Only</span>
                </span>
              </label>
            </div>

            {/* Quick Categories Filter */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Categories
              </h4>
              <div className="space-y-1.5">
                {CATEGORIES.slice(0, 6).map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.name)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-xl transition-colors flex items-center justify-between ${
                      selectedCategory === c.name
                        ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-emerald-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-slate-400">({c.itemCount})</span>
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Products Column */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Search, Sort, View mode */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Search Bar Input */}
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter within results..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Right tools: Sort & Mobile filter trigger */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Showing <strong className="text-slate-800 dark:text-slate-100">{filteredProducts.length}</strong> items
                </span>

                {/* Sort dropdown */}
                <div className="flex items-center gap-1.5 text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
                  >
                    <option value="featured">Featured Harvests</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="freshness">Freshest Harvest</option>
                  </select>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Mobile Filters Dropdown Drawer */}
            {mobileFilterOpen && (
              <div className="lg:hidden p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase text-slate-400">Mobile Filter Controls</h3>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Max Price: ₹{maxPrice}</label>
                  <input
                    type="range"
                    min="30"
                    max="1200"
                    step="10"
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-brand-600"
                  />
                </div>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={e => setOrganicOnly(e.target.checked)}
                    className="rounded text-brand-600"
                  />
                  <span>100% Certified Organic Only</span>
                </label>
              </div>
            )}

            {/* Products List or Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No crops matched your filters
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting the price slider, switching categories, or clearing your search term.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Floating Compare Bar (Sticky at bottom if items selected) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="glass-panel p-4 rounded-3xl shadow-soft-xl border border-brand-500/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Comparing {compareList.length} of 3 crops
                </p>
                <p className="text-[10px] text-slate-400">Nutrients, price, harvest age</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearCompare}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
              >
                Clear
              </button>
              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-soft-sm transition-all"
              >
                Compare Side-by-Side
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
