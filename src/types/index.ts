export type UserRole = 'guest' | 'customer' | 'farmer' | 'admin';

export type Language = 'en' | 'hi' | 'ta' | 'te';

export type ProductCategory =
  | 'Fruits'
  | 'Vegetables'
  | 'Grains'
  | 'Pulses'
  | 'Dairy'
  | 'Flowers'
  | 'Herbs'
  | 'Organic'
  | 'Honey'
  | 'Dry Fruits'
  | 'Seeds'
  | 'Poultry';

export interface CategoryItem {
  id: string;
  name: ProductCategory;
  displayName: string;
  icon: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription?: string;
  price: number;
  unit: string; // 'kg', 'bunch', 'box', 'litre', 'dozen'
  discountPrice?: number;
  stock: number;
  isOrganic: boolean;
  organicCertNumber?: string;
  images: string[];
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  farmerRating: number;
  farmerAvatar?: string;
  farmerCoordinates?: { lat: number; lng: number };
  harvestDate: string;
  expiryEstimateDays?: number;
  rating: number;
  reviewsCount: number;
  nutritionalHighlights: string[];
  tags: string[];
  isFeatured?: boolean;
  isSeasonal?: boolean;
  mandiPriceBenchmark?: number; // Mandi comparison benchmark
}

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  email: string;
  farmName: string;
  location: string;
  district: string;
  state: string;
  coordinates: { lat: number; lng: number };
  acres: number;
  verified: boolean;
  verificationBadgeDate?: string;
  avatar: string;
  bio: string;
  primaryCrops: string[];
  rating: number;
  totalOrdersFulfilled: number;
  revenueEarned: number;
  joinedDate: string;
  qrVerificationUrl: string;
  certificationDocuments?: string[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
  loyaltyPoints: number;
  favoriteFarmerIds: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface TimelineEntry {
  status: OrderStatus;
  timestamp: string;
  title: string;
  note: string;
  done: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  middlemanSavings: number;
  total: number;
  paymentMethod: 'upi' | 'razorpay' | 'card' | 'cod';
  paymentStatus: 'paid' | 'pending';
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  statusTimeline: TimelineEntry[];
  farmerIds: string[];
  deliveryAgent?: {
    name: string;
    phone: string;
    vehicleNo: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface FarmBox {
  id: string;
  name: string;
  subtitle: string;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  price: number;
  originalPrice: number;
  description: string;
  includedItems: string[];
  image: string;
  subscriberCount: number;
  weightApprox: string;
  badge: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: 'farmer' | 'expert' | 'customer';
  authorAvatar: string;
  authorLocation: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  createdAt: string;
  imageUrl?: string;
}

export interface AiMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
  actionType?: 'recipe' | 'crop_advice' | 'order_help' | 'price_info';
}
