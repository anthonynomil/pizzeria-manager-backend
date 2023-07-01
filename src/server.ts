import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import router from "./router/router";
import ApiError from "./utils/ApiError.js";
import { errorConverter, errorHandler } from "./middlewares/error";

const app = express();

app.use(cors());
app.use(express.json());
app.options("*", cors());

app.use("/", router);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Route not found"));
});
app.use(errorConverter);
app.use(errorHandler);

const unexpectedErrorHandler = (error: Error) => {
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

app.listen(process.env["PORT"], () => {
  console.log(`Server started on port ${process.env["PORT"]}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received");
  process.exit(0);
});
