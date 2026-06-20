import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import AdminLoginPageContent from "./components/page-content";

export const metadata: Metadata = {
  title: "Admin Login — SAN Clothing Store",
};

export default async function AdminLoginPage() {
  // If already authenticated, skip the login page
  const session = await getSession();
  if (session) redirect("/admin/dashboard");

  return <AdminLoginPageContent />;
}
