import { NextFunction, Request, Response } from "express";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import passport from "passport";
import User from "models/User.model";

const verifyCallback =
  (req: Request, resolve: any, reject: any, requiredRights: any) =>
  async (err: Error | ApiError, user: User, info: any): Promise<any> => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = user.role;
      const hasRequiredRights = requiredRights.includes(userRights);
      if (!hasRequiredRights) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
      if (user.role === "user" && (user.id !== Number(req.params.id) || user.id !== Number(req.body.userId))) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }
    resolve();
  };

const auth =
  (...requiredRights: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
        req,
        res,
        next,
      );
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
