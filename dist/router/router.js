"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingredient_routes_1 = __importDefault(require("./ingredient.routes"));
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/ingredient",
        router: ingredient_routes_1.default,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.router);
});
exports.default = router;
