import { Router } from "express";
import { loginVaildation } from "../utils/authValidation.js";
import passport from "passport";
import { loginValidationErrors, loginStatus, loginSuccess, logout } from "../controllers/AuthController.js";

const router = Router();

/** Login with passport */
router.post('/api/auth-passport', loginVaildation, loginValidationErrors,
  passport.authenticate('local', { failureMessage: true }), loginSuccess
)

/** Logout with passport  */
router.delete('/api/auth-passport/logout', loginStatus, logout)

export default router;