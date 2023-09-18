import httpStatus from "http-status";
import Joi from "joi";
import pick from "utils/pick";
import ApiError from "utils/ApiError";
import e from "express";

const validate =
  (schema: any) =>
  (req: e.Request, res: e.Response, next: e.NextFunction): any => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: `key` } })
      .validate(object);
    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
