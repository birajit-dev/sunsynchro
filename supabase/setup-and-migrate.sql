-- ============================================================
-- Sunsynchro CMS – ONE-TIME SETUP + DATA MIGRATION
-- Run once in: Supabase Dashboard → SQL Editor → New query → Run
-- Migrates exact content from src/data/{products,brands,blogs}.ts
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

ALTER TABLE products   ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands     ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read products" ON products;
DROP POLICY IF EXISTS "Public read brands" ON brands;
DROP POLICY IF EXISTS "Public read published blogs" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated read all blogs" ON blog_posts;
DROP POLICY IF EXISTS "Auth insert products" ON products;
DROP POLICY IF EXISTS "Auth update products" ON products;
DROP POLICY IF EXISTS "Auth delete products" ON products;
DROP POLICY IF EXISTS "Auth insert brands" ON brands;
DROP POLICY IF EXISTS "Auth update brands" ON brands;
DROP POLICY IF EXISTS "Auth delete brands" ON brands;
DROP POLICY IF EXISTS "Auth insert blogs" ON blog_posts;
DROP POLICY IF EXISTS "Auth update blogs" ON blog_posts;
DROP POLICY IF EXISTS "Auth delete blogs" ON blog_posts;

CREATE POLICY "Public read products" ON products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read brands" ON brands FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read published blogs" ON blog_posts FOR SELECT TO anon USING (published = true);
CREATE POLICY "Authenticated read all blogs" ON blog_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth insert products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update products" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete products" ON products FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth insert brands" ON brands FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update brands" ON brands FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete brands" ON brands FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth insert blogs" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update blogs" ON blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete blogs" ON blog_posts FOR DELETE TO authenticated USING (true);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
DROP TRIGGER IF EXISTS brands_updated_at ON brands;
DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();



TRUNCATE TABLE products, brands, blog_posts RESTART IDENTITY CASCADE;

