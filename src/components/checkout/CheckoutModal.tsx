import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Leaf,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Address } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    customer,
    createOrder,
    clearCart
  } = useApp();

  const [step, setStep] = useState<'details' | 'razorpay-modal'>('details');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(customer.addresses[0]?.id || 'addr-1');
  const [deliverySlot, setDeliverySlot] = useState<'dawn' | 'noon' | 'express'>('dawn');
  const [packagingType, setPackagingType] = useState<'eco-straw' | 'reusable-crate'>('eco-straw');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'razorpay' | 'card' | 'cod'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [razorpayMethod, setRazorpayMethod] = useState<'gpay' | 'phonepe' | 'qr' | 'card'>('qr');

  if (!isCheckoutOpen) return null;

  const selectedAddress = customer.addresses.find(a => a.id === selectedAddressId) || customer.addresses[0];

  const handleLaunchPayment = () => {
    if (paymentMethod === 'cod') {
      finalizeOrder('cod');
      return;
    }
    // Launch Razorpay Simulation Gateway
    setStep('razorpay-modal');
  };

  const finalizeOrder = (method: 'upi' | 'razorpay' | 'card' | 'cod') => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setStep('details');
      setIsCheckoutOpen(false);

      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2E7D32', '#FF9800', '#22C55E', '#F59E0B'],
        });
      } catch (err) {
        // ignore if canvas-confetti in tests
      }

      // Create order in global state
      createOrder({
        deliveryAddress: selectedAddress,
        paymentMethod: method,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => {
          if (!isProcessingPayment) setIsCheckoutOpen(false);
        }}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-emerald-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Farm-Direct Express Checkout
              </h3>
              <p className="text-[11px] text-slate-400">Zero middleman cut • 100% Secure Gateway</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            disabled={isProcessingPayment}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Details & Address Selection */}
        {step === 'details' && (
          <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Delivery Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>1. Select Delivery Destination</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {customer.addresses.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      selectedAddressId === addr.id
                        ? 'border-brand-600 bg-brand-50/60 dark:bg-emerald-950/40 text-brand-900 dark:text-emerald-200 shadow-soft-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs">{addr.label}</span>
                      {selectedAddressId === addr.id && (
                        <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-emerald-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                      {addr.street}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {addr.city}, {addr.pincode}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Slot */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-600" />
                <span>2. Harvest Delivery Slot</span>
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'dawn', title: 'Dawn Harvest Slot', time: '6:00 AM – 8:30 AM', badge: 'Freshest' },
                  { id: 'noon', title: 'Midday Slot', time: '11:00 AM – 1:30 PM', badge: 'Standard' },
                  { id: 'express', title: '2-Hr EV Express', time: 'Today by 2:00 PM', badge: 'EV Van' }
                ].map(slot => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setDeliverySlot(slot.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      deliverySlot === slot.id
                        ? 'border-brand-600 bg-brand-50/60 dark:bg-emerald-950/40 shadow-soft-sm'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-brand-100 text-brand-800 dark:bg-slate-700 dark:text-emerald-300">
                      {slot.badge}
                    </span>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white mt-1.5">
                      {slot.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">{slot.time}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Packaging Preference */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>3. Zero-Waste Packaging</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div
                  onClick={() => setPackagingType('eco-straw')}
                  className={`p-3 rounded-2xl border cursor-pointer ${
                    packagingType === 'eco-straw'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-emerald-950/40'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <p className="font-bold text-slate-900 dark:text-white">Biodegradable Straw & Paper</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">100% compostable home pack</p>
                </div>
                <div
                  onClick={() => setPackagingType('reusable-crate')}
                  className={`p-3 rounded-2xl border cursor-pointer ${
                    packagingType === 'reusable-crate'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-emerald-950/40'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <p className="font-bold text-slate-900 dark:text-white">Reusable Insulated Farm Crate</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Driver collects crate on next visit</p>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-brand-600" />
                <span>4. Payment Method</span>
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'upi', label: 'UPI / QR Code', icon: QrCode, desc: 'Instant 0% fee' },
                  { id: 'razorpay', label: 'Razorpay Gateway', icon: ShieldCheck, desc: 'Cards, NetBanking' },
                  { id: 'cod', label: 'Cash on Handover', icon: Banknote, desc: 'Pay upon delivery' }
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        paymentMethod === m.id
                          ? 'border-brand-600 bg-brand-50/70 dark:bg-emerald-950/40 shadow-soft-sm'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1 text-brand-600 dark:text-emerald-400" />
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">{m.label}</span>
                      <span className="text-[10px] text-slate-400 block">{m.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Produce Total ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>₹{cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>-₹{cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Cold-Chain Eco Delivery</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">FREE (Farm Direct)</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Final Payable</span>
                <span className="text-brand-700 dark:text-emerald-400">₹{cartTotal}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleLaunchPayment}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-soft-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>{paymentMethod === 'cod' ? 'Confirm Cash on Delivery Order' : `Pay ₹${cartTotal} via Razorpay`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

        {/* STEP 2: Realistic Razorpay Sandbox Simulation Modal */}
        {step === 'razorpay-modal' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Razorpay Branded Top Banner */}
            <div className="bg-[#0C2340] text-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#528FF0]">
                    Razorpay
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                    Sandbox Verified
                  </span>
                </div>
                <p className="text-sm font-bold mt-1 text-white">AgriConnect Marketplace Ltd</p>
                <p className="text-[11px] text-slate-300">Order: AGC-PROD-DIRECT • Total: ₹{cartTotal}</p>
              </div>

              <div className="text-right">
                <span className="text-xl font-black text-[#528FF0]">₹{cartTotal}</span>
              </div>
            </div>

            {/* Simulated Payment Methods inside Razorpay */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select UPI / Card Option:
              </p>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'qr', label: 'UPI QR', icon: QrCode },
                  { id: 'gpay', label: 'Google Pay', icon: ShieldCheck },
                  { id: 'phonepe', label: 'PhonePe', icon: Sparkles },
                  { id: 'card', label: 'Debit/Credit', icon: CreditCard }
                ].map(r => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRazorpayMethod(r.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        razorpayMethod === r.id
                          ? 'border-[#528FF0] bg-blue-50/60 dark:bg-slate-800 text-blue-700 dark:text-blue-300 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4 mx-auto mb-1 text-[#528FF0]" />
                      <span className="text-[11px] block">{r.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Mock View */}
              {razorpayMethod === 'qr' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                  <div className="w-36 h-36 bg-white p-2 rounded-2xl mx-auto border shadow-sm flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=agriconnect@kisanbank&pn=AgriConnectFarmers&am=${cartTotal}&cu=INR`}
                      alt="UPI QR Code"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Scan with any UPI App (GPay, PhonePe, Paytm, CRED)
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Instant zero-commission settlement to kisan accounts
                  </p>
                </div>
              )}

              {razorpayMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div>
                    <label className="font-semibold block mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="4532 •••• •••• 9921"
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold block mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">CVV</label>
                      <input
                        type="password"
                        defaultValue="882"
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trigger Mock Completion */}
            <div className="space-y-2">
              <button
                onClick={() => finalizeOrder(paymentMethod)}
                disabled={isProcessingPayment}
                className="w-full bg-[#528FF0] hover:bg-[#3d7be0] text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-soft-md flex items-center justify-center gap-2 transition-all"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authorizing Bank Settlement...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize & Complete Payment (₹{cartTotal})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setStep('details')}
                disabled={isProcessingPayment}
                className="w-full text-xs text-slate-400 hover:text-slate-600 py-1"
              >
                ← Back to Order Details
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
