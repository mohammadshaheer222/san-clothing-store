export class ApiError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const BadRequest = (msg = "Bad request") => new ApiError(msg, 400);
export const Unauthorized = (msg = "Unauthorized") => new ApiError(msg, 401);
export const Forbidden = (msg = "Forbidden") => new ApiError(msg, 403);
export const NotFound = (msg = "Not found") => new ApiError(msg, 404);
export const Conflict = (msg = "Conflict") => new ApiError(msg, 409);
export const InternalError = (msg = "Internal server error") =>
  new ApiError(msg, 500);
