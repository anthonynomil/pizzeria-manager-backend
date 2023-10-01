import catchAsync from "utils/catchAsync";
import e from "express";
import ingredientService from "services/ingredient.service";

const getAll = catchAsync(async (req: e.Request, res: e.Response) => {
  const ingredients = await ingredientService.getAll();
  res.send(ingredients);
});

export default {
  getAll,
};
