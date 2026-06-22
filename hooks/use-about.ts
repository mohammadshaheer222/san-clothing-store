"use client";

import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/lib/api-client";
import { AboutContent } from "@/types";

export function useAbout() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchAboutContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<AboutContent>("/api/about");
      setAboutContent(data);
    } catch (err: any) {
      setError(err.message || "Failed to load About page content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutContent();
  }, [fetchAboutContent]);

  const saveAboutContent = useCallback(
    async (payload: Omit<AboutContent, "id">): Promise<AboutContent | null> => {
      setSaving(true);
      setError(null);
      setSuccessMsg("");
      try {
        const result = await apiFetch<AboutContent>("/api/about", {
          method: "POST",
          body: payload,
        });
        setAboutContent(result);
        setSuccessMsg("About page content saved successfully.");
        return result;
      } catch (err: any) {
        setError(err.message || "Failed to save About page content.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    []
  );

  const uploadAboutImage = useCallback(async (file: File): Promise<{ url: string; publicId: string } | null> => {
    setUploading(true);
    setError(null);
    setSuccessMsg("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiFetch<{ url: string; publicId: string }>("/api/about/upload", {
        method: "POST",
        body: formData,
      });
      return res;
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    aboutContent,
    loading,
    saving,
    uploading,
    error,
    successMsg,
    setError,
    setSuccessMsg,
    fetchAboutContent,
    saveAboutContent,
    uploadAboutImage,
  };
}
