import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Wand2,
  TrendingUp,
  Sparkles,
  Upload,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Info
} from 'lucide-react';
import { ProductCategory, Product } from '../../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit
}) => {
  const { addProduct, updateProduct, farmers } = useApp();
  const farmer = farmers[0]; // Ramesh Patel default

  const [name, setName] = useState(productToEdit?.name || '');
  const [category, setCategory] = useState<ProductCategory>(productToEdit?.category || 'Vegetables');
  const [price, setPrice] = useState(productToEdit?.price ? String(productToEdit.price) : '45');
  const [discountPrice, setDiscountPrice] = useState(productToEdit?.discountPrice ? String(productToEdit.discountPrice) : '38');
  const [unit, setUnit] = useState(productToEdit?.unit || 'kg');
  const [stock, setStock] = useState(productToEdit?.stock ? String(productToEdit.stock) : '150');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [isOrganic, setIsOrganic] = useState(productToEdit?.isOrganic ?? true);
  const [organicCertNumber, setOrganicCertNumber] = useState(productToEdit?.organicCertNumber || 'NPOP/NAB/0014/2024');
  const [imageUrl, setImageUrl] = useState(
    productToEdit?.images[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
  );
  const [harvestDate, setHarvestDate] = useState(productToEdit?.harvestDate || 'Harvested Today 6:00 AM');
  const [nutritionalHighlights, setNutritionalHighlights] = useState(
    productToEdit?.nutritionalHighlights.join(', ') || 'High Antioxidants, Vitamin Rich, Zero Pesticides'
  );

  // AI Tools states
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [showPriceAdvisor, setShowPriceAdvisor] = useState(false);
  const [aiPriceResult, setAiPriceResult] = useState<{
    mandiWholesale: number;
    recommendedD2C: number;
    supermarketRetail: number;
    farmerProfitBoost: string;
  } | null>(null);

  if (!isOpen) return null;

  // AI Description Generator logic
  const handleGenerateDescription = () => {
    if (!name.trim()) {
      alert('Please enter a produce name first (e.g., Alphonso Mango, Sweet Corn, Baby Spinach)');
      return;
    }
    setIsGeneratingAi(true);
    setTimeout(() => {
      const generated = `🌱 100% Organically Grown ${name} hand-picked from ${farmer.farmName} in ${farmer.location}. Cultivated using natural jeevamrutha and drip irrigation with zero synthetic chemical pesticides or artificial ripening agents. Packed with essential micronutrients, maximum crunch, and deep natural flavor. Ideal for daily home cooking, salads, and wholesome nutrition.`;
      setDescription(generated);
      setIsGeneratingAi(false);
    }, 700);
  };

  // AI Price Recommender logic
  const handleCalculateAiPrice = () => {
    const baseMandi = category === 'Fruits' ? 90 : category === 'Dairy' ? 65 : 25;
    const recommended = Math.round(baseMandi * 1.55);
    const supermarket = Math.round(baseMandi * 2.3);

    setAiPriceResult({
      mandiWholesale: baseMandi,
      recommendedD2C: recommended,
      supermarketRetail: supermarket,
      farmerProfitBoost: '+55%',
    });
    setPrice(String(supermarket));
    setDiscountPrice(String(recommended));
    setShowPriceAdvisor(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const highlightsArray = nutritionalHighlights
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (productToEdit) {
      updateProduct({
        ...productToEdit,
        name,
        category,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        unit,
        stock: Number(stock),
        description,
        isOrganic,
        organicCertNumber: isOrganic ? organicCertNumber : undefined,
        images: [imageUrl],
        harvestDate,
        nutritionalHighlights: highlightsArray,
      });
    } else {
      addProduct({
        name,
        category,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        unit,
        stock: Number(stock),
        description: description || `Freshly harvested ${name} directly from ${farmer.farmName}.`,
        isOrganic,
        organicCertNumber: isOrganic ? organicCertNumber : undefined,
        images: [imageUrl],
        farmerId: farmer.id,
        farmerName: farmer.name,
        farmerLocation: farmer.location,
        farmerRating: farmer.rating,
        farmerAvatar: farmer.avatar,
        harvestDate,
        nutritionalHighlights: highlightsArray,
        tags: ['Fresh Farm Direct', isOrganic ? 'Organic Certified' : 'Conventional'],
        mandiPriceBenchmark: aiPriceResult?.mandiWholesale || Math.round(Number(discountPrice || price) * 0.65),
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity" />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-harvest-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {productToEdit ? 'Edit Harvest Listing' : 'List New Crop Produce'}
              </h3>
              <p className="text-[11px] text-slate-400">Powered by AgriConnect AI Pricing & Copywriter</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          
          {/* Crop Name & AI Helper Trigger */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                Produce / Crop Name *
              </label>
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGeneratingAi}
                className="text-[11px] font-bold text-brand-600 dark:text-emerald-400 hover:text-brand-700 flex items-center gap-1 bg-brand-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg"
              >
                <Wand2 className="w-3.5 h-3.5 text-harvest-500" />
                <span>{isGeneratingAi ? 'AI Writing...' : 'AI Auto-Generate Description'}</span>
              </button>
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Nashik Vine-Ripened Heritage Tomatoes"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Category & Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ProductCategory)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Dairy', 'Honey', 'Herbs', 'Organic', 'Dry Fruits', 'Seeds', 'Flowers', 'Poultry'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Selling Unit
              </label>
              <select
                value={unit}
                onChange={e => setUnit(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="kg">Per kg</option>
                <option value="250g box">250g box</option>
                <option value="500g bottle">500g bottle/jar</option>
                <option value="1 Litre Bottle">1 Litre Bottle</option>
                <option value="bunch">Per bunch</option>
                <option value="dozen">Per dozen</option>
                <option value="Pack of 6">Pack of 6</option>
              </select>
            </div>
          </div>

          {/* Pricing & AI Price Recommender Row */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                Pricing & Mandi Benchmark
              </label>
              <button
                type="button"
                onClick={handleCalculateAiPrice}
                className="text-[11px] font-bold text-harvest-600 dark:text-harvest-400 hover:text-harvest-700 flex items-center gap-1 bg-harvest-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Calculate AI Fair Selling Price</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Direct Price (₹)</span>
                <input
                  type="number"
                  required
                  value={discountPrice}
                  onChange={e => setDiscountPrice(e.target.value)}
                  placeholder="e.g. 38"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-extrabold text-brand-700 dark:text-emerald-400"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Retail Benchmark (₹)</span>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="e.g. 48"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Available Stock</span>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  placeholder="e.g. 240"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            {/* AI Price Result Pill */}
            {aiPriceResult && showPriceAdvisor && (
              <div className="mt-3 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] space-y-1">
                <div className="flex justify-between font-bold text-emerald-800 dark:text-emerald-300">
                  <span>✓ AI Recommendation Applied:</span>
                  <span>{aiPriceResult.farmerProfitBoost} higher than wholesale mandi</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Wholesale Mandi: ₹{aiPriceResult.mandiWholesale} • Supermarket: ₹{aiPriceResult.supermarketRetail} • <strong>Direct Kisan: ₹{aiPriceResult.recommendedD2C}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Product Description */}
          <div>
            <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Description & Farming Practices
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe soil preparation, sunlight, taste profile, and recommended uses..."
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Organic Verification */}
          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isOrganic}
                onChange={e => setIsOrganic(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>NPOP / APEDA Organic Certified Harvest</span>
              </span>
            </label>

            {isOrganic && (
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Certificate / Accredit Code</span>
                <input
                  type="text"
                  value={organicCertNumber}
                  onChange={e => setOrganicCertNumber(e.target.value)}
                  placeholder="e.g. NPOP/NAB/0014/2024"
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
            )}
          </div>

          {/* Image URL & Harvest Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Produce Image URL
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Harvest Date / Time
              </label>
              <input
                type="text"
                required
                value={harvestDate}
                onChange={e => setHarvestDate(e.target.value)}
                placeholder="Harvested Today 5:30 AM"
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* Nutritional Highlights */}
          <div>
            <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Nutritional Tags (comma separated)
            </label>
            <input
              type="text"
              value={nutritionalHighlights}
              onChange={e => setNutritionalHighlights(e.target.value)}
              placeholder="High Lycopene, Rich Vitamin C, Potassium"
              className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm shadow-soft-lg flex items-center justify-center gap-2 transition-all mt-3"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{productToEdit ? 'Save Changes' : 'Publish Produce to Marketplace'}</span>
          </button>

        </form>

      </div>
    </div>
  );
};
