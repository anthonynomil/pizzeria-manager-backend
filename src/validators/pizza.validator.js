import Joi from "joi";

const schema = {
    id: Joi.number().required().min(1),
    name: Joi.string().required().alphanum().min(3).max(30).lowercase(),
    price: Joi.number().required().min(0).max(1000),
    ingredients: Joi.array().items(Joi.string().required().alphanum().lowercase().min(3).max(30)).min(1).max(10),
};

export const add = {
    body: Joi.object().keys({
        name: schema.name,
        price: schema.price,
        ingredients: schema.ingredients,
    }),
};

export const postUpdateId = {
    body: Joi.object().keys({
        id: schema.id,
        name: schema.name,
        price: schema.price,
        ingredients: schema.ingredients,
    }),
};

export const postUpdateName = {
    body: Joi.object().keys({
        oldName: schema.name,
        name: schema.name,
        price: schema.price,
        ingredients: schema.ingredients,
    })
};

export const getId = {
    query: Joi.object().keys({
        id: schema.id,
    })
};

export const getName = {
    query: Joi.object().keys({
        name: schema.name,
    })
};

export const postId = {
    body: Joi.object().keys({
        id: schema.id,
    })
};

export const postName = {
    body: Joi.object().keys({
        name: schema.name,
    })
};