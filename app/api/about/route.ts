import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { getAboutContent, updateAboutContent } from "@/services/about.service";

const aboutSchema = z.object({
  heroCaption: z.string().min(1, "Hero caption is required"),
  heroTitle: z.string().min(1, "Hero title is required"),
  heroDescription: z.string().min(1, "Hero description is required"),
  narrativeTitle1: z.string().min(1, "Narrative title 1 is required"),
  narrativeDescription1: z.string().min(1, "Narrative description 1 is required"),
  narrativeTitle2: z.string().min(1, "Narrative title 2 is required"),
  narrativeDescription2: z.string().min(1, "Narrative description 2 is required"),
  narrativeImage: z.string().min(1, "Narrative image is required"),
  narrativeImagePublicId: z.string().optional(),
  quoteText: z.string().min(1, "Quote text is required"),
  quoteAuthor: z.string().min(1, "Quote author is required"),
});

/**
 * GET /api/about
 * Retrieves the About page content.
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const content = await getAboutContent();
  return successResponse(content, "About page content retrieved successfully.");
});

/**
 * POST /api/about
 * Updates or creates the About page content. Admin session required.
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const data = await validateBody(aboutSchema, req);
  const content = await updateAboutContent(data);

  return successResponse(content, "About page content updated successfully.");
});
