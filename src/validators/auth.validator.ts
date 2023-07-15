import schema from "./index";
import Joi from "joi";

export const register = Joi.object({
    body: {
        email: schema.user.email,
        password: schema.user.password,
    }
})
export const login = Joi.object({
    body: {
        email: schema.user.email,
        password: schema.user.password,
    }
})

export const logout = Joi.object({
    body: {
        refreshToken: schema.user.token,
    }
})

export const refresh = Joi.object({
    body: {
        refreshToken: schema.user.token,
    }
})

export const forgotPassword = Joi.object({
    body: {
        email: schema.user.email,
    }
});

export const resetPassword = Joi.object({
    query: {
        refreshToken: schema.user.token,
    },
    body: {
        password: schema.user.password,
    }
});

export const verifyEmail = Joi.object({
    query: {
        token: schema.user.token,
    }
});