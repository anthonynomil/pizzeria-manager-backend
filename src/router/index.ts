import { Router } from "express";
import { TRoute } from "@types";
import routes from "routes";

const router: Router = Router();

routes.forEach((route: TRoute) => {
  router.use(route.path, route.router);
});

export default router;
