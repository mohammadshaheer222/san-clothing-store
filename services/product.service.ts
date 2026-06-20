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
// ---- Types -------------------------------------------------------
export interface GetProductsOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
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
  images?: string[];
  deliveryText: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  category?: string;
  careInstructions?: string[];
  badge?: string;
}

// ---- Service functions -------------------------------------------

/**
 * Fetches a paginated list of products, with optional category & text search.
 */
export async function getAllProducts(options: GetProductsOptions = {}) {
  await connectDB();

  const { page = 1, limit = 12, category, search } = options;
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products,
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

  return product;
}

/**
 * Creates a new product document.
 */
export async function createProduct(data: CreateProductData) {
  await connectDB();
  const product = await Product.create(data);
  return product.toObject();
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

  return product;
}

/**
 * Deletes a product by ID.
 * Throws 400 for invalid IDs and 404 for missing documents.
 */
export async function deleteProduct(id: string) {
  await connectDB();

  if (!isValidObjectId(id)) throw BadRequest("Invalid product ID format.");

  const product = await Product.findByIdAndDelete(id).lean();
  if (!product) throw NotFound(`Product with id "${id}" not found.`);

  return { deleted: true, id };
}
