import { Router } from "express";
import { route } from "@types";
import routes from "routes";

const router: Router = Router();

routes.forEach((route: route) => {
  router.use(route.path, route.router);
});

export default router;
