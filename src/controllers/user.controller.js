import httpStatus from "http-status";
import * as userService from "../services/user.service.js";
import {catchAsync} from "../utils/catchAsync.js";
import {sendResponse} from "../utils/response.js";

export const register = catchAsync(async (req, res) => {
    const {
        name,
        email,
        password,
        confirmPassword,
        address,
        phone
    } = req.body;
    const userBody = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        address: address,
        phone: phone,
    };
    const user = await userService.create(userBody);
    sendResponse(res, httpStatus.CREATED, {
        user: user,
        message: "User created"
    });
});