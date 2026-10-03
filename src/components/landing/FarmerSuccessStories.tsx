import React from 'react';
import { FARMERS } from '../../data/seedData';
import { ShieldCheck, Star, MapPin, QrCode, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FarmerSuccessStories: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-emerald-400 uppercase tracking-widest mb-1.5">
              <span>Verified Kisans</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Farmer Heroes Behind Your Plate
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Meet the real families cultivating pesticide-free crops, earning transparent living wages without middlemen exploitation.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('maps');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-brand-700 dark:text-emerald-400 hover:text-brand-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Explore All Farm Locations</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FARMERS.slice(0, 3).map(farmer => (
            <div
              key={farmer.id}
              className="rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-6 flex flex-col justify-between hover:shadow-soft-lg hover:border-brand-500/50 transition-all duration-300"
            >
              <div>
                {/* Farmer Avatar & Info */}
                <div className="flex items-start gap-3.5 mb-4">
                  <img
                    src={farmer.avatar}
                    alt={farmer.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-soft-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                        {farmer.name}
                      </h3>
                      {farmer.verified && (
                        <span title="APEDA Verified Organic">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-brand-700 dark:text-emerald-400 font-semibold">
                      {farmer.farmName}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {farmer.location}
                    </p>
                  </div>
                </div>

                {/* Farmer Bio Quote */}
                <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed mb-5">
                  "{farmer.bio}"
                </p>

                {/* Primary Crops Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {farmer.primaryCrops.map(crop => (
                    <span
                      key={crop}
                      className="px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics Pill */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Direct Payout
                  </span>
                  <span className="font-extrabold text-brand-700 dark:text-emerald-400 text-sm">
                    ₹{(farmer.revenueEarned / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Rating
                  </span>
                  <span className="font-extrabold text-amber-500 text-sm flex items-center gap-0.5 justify-end">
                    ★ {farmer.rating.toFixed(2)}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
