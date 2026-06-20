"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flex, Typography } from "@/components/ui";
import { AdminButton } from "@/components/admin/ui/admin-button";

interface LogoutButtonProps {
  adminEmail: string;
}

export function LogoutButton({ adminEmail }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Flex align="center" gap={4}>
      <div className="text-right hidden sm:block">
        <Typography variant="caption" className="text-xs! text-slate-500 normal-case block tracking-normal">
          Signed in as
        </Typography>
        <Typography variant="p" className="text-sm! text-slate-300 font-medium block">
          {adminEmail}
        </Typography>
      </div>
      <AdminButton
        variant="ghost"
        fullWidth={false}
        loading={loading}
        onClick={handleLogout}
        className="px-4 py-2 text-xs"
      >
        {loading ? "Signing out…" : "Sign out"}
      </AdminButton>
    </Flex>
  );
}

