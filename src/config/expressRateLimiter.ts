import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

export default limiter;
