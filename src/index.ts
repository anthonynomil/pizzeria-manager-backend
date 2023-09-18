import "dotenv/config";
import app from "app";
import logger from "config/logger";
import { Server } from "http";
import process from "process";
import sequelize from "config/sequelize";
import associations from "models/associations";
import env from "config/env";

let server: Server<any> | undefined = undefined;

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

const port: number = env.SERVER_PORT;

sequelize.authenticate().then(async () => {
  await sequelize.sync();
  logger.info("Database connected");
  associations();
  await sequelize.sync();
  logger.info("Models synced");
  server = app.listen(port, () => {
    logger.info(`Listening to port ${port}`);
  });
});

process.on("exit", () => {
  logger.info("Process exited");
  if (server) {
    server.close();
  }
});
