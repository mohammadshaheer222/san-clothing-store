import { NextRequest } from "next/server";
import { ZodSchema, z } from "zod";
import { BadRequest } from "./errors";

/**
 * Parses and validates the JSON body of a NextRequest against a Zod schema.
 * Throws a 400 ApiError when validation fails so withErrorHandler can catch it.
 *
 * @param schema - A Zod schema to validate against
 * @param req    - The incoming NextRequest
 * @returns      - The parsed, typed body
 */
export async function validateBody<T extends ZodSchema>(
  schema: T,
  req: NextRequest
): Promise<z.infer<T>> {
  let rawBody: unknown;

  try {
    rawBody = await req.json();
  } catch {
    throw BadRequest("Request body must be valid JSON.");
  }

  const result = schema.safeParse(rawBody);

  if (!result.success) {
    const messages = result.error.issues.map((e) => e.message).join(", ");
    throw BadRequest(messages);
  }

  return result.data;
}

/**
 * Parses and validates URL search params against a Zod schema.
 * Useful for query-string based filtering/pagination.
 *
 * @param schema      - A Zod schema to validate against
 * @param searchParams - URLSearchParams from the request URL
 */
export function validateQuery<T extends ZodSchema>(
  schema: T,
  searchParams: URLSearchParams
): z.infer<T> {
  const rawQuery = Object.fromEntries(searchParams.entries());
  const result = schema.safeParse(rawQuery);

  if (!result.success) {
    const messages = result.error.issues.map((e) => e.message).join(", ");
    throw BadRequest(messages);
  }

  return result.data;
}
