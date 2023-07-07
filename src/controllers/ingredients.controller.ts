import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import iServices from "../services/ingredients.service";

export let add = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;
  const ingredient = await iServices.create(name);
  res.status(httpStatus.CREATED).send({
    message: "Ingredient created",
    ingredient,
  });
});

export const get = catchAsync(async (req: Request, res: Response) => {
  const ingredients = await iServices.get();
  if (!ingredients) {
    res.status(httpStatus.NOT_FOUND).send({
      message: "Ingredients not found",
    });
  }
  res.status(httpStatus.OK).send({
    message: "Ingredients found",
    ingredients,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const ingredient = await iServices.getById(id);
  if (!ingredient) {
    res.status(httpStatus.NOT_FOUND).send({
      message: "Ingredient not found",
    });
  }
  res.status(httpStatus.OK).send({
    message: "Ingredient found",
    ingredient,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const ingredient = await iServices.remove(id);
  res.status(httpStatus.OK).send({
    message: "Ingredient deleted",
    ingredient,
  });
});
