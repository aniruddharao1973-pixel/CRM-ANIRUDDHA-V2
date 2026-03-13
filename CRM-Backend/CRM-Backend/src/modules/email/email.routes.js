// CRM-Backend/src/modules/email/email.routes.js

import express from "express";
import * as emailController from "./email.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import campaignRoutes from "./emailCampaign.routes.js";

const router = express.Router();

/*
=====================================================
EMAIL TEMPLATE ROUTES
=====================================================
*/
router.post("/templates", protect, emailController.createTemplate);
router.get("/templates", protect, emailController.getTemplates);

/*
=====================================================
SEND EMAIL
=====================================================
*/
router.post("/send", protect, emailController.sendEmail);

/*
=====================================================
EMAIL LOGS
=====================================================
*/
router.get("/logs", protect, emailController.getEmailLogs);

/*
=====================================================
CONNECT GOOGLE
=====================================================
*/
router.get("/connect/google", protect, emailController.connectGoogle);
router.get("/google/callback", emailController.googleCallback);

/*
=====================================================
CONNECT OUTLOOK
=====================================================
*/
router.get("/connect/outlook", protect, emailController.connectOutlook);
router.get("/outlook/callback", emailController.outlookCallback);

router.post(
  "/templates/generate-ai",
  protect,
  emailController.generateTemplateAI,
);

router.delete("/templates/:id", protect, emailController.deleteTemplate);

router.put("/templates/:id", protect, emailController.updateTemplate);

router.use("/campaign", campaignRoutes);

export default router;
