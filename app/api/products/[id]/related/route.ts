/**
 * app/api/products/[id]/related/route.ts
 * --------------------------------------
 * GET /api/products/[id]/related — Fetch related products by ID.
 */

import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getRelatedProducts } from "@/services/product.service";

type RouteContext = { params: Promise<Record<string, string>> };

/**
 * GET /api/products/[id]/related
 * Fetch related products.
 */
export const GET = withErrorHandler(async (req: NextRequest, context?: RouteContext) => {
  if (!context) {
    return NextResponse.json({ success: false, error: "Missing context", statusCode: 400 }, { status: 400 });
  }
  const { id } = await context.params;
  const related = await getRelatedProducts(id);
  return successResponse(related, "Related products retrieved successfully.");
});
