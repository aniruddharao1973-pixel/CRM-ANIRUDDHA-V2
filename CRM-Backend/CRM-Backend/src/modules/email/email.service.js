// CRM-Backend/src/modules/email/email.service.js

import prisma from "../../utils/prisma.js";
import { parseTemplate } from "./templateParser.js";

/*
=====================================================
CREATE EMAIL TEMPLATE
=====================================================
*/
export const createTemplate = async (data, userId) => {
  const template = await prisma.emailTemplate.create({
    data: {
      name: data.name,
      subject: data.subject,
      body: data.body,
      category: data.category || null,
      createdById: userId,
    },
  });

  return template;
};

/*
=====================================================
GET ALL EMAIL TEMPLATES
=====================================================
*/
export const getTemplates = async () => {
  return prisma.emailTemplate.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      subject: true,
      category: true,
      createdAt: true,
    },
  });
};

/*
=====================================================
SEND EMAIL
(Currently logs email in CRM DB)
SMTP / Outlook integration can be added later
=====================================================
*/
export const sendEmail = async (data, userId) => {
  let subject = data.subject || "";
  let body = data.body || "";

  /*
  TEMPLATE PROCESSING
  */
  if (data.templateId) {
    const template = await prisma.emailTemplate.findUnique({
      where: { id: data.templateId },
    });

    if (!template) {
      throw new Error("Email template not found");
    }

    subject = parseTemplate(template.subject, data.variables || {});
    body = parseTemplate(template.body, data.variables || {});
  }

  /*
  CREATE EMAIL LOG
  */
  const email = await prisma.emailLog.create({
    data: {
      toEmail: data.toEmail,
      ccEmails: data.ccEmails || null,
      bccEmails: data.bccEmails || null,

      subject,
      body,

      provider: data.provider || null,

      /*
      CRM RECORD LINKS
      */

      dealId: data.dealId || null,
      contactId: data.contactId || null,
      accountId: data.accountId || null,

      /*
      THREAD SUPPORT
      */

      threadId: data.threadId || null,
      inReplyTo: data.inReplyTo || null,

      templateId: data.templateId || null,

      sentById: userId,

      status: "SENT",
      direction: "OUTBOUND",
      folder: "SENT",

      sentAt: new Date(),
    },

    include: {
      sentBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  /*
  ATTACHMENTS SUPPORT (Optional)
  */
  if (data.attachments && data.attachments.length > 0) {
    const attachmentData = data.attachments.map((file) => ({
      emailId: email.id,
      fileName: file.fileName,
      fileUrl: file.fileUrl,
      fileSize: file.fileSize || null,
    }));

    await prisma.emailAttachment.createMany({
      data: attachmentData,
    });
  }

  return email;
};

/*
=====================================================
GET EMAIL LOGS
=====================================================
*/
export const getEmailLogs = async (filters) => {
  const where = {};

  if (filters.dealId) where.dealId = filters.dealId;
  if (filters.contactId) where.contactId = filters.contactId;
  if (filters.accountId) where.accountId = filters.accountId;
  if (filters.threadId) where.threadId = filters.threadId;

  return prisma.emailLog.findMany({
    where,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      sentBy: {
        select: {
          id: true,
          name: true,
        },
      },

      template: {
        select: {
          id: true,
          name: true,
        },
      },

      attachments: true,
    },
  });
};
