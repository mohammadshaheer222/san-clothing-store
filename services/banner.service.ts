/**
 * services/banner.service.ts
 * --------------------------
 * Business logic for site banners (hero, collection-promo).
 * Routes should call these functions — never touch the DB directly.
 */

import { connectDB } from "@/lib/db/mongoose";
import { NotFound, BadRequest } from "@/lib/api/errors";
import Banner from "@/models/banner.model";
import { BannerType } from "@/types";
import { deleteImageFromCloudinary } from "@/lib/cloudinary/upload";

// ---- Helper --------------------------------------------------------
function serializeBanner(doc: any) {
  if (!doc) return null;
  const obj = { ...doc };
  if (doc._id) obj.id = doc._id.toString();
  return obj;
}

// ---- Service functions --------------------------------------------

/**
 * Fetch the active banner for a given type.
 * Returns null if none exists — callers should fall back to mock data.
 */
export async function getActiveBanner(type: BannerType) {
  await connectDB();
  const banner = await Banner.findOne({ type, isActive: true })
    .sort({ updatedAt: -1 })
    .lean();
  return serializeBanner(banner);
}

/**
 * Fetch ALL banners (for admin listing).
 */
export async function getAllBanners() {
  await connectDB();
  const banners = await Banner.find({}).sort({ type: 1, updatedAt: -1 }).lean();
  return banners.map(serializeBanner);
}

export interface UpsertBannerData {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive?: boolean;
  subtitle?: string;
  buttonVariant?: string;
  backgroundImage?: string;
  backgroundImagePublicId?: string;
  description?: string;
  leftImage?: string;
  leftImagePublicId?: string;
  rightImage?: string;
  rightImagePublicId?: string;
  showCollectionSection?: boolean;
  showBestSellerSection?: boolean;
}

/**
 * Create-or-update the banner for a given type.
 * Uses findOneAndUpdate with upsert so there is always at most one banner per type.
 * If images are being replaced, deletes old Cloudinary assets.
 */
export async function upsertBanner(type: BannerType, data: UpsertBannerData) {
  await connectDB();

  // Before updating, check for old Cloudinary assets that need deletion
  const existing = type !== "homepage-sections" ? await Banner.findOne({ type }).lean() : null;
  if (existing) {
    const toDelete: string[] = [];
    if (data.backgroundImage && existing.backgroundImagePublicId &&
        data.backgroundImage !== existing.backgroundImage) {
      toDelete.push(existing.backgroundImagePublicId);
    }
    if (data.leftImage && existing.leftImagePublicId &&
        data.leftImage !== existing.leftImage) {
      toDelete.push(existing.leftImagePublicId);
    }
    if (data.rightImage && existing.rightImagePublicId &&
        data.rightImage !== existing.rightImage) {
      toDelete.push(existing.rightImagePublicId);
    }
    if (toDelete.length > 0) {
      await Promise.allSettled(
        toDelete.map((pid) =>
          deleteImageFromCloudinary(pid).catch((err) =>
            console.error(`[Cloudinary] Failed to delete "${pid}":`, err)
          )
        )
      );
    }
  }

  const banner = await Banner.findOneAndUpdate(
    { type },
    { $set: { ...data, type } },
    { new: true, upsert: true, runValidators: true }
  ).lean();

  return serializeBanner(banner);
}
