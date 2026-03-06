// CRM-Backend/src/modules/email/email.controller.js

import * as emailService from "./email.service.js";

/*
CREATE EMAIL TEMPLATE
*/
export const createTemplate = async (req, res) => {
  try {
    const { name, subject, body } = req.body;

    if (!name || !subject || !body) {
      return res.status(400).json({
        success: false,
        message: "Template name, subject, and body are required"
      });
    }

    const template = await emailService.createTemplate(
      { name, subject, body },
      req.user.id
    );

    return res.status(201).json({
      success: true,
      message: "Template created successfully",
      data: template
    });

  } catch (error) {
    console.error("Create Template Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create template"
    });
  }
};


/*
GET ALL EMAIL TEMPLATES
*/
export const getTemplates = async (req, res) => {
  try {

    const templates = await emailService.getTemplates();

    return res.status(200).json({
      success: true,
      count: templates.length,
      data: templates
    });

  } catch (error) {
    console.error("Get Templates Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch templates"
    });
  }
};


/*
SEND EMAIL
(Currently logs email in CRM. SMTP integration can be added later)
*/
export const sendEmail = async (req, res) => {
  try {

    const { toEmail, subject, body } = req.body;

    if (!toEmail) {
      return res.status(400).json({
        success: false,
        message: "Recipient email (toEmail) is required"
      });
    }

    if (!subject && !req.body.templateId) {
      return res.status(400).json({
        success: false,
        message: "Subject or templateId must be provided"
      });
    }

    const email = await emailService.sendEmail(
      req.body,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Email logged successfully",
      data: email
    });

  } catch (error) {
    console.error("Send Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
};


/*
GET EMAIL LOGS
Supports filters:
- dealId
- contactId
- accountId
*/
export const getEmailLogs = async (req, res) => {
  try {

    const logs = await emailService.getEmailLogs(req.query);

    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });

  } catch (error) {
    console.error("Get Email Logs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch email logs"
    });
  }
};