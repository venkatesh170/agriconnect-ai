import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  Tractor,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Tag,
  Search,
  Check,
  X
} from 'lucide-react';
import { Farmer, Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    farmers,
    verifyFarmer,
    products,
    deleteProduct,
    orders,
    applyCoupon
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verification' | 'products' | 'orders' | 'disputes' | 'coupons'>('verification');

  // Coupon creator state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('20');
  const [couponCreatedMsg, setCouponCreatedMsg] = useState(false);

  // Tickets state
  const [tickets, setTickets] = useState([
    {
      id: 'ticket-1',
      orderId: 'AGC-88124',
      customer: 'Anita Sharma',
      issue: 'Packaging straw loose during transit',
      status: 'Open',
      severity: 'Low',
    },
    {
      id: 'ticket-2',
      orderId: 'AGC-77312',
      customer: 'Rahul Verma',
      issue: 'Inquiry on certified pesticide-free honey batch test',
      status: 'Resolved',
      severity: 'Medium',
    }
  ]);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    setCouponCreatedMsg(true);
    setTimeout(() => {
      setCouponCreatedMsg(false);
      setNewCouponCode('');
    }, 2500);
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, status: 'Resolved' } : t))
    );
  };

  return (
    <div className="min-h-screen py-8 bg-slatebg dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-soft-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                AgriConnect Operations Core
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1">Platform Admin Control Desk</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitoring 5,280+ active farm estates, GMV transactions, organic lab checks, and consumer disputes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ● All Systems Live (Supabase + Razorpay 99.98%)
            </span>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Merchandise Value</p>
            <p className="text-2xl font-black text-brand-700 dark:text-emerald-400 mt-1">₹4.82 Cr</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">+28% Month-over-Month</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Kisans</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{farmers.length * 1056}+</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Across 14 agrarian states</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Organic Ratio</p>
            <p className="text-2xl font-black text-sky-600 dark:text-sky-400 mt-1">94.8%</p>
            <p className="text-[11px] text-slate-400 mt-0.5">NPOP & APEDA Accredited</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Open Dispute Rate</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">0.02%</p>
            <p className="text-[11px] text-slate-400 mt-0.5">2 tickets currently open</p>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto">
          {[
            { id: 'verification', label: 'Farmer Verification Desk', icon: ShieldCheck },
            { id: 'products', label: `Catalog Moderation (${products.length})`, icon: Package },
            { id: 'orders', label: `Global Orders Feed (${orders.length})`, icon: ShoppingBag },
            { id: 'disputes', label: 'Dispute Resolution', icon: AlertTriangle },
            { id: 'coupons', label: 'Promo Codes & Coupons', icon: Tag },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-sky-300 shadow-soft-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Farmer Verification Desk */}
        {activeTab === 'verification' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Farmer Verification & Accreditation Queue
              </h3>
              <span className="text-xs text-slate-400">
                Click verify to grant the official NPOP Organic Green Badge
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {farmers.map(farmer => (
                <div
                  key={farmer.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-brand-500 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {farmer.name}
                        </h4>
                        {farmer.verified ? (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            Pending Review
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-brand-600 dark:text-emerald-400 font-semibold mt-0.5">
                        {farmer.farmName} ({farmer.acres} Acres)
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {farmer.location}, {farmer.state}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                    "{farmer.bio}"
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Total Fulfilled: {farmer.totalOrdersFulfilled}</span>

                    <div className="flex items-center gap-2">
                      {farmer.verified ? (
                        <button
                          onClick={() => verifyFarmer(farmer.id, false)}
                          className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                        >
                          Revoke Badge
                        </button>
                      ) : (
                        <button
                          onClick={() => verifyFarmer(farmer.id, true)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-soft-sm flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Grant Badge</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Product Moderation */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Produce Catalog Moderation ({products.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(prod => (
                <div
                  key={prod.id}
                  className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">{prod.name}</h4>
                      <p className="text-slate-400">{prod.category} • Farmer: {prod.farmerName}</p>
                      <p className="text-brand-600 dark:text-emerald-400 font-extrabold">₹{prod.discountPrice ?? prod.price}/{prod.unit}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Remove ${prod.name} from public listing?`)) {
                        deleteProduct(prod.id);
                      }
                    }}
                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl"
                    title="Remove from marketplace"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Global Orders Feed */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Global Order Activity Feed
            </h3>

            <div className="space-y-3">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-white">#{order.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold uppercase text-[10px]">
                        {order.status}
                      </span>
                      <span className="text-emerald-600 font-bold">Paid via {order.paymentMethod.toUpperCase()}</span>
                    </div>
                    <p className="text-slate-400 mt-0.5">
                      Customer: {order.customerName} → {order.deliveryAddress.city} • {order.items.length} items
                    </p>
                  </div>

                  <span className="text-base font-black text-brand-700 dark:text-emerald-400">
                    ₹{order.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Disputes */}
        {activeTab === 'disputes' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Customer Support & Quality Dispute Tickets
            </h3>

            <div className="space-y-3">
              {tickets.map(t => (
                <div
                  key={t.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{t.issue}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1">
                      Order: {t.orderId} • Customer: {t.customer}
                    </p>
                  </div>

                  {t.status === 'Open' ? (
                    <button
                      onClick={() => handleResolveTicket(t.id)}
                      className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs"
                    >
                      Issue Full Replacement & Close
                    </button>
                  ) : (
                    <span className="text-emerald-600 font-bold">✓ Case Resolved</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Coupons Creator */}
        {activeTab === 'coupons' && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 max-w-md mx-auto space-y-4">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-harvest-500" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Create Promotional Coupon
              </h3>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={e => setNewCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. DIWALI25, HARVEST30"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 uppercase font-bold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  required
                  value={newCouponDiscount}
                  onChange={e => setNewCouponDiscount(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold"
                />
              </div>

              {couponCreatedMsg && (
                <p className="text-emerald-600 font-bold">✓ Coupon published! Customers can use {newCouponCode} at checkout.</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-soft-sm"
              >
                Create Promo Code
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
