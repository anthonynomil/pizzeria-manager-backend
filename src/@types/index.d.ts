import e from "express";

type Controller = (req: e.Request, res: e.Response, next: e.NextFunction) => void | Promise<void>;

type route = {
  path: string;
  router: e.Router;
};