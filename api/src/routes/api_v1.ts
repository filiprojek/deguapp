import { Router } from "express";
import * as authController from "../controllers/authController";
import validate from '../middlewares/validateRequest'
import * as AuthVal from '../validators/authValidator'
//import handleValidation from "../middlewares/handleValidation";
//import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

//const mws = [requireAuth, handleValidation.handleValidationError];

router.post("/auth/signup",validate(AuthVal.signup) , authController.signup_post);

//router.post(
//  "/login",
//  authValidator.checkUserLogin(),
//  handleValidation.handleValidationError,
//  userController.login_post
//);

//router.post(
//  "/register",
//  authValidator.checkUserRegister(),
//  handleValidation.handleValidationError,
//  userController.register_post
//);

//router.post("/logout", userController.logout_post);

//router.post(
//  "/edit",
//  [requireAuth],
//  authValidator.checkChange(),
//  userController.edit_post
//);

export default router;
