import cors from "cors";
import express from "express";
import router from "./router/router";
import dotenv from "dotenv";
import { errorConverter, errorHandler, unexpectedErrorHandler } from "./middlewares/error";
import { connectToDb } from "./config/database.config";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import { associate } from "./config/databaseAssociation.config";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.options("*", cors());
connectToDb()
  .then(() => associate())
  .catch((err) => console.log(err));
app.use("/", router);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Route not found"));
});
app.use(errorConverter);
app.use(errorHandler);

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received");
  process.exit(0);
});
