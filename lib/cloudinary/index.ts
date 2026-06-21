/**
 * lib/cloudinary/index.ts
 * -----------------------
 * Singleton Cloudinary v2 client.
 * Mirrors the singleton pattern used in lib/db/mongoose.ts so the
 * SDK is configured exactly once across Next.js hot-reloads.
 *
 * Required env vars (add to .env.local):
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 */

import { v2 as cloudinary } from "cloudinary";

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error(
    "Missing Cloudinary credentials. " +
      "Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and " +
      "CLOUDINARY_API_SECRET in .env.local"
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
