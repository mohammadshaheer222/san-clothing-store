/**
 * app/api/products/upload/route.ts
 * ---------------------------------
 * POST /api/products/upload
 *
 * Accepts a multipart/form-data request with a single "file" field.
 * Validates the file (type + size), compresses it, and uploads to
 * Cloudinary. Returns { url, publicId } for the caller to persist
 * alongside the product document.
 *
 * Auth: requires a valid admin JWT cookie (same guard as other
 *       admin-only routes).
 */

import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { BadRequest } from "@/lib/api/errors";
import { getSession } from "@/lib/auth/session";
import { uploadImageToCloudinary } from "@/lib/cloudinary/upload";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const POST = withErrorHandler(async (req: NextRequest) => {
  // ── 1. Auth guard ───────────────────────────────────────────────
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  // ── 2. Parse multipart form data ────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    throw BadRequest("Request must be multipart/form-data.");
  }

  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    throw BadRequest('A "file" field is required in the form data.');
  }

  // ── 3. Validate file type ────────────────────────────────────────
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw BadRequest(
      `Unsupported file type "${file.type}". Allowed: ${ALLOWED_TYPES.join(", ")}.`
    );
  }

  // ── 4. Validate file size ────────────────────────────────────────
  if (file.size > MAX_FILE_SIZE) {
    throw BadRequest(
      `File too large (${(file.size / 1024 / 1024).toFixed(2)} MB). Maximum is 5 MB.`
    );
  }

  // ── 5. Upload (compress + stream to Cloudinary) ─────────────────
  const result = await uploadImageToCloudinary(file);

  return successResponse(result, "Image uploaded successfully.", 201);
});
