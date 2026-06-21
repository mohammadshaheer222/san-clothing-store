"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography, Flex } from "@/components/ui";
import { useBanners } from "@/hooks";

export function SectionsManager() {
  const { banners, loading, saving: submitting, error, successMsg, saveBanner, setError, setSuccessMsg } = useBanners();

  // Section visibility and contents form state
  const [showCollection, setShowCollection] = useState(true);
  const [showBestSeller, setShowBestSeller] = useState(true);
  const [showReviews, setShowReviews] = useState(true);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionDesc, setCollectionDesc] = useState("");
  const [bestSellerTitle, setBestSellerTitle] = useState("");
  const [bestSellerDesc, setBestSellerDesc] = useState("");
  const [reviewsTitle, setReviewsTitle] = useState("");
  const [reviewsDesc, setReviewsDesc] = useState("");

  useEffect(() => {
    if (banners.length > 0) {
      const sectionsConfig = banners.find((b) => b.type === "homepage-sections");
      if (sectionsConfig) {
        Promise.resolve().then(() => {
          setShowCollection(sectionsConfig.showCollectionSection !== false);
          setShowBestSeller(sectionsConfig.showBestSellerSection !== false);
          setShowReviews(sectionsConfig.showReviewsSection !== false);
          setCollectionTitle(sectionsConfig.collectionTitle || "");
          setCollectionDesc(sectionsConfig.collectionDescription || "");
          setBestSellerTitle(sectionsConfig.bestSellerTitle || "");
          setBestSellerDesc(sectionsConfig.bestSellerDescription || "");
          setReviewsTitle(sectionsConfig.reviewsTitle || "");
          setReviewsDesc(sectionsConfig.reviewsDescription || "");
        });
      }
    }
  }, [banners]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg("");

    const payload = {
      type: "homepage-sections",
      showCollectionSection: showCollection,
      showBestSellerSection: showBestSeller,
      showReviewsSection: showReviews,
      collectionTitle: collectionTitle.trim(),
      collectionDescription: collectionDesc.trim(),
      bestSellerTitle: bestSellerTitle.trim(),
      bestSellerDescription: bestSellerDesc.trim(),
      reviewsTitle: reviewsTitle.trim(),
      reviewsDescription: reviewsDesc.trim(),
      isActive: true,
    };

    await saveBanner(payload);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-8 bg-neutral-200 rounded w-1/4" />
        <div className="h-64 bg-neutral-200 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-sm">
      {/* Message Notifications */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl font-semibold">
          {successMsg}
        </div>
      )}

      {/* Main Sections Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-6">
        <div className="space-y-8">
          <div>
            <Typography variant="h3" className="text-lg! font-bold text-neutral-800">
              Homepage Sections Configuration
            </Typography>
            <Typography variant="p" className="text-xs! text-neutral-500 leading-relaxed max-w-xl block mt-1">
              Configure visibility and edit the titles and descriptions of the main homepage sections shown on the store front end.
            </Typography>
          </div>

          <div className="space-y-6 border-t border-neutral-100 pt-6">
            {/* Built for the Journey Config */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 max-w-xl space-y-4">
              <Flex align="center" justify="between" className="border-b border-neutral-250/40 pb-3">
                <div>
                  <label htmlFor="toggle-collection" className="font-bold text-neutral-800 cursor-pointer select-none">
                    &ldquo;Built for the Journey&rdquo; Section
                  </label>
                  <span className="text-xs text-neutral-400 block mt-0.5">
                    Show or hide this section on the storefront.
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="toggle-collection"
                  checked={showCollection}
                  onChange={(e) => setShowCollection(e.target.checked)}
                  className="w-5 h-5 border border-neutral-300 rounded text-primary focus:ring-0 cursor-pointer"
                />
              </Flex>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Section Title</label>
                  <input
                    type="text"
                    value={collectionTitle}
                    onChange={(e) => setCollectionTitle(e.target.value)}
                    placeholder="e.g. Built for the Journey"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Section Description</label>
                  <textarea
                    value={collectionDesc}
                    onChange={(e) => setCollectionDesc(e.target.value)}
                    placeholder="Enter section description..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Best Sellers Config */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 max-w-xl space-y-4">
              <Flex align="center" justify="between" className="border-b border-neutral-250/40 pb-3">
                <div>
                  <label htmlFor="toggle-bestseller" className="font-bold text-neutral-800 cursor-pointer select-none">
                    &ldquo;Best Sellers&rdquo; Section
                  </label>
                  <span className="text-xs text-neutral-400 block mt-0.5">
                    Show or hide this section on the storefront.
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="toggle-bestseller"
                  checked={showBestSeller}
                  onChange={(e) => setShowBestSeller(e.target.checked)}
                  className="w-5 h-5 border border-neutral-300 rounded text-primary focus:ring-0 cursor-pointer"
                />
              </Flex>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Section Title</label>
                  <input
                    type="text"
                    value={bestSellerTitle}
                    onChange={(e) => setBestSellerTitle(e.target.value)}
                    placeholder="e.g. Best Sellers"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Section Description</label>
                  <textarea
                    value={bestSellerDesc}
                    onChange={(e) => setBestSellerDesc(e.target.value)}
                    placeholder="Enter section description..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Customer Reviews Config */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 max-w-xl space-y-4">
              <Flex align="center" justify="between" className="border-b border-neutral-250/40 pb-3">
                <div>
                  <label htmlFor="toggle-reviews" className="font-bold text-neutral-800 cursor-pointer select-none">
                    &ldquo;Customer Reviews&rdquo; Section
                  </label>
                  <span className="text-xs text-neutral-400 block mt-0.5">
                    Show or hide this section on the storefront.
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="toggle-reviews"
                  checked={showReviews}
                  onChange={(e) => setShowReviews(e.target.checked)}
                  className="w-5 h-5 border border-neutral-300 rounded text-primary focus:ring-0 cursor-pointer"
                />
              </Flex>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Section Title</label>
                  <input
                    type="text"
                    value={reviewsTitle}
                    onChange={(e) => setReviewsTitle(e.target.value)}
                    placeholder="e.g. Customer Reviews"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Section Description</label>
                  <textarea
                    value={reviewsDesc}
                    onChange={(e) => setReviewsDesc(e.target.value)}
                    placeholder="Enter section description..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-neutral-100">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting}
          >
            {submitting ? "Saving changes..." : "Save Sections Configuration"}
          </Button>
        </div>
      </form>
    </div>
  );
}
