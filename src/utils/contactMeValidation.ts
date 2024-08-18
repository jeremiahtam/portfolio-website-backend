import { body } from 'express-validator'

export const contactMeValidation = [
  body('fullname').notEmpty().withMessage("Cannot be empty")
    .isString().withMessage("Value must be a string"),
  body('email').notEmpty().withMessage("Cannot be empty")
    .isEmail().withMessage("Invalid email")
    .isLength({ min: 5 }).withMessage("Must be at least five (5) characters long"),
  body('services').notEmpty().withMessage("Cannot be empty")
    .isString().withMessage("Value must be a string"),
  body('message').notEmpty().withMessage("Cannot be empty")
    .isString().withMessage("Value must be a string")
    .isLength({ max: 200, min: 5 }).withMessage("Must be between 5 and 200 characters long"),
]