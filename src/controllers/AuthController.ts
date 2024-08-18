import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

/** Handle validation errors*/
export const loginValidationErrors = (req: Request, res: Response, next: NextFunction) => {

  const valResults = validationResult(req)
  if (!valResults.isEmpty()) {
    return res.status(400).send({ errors: valResults.array() })
  }
  return next()
}

/** Handle successful login */
export const loginSuccess = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({ message: "Successfully logged in" })
}

/** Middleware to check if user is authenticated */
export const loginStatus = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    // res.status(200).send({ message: "Successfully logged out" });
    return next();
  }
  return res.status(400).send({ message: "Unauthenticated" });
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(400).send({ success: false, message: "user session does not exist" })
  }
  req.logout((err) => {
    if (err) {
      return res.status(400).send({ success: false, message: err })
    }
  })
  res.status(200).send({ message: "Successfully logged out" });
}