import { Router } from "express";
import {
  Signup,
  Login,
  // ForgotPassword,
  // Logout,
} from "../controllers/AuthController.js";
import { userVerification } from "../middlewares/AuthMiddleware.js";

const router = Router();
// router.use(userVerification);
router.post("/signup", Signup);
router.post("/login", Login);
// router.post("/forgotpassword", ForgotPassword);
// router.post("/logout", Logout);

export default router;