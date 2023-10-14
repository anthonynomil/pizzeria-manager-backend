import catchAsync from "utils/catchAsync";
import e from "express";
import dishService from "services/dish.service";
import httpStatus from "http-status";

const create = catchAsync(async (req: e.Request, res: e.Response) => {
  const dish = await dishService.create(req.body);
  res.status(httpStatus.CREATED).send(dish);
});

const addIngredient = catchAsync(async (req: e.Request, res: e.Response) => {
  await dishService.addIngredient(req.params.dishId, req.params.ingredientId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getById = catchAsync(async (req: e.Request, res: e.Response) => {
  const dish = await dishService.getById(req.params.dishId);
  res.send(dish);
});

const update = catchAsync(async (req: e.Request, res: e.Response) => {
  const dish = await dishService.update(req.params.dishId, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const remove = catchAsync(async (req: e.Request, res: e.Response) => {
  await dishService.remove(req.params.dishId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  create,
  addIngredient,
  getById,
  update,
  remove,
};
