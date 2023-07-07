"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unexpectedErrorHandler = exports.errorHandler = exports.errorConverter = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_js_1 = __importDefault(require("../utils/ApiError.js"));
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError_js_1.default)) {
        const statusCode = http_status_1.default.BAD_REQUEST;
        const message = error.message || http_status_1.default[statusCode];
        error = new ApiError_js_1.default(statusCode, message);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    res.locals.errorMessage = err.message;
    const response = {
        code: statusCode,
        message: message,
    };
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
const unexpectedErrorHandler = (error) => {
    throw new ApiError_js_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
};
exports.unexpectedErrorHandler = unexpectedErrorHandler;
