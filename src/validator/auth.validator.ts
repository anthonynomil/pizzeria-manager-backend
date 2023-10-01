import { z } from "zod";
import { passwordMatch } from "validator/helpers.validator";

const login = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  }),
};

const register = {
  body: z
    .object({
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
      name: z.string().optional(),
    })
    .refine(passwordMatch, {
      message: "Passwords do not match",
    }),
};

const refreshTokens = {
  body: z.object({
    refreshToken: z.string(),
  }),
};

export default {
  login,
  register,
  refreshTokens,
};
