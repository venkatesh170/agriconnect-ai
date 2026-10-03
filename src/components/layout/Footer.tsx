import React, { useState } from 'react';
import { Sprout, ShieldCheck, Heart, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-soft-md">
                <Sprout className="w-5 h-5 text-emerald-200" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  AgriConnect
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-harvest-500/20 text-harvest-400 border border-harvest-500/30">
                  AI
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering India’s agrarian ecosystem through artificial intelligence, direct marketplace transparency, and 24-hour harvest-to-table logistics. Eliminating middlemen to ensure farmers earn up to 40% higher margins.
            </p>

            {/* Trust highlights */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NPOP & APEDA Verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-harvest-400 bg-harvest-950/60 border border-harvest-800/60 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-harvest-400" />
                <span>Zero Middlemen Commission</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Fresh Produce
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Dairy', 'Honey'].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat as any);
                      setCurrentView('marketplace');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Roles */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Platform & Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('maps');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Nearby Farms Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('subscriptions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Weekly Farm Subscriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('community');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Regenerative Farmer Forum
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('farmer-studio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Farmer Seller Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('admin-control');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Admin Trust Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Harvest Updates
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive weekly updates on seasonal harvests, mandi price trends, and new local farm additions.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/70 border border-emerald-600 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Subscribed! Check your inbox for seasonal guides.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-xl py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-soft-sm"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AgriConnect AI Marketplace Ltd. Dedicated to Indian Farmers.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Sustainable Agriculture
            </span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Farmer Code of Conduct</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
