import { Router } from "express";
import validate from "middlewares/validate";
import userValidator from "validator/user.validator";
import userController from "controllers/user.controller";
import auth from "middlewares/auth";
import userRoles from "const/enums/user.roles";

const router = Router();

router.post("/", auth(userRoles.ADMIN), validate(userValidator.create), userController.create);
router.get("/:userId", auth(userRoles.OWN, userRoles.ADMIN), validate(userValidator.getById), userController.getById);
router.put("/:userId", auth(userRoles.OWN, userRoles.ADMIN), validate(userValidator.update), userController.update);
router.delete("/:userId", auth(userRoles.OWN, userRoles.ADMIN), validate(userValidator.remove), userController.remove);

export default router;
