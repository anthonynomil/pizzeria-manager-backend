import * as userService from "../services/user.service"
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

export const loginUser = async (email: string, password: string) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect email or password");
    }
    return user;
}