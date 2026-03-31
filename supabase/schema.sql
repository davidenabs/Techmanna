-- Create tables for portfolio data

-- Experience table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  image_url TEXT,
  color TEXT,
  type TEXT CHECK (type IN ('work', 'education')) NOT NULL DEFAULT 'work',
  "order" INTEGER DEFAULT 0
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  year TEXT,
  description TEXT,
  cover_image_url TEXT,
  gallery_image_urls TEXT[],
  image_url TEXT,
  tags TEXT[], -- Array of strings for tags
  links JSONB DEFAULT '[]'::jsonb, -- JSON for dynamic links like [{type: 'github', url: '...'}, ...]
  "order" INTEGER DEFAULT 0
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL UNIQUE,
  category TEXT, -- e.g., 'Languages', 'Frontend', 'Backend'
  "order" INTEGER DEFAULT 0
);

-- Writing/Blog table
CREATE TABLE IF NOT EXISTS writing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  published_at DATE DEFAULT CURRENT_DATE,
  description TEXT,
  content TEXT, -- Legacy content
  content_html TEXT,
  content_json JSONB,
  slug TEXT UNIQUE,
  featured_image_url TEXT,
  image_url TEXT,
  "order" INTEGER DEFAULT 0
);

-- Hackathons table
CREATE TABLE IF NOT EXISTS hackathons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT,
  description TEXT,
  link_text TEXT,
  link_url TEXT,
  "order" INTEGER DEFAULT 0
);

-- Enable Row Level Security (RLS)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read writing" ON writing FOR SELECT USING (true);
CREATE POLICY "Public read hackathons" ON hackathons FOR SELECT USING (true);

-- Create policies for authenticated admin access (all operations)
CREATE POLICY "Admin CRUD experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin CRUD projects" ON projects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin CRUD skills" ON skills FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin CRUD writing" ON writing FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin CRUD hackathons" ON hackathons FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Storage bucket (run in Supabase SQL editor)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read media" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Admin insert media" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update media" ON storage.objects
FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete media" ON storage.objects
FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
