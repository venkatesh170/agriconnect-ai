import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  ShieldCheck,
  Search,
  ArrowRight,
  TrendingUp,
  Sparkles,
  MapPin,
  Clock,
  HeartHandshake
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, setSearchQuery, setSelectedCategory, t } = useApp();

  const handleQuickTagClick = (tag: string, cat?: string) => {
    setSearchQuery(tag);
    if (cat) {
      setSelectedCategory(cat as any);
    }
    setCurrentView('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-brand-50/60 via-slatebg to-slatebg dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
      
      {/* Decorative background glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-400/15 dark:bg-emerald-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-harvest-400/15 dark:bg-harvest-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-brand-200 dark:border-slate-700 shadow-soft-sm text-xs font-semibold text-brand-800 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-harvest-500" />
                AI-Driven Transparent Agricultural Marketplace
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Fresh from Farm to Fork,{' '}
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-harvest-500 bg-clip-text text-transparent">
                Empowered by AI.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Eliminate middlemen and deceptive broker cuts. Buy directly from verified Indian farmers with transparent mandi-benchmarked pricing, QR organic verification, and morning-harvest doorstep delivery.
            </p>

            {/* Main Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  setCurrentView('marketplace');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-bold rounded-2xl shadow-soft-lg hover:shadow-soft-xl flex items-center justify-center gap-2.5 transition-all text-sm group"
              >
                <span>{t('shopNow')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setCurrentView('farmer-studio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft-sm flex items-center justify-center gap-2 transition-all text-sm"
              >
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>{t('becomeSeller')}</span>
              </button>
            </div>

            {/* Quick Filter Tags */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Popular Harvests:</span>
              {[
                { name: 'Vine Tomatoes', cat: 'Vegetables' },
                { name: 'Kinnaur Apples', cat: 'Fruits' },
                { name: 'A2 Gir Ghee', cat: 'Dairy' },
                { name: 'Forest Honey', cat: 'Honey' },
                { name: 'Sharbati Wheat', cat: 'Grains' }
              ].map(tag => (
                <button
                  key={tag.name}
                  onClick={() => handleQuickTagClick(tag.name, tag.cat)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-700 dark:hover:text-emerald-300 border border-slate-200/80 dark:border-slate-700 transition-colors"
                >
                  {tag.name}
                </button>
              ))}
            </div>

            {/* Trust Metric Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/70 dark:border-slate-800/80">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-brand-700 dark:text-emerald-400">
                  5,200+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Verified Kisans
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  0%
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Middleman Fees
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-harvest-600 dark:text-harvest-400">
                  ₹4.8 Cr+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct Farmer Payouts
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 relative group">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                  alt="Fresh farm produce harvest basket"
                  className="w-full h-[430px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Card overlay details */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/80 text-white">
                      Dawn Harvest
                    </span>
                    <span className="text-xs text-slate-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-300" />
                      Picked Today 5:30 AM
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    Organic Hydroponic Greens & Vine Tomatoes
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Farmer Ramesh Patel • Dindori Valley, Nashik
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: AI Pricing Badge */}
              <div className="absolute -top-4 -left-6 sm:-left-8 glass-panel p-3.5 rounded-2xl shadow-soft-xl max-w-[210px] border border-white/60 dark:border-slate-700 animate-in fade-in slide-in-from-left duration-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-harvest-500 text-white flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-harvest-600 dark:text-harvest-400">
                      AI Price Match
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      +38% More for Farmer
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Lab Verified Organic */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 glass-panel p-3.5 rounded-2xl shadow-soft-xl max-w-[220px] border border-white/60 dark:border-slate-700 animate-in fade-in slide-in-from-right duration-500">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      NPOP Certified
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      100% Chemical Free
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
