import { body } from 'express-validator'

export const createProjectValidation = [
  body('projectDate')
    .notEmpty().withMessage("Cannot be empty")
    .isString().withMessage("Value must be a string")
    .isLength({ max: 15, min: 4 }).withMessage("Must be between 4 and 15 characters long"),
  body('projectTitle').notEmpty().withMessage("Cannot be empty")
    .isString().withMessage("Value must be a string")
    .isLength({ max: 25, min: 5 }).withMessage("Must be between 5 and 25 characters long"),
  body('projectDetails').notEmpty().withMessage("Cannot be empty")
    .isString().withMessage("Value must be a string")
    .isLength({ max: 70, min: 10 }).withMessage("Must be between 10 and 70 characters long"),
  body('projectTags').notEmpty().withMessage("Cannot be empty")
    .isString().withMessage("Value must be a string")
]