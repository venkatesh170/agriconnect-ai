import React from 'react';
import { CATEGORIES } from '../../data/seedData';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategory, setCurrentView, t } = useApp();

  const handleCategorySelect = (categoryName: ProductCategory) => {
    setSelectedCategory(categoryName);
    setCurrentView('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-emerald-400 uppercase tracking-widest mb-1.5">
              <span>Farm Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('exploreCategories')}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Freshly sourced across 12 authentic agriculture categories with certified origin tracing.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentView('marketplace');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-brand-700 dark:text-emerald-400 hover:text-brand-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Produce Catalog</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {CATEGORIES.map(category => (
            <div
              key={category.id}
              onClick={() => handleCategorySelect(category.name)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500 hover:shadow-soft-md transition-all duration-300 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-28 w-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img
                  src={category.image}
                  alt={category.displayName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                  {category.itemCount} items
                </span>
              </div>

              {/* Title & Desc */}
              <div className="p-3 text-center flex-1 flex flex-col justify-center">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
