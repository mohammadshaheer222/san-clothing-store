"use client";

import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/lib/api-client";
import { ValueItem } from "@/types";

interface UseValuesOptions {
  admin?: boolean;
}

export function useValues(options: UseValuesOptions = {}) {
  const [values, setValues] = useState<ValueItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchValues = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = options.admin ? "/api/values?admin=true" : "/api/values";
      const data = await apiFetch<ValueItem[]>(url);
      setValues(data);
    } catch (err: any) {
      setError(err.message || "Failed to load values.");
    } finally {
      setLoading(false);
    }
  }, [options.admin]);

  useEffect(() => {
    fetchValues();
  }, [fetchValues]);

  const createValue = useCallback(
    async (payload: {
      title: string;
      description: string;
      iconName: string;
      order?: number;
      isActive?: boolean;
    }): Promise<ValueItem | null> => {
      setSaving(true);
      setError(null);
      try {
        const result = await apiFetch<ValueItem>("/api/values", {
          method: "POST",
          body: payload,
        });
        await fetchValues();
        return result;
      } catch (err: any) {
        setError(err.message || "Failed to create value.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [fetchValues]
  );

  const updateValue = useCallback(
    async (
      id: string,
      payload: { title?: string; description?: string; iconName?: string; order?: number; isActive?: boolean }
    ): Promise<ValueItem | null> => {
      setSaving(true);
      setError(null);
      try {
        const result = await apiFetch<ValueItem>(`/api/values/${id}`, {
          method: "PATCH",
          body: payload,
        });
        await fetchValues();
        return result;
      } catch (err: any) {
        setError(err.message || "Failed to update value.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [fetchValues]
  );

  const deleteValue = useCallback(
    async (id: string): Promise<boolean> => {
      setSaving(true);
      setError(null);
      try {
        await apiFetch(`/api/values/${id}`, {
          method: "DELETE",
        });
        await fetchValues();
        return true;
      } catch (err: any) {
        setError(err.message || "Failed to delete value.");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [fetchValues]
  );

  return {
    values,
    loading,
    saving,
    error,
    setError,
    fetchValues,
    createValue,
    updateValue,
    deleteValue,
  };
}
