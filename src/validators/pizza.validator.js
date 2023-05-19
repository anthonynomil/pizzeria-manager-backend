import Joi from "joi";

export const add = {
    body: Joi.object().keys({
        name: Joi.string().required().alphanum().min(3).max(30).lowercase(),
        price: Joi.number().required().min(0).max(1000),
        ingredients: Joi.array().items(Joi.string().required().alphanum().min(3).max(30)).min(1).max(10),
    }),
};

export const addIngredient = {
    body: Joi.object().keys({
        name: Joi.string().required().alphanum().min(3).max(30).lowercase(),
        ingredient: Joi.string().required().alphanum().min(3).max(30).lowercase(),
    }),
};

export const getById = {
    query: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),
};

export const remove = {
    body: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),
};

export const update = {
    body: Joi.object().keys({
        id: Joi.number().required().min(1),
        name: Joi.string().required().alphanum().min(3).max(30).lowercase(),
        price: Joi.number().required().min(0).max(1000),
        ingredients: Joi.array().items(Joi.string().required().alphanum().min(3).max(30).lowercase()).min(1).max(10),
    }),
};

export const getIngredientsById = {
    query: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),
};

export const getIngredientsByName = {
    query: Joi.object().keys({
        name: Joi.string().required().alphanum().min(3).max(30).lowercase(),
    }),
};

export const getByName = {
    query: Joi.object().keys({
        name: Joi.string().required().alphanum().min(3).max(30).lowercase(),
    }),
};