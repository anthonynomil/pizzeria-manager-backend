import httpStatus from "http-status";
import Joi from "joi";
import ApiError from "../utils/ApiError.js";
import pick from "../utils/pick.js";

const validate = (schema) => (req, res, next) => {
    const validateSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validateSchema));
    const {
        value,
        error
    } = Joi.compile(validateSchema).prefs({errors: {label: "key"}}).validate(object);
    if (error) {
        const message = error.details.map((details) => details.message).join(", ");
        return next(new ApiError(httpStatus.BAD_REQUEST, message));
    }
    Object.assign(req, value);
    return next();
};

export default validate;