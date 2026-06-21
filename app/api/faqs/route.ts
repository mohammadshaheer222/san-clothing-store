/**
 * app/api/faqs/route.ts
 * ---------------------
 * GET /api/faqs — Retrieve FAQs (filtered by active for store, or all for admin).
 * POST /api/faqs — Create a new FAQ (admin only).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { createFaq, getStoreFaqs, getAllFaqs } from "@/services/faq.service";

const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

/**
 * GET /api/faqs
 * Retrieves FAQs. Admin session required if query param ?admin=true is specified.
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
    const faqs = await getAllFaqs();
    return successResponse(faqs, "All FAQs retrieved successfully.");
  }

  const faqs = await getStoreFaqs();
  return successResponse(faqs, "Store FAQs retrieved successfully.");
});

/**
 * POST /api/faqs
 * Create a new FAQ. Admin session required.
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const data = await validateBody(faqSchema, req);
  const faq = await createFaq(data);

  return successResponse(faq, "FAQ created successfully.", 201);
});
