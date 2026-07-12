-- ============================================================
-- Sunsynchro CMS – Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────
-- Products
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT        NOT NULL,
  category    TEXT        NOT NULL DEFAULT 'Solar Panels',
  brand       TEXT        NOT NULL DEFAULT '',
  image       TEXT        DEFAULT '',
  description TEXT        DEFAULT '',
  specifications JSONB    DEFAULT '{}',
  price       TEXT        DEFAULT '',
  datasheet   TEXT        DEFAULT '',
  featured    BOOLEAN     DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────
-- Brands
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brands (
  id          UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT        NOT NULL,
  logo        TEXT        DEFAULT '',
  description TEXT        DEFAULT '',
  website     TEXT        DEFAULT '',
  category    TEXT        NOT NULL DEFAULT 'Solar Panels',
  featured    BOOLEAN     DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────
-- Blog Posts
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  title        TEXT        NOT NULL,
  slug         TEXT        UNIQUE NOT NULL,
  excerpt      TEXT        DEFAULT '',
  content      TEXT        DEFAULT '',
  image        TEXT        DEFAULT '',
  author       TEXT        DEFAULT 'Sunsynchro Team',
  publish_date TIMESTAMPTZ DEFAULT NOW(),
  read_time    TEXT        DEFAULT '5 min read',
  category     TEXT        DEFAULT 'General',
  tags         TEXT[]      DEFAULT ARRAY[]::TEXT[],
  featured     BOOLEAN     DEFAULT false,
  published    BOOLEAN     DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────
-- Row Level Security
-- ────────────────────────────────────────────────
ALTER TABLE products   ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands     ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read (anon can read published content)
CREATE POLICY "Public read products"
  ON products FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read brands"
  ON brands   FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public read published blogs"
  ON blog_posts FOR SELECT TO anon USING (published = true);

CREATE POLICY "Authenticated read all blogs"
  ON blog_posts FOR SELECT TO authenticated USING (true);

-- Authenticated write access
CREATE POLICY "Auth insert products"  ON products   FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update products"  ON products   FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete products"  ON products   FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert brands"    ON brands     FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update brands"    ON brands     FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete brands"    ON brands     FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert blogs"     ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update blogs"     ON blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete blogs"     ON blog_posts FOR DELETE TO authenticated USING (true);

-- ────────────────────────────────────────────────
-- Auto-update updated_at trigger
-- ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ────────────────────────────────────────────────
-- Data migration (exact content from src/data/*.ts)
-- ────────────────────────────────────────────────
-- Prefer the one-file setup:
--   supabase/setup-and-migrate.sql   (schema + seed)
-- Or seed only (tables must already exist):
--   supabase/migrate-seed.sql
-- Or regenerate from TypeScript sources:
--   npx tsx scripts/migrate-data.ts --sql-only
