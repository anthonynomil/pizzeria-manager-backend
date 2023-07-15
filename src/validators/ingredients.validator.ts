import Joi from "joi";
import schema from "./index";

export const add = Joi.object({
    body: Joi.object({
        name: schema.global.name,
    }),
});

export const getId = Joi.object({
    params: Joi.object({
        id: schema.global.id,
    }),
});

export const update = Joi.object({
    params: Joi.object({
        id: schema.global.id,
    }),
    body: Joi.object({
        name: schema.global.name,
    }),
});

export let deleteId = Joi.object({
    params: Joi.object({
        id: schema.global.id,
    }),
});
