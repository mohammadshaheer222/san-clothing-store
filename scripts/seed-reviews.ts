/**
 * scripts/seed-reviews.ts
 * -----------------------
 * Populates the database with initial customer reviews.
 * Skips if reviews already exist in the database.
 *
 * Usage:
 *   npx tsx scripts/seed-reviews.ts
 */

import "dotenv/config";
import mongoose from "mongoose";
import ReviewItem from "../models/review.model";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const MOCK_REVIEWS = [
  {
    authorName: "Sarah M.",
    rating: 5,
    content: "The fabric of the essential t-shirt is unbelievably soft, like a second skin. It fits perfectly and keeps its shape after washing. Absolutely in love!",
    order: 1,
    isActive: true,
  },
  {
    authorName: "James L.",
    rating: 5,
    content: "High quality premium apparel. The Egyptian cotton tee is highly breathable, perfect for hot summer days. Definitely buying more colors soon.",
    order: 2,
    isActive: true,
  },
  {
    authorName: "Elena R.",
    rating: 5,
    content: "Best hoodie I have ever owned. Heavyweight, comfortable, and looks extremely premium. SAN is now my go-to brand for everyday essentials.",
    order: 3,
    isActive: true,
  },
  {
    authorName: "Marcus T.",
    rating: 5,
    content: "The tech joggers are amazing for both working out and casual wear. The fit is tapered and the fabric feels durable and lightweight.",
    order: 4,
    isActive: true,
  },
  {
    authorName: "Sophia K.",
    rating: 5,
    content: "Fast delivery and exceptional customer service. The classic bomber jacket is very versatile and stylish. Five stars!",
    order: 5,
    isActive: true,
  },
];

async function seed() {
  console.log("🔌  Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI!);
  console.log("✅  Connected");

  const count = await ReviewItem.countDocuments();
  if (count > 0) {
    console.log(`ℹ️   Database already has ${count} reviews. Skipping seeding.`);
    await mongoose.disconnect();
    return;
  }

  console.log(`🌱  Seeding ${MOCK_REVIEWS.length} reviews…`);
  await ReviewItem.insertMany(MOCK_REVIEWS);

  console.log("🎉  Reviews seeded successfully!");
  await mongoose.disconnect();
  console.log("🔌  Disconnected");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
