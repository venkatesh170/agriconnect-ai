import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  Search,
  ShoppingCart,
  Heart,
  Bell,
  Sun,
  Moon,
  Globe,
  User,
  Menu,
  X,
  Compass,
  Store,
  Layers,
  Users,
  ShieldCheck,
  Tractor,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Language, UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const {
    userRole,
    setUserRole,
    language,
    setLanguage,
    t,
    isDarkMode,
    setIsDarkMode,
    currentView,
    setCurrentView,
    cart,
    wishlist,
    notifications,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setIsAuthModalOpen,
    customer,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  ];

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-colors duration-200">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-harvest-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
        <span>🌱 100% Direct Farmer-to-Doorstep: Zero Middlemen Fees. Guaranteed Fair Prices for 5,200+ Indian Kisan families.</span>
        <button
          onClick={() => {
            setCurrentView('subscriptions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="underline font-semibold hover:text-harvest-100 hidden sm:inline ml-2"
        >
          Subscribe to Weekly Farm Boxes →
        </button>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-soft-md group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-brand-700 dark:text-emerald-400">
                  AgriConnect
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-harvest-500/15 text-harvest-600 dark:text-harvest-400 border border-harvest-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Direct Farmer-to-Consumer
              </p>
            </div>
          </div>

          {/* Search Bar - Center Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setCurrentView('marketplace');
                  }
                }}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs bg-slate-200 dark:bg-slate-700 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'home'
                  ? 'text-brand-600 dark:text-emerald-400 bg-brand-50 dark:bg-slate-800'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('marketplace')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'marketplace'
                  ? 'text-brand-600 dark:text-emerald-400 bg-brand-50 dark:bg-slate-800'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Store className="w-4 h-4" />
              Marketplace
            </button>
            <button
              onClick={() => handleNavClick('maps')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'maps'
                  ? 'text-brand-600 dark:text-emerald-400 bg-brand-50 dark:bg-slate-800'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Nearby Farms
            </button>
            <button
              onClick={() => handleNavClick('subscriptions')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'subscriptions'
                  ? 'text-brand-600 dark:text-emerald-400 bg-brand-50 dark:bg-slate-800'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4 text-harvest-500" />
              Farm Boxes
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'community'
                  ? 'text-brand-600 dark:text-emerald-400 bg-brand-50 dark:bg-slate-800'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4 text-sky-600" />
              Community
            </button>
          </nav>

          {/* Actions & Utilities Right Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-soft-sm transition-all"
                title="Switch test user role"
              >
                {userRole === 'customer' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                {userRole === 'farmer' && <Tractor className="w-3.5 h-3.5 text-harvest-500" />}
                {userRole === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />}
                <span className="capitalize hidden sm:inline">{userRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-2xl glass-panel p-2 shadow-soft-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                    Select Persona
                  </p>
                  <button
                    onClick={() => {
                      setUserRole('customer');
                      setCurrentView('customer-portal');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      userRole === 'customer'
                        ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-emerald-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Customer (Buyer)
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('farmer');
                      setCurrentView('farmer-studio');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      userRole === 'farmer'
                        ? 'bg-harvest-50 text-harvest-700 dark:bg-slate-800 dark:text-harvest-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Tractor className="w-3.5 h-3.5 text-harvest-500" />
                    Farmer (Seller)
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      setCurrentView('admin-control');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      userRole === 'admin'
                        ? 'bg-sky-50 text-sky-700 dark:bg-slate-800 dark:text-sky-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                    Admin (Operations)
                  </button>
                </div>
              )}
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                title="Select Language"
              >
                <Globe className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
                <span className="text-xs uppercase font-bold hidden sm:inline">{language}</span>
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-2xl glass-panel p-1.5 shadow-soft-xl border border-slate-200 dark:border-slate-800 z-50"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        language === lang.code
                          ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-emerald-400'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => handleNavClick('customer-portal')}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4 hover:text-rose-500 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-3"
              title="Open Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-brand-700 dark:text-emerald-400">{cartItemsCount}</span>
            </button>

            {/* Dashboard / User Avatar Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  if (userRole === 'farmer') {
                    handleNavClick('farmer-studio');
                  } else if (userRole === 'admin') {
                    handleNavClick('admin-control');
                  } else {
                    handleNavClick('customer-portal');
                  }
                }}
                className="flex items-center gap-2 p-1.5 rounded-full hover:ring-2 hover:ring-brand-500/50 transition-all"
                title="Open Profile Dashboard"
              >
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-8 h-8 rounded-full object-cover border border-brand-500"
                />
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleNavClick('marketplace');
                }
              }}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-10 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-3 rounded-2xl text-left font-semibold text-sm flex items-center gap-2 ${
                currentView === 'home' ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Sprout className="w-4 h-4 text-brand-600" />
              Home
            </button>
            <button
              onClick={() => handleNavClick('marketplace')}
              className={`p-3 rounded-2xl text-left font-semibold text-sm flex items-center gap-2 ${
                currentView === 'marketplace' ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Store className="w-4 h-4 text-brand-600" />
              Marketplace
            </button>
            <button
              onClick={() => handleNavClick('maps')}
              className={`p-3 rounded-2xl text-left font-semibold text-sm flex items-center gap-2 ${
                currentView === 'maps' ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              Nearby Farms
            </button>
            <button
              onClick={() => handleNavClick('subscriptions')}
              className={`p-3 rounded-2xl text-left font-semibold text-sm flex items-center gap-2 ${
                currentView === 'subscriptions' ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Layers className="w-4 h-4 text-harvest-500" />
              Farm Boxes
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">View as Role:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setUserRole('customer');
                  handleNavClick('customer-portal');
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  userRole === 'customer' ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => {
                  setUserRole('farmer');
                  handleNavClick('farmer-studio');
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  userRole === 'farmer' ? 'bg-harvest-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                }`}
              >
                Farmer
              </button>
              <button
                onClick={() => {
                  setUserRole('admin');
                  handleNavClick('admin-control');
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  userRole === 'admin' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
