import Joi from "joi";

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const register = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
    confirmPassword: Joi.string().required(),
    name: Joi.string(),
  }),
};

const refreshTokens = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

export default {
  login,
  register,
  refreshTokens,
};
