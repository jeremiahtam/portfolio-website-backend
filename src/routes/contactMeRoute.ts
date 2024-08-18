import { Router } from "express";
import { sendEmail } from "../controllers/ContactMeController";
import { contactMeValidation } from "../utils/contactMeValidation";

const router = Router();

router.post('/api/contact-me', contactMeValidation, sendEmail)

export default router;