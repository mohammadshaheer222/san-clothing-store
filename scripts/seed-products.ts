/**
 * scripts/seed-products.ts
 * ------------------------
 * Populates the database with initial products from mock-data.ts.
 * Runs once during setup to ensure there is data to display.
 *
 * Usage:
 *   npx tsx scripts/seed-products.ts
 */

import "dotenv/config";
import mongoose from "mongoose";
import { PRODUCTS_DATA } from "../constants/mock-data";
import Product from "../models/product.model";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

async function seed() {
  console.log("🔌  Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI!);
  console.log("✅  Connected");

  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`ℹ️   Database already has ${count} products. Skipping seeding.`);
    await mongoose.disconnect();
    return;
  }

  console.log(`🌱  Seeding ${PRODUCTS_DATA.length} products…`);

  // Map the static mock data to fit the schema (Mongoose will auto-generate ObjectIds)
  const productsToInsert = PRODUCTS_DATA.map((p) => {
    // Exclude the mock text/numeric id so Mongoose creates standard ObjectIds
    const { id, oldPrice, ...rest } = p;
    return {
      ...rest,
      // If there's an oldPrice, make sure it is a number.
      oldPrice: oldPrice || undefined,
    };
  });

  await Product.insertMany(productsToInsert);

  console.log("🎉  Products seeded successfully!");
  await mongoose.disconnect();
  console.log("🔌  Disconnected");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
