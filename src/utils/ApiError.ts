import httpStatus from "http-status";

class ApiError extends Error {
  private statusCode: number;

  constructor(statusCode: number = httpStatus.INTERNAL_SERVER_ERROR, message: string, stack: string = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    }
  }
}

export default ApiError;
