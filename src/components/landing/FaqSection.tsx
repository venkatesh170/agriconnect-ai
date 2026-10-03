import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does direct farm-to-table delivery work without middlemen?',
      a: 'When you place an order, our system notifies the verified local farmer immediately. Produce is harvested at dawn specifically for your order, packed in temperature-controlled biodegradable crates, and dispatched directly through our integrated cold-chain EV logistics network. This completely bypasses multi-tier mandi commission agents and wholesale storage warehouses.'
    },
    {
      q: 'How do you verify organic certification and prevent chemical contamination?',
      a: 'Every farmer on AgriConnect undergoes an in-person field audit. We verify government APEDA/NPOP organic certifications, soil microbial tests, and water quality reports. Each product package carries a scannable QR code linking to third-party lab residual pesticide testing certificates.'
    },
    {
      q: 'How does the AI Price Recommender calculate fair rates?',
      a: 'Our algorithmic model aggregates real-time APMC Mandi wholesale prices, local retail prices, transport fuel indices, and seasonal weather yield forecasts. It establishes a benchmark that pays the farmer up to 40% higher than wholesale mandis while remaining 20-30% cheaper than bloated retail supermarkets.'
    },
    {
      q: 'What if produce arrives damaged or bruised during transit?',
      a: 'We offer a 100% Freshness Guarantee. If any item is bruised or does not meet your expectations, simply snap a picture in the Order Tracking screen or raise a ticket via AgriBot for an instant 100% refund or replacement dispatch.'
    },
    {
      q: 'How quickly do farmers receive payment?',
      a: 'Unlike traditional supply chains where farmers wait 45 to 90 days for mandi payments, AgriConnect automatically settles funds directly into the kisan’s UPI/bank account within 24 hours of successful delivery.'
    },
    {
      q: 'Can I subscribe to recurring weekly or bi-weekly farm boxes?',
      a: 'Yes! Our Farm Box Subscriptions allow you to receive curated seasonal vegetables, fruits, or A2 dairy weekly or bi-weekly. You can pause, skip, or customize your preferred items anytime from your customer dashboard.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Learn more about transparent pricing, cold-chain delivery, and our zero-middleman guarantee.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
