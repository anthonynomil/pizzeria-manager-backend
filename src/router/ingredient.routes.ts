import { Router } from "express";
import * as iController from "../controllers/ingredients.controller";
import * as iValidator from "../validators/ingredients.validator";
import validate from "../middlewares/validate";

const router = Router();

router.get("/", iController.get);
router.get("/:id", validate(iValidator.getId), iController.getById);
router.post("/", validate(iValidator.add), iController.add);
router.delete("/:id", validate(iValidator.deleteId), iController.remove);

export default router;
