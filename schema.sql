
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category JSONB NOT NULL DEFAULT '{"en": "", "ar": "", "ku": ""}'::jsonb,
  images TEXT[] NOT NULL,
  title JSONB NOT NULL DEFAULT '{"en": "", "ar": "", "ku": ""}'::jsonb,
  description JSONB NOT NULL DEFAULT '{"en": "", "ar": "", "ku": ""}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image TEXT NOT NULL,
  title JSONB NOT NULL DEFAULT '{"en": "", "ar": "", "ku": ""}'::jsonb,
  description JSONB NOT NULL DEFAULT '{"en": "", "ar": "", "ku": ""}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  message TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Admin Logs Table
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'success',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Site Settings Table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- Insert initial data
INSERT INTO settings (key, value) VALUES ('maintenance_mode', 'false'::jsonb) ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Admins manage portfolio" ON portfolio FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Admins manage services" ON services FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read social_links" ON social_links FOR SELECT USING (true);
CREATE POLICY "Admins manage social_links" ON social_links FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read leads" ON leads FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins manage logs" ON admin_logs FOR ALL USING (auth.role() = 'authenticated');
