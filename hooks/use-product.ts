"use client";

import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/lib/api-client";
import { Product } from "@/types";

export function useProduct(productId?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchProduct = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Product>(`/api/products/${id}`);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch product.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  const createProduct = useCallback(async (payload: any): Promise<Product | null> => {
    setSaving(true);
    setError(null);
    try {
      const data = await apiFetch<Product>("/api/products", {
        method: "POST",
        body: payload,
      });
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to create product.");
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, payload: any): Promise<Product | null> => {
    setSaving(true);
    setError(null);
    try {
      const data = await apiFetch<Product>(`/api/products/${id}`, {
        method: "PATCH",
        body: payload,
      });
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to update product.");
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setSaving(true);
    setError(null);
    try {
      await apiFetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to delete product.");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  const uploadImage = useCallback(async (file: File): Promise<{ url: string; publicId: string } | null> => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiFetch<{ url: string; publicId: string }>("/api/products/upload", {
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
    product,
    loading,
    error,
    saving,
    uploading,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    setError,
  };
}
