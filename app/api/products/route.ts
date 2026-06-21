/**
 * app/api/products/route.ts
 * -------------------------
 * GET /api/products — Fetch paginated products with optional filters.
 * POST /api/products — Create a new product (admin authentication required).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { createProduct, getAllProducts } from "@/services/product.service";

// ---- Zod Schema for Creating a Product -----------------------------
const colorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color hex must be a valid hex color code"),
});

const createProductSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be under 200 characters"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  oldPrice: z.number().min(0).optional(),
  discount: z.string().optional(),
  rating: z.number().min(0).max(5).default(0),
  reviews: z.number().min(0).default(0),
  image: z.string().url("Main image must be a valid URL"),
  imagePublicId: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  imagePublicIds: z.array(z.string()).optional(),
  deliveryText: z.string().min(1, "Delivery text is required"),
  sizes: z.array(z.string()).optional(),
  colors: z.array(colorSchema).optional(),
  category: z.string().optional(),
  careInstructions: z.array(z.string()).optional(),
  badge: z.string().optional(),
  isBestSeller: z.boolean().optional(),
  isBuiltForJourney: z.boolean().optional(),
});

// ---- Route Handlers ------------------------------------------------

/**
 * GET /api/products
 * Fetch products list. Supports query parameters: page, limit, category, search, isBestSeller, isBuiltForJourney.
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  
  const isBestSellerVal = searchParams.get("isBestSeller");
  const isBestSeller = isBestSellerVal !== null ? isBestSellerVal === "true" : undefined;

  const isBuiltForJourneyVal = searchParams.get("isBuiltForJourney");
  const isBuiltForJourney = isBuiltForJourneyVal !== null ? isBuiltForJourneyVal === "true" : undefined;

  const result = await getAllProducts({
    page,
    limit,
    category,
    search,
    isBestSeller,
    isBuiltForJourney,
  });

  return successResponse(result, "Products retrieved successfully.");
});

/**
 * POST /api/products
 * Create a new product. Admin authorization cookie required.
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  // 1. Auth guard
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  // 2. Validate input schema
  const data = await validateBody(createProductSchema, req);

  // 3. Create product
  const product = await createProduct(data);

  return successResponse(product, "Product created successfully.", 201);
});
