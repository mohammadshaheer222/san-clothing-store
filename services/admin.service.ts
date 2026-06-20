import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db/mongoose";
import Admin from "@/models/admin.model";
import { Unauthorized } from "@/lib/api/errors";

export interface AdminCredentials {
  email: string;
  password: string;
}

export async function validateAdminCredentials(credentials: AdminCredentials) {
  await connectDB();

  const admin = await Admin.findOne({ email: credentials.email.toLowerCase() });

  // Use a constant-time comparison regardless of whether admin exists
  // to prevent timing attacks that reveal valid emails
  const dummyHash = "$2a$12$invaliddummyhashforcomparison.invalid";
  const isMatch = await bcrypt.compare(
    credentials.password,
    admin?.password ?? dummyHash
  );

  if (!admin || !isMatch) {
    throw Unauthorized("Invalid email or password.");
  }

  return {
    id: admin._id.toString(),
    email: admin.email,
    name: admin.name,
  };
}

export async function createAdmin(
  email: string,
  password: string,
  name = "Admin"
) {
  await connectDB();
  const hash = await bcrypt.hash(password, 12);
  return Admin.create({ email: email.toLowerCase(), password: hash, name });
}
