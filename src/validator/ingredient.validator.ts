import Joi from "joi";
import { ingredientName } from "validator/helpers.validator";

const create = {
  body: Joi.object({
    name: Joi.string().required().custom(ingredientName),
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
  body: Joi.object({
    name: Joi.string().required().custom(ingredientName),
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
