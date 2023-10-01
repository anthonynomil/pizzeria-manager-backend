import { CreationAttributes } from "sequelize";
import Dish from "models/Dish.model";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";

const create = async (data: CreationAttributes<Dish>): Promise<Dish> => {
  if (await Dish.isNameTaken(data.name)) {
    throw new ApiError(httpStatus.CONFLICT, "Dish name already taken");
  }
  return await Dish.create(data);
};
