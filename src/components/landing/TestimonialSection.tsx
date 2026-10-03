import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Priya Narayanan',
      role: 'Mother & Home Cook, Bengaluru',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      comment: 'The difference in taste is staggering. When we receive tomatoes and baby spinach from Ramesh Patel’s Nashik farm, you can smell the damp earth on the stems. Knowing our money goes 100% to his family gives us immense peace of mind.',
      rating: 5,
      productPurchased: 'Nashik Vine Tomatoes & A2 Ghee',
    },
    {
      name: 'Chef Aditya Singhania',
      role: 'Head Chef, The Earth Table Restaurant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'For a farm-to-table restaurant, consistency and zero chemical pesticide residues are non-negotiable. AgriConnect AI gives us blockchain QR lab reports with every batch, and direct communication with orchard growers like Anand Sharma.',
      rating: 5,
      productPurchased: 'Kinnaur Apples & Wild Honey',
    },
    {
      name: 'Dr. Meenakshi Sundaram',
      role: 'Ayurvedic Physician, Chennai',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      comment: 'Commercial honey in supermarkets is diluted with high-fructose corn syrup. The wild raw Nilgiri forest honey here retains active pollen and medicinal enzymes. Truly pure and authentic.',
      rating: 5,
      productPurchased: 'Wild Nilgiri Forest Honey',
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slatebg dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/10 dark:bg-harvest-500/20 text-harvest-600 dark:text-harvest-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by Urban Families & Chefs
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
            Over 28,000 conscious consumers trust AgriConnect for unadulterated, wholesome farm produce.
          </p>
        </div>

        {/* 3 Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-soft-sm hover:shadow-soft-lg transition-all"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 font-semibold ml-1">5.0</span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-brand-500"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {t.role}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Purchase: {t.productPurchased}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
