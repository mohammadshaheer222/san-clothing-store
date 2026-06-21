/**
 * app/api/reviews/route.ts
 * ---------------------
 * GET /api/reviews — Retrieve reviews (filtered by active for store, or all for admin).
 * POST /api/reviews — Create a new review (admin only).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { createReview, getStoreReviews, getAllReviews } from "@/services/review.service";

const reviewSchema = z.object({
  authorName: z.string().min(1, "Author name is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  content: z.string().min(1, "Content is required"),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

/**
 * GET /api/reviews
 * Retrieves reviews. Admin session required if query param ?admin=true is specified.
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const adminMode = searchParams.get("admin") === "true";

  if (adminMode) {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", statusCode: 401 },
        { status: 401 }
      );
    }
    const reviews = await getAllReviews();
    return successResponse(reviews, "All reviews retrieved successfully.");
  }

  const reviews = await getStoreReviews();
  return successResponse(reviews, "Store reviews retrieved successfully.");
});

/**
 * POST /api/reviews
 * Create a new review. Admin session required.
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const data = await validateBody(reviewSchema, req);
  const review = await createReview(data);

  return successResponse(review, "Review created successfully.", 201);
});
