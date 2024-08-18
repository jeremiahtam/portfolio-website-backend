import { body } from "express-validator";

export const loginVaildation = [
  body('email').notEmpty().isEmail().withMessage("Invalid email"),
  body('password').notEmpty().isString().isLength({ max: 25, min: 5 })
    .withMessage("Your password should be between 5 to 25 characters long"),
]