-- ── PRODUCTS ──────────────────────────────────────────
INSERT INTO products (name, category, brand, image, description, specifications, price, datasheet, featured) VALUES ('Solar Kit 3kW, 5kW', 'Solar Panels', 'Panasonic', '/products/panasonic_solar_kit.jpg', 'Complete solar power system featuring high-efficiency Panasonic HIT panels with integrated inverter and mounting hardware. Ideal for residential rooftop installations with superior performance in high-temperature conditions.', '{"System Power":"3kW / 5kW","Panel Technology":"HIT (Heterojunction)","Module Efficiency":"Up to 21.7%","Inverter Type":"String Inverter","Temperature Coefficient":"-0.26%/°C","Warranty":"25 years product, 25 years performance"}'::jsonb, '', '/datasheets/solar-kit-3kw.pdf', true);
INSERT INTO products (name, category, brand, image, description, specifications, price, datasheet, featured) VALUES ('Novasys Panel', 'Solar Panels', 'Novasys', '/products/novasys_panel.webp', 'High-efficiency monocrystalline solar panel with advanced PERC technology and half-cut cell design for enhanced performance and reduced hot-spot effects. Suitable for residential and commercial installations.', '{"Power Output":"540W - 550W","Efficiency":"21.0% - 21.5%","Cell Type":"Mono PERC Half-Cut","Dimensions":"2278 x 1133 x 35mm","Weight":"27.5 kg","Warranty":"12 years product, 25 years linear performance"}'::jsonb, '', '/datasheets/novasys-mono-perc-540.pdf', true);
INSERT INTO products (name, category, brand, image, description, specifications, price, datasheet, featured) VALUES ('Feston 3KW String Inverter', 'Solar Inverters', 'Feston', '/products/feston_inverter.webp', 'Compact single-phase string inverter with dual MPPT trackers for maximum energy yield. Features intelligent cooling system, wide input voltage range, and built-in DC switch for enhanced safety.', '{"Rated Power":"3kW","Max Efficiency":"97.6%","MPPT Trackers":"2","Input Voltage Range":"90-550V DC","Operating Temp":"-25°C to +60°C","Warranty":"5 years (extendable to 10 years)"}'::jsonb, '', '/datasheets/feston-fs-5000tl.pdf', false);
INSERT INTO products (name, category, brand, image, description, specifications, price, datasheet, featured) VALUES ('Feston Battery', 'Storage Systems', 'Feston', '/products/feston_battery.webp', 'Modular lithium iron phosphate (LiFePO4) battery system with intelligent BMS for safe and reliable energy storage. Stackable design allows capacity expansion up to 30kWh. IP65 rated for indoor and outdoor installation.', '{"Capacity":"5.12kWh (100Ah)","Nominal Voltage":"51.2V","Cycle Life":"6000+ cycles @ 80% DOD","Round-trip Efficiency":"95%","Dimensions":"483 x 170 x 240mm","Warranty":"10 years"}'::jsonb, '', '/datasheets/feston-lithium-battery-100ah.pdf', false);
INSERT INTO products (name, category, brand, image, description, specifications, price, datasheet, featured) VALUES ('Sunpower Inverter and Portable UPS System', 'Solar Inverters', 'Sunpower', '/products/sun_power.avif', 'All-in-one hybrid solar inverter with integrated MPPT charge controller, AC charger, and pure sine wave output. Supports grid-tie, off-grid, and backup modes with seamless switching. Built-in WiFi monitoring and mobile app control.', '{"Rated Power":"6kW","PV Input":"Up to 9kW","Battery Voltage":"48V DC","Max Efficiency":"97.5%","UPS Switching Time":"<10ms","Warranty":"5 years (extendable to 10 years)"}'::jsonb, '', '/datasheets/sunpower-sph6000.pdf', false);
INSERT INTO products (name, category, brand, image, description, specifications, price, datasheet, featured) VALUES ('Enphase Microinverter', 'Microinverters', 'Enphase', '/products/enphase.avif', 'Industry-leading IQ8 series microinverter with Sunlight Backup capability for grid-independent operation. Features advanced semiconductor technology, rapid shutdown compliance, and module-level monitoring through Enphase Enlighten platform.', '{"Max AC Power":"366W","Peak Efficiency":"97.5%","CEC Weighted Efficiency":"97.0%","Operating Temp":"-40°C to +65°C","Dimensions":"212 x 175 x 30mm","Warranty":"25 years"}'::jsonb, '', '/datasheets/enphase-iq8plus.pdf', true);

