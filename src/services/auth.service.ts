import User from "models/User.model";
import userService from "services/user.service";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import tokenService from "services/token.service";
import tokensType from "const/enums/tokens.type";

const login = async (email: string, password: string): Promise<User> => {
  const user = await userService.getByEmail(email);
  if (!user || !(await user.passwordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect credentials");
  }
  return user;
};

const logout = async (refreshTokens: string): Promise<void> => {
  const token = await tokenService.get(refreshTokens);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, "Token not found");
  }
  await token.destroy();
};

const refresh = async (refreshToken: string) => {
  try {
    const token = await tokenService.verify(refreshToken, tokensType.REFRESH);
    const user = await userService.getById(token.userId);
    if (!user) {
      throw new Error();
    }
    await token.destroy();
    return tokenService.generateAuth(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export default {
  login,
  logout,
  refresh,
};

type TRegisterProps = {};
