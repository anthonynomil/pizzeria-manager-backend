import express from "express";
import * as controllerIngredient from "../controllers/ingredient.controller.js";
import validate from "../middlewares/validate.js";
import * as validatorIngredient from "../validators/ingredient.validator.js";


export const ingredientRoutes = express.Router();

ingredientRoutes.post("/add", validate(validatorIngredient.add), controllerIngredient.add);
ingredientRoutes.get("/get", controllerIngredient.getAll);
ingredientRoutes.get("/get/:id", validate(validatorIngredient.getId), controllerIngredient.getId);
ingredientRoutes.get("/get/:id/pizzas", validate(validatorIngredient.pizzas), controllerIngredient.getPizzasById);
ingredientRoutes.put("/:id", validate(validatorIngredient.update), controllerIngredient.updateById);
ingredientRoutes.delete("/:id", validate(validatorIngredient.remove), controllerIngredient.removeById);