-- Create landing_pages table
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

-- Allow public read access to all landing pages
CREATE POLICY "Landing pages are viewable by everyone" ON landing_pages
  FOR SELECT USING (true);

-- Allow admins to insert/update/delete landing pages
CREATE POLICY "Admins can insert landing pages" ON landing_pages
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    (auth.jwt()->>'email' IN ('olaykenterprise@gmail.com', 'itskingezekiel@gmail.com'))
  );

CREATE POLICY "Admins can update landing pages" ON landing_pages
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    (auth.jwt()->>'email' IN ('olaykenterprise@gmail.com', 'itskingezekiel@gmail.com'))
  );

CREATE POLICY "Admins can delete landing pages" ON landing_pages
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    (auth.jwt()->>'email' IN ('olaykenterprise@gmail.com', 'itskingezekiel@gmail.com'))
  );
