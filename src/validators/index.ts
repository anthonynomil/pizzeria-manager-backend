import Joi from "joi";

const schema = {
    pizza: {},
    ingredient: {},
    user: {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(30),
        token: Joi.string().required().min(1),
    },
    global: {
        id: Joi.number().required().min(1),
        name: Joi.string().required().alphanum().min(1).max(30).lowercase(),
    }
};


export default schema;