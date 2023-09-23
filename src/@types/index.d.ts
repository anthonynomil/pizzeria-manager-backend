import e from "express";

type TController = (req: e.Request, res: e.Response, next: e.NextFunction) => void | Promise<void>;

type TRoute = {
  path: string;
  router: e.Router;
};
