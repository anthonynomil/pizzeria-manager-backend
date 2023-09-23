import catchAsync from "utils/catchAsync";
import e from "express";
import ingredientService from "services/ingredient.service";
import httpStatus from "http-status";

const create = catchAsync(async (req: e.Request, res: e.Response): Promise<void> => {
  const ingredient = await ingredientService.create(req.body);
  res.status(httpStatus.CREATED).send(ingredient);
});

const getById = catchAsync(async (req: e.Request, res: e.Response): Promise<void> => {
  const ingredient = await ingredientService.getById(Number(req.params.ingredientId));
  res.send(ingredient);
});

const update = catchAsync(async (req: e.Request, res: e.Response): Promise<void> => {
  await ingredientService.update(Number(req.params.ingredientId), req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const remove = catchAsync(async (req: e.Request, res: e.Response): Promise<void> => {
  await ingredientService.remove(Number(req.params.ingredientId));
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  create,
  getById,
  update,
  remove,
};
