import { Router } from "express";
import * as authController from "../controllers/authController";
import validate from '../middlewares/validateRequest'
import * as AuthVal from '../validators/authValidator'
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/auth/signup",validate(AuthVal.signup) , authController.signup_post);
router.post("/auth/signin",validate(AuthVal.signin) , authController.signin_post);
router.post("/auth/logout", requireAuth, authController.logout_post);
router.get("/auth/status", requireAuth, authController.status_get);

export default router;