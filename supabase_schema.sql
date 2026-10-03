-- AgriConnect AI: Production-Ready Supabase PostgreSQL Schema

-- 1. Farmers Table
CREATE TABLE IF NOT EXISTS public.farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    farm_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    district VARCHAR(100),
    state VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    acres NUMERIC(6, 2) DEFAULT 5.0,
    verified BOOLEAN DEFAULT FALSE,
    verification_badge_date VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    primary_crops TEXT[],
    rating NUMERIC(3, 2) DEFAULT 5.0,
    total_orders_fulfilled INT DEFAULT 0,
    revenue_earned NUMERIC(12, 2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    description TEXT,
    short_description VARCHAR(255),
    price NUMERIC(10, 2) NOT NULL,
    discount_price NUMERIC(10, 2),
    unit VARCHAR(32) DEFAULT 'kg',
    stock INT NOT NULL DEFAULT 50,
    is_organic BOOLEAN DEFAULT TRUE,
    organic_cert_number VARCHAR(128),
    images TEXT[] NOT NULL,
    farmer_id UUID REFERENCES public.farmers(id) ON DELETE CASCADE,
    harvest_date VARCHAR(128),
    expiry_estimate_days INT DEFAULT 7,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    nutritional_highlights TEXT[],
    tags TEXT[],
    mandi_price_benchmark NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(32),
    avatar_url TEXT,
    loyalty_points INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(64) UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id),
    subtotal NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2) DEFAULT 0,
    coupon_code VARCHAR(32),
    total NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(32) DEFAULT 'upi',
    payment_status VARCHAR(32) DEFAULT 'paid',
    status VARCHAR(32) DEFAULT 'pending',
    delivery_address JSONB NOT NULL,
    status_timeline JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(10, 2) NOT NULL
);

-- 6. Product Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_avatar TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    verified_purchase BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public products viewable" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public farmers viewable" ON public.farmers FOR SELECT USING (true);
