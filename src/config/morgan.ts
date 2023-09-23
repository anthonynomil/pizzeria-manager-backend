import morgan from "morgan";
import e from "express";
import logger from "config/logger";
import env from "config/env";

const envType = env.ENV;
morgan.token("body", (req: e.Request, res: e.Response) => res.locals.errorMessage || "");
const getIpFormat = (): string => (envType === "production" ? ":remote-addr - " : "");

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;

export const successHandler: e.Handler = morgan(successResponseFormat, {
  skip: (req: e.Request, res: e.Response) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

export const errorHandler: e.Handler = morgan(errorResponseFormat, {
  skip: (req: e.Request, res: e.Response) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export default { successHandler, errorHandler };
