/**
 * scripts/clear-db.ts
 * -------------------
 * Deletes all products and banners from MongoDB.
 *
 * Usage:
 *   npx tsx scripts/clear-db.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import Product from "../models/product.model";
import Banner from "../models/banner.model";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

async function clear() {
  console.log("🔌  Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI!);
  console.log("✅  Connected");

  console.log("🗑️   Deleting all products…");
  const productRes = await Product.deleteMany({});
  console.log(`✅  Deleted ${productRes.deletedCount} products.`);

  console.log("🗑️   Deleting all banners…");
  const bannerRes = await Banner.deleteMany({});
  console.log(`✅  Deleted ${bannerRes.deletedCount} banners.`);

  await mongoose.disconnect();
  console.log("🔌  Disconnected");
}

clear().catch((err) => {
  console.error("❌  Clear failed:", err);
  process.exit(1);
});
