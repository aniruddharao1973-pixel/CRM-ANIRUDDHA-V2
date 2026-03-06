import express from "express";
import * as emailController from "./email.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/*
EMAIL TEMPLATE ROUTES
*/

router.post("/templates", protect, emailController.createTemplate);

router.get("/templates", protect, emailController.getTemplates);

/*
SEND EMAIL
*/

router.post("/send", protect, emailController.sendEmail);

/*
EMAIL LOGS
*/

router.get("/logs", protect, emailController.getEmailLogs);

export default router;
