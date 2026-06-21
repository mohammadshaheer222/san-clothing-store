"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-client";

interface AdminUser {
  email: string;
  name: string;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await apiFetch<AdminUser>("/api/admin/login", {
        method: "POST",
        body: { email, password },
      });
      return true;
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await apiFetch("/api/admin/logout", {
        method: "POST",
      });
      return true;
    } catch (err: any) {
      setError(err.message || "Logout failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    logout,
    loading,
    error,
    setError,
  };
}
