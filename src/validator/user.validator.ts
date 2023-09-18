import Joi from "joi";

const create = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string(),
    role: Joi.string()
  })
};

const getById = {
  params: Joi.object({
    id: Joi.number().required()
  })
};

const update = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  body: Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
    name: Joi.string(),
    role: Joi.string()
  })
};

const remove = {
  params: Joi.object({
    id: Joi.number().required()
  })
};

export default {
  create,
  getById,
  update,
  remove
}