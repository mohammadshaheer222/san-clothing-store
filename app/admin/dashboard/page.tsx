import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import DashboardPageContent from "./components/page-content";

export const metadata: Metadata = {
  title: "Dashboard — SAN Admin",
};

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return <DashboardPageContent adminEmail={session.email} />;
}
