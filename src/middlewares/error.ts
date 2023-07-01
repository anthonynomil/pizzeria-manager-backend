import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import {Request, Response} from "express";

export const errorConverter = (err: ApiError | Error, req: Request, res: Response, next: any) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = httpStatus.BAD_REQUEST
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message);
  }
  next(error);
};

export const errorHandler = (err: ApiError, req: Request, res: Response, next: any) => {
  let {
    statusCode,
    message
  } = err;
  res.locals.errorMessage = err.message;
  const response = {
    code: statusCode,
    message: message,
  };
  res.status(statusCode).send(response);
};
