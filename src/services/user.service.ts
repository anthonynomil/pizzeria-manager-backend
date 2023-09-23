import User from "models/User.model";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import { CreationAttributes } from "sequelize";
import { UpdateAttributes } from "@types";

const create = async (data: CreationAttributes<User>): Promise<User> => {
  if (await User.isEmailTaken(data.email)) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already taken");
  }
  return await User.create(data);
};

const getById = async (id: number): Promise<User | null> => {
  return await User.findByPk(id);
};

const getByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email } });
};

const update = async (id: number, data: UpdateAttributes<User>): Promise<void> => {
  const user = await getById(id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  await user.update(data);
};

const remove = async (id: number) => {
  const user = await getById(id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  await user.destroy();
};

export default {
  create,
  getById,
  getByEmail,
  update,
  remove,
};
