/**
 * models/product.model.ts
 * -----------------------
 * Mongoose schema & model for the Product collection.
 * Mirrors the Product interface in types/index.ts.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

// ---- TypeScript interface (matches types/index.ts) ---------------
export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  image: string;
  /** Cloudinary public_id for the main image — used for deletion */
  imagePublicId?: string;
  images?: string[];
  /** Cloudinary public_ids for the gallery images — used for deletion */
  imagePublicIds?: string[];
  deliveryText: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  category?: string;
  careInstructions?: string[];
  badge?: string;
  isBestSeller?: boolean;
  isBuiltForJourney?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Schema ------------------------------------------------------
const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title must be 200 characters or fewer"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    oldPrice: { type: Number, min: 0 },
    discount: { type: String, trim: true },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: { type: Number, default: 0, min: 0 },
    image: {
      type: String,
      required: [true, "Main image URL is required"],
      trim: true,
    },
    imagePublicId: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    imagePublicIds: [{ type: String, trim: true }],
    deliveryText: {
      type: String,
      required: [true, "Delivery text is required"],
      trim: true,
    },
    sizes: [{ type: String, trim: true }],
    colors: [
      {
        name: { type: String, required: true, trim: true },
        hex: { type: String, required: true, trim: true },
      },
    ],
    category: { type: String, trim: true, index: true },
    careInstructions: [{ type: String, trim: true }],
    badge: { type: String, trim: true },
    isBestSeller: { type: Boolean, default: false },
    isBuiltForJourney: { type: Boolean, default: false },
  },
  {
    timestamps: true,          // adds createdAt & updatedAt automatically
    versionKey: false,         // removes __v field
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ---- Text index for search ---------------------------------------
ProductSchema.index({ title: "text", description: "text", category: "text" });

// ---- Model (singleton-safe for Next.js hot-reload) ---------------
const Product: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
