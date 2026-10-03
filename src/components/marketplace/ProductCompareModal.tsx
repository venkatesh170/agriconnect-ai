import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, ShieldCheck, ShoppingCart, Trash2, Scale } from 'lucide-react';

export const ProductCompareModal: React.FC = () => {
  const {
    isCompareOpen,
    setIsCompareOpen,
    compareList,
    products,
    toggleCompare,
    clearCompare,
    addToCart
  } = useApp();

  if (!isCompareOpen) return null;

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setIsCompareOpen(false)}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-emerald-400 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Produce Comparison Matrix
              </h3>
              <p className="text-[11px] text-slate-400">Side-by-side nutrition, pricing, and origin transparency</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold px-2 py-1"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Comparison Table */}
        <div className="overflow-x-auto p-4 sm:p-6">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No products selected for comparison. Add items using the scale icon on product cards.
            </div>
          ) : (
            <div className="min-w-[600px]">
              <div className="grid grid-cols-4 gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="font-bold text-xs text-slate-400 uppercase tracking-wider self-end">
                  Feature
                </div>
                {comparedProducts.map(p => (
                  <div key={p.id} className="relative text-center space-y-2">
                    <button
                      onClick={() => toggleCompare(p.id)}
                      className="absolute -top-1 -right-1 text-slate-400 hover:text-rose-500 p-1"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-20 h-20 rounded-2xl object-cover mx-auto shadow-sm"
                    />
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 h-8">
                      {p.name}
                    </h4>
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                
                {/* Price Row */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-bold text-slate-500">Direct Farm Price</span>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="text-center font-extrabold text-brand-700 dark:text-emerald-400 text-sm">
                      ₹{p.discountPrice ?? p.price} / {p.unit}
                    </div>
                  ))}
                </div>

                {/* Mandi Benchmark */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-bold text-slate-500">Mandi Benchmark</span>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="text-center text-[11px] text-slate-500">
                      ₹{p.mandiPriceBenchmark || 'N/A'} (Wholesale rate)
                    </div>
                  ))}
                </div>

                {/* Organic Certification */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-bold text-slate-500">Organic Status</span>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="text-center">
                      {p.isOrganic ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          NPOP Lab Verified
                        </span>
                      ) : (
                        <span className="text-slate-400">Natural / Conventional</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Farmer & Location */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-bold text-slate-500">Farmer & Region</span>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="text-center text-[11px] text-slate-700 dark:text-slate-300">
                      <p className="font-semibold">{p.farmerName}</p>
                      <p className="text-slate-400">{p.farmerLocation}</p>
                    </div>
                  ))}
                </div>

                {/* Harvest Timing */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-bold text-slate-500">Harvest Age</span>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="text-center font-medium text-[11px] text-slate-600 dark:text-slate-300">
                      {p.harvestDate}
                    </div>
                  ))}
                </div>

                {/* Nutritional Perks */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-bold text-slate-500">Top Health Perks</span>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="text-center text-[10px] space-y-0.5 text-slate-600 dark:text-slate-400">
                      {p.nutritionalHighlights.map(h => (
                        <div key={h}>• {h}</div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Action Row */}
                <div className="grid grid-cols-4 gap-4 py-4 items-center">
                  <span className="font-bold text-slate-500">Add to Cart</span>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="text-center">
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-soft-sm inline-flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
