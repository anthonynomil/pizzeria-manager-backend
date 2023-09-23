import { NextFunction, Request, Response } from "express";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import passport from "passport";
import User from "models/User.model";
import { TUserRoles } from "const/enums/user.roles";

const verifyCallback =
  (req: Request, resolve: any, reject: any, role: TUserRoles) =>
  async (err: Error | ApiError, user: User, info: any): Promise<any> => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
    }
    req.user = user;
    if (user.id !== Number(req.params.userId) && user.role < role) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, "Forbidden"));
    }
    resolve();
  };

const auth =
  (...requiredRights: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
