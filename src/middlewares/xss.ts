import { inHTMLData } from "xss-filters";
import e from "express";

export function clean(data: string | object = ""): any {
  let isObject = false;
  if (typeof data === "object") {
    data = JSON.stringify(data);
    isObject = true;
  }

  data = inHTMLData(data).trim();
  if (isObject) data = JSON.parse(data);
  return data;
}

export default () => {
  return (req: e.Request, res: e.Response, next: e.NextFunction) => {
    if (req.body) req.body = clean(req.body);
    if (req.query) req.query = clean(req.query);
    if (req.params) req.params = clean(req.params);
    next();
  };
};
