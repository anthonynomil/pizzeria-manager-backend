import { Router } from "express";
import validate from "middlewares/validate";
import ingredientValidator from "validator/ingredient.validator";
import ingredientController from "controllers/ingredient.controller";
import userRole from "const/enums/user.roles";
import auth from "middlewares/auth";

const router = Router();

router.post("/", auth(userRole.MODERATOR), validate(ingredientValidator.create), ingredientController.create);
router.get("/:ingredientId", auth(userRole.MODERATOR), validate(ingredientValidator.getById), ingredientController.getById);
router.put("/:ingredientId", auth(userRole.MODERATOR), validate(ingredientValidator.update), ingredientController.update);
router.delete("/:ingredientId", auth(userRole.MODERATOR), validate(ingredientValidator.remove), ingredientController.remove);

export default router;
