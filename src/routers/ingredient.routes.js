import express from "express";
import * as controllerIngredient from "../controllers/ingredient.controller.js";
import validate from "../middlewares/validate.js";
import * as validatorIngredient from "../validators/ingredient.validator.js";


export const ingredientRoutes = express.Router();

ingredientRoutes.post("/add", validate(validatorIngredient.add), controllerIngredient.add);
ingredientRoutes.get("/get", controllerIngredient.getAll);
ingredientRoutes.get("/get/id", validate(validatorIngredient.getById), controllerIngredient.getById);
ingredientRoutes.delete("/remove", validate(validatorIngredient.removeById), controllerIngredient.removeById);
ingredientRoutes.put("/update", validate(validatorIngredient.updateById), controllerIngredient.updateById);