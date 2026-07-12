export const metadata = {
  title: "Admin | Sunsynchro",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

import React from "react";
import AdminShell from "./_components/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
