import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { createValue, getStoreValues, getAllValues } from "@/services/value.service";

const valueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  iconName: z.string().min(1, "Icon name is required"),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

/**
 * GET /api/values
 * Retrieves values. Admin session required if query param ?admin=true is specified.
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const adminMode = searchParams.get("admin") === "true";

  if (adminMode) {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", statusCode: 401 },
        { status: 401 }
      );
    }
    const values = await getAllValues();
    return successResponse(values, "All values retrieved successfully.");
  }

  const values = await getStoreValues();
  return successResponse(values, "Store values retrieved successfully.");
});

/**
 * POST /api/values
 * Create a new value. Admin session required.
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const data = await validateBody(valueSchema, req);
  const value = await createValue(data);

  return successResponse(value, "Value created successfully.", 201);
});
