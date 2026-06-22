import { connectDB } from "@/lib/db/mongoose";
import { NotFound } from "@/lib/api/errors";
import ValueItem from "@/models/value.model";

const defaultValues = [
  {
    title: "Timeless Aesthetic",
    description: "We design refined, minimalist silhouettes that defy the cycle of trends, building a lasting wardrobe for years to come.",
    iconName: "Compass",
    order: 0,
    isActive: true,
  },
  {
    title: "Responsible Production",
    description: "Our products are crafted in limited batches, ensuring zero inventory waste while supporting fair wages and safe workshops.",
    iconName: "ShieldCheck",
    order: 1,
    isActive: true,
  },
  {
    title: "Premium Materials",
    description: "Selected for touch and durability, we specialize in high-grade organic linen, extra-fine merino wool, and long-staple cotton.",
    iconName: "Gem",
    order: 2,
    isActive: true,
  },
];

async function initializeDefaultValuesIfNeeded() {
  const count = await ValueItem.countDocuments();
  if (count === 0) {
    await ValueItem.insertMany(defaultValues);
  }
}

function serializeValue(doc: any) {
  if (!doc) return null;
  const obj = { ...doc };
  if (doc._id) obj.id = doc._id.toString();
  return obj;
}

/**
 * Fetch active brand values.
 */
export async function getStoreValues() {
  await connectDB();
  await initializeDefaultValuesIfNeeded();
  const items = await ValueItem.find({ isActive: true })
    .sort({ order: 1, createdAt: 1 })
    .lean();
  return items.map(serializeValue);
}

/**
 * Fetch all values (for admin dashboard).
 */
export async function getAllValues() {
  await connectDB();
  await initializeDefaultValuesIfNeeded();
  const items = await ValueItem.find({})
    .sort({ order: 1, createdAt: 1 })
    .lean();
  return items.map(serializeValue);
}

/**
 * Create a new value.
 */
export async function createValue(data: { title: string; description: string; iconName: string; order?: number; isActive?: boolean }) {
  await connectDB();
  const item = await ValueItem.create(data);
  return serializeValue(item.toObject());
}

/**
 * Update an existing value.
 */
export async function updateValue(
  id: string,
  data: { title?: string; description?: string; iconName?: string; order?: number; isActive?: boolean }
) {
  await connectDB();
  const item = await ValueItem.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).lean();

  if (!item) {
    throw NotFound(`Value with id "${id}" not found`);
  }

  return serializeValue(item);
}

/**
 * Delete a value.
 */
export async function deleteValue(id: string) {
  await connectDB();
  const item = await ValueItem.findByIdAndDelete(id).lean();
  if (!item) {
    throw NotFound(`Value with id "${id}" not found`);
  }
  return serializeValue(item);
}
