import { Request, Response, NextFunction } from "express"
import { ProjectsModel } from "../models/Projects";
import { matchedData, validationResult } from "express-validator";
import { formattedErrors } from "../utils/formatValidationErrors";
import path from 'path'
import { UploadedFile } from "express-fileupload";

/** Get all projects  */
export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProjects = await ProjectsModel.find({});
    if (allProjects) {
      return res.status(200).send({ data: allProjects })
    } else {
      throw new Error(allProjects)
    }
  } catch (error) {
    return res.status(400).send(error)
  }
}

/** Create a new project */
export const createProject = async (req: Request, res: Response) => {
  /** Validation errors */
  const valErrors = validationResult(req) //errors from validation
  const errors = valErrors.mapped() //map the errors
  const uploadErrors = res.locals.errors
  let finalErrors = formattedErrors(errors)  //Format errors to object
  finalErrors = { ...uploadErrors, ...finalErrors }

  /** Check if file exists */
  let projectPicture;
  if (req.files) {
    // The name of the input field (i.e. "projectPicture") is used to retrieve the uploaded file
    projectPicture = req.files.projectPicture as UploadedFile;
    let fileName = new Date().getTime() + '_' + projectPicture.name;
    let uploadPath = path.resolve(__dirname, '../storage/projectImages/', fileName);

    // If no errors from all input fields, proceed to upload
    if (Object.keys(finalErrors).length == 0) {
      projectPicture.mv(uploadPath, (err: any) => {
        if (err) {
          finalErrors = { ...finalErrors, ...{ projectPicture: err.message } };
        }
      });
    }
    projectPicture = fileName // update the projectPicture's new file name
  }
  /** validate uploaded file and add to validated errors*/
  if (Object.keys(finalErrors).length !== 0) {
    return res.status(400).send({ errors: finalErrors })
  }

  /** Validated data */
  let validatedData = matchedData(req)// passed data
  if (req.files) {
    validatedData = { ...validatedData, ...{ projectPicture: projectPicture } }
  }

  const projectsModel = new ProjectsModel(validatedData);
  try {
    const insertProject = await projectsModel.save()
    if (insertProject) {
      return res.status(201).send(insertProject)
    } else {
      throw new Error(insertProject)
    }
  } catch (error) {
    return res.status(400).send(error)
  }
}