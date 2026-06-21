"use client";

import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/lib/api-client";
import { Banner } from "@/types";

export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Banner[]>("/api/banners");
      setBanners(data);
    } catch (err: any) {
      setError(err.message || "Failed to load banners.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const saveBanner = useCallback(async (payload: any): Promise<boolean> => {
    setSaving(true);
    setError(null);
    setSuccessMsg("");
    try {
      await apiFetch("/api/banners", {
        method: "POST",
        body: payload,
      });
      setSuccessMsg("Configuration saved successfully!");
      await fetchBanners();
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to update configuration.");
      return false;
    } finally {
      setSaving(false);
    }
  }, [fetchBanners]);

  const uploadBannerImage = useCallback(async (file: File): Promise<{ url: string; publicId: string } | null> => {
    setUploading(true);
    setError(null);
    setSuccessMsg("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiFetch<{ url: string; publicId: string }>("/api/banners/upload", {
        method: "POST",
        body: formData,
      });
      return res;
    } catch (err: any) {
      setError(err.message || "Failed to upload banner image.");
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    banners,
    loading,
    saving,
    uploading,
    error,
    successMsg,
    fetchBanners,
    saveBanner,
    uploadBannerImage,
    setError,
    setSuccessMsg,
  };
}
