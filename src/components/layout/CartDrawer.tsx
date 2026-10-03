import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setCurrentView,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 500;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));
  const amountNeeded = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Harvest Basket ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-brand-50/70 dark:bg-slate-800/40 border-b border-brand-100/50 dark:border-slate-800">
            <div className="flex justify-between text-xs font-semibold text-brand-900 dark:text-emerald-300 mb-1.5">
              <span>{amountNeeded === 0 ? '🎉 Free Direct Farm Shipping unlocked!' : `Add ₹${amountNeeded} more for Free Shipping`}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    Your basket is empty
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Explore fresh, farm-picked produce from verified local organic farmers.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('marketplace');
                  }}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Explore Fresh Harvest
                </button>
              </div>
            ) : (
              cart.map(item => {
                const currentPrice = item.product.discountPrice ?? item.product.price;
                return (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-800/40 hover:border-slate-200 transition-all"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          By {item.product.farmerName} • {item.product.farmerLocation}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-extrabold text-sm text-brand-700 dark:text-emerald-400">
                            ₹{currentPrice * item.quantity}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            (₹{currentPrice}/{item.product.unit})
                          </span>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 space-y-4">
              
              {/* Promo code form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code} applied ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-500 hover:text-rose-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      placeholder="Coupon: FRESH20 or KISAN10"
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 uppercase focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white text-xs font-semibold rounded-xl hover:bg-slate-700 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && !appliedCoupon && (
                  <p className="text-[11px] text-rose-500 mt-1">{couponFeedback.message}</p>
                )}
              </div>

              {/* Price Details */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Farm Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">₹{cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {amountNeeded === 0 ? 'FREE' : '₹40'}
                  </span>
                </div>
                <div className="flex justify-between text-harvest-600 dark:text-harvest-400 font-medium text-[11px] pt-1">
                  <span>Direct Middleman Savings</span>
                  <span>~₹{Math.round(cartSubtotal * 0.35)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>Grand Total</span>
                  <span className="text-brand-700 dark:text-emerald-400 text-base">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white py-3.5 rounded-2xl font-bold text-sm shadow-soft-lg flex items-center justify-center gap-2 transition-all group"
              >
                <span>Proceed to Razorpay Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Secure Checkout with Razorpay & UPI</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
