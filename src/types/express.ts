import e from "express";

export type Controller = (req: e.Request, res: e.Response, next: e.NextFunction) => void | Promise<void>;

export type Route = {
  path: string;
  router: e.Router;
};
