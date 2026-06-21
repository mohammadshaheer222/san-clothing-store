/**
 * app/api/reviews/[id]/route.ts
 * ----------------------------
 * PATCH /api/reviews/[id] — Update an existing review (admin only).
 * DELETE /api/reviews/[id] — Delete a review (admin only).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { updateReview, deleteReview } from "@/services/review.service";

const updateReviewSchema = z.object({
  authorName: z.string().min(1, "Author name must not be empty").optional(),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
  content: z.string().min(1, "Content must not be empty").optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

type RouteContext = { params: Promise<Record<string, string>> };

/**
 * PATCH /api/reviews/[id]
 * Update review details. Admin authorization required.
 */
export const PATCH = withErrorHandler(async (req: NextRequest, context?: RouteContext) => {
  if (!context) {
    return NextResponse.json({ success: false, error: "Missing context", statusCode: 400 }, { status: 400 });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const data = await validateBody(updateReviewSchema, req);
  const review = await updateReview(id, data);

  return successResponse(review, "Review updated successfully.");
});

/**
 * DELETE /api/reviews/[id]
 * Delete a review. Admin authorization required.
 */
export const DELETE = withErrorHandler(async (req: NextRequest, context?: RouteContext) => {
  if (!context) {
    return NextResponse.json({ success: false, error: "Missing context", statusCode: 400 }, { status: 400 });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const result = await deleteReview(id);

  return successResponse(result, "Review deleted successfully.");
});
