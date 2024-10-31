import { Router } from "express";
import { accountController } from "../controllers/account.controller.js";
import { bodyLoginValidator } from "../middleware/validatorManager.js"
const router = Router();

router.post("/login", bodyLoginValidator, accountController.login);
router.post("/logout", accountController.logout)
export default router;