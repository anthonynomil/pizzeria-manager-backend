import { CreationAttributes } from "sequelize";
import Dish from "models/Dish.model";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import { UpdateAttributes } from "types/sequelize";
import { Uuidv4 } from "types";
import Ingredient from "models/Ingredient.model";
import ingredientService from "services/ingredient.service";

const create = async (data: CreationAttributes<Dish>): Promise<Dish> => {
  if (await Dish.isNameTaken(data.name)) {
    throw new ApiError(httpStatus.CONFLICT, "Dish name already taken");
  }
  return await Dish.create(data);
};

const addIngredient = async (id: Uuidv4, ingredientId: Uuidv4): Promise<void> => {
  const dish = await getById(id);
  const ingredient = await ingredientService.getById(ingredientId);
  await dish.addIngredient(ingredient);
};

const addIngredients = async (id: Uuidv4, ingredientIds: Uuidv4[]): Promise<void> => {
  const dish = await getById(id);
  await dish.addIngredients(ingredientIds);
};

const getById = async (id: string): Promise<Dish> => {
  const dish = await Dish.findByPk(id);
  if (!dish) throw new ApiError(httpStatus.NOT_FOUND, "Dish not found");
  return dish;
};

const getIngredients = async (id: string): Promise<Ingredient[]> => {
  const dish = await getById(id);
  return await dish.getIngredients();
};

const update = async (id: string, data: UpdateAttributes<Dish>): Promise<void> => {
  const dish = await getById(id);
  if (data.name && (await Dish.isNameTaken(data.name))) {
    throw new ApiError(httpStatus.CONFLICT, "Dish name already taken");
  }
  await dish.update(data);
};
const remove = async (id: Uuidv4): Promise<void> => {
  const dish = await getById(id);
  await dish.destroy();
};

const removeIngredient = async (id: Uuidv4, ingredientId: Uuidv4): Promise<void> => {
  const dish = await getById(id);
  await dish.removeIngredient(ingredientId);
};

export default {
  create,
  addIngredient,
  addIngredients,
  getById,
  getIngredients,
  update,
  remove,
  removeIngredient,
};
