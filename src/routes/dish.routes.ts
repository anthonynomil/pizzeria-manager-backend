import { Router } from "express";
import validate from "middlewares/validate";
import dishValidator from "validator/dish.validator";
import dishController from "controllers/dish.controller";
import auth from "middlewares/auth";
import userRole from "const/enums/user.roles";

const router = Router();

router.post("/", auth(userRole.MODERATOR), validate(dishValidator.create), dishController.create);
router.get("/:dishId", auth(userRole.MODERATOR), validate(dishValidator.getById), dishController.getById);
router.put("/:dishId", auth(userRole.MODERATOR), validate(dishValidator.update), dishController.update);
router.delete("/:dishId", auth(userRole.MODERATOR), validate(dishValidator.remove), dishController.remove);

router.post("/:dishId/ingredient/:ingredientId", validate(dishValidator.addIngredient), dishController.addIngredient);
router.delete("/:dishId/ingredient/:ingredientId");

export default router;
