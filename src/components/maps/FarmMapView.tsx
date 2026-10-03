import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Navigation,
  ShieldCheck,
  Tractor,
  Layers,
  ArrowRight,
  Phone,
  Mail,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Farmer } from '../../types';

export const FarmMapView: React.FC = () => {
  const { farmers, products, setSelectedProductForDetail, setCurrentView } = useApp();
  const [selectedRadius, setSelectedRadius] = useState<'25' | '100' | 'all'>('100');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [activeFarm, setActiveFarm] = useState<Farmer>(farmers[0]);

  const filteredFarmers = farmers.filter(f => {
    if (selectedState !== 'All' && f.state !== selectedState) return false;
    return true;
  });

  const states = ['All', 'Maharashtra', 'Tamil Nadu', 'Punjab', 'Himachal Pradesh', 'Andhra Pradesh'];

  // Crops belonging to active farm
  const farmProducts = products.filter(p => p.farmerId === activeFarm.id);

  return (
    <div className="min-h-screen py-8 bg-slatebg dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Navigation className="w-3.5 h-3.5" />
            <span>Direct Farm Geo-Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Nearby Organic Farms & Agro-Estates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover verified regenerative farms near you. Order directly for ultra-low carbon miles and fresh morning harvest.
          </p>
        </div>

        {/* Top Controls: Radius & States */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm mb-6 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Delivery Radius:</span>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                onClick={() => setSelectedRadius('25')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  selectedRadius === '25' ? 'bg-brand-600 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                ≤ 25 km (EV Van)
              </button>
              <button
                onClick={() => setSelectedRadius('100')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  selectedRadius === '100' ? 'bg-brand-600 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                ≤ 100 km (Regional)
              </button>
              <button
                onClick={() => setSelectedRadius('all')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  selectedRadius === 'all' ? 'bg-brand-600 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All India Speciality
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Filter State:</span>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none"
            >
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Map Explorer Layout: Interactive Canvas/Cards Left + Farm Detail Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Simulation Panel Left */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Simulated Map Canvas */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-soft-xl h-[400px] sm:h-[460px] flex items-center justify-center">
              
              {/* Map vector grid background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(46,125,50,0.8) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Decorative Geo Contour rings */}
              <div className="absolute w-[500px] h-[500px] rounded-full border border-emerald-500/20 -translate-x-12 animate-pulse pointer-events-none" />
              <div className="absolute w-[300px] h-[300px] rounded-full border border-harvest-500/20 pointer-events-none" />

              {/* User location pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="w-5 h-5 rounded-full bg-sky-500 ring-4 ring-sky-500/30 flex items-center justify-center animate-bounce">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="text-[10px] font-extrabold bg-slate-950/90 text-sky-300 px-2 py-0.5 rounded-full mt-1 border border-sky-500/30">
                  Your Location (Doorstep)
                </span>
              </div>

              {/* Farm Markers across the canvas */}
              {filteredFarmers.map((farm, idx) => {
                const isSelected = activeFarm.id === farm.id;
                // Position simulation coordinates
                const positions = [
                  { top: '25%', left: '35%' },
                  { top: '68%', left: '45%' },
                  { top: '15%', left: '65%' },
                  { top: '12%', left: '78%' },
                  { top: '60%', left: '72%' }
                ];
                const pos = positions[idx % positions.length];

                return (
                  <button
                    key={farm.id}
                    onClick={() => setActiveFarm(farm)}
                    style={{ top: pos.top, left: pos.left }}
                    className={`absolute z-20 group -translate-x-1/2 -translate-y-1/2 transition-transform ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-soft-lg transition-colors ${
                          isSelected
                            ? 'bg-harvest-500 ring-4 ring-harvest-500/40'
                            : 'bg-emerald-600 ring-2 ring-white/50'
                        }`}
                      >
                        <Tractor className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 whitespace-nowrap shadow-soft-sm ${
                          isSelected
                            ? 'bg-harvest-500 text-slate-950 font-black'
                            : 'bg-slate-950/80 text-white backdrop-blur-md border border-slate-700'
                        }`}
                      >
                        {farm.farmName}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Map Footer status */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Showing <strong>{filteredFarmers.length}</strong> active certified farms in radius
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  Zero Cold-Storage Delay
                </span>
              </div>
            </div>

            {/* Farm Cards List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFarmers.map(farm => (
                <div
                  key={farm.id}
                  onClick={() => setActiveFarm(farm)}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                    activeFarm.id === farm.id
                      ? 'bg-white dark:bg-slate-900 border-brand-500 shadow-soft-md'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={farm.avatar}
                      alt={farm.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-brand-500"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {farm.farmName}
                        </h4>
                        {farm.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {farm.location}, {farm.state}
                      </p>
                      <p className="text-[10px] text-brand-600 dark:text-emerald-400 font-semibold mt-0.5">
                        {farm.acres} Acres • ★ {farm.rating.toFixed(1)} ({farm.totalOrdersFulfilled} orders)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Active Farm Detail Spotlight Right */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft-lg space-y-6">
            
            {/* Header info */}
            <div className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <img
                src={activeFarm.avatar}
                alt={activeFarm.name}
                className="w-20 h-20 rounded-3xl object-cover border-2 border-brand-600 shadow-soft-sm flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {activeFarm.farmName}
                  </h3>
                  {activeFarm.verified && (
                    <span className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-brand-700 dark:text-emerald-400 font-bold mt-0.5">
                  Operated by {activeFarm.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {activeFarm.location}, {activeFarm.district}
                </p>
                {activeFarm.verificationBadgeDate && (
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                    ✓ {activeFarm.verificationBadgeDate}
                  </p>
                )}
              </div>
            </div>

            {/* Farm Story & Soil Practices */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Regenerative Farm Bio
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{activeFarm.bio}"
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-center">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Land</span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-white">{activeFarm.acres} Acres</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Fulfilled</span>
                <span className="text-xs font-extrabold text-brand-600 dark:text-emerald-400">{activeFarm.totalOrdersFulfilled}+</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Rating</span>
                <span className="text-xs font-extrabold text-amber-500">★ {activeFarm.rating}</span>
              </div>
            </div>

            {/* Crops Available Today from this Farm */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Available Produce Today ({farmProducts.length})</span>
                <span className="text-emerald-600 text-[10px] font-semibold">Morning Harvested</span>
              </h4>

              <div className="space-y-2">
                {farmProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProductForDetail(p)}
                    className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-brand-500 cursor-pointer flex items-center justify-between gap-3 group transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-emerald-400 transition-colors">
                          {p.name}
                        </h5>
                        <span className="text-[10px] text-slate-400">{p.harvestDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-brand-700 dark:text-emerald-400">
                        ₹{p.discountPrice ?? p.price}/{p.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setCurrentView('marketplace');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-soft-sm"
              >
                <span>Shop All {activeFarm.name}'s Crops</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
