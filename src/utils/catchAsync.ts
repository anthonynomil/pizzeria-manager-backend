import { Request, Response } from "express";

const catchAsync = (fn: FnCatchAsync) => (req: Request, res: Response, next: any) => {
  Promise.resolve(fn(req, res, next)).catch((err: Error) => {
    next(err);
  });
};

export default catchAsync;

export type FnCatchAsync = (req: Request, res: Response, next: (err: Error) => {}) => Promise<void>;
