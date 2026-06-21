"use client";

import React, { useState, useRef } from "react";
import { Button, Typography, Flex } from "@/components/ui";
import { useReviews } from "@/hooks";
import { ReviewItem } from "@/types";
import { Plus, Trash2, Edit3, MessageSquare, Loader2, Star } from "lucide-react";

export function ReviewManager() {
  const { reviews, loading, saving, error, createReview, updateReview, deleteReview } = useReviews({ admin: true });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);

  // Form states
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState("");

  const authorRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const openAddModal = () => {
    setEditingReview(null);
    setAuthorName("");
    setRating(5);
    setContent("");
    setOrder(reviews.length);
    setIsActive(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (review: ReviewItem) => {
    setEditingReview(review);
    setAuthorName(review.authorName);
    setRating(review.rating);
    setContent(review.content);
    setOrder(review.order);
    setIsActive(review.isActive);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setFormError("Author Name is required.");
      setTimeout(() => {
        authorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        authorRef.current?.focus();
      }, 50);
      return;
    }
    if (!content.trim()) {
      setFormError("Review content is required.");
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        contentRef.current?.focus();
      }, 50);
      return;
    }

    setFormError("");

    const payload = {
      authorName: authorName.trim(),
      rating: Number(rating),
      content: content.trim(),
      order: Number(order),
      isActive,
    };

    let result;
    if (editingReview) {
      result = await updateReview(editingReview.id, payload);
    } else {
      result = await createReview(payload);
    }

    if (result) {
      setIsModalOpen(false);
    }
  };

  const handleToggleActive = async (review: ReviewItem) => {
    await updateReview(review.id, { isActive: !review.isActive });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer review?")) {
      await deleteReview(id);
    }
  };

  return (
    <div className="space-y-6 text-sm">
      <Flex justify="between" align="center" className="flex-wrap gap-4">
        <Typography variant="p" className="text-neutral-500">
          Manage customer reviews displayed in the slider on your storefront.
        </Typography>
        <Button onClick={openAddModal} className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-bold">
          <Plus size={16} /> Add Review
        </Button>
      </Flex>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-12 bg-neutral-200 rounded-xl" />
          <div className="h-12 bg-neutral-200 rounded-xl" />
          <div className="h-12 bg-neutral-200 rounded-xl" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="border-2 border-dashed border-neutral-200 rounded-3xl p-16 text-center max-w-md mx-auto">
          <MessageSquare className="mx-auto text-neutral-300 mb-4" size={48} />
          <Typography variant="h3" className="text-neutral-800 font-bold mb-1">No Reviews Available</Typography>
          <Typography variant="p" className="text-neutral-500 text-xs mb-6">
            Add your first customer review to show positive testimonials on the landing page.
          </Typography>
          <Button onClick={openAddModal} variant="outline" size="sm">
            Create Review
          </Button>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold text-xs tracking-wider uppercase">
                  <th className="py-4 px-6 w-16 text-center">Order</th>
                  <th className="py-4 px-6 w-1/4">Author</th>
                  <th className="py-4 px-6 w-28 text-center">Rating</th>
                  <th className="py-4 px-6">Review Content</th>
                  <th className="py-4 px-6 w-28 text-center">Status</th>
                  <th className="py-4 px-6 w-28 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-6 text-center font-medium text-neutral-400">{review.order}</td>
                    <td className="py-4 px-6 font-semibold text-neutral-800">{review.authorName}</td>
                    <td className="py-4 px-6">
                      <Flex align="center" justify="center" gap={0.5}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < review.rating ? "#F59E0B" : "none"}
                            className={i < review.rating ? "text-amber-500" : "text-neutral-200"}
                          />
                        ))}
                      </Flex>
                    </td>
                    <td className="py-4 px-6 text-neutral-500 max-w-xs truncate">{review.content}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleToggleActive(review)}
                        disabled={saving}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          review.isActive
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {review.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <Flex gap={2} justify="center">
                        <button
                          onClick={() => openEditModal(review)}
                          className="p-2 text-neutral-400 hover:text-primary hover:bg-neutral-100 rounded-xl transition-colors"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-100">
            <Typography variant="h3" className="text-lg font-bold text-neutral-800 mb-4">
              {editingReview ? "Edit Customer Review" : "Add Customer Review"}
            </Typography>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Author Name <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  ref={authorRef}
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Sarah M."
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white placeholder:text-neutral-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Rating <span className="text-red-500 ml-0.5">*</span>
                </label>
                <Flex align="center" gap={1.5} className="py-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(ratingValue)}
                        className="text-neutral-200 hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star
                          size={24}
                          fill={ratingValue <= rating ? "#F59E0B" : "none"}
                          className={ratingValue <= rating ? "text-amber-500" : "text-neutral-300"}
                        />
                      </button>
                    );
                  })}
                </Flex>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Review Content <span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter review statement..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white placeholder:text-neutral-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">Display Order</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6 pl-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="isActive" className="text-sm font-semibold text-neutral-700 cursor-pointer select-none">
                    Show on Storefront
                  </label>
                </div>
              </div>

              <Flex justify="end" gap={3} className="pt-4 border-t border-neutral-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="rounded-2xl"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="rounded-2xl flex items-center gap-2">
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  {editingReview ? "Save Changes" : "Add Review"}
                </Button>
              </Flex>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
