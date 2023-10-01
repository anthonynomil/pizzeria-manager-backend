import { Router } from "express";
import ingredientsController from "controllers/ingredients.controller";

const router = Router();

router.get("/", ingredientsController.getAll);

export default router;
