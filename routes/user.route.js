import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { verifyToken, checkPermission } from '../middleware/auth.js';
import { bodyUserValidator } from "../middleware/validatorManager.js";

const router = Router();

router.get("/getAllUsers", verifyToken, checkPermission(['Admin']), userController.getAllUsers);
router.get("/getUserInfo", userController.getUserInfo);
router.post("/register", bodyUserValidator, userController.register);

export default router;