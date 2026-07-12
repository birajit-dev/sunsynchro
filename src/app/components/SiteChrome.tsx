"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LeadCaptureWrapper from "./LeadCaptureWrapper";

/**
 * Public marketing chrome. Skipped entirely on /admin/* so the CMS
 * is a separate app shell and does not inherit the website navbar/footer.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <LeadCaptureWrapper />
    </>
  );
}
