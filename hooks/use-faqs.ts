"use client";

import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/lib/api-client";
import { FAQItem } from "@/types";

interface UseFaqsOptions {
  admin?: boolean;
}

export function useFaqs(options: UseFaqsOptions = {}) {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = options.admin ? "/api/faqs?admin=true" : "/api/faqs";
      const data = await apiFetch<FAQItem[]>(url);
      setFaqs(data);
    } catch (err: any) {
      setError(err.message || "Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  }, [options.admin]);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const createFaq = useCallback(
    async (payload: {
      question: string;
      answer: string;
      order?: number;
      isActive?: boolean;
    }): Promise<FAQItem | null> => {
      setSaving(true);
      setError(null);
      try {
        const result = await apiFetch<FAQItem>("/api/faqs", {
          method: "POST",
          body: payload,
        });
        await fetchFaqs();
        return result;
      } catch (err: any) {
        setError(err.message || "Failed to create FAQ.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [fetchFaqs]
  );

  const updateFaq = useCallback(
    async (
      id: string,
      payload: { question?: string; answer?: string; order?: number; isActive?: boolean }
    ): Promise<FAQItem | null> => {
      setSaving(true);
      setError(null);
      try {
        const result = await apiFetch<FAQItem>(`/api/faqs/${id}`, {
          method: "PATCH",
          body: payload,
        });
        await fetchFaqs();
        return result;
      } catch (err: any) {
        setError(err.message || "Failed to update FAQ.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [fetchFaqs]
  );

  const deleteFaq = useCallback(
    async (id: string): Promise<boolean> => {
      setSaving(true);
      setError(null);
      try {
        await apiFetch(`/api/faqs/${id}`, {
          method: "DELETE",
        });
        await fetchFaqs();
        return true;
      } catch (err: any) {
        setError(err.message || "Failed to delete FAQ.");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [fetchFaqs]
  );

  return {
    faqs,
    loading,
    saving,
    error,
    setError,
    fetchFaqs,
    createFaq,
    updateFaq,
    deleteFaq,
  };
}
