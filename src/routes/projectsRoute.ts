import { Router } from "express";
import { getAllProjects, createProject } from "../controllers/ProjectsController";
import { createProjectValidation } from "../utils/projectsValidation";
import { uploadFile } from "../middleware/uploads";
import { loginStatus } from "../controllers/AuthController";

const router = Router();

router.get('/api/get-projects', getAllProjects)
router.post('/api/create-project', loginStatus, uploadFile, createProjectValidation, createProject)

export default router;