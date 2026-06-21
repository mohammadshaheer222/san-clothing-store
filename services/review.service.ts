/**
 * services/review.service.ts
 * -------------------------
 * Business logic for review items.
 */

import { connectDB } from "@/lib/db/mongoose";
import { NotFound } from "@/lib/api/errors";
import ReviewItem from "@/models/review.model";

function serializeReview(doc: any) {
  if (!doc) return null;
  const obj = { ...doc };
  if (doc._id) obj.id = doc._id.toString();
  return obj;
}

/**
 * Fetch only active reviews for storefront display.
 */
export async function getStoreReviews() {
  await connectDB();
  const items = await ReviewItem.find({ isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return items.map(serializeReview);
}

/**
 * Fetch all reviews for admin dashboard view.
 */
export async function getAllReviews() {
  await connectDB();
  const items = await ReviewItem.find({})
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return items.map(serializeReview);
}

/**
 * Create a new review item.
 */
export async function createReview(data: {
  authorName: string;
  rating: number;
  content: string;
  order?: number;
  isActive?: boolean;
}) {
  await connectDB();
  const item = await ReviewItem.create(data);
  return serializeReview(item.toObject());
}

/**
 * Update an existing review item.
 */
export async function updateReview(
  id: string,
  data: {
    authorName?: string;
    rating?: number;
    content?: string;
    order?: number;
    isActive?: boolean;
  }
) {
  await connectDB();
  const item = await ReviewItem.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).lean();

  if (!item) {
    throw NotFound(`Review with id "${id}" not found`);
  }

  return serializeReview(item);
}

/**
 * Delete a review item.
 */
export async function deleteReview(id: string) {
  await connectDB();
  const item = await ReviewItem.findByIdAndDelete(id).lean();
  if (!item) {
    throw NotFound(`Review with id "${id}" not found`);
  }
  return serializeReview(item);
}
