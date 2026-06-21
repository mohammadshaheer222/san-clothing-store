/**
 * app/api/banners/route.ts
 * ------------------------
 * GET  /api/banners?type=hero|collection-promo — fetch active banner (public).
 * POST /api/banners — create/update banner (admin only).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { getActiveBanner, getAllBanners, upsertBanner } from "@/services/banner.service";
import { BadRequest } from "@/lib/api/errors";

const VALID_TYPES = ["hero", "collection-promo", "homepage-sections"] as const;

const upsertBannerSchema = z.object({
  type: z.enum(["hero", "collection-promo", "homepage-sections"]),
  title: z.string().min(1, "Title is required").optional(),
  buttonText: z.string().min(1, "Button text is required").optional(),
  buttonLink: z.string().min(1, "Button link is required").optional(),
  isActive: z.boolean().default(true),
  // Hero fields
  subtitle: z.string().optional(),
  buttonVariant: z.enum(["primary", "secondary", "outline", "ghost", "white"]).optional(),
  backgroundImage: z.string().url("Background image must be a valid URL").optional(),
  backgroundImagePublicId: z.string().optional(),
  // Collection promo fields
  description: z.string().optional(),
  leftImage: z.string().url("Left image must be a valid URL").optional().or(z.literal("")),
  leftImagePublicId: z.string().optional(),
  rightImage: z.string().url("Right image must be a valid URL").optional().or(z.literal("")),
  rightImagePublicId: z.string().optional(),
  // Homepage section toggles
  showCollectionSection: z.boolean().optional(),
  showBestSellerSection: z.boolean().optional(),
  showReviewsSection: z.boolean().optional(),
  collectionTitle: z.string().optional(),
  collectionDescription: z.string().optional(),
  bestSellerTitle: z.string().optional(),
  bestSellerDescription: z.string().optional(),
  reviewsTitle: z.string().optional(),
  reviewsDescription: z.string().optional(),
});

/**
 * GET /api/banners
 * - ?type=hero|collection-promo  → returns single active banner
 * - (no type param)              → returns all banners (admin convenience)
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type) {
    if (!VALID_TYPES.includes(type as any)) {
      throw BadRequest(`Invalid banner type. Must be one of: ${VALID_TYPES.join(", ")}`);
    }
    const banner = await getActiveBanner(type as "hero" | "collection-promo");
    return successResponse(banner, "Banner retrieved successfully.");
  }

  // No type — return all (admin use)
  const banners = await getAllBanners();
  return successResponse(banners, "Banners retrieved successfully.");
});

/**
 * POST /api/banners
 * Create or update a banner. Admin auth required.
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const data = await validateBody(upsertBannerSchema, req);
  const { type, ...rest } = data;
  const banner = await upsertBanner(type, rest);

  return successResponse(banner, "Banner saved successfully.", 200);
});
