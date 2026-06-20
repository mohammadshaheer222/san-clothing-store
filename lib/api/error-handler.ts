/**
 * lib/api/error-handler.ts
 * ------------------------
 * Higher-Order Function (HOF) that wraps a Next.js App Router
 * route handler and provides centralised error handling.
 *
 * Usage:
 *   export const GET = withErrorHandler(async (req) => { ... });
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "./errors";
import { errorResponse } from "./response";

type RouteContext = { params: Promise<Record<string, string>> };

type RouteHandler = (
  req: NextRequest,
  context?: RouteContext
) => Promise<NextResponse>;

/**
 * Wraps a route handler with centralised error handling.
 * Maps known error types to the appropriate HTTP status codes.
 */
export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (err) {
      // Known API error (manually thrown)
      if (err instanceof ApiError) {
        return errorResponse(err.message, err.statusCode);
      }

      // Zod validation error
      if (err instanceof ZodError) {
        const message = err.issues.map((e) => e.message).join(", ");
        return errorResponse(message, 400);
      }

      // Mongoose duplicate key error (code 11000)
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code: number }).code === 11000
      ) {
        return errorResponse("Duplicate entry — resource already exists.", 409);
      }

      // Fallback: unknown error
      console.error("[API Error]", err);
      return errorResponse("Internal server error", 500);
    }
  };
}
