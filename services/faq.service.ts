/**
 * services/faq.service.ts
 * -----------------------
 * Business logic for FAQ items.
 */

import { connectDB } from "@/lib/db/mongoose";
import { NotFound } from "@/lib/api/errors";
import FAQItem from "@/models/faq.model";

function serializeFAQ(doc: any) {
  if (!doc) return null;
  const obj = { ...doc };
  if (doc._id) obj.id = doc._id.toString();
  return obj;
}

/**
 * Fetch only active FAQs for storefront display.
 */
export async function getStoreFaqs() {
  await connectDB();
  const items = await FAQItem.find({ isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return items.map(serializeFAQ);
}

/**
 * Fetch all FAQs for admin dashboard view.
 */
export async function getAllFaqs() {
  await connectDB();
  const items = await FAQItem.find({})
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return items.map(serializeFAQ);
}

/**
 * Create a new FAQ item.
 */
export async function createFaq(data: { question: string; answer: string; order?: number; isActive?: boolean }) {
  await connectDB();
  const item = await FAQItem.create(data);
  return serializeFAQ(item.toObject());
}

/**
 * Update an existing FAQ item.
 */
export async function updateFaq(
  id: string,
  data: { question?: string; answer?: string; order?: number; isActive?: boolean }
) {
  await connectDB();
  const item = await FAQItem.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).lean();

  if (!item) {
    throw NotFound(`FAQ with id "${id}" not found`);
  }

  return serializeFAQ(item);
}

/**
 * Delete an FAQ item.
 */
export async function deleteFaq(id: string) {
  await connectDB();
  const item = await FAQItem.findByIdAndDelete(id).lean();
  if (!item) {
    throw NotFound(`FAQ with id "${id}" not found`);
  }
  return serializeFAQ(item);
}

