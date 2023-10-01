import { Router } from "express";
import validate from "middlewares/validate";
import dishValidator from "validator/dish.validator";
import dishController from "controllers/dish.controller";

const router = Router();

router.post("/", validate(dishValidator.create), dishController.create);
router.get("/:dishId", validate(dishValidator.getById), dishController.getById);
router.put("/:dishId", validate(dishValidator.update), dishController.update);
router.delete("/:dishId", validate(dishValidator.remove), dishController.remove);

router.post("/:dishId/ingredient");
router.delete("/:dishId/ingredient/:ingredientId");

export default router;
