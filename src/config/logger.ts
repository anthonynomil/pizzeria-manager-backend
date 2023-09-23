import { createLogger, format, Logger, transports } from "winston";

const enumerateErrorFormat = format((info: any) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const envType = process.env.ENV!;

const loggerFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.splat(),
  enumerateErrorFormat(),
  format.printf((info) => `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`),
  format.errors({ stack: true }),
);

const logger: Logger = createLogger({
  level: envType === "development" ? "debug" : "info",
  format: loggerFormat,
  transports: [
    new transports.Console({
      stderrLevels: ["error"],
      format: format.combine(format.colorize({ all: true })),
    }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

export default logger;
