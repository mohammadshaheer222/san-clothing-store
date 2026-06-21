/**
 * scripts/seed-banners.ts
 * -----------------------
 * Seeds initial hero and collection-promo banners from mock data.
 * Skips each type if a banner already exists in the DB.
 *
 * Usage:
 *   npm run seed:banners
 */

import "dotenv/config";
import mongoose from "mongoose";
import { HOME_HERO_DATA, COLLECTION_PROMO_DATA } from "../constants/mock-data";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const BannerSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, index: true },
    title: String,
    buttonText: String,
    buttonLink: String,
    isActive: { type: Boolean, default: true },
    subtitle: String,
    buttonVariant: String,
    backgroundImage: String,
    description: String,
    leftImage: String,
    rightImage: String,
  },
  { timestamps: true, versionKey: false }
);

const Banner =
  mongoose.models.Banner ?? mongoose.model("Banner", BannerSchema);

async function seed() {
  console.log("🔌  Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI!);
  console.log("✅  Connected");

  // ---- Hero banner -------------------------------------------------
  const existingHero = await Banner.findOne({ type: "hero" });
  if (existingHero) {
    console.log("ℹ️   Hero banner already exists. Skipping.");
  } else {
    await Banner.create({
      type: "hero",
      title: typeof HOME_HERO_DATA.title === "string"
        ? HOME_HERO_DATA.title
        : "8 New Colors. Moving Fast.",
      subtitle: HOME_HERO_DATA.subtitle,
      buttonText: HOME_HERO_DATA.buttonText,
      buttonLink: HOME_HERO_DATA.buttonLink,
      buttonVariant: HOME_HERO_DATA.buttonVariant,
      backgroundImage: HOME_HERO_DATA.backgroundImage,
      isActive: true,
    });
    console.log("🎉  Hero banner seeded!");
  }

  // ---- Collection Promo banner -------------------------------------
  const existingPromo = await Banner.findOne({ type: "collection-promo" });
  if (existingPromo) {
    console.log("ℹ️   Collection-promo banner already exists. Skipping.");
  } else {
    await Banner.create({
      type: "collection-promo",
      title: COLLECTION_PROMO_DATA.title,
      description: COLLECTION_PROMO_DATA.description,
      buttonText: COLLECTION_PROMO_DATA.buttonText,
      buttonLink: COLLECTION_PROMO_DATA.buttonLink,
      leftImage: COLLECTION_PROMO_DATA.leftImage,
      rightImage: COLLECTION_PROMO_DATA.rightImage,
      isActive: true,
    });
    console.log("🎉  Collection-promo banner seeded!");
  }

  await mongoose.disconnect();
  console.log("🔌  Disconnected");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
