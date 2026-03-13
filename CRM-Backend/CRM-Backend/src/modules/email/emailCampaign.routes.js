// src/modules/email/emailCampaign.routes.js

import express from "express";
import {
  sendCampaign,
  getCampaigns,
  getCampaignStatus,
} from "./emailCampaign.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/*
=====================================================
SEND BULK EMAIL CAMPAIGN
=====================================================
*/

router.post("/send", protect, sendCampaign);
router.get("/list", protect, getCampaigns);
router.get("/campaign/:id/status", protect, getCampaignStatus);

export default router;
