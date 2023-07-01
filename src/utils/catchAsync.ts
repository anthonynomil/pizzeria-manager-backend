import {Request, Response} from "express";

const catchAsync = (fn: (req: Request, res: Response, next: (err: Error) => {}) => {}) => (req: Request, res: Response, next: (err: Error) => {}) => {
  Promise.resolve(fn(req, res, next)).catch((err: Error) => {
    next(err);
  });
};

export default catchAsync;
