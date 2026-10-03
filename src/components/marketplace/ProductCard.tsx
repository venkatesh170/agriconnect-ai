import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  ShoppingCart,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Scale
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    setSelectedProductForDetail,
    t
  } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const currentPrice = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm hover:shadow-soft-lg hover:border-brand-500/50 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer">
        <img
          src={product.images[0]}
          alt={product.name}
          onClick={() => setSelectedProductForDetail(product)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isOrganic && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-3 h-3" />
              <span>Organic</span>
            </span>
          )}
          {hasDiscount && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-sm">
              Save ₹{product.price - product.discountPrice!}
            </span>
          )}
        </div>

        {/* Top Actions Right (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={e => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isCompared
                ? 'bg-brand-600 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-white'
            }`}
            title="Compare with other crops"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Harvest Date Tag Bar */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded-xl bg-slate-950/70 backdrop-blur-md text-[10px] text-white">
          <span className="flex items-center gap-1 font-medium truncate">
            <Clock className="w-3 h-3 text-emerald-400" />
            {product.harvestDate}
          </span>
          <span className="font-bold text-amber-300 flex-shrink-0">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Farmer Info */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <MapPin className="w-3 h-3 text-brand-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="truncate">{product.farmerName} • {product.farmerLocation}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProductForDetail(product)}
            className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-brand-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Direct Farm Benchmark saving notice */}
          {product.mandiPriceBenchmark && (
            <div className="mt-2 text-[10px] px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-harvest-500 flex-shrink-0" />
              <span>Zero Middleman: Farmer gets ₹{currentPrice} vs Mandi's ₹{product.mandiPriceBenchmark}</span>
            </div>
          )}
        </div>

        {/* Price & Add to Cart Bottom */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-extrabold text-brand-700 dark:text-emerald-400">
                ₹{currentPrice}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                /{product.unit}
              </span>
            </div>
            {hasDiscount && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{product.price}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-soft-sm hover:shadow-soft-md"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
