import express from "express";
import * as userController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import * as userValidator from "../validators/user.validator.js";

export const userRoutes = express.Router();

userRoutes.post("/register", validate(userValidator.register), userController.register);