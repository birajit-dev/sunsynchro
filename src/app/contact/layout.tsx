import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get Your Free Solar Quote | Sunsynchro",
  description: "Contact Sunsynchro for professional solar installation services, product inquiries, and expert consultation. Get your free solar quote today. Call +91-9742422340 or visit our office in Tripura.",
  keywords: [
    "contact sunsynchro",
    "solar quote",
    "solar consultation",
    "solar installation contact",
    "solar services Tripura"
  ],
  openGraph: {
    title: "Contact Us - Get Your Free Solar Quote",
    description: "Contact Sunsynchro for professional solar installation services and expert consultation.",
    type: "website",
    url: "/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact Sunsynchro - Get Your Free Solar Quote",
    description: "Get your free solar quote today.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

