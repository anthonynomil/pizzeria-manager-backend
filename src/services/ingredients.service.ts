import { IngredientModel } from "../models/Ingredient.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

export const create = async (name: string) => {
  const ingredient = await getByName(name);
  if (ingredient) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Ingredient already exists");
  }
  return await IngredientModel.create({ name });
};

export const get = async () => {
  return await IngredientModel.findAll();
};

export const getByName = async (name: string) => {
  return await IngredientModel.findOne({ where: { name } });
};

export const getById = async (id: string) => {
  return await IngredientModel.findByPk(id);
};

export const remove = async (id: string) => {
  const ingredient = await getById(id);
  if (!ingredient)
    throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
  await ingredient.destroy();
  return ingredient;
};

const iServices = {
  get,
  create,
  getById,
  remove,
};

export default iServices;
