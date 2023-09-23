import e from "express";
import { Model } from "sequelize";

type TController = (req: e.Request, res: e.Response, next: e.NextFunction) => void | Promise<void>;

type TRoute = {
  path: string;
  router: e.Router;
};

type UpdateAttributes<T extends Model> = {
  [P in keyof T]?: T[P];
};
