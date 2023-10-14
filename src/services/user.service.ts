import User from "models/User.model";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import { CreationAttributes } from "sequelize";
import { UpdateAttributes } from "types/sequelize";
import { Uuidv4 } from "types";

const create = async (data: CreationAttributes<User>): Promise<User> => {
  if (await User.isEmailTaken(data.email)) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already taken");
  }
  return await User.create(data);
};

const getById = async (id: Uuidv4): Promise<User | null> => {
  return await User.findByPk(id);
};

const getByEmail = async (email: string): Promise<User | null> => {
  return await User.scope(undefined).findOne({ where: { email } });
};

const update = async (id: Uuidv4, data: UpdateAttributes<User>): Promise<void> => {
  const user = await getById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (data.email && (await User.isEmailTaken(data.email, id))) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already taken");
  }
  await user.update(data);
};

const remove = async (id: Uuidv4) => {
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
