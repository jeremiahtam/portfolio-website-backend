import type { ValidationError, FieldValidationError } from "express-validator"

type E = Record<string, ValidationError>

export const formattedErrors = (errors: E) => {

  let formattedErrors: any = {}

  for (const [key, value] of Object.entries(errors)) {
    formattedErrors[key] = value.msg
  }
  return formattedErrors;
}