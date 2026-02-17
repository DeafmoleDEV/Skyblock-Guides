-- ==========================================================
-- UPDATE CREATORS (TikTok, Forums, Avatar)
-- ==========================================================
ALTER TABLE creators 
ADD COLUMN IF NOT EXISTS tiktok_username TEXT,
ADD COLUMN IF NOT EXISTS forums_url TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

COMMENT ON COLUMN creators.tiktok_username IS 'TikTok username (without @)';
COMMENT ON COLUMN creators.forums_url IS 'Full URL to the creator''s Hypixel Forums profile';
COMMENT ON COLUMN creators.avatar_url IS 'URL to the creator''s profile picture';

-- ==========================================================
-- NEW CATEGORIES TABLE (Filter Buttons)
-- ==========================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public Read Policy
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'categories' AND policyname = 'Allow public read'
  ) THEN
    CREATE POLICY "Allow public read" ON categories FOR SELECT USING (true);
  END IF;
END $$;

-- Initial Data
INSERT INTO categories (name, order_index) 
VALUES ('Dungeons', 1), ('Slayers', 2), ('Mining', 3)
ON CONFLICT (name) DO NOTHING;
