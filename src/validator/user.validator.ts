import Joi from "joi";
import userRoles from "const/enums/user.roles";

const create = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string(),
    role: Joi.number().valid(...Object.values(userRoles)),
  }),
};

const getById = {
  params: Joi.object({
    userId: Joi.number().required(),
  }),
};

const update = {
  params: Joi.object({
    userId: Joi.number().required(),
  }),
  body: Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
    name: Joi.string(),
    role: Joi.number().valid(...Object.values(userRoles)),
  }),
};

const remove = {
  params: Joi.object({
    userId: Joi.number().required(),
  }),
};

export default {
  create,
  getById,
  update,
  remove,
};
