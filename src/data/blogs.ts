export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How Rooftop Solar Can Cut Your Electricity Bills by 80% in Tripura",
    slug: "rooftop-solar-cut-electricity-bills-tripura",
    excerpt: "Discover how households and businesses in Tripura can achieve massive savings on electricity bills through rooftop solar systems.",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">How Rooftop Solar Can Cut Your Electricity Bills by 80% in Tripura</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Electricity bills are rising every year, especially in Northeast India. Households and businesses in Tripura are searching for sustainable, long-term solutions to reduce costs. Rooftop solar systems have emerged as the most effective way to cut power bills while ensuring energy independence.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">How Rooftop Solar Works</h2>

        <p class="text-gray-700 leading-relaxed mb-6">Rooftop solar systems capture sunlight using photovoltaic (PV) panels and convert it into usable electricity. The power can be used instantly or exported to the grid under the net-metering policy, which credits excess generation against your consumption.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Massive Savings Potential</h2>

        <p class="text-gray-700 leading-relaxed mb-6">On average, a 5 kW solar rooftop system can generate around 600–700 units per month in Tripura's climate. At a tariff of ₹8 per unit, this translates into savings of ₹4,800–₹5,600 per month—or nearly ₹60,000 per year. Over 25 years, households can save up to ₹15–20 lakhs.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Government Support Makes It Affordable</h2>

        <p class="text-gray-700 leading-relaxed mb-6">With government subsidies like the PM Surya Ghar Muft Bijli Yojana, the upfront cost of solar is reduced by 30–40%. Most households recover their investment in 3–5 years, after which electricity is practically free.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Environmental Benefits</h2>

        <p class="text-gray-700 leading-relaxed mb-6">Switching to solar also means reducing carbon emissions by up to 6 tons annually for a 5 kW system. This makes solar a win-win for both your pocket and the planet.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Take Action Today</h2>

        <p class="text-gray-700 leading-relaxed mb-6"><strong class="text-green-600">👉 Ready to save?</strong> Contact Sunsynchro Pvt. Ltd. to calculate your rooftop solar savings.</p>
      </div>
    `,
    image: "/blog/solar-1.webp",
    author: "Sunsynchro Team",
    publishDate: "2025-09-14",
    readTime: "6 min read",
    category: "Residential",
    tags: ["Tripura", "Rooftop Solar", "Electricity Bills", "Savings"],
    featured: true
  },
  {
    id: "2",
    title: "Step-by-Step Guide to PM Surya Ghar Muft Bijli Yojana in Tripura",
    slug: "pm-surya-ghar-guide-tripura",
    excerpt: "Complete guide to applying for the PM Surya Ghar Muft Bijli Yojana subsidy scheme in Tripura with step-by-step instructions.",
    content: `
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
    `,
    image: "/blog/solar-2.jpeg",
    author: "Sunsynchro Team",
    publishDate: "2025-09-14",
    readTime: "8 min read",
    category: "Policy",
    tags: ["PM Surya Ghar", "Subsidy", "Tripura", "Government Scheme"],
    featured: true
  },
  {
    id: "3",
    title: "Panasonic vs. SunPower vs. Novasys: Which Solar Panel is Right for You?",
    slug: "panasonic-sunpower-novasys-solar-panel-comparison",
    excerpt: "Detailed comparison of Panasonic, SunPower, and Novasys solar panels to help you choose the best option for your needs.",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Panasonic vs. SunPower vs. Novasys: Which Solar Panel is Right for You?</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Choosing the right solar panel is crucial for efficiency and long-term returns. Here's a detailed comparison to help you make an informed decision:</p>

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
          <li><strong>Balanced choice for Tripura's climate:</strong> Panasonic</li>
        </ul>

        <p class="text-gray-700 leading-relaxed mb-6"><strong class="text-green-600">👉</strong> Sunsynchro supplies all three—helping you choose based on budget, space, and energy goals.</p>
      </div>
    `,
    image: "/blog/slolar-6.png",
    author: "Sunsynchro Team",
    publishDate: "2025-09-14",
    readTime: "7 min read",
    category: "Technology",
    tags: ["Solar Panels", "Panasonic", "SunPower", "Novasys", "Comparison"],
    featured: false
  },
  {
    id: "4",
    title: "Why Enphase Microinverters are a Game-Changer for Rooftop Solar Systems",
    slug: "enphase-microinverters-game-changer-rooftop-solar",
    excerpt: "Learn why Enphase microinverters offer superior performance, safety, and monitoring capabilities for rooftop solar installations.",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Why Enphase Microinverters are a Game-Changer for Rooftop Solar Systems</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Unlike traditional string inverters, microinverters are installed under each solar panel, converting DC to AC at the source. This revolutionary approach offers numerous advantages for solar installations.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Advantages of Enphase:</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Higher Efficiency:</strong> Each panel works independently, so shading on one panel doesn't affect others</li>
          <li><strong>Safety:</strong> Low DC voltage reduces fire risks</li>
          <li><strong>Monitoring:</strong> Real-time performance tracking for each panel</li>
          <li><strong>Durability:</strong> 25-year warranty compared to 8–10 years for string inverters</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Tripura Homes Benefit:</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Given frequent partial shading (trees, buildings) in Tripura's residential areas, Enphase microinverters ensure maximum power output even when some panels are shaded.</p>

        <p class="text-gray-700 leading-relaxed mb-6"><strong class="text-green-600">👉</strong> With Sunsynchro, you can upgrade to Enphase microinverters for smarter, safer solar systems.</p>
      </div>
    `,
    image: "/blog/solar-4.png",
    author: "Sunsynchro Team",
    publishDate: "2025-09-14",
    readTime: "5 min read",
    category: "Technology",
    tags: ["Enphase", "Microinverters", "Solar Technology", "Efficiency"],
    featured: false
  },
  {
    id: "5",
    title: "Success Story: A Small Business in Agartala Saves ₹1.2 Lakhs Annually with Solar",
    slug: "agartala-business-saves-solar-success-story",
    excerpt: "Real success story of how a small business in Agartala reduced annual electricity costs by ₹1.2 lakhs with rooftop solar.",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Success Story: A Small Business in Agartala Saves ₹1.2 Lakhs Annually with Solar</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Rising electricity bills are a challenge for small businesses in Tripura. Here's how one shop owner in Agartala slashed annual costs by going solar with Sunsynchro.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Challenge:</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Monthly power bills of ₹15,000–₹20,000 cut into profits. The owner needed a cost-effective, reliable solution to reduce operational expenses.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Solution:</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Sunsynchro installed a 15 kW rooftop solar system with Panasonic panels and Enphase microinverters, perfectly suited for the business's energy requirements.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Results:</h2>
        <ul class="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Monthly savings:</strong> ₹10,000+</li>
          <li><strong>Annual savings:</strong> ₹1.2 lakhs</li>
          <li><strong>Payback:</strong> 4 years (with subsidy)</li>
          <li><strong>Carbon savings:</strong> ~18 tons annually</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">Owner's Testimonial:</h2>
        <blockquote class="border-l-4 border-green-500 pl-4 italic text-gray-700 mb-6">
          "Switching to solar with Sunsynchro was the best business decision. My profits are higher, and I'm proud to run a green business."
        </blockquote>
      </div>
    `,
    image: "/blog/solar-3.jpeg",
    author: "Sunsynchro Team",
    publishDate: "2025-09-14",
    readTime: "4 min read",
    category: "Case Studies",
    tags: ["Success Story", "Agartala", "Commercial Solar", "Small Business"],
    featured: true
  },
  {
    id: "6",
    title: "5 Tips to Maintain Your Solar Panels During Monsoon in Tripura",
    slug: "solar-panel-maintenance-monsoon-tripura",
    excerpt: "Essential maintenance tips to keep your solar panels performing optimally during Tripura's heavy monsoon season.",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">5 Tips to Maintain Your Solar Panels During Monsoon in Tripura</h1>

        <p class="text-lg text-gray-700 leading-relaxed mb-6">Tripura's heavy monsoon can reduce solar output if systems aren't maintained properly. Here are 5 practical tips to ensure optimal performance during the rainy season:</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Regular Cleaning</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Remove dust, leaves, and bird droppings that can accumulate on panels and reduce efficiency. Clean panels can improve output by up to 15%.</p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Check Drainage</h2>
        <p class="text-gray-700 leading-relaxed mb-6">Ensure rainwater doesn't stagnate on panels. Proper drainage prevents water damage and maintains panel efficiency.</p>

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
    `,
    image: "/blog/solar-5.jpg",
    author: "Sunsynchro Team",
    publishDate: "2025-09-14",
    readTime: "6 min read",
    category: "Maintenance",
    tags: ["Maintenance", "Monsoon", "Tripura", "Solar Panels"],
    featured: false
  }
];

export const blogCategories = [
  "All",
  "Technology",
  "Commercial", 
  "Residential",
  "Maintenance",
  "Finance",
  "Policy",
  "Case Studies"
];
