import { Router } from "express";
import validate from "middlewares/validate";
import ingredientValidator from "validator/ingredient.validator";
import ingredientController from "controllers/ingredient.controller";

const router = Router();

router.post("/", validate(ingredientValidator.create), ingredientController.create);
router.get("/:ingredientId", validate(ingredientValidator.getById), ingredientController.getById);
router.put("/:ingredientId", validate(ingredientValidator.update), ingredientController.update);
router.delete("/:ingredientId", validate(ingredientValidator.remove), ingredientController.remove);

export default router;
