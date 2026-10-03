import React, { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  Calendar,
  CheckCircle2,
  Sparkles,
  Thermometer,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeatherAndCropCalendar: React.FC = () => {
  const { setSelectedCategory, setCurrentView } = useApp();
  const [selectedSeason, setSelectedSeason] = useState<'rabi' | 'kharif' | 'zaid'>('rabi');

  const seasonsData = {
    rabi: {
      name: 'Rabi Harvest (Winter / Spring)',
      months: 'October – April',
      climateNote: 'Mild sunny days and cool crisp nights optimize sugar concentration and root vegetables.',
      crops: [
        { name: 'Vine Tomatoes', farm: 'Nashik, Maharashtra', harvestPeak: 'Peak Now', status: 'Available' },
        { name: 'Kinnaur Apples', farm: 'Kalpa, Himachal Pradesh', harvestPeak: 'Peak Season', status: 'Available' },
        { name: 'Hill Carrots', farm: 'Nilgiris, Tamil Nadu', harvestPeak: 'High Sweetness', status: 'Available' },
        { name: 'Sharbati Wheat', farm: 'Ludhiana, Punjab', harvestPeak: 'Harvesting', status: 'Available' },
        { name: 'Wild Forest Honey', farm: 'Nilgiris Biosphere', harvestPeak: 'Fresh Extraction', status: 'Available' },
        { name: 'Baby Spinach', farm: 'Nashik Hydroponics', harvestPeak: 'Daily Harvest', status: 'Available' },
      ]
    },
    kharif: {
      name: 'Kharif Harvest (Monsoon / Autumn)',
      months: 'June – October',
      climateNote: 'Monsoon showers nurture paddy, millets, pulses and leafy indigenous greens.',
      crops: [
        { name: 'Basmati Paddy', farm: 'Punjab Canal Belt', harvestPeak: 'Autumn Cure', status: 'Stored' },
        { name: 'Organic Toor Dal', farm: 'Gulbarga & Guntur', harvestPeak: 'Sun Dried', status: 'Available' },
        { name: 'Fresh Sweet Corn', farm: 'Deccan Plateau', harvestPeak: 'Tender Harvest', status: 'Available' },
        { name: 'Custard Apples', farm: 'Andhra Orchards', harvestPeak: 'Limited', status: 'Available' },
      ]
    },
    zaid: {
      name: 'Zaid Harvest (Summer Specials)',
      months: 'March – June',
      climateNote: 'Intense sunlight produces the highest Brix level sweetness in melons and gourds.',
      crops: [
        { name: 'Alphonso Mangoes', farm: 'Ratnagiri Orchards', harvestPeak: 'Tree Ripened', status: 'Pre-order' },
        { name: 'Organic Watermelons', farm: 'Krishna River Basin', harvestPeak: 'Juicy Sweet', status: 'Available' },
        { name: 'Tender Coconut', farm: 'Pollachi Groves', harvestPeak: 'Daily Fresh', status: 'Available' },
        { name: 'Mint & Holy Tulsi', farm: 'Organic Herb Farms', harvestPeak: 'Aromatic Peak', status: 'Available' },
      ]
    }
  };

  const currentSeasonData = seasonsData[selectedSeason];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200 dark:border-emerald-800">
            <Calendar className="w-3.5 h-3.5" />
            <span>Nature's Clock</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Seasonal Crop Calendar & Farm Weather
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
            Eating in season ensures 3x higher nutrient density, natural ripeness, and direct support for harvesting farmers.
          </p>
        </div>

        {/* Content Grid: Weather Widget Left + Seasonal Calendar Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Weather Card Left */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-emerald-600 to-brand-800 text-white p-6 shadow-soft-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/20">
              <div>
                <p className="text-xs uppercase font-extrabold tracking-wider text-emerald-200">
                  AgriWeather Station
                </p>
                <h3 className="text-lg font-bold text-white">
                  Nashik Farming Belt
                </h3>
              </div>
              <CloudSun className="w-9 h-9 text-amber-300" />
            </div>

            <div className="my-6 flex items-baseline justify-between">
              <div>
                <span className="text-5xl font-black tracking-tight">26°C</span>
                <span className="text-emerald-200 text-sm block mt-0.5">Partly Sunny • Ideal for Harvest</span>
              </div>
              <div className="text-right text-xs space-y-1 text-emerald-100">
                <p className="flex items-center justify-end gap-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-200" />
                  Humidity: 48%
                </p>
                <p className="flex items-center justify-end gap-1">
                  <Wind className="w-3.5 h-3.5 text-emerald-200" />
                  Breeze: 11 km/h
                </p>
              </div>
            </div>

            {/* AI Harvest Advisory */}
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Harvest Advisory</span>
              </div>
              <p className="text-[11px] text-emerald-100 leading-relaxed">
                Cool morning temperatures (18°C) are allowing farmers to harvest high-brix vine tomatoes and hydroponic greens without heat stress. Optimal purchase window: next 48 hours.
              </p>
            </div>
          </div>

          {/* Seasonal Calendar Right */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8">
            
            {/* Season Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {currentSeasonData.name}
                </h3>
                <p className="text-xs text-brand-600 dark:text-emerald-400 font-semibold">
                  {currentSeasonData.months}
                </p>
              </div>

              <div className="flex gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setSelectedSeason('rabi')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSeason === 'rabi'
                      ? 'bg-brand-600 text-white shadow-soft-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Rabi (Winter)
                </button>
                <button
                  onClick={() => setSelectedSeason('kharif')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSeason === 'kharif'
                      ? 'bg-brand-600 text-white shadow-soft-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Kharif (Monsoon)
                </button>
                <button
                  onClick={() => setSelectedSeason('zaid')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSeason === 'zaid'
                      ? 'bg-brand-600 text-white shadow-soft-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Zaid (Summer)
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 italic">
              "{currentSeasonData.climateNote}"
            </p>

            {/* Crops In-Season Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentSeasonData.crops.map((crop, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentView('marketplace');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500 hover:shadow-soft-sm cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-emerald-400 transition-colors">
                      {crop.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {crop.farm}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {crop.harvestPeak}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
