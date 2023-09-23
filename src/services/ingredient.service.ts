import { CreationAttributes } from "sequelize";
import Ingredient from "models/Ingredient.model";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import { UpdateAttributes } from "@types";

const create = async (data: CreationAttributes<Ingredient>): Promise<Ingredient> => {
  if (await Ingredient.isNameTaken(data.name)) {
    throw new ApiError(httpStatus.CONFLICT, "Ingredient already taken");
  }
  return await Ingredient.create(data);
};

const getById = async (id: number): Promise<Ingredient | null> => {
  return await Ingredient.findByPk(id);
};

const update = async (id: number, data: UpdateAttributes<Ingredient>): Promise<void> => {
  const ingredient = await getById(id);
  if (!ingredient) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
  }
  await ingredient.update(data);
};

const remove = async (id: number): Promise<void> => {
  const ingredient = await getById(id);
  if (!ingredient) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ingredient not found");
  }
  await ingredient.destroy();
};

export default {
  create,
  getById,
  update,
  remove,
};
