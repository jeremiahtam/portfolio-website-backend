import { Response, Request } from 'express'
import { matchedData, validationResult } from "express-validator"
import { UsersModel } from '../models/Users.js'
import { hashPassword } from "../utils/helpers.js"
import { formattedErrors } from '../utils/formatValidationErrors.js'


export const createUser = async (req: Request, res: Response) => {
  /** Validation errors */
  const valErrors = validationResult(req)
  const errors = valErrors.mapped() //map the errors
  let finalErrors = formattedErrors(errors)  //Format errors to object

  if (Object.keys(finalErrors).length !== 0) {
    return res.status(400).send({ errors: finalErrors })
  }

  const validatedData = matchedData(req)
  /** Hash password */
  validatedData.password = hashPassword(validatedData.password)
  const newUserData = {
    username: validatedData.username,
    password: validatedData.password,
    name: validatedData.name,
    email: validatedData.email
  }
  const usersModel = new UsersModel(newUserData)
  try {
    const newUser = await usersModel.save()
    // console.log(newUser)
    if (newUser) {
      return res.status(201).send(newUser)
    } else {
      throw new Error(newUser)
    }
  } catch (err: any) {
    return res.status(400).send(err.errorResponse)
  }
}


export const getUserById = async (req: Request, res: Response) => {
  try {
    const foundUser = await UsersModel.findById(req.params.id)
    if (foundUser) {
      return res.status(200).send(foundUser)
    } else {
      throw new Error("User no found")
    }
  } catch (err: any) {
    return res.status(400).send(err.errorResponse)
  }
}
