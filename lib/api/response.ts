import { NextResponse } from "next/server";

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode: number;
}

/**
 * Returns a 2xx NextResponse with a standardised success payload.
 *
 * @param data     - The response payload
 * @param message  - Optional human-readable message
 * @param status   - HTTP status code (default 200)
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json<ApiSuccessResponse<T>>(
    { success: true, data, message },
    { status }
  );
}

/**
 * Returns a 4xx/5xx NextResponse with a standardised error payload.
 *
 * @param error   - Error message string
 * @param status  - HTTP status code (default 500)
 */
export function errorResponse(
  error: string,
  status: number = 500
): NextResponse<ApiErrorResponse> {
  return NextResponse.json<ApiErrorResponse>(
    { success: false, error, statusCode: status },
    { status }
  );
}
