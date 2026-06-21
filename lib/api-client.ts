/**
 * lib/api-client.ts
 * -----------------
 * Reusable frontend fetch helper that handles request formatting,
 * JSON parsing, and standard error handling.
 */

export interface ApiFetchOptions extends Omit<RequestInit, 'body'> {
  body?: any;
}

export class ApiClientError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

/**
 * Standardised API fetch wrapper for the frontend.
 * Automatically handles base URL, JSON content headers, and error parsing.
 *
 * @param path    - API path relative to origin (e.g. "/api/products")
 * @param options - Request options
 */
export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { body, headers, ...restOptions } = options;

  const activeHeaders = new Headers(headers);

  let serializedBody: BodyInit | null | undefined = undefined;

  if (body !== undefined) {
    if (body instanceof FormData) {
      // Browser automatically sets appropriate multipart/form-data content-type boundary
      serializedBody = body;
    } else {
      activeHeaders.set("Content-Type", "application/json");
      serializedBody = JSON.stringify(body);
    }
  }

  const response = await fetch(path, {
    ...restOptions,
    headers: activeHeaders,
    body: serializedBody,
  });

  let data: any;
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = { message: await response.text() };
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const errorMessage = data?.error || data?.message || `HTTP error! Status: ${response.status}`;
    throw new ApiClientError(errorMessage, response.status);
  }

  // The backend wraps success payloads in a { success: true, data: T, message?: string } format
  if (data && typeof data === "object" && "success" in data && data.success === true) {
    return data.data as T;
  }

  return data as T;
}
