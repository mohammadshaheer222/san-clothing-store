/**
 * services/product.service.ts
 * ----------------------------
 * Business logic for products.
 * Route handlers should call these functions rather than touching
 * the database directly — keeps routes thin and logic testable.
 */

import { connectDB } from "@/lib/db/mongoose";
import { NotFound, BadRequest } from "@/lib/api/errors";
import { buildPaginationMeta, isValidObjectId } from "@/lib/utils";
import Product, { IProduct } from "@/models/product.model";
import { deleteImageFromCloudinary } from "@/lib/cloudinary/upload";
// ---- Types -------------------------------------------------------
export interface GetProductsOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isBestSeller?: boolean;
  isBuiltForJourney?: boolean;
}

export interface CreateProductData {
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating?: number;
  reviews?: number;
  image: string;
  /** Cloudinary public_id for the main image — used to delete the asset */
  imagePublicId?: string;
  images?: string[];
  /** Cloudinary public_ids for gallery images — used to delete the assets */
  imagePublicIds?: string[];
  deliveryText: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  category?: string;
  careInstructions?: string[];
  badge?: string;
  isBestSeller?: boolean;
  isBuiltForJourney?: boolean;
}

// ---- Helper to serialize Mongoose doc to plain object with id -----
function serializeProduct(product: any) {
  if (!product) return product;
  const serialized = JSON.parse(JSON.stringify(product));
  if (product._id) {
    serialized.id = product._id.toString();
  }
  return serialized;
}

// ---- Service functions -------------------------------------------

/**
 * Fetches a paginated list of products, with optional category & text search.
 */
export async function getAllProducts(options: GetProductsOptions = {}) {
  await connectDB();

  const { page = 1, limit = 12, category, search, isBestSeller, isBuiltForJourney } = options;
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };
  if (isBestSeller !== undefined) filter.isBestSeller = isBestSeller;
  if (isBuiltForJourney !== undefined) filter.isBuiltForJourney = isBuiltForJourney;

  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products: products.map(serializeProduct),
    pagination: buildPaginationMeta(page, limit, total),
  };
}

/**
 * Fetches a single product by its MongoDB ObjectId.
 * Throws 400 for invalid IDs and 404 for missing documents.
 */
export async function getProductById(id: string) {
  await connectDB();

  if (!isValidObjectId(id)) throw BadRequest("Invalid product ID format.");

  const product = await Product.findById(id).lean();
  if (!product) throw NotFound(`Product with id "${id}" not found.`);

  return serializeProduct(product);
}

/**
 * Creates a new product document.
 */
export async function createProduct(data: CreateProductData) {
  await connectDB();
  const product = await Product.create(data);
  return serializeProduct(product.toObject());
}

/**
 * Partially updates a product.
 * Throws 400 for invalid IDs and 404 for missing documents.
 */
export async function updateProduct(
  id: string,
  data: Partial<CreateProductData>
) {
  await connectDB();

  if (!isValidObjectId(id)) throw BadRequest("Invalid product ID format.");

  const product = await Product.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).lean();

  if (!product) throw NotFound(`Product with id "${id}" not found.`);

  return serializeProduct(product);
}

/**
 * Deletes a product by ID.
 * Before removing the DB document, it deletes all associated Cloudinary
 * images so no orphaned assets are left in the media library.
 *
 * Throws 400 for invalid IDs and 404 for missing documents.
 */
export async function deleteProduct(id: string) {
  await connectDB();

  if (!isValidObjectId(id)) throw BadRequest("Invalid product ID format.");

  // 1. Find the product first so we have the Cloudinary publicIds
  const product = await Product.findById(id).lean();
  if (!product) throw NotFound(`Product with id "${id}" not found.`);

  // 2. Collect all publicIds to delete from Cloudinary
  const idsToDelete: string[] = [];
  if (product.imagePublicId) idsToDelete.push(product.imagePublicId);
  if (product.imagePublicIds?.length) idsToDelete.push(...product.imagePublicIds);

  // 3. Delete Cloudinary assets in parallel (fire-and-forget errors are
  //    logged but don't block the DB deletion — avoids leaving stale docs
  //    if Cloudinary is temporarily unavailable)
  if (idsToDelete.length > 0) {
    await Promise.allSettled(
      idsToDelete.map((publicId) =>
        deleteImageFromCloudinary(publicId).catch((err) =>
          console.error(`[Cloudinary] Failed to delete "${publicId}":`, err)
        )
      )
    );
  }

  // 4. Delete the Mongoose document
  await Product.findByIdAndDelete(id);

  return { deleted: true, id };
}

/**
 * Fetches related products.
 * Returns products of the same category (excluding current),
 * fallback to other products if not enough.
 */
export async function getRelatedProducts(id: string, limit: number = 4) {
  await connectDB();

  if (!isValidObjectId(id)) {
    // If not a valid ObjectId (e.g., mock ID fallback), return random/latest products
    const products = await Product.find().limit(limit).lean();
    return products.map(serializeProduct);
  }

  const currentProduct = await Product.findById(id).lean();
  if (!currentProduct) {
    // Current product not found in DB, return latest products
    const products = await Product.find().limit(limit).lean();
    return products.map(serializeProduct);
  }

  // 1. Fetch products in same category excluding current product
  const filter: any = { _id: { $ne: id } };
  if (currentProduct.category) {
    filter.category = currentProduct.category;
  }

  let related = await Product.find(filter).limit(limit).lean();

  // 2. If we don't have enough related products, fill up with other products
  if (related.length < limit) {
    const fillLimit = limit - related.length;
    const excludeIds = [id, ...related.map((p) => p._id.toString())];
    const fillProducts = await Product.find({ _id: { $nin: excludeIds } })
      .limit(fillLimit)
      .lean();
    related = [...related, ...fillProducts];
  }

  return related.map(serializeProduct);
}
