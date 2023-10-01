import { z } from "zod";
import { isUuidv4, passwordMatch, role } from "validator/helpers.validator";

const create = {
  body: z
    .object({
      email: z.string().email(),
      password: z.string(),
      confirmPassword: z.string(),
      name: z.string().optional(),
      role: z.number().optional().refine(role, {
        message: "Role is not valid",
      }),
    })
    .refine(passwordMatch, {
      message: "Passwords do not match",
    }),
};

const getById = {
  params: z.object({
    userId: z.string(),
  }),
};

const update = {
  params: z.object({
    userId: z.string().refine(isUuidv4, {
      message: "Uuid is not valid",
    }),
  }),
  body: z
    .object({
      email: z.string().email().optional(),
      name: z.string().optional(),
      role: z.number().optional().refine(role, {
        message: "Role is not valid",
      }),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
    })
    .refine(passwordMatch, {
      message: "Passwords do not match",
    }),
};

const remove = {
  params: z.object({
    userId: z.string().refine(isUuidv4, {
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
