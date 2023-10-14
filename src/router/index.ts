import { Router } from "express";
import routes from "routes";
import { Route } from "types/express";

const router: Router = Router();

routes.forEach((route: Route) => {
  router.use(route.path, route.router);
});

export default router;
