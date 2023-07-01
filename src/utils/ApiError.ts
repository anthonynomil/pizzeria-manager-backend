import httpStatus from "http-status";

class ApiError extends Error {
  public statusCode: number;
  
  constructor(statusCode: number = httpStatus.INTERNAL_SERVER_ERROR, message: string, stack: string = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
