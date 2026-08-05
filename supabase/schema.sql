-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- 1. PRODUCTS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  currency TEXT DEFAULT 'NGN',
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  rating NUMERIC DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  is_flash_sale BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  discount_badge TEXT,
  
  -- New Rich Fields for PDP Redesign
  gallery_images TEXT[] DEFAULT '{}',
  sold_count INTEGER DEFAULT 0,
  variants JSONB DEFAULT '[]'::jsonb,
  key_features JSONB DEFAULT '[]'::jsonb,
  rich_content JSONB DEFAULT '{}'::jsonb,
  whats_in_the_box TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Admins can insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND (auth.jwt()->>'email' IN ('olaykenterprise@gmail.com', 'itskingezekiel@gmail.com')));
CREATE POLICY "Admins can update products" ON products FOR UPDATE USING (auth.role() = 'authenticated' AND (auth.jwt()->>'email' IN ('olaykenterprise@gmail.com', 'itskingezekiel@gmail.com')));
CREATE POLICY "Admins can delete products" ON products FOR DELETE USING (auth.role() = 'authenticated' AND (auth.jwt()->>'email' IN ('olaykenterprise@gmail.com', 'itskingezekiel@gmail.com')));


-- --------------------------------------------------------
-- 2. LANDING PAGES TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS landing_pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subheading TEXT NOT NULL,
  body_list TEXT[] NOT NULL DEFAULT '{}',
  photos TEXT[] NOT NULL DEFAULT '{}',
  video_link TEXT,
  cta_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Landing pages are viewable by everyone" ON landing_pages FOR SELECT USING (true);
CREATE POLICY "Admins can insert landing pages" ON landing_pages FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND (auth.jwt()->>'email' IN ('olaykenterprise@gmail.com', 'itskingezekiel@gmail.com')));
CREATE POLICY "Admins can update landing pages" ON landing_pages FOR UPDATE USING (auth.role() = 'authenticated' AND (auth.jwt()->>'email' IN ('olaykenterprise@gmail.com', 'itskingezekiel@gmail.com')));
CREATE POLICY "Admins can delete landing pages" ON landing_pages FOR DELETE USING (auth.role() = 'authenticated' AND (auth.jwt()->>'email' IN ('olaykenterprise@gmail.com', 'itskingezekiel@gmail.com')));


-- --------------------------------------------------------
-- 3. INSERT MOCK DATA (Products)
-- --------------------------------------------------------
INSERT INTO products (id, name, slug, description, price, original_price, currency, image, category, rating, reviews, is_flash_sale, is_new_arrival, discount_badge)
VALUES
  ('d88825c9-94cd-4e92-af09-8d76db8d262b', '20000mAh Powerbank 22.5W Fast Charge', '20000mah-powerbank-22-5w', 'High capacity powerbank with fast charging capabilities.', 11900, 18000, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">20000mAh%20Powerbank</text></svg>', 'powerbanks', 4.8, 32, true, false, '-34%'),
  ('031bb942-0fbc-49cb-8ea0-3f40f09a56c0', '10000mAh Magnetic Powerbank (Wireless)', '10000mah-magnetic-powerbank', 'Wireless magnetic powerbank for MagSafe compatible devices.', 10800, 15000, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">Magnetic%20Powerbank</text></svg>', 'powerbanks', 4.5, 28, true, false, '-28%'),
  ('127a3a0e-4ab4-4f01-9a99-923f715876db', '60W Type-C to Type-C Fast Charging Cable', '60w-type-c-to-type-c-cable', 'Durable braided fast charging cable.', 3150, 4500, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">Fast%20Charging%20Cable</text></svg>', 'cables', 4.9, 45, true, false, '-30%'),
  ('2e3f89ad-9fbc-40d6-88cf-9a9a5f70bb0c', '10" LED Ring Light with Tripod Stand', '10-inch-led-ring-light', 'Perfect lighting for content creators.', 8990, 12000, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">LED%20Ring%20Light</text></svg>', 'content-creation', 4.6, 61, true, false, '-25%'),
  ('9b74d6c1-ffdb-4de9-af43-e66b4d32a909', 'Wireless Lavalier Microphone', 'wireless-lavalier-microphone', 'Crisp audio recording for mobile devices.', 6150, 9000, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">Lavalier%20Mic</text></svg>', 'content-creation', 4.7, 22, true, false, '-32%'),
  ('6bcbcfa8-8ff3-4b6d-a110-85f02f9c313a', '30000mAh Powerbank 65W Fast Charge', '30000mah-powerbank-65w', 'Massive capacity powerbank capable of charging laptops.', 18500, NULL, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">30000mAh%20Powerbank</text></svg>', 'powerbanks', 4.9, 14, false, true, NULL),
  ('1dc8bc45-eb10-41ff-be05-592b5bb1b2e5', '5000mAh Magnetic Powerbank', '5000mah-magnetic-powerbank', 'Slim and portable magnetic powerbank.', 8900, NULL, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">5000mAh%20Magnetic</text></svg>', 'powerbanks', 4.4, 9, false, true, NULL),
  ('58d4a77f-dc2a-43cf-b673-9a3d4fba7494', '3 in 1 Fast Charging Cable (Type-C, iPhone, Micro)', '3-in-1-fast-charging-cable', 'Universal charging cable for all your devices.', 2900, NULL, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">3-in-1%20Fast%20Cable</text></svg>', 'cables', 4.8, 11, false, true, NULL),
  ('33f009e8-466d-4be9-b4b1-20902c385db5', 'Adjustable Phone Desk Stand', 'adjustable-phone-desk-stand', 'Sturdy aluminum desk stand for smartphones.', 3800, NULL, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">Phone%20Desk%20Stand</text></svg>', 'phone-accessories', 4.5, 7, false, true, NULL),
  ('aa7d14d2-282e-4cf7-ae36-e04746f3dcc0', 'True Wireless Earbuds', 'true-wireless-earbuds', 'High quality audio with long battery life.', 7900, NULL, 'NGN', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">Wireless%20Earbuds</text></svg>', 'phone-accessories', 4.6, 16, false, true, NULL)
ON CONFLICT (slug) DO NOTHING;
