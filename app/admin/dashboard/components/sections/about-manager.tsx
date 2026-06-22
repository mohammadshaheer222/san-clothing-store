"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography, Flex } from "@/components/ui";
import { useAbout } from "@/hooks";

export function AboutManager() {
  const { aboutContent, loading, saving, uploading, error, successMsg, saveAboutContent, uploadAboutImage, setError, setSuccessMsg } = useAbout();

  // Form states
  const [heroCaption, setHeroCaption] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [narrativeTitle1, setNarrativeTitle1] = useState("");
  const [narrativeDescription1, setNarrativeDescription1] = useState("");
  const [narrativeTitle2, setNarrativeTitle2] = useState("");
  const [narrativeDescription2, setNarrativeDescription2] = useState("");
  const [narrativeImage, setNarrativeImage] = useState("");
  const [narrativeImagePublicId, setNarrativeImagePublicId] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  useEffect(() => {
    if (aboutContent) {
      setHeroCaption(aboutContent.heroCaption || "");
      setHeroTitle(aboutContent.heroTitle || "");
      setHeroDescription(aboutContent.heroDescription || "");
      setNarrativeTitle1(aboutContent.narrativeTitle1 || "");
      setNarrativeDescription1(aboutContent.narrativeDescription1 || "");
      setNarrativeTitle2(aboutContent.narrativeTitle2 || "");
      setNarrativeDescription2(aboutContent.narrativeDescription2 || "");
      setNarrativeImage(aboutContent.narrativeImage || "");
      setNarrativeImagePublicId(aboutContent.narrativeImagePublicId || "");
      setQuoteText(aboutContent.quoteText || "");
      setQuoteAuthor(aboutContent.quoteAuthor || "");
    }
  }, [aboutContent]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setSuccessMsg("");

    const res = await uploadAboutImage(files[0]);
    if (res) {
      setNarrativeImage(res.url);
      setNarrativeImagePublicId(res.publicId);
      setSuccessMsg("Narrative image uploaded successfully. Remember to save changes to persist.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg("");

    const payload = {
      heroCaption: heroCaption.trim(),
      heroTitle: heroTitle.trim(),
      heroDescription: heroDescription.trim(),
      narrativeTitle1: narrativeTitle1.trim(),
      narrativeDescription1: narrativeDescription1.trim(),
      narrativeTitle2: narrativeTitle2.trim(),
      narrativeDescription2: narrativeDescription2.trim(),
      narrativeImage: narrativeImage.trim(),
      narrativeImagePublicId: narrativeImagePublicId.trim() || undefined,
      quoteText: quoteText.trim(),
      quoteAuthor: quoteAuthor.trim(),
    };

    await saveAboutContent(payload);
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

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-8">
        <div className="space-y-8">
          <div>
            <Typography variant="h3" className="text-lg! font-bold text-neutral-800">
              About Page Content Configuration
            </Typography>
            <Typography variant="p" className="text-xs! text-neutral-500 leading-relaxed max-w-xl block mt-1">
              Customize the storytelling components, descriptions, narrative image, and philosophy quote displayed on the About Us page.
            </Typography>
          </div>

          <div className="space-y-8 border-t border-neutral-100 pt-6">
            {/* 1. Hero Block */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 max-w-2xl space-y-4">
              <Typography variant="p" className="font-bold text-neutral-800 border-b border-neutral-200/60 pb-2">
                1. Hero Story Header
              </Typography>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Caption / Subtitle</label>
                  <input
                    type="text"
                    value={heroCaption}
                    onChange={(e) => setHeroCaption(e.target.value)}
                    placeholder="e.g. Our Story"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Hero Main Title</label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    placeholder="e.g. Crafting Simplicity. Inspiring Timelessness."
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Hero Narrative Summary</label>
                  <textarea
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    placeholder="Enter hero description story..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Narrative Side By Side */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 max-w-2xl space-y-6">
              <Typography variant="p" className="font-bold text-neutral-800 border-b border-neutral-200/60 pb-2">
                2. Brand Narrative Sections
              </Typography>
              <div className="space-y-6">
                {/* Section 1 */}
                <div className="space-y-3 bg-white p-4 rounded-xl border border-neutral-200/60">
                  <Typography variant="caption" className="font-bold text-neutral-500 block uppercase tracking-wider">
                    First Subsection
                  </Typography>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-xs text-neutral-700">Title</label>
                    <input
                      type="text"
                      value={narrativeTitle1}
                      onChange={(e) => setNarrativeTitle1(e.target.value)}
                      placeholder="e.g. Design with Intention"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-xs text-neutral-700">Description</label>
                    <textarea
                      value={narrativeDescription1}
                      onChange={(e) => setNarrativeDescription1(e.target.value)}
                      placeholder="Enter description..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white resize-none"
                    />
                  </div>
                </div>

                {/* Section 2 */}
                <div className="space-y-3 bg-white p-4 rounded-xl border border-neutral-200/60">
                  <Typography variant="caption" className="font-bold text-neutral-500 block uppercase tracking-wider">
                    Second Subsection
                  </Typography>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-xs text-neutral-700">Title</label>
                    <input
                      type="text"
                      value={narrativeTitle2}
                      onChange={(e) => setNarrativeTitle2(e.target.value)}
                      placeholder="e.g. Ethical & Transparent Craftsmanship"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-xs text-neutral-700">Description</label>
                    <textarea
                      value={narrativeDescription2}
                      onChange={(e) => setNarrativeDescription2(e.target.value)}
                      placeholder="Enter description..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white resize-none"
                    />
                  </div>
                </div>

                {/* Narrative Image upload */}
                <div className="space-y-3 bg-white p-4 rounded-xl border border-neutral-200/60">
                  <Typography variant="caption" className="font-bold text-neutral-500 block uppercase tracking-wider">
                    Narrative Collage Image
                  </Typography>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {narrativeImage ? (
                      <img
                        src={narrativeImage}
                        alt="Narrative preview"
                        className="w-32 h-32 object-cover rounded-xl border border-neutral-200 shadow-xs"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-neutral-100 rounded-xl border border-dashed border-neutral-200 flex items-center justify-center text-neutral-400 text-xs">
                        No image
                      </div>
                    )}
                    <div className="space-y-2 flex-1 w-full">
                      <input
                        type="file"
                        accept="image/*"
                        id="narrative-image-input"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                      <label
                        htmlFor="narrative-image-input"
                        className={`inline-flex px-4 py-2 rounded-xl border border-neutral-250 font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-neutral-50 transition-colors ${
                          uploading ? "opacity-50 pointer-events-none" : ""
                        }`}
                      >
                        {uploading ? "Uploading image..." : "Upload New Image"}
                      </label>
                      <span className="text-[11px] text-neutral-400 block">
                        Recommended size: 800x1000px, aspect ratio 4:5. Max 2MB.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Quote Block */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 max-w-2xl space-y-4">
              <Typography variant="p" className="font-bold text-neutral-800 border-b border-neutral-200/60 pb-2">
                3. Philosophy Quote Banner
              </Typography>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Quote Text</label>
                  <textarea
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="e.g. Minimalism is not about having less. It is about making room for what truly matters."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white resize-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-xs text-neutral-700">Citation / Author</label>
                  <input
                    type="text"
                    value={quoteAuthor}
                    onChange={(e) => setQuoteAuthor(e.target.value)}
                    placeholder="e.g. — The SAN Philosophy"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-neutral-100 max-w-2xl">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={saving || uploading}
            className="rounded-2xl"
          >
            {saving ? "Saving changes..." : "Save About Content"}
          </Button>
        </div>
      </form>
    </div>
  );
}
