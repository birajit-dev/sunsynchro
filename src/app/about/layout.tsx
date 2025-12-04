import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Leading Solar EPC & Distribution Services in Tripura | Sunsynchro",
  description: "Learn about Sunsynchro, a new-age solar EPC and distribution service provider committed to delivering rooftop solar installations and supplying premium solar components across Tripura, India.",
  keywords: [
    "about sunsynchro",
    "solar company Tripura",
    "solar EPC services",
    "solar distribution",
    "solar installation company",
    "renewable energy company India"
  ],
  openGraph: {
    title: "About Us - Leading Solar EPC & Distribution Services in Tripura",
    description: "Learn about Sunsynchro, a new-age solar EPC and distribution service provider.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary",
    title: "About Sunsynchro - Solar EPC & Distribution Services",
    description: "Learn about our commitment to delivering premium solar solutions.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

