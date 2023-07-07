import { Router } from "express";
import ingredientRouter from "./ingredient.routes";

const router: Router = Router();

const routes: routes = [
  {
    path: "/ingredient",
    router: ingredientRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;

export type routes = {
  path: string;
  router: Router;
}[];
