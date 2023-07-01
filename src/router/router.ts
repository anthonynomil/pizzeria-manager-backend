import { Router } from "express";

const router: Router = Router();

const routes: any[] = [];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
