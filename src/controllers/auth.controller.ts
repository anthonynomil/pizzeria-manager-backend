import catchAsync from "utils/catchAsync";
import e from "express";
import authService from "services/auth.service";
import tokenService from "services/token.service";
import userService from "services/user.service";
import httpStatus from "http-status";

const login = catchAsync(async (req: e.Request, res: e.Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  const tokens = await tokenService.generateAuth(user);
  res.send({ user, tokens });
});

const register = catchAsync(async (req: e.Request, res: e.Response): Promise<void> => {
  const user = await userService.create(req.body);
  const tokens = await tokenService.generateAuth(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const refreshToken = catchAsync(async (req: e.Request, res: e.Response): Promise<void> => {
  const tokens = await authService.refresh(req.body.refreshToken);
  res.send({ ...tokens });
});

export default {
  login,
  register,
  refreshToken,
};
