import cors from "cors";
import e from "express";
import httpStatus from "http-status";
import { errorConverter, errorHandler } from "middlewares/error";
import xss from "middlewares/xss";
import morgan from "config/morgan";
import helmet from "helmet";
import passport from "passport";
import { jwtStrategy } from "config/passport";
import limiter from "config/expressRateLimiter";
import router from "router";
import ApiError from "utils/ApiError";
import logger from "config/logger";

const app: e.Express = e();

app.use(morgan.errorHandler);
app.use(morgan.successHandler);

app.use(helmet());
app.use(xss());
app.use(cors());
app.options("*", cors());

app.use(e.json());

app.use(limiter);

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/", router);

app.use((req: e.Request, res: e.Response, next: e.NextFunction) =>
  next(new ApiError(httpStatus.NOT_FOUND, "Route not found"))
);

app.use(errorConverter);
app.use(errorHandler);

export default app;
