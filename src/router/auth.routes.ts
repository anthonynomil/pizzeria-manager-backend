import {Router} from "express";
import validate from "../middlewares/validate";
import * as validator from "../validators/auth.validator"
import * as controller from "../controllers/auth.controller"

const router = Router();

router.post("/login", validate(validator.login), controller.login)


export default router;