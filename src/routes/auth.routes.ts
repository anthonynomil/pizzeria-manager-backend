import { Router } from "express";
import validate from "middlewares/validate";
import authValidator from "validator/auth.validator";
import authController from "controllers/auth.controller";

const router = Router();

router.post("/login", validate(authValidator.login), authController.login);
router.post("/register", validate(authValidator.register), authController.register);
router.post("/refresh-tokens", validate(authValidator.refreshTokens), authController.refreshToken);

export default router;
