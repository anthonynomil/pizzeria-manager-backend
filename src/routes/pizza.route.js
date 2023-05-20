import express from "express";
import * as pizzaController from "../controllers/pizza.controller";
import validate from "../middlewares/validate.js";
import * as pizzaValidator from "../validators/pizza.validator";


export const pizzaRoute = express.Router();

pizzaRoute.post("/add", validate(pizzaValidator.add), pizzaController.add);
pizzaRoute.get("/get", pizzaController.getAll);
pizzaRoute.get("/get/:id", validate(pizzaValidator.getId), pizzaController.getById);
pizzaRoute.get("/get/:id/ingredients", validate(pizzaValidator.getId), pizzaController.getIngredients);
pizzaRoute.put("/update/:id", validate(pizzaValidator.update), pizzaController.update);
pizzaRoute.delete("/remove/:id", validate(pizzaValidator.getId), pizzaController.remove);
