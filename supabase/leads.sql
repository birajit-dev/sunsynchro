-- ============================================================
-- Leads (contact form + lead capture modal)
-- ============================================================

CREATE TABLE IF NOT EXISTS leads (
  id           UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  name         TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  phone        TEXT        DEFAULT '',
  service      TEXT        DEFAULT '',
  message      TEXT        DEFAULT '',
  source       TEXT        DEFAULT 'website',
  status       TEXT        NOT NULL DEFAULT 'new'
                           CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'spam')),
  notes        TEXT        DEFAULT '',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert leads" ON leads;
DROP POLICY IF EXISTS "Auth read leads" ON leads;
DROP POLICY IF EXISTS "Auth update leads" ON leads;
DROP POLICY IF EXISTS "Auth delete leads" ON leads;

-- Table privileges (required when created via direct Postgres)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON TABLE leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON TABLE leads TO authenticated;

-- Anyone can submit a lead (website forms)
CREATE POLICY "Public insert leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only logged-in admins can view/manage
CREATE POLICY "Auth read leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Auth update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Auth delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (true);

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
