import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Tractor, User, Check, ArrowRight, Lock, Mail } from 'lucide-react';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, userRole, setUserRole, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleQuickLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthModalOpen(false);
    if (role === 'farmer') {
      setCurrentView('farmer-studio');
    } else if (role === 'admin') {
      setCurrentView('admin-control');
    } else {
      setCurrentView('customer-portal');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(selectedRole);
    setIsAuthModalOpen(false);
    if (selectedRole === 'farmer') {
      setCurrentView('farmer-studio');
    } else if (selectedRole === 'admin') {
      setCurrentView('admin-control');
    } else {
      setCurrentView('customer-portal');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white text-center relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute right-4 top-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6 text-emerald-200" />
          </div>
          <h3 className="text-xl font-extrabold">Welcome to AgriConnect AI</h3>
          <p className="text-xs text-emerald-100 mt-1">
            Empowering 5,200+ Farmers & 120,000+ Conscious Consumers
          </p>
        </div>

        {/* Quick Demo Switcher Section */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            ⚡ One-Click Persona Test Access
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin('customer')}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                userRole === 'customer'
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-emerald-300 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <User className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
              <span className="text-[11px] block">Customer</span>
              <span className="text-[9px] text-slate-400 block">Anita Sharma</span>
            </button>

            <button
              onClick={() => handleQuickLogin('farmer')}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                userRole === 'farmer'
                  ? 'border-harvest-500 bg-harvest-50 dark:bg-harvest-950/40 text-harvest-700 dark:text-harvest-300 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <Tractor className="w-4 h-4 mx-auto mb-1 text-harvest-500" />
              <span className="text-[11px] block">Farmer</span>
              <span className="text-[9px] text-slate-400 block">Ramesh Patel</span>
            </button>

            <button
              onClick={() => handleQuickLogin('admin')}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                userRole === 'admin'
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-sky-500" />
              <span className="text-[11px] block">Admin</span>
              <span className="text-[9px] text-slate-400 block">Platform Admin</span>
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="p-6">
          <div className="flex border-b border-slate-200 dark:border-slate-700 mb-5">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 pb-2.5 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'login'
                  ? 'border-brand-600 text-brand-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 pb-2.5 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'register'
                  ? 'border-brand-600 text-brand-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Register New Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Select Account Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('customer')}
                      className={`p-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 ${
                        selectedRole === 'customer'
                          ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-emerald-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-500'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Consumer Buyer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('farmer')}
                      className={`p-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 ${
                        selectedRole === 'farmer'
                          ? 'border-harvest-500 bg-harvest-50 text-harvest-700 dark:bg-slate-800 dark:text-harvest-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-500'
                      }`}
                    >
                      <Tractor className="w-3.5 h-3.5" />
                      <span>Kisan / Farmer</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Full Name / Farm Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patel Farm"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address or Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@gmail.com or +91 98765 43210"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Password or OTP
              </label>
              <div className="relative">
                <input
                  type="password"
                  defaultValue="demo1234"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-soft-sm mt-2"
            >
              <span>{activeTab === 'login' ? 'Sign In to AgriConnect' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
