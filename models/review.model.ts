/**
 * models/review.model.ts
 * -------------------
 * Mongoose schema & model for the Review collection.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReviewItem extends Document {
  authorName: string;
  rating: number;
  content: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewItemSchema = new Schema<IReviewItem>(
  {
    authorName: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ReviewItem: Model<IReviewItem> =
  (mongoose.models.ReviewItem as Model<IReviewItem>) ||
  mongoose.model<IReviewItem>("ReviewItem", ReviewItemSchema);

export default ReviewItem;
