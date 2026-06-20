/**
 * scripts/seed-admin.ts
 * ----------------------
 * Run once to create the first admin account.
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 *
 * Reads credentials from environment variables (falls back to defaults).
 * Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local before running.
 */

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@san-store.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin@12345";
const ADMIN_NAME = process.env.ADMIN_NAME ?? "Admin";

if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, default: "Admin" },
}, { timestamps: true, versionKey: false });

const Admin =
  mongoose.models.Admin ?? mongoose.model("Admin", AdminSchema);

async function seed() {
  console.log("🔌  Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI!);
  console.log("✅  Connected");

  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`ℹ️   Admin with email "${ADMIN_EMAIL}" already exists. Skipping.`);
    await mongoose.disconnect();
    return;
  }

  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await Admin.create({ email: ADMIN_EMAIL, password: hash, name: ADMIN_NAME });

  console.log("🎉  Admin account created!");
  console.log(`    Email:    ${ADMIN_EMAIL}`);
  console.log(`    Password: ${ADMIN_PASSWORD}`);
  console.log("\n⚠️   Change your password after first login!");

  await mongoose.disconnect();
  console.log("🔌  Disconnected");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
