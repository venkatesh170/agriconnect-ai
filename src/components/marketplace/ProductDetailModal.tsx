import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Scale,
  Bot,
  MessageSquare,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { INITIAL_REVIEWS } from '../../data/seedData';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    setIsCheckoutOpen,
    products
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const currentPrice = product.discountPrice ?? product.price;

  // Frequently bought together recommendation
  const complementaryProduct = products.find(
    p => p.id !== product.id && (p.category === 'Vegetables' || p.category === 'Dairy')
  ) || products[0];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const newRev = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      customerName: 'Anita Sharma',
      customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewText,
      verifiedPurchase: true,
      sentiment: 'positive' as const,
    };
    setReviews([newRev, ...reviews]);
    setNewReviewText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setSelectedProductForDetail(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProductForDetail(null)}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sticky Close Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Marketplace</span>
            <span>/</span>
            <span className="text-brand-600 dark:text-emerald-400 font-bold">{product.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors ${
                isWishlisted ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'text-slate-500 hover:text-rose-500'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => setSelectedProductForDetail(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
          
          {/* Main Product Showcase Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Images Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 relative">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isOrganic && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-soft-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>NPOP Certified Organic</span>
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-brand-600 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Farmer Origin Mini Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={product.farmerAvatar || 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=150&q=80'}
                    alt={product.farmerName}
                    className="w-12 h-12 rounded-xl object-cover border border-brand-500"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {product.farmerName}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-600" />
                      {product.farmerLocation}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Rating</span>
                  <span className="text-xs font-bold text-amber-500">★ {product.farmerRating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Right: Info & Pricing Column */}
            <div className="md:col-span-6 space-y-5">
              
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{product.harvestDate}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {product.name}
                </h2>
              </div>

              {/* Price block */}
              <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-slate-800/80 border border-brand-200/60 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-brand-700 dark:text-emerald-400">
                      ₹{currentPrice}
                    </span>
                    <span className="text-xs text-slate-500">/{product.unit}</span>
                    {product.discountPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  {product.mandiPriceBenchmark && (
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold mt-1">
                      ✨ Direct Farm Advantage: Farmer gets ₹{currentPrice} vs Mandi’s ₹{product.mandiPriceBenchmark}
                    </p>
                  )}
                </div>

                <div className="text-right text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                    In Stock ({product.stock} {product.unit})
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Nutritional Highlights */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Health & Nutritional Perks:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.nutritionalHighlights.map(perk => (
                    <span
                      key={perk}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      🌱 {perk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Organic Certification Tag */}
              {product.organicCertNumber && (
                <div className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>APEDA / NPOP Certificate: <strong>{product.organicCertNumber}</strong></span>
                </div>
              )}

              {/* Quantity & Buy CTAs */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity:</span>
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-extrabold text-slate-800 dark:text-slate-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">Total: ₹{currentPrice * quantity}</span>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                    }}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-soft-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Basket</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-harvest-500 hover:bg-harvest-600 active:scale-95 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-soft-md"
                  >
                    <span>Instant Buy Now</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* AI Review Synthesizer Box */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    AgriBot Review Synthesis
                  </h4>
                  <p className="text-[10px] text-slate-400">AI analysis of verified customer feedback</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold">
                98% Satisfaction
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/60 dark:border-slate-700">
                <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key Praises</span>
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Unbeatable earthy aroma, significantly juicier than supermarket cold-storage produce, verified zero-carbide ripening.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-700">
                <p className="font-bold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Helpful Considerations</span>
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Because this produce is 100% preservative-free, consume within 5-7 days for peak flavor and crunch.
                </p>
              </div>
            </div>
          </div>

          {/* Frequently Bought Together Bundle */}
          <div className="p-5 rounded-3xl bg-harvest-50/50 dark:bg-slate-800/40 border border-harvest-200/60 dark:border-slate-700">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-harvest-800 dark:text-harvest-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-harvest-500" />
              Frequently Bought Together Bundle
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={product.images[0]}
                  alt="prod1"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <span className="font-bold text-slate-400 text-lg">+</span>
                <img
                  src={complementaryProduct.images[0]}
                  alt="prod2"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {product.name} + {complementaryProduct.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Direct Farm Combo • Save extra 5%
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  addToCart(complementaryProduct, 1);
                }}
                className="px-4 py-2.5 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Add Both for ₹{currentPrice + (complementaryProduct.discountPrice ?? complementaryProduct.price)}
              </button>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Customer Reviews ({reviews.length})
            </h3>

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Leave a Verified Review:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-0.5 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-400' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                required
                rows={2}
                value={newReviewText}
                onChange={e => setNewReviewText(e.target.value)}
                placeholder="Share how fresh the produce tasted, packaging quality, etc."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />

              <div className="flex justify-between items-center">
                {reviewSubmitted && (
                  <span className="text-xs text-emerald-600 font-semibold">✓ Review published!</span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold"
                >
                  Submit Review
                </button>
              </div>
            </form>

            {/* Reviews List */}
            <div className="space-y-3">
              {reviews.map(rev => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{rev.customerName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-semibold">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
