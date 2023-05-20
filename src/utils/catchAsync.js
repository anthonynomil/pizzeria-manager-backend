import httpStatus from "http-status";
import {sendResponse} from "./response.js";

export const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => sendResponse(res, err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR, {
        message: err.message,
    }));
};