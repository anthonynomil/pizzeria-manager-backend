"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router/router"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = require("./middlewares/error");
const database_config_1 = require("./config/database.config");
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.options("*", (0, cors_1.default)());
(0, database_config_1.connectToDb)().then(() => console.log("Database connection established."));
app.use("/", router_1.default);
app.use((req, res, next) => {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, "Route not found"));
});
app.use(error_1.errorConverter);
app.use(error_1.errorHandler);
process.on("uncaughtException", error_1.unexpectedErrorHandler);
process.on("unhandledRejection", error_1.unexpectedErrorHandler);
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("SIGINT received");
    process.exit(0);
}));
