// // CRM-Backend/src/modules/email/templateParser.js

// /*
// =====================================================
// EMAIL TEMPLATE PARSER
// Replaces {{variable}} placeholders with values
// Example:

// Template:
// "Hello {{contactName}}, your deal {{dealName}} is ready."

// Variables:
// {
//   contactName: "John",
//   dealName: "Automation System"
// }

// Output:
// "Hello John, your deal Automation System is ready."
// =====================================================
// */

// export function parseTemplate(template, variables = {}) {
//   // Ensure template is a string
//   if (!template || typeof template !== "string") {
//     return "";
//   }

//   return template.replace(/{{\s*(.*?)\s*}}/g, (_, key) => {
//     const keys = key.split(".");

//     let value = variables;

//     // Support nested variables like {{contact.name}}
//     for (const k of keys) {
//       if (value && typeof value === "object" && k in value) {
//         value = value[k];
//       } else {
//         value = "";
//         break;
//       }
//     }

//     if (value === null || value === undefined) {
//       return "";
//     }

//     return String(value);
//   });
// }

// ======================================================================
// CRM-Backend/src/modules/email/templateParser.js

/*
=====================================================
ADVANCED EMAIL TEMPLATE PARSER
Supports:

{{contact.firstName}}
{{deal.amount}}
{{today}}
{{contact.firstName || "Customer"}}
=====================================================
*/

// export function parseTemplate(template, variables = {}) {
//   if (!template || typeof template !== "string") return "";

//   return template.replace(/{{\s*(.*?)\s*}}/g, (_, expression) => {
//     try {
//       // support fallback: {{contact.name || "Customer"}}
//       const [path, fallback] = expression.split("||").map((s) => s.trim());

//       const keys = path.split(".");

//       let value = variables;

//       for (const k of keys) {
//         if (value && typeof value === "object" && k in value) {
//           value = value[k];
//         } else {
//           value = undefined;
//           break;
//         }
//       }

//       if (value === undefined || value === null || value === "") {
//         if (fallback) {
//           return fallback.replace(/['"]/g, "");
//         }
//         return "";
//       }

//       return String(value);
//     } catch (err) {
//       return "";
//     }
//   });
// }
// ==============================================================

// CRM-Backend/src/modules/email/templateParser.js

/*
=====================================================
ADVANCED EMAIL TEMPLATE PARSER
Supports:

{{contact.firstName}}
{{deal.amount}}
{{today}}
{{contact.firstName || "Customer"}}
=====================================================
*/

// export function parseTemplate(template, variables = {}) {
//   if (!template || typeof template !== "string") return "";

//   return template.replace(/{{\s*(.*?)\s*}}/g, (_, expression) => {
//     try {
//       // support fallback: {{contact.name || "Customer"}}
//       const [path, fallback] = expression.split("||").map((s) => s.trim());

//       const keys = path.split(".");

//       let value = variables;

//       for (const k of keys) {
//         if (value && typeof value === "object" && k in value) {
//           value = value[k];
//         } else {
//           value = undefined;
//           break;
//         }
//       }

//       if (value === undefined || value === null || value === "") {
//         if (fallback) {
//           return fallback.replace(/['"]/g, "");
//         }
//         return "";
//       }

//       return String(value);
//     } catch (err) {
//       return "";
//     }
//   });
// }

// CRM-Backend/src/modules/email/templateParser.js

/*
=====================================================
ADVANCED EMAIL TEMPLATE PARSER
Supports:

{{contact.firstName}}
{{deal.amount}}
{{today}}
{{contact.firstName || "Customer"}}
=====================================================
*/

// export function parseTemplate(template, variables = {}) {
//   if (!template || typeof template !== "string") return "";

//   return template.replace(/{{\s*(.*?)\s*}}/g, (_, expression) => {
//     try {
//       // support fallback: {{contact.name || "Customer"}}
//       const [path, fallback] = expression.split("||").map((s) => s.trim());

//       const keys = path.split(".");

//       let value = variables;

//       for (const k of keys) {
//         if (value && typeof value === "object" && k in value) {
//           value = value[k];
//         } else {
//           value = undefined;
//           break;
//         }
//       }

//       if (value === undefined || value === null || value === "") {
//         if (fallback) {
//           return fallback.replace(/['"]/g, "");
//         }
//         return "";
//       }

//       return String(value);
//     } catch (err) {
//       return "";
//     }
//   });
// }

// CRM-Backend/src/modules/email/templateParser.js

/*
=====================================================
ADVANCED EMAIL TEMPLATE PARSER (PRODUCTION VERSION)

Supports:

{{contact.firstName}}
{{deal.amount}}
{{account.industry}}
{{today}}
{{contact.firstName || "Customer"}}

Features:
✔ Nested object resolution
✔ Safe fallback values
✔ Prevents runtime crashes
✔ Supports global variables
✔ Handles missing CRM fields gracefully
=====================================================
*/

/*
=====================================================
RESOLVE NESTED OBJECT PATH
Example:
resolvePath(obj, "account.industry")
=====================================================
*/
function resolvePath(object, path) {
  if (!object || !path) return undefined;

  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return current[key];
    }
    return undefined;
  }, object);
}

/*
=====================================================
GLOBAL VARIABLES
=====================================================
*/
function resolveGlobalVariable(name) {
  switch (name) {
    case "today":
      return new Date().toLocaleDateString();

    case "year":
      return new Date().getFullYear();

    default:
      return undefined;
  }
}

/*
=====================================================
MAIN TEMPLATE PARSER
=====================================================
*/
export function parseTemplate(template, variables = {}) {
  if (!template || typeof template !== "string") return "";

  return template.replace(/{{\s*(.*?)\s*}}/g, (_, expression) => {
    try {
      /*
      =====================================================
      SUPPORT FALLBACK VALUES
      Example:
      {{contact.firstName || "Customer"}}
      =====================================================
      */
      const [path, fallback] = expression.split("||").map((s) => s.trim());

      /*
      =====================================================
      CHECK GLOBAL VARIABLES
      =====================================================
      */
      let value = resolveGlobalVariable(path);

      /*
      =====================================================
      RESOLVE FROM CRM VARIABLES
      =====================================================
      */
      if (value === undefined) {
        value = resolvePath(variables, path);
      }

      /*
      =====================================================
      HANDLE EMPTY OR MISSING VALUES
      =====================================================
      */
      if (value === undefined || value === null || value === "") {
        if (fallback) {
          return fallback.replace(/['"]/g, "");
        }
        return "";
      }

      return String(value);
    } catch (err) {
      console.warn("⚠️ Template parsing error:", expression);
      return "";
    }
  });
}
