"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";
import { Product } from "@/types";

export interface UseProductsOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isBestSeller?: boolean;
  isBuiltForJourney?: boolean;
}

export function useProducts(initialOptions: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  });

  const [options, setOptions] = useState<UseProductsOptions>(initialOptions);

  const fetchProducts = useCallback(async (currentOptions: UseProductsOptions) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (currentOptions.page !== undefined) queryParams.append("page", currentOptions.page.toString());
      if (currentOptions.limit !== undefined) queryParams.append("limit", currentOptions.limit.toString());
      if (currentOptions.category && currentOptions.category !== "All") {
        queryParams.append("category", currentOptions.category);
      }
      if (currentOptions.search !== undefined) queryParams.append("search", currentOptions.search);
      if (currentOptions.isBestSeller !== undefined) {
        queryParams.append("isBestSeller", currentOptions.isBestSeller.toString());
      }
      if (currentOptions.isBuiltForJourney !== undefined) {
        queryParams.append("isBuiltForJourney", currentOptions.isBuiltForJourney.toString());
      }

      const res = await apiFetch<{
        products: Product[];
        pagination: { page: number; limit: number; total: number; totalPages: number };
      }>(`/api/products?${queryParams.toString()}`);

      setProducts(res.products);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch when options change
  useEffect(() => {
    fetchProducts(options);
  }, [options, fetchProducts]);

  const updateOptions = useCallback((newOptions: Partial<UseProductsOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  }, []);

  const refetch = useCallback(() => {
    fetchProducts(options);
  }, [options, fetchProducts]);

  return {
    products,
    loading,
    error,
    pagination,
    options,
    updateOptions,
    refetch,
  };
}
