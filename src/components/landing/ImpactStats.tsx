import React from 'react';
import { Users, Tractor, IndianRupee, ShieldCheck, HeartHandshake, Sprout } from 'lucide-react';

export const ImpactStats: React.FC = () => {
  const stats = [
    {
      label: 'Verified Kisan Families',
      value: '5,280+',
      subtext: 'Across 14 Indian agricultural states',
      icon: Tractor,
      color: 'text-brand-600 dark:text-emerald-400',
      bgColor: 'bg-brand-50 dark:bg-emerald-950/40',
    },
    {
      label: 'Direct Farmer Earnings',
      value: '₹4.82 Cr',
      subtext: 'Transferred directly with 0% middleman cuts',
      icon: IndianRupee,
      color: 'text-harvest-600 dark:text-harvest-400',
      bgColor: 'bg-harvest-50 dark:bg-harvest-950/40',
    },
    {
      label: 'Orders Delivered in 24h',
      value: '142,000+',
      subtext: 'Dawn-harvest to doorstep cold-chain',
      icon: Sprout,
      color: 'text-emerald-600 dark:text-teal-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      label: 'Customer Quality Rating',
      value: '4.92 / 5',
      subtext: 'Over 28,000 verified purchase reviews',
      icon: HeartHandshake,
      color: 'text-sky-600 dark:text-sky-400',
      bgColor: 'bg-sky-50 dark:bg-sky-950/40',
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,125,50,0.3),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-300 mb-1">
            Real Impact Metrics
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Building a Transparent Agricultural Future
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
            Every purchase directly supports sustainable farming, soil regeneration, and fair livelihoods.
          </p>
        </div>

        {/* 4 Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-6 bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all text-center flex flex-col items-center justify-center group"
              >
                <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} ${stat.color} flex items-center justify-center mb-3 shadow-soft-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-emerald-200 mt-1">
                  {stat.label}
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
