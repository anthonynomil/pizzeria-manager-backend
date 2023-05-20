import Joi from "joi";

export const register = Joi.object({
    body: Joi.object({
        name: Joi.string().required().min(3).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6).max(30),
        confirmPassword: Joi.string().required().valid(Joi.ref("password")),
        address: Joi.string().min(3).max(30),
        phone: Joi.string().min(3).max(30),
    })
});