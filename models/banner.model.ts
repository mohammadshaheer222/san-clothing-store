/**
 * models/banner.model.ts
 * ----------------------
 * Mongoose schema & model for the Banner collection.
 * A single collection stores all site banners, differentiated by `type`.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export type BannerType = "hero" | "collection-promo" | "homepage-sections";

export interface IBanner extends Document {
  type: BannerType;
  /** Shared */
  title: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  /** Hero-specific */
  subtitle?: string;
  buttonVariant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  backgroundImage?: string;
  backgroundImagePublicId?: string;
  /** Collection-promo-specific */
  description?: string;
  leftImage?: string;
  leftImagePublicId?: string;
  rightImage?: string;
  rightImagePublicId?: string;
  /** Homepage section toggles */
  showCollectionSection?: boolean;
  showBestSellerSection?: boolean;
  showReviewsSection?: boolean;
  collectionTitle?: string;
  collectionDescription?: string;
  bestSellerTitle?: string;
  bestSellerDescription?: string;
  reviewsTitle?: string;
  reviewsDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    type: {
      type: String,
      enum: ["hero", "collection-promo", "homepage-sections"],
      required: [true, "Banner type is required"],
      index: true,
    },
    title: {
      type: String,
      required: function() {
        return (this as any).type !== "homepage-sections";
      },
      trim: true,
    },
    buttonText: {
      type: String,
      required: function() {
        return (this as any).type !== "homepage-sections";
      },
      trim: true,
    },
    buttonLink: {
      type: String,
      required: function() {
        return (this as any).type !== "homepage-sections";
      },
      trim: true,
    },
    isActive: { type: Boolean, default: true },
    // Hero
    subtitle: { type: String, trim: true },
    buttonVariant: {
      type: String,
      enum: ["primary", "secondary", "outline", "ghost", "white"],
      default: "white",
    },
    backgroundImage: { type: String, trim: true },
    backgroundImagePublicId: { type: String, trim: true },
    // Collection Promo
    description: { type: String, trim: true },
    leftImage: { type: String, trim: true },
    leftImagePublicId: { type: String, trim: true },
    rightImage: { type: String, trim: true },
    rightImagePublicId: { type: String, trim: true },
    // Homepage Section Toggles
    showCollectionSection: { type: Boolean, default: true },
    showBestSellerSection: { type: Boolean, default: true },
    showReviewsSection: { type: Boolean, default: true },
    collectionTitle: { type: String, trim: true },
    collectionDescription: { type: String, trim: true },
    bestSellerTitle: { type: String, trim: true },
    bestSellerDescription: { type: String, trim: true },
    reviewsTitle: { type: String, trim: true },
    reviewsDescription: { type: String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Banner: Model<IBanner> =
  (mongoose.models.Banner as Model<IBanner>) ||
  mongoose.model<IBanner>("Banner", BannerSchema);

export default Banner;
