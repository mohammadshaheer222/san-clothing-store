/**
 * models/stripe.model.ts
 * ---------------------
 * Mongoose schema & model for header and marquee stripes.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStripe extends Document {
  key: string;       // e.g. "header" or "marquee"
  content: string[]; // List of texts for the stripe
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StripeSchema = new Schema<IStripe>(
  {
    key: {
      type: String,
      required: [true, "Key is required"],
      unique: true,
      trim: true,
      index: true,
    },
    content: {
      type: [String],
      required: [true, "Content array is required"],
      default: [],
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

const Stripe: Model<IStripe> =
  (mongoose.models.Stripe as Model<IStripe>) ||
  mongoose.model<IStripe>("Stripe", StripeSchema);

export default Stripe;
