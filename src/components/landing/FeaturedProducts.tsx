import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../marketplace/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, setCurrentView, t } = useApp();
  const [filterTab, setFilterTab] = useState<'all' | 'veg-fruit' | 'dairy-honey' | 'organic'>('all');

  const filteredProducts = products.filter(p => {
    if (filterTab === 'veg-fruit') {
      return p.category === 'Vegetables' || p.category === 'Fruits';
    }
    if (filterTab === 'dairy-honey') {
      return p.category === 'Dairy' || p.category === 'Honey' || p.category === 'Poultry';
    }
    if (filterTab === 'organic') {
      return p.isOrganic;
    }
    return p.isFeatured || p.rating >= 4.85;
  });

  return (
    <section className="py-14 sm:py-20 bg-slatebg dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-harvest-600 dark:text-harvest-400 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Farm Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('featuredHarvest')}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Hand-picked seasonal harvests directly from verified organic farms across India.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'veg-fruit', label: 'Fresh Veg & Fruits' },
              { id: 'dairy-honey', label: 'A2 Dairy & Honey' },
              { id: 'organic', label: '100% Organic' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filterTab === tab.id
                    ? 'bg-brand-600 text-white shadow-soft-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setCurrentView('marketplace');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft-sm hover:border-brand-500 text-xs sm:text-sm font-bold text-slate-800 dark:text-white hover:text-brand-600 dark:hover:text-emerald-400 transition-all group"
          >
            <span>Explore All {products.length}+ Direct Farm Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
