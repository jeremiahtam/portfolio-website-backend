import { body, query } from "express-validator";

export const createUsersVaildation = [
  body('username').notEmpty().isString().isLength({ max: 25, min: 3 }),
  body('email').notEmpty().isEmail().withMessage('Invalid email'),
  body('password').notEmpty().isString().isLength({ max: 25, min: 3 }),
  body('name').notEmpty().isString().isLength({ max: 25, min: 3 }),
]