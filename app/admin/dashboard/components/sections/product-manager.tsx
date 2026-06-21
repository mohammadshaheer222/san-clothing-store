"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography, Flex } from "@/components/ui";
import { Product } from "@/types";
import { useProducts, useProduct } from "@/hooks";
import { ProductForm } from "./product-form";

export function ProductManager() {
  // Form / Action states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Pagination and search states
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    products,
    loading,
    error,
    pagination,
    updateOptions,
    refetch: fetchProducts,
  } = useProducts({
    page,
    limit: 8,
    search: debouncedSearch || undefined,
  });

  const { deleteProduct, saving: deleteLoading } = useProduct();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page to 1 on new search
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  // Keep hook filters in sync when page or debouncedSearch changes
  useEffect(() => {
    updateOptions({
      page,
      search: debouncedSearch || undefined,
    });
  }, [page, debouncedSearch, updateOptions]);

  const totalPages = pagination.totalPages;
  const totalProducts = pagination.total;

  // Handle product deletion
  const handleDelete = async () => {
    if (!deletingProduct) return;
    const success = await deleteProduct(deletingProduct.id);
    if (success) {
      setDeletingProduct(null);
      fetchProducts();
    } else {
      alert("Failed to delete product.");
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCreateClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="flex flex-col h-full w-full gap-6">
      {/* Top Action Bar */}
      <Flex justify="between" align="center" className="flex-wrap gap-4 bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs">
        <div className="relative max-w-sm flex-1 min-w-[240px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 focus:outline-none focus:border-primary text-xs text-neutral-800 transition-colors bg-neutral-50/50"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        <Button variant="primary" size="md" onClick={handleCreateClick} className="gap-2 text-xs! font-bold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </Button>
      </Flex>

      {/* Main Inventory Table */}
      <div className="flex-1 bg-white border border-neutral-100 rounded-2xl shadow-xs overflow-hidden flex flex-col min-h-[400px]">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-neutral-400">
            <div className="w-10 h-10 border-4 border-neutral-100 border-t-primary rounded-full animate-spin mb-3" />
            <Typography variant="p" className="text-sm!">Loading inventory...</Typography>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-red-500">
            <svg className="w-12 h-12 mb-3 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <Typography variant="h3" className="text-lg! font-bold mb-1">Error Loading Products</Typography>
            <Typography variant="p" className="text-xs! max-w-md mb-4">{error}</Typography>
            <Button variant="outline" size="sm" onClick={fetchProducts}>Retry</Button>
          </div>
        ) : products.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 p-8 text-center text-neutral-400">
            <svg className="w-12 h-12 mb-3 text-neutral-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <Typography variant="h3" className="text-lg! font-semibold text-neutral-600 mb-1">No products found</Typography>
            <Typography variant="p" className="text-xs! max-w-sm mb-4">
              {debouncedSearch ? "Try adjusting your search keywords." : "Start by adding your first product to the store."}
            </Typography>
            {!debouncedSearch && (
              <Button variant="primary" size="sm" onClick={handleCreateClick}>Create Product</Button>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-x-auto flex flex-col">
            <table className="w-full text-left border-collapse text-xs text-neutral-600">
              <thead>
                <tr className="bg-neutral-50/70 border-b border-neutral-100 text-neutral-500 font-semibold select-none">
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Product Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-right">Compare Price</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-50/30 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-neutral-150 flex-shrink-0 bg-neutral-50">
                        <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-3.5 max-w-[280px]">
                      <div className="truncate font-semibold text-neutral-800 text-sm">{prod.title}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-neutral-500 font-medium">{prod.category || "Uncategorized"}</span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-bold text-neutral-800 text-sm">
                      ₹{(prod.price / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-3.5 text-right text-neutral-400 font-medium">
                      {prod.oldPrice ? `₹${(prod.oldPrice / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
                    </td>
                    <td className="px-6 py-3.5">
                      <Flex align="center" justify="center" gap={3}>
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="p-2 rounded-lg text-neutral-500 hover:text-primary hover:bg-primary/5 transition-all"
                          title="Edit Product"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeletingProduct(prod)}
                          className="p-2 rounded-lg text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-all"
                          title="Delete Product"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && !loading && (
          <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between flex-shrink-0 bg-neutral-50/50">
            <Typography variant="p" className="text-xs! text-neutral-500 font-medium">
              Showing {(page - 1) * 8 + 1} to {Math.min(page * 8, totalProducts)} of {totalProducts} products
            </Typography>
            <Flex gap={2}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="border-neutral-200 hover:border-neutral-300 text-xs px-3.5 py-1.5 h-8!"
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setPage(pNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${page === pNum
                          ? "bg-primary text-white"
                          : "text-neutral-500 hover:bg-neutral-100"
                        }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="border-neutral-200 hover:border-neutral-300 text-xs px-3.5 py-1.5 h-8!"
              >
                Next
              </Button>
            </Flex>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onClose={() => { setIsFormOpen(false); setEditingProduct(null); }}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <Typography variant="h3" className="text-base! font-bold text-neutral-800 mb-1">
                Delete Product?
              </Typography>
              <Typography variant="p" className="text-xs! text-neutral-500 leading-normal">
                Are you sure you want to delete <span className="font-semibold text-neutral-700">"{deletingProduct.title}"</span>? This will permanently delete the product and its images from Cloudinary.
              </Typography>
            </div>
            <Flex gap={3} justify="center" className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeletingProduct(null)}
                disabled={deleteLoading}
                className="w-1/2! border-neutral-200 text-neutral-600"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDelete}
                disabled={deleteLoading}
                className="w-1/2! bg-red-600 hover:bg-red-700 text-white!"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </Flex>
          </div>
        </div>
      )}
    </div>
  );
}
