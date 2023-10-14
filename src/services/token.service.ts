import env from "config/env";
import jwt, { sign } from "jsonwebtoken";
import Token from "models/Token.model";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import { DateTime } from "luxon";
import tokensType, { TTokenTypes } from "const/enums/tokens.type";
import type { Uuidv4 } from "types";

const generate = (userId: Uuidv4, expires: Date, type: TTokenTypes, secret: string = env.JWT_SECRET): string => {
  const payload = {
    sub: userId,
    iat: Date.now(),
    exp: expires.getTime(),
    type: type,
  };
  return sign(payload, secret);
};

const generateAuth = async (user: any) => {
  const accessTokenExpires = DateTime.now().plus({ minutes: env.JWT_ACCESS_EXPIRATION_MINUTES });
  const accessToken = generate(user.id, accessTokenExpires.toJSDate(), tokensType.ACCESS);

  const refreshTokenExpires = DateTime.now().plus({ days: env.JWT_REFRESH_EXPIRATION_DAYS });
  const refreshToken = generate(user.id, refreshTokenExpires.toJSDate(), tokensType.REFRESH);
  await save(refreshToken, user.id, refreshTokenExpires.toJSDate(), tokensType.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toISO(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toISO(),
    },
  };
};

const getByToken = async (token: string) => {
  return await Token.findOne({ where: { token, type: tokensType.REFRESH, valid: true } });
};

const save = async (token: string, userId: Uuidv4, expires: Date, type: TTokenTypes) => {
  return await Token.create({ token, userId, expires, type });
};

const verify = async (token: string, type: string) => {
  const payload = jwt.verify(token, env.JWT_SECRET);
  const tokenDoc = await Token.findOne({ where: { token, type, userId: String(payload.sub) } });
  if (!tokenDoc) throw new ApiError(httpStatus.NOT_FOUND, "Token not found");
  return tokenDoc;
};

export default {
  generate,
  generateAuth,
  getByToken,
  save,
  verify,
};
