// // CRM-Frontend\src\features\email\components\SendEmailModal.jsx
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { sendEmail } from "../emailSlice";
// import {
//   XMarkIcon,
//   PaperAirplaneIcon,
// } from "@heroicons/react/24/outline";

// const SendEmailModal = ({ deal, onClose }) => {
//   const dispatch = useDispatch();

//   const [subject, setSubject] = useState(
//     `Regarding ${deal?.dealName || ""}`
//   );

//   const [body, setBody] = useState("");

//   const handleSend = async () => {
//     try {
//       await dispatch(
//         sendEmail({
//           to: deal.contact?.email,
//           subject,
//           body,
//           dealId: deal.id,
//         })
//       ).unwrap();

//       onClose();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send email");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 space-y-4">

//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">
//             Send Email
//           </h2>

//           <button onClick={onClose}>
//             <XMarkIcon className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Recipient */}
//         <div>
//           <label className="text-xs text-gray-500">To</label>
//           <input
//             value={deal.contact?.email || ""}
//             disabled
//             className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50"
//           />
//         </div>

//         {/* Subject */}
//         <div>
//           <label className="text-xs text-gray-500">Subject</label>
//           <input
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2 mt-1"
//           />
//         </div>

//         {/* Body */}
//         <div>
//           <label className="text-xs text-gray-500">Message</label>
//           <textarea
//             rows="8"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2 mt-1"
//           />
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg border text-sm"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSend}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
//           >
//             <PaperAirplaneIcon className="w-4 h-4" />
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendEmailModal;

// CRM-Frontend/src/features/email/components/SendEmailModal.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail, fetchEmailTemplates } from "../emailSlice";

import {
  XMarkIcon,
  PaperAirplaneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const SendEmailModal = ({ deal, onClose }) => {
  const dispatch = useDispatch();
  const { templates } = useSelector((s) => s.email);

  const [selectedTemplate, setSelectedTemplate] = useState("");

  const [subject, setSubject] = useState(`Regarding ${deal?.dealName || ""}`);

  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  /*
  LOAD TEMPLATES
  */
  useEffect(() => {
    dispatch(fetchEmailTemplates());
  }, [dispatch]);

  /*
  APPLY TEMPLATE
  */
  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);

    const template = templates.find((t) => t.id === templateId);

    if (template) {
      setSubject(template.subject || "");
      setBody(template.body || "");
    }
  };

  /*
  SEND EMAIL
  */
  const handleSend = async () => {
    if (!deal?.contact?.email) {
      alert("Contact email not available");
      return;
    }

    setSending(true);

    try {
      await dispatch(
        sendEmail({
          toEmail: deal.contact.email,
          subject,
          body,
          dealId: deal.id,
          templateId: selectedTemplate || null,
        }),
      ).unwrap();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* HEADER */}

        <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100">
              <EnvelopeIcon className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Send Email
              </h2>

              <p className="text-xs text-gray-500">
                Compose message for this deal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/80"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}

        <div className="px-6 py-5 space-y-5">
          {/* CONTACT INFO */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">
                Contact
              </label>

              <input
                value={deal?.contact?.firstName || ""}
                disabled
                className="w-full border rounded-xl px-4 py-2 bg-gray-50 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">
                Email
              </label>

              <input
                value={deal?.contact?.email || ""}
                disabled
                className="w-full border rounded-xl px-4 py-2 bg-gray-50 text-sm"
              />
            </div>
          </div>

          {/* TEMPLATE SELECTOR */}

          <div>
            <label className="text-xs text-gray-500 uppercase font-medium flex items-center gap-1">
              <DocumentTextIcon className="w-4 h-4" />
              Template
            </label>

            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full border rounded-xl px-4 py-2.5 text-sm mt-1"
            >
              <option value="">Select Template</option>

              {templates?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUBJECT */}

          <div>
            <label className="text-xs text-gray-500 uppercase font-medium">
              Subject
            </label>

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded-xl px-4 py-2.5 text-sm mt-1"
            />
          </div>

          {/* MESSAGE */}

          <div>
            <label className="text-xs text-gray-500 uppercase font-medium">
              Message
            </label>

            <textarea
              rows="8"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message..."
              className="w-full border rounded-xl px-4 py-3 text-sm mt-1 resize-none"
            />

            <div className="text-right text-xs text-gray-400 mt-1">
              {body.length} characters
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border rounded-xl text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={sending || !body.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            <PaperAirplaneIcon className="w-4 h-4" />

            {sending ? "Sending..." : "Send Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendEmailModal;
