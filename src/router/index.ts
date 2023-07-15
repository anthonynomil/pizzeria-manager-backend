import {Router} from "express";
import ingredientRouter from "./ingredient.routes";
import authRouter from "./auth.routes";

const router: Router = Router();

const routes: routes = [
    {
        path: "/ingredient",
        router: ingredientRouter,
    },
    {
        path: "/auth",
        router: authRouter,
    }
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;

export type routes = {
    path: string;
    router: Router;
}[];
