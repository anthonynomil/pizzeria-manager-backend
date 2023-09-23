import e from "express";
import { TController } from "@types";

const catchAsync = (fn: TController) => (req: e.Request, res: e.Response, next: e.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err: Error) => {
    next(err);
  });
};

export default catchAsync;
