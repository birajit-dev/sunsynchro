import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Savings Calculator - Calculate Your Solar ROI | Sunsynchro",
  description: "Calculate your solar system savings, payback period, and CO₂ reduction with our free solar savings calculator. Estimate annual generation, savings, and 25-year cashflow for rooftop solar installations in Tripura.",
  keywords: [
    "solar calculator",
    "solar savings calculator",
    "solar ROI calculator",
    "solar payback calculator",
    "solar energy calculator",
    "solar system calculator",
    "solar cost calculator",
    "solar investment calculator"
  ],
  openGraph: {
    title: "Solar Savings Calculator - Calculate Your Solar ROI | Sunsynchro",
    description: "Calculate your solar system savings, payback period, and CO₂ reduction with our free solar savings calculator.",
    type: "website",
    url: "/calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Savings Calculator - Calculate Your Solar ROI",
    description: "Calculate your solar system savings, payback period, and CO₂ reduction.",
  },
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

