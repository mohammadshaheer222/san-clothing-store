import { NextRequest } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { validateBody } from "@/lib/api/validate";
import { signToken } from "@/lib/auth/jwt";
import { setSessionCookie } from "@/lib/auth/session";
import { validateAdminCredentials } from "@/services/admin.service";

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await validateBody(LoginSchema, req);

  const admin = await validateAdminCredentials(body);

  const token = signToken({
    id: admin.id,
    email: admin.email,
    role: "admin",
  });

  await setSessionCookie(token);

  return successResponse(
    { email: admin.email, name: admin.name },
    "Login successful"
  );
});
