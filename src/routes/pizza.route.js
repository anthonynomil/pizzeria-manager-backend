import express from "express";
import * as pizzaController from "../controllers/pizza.controller.js";
import validate from "../middlewares/validate.js";
import * as pizzaValidator from "../validators/pizza.validator.js";


export const pizzaRoute = express.Router();

pizzaRoute.post("/add", validate(pizzaValidator.add), pizzaController.add);
pizzaRoute.get("/get", pizzaController.getAll);
pizzaRoute.get("/get/id", validate(pizzaValidator.getId), pizzaController.getById);
pizzaRoute.get("/get/name", validate(pizzaValidator.getName), pizzaController.getByName);
pizzaRoute.delete("/remove", validate(pizzaValidator.postId), pizzaController.removeById);
pizzaRoute.delete("remote/name", validate(pizzaValidator.postName), pizzaController.removeByName);
pizzaRoute.put("/update", validate(pizzaValidator.postUpdateId), pizzaController.updateById);
pizzaRoute.put("/update/name", validate(pizzaValidator.postUpdateName, pizzaController.updateByName));
pizzaRoute.get("/get/ingredients/id", validate(pizzaValidator.getId), pizzaController.getIngredientsByPizzaId);
pizzaRoute.get("/get/ingredients/name", validate(pizzaValidator.getName), pizzaController.getIngredientsByPizzaName);
