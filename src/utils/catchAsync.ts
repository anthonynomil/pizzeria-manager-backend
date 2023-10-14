import e from "express";
import { Controller } from "types/express";
const catchAsync = (fn: Controller) => (req: e.Request, res: e.Response, next: e.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err: Error) => {
    next(err);
  });
};

export default catchAsync;
