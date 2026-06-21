/**
 * models/faq.model.ts
 * -------------------
 * Mongoose schema & model for the FAQ collection.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFAQItem extends Document {
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FAQItemSchema = new Schema<IFAQItem>(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
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

const FAQItem: Model<IFAQItem> =
  (mongoose.models.FAQItem as Model<IFAQItem>) ||
  mongoose.model<IFAQItem>("FAQItem", FAQItemSchema);

export default FAQItem;
