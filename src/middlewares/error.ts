import httpStatus from "http-status";
import e from "express";
import ApiError from "utils/ApiError";
import logger from "config/logger";
import { AxiosError } from "axios";
import env from "config/env";

export const errorConverter = (
  err: ApiError | Error | AxiosError,
  req: e.Request,
  res: e.Response,
  next: e.NextFunction,
): void => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }
  next(error);
};

export const errorHandler = (err: any, req: e.Request, res: e.Response, next: e.NextFunction): void => {
  let { statusCode, message } = err;
  const envType = env.ENV;

  if (envType === "production") {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(envType === "development" && { stack: err.stack }),
  };

  if (envType === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
