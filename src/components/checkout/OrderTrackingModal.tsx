import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  ShoppingBag,
  MapPin,
  Phone,
  FileText,
  ShieldCheck,
  Sparkles,
  Tractor
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    isOrderTrackingOpen,
    setIsOrderTrackingOpen,
    trackingOrderId,
    orders,
    customer,
  } = useApp();

  if (!isOrderTrackingOpen || !trackingOrderId) return null;

  const currentOrder = orders.find(o => o.id === trackingOrderId) || orders[0];
  if (!currentOrder) return null;

  const stages: { status: OrderStatus; label: string; icon: any; desc: string }[] = [
    { status: 'pending', label: 'Order Placed', icon: ShoppingBag, desc: 'Payment verified & order queued' },
    { status: 'accepted', label: 'Confirmed by Kisan', icon: Tractor, desc: 'Farmer reviewed & scheduled harvest' },
    { status: 'packed', label: 'Freshly Picked & Packed', icon: Package, desc: 'Eco-crate packed with straw cushioning' },
    { status: 'shipped', label: 'Cold-Chain Transit', icon: Truck, desc: 'EV refrigerated van en route' },
    { status: 'delivered', label: 'Delivered to Doorstep', icon: CheckCircle2, desc: 'Zero contact fresh handover' },
  ];

  const getStatusIndex = (st: OrderStatus) => {
    switch (st) {
      case 'pending': return 0;
      case 'accepted': return 1;
      case 'packed': return 2;
      case 'shipped':
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const activeIndex = getStatusIndex(currentOrder.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setIsOrderTrackingOpen(false)}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-emerald-400">
                Live Farm Transit Tracker
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mt-0.5">
              Order #{currentOrder.orderNumber}
            </h3>
          </div>

          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* Top Status Alert Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-600 to-emerald-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-soft-sm">
            <div>
              <p className="text-xs font-semibold text-emerald-100">Estimated Delivery Arrival:</p>
              <h4 className="text-lg font-black tracking-tight">{currentOrder.estimatedDelivery}</h4>
            </div>
            <div className="text-xs bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-md self-stretch sm:self-auto text-center font-bold">
              Status: <span className="uppercase tracking-wider">{currentOrder.status.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
              Harvest & Transit Timeline
            </h4>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
              {stages.map((stage, idx) => {
                const isCompleted = idx <= activeIndex;
                const isCurrent = idx === activeIndex;
                const Icon = stage.icon;

                return (
                  <div key={stage.status} className="relative flex items-start gap-4">
                    {/* Circle marker */}
                    <div
                      className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-brand-600 text-white shadow-soft-sm ring-4 ring-brand-100 dark:ring-emerald-950'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h5
                          className={`text-xs sm:text-sm font-bold ${
                            isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                          }`}
                        >
                          {stage.label}
                        </h5>
                        {isCurrent && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-harvest-500/20 text-harvest-600 dark:text-harvest-400 border border-harvest-500/30">
                            Active Step
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Driver Info */}
          {currentOrder.deliveryAgent && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {currentOrder.deliveryAgent.name} (EV Cold-Van)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Vehicle: {currentOrder.deliveryAgent.vehicleNo}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${currentOrder.deliveryAgent.phone}`}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver</span>
              </a>
            </div>
          )}

          {/* Items Summary in this Order */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Crops in this Harvest Box ({currentOrder.items.length})
            </h4>

            <div className="space-y-2">
              {currentOrder.items.map(item => (
                <div
                  key={item.product.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-11 h-11 rounded-xl object-cover"
                    />
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                        {item.product.name}
                      </h5>
                      <p className="text-[11px] text-slate-400">
                        Qty: {item.quantity} {item.product.unit} • Farmer: {item.product.farmerName}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Destination Address & Invoice action */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-400 uppercase text-[10px] block">
                Delivering to:
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                {currentOrder.deliveryAddress.street}, {currentOrder.deliveryAddress.city} - {currentOrder.deliveryAddress.pincode}
              </p>
            </div>

            <button
              onClick={() => alert(`Downloading GST-compliant Farmer Invoice for #${currentOrder.orderNumber}`)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1.5 shadow-soft-sm"
            >
              <FileText className="w-3.5 h-3.5 text-brand-600" />
              <span>Download Farm Receipt</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
