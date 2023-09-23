import process from "process";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import userService from "services/user.service";
import tokensType from "const/enums/tokens.type";

const jwtOptions: StrategyOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: any): Promise<any> => {
  try {
    if (payload.type !== tokensType.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await userService.getById(payload.sub);
    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

export const jwtStrategy: Strategy = new Strategy(jwtOptions, jwtVerify);
