/**
 * app/api/stripes/route.ts
 * -----------------------
 * GET /api/stripes — Retrieve stripe contents (header and marquee).
 * PUT /api/stripes — Update stripe contents (admin only).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { getStripes, getRawStripes, updateStripe } from "@/services/stripe.service";

const stripeSchema = z.object({
  key: z.enum(["header", "marquee"]),
  content: z.array(z.string()),
  isActive: z.boolean().default(true),
});

/**
 * GET /api/stripes
 * Retrieve stripes. Admin session required if query param ?admin=true is specified.
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
    const stripes = await getRawStripes();
    return successResponse(stripes, "All stripes retrieved successfully.");
  }

  const stripes = await getStripes();
  return successResponse(stripes, "Active stripes retrieved successfully.");
});

/**
 * PUT /api/stripes
 * Update stripe configuration. Admin session required.
 */
export const PUT = withErrorHandler(async (req: NextRequest) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const data = await validateBody(stripeSchema, req);
  const stripe = await updateStripe(data.key, data.content, data.isActive);

  return successResponse(stripe, "Stripe updated successfully.");
});
