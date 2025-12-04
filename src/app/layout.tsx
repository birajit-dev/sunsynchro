import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LeadCaptureWrapper from "./components/LeadCaptureWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sunsynchro.com'),
  title: {
    default: "Solar in Tripura | Best Solar Company Tripura | Sunsynchro",
    template: "%s | Sunsynchro"
  },
  description: "Top solar company in Tripura offering solar panels, installation, and EPC services. Expert solar solutions for homes and businesses in Tripura. Get free solar quote today!",
  keywords: [
    "solar in Tripura",
    "Tripura solar",
    "Tripura solar company",
    "solar company Tripura",
    "solar panels Tripura",
    "solar installation Tripura",
    "solar distribution Tripura",
    "EPC services Tripura",
    "rooftop solar Tripura",
    "solar energy Tripura",
    "solar power Tripura",
    "solar solutions Tripura",
    "best solar company Tripura",
    "solar installer Tripura",
    "solar panels",
    "solar installation",
    "solar distribution",
    "EPC services",
    "renewable energy",
    "solar components",
    "solar inverter",
    "solar battery",
    "solar energy India"
  ],
  authors: [{ name: "Sunsynchro" }],
  creator: "Sunsynchro",
  publisher: "Sunsynchro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Sunsynchro",
    title: "Sunsynchro - Top Solar Company in Tripura | Solar Panels & Installation",
    description: "Best solar company in Tripura offering solar panels, installation, and EPC services. Expert solar solutions for homes and businesses. Get free quote!",
    images: [
      {
        url: "/hero/slider1.jpg",
        width: 1200,
        height: 630,
        alt: "Sunsynchro - Best Solar Company in Tripura | Solar Installation Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunsynchro - Leading Solar Distribution & Installation Services in Tripura",
    description: "Professional solar distribution and EPC services. Leading provider of solar panels, inverters, and complete solar solutions.",
    images: ["/hero/slider1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  manifest: '/favicon_io/site.webmanifest',
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "@id": "https://sunsynchro.com/#organization",
    name: "Sunsynchro Pvt. Ltd.",
    alternateName: "Sunsynchro",
    url: "https://sunsynchro.com",
    logo: "https://sunsynchro.com/favicon_io/android-chrome-512x512.png",
    image: "https://sunsynchro.com/hero/slider1.jpg",
    description: "Leading solar company in Tripura offering solar panels, installation, EPC services, and solar distribution. Expert rooftop solar solutions for homes and businesses in Tripura, India.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "66, Ward No. 12, Ramnagar",
      addressLocality: "Agartala",
      addressRegion: "Tripura",
      postalCode: "799002",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.8315",
      longitude: "91.2868"
    },
    areaServed: {
      "@type": "State",
      name: "Tripura"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9742422340",
        contactType: "Customer Service",
        areaServed: "IN",
        availableLanguage: ["English", "Bengali", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-9611548340",
        contactType: "Sales",
        areaServed: "IN",
        availableLanguage: ["English", "Bengali", "Hindi"]
      }
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      opens: "09:00",
      closes: "19:00"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar Products and Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Solar Panel Installation",
            description: "Professional rooftop solar panel installation in Tripura"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Solar EPC Services",
            description: "End-to-end solar EPC services in Tripura"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Solar Panels",
            description: "Premium solar panels for residential and commercial use in Tripura"
          }
        }
      ]
    },
    sameAs: [
      "https://sunsynchro.com"
    ],
    keywords: "solar in Tripura, Tripura solar, Tripura solar company, solar installation Tripura, solar panels Tripura, rooftop solar Tripura"
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is the best solar company in Tripura?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sunsynchro is one of the leading solar companies in Tripura, offering professional solar panel installation, EPC services, and solar distribution. We serve homes and businesses across Tripura with expert solar solutions."
                  }
                },
                {
                  "@type": "Question",
                  name: "How much does solar installation cost in Tripura?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Solar installation costs in Tripura typically range from ₹70,000 to ₹90,000 per kW. With government subsidies like PM Surya Ghar Muft Bijli Yojana, you can get up to ₹85,500 subsidy for 3-10kW systems. Contact Sunsynchro for a free quote tailored to your needs."
                  }
                },
                {
                  "@type": "Question",
                  name: "Where can I buy solar panels in Tripura?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sunsynchro Pvt. Ltd. is a trusted solar panel distributor in Tripura, located at 66, Ward No. 12, Ramnagar, Agartala. We offer premium solar panels from leading manufacturers. Call +91-9742422340 or visit our office for solar panel purchases and installation services."
                  }
                },
                {
                  "@type": "Question",
                  name: "Do you provide solar installation services in Agartala?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Sunsynchro provides professional solar installation services in Agartala and throughout Tripura. We offer complete EPC services including site survey, design, installation, and maintenance for residential and commercial rooftop solar systems."
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <LeadCaptureWrapper />
      </body>
    </html>
  );
}
