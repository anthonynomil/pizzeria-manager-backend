import { z } from "zod";

const create = {
  body: z.object({
    name: z.string().min(2).max(255),
    description: z.string().min(2).max(255).optional(),
    ingredients: z.array(z.string().uuid()).optional(),
  }),
};

const addIngredient = {
  params: z.object({
    dishId: z.string().uuid(),
    ingredientId: z.string().uuid(),
  }),
};

const getById = {
  params: z.object({
    dishId: z.string().uuid(),
  }),
};

const update = {
  params: z.object({
    dishId: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).max(255).optional(),
    description: z.string().min(2).max(255).optional(),
    ingredients: z.array(z.string().uuid()).optional(),
  }),
};

const remove = {
  params: z.object({
    dishId: z.string().uuid(),
  }),
};

export default {
  create,
  addIngredient,
  getById,
  update,
  remove,
};
