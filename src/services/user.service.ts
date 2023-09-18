import User from "models/User.model";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";

const create = async (data: creationData): Promise<User> => {
  console.log(data)
  if (await User.isEmailTaken(data.email)) throw new ApiError(httpStatus.CONFLICT, "Email is already taken");
  return await User.create(data);
};

const getById = async (id: number): Promise<User | null> => {
  return await User.findByPk(id);
};

const update = async (id: number, data: any): Promise<void> => {
  const user = await getById(id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  await user.update(data);
};

const remove = async (id: number) => {
  const user = await getById(id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found")
  await user.destroy();
}

export default {
  create,
  getById,
  update,
  remove
}


interface creationData {
  email: string;
  password: string;
  name?: string;
  role?: string;
}