"use client";

import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/lib/api-client";
import { StripeConfig } from "@/types";

export function useStripes() {
  const [stripes, setStripes] = useState<StripeConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStripes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<StripeConfig[]>("/api/stripes?admin=true");
      setStripes(data);
    } catch (err: any) {
      setError(err.message || "Failed to load stripes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStripes();
  }, [fetchStripes]);

  const updateStripe = useCallback(
    async (payload: {
      key: "header" | "marquee";
      content: string[];
      isActive?: boolean;
    }): Promise<StripeConfig | null> => {
      setSaving(true);
      setError(null);
      try {
        const result = await apiFetch<StripeConfig>("/api/stripes", {
          method: "PUT",
          body: payload,
        });
        await fetchStripes();
        return result;
      } catch (err: any) {
        setError(err.message || "Failed to update stripe.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [fetchStripes]
  );

  return {
    stripes,
    loading,
    saving,
    error,
    setError,
    fetchStripes,
    updateStripe,
  };
}
