import catchAsync from "utils/catchAsync";
import e from "express";

const create = catchAsync(async (req: e.Request, res: e.Response) => {
  throw new Error("Not implemented");
});

const getById = catchAsync(async (req: e.Request, res: e.Response) => {
  throw new Error("Not implemented");
});

const update = catchAsync(async (req: e.Request, res: e.Response) => {
  throw new Error("Not implemented");
});

const remove = catchAsync(async (req: e.Request, res: e.Response) => {
  throw new Error("Not implemented");
});

export default {
  create,
  getById,
  update,
  remove,
};
