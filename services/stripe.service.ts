/**
 * services/stripe.service.ts
 * --------------------------
 * Service functions for Stripe content database operations.
 */

import { connectDB } from "@/lib/db/mongoose";
import Stripe from "@/models/stripe.model";

/**
 * Serializes a mongoose Stripe document to a plain object.
 */
function serializeStripe(stripe: any) {
  return {
    id: stripe._id.toString(),
    key: stripe.key,
    content: stripe.content,
    isActive: stripe.isActive,
    createdAt: stripe.createdAt?.toISOString(),
    updatedAt: stripe.updatedAt?.toISOString(),
  };
}

/**
 * Fetches all active stripes and returns a key-value mapping of contents.
 * Safely falls back to default values if not configured in the database.
 */
export async function getStripes() {
  await connectDB();
  const stripes = await Stripe.find({ isActive: true }).lean();

  const mapping: Record<string, string[]> = {
    header: ["FREE SHIPPING ON PREPAID ORDERS"],
    marquee: ["Free Shipping on Prepaid Orders", "COD Available", "Featured Collection"],
  };

  for (const s of stripes) {
    mapping[s.key] = s.content;
  }

  return mapping;
}

/**
 * Fetches the raw Stripe documents.
 */
export async function getRawStripes() {
  await connectDB();
  const stripes = await Stripe.find().lean();
  return stripes.map(serializeStripe);
}

/**
 * Updates or creates a stripe configuration by its key.
 */
export async function updateStripe(key: string, content: string[], isActive: boolean = true) {
  await connectDB();
  const stripe = await Stripe.findOneAndUpdate(
    { key },
    { content, isActive },
    { new: true, upsert: true }
  ).lean();
  return serializeStripe(stripe);
}
