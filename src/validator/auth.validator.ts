import { z } from "zod";

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
      confirmPassword: z.string(),
      name: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
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
