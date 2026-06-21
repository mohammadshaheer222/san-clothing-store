/**
 * app/admin/dashboard/components/sections/banner-manager.tsx
 * --------------------------------------------------------
 * Admin section to manage home page banners (Hero and Collection Banner)
 * and toggling visibility of the Collection/BestSeller home sections.
 * Handles saving to MongoDB and uploading banner assets to Cloudinary.
 */

"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography, Flex } from "@/components/ui";
import { Banner, BannerType } from "@/types";
import { useBanners } from "@/hooks";

export function BannerManager() {
  const [activeTab, setActiveTab] = useState<BannerType>("hero");

  const {
    banners,
    loading,
    saving: submitting,
    error,
    successMsg,
    saveBanner,
    uploadBannerImage,
    setError,
    setSuccessMsg,
  } = useBanners();

  // Hero form state
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroBgImage, setHeroBgImage] = useState("");
  const [heroBgPublicId, setHeroBgPublicId] = useState("");
  const [heroBtnText, setHeroBtnText] = useState("");
  const [heroBtnLink, setHeroBtnLink] = useState("");
  const [heroBtnVariant, setHeroBtnVariant] = useState<"primary" | "secondary" | "outline" | "ghost" | "white">("white");
  const [heroIsActive, setHeroIsActive] = useState(true);
  const [uploadingHeroBg, setUploadingHeroBg] = useState(false);

  // Collection promo form state
  const [promoTitle, setPromoTitle] = useState("");
  const [promoDesc, setPromoDesc] = useState("");
  const [promoLeftImage, setPromoLeftImage] = useState("");
  const [promoLeftPublicId, setPromoLeftPublicId] = useState("");
  const [promoRightImage, setPromoRightImage] = useState("");
  const [promoRightPublicId, setPromoRightPublicId] = useState("");
  const [promoBtnText, setPromoBtnText] = useState("");
  const [promoBtnLink, setPromoBtnLink] = useState("");
  const [promoIsActive, setPromoIsActive] = useState(true);
  const [uploadingLeft, setUploadingLeft] = useState(false);
  const [uploadingRight, setUploadingRight] = useState(false);

  // Section visibility toggles form state
  const [showCollection, setShowCollection] = useState(true);
  const [showBestSeller, setShowBestSeller] = useState(true);

  useEffect(() => {
    if (banners.length > 0) {
      // Populate Hero Banner form
      const hero = banners.find((b) => b.type === "hero");
      if (hero) {
        setHeroSubtitle(hero.subtitle || "");
        setHeroTitle(hero.title);
        setHeroBgImage(hero.backgroundImage || "");
        setHeroBgPublicId(hero.backgroundImagePublicId || "");
        setHeroBtnText(hero.buttonText);
        setHeroBtnLink(hero.buttonLink);
        setHeroBtnVariant(hero.buttonVariant || "white");
        setHeroIsActive(hero.isActive);
      }

      // Populate Collection Banner form
      const promo = banners.find((b) => b.type === "collection-promo");
      if (promo) {
        setPromoTitle(promo.title);
        setPromoDesc(promo.description || "");
        setPromoLeftImage(promo.leftImage || "");
        setPromoLeftPublicId(promo.leftImagePublicId || "");
        setPromoRightImage(promo.rightImage || "");
        setPromoRightPublicId(promo.rightImagePublicId || "");
        setPromoBtnText(promo.buttonText);
        setPromoBtnLink(promo.buttonLink);
        setPromoIsActive(promo.isActive);
      }

      // Populate Homepage Sections toggles
      const sectionsConfig = banners.find((b) => b.type === "homepage-sections");
      if (sectionsConfig) {
        setShowCollection(sectionsConfig.showCollectionSection !== false);
        setShowBestSeller(sectionsConfig.showBestSellerSection !== false);
      }
    }
  }, [banners]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "heroBg" | "promoLeft" | "promoRight"
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError("");
    setSuccessMsg("");

    if (field === "heroBg") setUploadingHeroBg(true);
    if (field === "promoLeft") setUploadingLeft(true);
    if (field === "promoRight") setUploadingRight(true);

    try {
      const res = await uploadBannerImage(files[0]);
      if (res) {
        if (field === "heroBg") {
          setHeroBgImage(res.url);
          setHeroBgPublicId(res.publicId);
        } else if (field === "promoLeft") {
          setPromoLeftImage(res.url);
          setPromoLeftPublicId(res.publicId);
        } else if (field === "promoRight") {
          setPromoRightImage(res.url);
          setPromoRightPublicId(res.publicId);
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploadingHeroBg(false);
      setUploadingLeft(false);
      setUploadingRight(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    let payload: any = {};

    if (activeTab === "hero") {
      if (!heroTitle.trim()) return setError("Title is required.");
      if (!heroBtnText.trim()) return setError("Button text is required.");
      if (!heroBtnLink.trim()) return setError("Button link is required.");
      if (!heroBgImage) return setError("Background image is required.");

      payload = {
        type: "hero",
        subtitle: heroSubtitle.trim(),
        title: heroTitle.trim(),
        backgroundImage: heroBgImage,
        backgroundImagePublicId: heroBgPublicId,
        buttonText: heroBtnText.trim(),
        buttonLink: heroBtnLink.trim(),
        buttonVariant: heroBtnVariant,
        isActive: heroIsActive,
      };
    } else if (activeTab === "collection-promo") {
      if (!promoTitle.trim()) return setError("Promo title is required.");
      if (!promoBtnText.trim()) return setError("Button text is required.");
      if (!promoBtnLink.trim()) return setError("Button link is required.");
      if (!promoRightImage) return setError("Right image is required (Left is optional).");

      payload = {
        type: "collection-promo",
        title: promoTitle.trim(),
        description: promoDesc.trim(),
        leftImage: promoLeftImage,
        leftImagePublicId: promoLeftPublicId,
        rightImage: promoRightImage,
        rightImagePublicId: promoRightPublicId,
        buttonText: promoBtnText.trim(),
        buttonLink: promoBtnLink.trim(),
        isActive: promoIsActive,
      };
    } else if (activeTab === "homepage-sections") {
      payload = {
        type: "homepage-sections",
        showCollectionSection: showCollection,
        showBestSellerSection: showBestSeller,
        isActive: true,
      };
    }

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
      {/* Banner Tabs */}
      <Flex gap={2} className="border-b border-neutral-200 pb-px">
        <button
          onClick={() => { setActiveTab("hero"); setError(""); setSuccessMsg(""); }}
          className={`px-5 py-3 border-b-2 text-sm font-semibold transition-all ${
            activeTab === "hero"
              ? "border-primary text-primary"
              : "border-transparent text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Hero Banner
        </button>
        <button
          onClick={() => { setActiveTab("collection-promo"); setError(""); setSuccessMsg(""); }}
          className={`px-5 py-3 border-b-2 text-sm font-semibold transition-all ${
            activeTab === "collection-promo"
              ? "border-primary text-primary"
              : "border-transparent text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Collection Promo Banner
        </button>
        <button
          onClick={() => { setActiveTab("homepage-sections"); setError(""); setSuccessMsg(""); }}
          className={`px-5 py-3 border-b-2 text-sm font-semibold transition-all ${
            activeTab === "homepage-sections"
              ? "border-primary text-primary"
              : "border-transparent text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Homepage Sections Visibility
        </button>
      </Flex>

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

      {/* Main Banner Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-6">
        {activeTab === "hero" ? (
          /* HERO BANNER SECTION */
          <div className="space-y-6">
            <Typography variant="h3" className="text-lg! font-bold text-neutral-800">
              Hero Banner Layout Settings
            </Typography>

            <div className="grid grid-cols-2 gap-6 mob:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Subtitle (Small text above title)</label>
                <input
                  type="text"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="e.g. Kireina & Gelyu"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Button Variant style</label>
                <select
                  value={heroBtnVariant}
                  onChange={(e: any) => setHeroBtnVariant(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:border-primary transition-colors text-neutral-800"
                >
                  <option value="white">White Filled</option>
                  <option value="primary">Dark Navy</option>
                  <option value="outline">Outline</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 col-span-2 mob:col-span-1">
                <label className="font-semibold text-neutral-700">Main Title *</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="e.g. 8 New Colors. Moving Fast."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Button CTA Text *</label>
                <input
                  type="text"
                  value={heroBtnText}
                  onChange={(e) => setHeroBtnText(e.target.value)}
                  placeholder="e.g. SHOP NOW"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Button Redirection URL *</label>
                <input
                  type="text"
                  value={heroBtnLink}
                  onChange={(e) => setHeroBtnLink(e.target.value)}
                  placeholder="e.g. /products"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                  required
                />
              </div>
            </div>

            {/* Banner Background Image */}
            <div className="flex flex-col gap-2 border-t border-neutral-100 pt-6">
              <label className="font-semibold text-neutral-700">Background Image *</label>
              <div className="flex items-center gap-4">
                {heroBgImage ? (
                  <div className="w-48 h-32 rounded-2xl overflow-hidden border border-neutral-200 relative group flex-shrink-0">
                    <img src={heroBgImage} alt="Hero Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button
                        type="button"
                        onClick={() => { setHeroBgImage(""); setHeroBgPublicId(""); }}
                        className="p-2 bg-white rounded-full text-red-600 hover:scale-110 transition-transform"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-48 h-32 rounded-2xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 flex-shrink-0 bg-neutral-50">
                    <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className="text-xs">No image uploaded</span>
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "heroBg")}
                    className="hidden"
                    id="hero-bg-input"
                    disabled={uploadingHeroBg}
                  />
                  <label
                    htmlFor="hero-bg-input"
                    className={`inline-flex items-center justify-center px-4 py-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 rounded-full font-semibold cursor-pointer text-xs transition-colors ${
                      uploadingHeroBg ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    {uploadingHeroBg ? "Uploading image..." : "Upload New Image"}
                  </label>
                  <Typography variant="caption" className="text-xs! text-neutral-400 block mt-1.5">
                    Recommended dimensions: 1920x1080 (landscape). WebP/JPEG format.
                  </Typography>
                </div>
              </div>
            </div>

            {/* Soft Toggle Status */}
            <div className="flex items-center gap-3 border-t border-neutral-100 pt-6">
              <input
                type="checkbox"
                id="hero-active"
                checked={heroIsActive}
                onChange={(e) => setHeroIsActive(e.target.checked)}
                className="w-4.5 h-4.5 border border-neutral-300 rounded-lg text-primary focus:ring-0 cursor-pointer"
              />
              <label htmlFor="hero-active" className="font-semibold text-neutral-700 cursor-pointer select-none">
                Enable / Show this Hero Banner on homepage
              </label>
            </div>
          </div>
        ) : activeTab === "collection-promo" ? (
          /* COLLECTION PROMO BANNER SECTION */
          <div className="space-y-6">
            <Typography variant="h3" className="text-lg! font-bold text-neutral-800">
              Collection Promo Layout Settings
            </Typography>

            <div className="grid grid-cols-2 gap-6 mob:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Promo Title *</label>
                <input
                  type="text"
                  value={promoTitle}
                  onChange={(e) => setPromoTitle(e.target.value)}
                  placeholder="e.g. PERFECT STYLE"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Promo Sub-Description (Short text)</label>
                <input
                  type="text"
                  value={promoDesc}
                  onChange={(e) => setPromoDesc(e.target.value)}
                  placeholder="e.g. MaisonGrozavu is a statement of who you are"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Button CTA Text *</label>
                <input
                  type="text"
                  value={promoBtnText}
                  onChange={(e) => setPromoBtnText(e.target.value)}
                  placeholder="e.g. View All Products"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Button Redirection URL *</label>
                <input
                  type="text"
                  value={promoBtnLink}
                  onChange={(e) => setPromoBtnLink(e.target.value)}
                  placeholder="e.g. /products"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                  required
                />
              </div>
            </div>

            {/* Left and Right Images */}
            <div className="grid grid-cols-2 gap-8 mob:grid-cols-1 border-t border-neutral-100 pt-6">
              {/* Left Promo Image */}
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Left Side Promo Image (Optional)</label>
                <div className="flex items-center gap-4">
                  {promoLeftImage ? (
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border border-neutral-200 relative group flex-shrink-0 bg-neutral-50">
                      <img src={promoLeftImage} alt="Left Promo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          type="button"
                          onClick={() => { setPromoLeftImage(""); setPromoLeftPublicId(""); }}
                          className="p-1.5 bg-white rounded-full text-red-600 hover:scale-110 transition-transform"
                        >
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 flex-shrink-0 bg-neutral-50">
                      <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span className="text-[10px]">Add Left Image</span>
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "promoLeft")}
                      className="hidden"
                      id="promo-left-input"
                      disabled={uploadingLeft}
                    />
                    <label
                      htmlFor="promo-left-input"
                      className={`inline-flex items-center justify-center px-3.5 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 rounded-full font-semibold cursor-pointer text-xs transition-colors ${
                        uploadingLeft ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {uploadingLeft ? "Uploading..." : "Upload Left Image"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Promo Image */}
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-neutral-700">Right Side Promo Image *</label>
                <div className="flex items-center gap-4">
                  {promoRightImage ? (
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border border-neutral-200 relative group flex-shrink-0 bg-neutral-50">
                      <img src={promoRightImage} alt="Right Promo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          type="button"
                          onClick={() => { setPromoRightImage(""); setPromoRightPublicId(""); }}
                          className="p-1.5 bg-white rounded-full text-red-600 hover:scale-110 transition-transform"
                        >
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 flex-shrink-0 bg-neutral-50">
                      <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span className="text-[10px]">Add Right Image</span>
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "promoRight")}
                      className="hidden"
                      id="promo-right-input"
                      disabled={uploadingRight}
                    />
                    <label
                      htmlFor="promo-right-input"
                      className={`inline-flex items-center justify-center px-3.5 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 rounded-full font-semibold cursor-pointer text-xs transition-colors ${
                        uploadingRight ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {uploadingRight ? "Uploading..." : "Upload Right Image"}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft Toggle Status */}
            <div className="flex items-center gap-3 border-t border-neutral-100 pt-6">
              <input
                type="checkbox"
                id="promo-active"
                checked={promoIsActive}
                onChange={(e) => setPromoIsActive(e.target.checked)}
                className="w-4.5 h-4.5 border border-neutral-300 rounded-lg text-primary focus:ring-0 cursor-pointer"
              />
              <label htmlFor="promo-active" className="font-semibold text-neutral-700 cursor-pointer select-none">
                Enable / Show this Collection Promo Banner on homepage
              </label>
            </div>
          </div>
        ) : (
          /* HOMEPAGE SECTIONS VISIBILITY toggles */
          <div className="space-y-6">
            <Typography variant="h3" className="text-lg! font-bold text-neutral-800">
              Homepage Sections Visibility
            </Typography>
            <Typography variant="p" className="text-xs! text-neutral-500 leading-relaxed max-w-xl block">
              Toggle the visibility of main structural sections on your homepage storefront instantly.
            </Typography>

            <div className="space-y-4 border-t border-neutral-100 pt-6">
              {/* Collection Section Toggle */}
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 max-w-xl">
                <div>
                  <label htmlFor="toggle-collection" className="font-semibold text-neutral-700 block cursor-pointer select-none">
                    Built for the Journey (Collection Section)
                  </label>
                  <span className="text-xs text-neutral-400 block mt-0.5">
                    Show or hide the category grid and banner galleries.
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="toggle-collection"
                  checked={showCollection}
                  onChange={(e) => setShowCollection(e.target.checked)}
                  className="w-5 h-5 border border-neutral-300 rounded text-primary focus:ring-0 cursor-pointer"
                />
              </div>

              {/* Best Sellers Section Toggle */}
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 max-w-xl">
                <div>
                  <label htmlFor="toggle-bestseller" className="font-semibold text-neutral-700 block cursor-pointer select-none">
                    Best Sellers Section
                  </label>
                  <span className="text-xs text-neutral-400 block mt-0.5">
                    Show or hide the best sellers product carousel layout.
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="toggle-bestseller"
                  checked={showBestSeller}
                  onChange={(e) => setShowBestSeller(e.target.checked)}
                  className="w-5 h-5 border border-neutral-300 rounded text-primary focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Action buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-neutral-100">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting || uploadingHeroBg || uploadingLeft || uploadingRight}
          >
            {submitting ? "Saving changes..." : "Save Settings Configuration"}
          </Button>
        </div>
      </form>
    </div>
  );
}
