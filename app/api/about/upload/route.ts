import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { uploadImageToCloudinary } from "@/lib/cloudinary/upload";
import { BadRequest } from "@/lib/api/errors";

/**
 * POST /api/about/upload
 * Upload an image to Cloudinary (for About narrative section).
 * Admin auth required.
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

  // 2. Parse multipart form
  const form = await req.formData();
  const file = form.get("file");

  if (!file || typeof file === "string") {
    throw BadRequest("No image file provided.");
  }

  // 3. Upload to Cloudinary
  const result = await uploadImageToCloudinary(file as File, {
    folder: "san-clothing-store/about",
  });

  return successResponse(
    { url: result.url, publicId: result.publicId },
    "About image uploaded successfully."
  );
});
