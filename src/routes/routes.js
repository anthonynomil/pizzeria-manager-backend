import express from "express";
import {ingredientRoutes} from "./ingredient.routes.js";
import {pizzaRoute} from "./pizza.route.js";

const router = express.Router();

const routes = [{
    path: "/ingredient",
    route: ingredientRoutes,
}, {
    path: "/pizza",
    route: pizzaRoute,
}];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;