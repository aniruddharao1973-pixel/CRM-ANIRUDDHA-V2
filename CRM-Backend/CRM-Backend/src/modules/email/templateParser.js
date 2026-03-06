// CRM-Backend/src/modules/email/templateParser.js

/*
=====================================================
EMAIL TEMPLATE PARSER
Replaces {{variable}} placeholders with values
Example:

Template:
"Hello {{contactName}}, your deal {{dealName}} is ready."

Variables:
{
  contactName: "John",
  dealName: "Automation System"
}

Output:
"Hello John, your deal Automation System is ready."
=====================================================
*/

export function parseTemplate(template, variables = {}) {
  // Ensure template is a string
  if (!template || typeof template !== "string") {
    return "";
  }

  return template.replace(/{{\s*(.*?)\s*}}/g, (_, key) => {
    const keys = key.split(".");

    let value = variables;

    // Support nested variables like {{contact.name}}
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        value = "";
        break;
      }
    }

    if (value === null || value === undefined) {
      return "";
    }

    return String(value);
  });
}
