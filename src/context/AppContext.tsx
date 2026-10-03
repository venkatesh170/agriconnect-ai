import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  Product,
  Farmer,
  Customer,
  CartItem,
  Order,
  OrderStatus,
  ProductCategory
} from '../types';
import { PRODUCTS, FARMERS, SEED_CUSTOMER, INITIAL_ORDERS } from '../data/seedData';
import { TRANSLATIONS } from '../data/translations';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'stock' | 'price' | 'system';
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  
  // Navigation & views
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Data
  products: Product[];
  farmers: Farmer[];
  orders: Order[];
  customer: Customer;
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  notifications: NotificationItem[];

  // Modals & Panels
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (prod: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  appliedCoupon: { code: string; discountPercent: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartTotal: number;

  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;

  createOrder: (orderInfo: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  trackOrder: (orderId: string) => void;

  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  verifyFarmer: (farmerId: string, verified: boolean) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('agri_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // Role state
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('agri_user_role') as UserRole) || 'customer';
  });

  // Language state
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('agri_language') as Language) || 'en';
  });

  // View state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('agri_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Farmers state
  const [farmers, setFarmers] = useState<Farmer[]>(() => {
    const saved = localStorage.getItem('agri_farmers');
    return saved ? JSON.parse(saved) : FARMERS;
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('agri_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Customer state
  const [customer, setCustomer] = useState<Customer>(() => {
    const saved = localStorage.getItem('agri_customer');
    return saved ? JSON.parse(saved) : SEED_CUSTOMER;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('agri_cart');
    return saved ? JSON.parse(saved) : [
      { product: PRODUCTS[0], quantity: 2 },
      { product: PRODUCTS[1], quantity: 1 }
    ];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('agri_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
  });

  // Compare state
  const [compareList, setCompareList] = useState<string[]>([]);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Order Out for Delivery 🚚',
      message: 'Your order #AGC-89210 is dispatched from Ramesh Patel’s farm in an EV cold van.',
      time: '15m ago',
      read: false,
      type: 'order',
    },
    {
      id: 'notif-2',
      title: 'Mandi Price Alert 📈',
      message: 'Tomato wholesale mandi price increased by 14%. Direct farm rate remains stable at ₹38/kg.',
      time: '2h ago',
      read: false,
      type: 'price',
    },
    {
      id: 'notif-3',
      title: 'Fresh Harvest Listed 🌱',
      message: 'Lakshmi Devi just harvested high-altitude carrots in Nilgiris.',
      time: '5h ago',
      read: true,
      type: 'stock',
    }
  ]);

  // Modal controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>('ord-8921');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>({
    code: 'FRESH20',
    discountPercent: 15
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('agri_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('agri_user_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('agri_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('agri_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('agri_farmers', JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem('agri_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('agri_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('agri_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Translation helper
  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => {
    const p = item.product.discountPrice ?? item.product.price;
    return sum + p * item.quantity;
  }, 0);

  const cartDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'FRESH20') {
      setAppliedCoupon({ code: 'FRESH20', discountPercent: 20 });
      return { success: true, message: 'Coupon FRESH20 applied! 20% discount granted.' };
    }
    if (normalized === 'KISAN10') {
      setAppliedCoupon({ code: 'KISAN10', discountPercent: 10 });
      return { success: true, message: 'Coupon KISAN10 applied! 10% discount granted.' };
    }
    if (normalized === 'HARVEST50') {
      setAppliedCoupon({ code: 'HARVEST50', discountPercent: 25 });
      return { success: true, message: 'Special Harvest festival code applied! 25% discount.' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try FRESH20 or KISAN10.' };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Compare operations
  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 products at a time.');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const clearCompare = () => setCompareList([]);

  // Orders operations
  const createOrder = (orderInfo: Partial<Order>): Order => {
    const newOrderNumber = `AGC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      deliveryAddress: orderInfo.deliveryAddress || customer.addresses[0],
      items: orderInfo.items || cart.map(i => ({ product: i.product, quantity: i.quantity, price: i.product.discountPrice ?? i.product.price })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      deliveryFee: 0,
      middlemanSavings: Math.round(cartSubtotal * 0.35),
      total: cartTotal,
      paymentMethod: orderInfo.paymentMethod || 'upi',
      paymentStatus: 'paid',
      status: 'pending',
      createdAt: 'Just now',
      estimatedDelivery: 'Within 4-6 hours today',
      farmerIds: Array.from(new Set(cart.map(c => c.product.farmerId))),
      deliveryAgent: {
        name: 'Sundeep Yadav',
        phone: '+91 97812 34109',
        vehicleNo: 'KA 05 MN 2210 (EV Van)',
      },
      statusTimeline: [
        {
          status: 'pending',
          timestamp: 'Just now',
          title: 'Order Placed',
          note: `Payment verified via ${orderInfo.paymentMethod?.toUpperCase() || 'UPI'}`,
          done: true,
        },
        {
          status: 'accepted',
          timestamp: 'Estimated in 10 mins',
          title: 'Farmer Confirmation',
          note: 'Farmer notification dispatched',
          done: false,
        },
        {
          status: 'packed',
          timestamp: 'Pending harvest packing',
          title: 'Harvesting & Bio-packing',
          note: 'Packaging with temperature control',
          done: false,
        },
        {
          status: 'shipped',
          timestamp: 'Pending dispatch',
          title: 'Cold-chain Dispatch',
          note: 'Direct farm-to-door transit',
          done: false,
        },
        {
          status: 'delivered',
          timestamp: 'Expected today',
          title: 'Doorstep Handover',
          note: 'Zero-contact fresh handover',
          done: false,
        },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setCustomer(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + Math.floor(newOrder.total / 10),
    }));

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Order ${newOrder.orderNumber} Confirmed! 🎉`,
        message: `Thank you! Your payment of ₹${newOrder.total} is received. Direct harvest initiated.`,
        time: 'Just now',
        read: false,
        type: 'order',
      },
      ...prev,
    ]);

    setTrackingOrderId(newOrder.id);
    setIsOrderTrackingOpen(true);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const updatedTimeline = ord.statusTimeline.map(step => {
          if (step.status === newStatus) {
            return { ...step, done: true, timestamp: 'Updated just now' };
          }
          return step;
        });
        return {
          ...ord,
          status: newStatus,
          statusTimeline: updatedTimeline,
        };
      })
    );
  };

  const trackOrder = (orderId: string) => {
    setTrackingOrderId(orderId);
    setIsOrderTrackingOpen(true);
  };

  // Farmer product actions
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>): Product => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
    };
    setProducts(prev => [newProd, ...prev]);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Product Published Successfully 🌱',
        message: `${newProd.name} is now live and purchasable by customers!`,
        time: 'Just now',
        read: false,
        type: 'stock',
      },
      ...prev,
    ]);
    return newProd;
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const verifyFarmer = (farmerId: string, verified: boolean) => {
    setFarmers(prev =>
      prev.map(f =>
        f.id === farmerId
          ? {
              ...f,
              verified,
              verificationBadgeDate: verified ? 'Verified Today by AgriConnect Trust Council' : undefined,
            }
          : f
      )
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        language,
        setLanguage,
        t,
        isDarkMode,
        setIsDarkMode,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        products,
        farmers,
        orders,
        customer,
        cart,
        wishlist,
        compareList,
        notifications,
        isCartOpen,
        setIsCartOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCompareOpen,
        setIsCompareOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        trackingOrderId,
        setTrackingOrderId,
        isAuthModalOpen,
        setIsAuthModalOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartTotal,
        toggleWishlist,
        toggleCompare,
        clearCompare,
        createOrder,
        updateOrderStatus,
        trackOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        verifyFarmer,
        markNotificationRead,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
