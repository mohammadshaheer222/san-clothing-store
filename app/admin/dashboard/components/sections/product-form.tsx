"use client";

import React, { useState, useEffect } from "react";

import { Button, Typography, Flex } from "@/components/ui";
import { Product } from "@/types";
import { useProduct } from "@/hooks";

interface ProductFormProps {
  product?: Product | null; // If present, we are editing
  onClose: () => void;
  onSuccess: () => void;
}

const PRESET_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const PRESET_CATEGORIES = ["T-Shirts", "Hoodies", "Jackets", "Bottoms", "Polo"];

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const isEdit = !!product;
  const { createProduct, updateProduct, uploadImage, error, setError, saving: submitting } = useProduct();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [oldPrice, setOldPrice] = useState<number | "">("");
  const [category, setCategory] = useState("T-Shirts");
  const [deliveryText, setDeliveryText] = useState("DELIVERY IN 5-7 DAYS");
  const [sizes, setSizes] = useState<string[]>([]);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isBuiltForJourney, setIsBuiltForJourney] = useState(false);

  // Images state
  const [imageUrl, setImageUrl] = useState("");
  const [imagePublicId, setImagePublicId] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryPublicIds, setGalleryPublicIds] = useState<string[]>([]);

  // Care instructions state
  const [careInstructions, setCareInstructions] = useState<string[]>([]);
  const [newCareInstruction, setNewCareInstruction] = useState("");

  // Loading states
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Populate data when editing
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price / 100); // convert cents to currency unit for input
      setOldPrice(product.oldPrice ? product.oldPrice / 100 : "");
      setCategory(product.category || "T-Shirts");
      setDeliveryText(product.deliveryText);
      setSizes(product.sizes || []);
      setIsBestSeller(product.isBestSeller || false);
      setIsBuiltForJourney(product.isBuiltForJourney || false);
      setImageUrl(product.image);
      setImagePublicId(product.imagePublicId || "");
      setGalleryImages(product.images || []);
      setGalleryPublicIds(product.imagePublicIds || []);
      setCareInstructions(product.careInstructions || []);
    }
  }, [product]);

  // Size toggling
  const handleSizeToggle = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  // Care instructions management
  const handleAddCareInstruction = () => {
    if (!newCareInstruction.trim()) return;
    setCareInstructions([...careInstructions, newCareInstruction.trim()]);
    setNewCareInstruction("");
  };

  const handleRemoveCareInstruction = (index: number) => {
    setCareInstructions(careInstructions.filter((_, i) => i !== index));
  };

  // Image Uploading
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (isGallery) {
      setUploadingGallery(true);
      setError("");
      try {
        const urls: string[] = [];
        const publicIds: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const res = await uploadImage(files[i]);
          if (res) {
            urls.push(res.url);
            publicIds.push(res.publicId);
          }
        }
        setGalleryImages([...galleryImages, ...urls]);
        setGalleryPublicIds([...galleryPublicIds, ...publicIds]);
      } catch (err: any) {
        setError(err.message || "Failed to upload gallery image.");
      } finally {
        setUploadingGallery(false);
      }
    } else {
      setUploadingMain(true);
      setError("");
      try {
        const res = await uploadImage(files[0]);
        if (res) {
          setImageUrl(res.url);
          setImagePublicId(res.publicId);
        }
      } catch (err: any) {
        setError(err.message || "Failed to upload main image.");
      } finally {
        setUploadingMain(false);
      }
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
    setGalleryPublicIds(galleryPublicIds.filter((_, i) => i !== index));
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required.");
    if (!description.trim()) return setError("Description is required.");
    if (price === "" || price <= 0) return setError("Price must be greater than 0.");
    if (!imageUrl) return setError("Main image is required.");

    setError("");

    const payload = {
      title: title.trim(),
      description: description.trim(),
      price: Math.round(price * 100), // convert to cents
      oldPrice: oldPrice !== "" && oldPrice > 0 ? Math.round(oldPrice * 100) : null,
      discount: oldPrice !== "" && oldPrice > price ? `-${Math.round(((oldPrice - price) / oldPrice) * 100)}%` : null,
      category,
      deliveryText: deliveryText.trim(),
      badge: null,
      sizes,
      colors: [],
      image: imageUrl,
      imagePublicId: imagePublicId || null,
      images: galleryImages,
      imagePublicIds: galleryPublicIds,
      careInstructions,
      isBestSeller,
      isBuiltForJourney,
    };

    let result;
    if (isEdit && product) {
      result = await updateProduct(product.id, payload);
    } else {
      result = await createProduct(payload);
    }

    if (result) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-8 py-5 border-b border-neutral-100 flex items-center justify-between flex-shrink-0">
          <Typography variant="h3" className="text-xl! font-bold text-neutral-800">
            {isEdit ? "Edit Product" : "Add New Product"}
          </Typography>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto flex-1 space-y-6 text-sm">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl">
              {error}
            </div>
          )}

          {/* Grid fields */}
          <div className="grid grid-cols-2 gap-6 mob:grid-cols-1">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-neutral-700">Product Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Essential T-Shirt"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                required
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-neutral-700">Category <span className="text-red-500">*</span></label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:border-primary transition-colors text-neutral-800"
              >
                {PRESET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-neutral-700">Price (₹) <span className="text-red-500">*</span></label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
                placeholder="e.g. 45.00"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                required
              />
            </div>

            {/* Old Price */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-neutral-700">Compare-at Price (₹) (Optional)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
                placeholder="e.g. 80.00"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
              />
            </div>

            {/* Delivery Text */}
            <div className="flex flex-col gap-2 col-span-2 mob:col-span-1">
              <label className="font-semibold text-neutral-700">Delivery Text <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={deliveryText}
                onChange={(e) => setDeliveryText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-neutral-700">Description <span className="text-red-500">*</span></label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the product material, design, and fit..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary transition-colors text-neutral-800 resize-none"
              required
            />
          </div>

          {/* Sizes Selection */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-neutral-700">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_SIZES.map((size) => {
                const active = sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`h-11 px-5 rounded-full border transition-all text-xs font-semibold ${active
                      ? "bg-primary border-primary text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                      }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Promotions */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="font-semibold text-neutral-700">Homepage Promotions</label>
            <div className="grid grid-cols-2 gap-4 mob:grid-cols-1">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-neutral-200 cursor-pointer hover:bg-neutral-50/50 transition-colors select-none">
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="w-5 h-5 rounded text-primary border-neutral-300 focus:ring-0 cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-black block text-xs">Add to Best Sellers</span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">Show in Best Sellers section carousel</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-neutral-200 cursor-pointer hover:bg-neutral-50/50 transition-colors select-none">
                <input
                  type="checkbox"
                  checked={isBuiltForJourney}
                  onChange={(e) => setIsBuiltForJourney(e.target.checked)}
                  className="w-5 h-5 rounded text-primary border-neutral-300 focus:ring-0 cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-black block text-xs">Add to Built for the Journey</span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">Show in Built for the Journey section collection</span>
                </div>
              </label>
            </div>
          </div>

          {/* Main Image Upload */}
          <div className="grid grid-cols-2 gap-6 mob:grid-cols-1 border-t border-neutral-100 pt-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-neutral-700">Main Product Image <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4">
                {imageUrl ? (
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-neutral-200 relative group flex-shrink-0">
                    <img src={imageUrl} alt="Main Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button
                        type="button"
                        onClick={() => { setImageUrl(""); setImagePublicId(""); }}
                        className="p-1.5 bg-white rounded-full text-red-600 hover:scale-110 transition-transform"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 flex-shrink-0 bg-neutral-50">
                    <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className="text-[10px]">No image</span>
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="hidden"
                    id="main-image-input"
                    disabled={uploadingMain}
                  />
                  <label
                    htmlFor="main-image-input"
                    className={`inline-flex items-center justify-center px-4 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 rounded-full font-semibold cursor-pointer text-xs transition-colors ${uploadingMain ? "opacity-50 pointer-events-none" : ""
                      }`}
                  >
                    {uploadingMain ? "Uploading..." : "Upload Image"}
                  </label>
                  <Typography variant="caption" className="text-[10px]! text-neutral-400 block mt-1.5">
                    JPEG, PNG, WebP or GIF. Max 5MB.
                  </Typography>
                </div>
              </div>
            </div>

            {/* Gallery Images Upload */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-neutral-700">Gallery Images (Optional)</label>
              <div className="flex flex-wrap gap-3 mb-2">
                {galleryImages.map((url, idx) => (
                  <div key={idx} className="w-16 h-16 rounded-xl overflow-hidden border border-neutral-200 relative group flex-shrink-0">
                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="p-1 bg-white rounded-full text-red-600 hover:scale-110 transition-transform"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                <div className="w-16 h-16 flex-shrink-0">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, true)}
                    className="hidden"
                    id="gallery-image-input"
                    disabled={uploadingGallery}
                  />
                  <label
                    htmlFor="gallery-image-input"
                    className={`w-full h-full rounded-xl border-2 border-dashed border-neutral-200 hover:border-neutral-300 flex flex-col items-center justify-center text-neutral-400 cursor-pointer bg-neutral-50 transition-colors ${uploadingGallery ? "opacity-50 pointer-events-none" : ""
                      }`}
                  >
                    {uploadingGallery ? (
                      <span className="text-[9px] font-bold text-center">Uploading</span>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="text-[9px]">Add</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Care Instructions */}
          <div className="flex flex-col gap-2 border-t border-neutral-100 pt-6">
            <label className="font-semibold text-neutral-700">Care Instructions</label>
            <div className="space-y-2 mb-2">
              {careInstructions.map((instruction, index) => (
                <div key={index} className="flex justify-between items-center gap-4 bg-neutral-50 px-4 py-2.5 rounded-xl border border-neutral-150">
                  <span className="text-neutral-700 text-xs">{instruction}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCareInstruction(index)}
                    className="p-1 rounded-full text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 max-w-xl">
              <input
                type="text"
                value={newCareInstruction}
                onChange={(e) => setNewCareInstruction(e.target.value)}
                placeholder="e.g. Machine wash cold with like colors"
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary text-neutral-800 text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddCareInstruction}
                className="h-10! px-4! border-neutral-200 hover:border-neutral-400 text-xs!"
              >
                Add Instruction
              </Button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-neutral-100 flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="border-neutral-200 text-neutral-700"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={submitting || uploadingMain || uploadingGallery}
            >
              {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
