import express from "express";
import * as pizzaController from "../controllers/pizza.controller.js";
import validate from "../middlewares/validate.js";
import * as pizzaValidator from "../validators/pizza.validator.js";


export const pizzaRoute = express.Router();

pizzaRoute.post("/add", validate(pizzaValidator.add), pizzaController.add);
pizzaRoute.get("/get", pizzaController.getAll);
pizzaRoute.get("/get/:id", validate(pizzaValidator.getById), pizzaController.getById);
pizzaRoute.get("/get/:name", validate(pizzaValidator.getByName), pizzaController.getByName);
pizzaRoute.delete("/remove/:id", validate(pizzaValidator.remove), pizzaController.removeById);
pizzaRoute.put("/update/:id", validate(pizzaValidator.update), pizzaController.updateById);
pizzaRoute.get("/get/id/:id/ingredients", validate(pizzaValidator.getIngredientsById), pizzaController.getIngredientsByPizzaId);
pizzaRoute.get("/get/name/:name/ingredients", validate(pizzaValidator.getIngredientsByName), pizzaController.getIngredientsByPizzaName);