-- ── BRANDS ────────────────────────────────────────────
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('adani', '/brands/adani.png', 'Leading Indian solar panel manufacturer and renewable energy company.', 'https://www.adanisolar.com', 'Solar Panels', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('Sineng', '/brands/sineng.png', 'Global leader in battery technology and energy storage solutions.', 'https://byd.com', 'Energy Storage', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('enphase', '/brands/DEIFlogo.avif', 'Leading provider of microinverter-based solar and battery systems.', 'https://enphase.com', 'Inverters', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('fronius', '/brands/enphase.png', 'Austrian manufacturer of high-quality solar inverters and energy solutions.', 'https://fronius.com', 'Inverters', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('growatt', '/brands/feston.png', 'Innovative manufacturer of solar inverters and energy storage systems.', 'https://www.ginverter.com', 'Inverters', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('microtek', '/brands/nova.png', 'Leading provider of solar inverters, batteries, and UPS systems.', 'https://www.microtekdirect.com', 'Inverters', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('panasonic', '/brands/nunam.webp', 'Global leader in high-efficiency solar panels and energy solutions.', 'https://www.panasonic.com/global/energy/solar.html', 'Solar Panels', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('solaredge', '/brands/panasonic.jpg', 'Smart energy solutions for residential, commercial, and utility-scale solar.', 'https://solaredge.com', 'Inverters', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('tata power', '/brands/red.png', 'Pioneering solar solutions and EPC services in India.', 'https://www.tatapowersolar.com', 'Solar Panels', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('tesla', '/brands/sineng.png', 'Innovative solar roof and energy storage solutions for homes and businesses.', 'https://www.tesla.com/energy', 'Energy Storage', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('usha shriram', '/brands/sungrow_772.webp', 'Indian manufacturer of solar panels and energy products.', 'https://www.ushashriram.com', 'Solar Panels', true);
INSERT INTO brands (name, logo, description, website, category, featured) VALUES ('vikram solar', '/brands/SunPower-Logo.jpg', 'Leading Indian solar energy solutions provider and panel manufacturer.', 'https://www.vikramsolar.com', 'Solar Panels', true);

-- ── BLOG POSTS ────────────────────────────────────────
INSERT INTO blog_posts (title, slug, excerpt, content, image, author, publish_date, read_time, category, tags, featured, published) VALUES ('How Rooftop Solar Can Cut Your Electricity Bills by 80% in Tripura', 'rooftop-solar-cut-electricity-bills-tripura', 'Discover how households and businesses in Tripura can achieve massive savings on electricity bills through rooftop solar systems.', '
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">How Rooftop Solar Can Cut Your Electricity Bills by 80% in Tripura</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Electricity bills are rising every year, especially in Northeast India. Households and businesses in Tripura are searching for sustainable, long-term solutions to reduce costs. Rooftop solar systems have emerged as the most effective way to cut power bills while ensuring energy independence.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">How Rooftop Solar Works</h2>

        <p class="text-gray-700 leading-relaxed mb-6">Rooftop solar systems capture sunlight using photovoltaic (PV) panels and convert it into usable electricity. The power can be used instantly or exported to the grid under the net-metering policy, which credits excess generation against your consumption.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Massive Savings Potential</h2>

        <p class="text-gray-700 leading-relaxed mb-6">On average, a 5 kW solar rooftop system can generate around 600–700 units per month in Tripura''s climate. At a tariff of ₹8 per unit, this translates into savings of ₹4,800–₹5,600 per month—or nearly ₹60,000 per year. Over 25 years, households can save up to ₹15–20 lakhs.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Government Support Makes It Affordable</h2>

        <p class="text-gray-700 leading-relaxed mb-6">With government subsidies like the PM Surya Ghar Muft Bijli Yojana, the upfront cost of solar is reduced by 30–40%. Most households recover their investment in 3–5 years, after which electricity is practically free.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Environmental Benefits</h2>

        <p class="text-gray-700 leading-relaxed mb-6">Switching to solar also means reducing carbon emissions by up to 6 tons annually for a 5 kW system. This makes solar a win-win for both your pocket and the planet.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Take Action Today</h2>

        <p class="text-gray-700 leading-relaxed mb-6"><strong class="text-green-600">👉 Ready to save?</strong> Contact Sunsynchro Pvt. Ltd. to calculate your rooftop solar savings.</p>
      </div>
    ', '/blog/solar-1.webp', 'Sunsynchro Team', '2025-09-14'::timestamptz, '6 min read', 'Residential', ARRAY['Tripura', 'Rooftop Solar', 'Electricity Bills', 'Savings'], true, true);
INSERT INTO blog_posts (title, slug, excerpt, content, image, author, publish_date, read_time, category, tags, featured, published) VALUES ('Step-by-Step Guide to PM Surya Ghar Muft Bijli Yojana in Tripura', 'pm-surya-ghar-guide-tripura', 'Complete guide to applying for the PM Surya Ghar Muft Bijli Yojana subsidy scheme in Tripura with step-by-step instructions.', '
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Step-by-Step Guide to PM Surya Ghar Muft Bijli Yojana in Tripura</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">The Government of India launched the PM Surya Ghar Muft Bijli Yojana to accelerate the adoption of rooftop solar. Families in Tripura can now install solar systems at a reduced cost with subsidy support.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Eligibility:</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Indian households with grid connection</li>
          <li>Rooftop space available for installation</li>
          <li>Preference given to families with monthly electricity bills over ₹1,000</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Subsidy:</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>3 kW-10kW:</strong> ₹85,500 subsidy</li>
          <li><strong>Group Housing Society/Resident Welfare Association:</strong> ₹18,000 subsidy per kilowatt</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Application Process in Tripura:</h2>
        <ol class="list-decimal list-inside text-gray-700 mb-6 space-y-3">
          <li>Visit the National Portal for Rooftop Solar (solarrooftop.gov.in)</li>
          <li>Register with your electricity consumer number</li>
          <li>Select a vendor (Sunsynchro Pvt. Ltd. is a registered EPC provider)</li>
          <li>Submit documents and get feasibility approval from TSECL</li>
          <li>Install solar with vendor support</li>
          <li>Get system inspected and subsidy credited directly to your bank account</li>
        </ol>

        <p class="text-gray-700 leading-relaxed mb-6"><strong class="text-green-600">👉</strong> Sunsynchro helps customers with the complete process—from application to subsidy release.</p>
      </div>
    ', '/blog/solar-2.jpeg', 'Sunsynchro Team', '2025-09-14'::timestamptz, '8 min read', 'Policy', ARRAY['PM Surya Ghar', 'Subsidy', 'Tripura', 'Government Scheme'], true, true);
INSERT INTO blog_posts (title, slug, excerpt, content, image, author, publish_date, read_time, category, tags, featured, published) VALUES ('Panasonic vs. SunPower vs. Novasys: Which Solar Panel is Right for You?', 'panasonic-sunpower-novasys-solar-panel-comparison', 'Detailed comparison of Panasonic, SunPower, and Novasys solar panels to help you choose the best option for your needs.', '
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Panasonic vs. SunPower vs. Novasys: Which Solar Panel is Right for You?</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Choosing the right solar panel is crucial for efficiency and long-term returns. Here''s a detailed comparison to help you make an informed decision:</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Panasonic Solar Panels:</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Efficiency:</strong> Up to 21.6%</li>
          <li><strong>Strength:</strong> Robust HIT® technology, excellent in humid and high-temperature climates like Tripura</li>
          <li><strong>Warranty:</strong> 25 years</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">SunPower (Maxeon) Solar Panels:</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Efficiency:</strong> Up to 22.8%</li>
          <li><strong>Strength:</strong> Maximum energy yield and durability</li>
          <li><strong>Warranty:</strong> 40 years</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Novasys Solar Panels:</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Efficiency:</strong> 18–21%</li>
          <li><strong>Strength:</strong> Affordable, reliable, designed for Indian weather</li>
          <li><strong>Warranty:</strong> 25 years</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Which to Choose?</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Budget-conscious customers:</strong> Novasys</li>
          <li><strong>Long-term investors:</strong> SunPower</li>
          <li><strong>Balanced choice for Tripura''s climate:</strong> Panasonic</li>
        </ul>

        <p class="text-gray-700 leading-relaxed mb-6"><strong class="text-green-600">👉</strong> Sunsynchro supplies all three—helping you choose based on budget, space, and energy goals.</p>
      </div>
    ', '/blog/slolar-6.png', 'Sunsynchro Team', '2025-09-14'::timestamptz, '7 min read', 'Technology', ARRAY['Solar Panels', 'Panasonic', 'SunPower', 'Novasys', 'Comparison'], false, true);
INSERT INTO blog_posts (title, slug, excerpt, content, image, author, publish_date, read_time, category, tags, featured, published) VALUES ('Why Enphase Microinverters are a Game-Changer for Rooftop Solar Systems', 'enphase-microinverters-game-changer-rooftop-solar', 'Learn why Enphase microinverters offer superior performance, safety, and monitoring capabilities for rooftop solar installations.', '
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Why Enphase Microinverters are a Game-Changer for Rooftop Solar Systems</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Unlike traditional string inverters, microinverters are installed under each solar panel, converting DC to AC at the source. This revolutionary approach offers numerous advantages for solar installations.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Advantages of Enphase:</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Higher Efficiency:</strong> Each panel works independently, so shading on one panel doesn''t affect others</li>
          <li><strong>Safety:</strong> Low DC voltage reduces fire risks</li>
          <li><strong>Monitoring:</strong> Real-time performance tracking for each panel</li>
          <li><strong>Durability:</strong> 25-year warranty compared to 8–10 years for string inverters</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Tripura Homes Benefit:</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Given frequent partial shading (trees, buildings) in Tripura''s residential areas, Enphase microinverters ensure maximum power output even when some panels are shaded.</p>

        <p class="text-gray-700 leading-relaxed mb-6"><strong class="text-green-600">👉</strong> With Sunsynchro, you can upgrade to Enphase microinverters for smarter, safer solar systems.</p>
      </div>
    ', '/blog/solar-4.png', 'Sunsynchro Team', '2025-09-14'::timestamptz, '5 min read', 'Technology', ARRAY['Enphase', 'Microinverters', 'Solar Technology', 'Efficiency'], false, true);
INSERT INTO blog_posts (title, slug, excerpt, content, image, author, publish_date, read_time, category, tags, featured, published) VALUES ('Success Story: A Small Business in Agartala Saves ₹1.2 Lakhs Annually with Solar', 'agartala-business-saves-solar-success-story', 'Real success story of how a small business in Agartala reduced annual electricity costs by ₹1.2 lakhs with rooftop solar.', '
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Success Story: A Small Business in Agartala Saves ₹1.2 Lakhs Annually with Solar</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Rising electricity bills are a challenge for small businesses in Tripura. Here''s how one shop owner in Agartala slashed annual costs by going solar with Sunsynchro.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Challenge:</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Monthly power bills of ₹15,000–₹20,000 cut into profits. The owner needed a cost-effective, reliable solution to reduce operational expenses.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Solution:</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Sunsynchro installed a 15 kW rooftop solar system with Panasonic panels and Enphase microinverters, perfectly suited for the business''s energy requirements.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Results:</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Monthly savings:</strong> ₹10,000+</li>
          <li><strong>Annual savings:</strong> ₹1.2 lakhs</li>
          <li><strong>Payback:</strong> 4 years (with subsidy)</li>
          <li><strong>Carbon savings:</strong> ~18 tons annually</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Owner''s Testimonial:</h2>
        <blockquote class="border-l-4 border-green-500 pl-4 italic text-gray-700 mb-6">
          "Switching to solar with Sunsynchro was the best business decision. My profits are higher, and I''m proud to run a green business."
        </blockquote>
      </div>
    ', '/blog/solar-3.jpeg', 'Sunsynchro Team', '2025-09-14'::timestamptz, '4 min read', 'Case Studies', ARRAY['Success Story', 'Agartala', 'Commercial Solar', 'Small Business'], true, true);
INSERT INTO blog_posts (title, slug, excerpt, content, image, author, publish_date, read_time, category, tags, featured, published) VALUES ('5 Tips to Maintain Your Solar Panels During Monsoon in Tripura', 'solar-panel-maintenance-monsoon-tripura', 'Essential maintenance tips to keep your solar panels performing optimally during Tripura''s heavy monsoon season.', '
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">5 Tips to Maintain Your Solar Panels During Monsoon in Tripura</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Tripura''s heavy monsoon can reduce solar output if systems aren''t maintained properly. Here are 5 practical tips to ensure optimal performance during the rainy season:</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Regular Cleaning</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Remove dust, leaves, and bird droppings that can accumulate on panels and reduce efficiency. Clean panels can improve output by up to 15%.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Check Drainage</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Ensure rainwater doesn''t stagnate on panels. Proper drainage prevents water damage and maintains panel efficiency.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Inspect Wiring</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Moisture can damage cables and connections. Get professional checks to prevent electrical issues and ensure safety.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Trim Surrounding Trees</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Prevent shading and leaf accumulation by keeping vegetation around your solar installation well-maintained.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Professional AMC</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Annual Maintenance Contracts ensure performance during challenging weather conditions with regular professional inspections.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Conclusion:</h2>
        <p class="text-gray-700 leading-relaxed mb-6">A little care ensures your solar system continues to deliver maximum efficiency during the rainy season, protecting your investment and maximizing returns.</p>

        <p class="text-gray-700 leading-relaxed mb-6"><strong class="text-green-600">👉</strong> Sunsynchro offers comprehensive maintenance packages for worry-free performance year-round.</p>
      </div>
    ', '/blog/solar-5.jpg', 'Sunsynchro Team', '2025-09-14'::timestamptz, '6 min read', 'Maintenance', ARRAY['Maintenance', 'Monsoon', 'Tripura', 'Solar Panels'], false, true);

-- Done: 6 products, 12 brands, 6 blogs

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
