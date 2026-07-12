-- ============================================================
-- CMS media storage (Supabase Storage)
-- Safe to run multiple times
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cms-media',
  'cms-media',
  true,
  10485760, -- 10 MB
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
    'image/svg+xml',
    'application/pdf'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public read
DROP POLICY IF EXISTS "Public read cms-media" ON storage.objects;
CREATE POLICY "Public read cms-media"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'cms-media');

-- Authenticated upload
DROP POLICY IF EXISTS "Auth upload cms-media" ON storage.objects;
CREATE POLICY "Auth upload cms-media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'cms-media');

-- Authenticated update
DROP POLICY IF EXISTS "Auth update cms-media" ON storage.objects;
CREATE POLICY "Auth update cms-media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'cms-media')
  WITH CHECK (bucket_id = 'cms-media');

-- Authenticated delete
DROP POLICY IF EXISTS "Auth delete cms-media" ON storage.objects;
CREATE POLICY "Auth delete cms-media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'cms-media');
