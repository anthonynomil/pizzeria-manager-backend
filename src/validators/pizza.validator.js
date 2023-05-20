import Joi from "joi";

const schema = {
    id: Joi.number().required().min(1),
    name: Joi.string().required().alphanum().min(3).max(30).lowercase(),
    price: Joi.number().required().min(0).max(1000),
    ingredients: Joi.array().items(Joi.string().required().alphanum().lowercase().min(3).max(30)).min(1).max(10),
};

export const add = Joi.object({
    body: Joi.object({
        name: schema.name,
        price: schema.price,
        ingredients: schema.ingredients,
    })
});

export const getId = Joi.object({
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
        price: schema.price,
        ingredients: schema.ingredients,
    }),
});

export const removeByName = Joi.object({
    params: Joi.object({
        id: schema.id,
        name: schema.name,
    }),
});