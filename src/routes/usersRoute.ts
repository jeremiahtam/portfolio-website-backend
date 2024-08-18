import { Router } from "express";
import { createUser, getUserById } from '../controllers/UsersController'
import { createUsersVaildation } from "../utils/usersValidation";
import { loginStatus } from "../controllers/AuthController";

const router = Router();

/** Create user route */
router.post('/api/create-user', loginStatus,
  createUsersVaildation, createUser)

export default router;