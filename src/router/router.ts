import { Router } from "express";
import ingredientRouter from "./ingredient/ingredient.routes.js";

const router: Router = Router();

const routes: any[] = [
  {
    path:"/ingredient",
    router: ingredientRouter
  }
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
