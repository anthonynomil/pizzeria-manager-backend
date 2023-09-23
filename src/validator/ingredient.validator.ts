import Joi from "joi";

const create = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

const getById = {
  params: Joi.object({
    ingredientId: Joi.number().required(),
  }),
};

const update = {
  params: Joi.object({
    ingredientId: Joi.number().required(),
  }),
};

const remove = {
  params: Joi.object({
    ingredientId: Joi.number().required(),
  }),
};

export default {
  create,
  getById,
  update,
  remove,
};
