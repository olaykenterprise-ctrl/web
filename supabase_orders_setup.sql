-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address TEXT,
    amount NUMERIC NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    items_count INTEGER DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'Processing',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the checkout form)
CREATE POLICY "Allow anonymous order creation" ON public.orders
    FOR INSERT 
    TO public
    WITH CHECK (true);

-- Allow service role to read/update (for the admin dashboard)
CREATE POLICY "Allow service role full access" ON public.orders
    FOR ALL 
    TO service_role
    USING (true)
    WITH CHECK (true);
