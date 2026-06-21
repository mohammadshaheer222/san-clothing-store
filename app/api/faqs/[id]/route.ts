/**
 * app/api/faqs/[id]/route.ts
 * -------------------------
 * PATCH /api/faqs/[id] — Update an existing FAQ (admin only).
 * DELETE /api/faqs/[id] — Delete an FAQ (admin only).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { updateFaq, deleteFaq } from "@/services/faq.service";

const updateFaqSchema = z.object({
  question: z.string().min(1, "Question must not be empty").optional(),
  answer: z.string().min(1, "Answer must not be empty").optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

type RouteContext = { params: Promise<Record<string, string>> };

/**
 * PATCH /api/faqs/[id]
 * Update FAQ details. Admin authorization required.
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
  const data = await validateBody(updateFaqSchema, req);
  const faq = await updateFaq(id, data);

  return successResponse(faq, "FAQ updated successfully.");
});

/**
 * DELETE /api/faqs/[id]
 * Delete an FAQ. Admin authorization required.
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
  const result = await deleteFaq(id);

  return successResponse(result, "FAQ deleted successfully.");
});
