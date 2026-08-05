-- Add new rich fields to products table for the redesigned PDP

ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS sold_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS variants JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS key_features JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS rich_content JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS whats_in_the_box TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '{}'::jsonb;
