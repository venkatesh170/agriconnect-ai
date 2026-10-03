import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tractor,
  Package,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  QrCode,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  DollarSign,
  Download,
  AlertCircle
} from 'lucide-react';
import { Product, OrderStatus } from '../../types';
import { AddProductModal } from './AddProductModal';

export const FarmerDashboard: React.FC = () => {
  const {
    products,
    farmers,
    orders,
    updateOrderStatus,
    deleteProduct,
    setCurrentView
  } = useApp();

  const farmer = farmers[0]; // Ramesh Patel
  const myProducts = products.filter(p => p.farmerId === farmer.id);
  const myOrders = orders.filter(o => o.farmerIds.includes(farmer.id));

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'analytics' | 'qr'>('inventory');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Quick stock update state
  const handleQuickStock = (p: Product, newStock: number) => {
    // updateProduct in AppContext
    p.stock = Math.max(0, newStock);
  };

  return (
    <div className="min-h-screen py-8 bg-slatebg dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Profile Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-800 via-brand-700 to-harvest-700 text-white p-6 sm:p-8 shadow-soft-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-white/30 shadow-soft-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{farmer.name}</h1>
                {farmer.verified && (
                  <span className="p-1 rounded-full bg-emerald-500 text-white" title="NPOP APEDA Verified">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-200 font-semibold mt-0.5">
                {farmer.farmName} • {farmer.location}
              </p>
              <div className="flex flex-wrap gap-2 mt-2 text-[11px]">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                  {farmer.acres} Acres Regenerative Land
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                  ★ {farmer.rating.toFixed(2)} Rating
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('qr')}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>Packaging QR</span>
            </button>

            <button
              onClick={() => {
                setProductToEdit(null);
                setIsAddModalOpen(true);
              }}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-2xl bg-harvest-500 hover:bg-harvest-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-soft-md transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>List New Produce</span>
            </button>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Direct Revenue</p>
            <p className="text-2xl font-black text-brand-700 dark:text-emerald-400 mt-1">₹8,45,000</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">+42% vs Mandi wholesale</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Harvest Orders</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{myOrders.length}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Cold van dispatch scheduled</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Listed Crops</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{myProducts.length}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">100% NPOP Certified</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Rating</p>
            <p className="text-2xl font-black text-amber-500 mt-1">★ 4.90</p>
            <p className="text-[11px] text-slate-400 mt-0.5">1,420 orders fulfilled</p>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto">
          {[
            { id: 'inventory', label: `Produce Inventory (${myProducts.length})`, icon: Package },
            { id: 'orders', label: `Fulfillment Orders (${myOrders.length})`, icon: Tractor },
            { id: 'analytics', label: 'Sales & Mandi Trends', icon: TrendingUp },
            { id: 'qr', label: 'Farm QR Verification', icon: QrCode },
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

        {/* TAB 1: Produce Inventory */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Live Field Produce ({myProducts.length})
              </h3>
              <button
                onClick={() => {
                  setProductToEdit(null);
                  setIsAddModalOpen(true);
                }}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-soft-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Crop</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProducts.map(prod => (
                <div
                  key={prod.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 shadow-soft-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-3">
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                      {prod.isOrganic && (
                        <span className="absolute top-2 left-2 text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                          Organic
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{prod.category} • {prod.harvestDate}</p>

                    <div className="flex justify-between items-baseline mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <div>
                        <span className="text-xs text-slate-400">Direct Price:</span>
                        <p className="font-black text-brand-700 dark:text-emerald-400 text-base">
                          ₹{prod.discountPrice ?? prod.price} / {prod.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400">In Stock:</span>
                        <p className="font-bold text-slate-800 dark:text-white text-xs">
                          {prod.stock} {prod.unit}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-4">
                    <button
                      onClick={() => {
                        setProductToEdit(prod);
                        setIsAddModalOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete ${prod.name}?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Order Fulfillment */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
              Orders Requiring Harvest & Dispatch
            </h3>

            {myOrders.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 text-slate-400">
                No orders pending fulfillment.
              </div>
            ) : (
              myOrders.map(order => (
                <div
                  key={order.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-soft-sm space-y-4"
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
                        Buyer: {order.customerName} ({order.customerPhone}) • {order.createdAt}
                      </p>
                    </div>

                    <span className="text-lg font-black text-brand-700 dark:text-emerald-400">
                      ₹{order.total}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.product.id} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {item.quantity}x {item.product.name}
                        </span>
                        <span className="text-slate-500 font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Advance status controls */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500">Destination: {order.deliveryAddress.city}</span>

                    <div className="flex items-center gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'accepted')}
                          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl"
                        >
                          Accept Order & Harvest
                        </button>
                      )}
                      {order.status === 'accepted' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'packed')}
                          className="px-4 py-2 bg-harvest-500 hover:bg-harvest-600 text-slate-950 font-bold rounded-xl"
                        >
                          Mark as Freshly Packed
                        </button>
                      )}
                      {order.status === 'packed' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl"
                        >
                          Handover to EV Cold Van
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <span className="text-emerald-600 font-bold">✓ En route with driver</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: Sales Analytics & Mandi Trends */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Monthly Direct Revenue Trends (2025 - 2026)
              </h3>
              <p className="text-xs text-slate-400">
                Comparing traditional APMC wholesale payout vs AgriConnect Direct-to-Consumer returns.
              </p>

              {/* Simulated Bar Chart */}
              <div className="pt-6 grid grid-cols-6 gap-3 sm:gap-6 h-56 items-end pb-4 border-b border-slate-200 dark:border-slate-700">
                {[
                  { month: 'Nov', direct: 85, mandi: 55 },
                  { month: 'Dec', direct: 110, mandi: 70 },
                  { month: 'Jan', direct: 140, mandi: 85 },
                  { month: 'Feb', direct: 165, mandi: 95 },
                  { month: 'Mar', direct: 195, mandi: 115 },
                  { month: 'Apr', direct: 220, mandi: 130 },
                ].map(bar => (
                  <div key={bar.month} className="flex flex-col items-center gap-2 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Mandi bar */}
                      <div
                        style={{ height: `${(bar.mandi / 250) * 100}%` }}
                        className="w-1/2 bg-slate-300 dark:bg-slate-700 rounded-t-lg transition-all"
                        title={`Mandi: ₹${bar.mandi},000`}
                      />
                      {/* AgriConnect bar */}
                      <div
                        style={{ height: `${(bar.direct / 250) * 100}%` }}
                        className="w-1/2 bg-gradient-to-t from-brand-600 to-brand-500 rounded-t-lg shadow-sm transition-all"
                        title={`AgriConnect Direct: ₹${bar.direct},000`}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">{bar.month}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 text-xs pt-2">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-brand-600" />
                  <strong>AgriConnect Direct Payout (Avg +48%)</strong>
                </span>
                <span className="flex items-center gap-2 text-slate-400">
                  <span className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-700" />
                  <span>Mandi Wholesale Equivalent</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Packaging QR Verification */}
        {activeTab === 'qr' && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm max-w-xl mx-auto text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <QrCode className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Official Farm Verification QR Tag
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Print this dynamic QR code and attach it to your harvest crates. When buyers scan it, they see your APEDA organic certificate, soil test report, and live farm location.
              </p>
            </div>

            <div className="w-48 h-48 bg-white p-3 rounded-3xl mx-auto border-2 border-brand-500 shadow-soft-md flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(farmer.qrVerificationUrl)}`}
                alt="Farmer Verification QR"
                className="w-full h-full"
              />
            </div>

            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>APEDA NPOP Organic Accreditation Verified</span>
            </p>

            <button
              onClick={() => alert('Downloading high-resolution printable QR sticker template...')}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 mx-auto shadow-soft-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Printable QR Sticker Sheet</span>
            </button>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        productToEdit={productToEdit}
      />
    </div>
  );
};
