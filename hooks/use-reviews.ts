"use client";

import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/lib/api-client";
import { ReviewItem } from "@/types";

interface UseReviewsOptions {
  admin?: boolean;
}

export function useReviews(options: UseReviewsOptions = {}) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = options.admin ? "/api/reviews?admin=true" : "/api/reviews";
      const data = await apiFetch<ReviewItem[]>(url);
      setReviews(data);
    } catch (err) {
      const errorVal = err instanceof Error ? err : new Error(String(err));
      setError(errorVal.message || "Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  }, [options.admin]);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) {
        fetchReviews();
      }
    });
    return () => {
      active = false;
    };
  }, [fetchReviews]);

  const createReviewItem = useCallback(
    async (payload: {
      authorName: string;
      rating: number;
      content: string;
      order?: number;
      isActive?: boolean;
    }): Promise<ReviewItem | null> => {
      setSaving(true);
      setError(null);
      try {
        const result = await apiFetch<ReviewItem>("/api/reviews", {
          method: "POST",
          body: payload,
        });
        await fetchReviews();
        return result;
      } catch (err) {
        const errorVal = err instanceof Error ? err : new Error(String(err));
        setError(errorVal.message || "Failed to create review.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [fetchReviews]
  );

  const updateReviewItem = useCallback(
    async (
      id: string,
      payload: {
        authorName?: string;
        rating?: number;
        content?: string;
        order?: number;
        isActive?: boolean;
      }
    ): Promise<ReviewItem | null> => {
      setSaving(true);
      setError(null);
      try {
        const result = await apiFetch<ReviewItem>(`/api/reviews/${id}`, {
          method: "PATCH",
          body: payload,
        });
        await fetchReviews();
        return result;
      } catch (err) {
        const errorVal = err instanceof Error ? err : new Error(String(err));
        setError(errorVal.message || "Failed to update review.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [fetchReviews]
  );

  const deleteReviewItem = useCallback(
    async (id: string): Promise<boolean> => {
      setSaving(true);
      setError(null);
      try {
        await apiFetch(`/api/reviews/${id}`, {
          method: "DELETE",
        });
        await fetchReviews();
        return true;
      } catch (err) {
        const errorVal = err instanceof Error ? err : new Error(String(err));
        setError(errorVal.message || "Failed to delete review.");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [fetchReviews]
  );

  return {
    reviews,
    loading,
    saving,
    error,
    setError,
    fetchReviews,
    createReview: createReviewItem,
    updateReview: updateReviewItem,
    deleteReview: deleteReviewItem,
  };
}
