import catchAsync from "../utils/catchAsync";
import * as authService from "../services/auth.service";
import {Request, Response} from "express";

export const login = catchAsync(async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await authService.loginUser(email, password);
});