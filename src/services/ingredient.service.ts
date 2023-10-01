import { CreationAttributes } from "sequelize";
import Ingredient from "models/Ingredient.model";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import { UpdateAttributes } from "types/sequelize";
import { Uuidv4 } from "types";

const create = async (data: CreationAttributes<Ingredient>): Promise<Ingredient> => {
  if (await Ingredient.isNameTaken(data.name)) {
    throw new ApiError(httpStatus.CONFLICT, "Ingredient already taken");
  }
  return await Ingredient.create(data);
};

const getById = async (id: Uuidv4): Promise<Ingredient | null> => {
  const ingredient = await Ingredient.findByPk(id);
  if (!ingredient) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
  }
  return ingredient;
};

const getAll = async (): Promise<Ingredient[]> => await Ingredient.findAll();

const update = async (id: Uuidv4, data: UpdateAttributes<Ingredient>): Promise<void> => {
  const ingredient = await getById(id);
  if (!ingredient) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
  }
  if (data.name && (await Ingredient.isNameTaken(data.name, id))) {
    throw new ApiError(httpStatus.CONFLICT, "Ingredient already taken");
  }
  await ingredient.update(data);
};

const remove = async (id: Uuidv4): Promise<void> => {
  const ingredient = await getById(id);
  if (!ingredient) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
  }
  await ingredient.destroy();
};

export default {
  create,
  getById,
  getAll,
  update,
  remove,
};
