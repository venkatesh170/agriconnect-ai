import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Truck
} from 'lucide-react';
import { FARM_BOXES } from '../../data/seedData';
import { FarmBox } from '../../types';

export const SubscriptionBoxes: React.FC = () => {
  const { setCurrentView } = useApp();
  const [selectedFrequency, setSelectedFrequency] = useState<'weekly' | 'biweekly'>('weekly');

  const handleSubscribe = (box: FarmBox) => {
    alert(`🎉 Subscribed to ${box.name} (${selectedFrequency})! Your first dawn-harvest box will arrive this Thursday between 6:00 AM – 8:30 AM.`);
  };

  return (
    <div className="min-h-screen py-10 bg-slatebg dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-harvest-500/10 dark:bg-harvest-500/20 text-harvest-600 dark:text-harvest-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Farm-to-Doorstep Club</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curated Farm Box Subscriptions
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2">
            Eliminate weekly grocery planning. Freshly picked seasonal vegetables, orchard fruits, and pure A2 dairy delivered on autopilot. Pause, skip, or cancel anytime with 1 click.
          </p>

          {/* Frequency toggle */}
          <div className="mt-6 inline-flex p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
            <button
              onClick={() => setSelectedFrequency('weekly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFrequency === 'weekly'
                  ? 'bg-brand-600 text-white shadow-soft-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Every Week (Most Fresh)
            </button>
            <button
              onClick={() => setSelectedFrequency('biweekly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFrequency === 'biweekly'
                  ? 'bg-brand-600 text-white shadow-soft-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Every 2 Weeks
            </button>
          </div>
        </div>

        {/* 3 Main Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {FARM_BOXES.map(box => (
            <div
              key={box.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-soft-md hover:shadow-soft-xl hover:border-brand-500/50 transition-all duration-300 relative group"
            >
              <span className="absolute -top-3 right-6 text-xs font-extrabold px-3 py-1 rounded-full bg-harvest-500 text-slate-950 shadow-sm">
                {box.badge}
              </span>

              <div>
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                  <img
                    src={box.image}
                    alt={box.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {box.name}
                </h3>
                <p className="text-xs text-brand-600 dark:text-emerald-400 font-bold mt-0.5">
                  {box.subtitle}
                </p>

                <div className="my-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-brand-700 dark:text-emerald-400">
                    ₹{box.price}
                  </span>
                  <span className="text-sm text-slate-400 line-through">₹{box.originalPrice}</span>
                  <span className="text-xs text-slate-400 uppercase font-bold">/ delivery</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {box.description}
                </p>

                {/* Items included list */}
                <div className="space-y-2 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <p className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                    What's in this week's harvest:
                  </p>
                  {box.includedItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleSubscribe(box)}
                  className="w-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm shadow-soft-lg flex items-center justify-center gap-2 transition-all"
                >
                  <span>Start Subscription</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2">
                  Cancel or pause anytime with zero penalty
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Benefits banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold uppercase tracking-wider justify-center md:justify-start">
              <Truck className="w-4 h-4" />
              <span>Cold-Chain EV Van Logistics</span>
            </div>
            <h3 className="text-xl font-bold">Free Weekly Doorstep Delivery on all subscriptions</h3>
            <p className="text-xs text-slate-300">
              Produce is packed in reusable insulated bamboo crates collected and sanitized on every rotation.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('marketplace');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-white text-slate-900 font-bold rounded-2xl text-xs hover:bg-slate-100 transition-colors flex-shrink-0"
          >
            Or Buy A-la-carte Produce
          </button>
        </div>

      </div>
    </div>
  );
};
