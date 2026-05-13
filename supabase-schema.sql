-- =============================================
-- SCHEMA DATABASE UNTUK WEBSITE KENANGAN
-- Jalankan SQL ini di Supabase SQL Editor
-- =============================================

-- 1. Tabel Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT '📁',
  color TEXT DEFAULT '#b8860b',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Memories
CREATE TABLE IF NOT EXISTS memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  date DATE NOT NULL,
  category TEXT,
  location_name TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
-- Semua orang bisa membaca, hanya authenticated user (admin) yang bisa insert/update/delete

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa SELECT
CREATE POLICY "Public can read memories" ON memories
  FOR SELECT USING (true);

CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

-- Policy: Hanya authenticated user (admin) yang bisa INSERT/UPDATE/DELETE
CREATE POLICY "Admin can insert memories" ON memories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update memories" ON memories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete memories" ON memories
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can insert categories" ON categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update categories" ON categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete categories" ON categories
  FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Storage Bucket untuk foto
-- Buat bucket "memories" di Supabase Storage Dashboard
-- Set policy: public read, authenticated write

-- 5. Contoh data kategori (gunakan nama icon Lucide)
INSERT INTO categories (name, icon, color) VALUES
  ('Masa Kecil', 'baby', '#ff6b6b'),
  ('Pendidikan', 'graduation-cap', '#4dadf7'),
  ('Perjalanan', 'plane', '#ffd43b'),
  ('Keluarga', 'users', '#51cf66'),
  ('Lain-lain', 'folder', '#b8860b')
ON CONFLICT (name) DO NOTHING;
