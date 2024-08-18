
import { Request, Response } from "express";
import { transporter } from "../mailers/contactEmailConfig";
import { validationResult, matchedData } from "express-validator";
import { formattedErrors } from "../utils/formatValidationErrors";

export const sendEmail = (req: Request, res: Response) => {
  /** Validation errors */
  const valErrors = validationResult(req)
  const errors = valErrors.mapped() //map the errors
  let finalErrors = formattedErrors(errors)  //Format errors to object

  if (Object.keys(finalErrors).length !== 0) {
    return res.status(400).send({ errors: finalErrors })
  }

  /** Validated data */
  const validatedData = matchedData(req)

  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: process.env.MAIL_TO_ADDRESS,
    subject: validatedData.services,
    replyTo: validatedData.email,
    text: validatedData.message
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(400).send({
        errors: true,
        message: "Network error. Please try again later",
        data: error.name
      })
    } else {
      return res.status(200).send({
        message: "Email sent successfully",
        data: info.response
      })
    }
  });
}