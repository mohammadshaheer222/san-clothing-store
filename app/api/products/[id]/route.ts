/**
 * app/api/products/[id]/route.ts
 * ------------------------------
 * GET /api/products/[id] — Fetch a single product by ID.
 * PATCH /api/products/[id] — Update an existing product (admin only).
 * DELETE /api/products/[id] — Delete a product and its Cloudinary media (admin only).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { getProductById, updateProduct, deleteProduct } from "@/services/product.service";

// ---- Zod Schema for Updating a Product -----------------------------
const colorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color hex must be a valid hex color code"),
});

const updateProductSchema = z.object({
  title: z.string().min(1, "Title must not be empty").max(200, "Title must be under 200 characters").optional(),
  description: z.string().min(1, "Description must not be empty").optional(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  oldPrice: z.number().min(0).optional().nullable(),
  discount: z.string().optional().nullable(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().min(0).optional(),
  image: z.string().url("Main image must be a valid URL").optional(),
  imagePublicId: z.string().optional().nullable(),
  images: z.array(z.string().url()).optional(),
  imagePublicIds: z.array(z.string()).optional(),
  deliveryText: z.string().min(1, "Delivery text must not be empty").optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(colorSchema).optional(),
  category: z.string().optional(),
  careInstructions: z.array(z.string()).optional(),
  badge: z.string().optional().nullable(),
  isBestSeller: z.boolean().optional(),
  isBuiltForJourney: z.boolean().optional(),
});

type RouteContext = { params: Promise<Record<string, string>> };

/**
 * GET /api/products/[id]
 * Fetch a single product details.
 */
export const GET = withErrorHandler(async (req: NextRequest, context?: RouteContext) => {
  if (!context) {
    return NextResponse.json({ success: false, error: "Missing context", statusCode: 400 }, { status: 400 });
  }
  const { id } = await context.params;
  const product = await getProductById(id);
  return successResponse(product, "Product retrieved successfully.");
});

/**
 * PATCH /api/products/[id]
 * Update a product details. Admin authorization required.
 */
export const PATCH = withErrorHandler(async (req: NextRequest, context?: RouteContext) => {
  if (!context) {
    return NextResponse.json({ success: false, error: "Missing context", statusCode: 400 }, { status: 400 });
  }
  
  // 1. Auth guard
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  // 2. Validate input schema
  const rawBody = await validateBody(updateProductSchema, req);

  // Normalise optional nulls for Mongoose update
  const data: any = { ...rawBody };
  if (data.oldPrice === null) data.oldPrice = undefined;
  if (data.discount === null) data.discount = undefined;
  if (data.badge === null) data.badge = undefined;
  if (data.imagePublicId === null) data.imagePublicId = undefined;

  // 3. Update product
  const product = await updateProduct(id, data);

  return successResponse(product, "Product updated successfully.");
});

/**
 * DELETE /api/products/[id]
 * Delete a product. Admin authorization required.
 */
export const DELETE = withErrorHandler(async (req: NextRequest, context?: RouteContext) => {
  if (!context) {
    return NextResponse.json({ success: false, error: "Missing context", statusCode: 400 }, { status: 400 });
  }

  // 1. Auth guard
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  // 2. Delete product (automatically cleans up associated Cloudinary images)
  const result = await deleteProduct(id);

  return successResponse(result, "Product deleted successfully.");
});
