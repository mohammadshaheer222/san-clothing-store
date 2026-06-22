import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { getSession } from "@/lib/auth/session";
import { validateBody } from "@/lib/api/validate";
import { updateValue, deleteValue } from "@/services/value.service";

const updateValueSchema = z.object({
  title: z.string().min(1, "Title must not be empty").optional(),
  description: z.string().min(1, "Description must not be empty").optional(),
  iconName: z.string().min(1, "Icon name must not be empty").optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

type RouteContext = { params: Promise<Record<string, string>> };

/**
 * PATCH /api/values/[id]
 * Update value details. Admin authorization required.
 */
export const PATCH = withErrorHandler(async (req: NextRequest, context?: RouteContext) => {
  if (!context) {
    return NextResponse.json({ success: false, error: "Missing context", statusCode: 400 }, { status: 400 });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const data = await validateBody(updateValueSchema, req);
  const value = await updateValue(id, data);

  return successResponse(value, "Value updated successfully.");
});

/**
 * DELETE /api/values/[id]
 * Delete a value. Admin authorization required.
 */
export const DELETE = withErrorHandler(async (req: NextRequest, context?: RouteContext) => {
  if (!context) {
    return NextResponse.json({ success: false, error: "Missing context", statusCode: 400 }, { status: 400 });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", statusCode: 401 },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const result = await deleteValue(id);

  return successResponse(result, "Value deleted successfully.");
});
