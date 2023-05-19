import Joi from "joi";

export const add = {
    body: Joi.object().keys({
        name: Joi.string().required().alphanum().min(1).max(30).lowercase(),
    }),
};

export const getById = {
    query: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),
};

export const getByName = {
    params: Joi.object().keys({
        name: Joi.string().required().alphanum().min(1).max(30).lowercase(),
    }),
};

export const removeById = {
    body: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),
};

export const updateById = {
    body: Joi.object().keys({
        id: Joi.number().required().min(1),
        name: Joi.string().required().alphanum().min(3).max(30).lowercase(),
    }),
};