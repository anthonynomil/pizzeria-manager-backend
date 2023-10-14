import e from "express";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import pick from "utils/pick.utils";

const validate =
  (schema: any) =>
  (req: e.Request, res: e.Response, next: e.NextFunction): any => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const keysToValidate = Object.keys(validSchema);
    const object = pick(req, keysToValidate);
    const errors = [];
    for (const key of keysToValidate) {
      const parsed = validSchema[key].safeParse(object[key]);
      if (!parsed.success) {
        const error = parsed.error?.errors?.map((e: any) => e.message).join(", ");
        errors.push(error);
      } else object[key] = parsed.data;
    }
    if (errors.length) return next(new ApiError(httpStatus.BAD_REQUEST, errors.join(", ")));
    Object.assign(req, object);
    next();
  };

export default validate;
