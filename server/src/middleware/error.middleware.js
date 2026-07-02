import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";
  const errors = err?.errors || [];

  if (!(err instanceof ApiError) && process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  const response = new ApiResponse(statusCode, { errors }, message);

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;