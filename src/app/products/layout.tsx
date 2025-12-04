import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Products - Premium Solar Panels, Inverters & Components | Sunsynchro",
  description: "Browse our comprehensive range of premium solar products including solar panels, inverters, batteries, and mounting systems from world-class manufacturers. Find the perfect solar solution for your needs.",
  keywords: [
    "solar products",
    "solar panels",
    "solar inverters",
    "solar batteries",
    "solar mounting systems",
    "solar components",
    "solar equipment",
    "renewable energy products"
  ],
  openGraph: {
    title: "Solar Products - Premium Solar Panels, Inverters & Components",
    description: "Browse our comprehensive range of premium solar products from world-class manufacturers.",
    type: "website",
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Products - Premium Solar Components",
    description: "Browse our comprehensive range of premium solar products.",
  },
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

