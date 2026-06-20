import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — SAN Clothing Store",
  description: "Admin dashboard for SAN Clothing Store",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Isolated layout — no store Navbar / Footer
  return <div className="min-h-screen">{children}</div>;
}
