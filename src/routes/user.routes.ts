import { Router } from "express";
import validate from "middlewares/validate";
import userValidator from "validator/user.validator";
import userController from "controllers/user.controller";

const router = Router();

router.post("/", validate(userValidator.create), userController.create);
router.get("/:id", validate(userValidator.getById), userController.getById);
router.put("/:id", validate(userValidator.update), userController.update);
router.delete("/:id", validate(userValidator.remove), userController.remove);

export default router;