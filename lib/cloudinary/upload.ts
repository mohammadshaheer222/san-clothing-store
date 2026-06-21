/**
 * lib/cloudinary/upload.ts
 * ------------------------
 * Reusable Cloudinary upload & delete utilities.
 *
 * uploadImageToCloudinary
 *   - Accepts a File (from FormData), a Buffer, or a base64 data-URI.
 *   - Compresses with sharp: max 1 200 px wide, WebP, quality 80.
 *   - Streams directly to Cloudinary — no temp files written to disk.
 *   - Returns { url, publicId } for storage alongside the DB document.
 *
 * deleteImageFromCloudinary
 *   - Destroys a Cloudinary asset by its publicId.
 *   - Called automatically when a product is deleted.
 *
 * extractPublicId
 *   - Parses the publicId out of a Cloudinary URL (fallback helper).
 */

import sharp from "sharp";
import cloudinary from "./index";
import { InternalError } from "@/lib/api/errors";

// ---- Types -------------------------------------------------------

export interface UploadResult {
  /** Full HTTPS Cloudinary delivery URL */
  url: string;
  /** Cloudinary public_id, e.g. "san-clothing-store/products/abc123" */
  publicId: string;
}

export interface UploadOptions {
  /** Cloudinary folder. Defaults to "san-clothing-store/products" */
  folder?: string;
  /** Max width in pixels before resizing. Defaults to 1200. */
  maxWidth?: number;
  /** WebP quality 1–100. Defaults to 80. */
  quality?: number;
}

// ---- Helpers -----------------------------------------------------

/**
 * Converts a web File object (from FormData) to a Node.js Buffer.
 */
async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Compresses a raw image buffer with sharp.
 * Output: WebP, max `maxWidth` pixels wide (maintains aspect ratio),
 * at the given `quality`.
 */
async function compressImage(
  input: Buffer,
  maxWidth = 1200,
  quality = 80
): Promise<Buffer> {
  return sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();
}

/**
 * Parses the Cloudinary public_id from a full Cloudinary URL.
 * Use as a last-resort fallback — prefer storing publicId explicitly.
 *
 * Example input:
 *   https://res.cloudinary.com/demo/image/upload/v1234567890/san-clothing-store/products/abc123.webp
 * Returns:
 *   san-clothing-store/products/abc123
 */
export function extractPublicId(cloudinaryUrl: string): string | null {
  try {
    const url = new URL(cloudinaryUrl);
    // pathname: /demo/image/upload/v.../folder/publicid.ext
    const parts = url.pathname.split("/");
    const uploadIdx = parts.indexOf("upload");
    if (uploadIdx === -1) return null;

    // skip the version segment (starts with "v" followed by digits)
    let startIdx = uploadIdx + 1;
    if (/^v\d+$/.test(parts[startIdx])) startIdx++;

    const withExt = parts.slice(startIdx).join("/");
    // strip file extension
    return withExt.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}

// ---- Core functions ----------------------------------------------

/**
 * Uploads an image to Cloudinary after compressing it.
 *
 * @param source  - A web File (from FormData), a Buffer, or a
 *                  base64 data-URI string (e.g. "data:image/png;base64,...")
 * @param options - Optional folder, maxWidth, quality overrides.
 * @returns       - { url, publicId }
 */
export async function uploadImageToCloudinary(
  source: File | Buffer | string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const {
    folder = "san-clothing-store/products",
    maxWidth = 1200,
    quality = 80,
  } = options;

  // 1. Normalise input to a Buffer
  let rawBuffer: Buffer;

  if (source instanceof File) {
    rawBuffer = await fileToBuffer(source);
  } else if (Buffer.isBuffer(source)) {
    rawBuffer = source;
  } else {
    // Data-URI string → strip the header, decode base64
    const base64Data = source.replace(/^data:image\/\w+;base64,/, "");
    rawBuffer = Buffer.from(base64Data, "base64");
  }

  // 2. Compress
  const compressed = await compressImage(rawBuffer, maxWidth, quality);

  // 3. Upload via upload_stream (no temp disk I/O)
  return new Promise<UploadResult>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        // Cloudinary will infer format from the content; we already
        // converted to WebP so it will be stored as .webp
      },
      (error, result) => {
        if (error || !result) {
          reject(
            InternalError(
              `Cloudinary upload failed: ${error?.message ?? "unknown error"}`
            )
          );
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    stream.end(compressed);
  });
}

/**
 * Deletes an image from Cloudinary by its public_id.
 * Throws an InternalError (caught by withErrorHandler) on failure.
 *
 * @param publicId - The Cloudinary public_id stored with the product.
 */
export async function deleteImageFromCloudinary(
  publicId: string
): Promise<void> {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw InternalError(
      `Failed to delete Cloudinary asset "${publicId}": ${result.result}`
    );
  }
}
