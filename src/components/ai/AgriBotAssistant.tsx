import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Mic,
  MicOff,
  ShoppingCart,
  CheckCircle2,
  HelpCircle,
  Utensils,
  Sun,
  Truck,
  Minimize2
} from 'lucide-react';
import { AiMessage, Product } from '../../types';

export const AgriBotAssistant: React.FC = () => {
  const {
    products,
    orders,
    addToCart,
    trackOrder,
    t,
    setSelectedProductForDetail
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: AiMessage[] = [
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Namaste! 🙏 I'm **AgriBot**, your AI farming and nutrition guide. How can I help you today? Ask me about seasonal harvests, healthy dinner recipes, or tracking your order!",
      timestamp: 'Just now',
    }
  ];

  const [messages, setMessages] = useState<AiMessage[]>(initialMessages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: '🥗 Recipe with Spinach & Tomatoes', query: 'Suggest a healthy dinner recipe using fresh baby spinach and vine tomatoes' },
    { label: '🌱 What’s peak season now?', query: 'What produce is at peak harvest sweetness right now?' },
    { label: '💪 High-Iron & Vitamin C foods', query: 'Recommend produce rich in iron and vitamin C for immunity' },
    { label: '🚚 Track my current order', query: 'Where is my latest order?' },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: AiMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Heuristic Response Engine
    setTimeout(() => {
      const lower = query.toLowerCase();
      let botReply = '';
      let recommended: Product[] = [];
      let actionType: AiMessage['actionType'] = undefined;

      if (lower.includes('recipe') || lower.includes('dinner') || lower.includes('cook')) {
        actionType = 'recipe';
        botReply = "👩‍🍳 **Farm-Fresh Recipe: Sautéed Garlic Baby Spinach with Roast Vine Tomatoes & A2 Paneer**\n\n1. Heat 1 tbsp A2 Gir Ghee in a skillet.\n2. Add crushed garlic, cumin, and sliced vine-ripened tomatoes until blistered.\n3. Toss in freshly picked baby spinach for 90 seconds until bright green.\n4. Sprinkle rock salt and fresh cracked pepper.\n\n*Pure, unadulterated nutrients straight from the soil!*";
        recommended = products.filter(p => p.id === 'prod-1' || p.id === 'prod-6');
      } else if (lower.includes('season') || lower.includes('harvest') || lower.includes('today')) {
        actionType = 'crop_advice';
        botReply = "🌤️ Right now in **Rabi Harvest season**, cooler weather has intensified natural sugars! Our top recommendations:\n\n• **Vine Tomatoes** (Dindori Valley) - 40% sweeter than summer batches.\n• **Kinnaur Crisp Apples** - Picked at 8,500 ft altitude in Himachal.\n• **Wild Forest Honey** - Rich in bio-active bee pollen.";
        recommended = products.filter(p => p.id === 'prod-1' || p.id === 'prod-2' || p.id === 'prod-3');
      } else if (lower.includes('iron') || lower.includes('vitamin') || lower.includes('immunity') || lower.includes('nutrition')) {
        actionType = 'recipe';
        botReply = "💪 For natural bioavailable iron and immunity, avoid synthetic supplements! Focus on **Hydroponic Baby Spinach** (packed with folate & non-heme iron) and pair with **High-Altitude Hill Carrots** (Beta-carotene) for optimal absorption.";
        recommended = products.filter(p => p.id === 'prod-6' || p.id === 'prod-7');
      } else if (lower.includes('order') || lower.includes('track') || lower.includes('where')) {
        actionType = 'order_help';
        const latestOrder = orders[0];
        if (latestOrder) {
          botReply = `📦 Your latest order **#${latestOrder.orderNumber}** is currently **${latestOrder.status.toUpperCase()}**.\n\nEstimated arrival: **${latestOrder.estimatedDelivery}** to ${latestOrder.deliveryAddress.city}.`;
        } else {
          botReply = "You don't have any active orders right now. Explore the marketplace to place your first direct farm harvest order!";
        }
      } else {
        botReply = `I found some wonderful direct farm produce matching "${query}"! All items are harvested at dawn by verified farmers with zero middlemen markups.`;
        recommended = products.slice(0, 2);
      }

      const botMsg: AiMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        text: botReply,
        timestamp: 'Just now',
        recommendedProducts: recommended.length > 0 ? recommended : undefined,
        actionType,
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 650);
  };

  const toggleVoiceListening = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        handleSendMessage('What produce is at peak harvest sweetness right now?');
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-harvest-500 text-white shadow-soft-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 ai-glow group"
          title="Open AgriBot AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-black block leading-none">Ask AgriBot AI</span>
            <span className="text-[10px] text-emerald-100 font-medium">Recipes, Advice & Orders</span>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-700 via-brand-600 to-harvest-600 text-white flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm">AgriBot Assistant</h3>
                  <span className="text-[9px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full uppercase">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  Direct Farm Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.query)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:border-brand-500 whitespace-nowrap transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  {msg.text}
                </div>

                {/* In-Chat Recommended Product Cards */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="mt-2.5 space-y-2 w-full max-w-[90%]">
                    {msg.recommendedProducts.map(prod => (
                      <div
                        key={prod.id}
                        className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div
                          onClick={() => setSelectedProductForDetail(prod)}
                          className="flex items-center gap-2 cursor-pointer min-w-0"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 dark:text-white truncate text-[11px]">
                              {prod.name}
                            </p>
                            <span className="text-[10px] text-brand-600 dark:text-emerald-400 font-extrabold">
                              ₹{prod.discountPrice ?? prod.price}/{prod.unit}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="px-2.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-[10px] font-bold flex items-center gap-1 flex-shrink-0"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 max-w-[120px]">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200" />
                <span className="text-[10px] ml-1">AgriBot thinking</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
            {isListening && (
              <div className="mb-2 p-1.5 rounded-xl bg-rose-50 text-rose-600 text-[10px] text-center font-bold animate-pulse">
                🎙️ Listening to voice query... Speak now!
              </div>
            )}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleVoiceListening}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-brand-600'
                }`}
                title="Voice Query Simulation"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ask about recipes, crops, or orders..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
              />

              <button
                type="submit"
                className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
