import Joi from "joi";

const schema = {
    name: Joi.string().required().alphanum().min(1).max(30).lowercase(),
    id: Joi.number().required().min(1),
};

export const add = Joi.object({
    body: Joi.object({
        name: schema.name,
    }),
});

export const getId = Joi.object({
    params: Joi.object({
        id: schema.id,
    }),
});

export const pizzas = Joi.object({
    params: Joi.object({
        id: schema.id,
    }),
});

export const remove = Joi.object({
    params: Joi.object({
        id: schema.id,
    }),
});

export const update = Joi.object({
    params: Joi.object({
        id: schema.id,
    }),
    body: Joi.object({
        name: schema.name,
    }),
});