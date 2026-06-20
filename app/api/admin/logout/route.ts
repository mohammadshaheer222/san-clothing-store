import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { clearSessionCookie } from "@/lib/auth/session";

export const POST = withErrorHandler(async () => {
  await clearSessionCookie();
  return successResponse(null, "Logged out successfully");
});
