import { ingredientName, isUuidv4 } from "validator/helpers.validator";
import { z } from "zod";

const create = {
  body: z.object({
    name: z.string().transform(ingredientName),
  }),
};

const getById = {
  params: z.object({
    ingredientUuid: z.string().refine(isUuidv4, {
      message: "Uuid is not valid",
    }),
  }),
};

const update = {
  params: z.object({
    ingredientUuid: z.string().refine(isUuidv4, {
      message: "Uuid is not valid",
    }),
  }),
  body: z.object({
    name: z.string().transform(ingredientName),
  }),
};

const remove = {
  params: z.object({
    ingredientUuid: z.string().refine(isUuidv4, {
      message: "Uuid is not valid",
    }),
  }),
};

export default {
  create,
  getById,
  update,
  remove,
};
