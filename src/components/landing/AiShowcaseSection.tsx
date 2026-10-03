import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  TrendingUp,
  FileText,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
  Wand2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AiShowcaseSection: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'assistant' | 'pricing' | 'description' | 'reviews'>('assistant');

  // Interactive demo states
  const [cropInput, setCropInput] = useState('Alphonso Mango');
  const [cropCategory, setCropCategory] = useState('Fruits');
  const [generatedDesc, setGeneratedDesc] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSimulateAiDesc = () => {
    setIsGenerating(true);
    setGeneratedDesc(null);
    setTimeout(() => {
      setGeneratedDesc(
        `🌿 **Premium Sun-Ripened ${cropInput} (Single-Estate Organic)**\n\nDirectly handpicked from fertile coastal red-laterite soil. Organically nourished with zero synthetic carbide ripening agents. Boasting a silky fibreless pulp, vibrant saffron-gold hue, and heavenly tropical aroma with high Vitamin A & C antioxidants.`
      );
      setIsGenerating(false);
    }, 600);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slatebg to-brand-50/40 dark:from-slate-950 dark:to-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-harvest-500/10 dark:bg-harvest-500/20 text-harvest-600 dark:text-harvest-400 text-xs font-bold uppercase tracking-wider mb-3 border border-harvest-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proprietary AgriConnect AI Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Artificial Intelligence that Empowers the Field
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
            From smart shopping recommendations for urban buyers to dynamic mandi price forecasting and automated product listings for farmers.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft-sm">
            {[
              { id: 'assistant', label: 'AI Shopping Assistant', icon: Bot },
              { id: 'pricing', label: 'AI Mandi Price Recommender', icon: TrendingUp },
              { id: 'description', label: 'AI Listing Generator', icon: Wand2 },
              { id: 'reviews', label: 'AI Review Summarizer', icon: MessageSquare },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-brand-600 text-white shadow-soft-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Tab Showcase Content */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-soft-xl max-w-5xl mx-auto">
          
          {/* TAB 1: Shopping Assistant */}
          {activeTab === 'assistant' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold text-brand-600 dark:text-emerald-400 uppercase tracking-widest">
                  Customer Experience
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Meet AgriBot: Your 24/7 Farm Concierge
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  AgriBot uses real-time agricultural LLM intelligence to answer nutrition questions, recommend seasonal produce tailored to your location, generate farm-to-table recipes from your cart items, and provide live order tracking updates.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Instant Ayurvedic & nutritional breakdown of any crop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>One-click add ingredients directly to cart from chat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Voice prompt input in English, Hindi, Tamil & Telugu</span>
                  </div>
                </div>
                <div className="pt-3">
                  <p className="text-xs text-slate-400 italic">
                    💡 Click the floating green sprout icon in the bottom-right of your screen anytime to chat with AgriBot!
                  </p>
                </div>
              </div>

              {/* Chat Simulation Preview Card */}
              <div className="lg:col-span-6 bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 space-y-3 font-sans">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">AgriBot Assistant</p>
                      <span className="text-[10px] text-emerald-500 font-semibold">● Online • AI-Active</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-brand-50 dark:bg-slate-700 text-brand-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    Natural Farming Engine
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-brand-600 text-white p-3 rounded-2xl rounded-tr-none ml-8">
                    "I want to make a healthy dinner for high iron and immunity. What fresh produce is in season today?"
                  </div>
                  <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-3 rounded-2xl rounded-tl-none mr-8 shadow-soft-sm space-y-1.5">
                    <p>
                      🌱 <strong>Farmer Ramesh Patel</strong> just harvested hydroponic baby spinach in Nashik (High in bioavailable Iron), and <strong>Lakshmi Devi</strong> has fresh red carrots from Nilgiris!
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Recipe recommendation: <em>Garlic & Spinach Sauté with Crumbled A2 Paneer</em>.
                    </p>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between mt-2">
                      <span className="font-bold text-slate-800 dark:text-white">Fresh Baby Spinach (250g)</span>
                      <span className="text-xs font-extrabold text-brand-600 dark:text-emerald-400">₹38</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Pricing Engine */}
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold text-harvest-600 dark:text-harvest-400 uppercase tracking-widest">
                  Fair Value Economics
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Dynamic Mandi Price Recommendation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Farmers often sell produce in distress at mandi APMC yards because they lack real-time consumer price signals. Our algorithm analyzes APMC prices across 500+ Indian mandis, input fertilizer costs, and fuel indices to recommend an optimal retail selling price.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-500" />
                    <span>Real-time wholesale Mandi rate sync vs retail supermarkets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-500" />
                    <span>Organic certification premium markup calculation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-500" />
                    <span>Protects consumers from 150% supermarket middleman markups</span>
                  </div>
                </div>
              </div>

              {/* Price comparison card */}
              <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Crop: Vine Tomatoes (Grade A)
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                    Peak Fresh Season
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
                    <div>
                      <p className="text-xs text-rose-800 dark:text-rose-300 font-bold">Traditional APMC Mandi Rate</p>
                      <p className="text-[10px] text-slate-500">Broker cut deducted</p>
                    </div>
                    <span className="text-base font-extrabold text-rose-600 dark:text-rose-400">₹24 / kg</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-brand-50 dark:bg-emerald-950/40 border-2 border-brand-500 shadow-soft-sm">
                    <div>
                      <p className="text-xs text-brand-900 dark:text-emerald-300 font-extrabold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-harvest-500" />
                        AgriConnect AI Recommended Price
                      </p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        +58% higher profit directly to farmer
                      </p>
                    </div>
                    <span className="text-lg font-black text-brand-700 dark:text-emerald-400">₹38 / kg</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-700/60">
                    <div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-bold">Big Chain Supermarket Retail</p>
                      <p className="text-[10px] text-slate-500">Includes packaging & cold storage warehousing</p>
                    </div>
                    <span className="text-base font-extrabold text-slate-600 dark:text-slate-300">₹58 / kg</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Description Generator */}
          {activeTab === 'description' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-brand-600 dark:text-emerald-400 uppercase tracking-widest">
                  Farmer Productivity Tool
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Instant AI Crop Description & SEO
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Many farmers don't have time to write attractive marketing copy. Enter the crop name and variety, and our AI automatically formats SEO titles, health benefits, and cooking suggestions in seconds.
                </p>

                {/* Interactive Generator Box */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Enter Produce Name:
                    </label>
                    <input
                      type="text"
                      value={cropInput}
                      onChange={e => setCropInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    onClick={handleSimulateAiDesc}
                    disabled={isGenerating}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-soft-sm"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>{isGenerating ? 'AI Writing Copy...' : 'Generate with AgriConnect AI'}</span>
                  </button>
                </div>
              </div>

              {/* Generator Result Preview */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft-sm min-h-[220px] flex flex-col justify-center">
                {generatedDesc ? (
                  <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-200 animate-in fade-in duration-300">
                    <div className="p-3 bg-brand-50/70 dark:bg-slate-900/60 rounded-xl border border-brand-200 dark:border-slate-700">
                      <p className="font-extrabold text-sm text-brand-700 dark:text-emerald-400 mb-2">
                        Generated Listing Copy:
                      </p>
                      <p className="whitespace-pre-line">{generatedDesc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                        #SingleOrigin
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                        #CarbideFree
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                        #DawnHarvest
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-8">
                    <Wand2 className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                    <p className="text-xs">
                      Click "Generate with AgriConnect AI" to see simulated high-converting copywriting.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Review Summarizer */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold text-brand-600 dark:text-emerald-400 uppercase tracking-widest">
                  Sentiment Intelligence
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  AI Review Synthesizer & Sentiment
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Instead of reading dozens of individual reviews, our AI extracts the key pros, cons, and overall customer satisfaction score for any farm product in real-time.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Instant extraction of freshness, taste, and packaging feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Zero spam / fake review filters applied</span>
                  </div>
                </div>
              </div>

              {/* Review Summary Mockup */}
              <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      AI Sentiment Report: Wild Nilgiri Honey
                    </h4>
                    <p className="text-[10px] text-slate-400">Synthesized from 96 verified purchases</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-black">
                    98% Positive
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60">
                    <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1">
                      <span>✓ Top Praises (Pros):</span>
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                      <li>Distinct floral aroma that commercial filtered brands lack</li>
                      <li>Visible raw bee pollen grains at the top of the bottle</li>
                      <li>Careful straw cushioning in glass jar packaging</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-800/60">
                    <p className="font-bold text-amber-800 dark:text-amber-300 mb-1">
                      <span>⚠ Cons & Considerations:</span>
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                      <li>Stocks run out quickly after monsoon collection seasons</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
