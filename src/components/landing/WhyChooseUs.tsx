import React from 'react';
import {
  Tractor,
  TrendingUp,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhyChooseUs: React.FC = () => {
  const { setCurrentView } = useApp();

  const pillars = [
    {
      icon: Tractor,
      title: 'Zero Middlemen, Direct Payout',
      description: 'Traditional mandi brokers take up to 60% of produce value. AgriConnect transfers 95% directly to the kisan’s bank account within 24 hours of dispatch.',
      metric: '40% More Income',
      metricLabel: 'for farming households',
      color: 'from-brand-600 to-brand-800',
    },
    {
      icon: TrendingUp,
      title: 'AI-Powered Fair Price Intelligence',
      description: 'Our proprietary pricing models track real-time wholesale Mandi indices, seasonal harvest yields, and transport costs to recommend the most transparent price.',
      metric: 'Mandi Benchmark',
      metricLabel: '100% transparent pricing',
      color: 'from-harvest-500 to-harvest-700',
    },
    {
      icon: Truck,
      title: '24-Hour Dawn Harvest Delivery',
      description: 'Unlike supermarkets whose produce sits in cold warehouses for weeks, our produce is plucked at sunrise and arrives on your doorstep that very evening.',
      metric: 'Zero Chemical Gas',
      metricLabel: 'Naturally vine & tree ripened',
      color: 'from-emerald-600 to-teal-700',
    },
    {
      icon: ShieldCheck,
      title: 'QR-Verified Organic Traceability',
      description: 'Scan the packaging QR code on any item to view the farmer’s soil test report, water source, NPOP organic certificate, and exact coordinates of the field.',
      metric: '100% Lab Tested',
      metricLabel: 'Zero synthetic residue',
      color: 'from-sky-600 to-indigo-700',
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>The AgriConnect Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How We Are Transforming Agriculture
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
            A technology platform built from the ground up to solve systemic agricultural exploitation while providing urban families with authentic, unadulterated food.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500/60 hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-soft-sm mb-5 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Metric footer pill */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700/60">
                  <p className="text-sm font-extrabold text-brand-700 dark:text-emerald-400">
                    {pillar.metric}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {pillar.metricLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Comparison Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold">
              Are you a farmer practicing natural or organic farming?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-xl">
              Join 5,200+ verified farmers. Enjoy instant payouts, AI pricing intelligence, free packaging supplies, and doorstep pickup.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('farmer-studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-harvest-500 hover:bg-harvest-600 text-slate-950 font-extrabold rounded-2xl text-xs sm:text-sm shadow-soft-md flex items-center gap-2 flex-shrink-0 transition-transform hover:scale-105"
          >
            <span>Register Your Farm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
