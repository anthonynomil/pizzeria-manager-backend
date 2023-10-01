import { ingredientName } from "validator/helpers.validator";
import { z } from "zod";

const create = {
  body: z.object({
    name: z.string().transform(ingredientName),
  }),
};

const getById = {
  params: z.object({
    ingredientId: z.string().uuid(),
  }),
};

const update = {
  params: z.object({
    ingredientId: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().transform(ingredientName),
  }),
};

const remove = {
  params: z.object({
    ingredientId: z.string().uuid(),
  }),
};

export default {
  create,
  getById,
  update,
  remove,
};
