import { Request, Response, NextFunction } from "express";

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  let errors = {}

  if (!req.files || Object.keys(req.files).length === 0) {
    errors = { ...errors, ...{ projectPicture: "No files were added" } }
  }
  res.locals.errors = errors
  next()
}