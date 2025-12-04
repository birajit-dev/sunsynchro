import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Industry News & Insights | Sunsynchro Blog",
  description: "Stay informed with the latest solar industry news, trends, technologies, and insights. Expert articles on solar installation, renewable energy, and sustainability.",
  keywords: [
    "solar blog",
    "solar news",
    "solar industry insights",
    "renewable energy blog",
    "solar technology",
    "solar trends"
  ],
  openGraph: {
    title: "Solar Industry News & Insights | Sunsynchro Blog",
    description: "Stay informed with the latest solar industry news, trends, and technologies.",
    type: "website",
    url: "/blogs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Industry News & Insights",
    description: "Latest solar industry news and expert insights.",
  },
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

