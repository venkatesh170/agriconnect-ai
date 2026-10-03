import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShoppingBag,
  Heart,
  Layers,
  Coins,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Trash2,
  Tractor,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { FARM_BOXES } from '../../data/seedData';
import { ProductCard } from '../marketplace/ProductCard';

export const CustomerDashboard: React.FC = () => {
  const {
    customer,
    orders,
    wishlist,
    products,
    farmers,
    trackOrder,
    addToCart,
    toggleWishlist,
    setCurrentView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'subscriptions' | 'loyalty' | 'farmers'>('orders');

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));
  const favoriteFarmers = farmers.filter(f => customer.favoriteFarmerIds.includes(f.id));

  return (
    <div className="min-h-screen py-8 bg-slatebg dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover border-2 border-brand-500 shadow-soft-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {customer.name}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Conscious Eater
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {customer.email} • {customer.phone}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-harvest-600 dark:text-harvest-400">
                <Coins className="w-4 h-4 text-harvest-500" />
                <span>{customer.loyaltyPoints} Harvest Reward Points Available</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setCurrentView('marketplace');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-soft-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Fresh Produce</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto">
          {[
            { id: 'orders', label: `My Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'subscriptions', label: 'Farm Box Subscriptions', icon: Layers },
            { id: 'loyalty', label: 'Loyalty Rewards', icon: Coins },
            { id: 'farmers', label: `Favorite Farmers (${favoriteFarmers.length})`, icon: Tractor },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white shadow-soft-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Order History & Live Transit
            </h3>

            {orders.map(order => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        Order #{order.orderNumber}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 dark:bg-slate-800 dark:text-emerald-400">
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Placed on {order.createdAt} • Delivery: {order.estimatedDelivery}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-brand-700 dark:text-emerald-400">
                      ₹{order.total}
                    </span>
                    <button
                      onClick={() => trackOrder(order.id)}
                      className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-soft-sm transition-all"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Live Tracking</span>
                    </button>
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map(item => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 text-xs"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-900 dark:text-white truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.quantity}x • By {item.product.farmerName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Saved Organic Produce ({wishlistedProducts.length})
            </h3>

            {wishlistedProducts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 text-slate-400 text-xs">
                Your wishlist is empty. Browse the marketplace and tap the heart icon on any crop!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Farm Box Subscriptions */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Active & Available Farm Box Memberships
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Curated boxes picked at dawn and delivered right on your chosen schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FARM_BOXES.map(box => (
                <div
                  key={box.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-soft-sm hover:shadow-soft-md transition-all"
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                      <img src={box.image} alt={box.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-harvest-500 text-slate-950">
                        {box.badge}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {box.name}
                    </h4>
                    <p className="text-xs text-brand-600 dark:text-emerald-400 font-semibold mt-0.5">
                      {box.subtitle}
                    </p>

                    <div className="my-3 flex items-baseline gap-2">
                      <span className="text-xl font-black text-brand-700 dark:text-emerald-400">
                        ₹{box.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">₹{box.originalPrice}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">/ {box.frequency}</span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 mb-4">
                      <p className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                        Typical Contents:
                      </p>
                      {box.includedItems.map((item, idx) => (
                        <p key={idx} className="flex items-center gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          <span>{item}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Subscribed to ${box.name}! Delivery starts this Thursday morning.`)}
                    className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-soft-sm"
                  >
                    Subscribe ({box.frequency})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Loyalty Points */}
        {activeTab === 'loyalty' && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm max-w-xl mx-auto text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-harvest-500/10 text-harvest-600 mx-auto flex items-center justify-center">
              <Coins className="w-8 h-8 text-harvest-500" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Harvest Reward Wallet
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                You earn 1 Harvest Point for every ₹10 spent directly with farmers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-harvest-50 dark:bg-harvest-950/30 border border-harvest-200 dark:border-harvest-900/60 inline-block px-8">
              <span className="text-3xl font-black text-harvest-600 dark:text-harvest-400">
                {customer.loyaltyPoints}
              </span>
              <p className="text-xs font-bold text-harvest-800 dark:text-harvest-300 mt-0.5">
                Points (= ₹{Math.round(customer.loyaltyPoints / 2)} Instant Cart Discount)
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert('Points will be automatically applied as ₹170 discount on your next checkout!')}
                className="px-6 py-2.5 bg-harvest-500 hover:bg-harvest-600 text-slate-950 font-bold text-xs rounded-xl shadow-soft-sm"
              >
                Redeem for ₹170 Discount Coupon
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: Favorite Farmers */}
        {activeTab === 'farmers' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Your Subscribed Local Farmers ({favoriteFarmers.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteFarmers.map(farmer => (
                <div
                  key={farmer.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-brand-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {farmer.name}
                        </h4>
                        {farmer.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                      </div>
                      <p className="text-xs text-brand-600 dark:text-emerald-400 font-semibold">
                        {farmer.farmName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {farmer.location} • ★ {farmer.rating}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('marketplace');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
                  >
                    View Crops
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
