import catchAsync from "utils/catchAsync";
import e from "express";
import userService from "services/user.service";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";

const create = catchAsync(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  const user = await userService.create(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getById = catchAsync(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  const user = await userService.getById(Number(req.params.id));
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  user.password = undefined
  res.send(user);
});

const update = catchAsync(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  await userService.update(Number(req.params.id), req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const remove = catchAsync(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  await userService.remove(Number(req.params.id));
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  create,
  getById,
  update,
  remove
};