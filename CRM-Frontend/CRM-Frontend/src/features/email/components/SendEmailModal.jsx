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

//===========================================================================================================
// // CRM-Frontend/src/features/email/components/SendEmailModal.jsx

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendEmail, fetchEmailTemplates } from "../emailSlice";

// import {
//   XMarkIcon,
//   PaperAirplaneIcon,
//   EnvelopeIcon,
//   DocumentTextIcon,
// } from "@heroicons/react/24/outline";

// const SendEmailModal = ({ deal, onClose }) => {
//   const dispatch = useDispatch();
//   const { templates, loadingTemplates } = useSelector((s) => s.email);

//   const [selectedTemplate, setSelectedTemplate] = useState("");

//   const [subject, setSubject] = useState(
//     `Regarding ${deal?.dealName || "our discussion"}`,
//   );

//   const [body, setBody] = useState("");
//   const [sending, setSending] = useState(false);

//   /*
//   LOAD TEMPLATES
//   */
//   useEffect(() => {
//     dispatch(fetchEmailTemplates());
//   }, [dispatch]);

//   /*
//   APPLY TEMPLATE
//   */
//   const handleTemplateChange = (templateId) => {
//     setSelectedTemplate(templateId);

//     const template = templates.find((t) => String(t.id) === String(templateId));

//     if (!template) {
//       setSubject(`Regarding ${deal?.dealName || ""}`);
//       setBody("");
//       return;
//     }

//     setSubject(template.subject || "");
//     setBody(template.body || "");
//   };

//   /*
//   SEND EMAIL
//   */
//   const handleSend = async () => {
//     if (sending) return;

//     if (!deal?.contact?.email) {
//       alert("Contact email not available for this deal");
//       return;
//     }

//     if (!subject.trim() && !selectedTemplate) {
//       alert("Subject is required");
//       return;
//     }

//     setSending(true);

//     try {
//       const result = await dispatch(
//         sendEmail({
//           toEmail: deal.contact.email,
//           subject,
//           body,
//           dealId: deal.id,
//           contactId: deal.contact?.id || null,
//           accountId: deal.account?.id || null,
//           templateId: selectedTemplate || null,
//         }),
//       ).unwrap();

//       console.log("EMAIL SENT SUCCESS:", result);

//       alert("Email sent successfully");

//       onClose();
//     } catch (err) {
//       console.error("EMAIL SEND ERROR:", err);
//       alert(err || "Failed to send email");
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
//         {/* HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//           <div className="flex items-center gap-3">
//             <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100">
//               <EnvelopeIcon className="w-5 h-5 text-blue-600" />
//             </div>

//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Send Email
//               </h2>
//               <p className="text-xs text-gray-500">
//                 Compose message for this deal
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/80"
//           >
//             <XMarkIcon className="w-5 h-5" />
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="px-6 py-5 space-y-5">
//           {/* CONTACT INFO */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs text-gray-500 uppercase font-medium">
//                 Contact
//               </label>

//               <input
//                 value={deal?.contact?.firstName || ""}
//                 disabled
//                 className="w-full border rounded-xl px-4 py-2 bg-gray-50 text-sm"
//               />
//             </div>

//             <div>
//               <label className="text-xs text-gray-500 uppercase font-medium">
//                 Email
//               </label>

//               <input
//                 value={deal?.contact?.email || ""}
//                 disabled
//                 className="w-full border rounded-xl px-4 py-2 bg-gray-50 text-sm"
//               />
//             </div>
//           </div>

//           {/* TEMPLATE */}
//           <div>
//             <label className="text-xs text-gray-500 uppercase font-medium flex items-center gap-1">
//               <DocumentTextIcon className="w-4 h-4" />
//               Template
//             </label>

//             <select
//               value={selectedTemplate}
//               onChange={(e) => handleTemplateChange(e.target.value)}
//               className="w-full border rounded-xl px-4 py-2.5 text-sm mt-1"
//             >
//               <option value="">
//                 {loadingTemplates ? "Loading templates..." : "Select Template"}
//               </option>

//               {templates?.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* SUBJECT */}
//           <div>
//             <label className="text-xs text-gray-500 uppercase font-medium">
//               Subject
//             </label>

//             <input
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               className="w-full border rounded-xl px-4 py-2.5 text-sm mt-1"
//             />
//           </div>

//           {/* MESSAGE */}
//           <div>
//             <label className="text-xs text-gray-500 uppercase font-medium">
//               Message
//             </label>

//             <textarea
//               rows="8"
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               placeholder="Write your message..."
//               className="w-full border rounded-xl px-4 py-3 text-sm mt-1 resize-none"
//             />

//             <div className="text-right text-xs text-gray-400 mt-1">
//               {body.length} characters
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
//           <button
//             onClick={onClose}
//             className="px-5 py-2.5 border rounded-xl text-sm hover:bg-gray-100"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSend}
//             disabled={sending || !body.trim()}
//             className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50"
//           >
//             <PaperAirplaneIcon className="w-4 h-4" />
//             {sending ? "Sending..." : "Send Email"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendEmailModal;

// ======================================================================================================================

// CRM-Frontend/src/features/email/components/SendEmailModal.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail, fetchEmailTemplates } from "../emailSlice";

import {
  XMarkIcon,
  PaperAirplaneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

/* ─────────────────────────────────────────
   SMALL REUSABLE PIECES
───────────────────────────────────────── */

const FieldLabel = ({ icon: Icon, children }) => (
  <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {children}
  </label>
);

const ReadonlyInput = ({ value }) => (
  <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-500 font-medium truncate select-none">
    {value || <span className="text-gray-300 italic">—</span>}
  </div>
);

const StyledInput = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400
      transition-all duration-150 shadow-sm ${className}`}
  />
);

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */

const SendEmailModal = ({ deal, onClose }) => {
  const dispatch = useDispatch();
  const { templates, loadingTemplates } = useSelector((s) => s.email);

  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subject, setSubject] = useState(
    `Regarding ${deal?.dealName || "our discussion"}`,
  );
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  /* LOAD TEMPLATES */
  useEffect(() => {
    dispatch(fetchEmailTemplates());
  }, [dispatch]);

  /* APPLY TEMPLATE */
  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    const template = templates.find((t) => String(t.id) === String(templateId));
    if (!template) {
      setSubject(`Regarding ${deal?.dealName || ""}`);
      setBody("");
      return;
    }
    setSubject(template.subject || "");
    setBody(template.body || "");
  };

  /* SEND EMAIL */
  const handleSend = async () => {
    if (sending) return;
    if (!deal?.contact?.email) {
      alert("Contact email not available for this deal");
      return;
    }
    if (!subject.trim() && !selectedTemplate) {
      alert("Subject is required");
      return;
    }
    setSending(true);
    try {
      const result = await dispatch(
        sendEmail({
          toEmail: deal.contact.email,
          subject,
          body,
          dealId: deal.id,
          contactId: deal.contact?.id || null,
          accountId: deal.account?.id || null,
          templateId: selectedTemplate || null,
        }),
      ).unwrap();
      console.log("EMAIL SENT SUCCESS:", result);
      alert("Email sent successfully");
      onClose();
    } catch (err) {
      console.error("EMAIL SEND ERROR:", err);
      alert(err || "Failed to send email");
    } finally {
      setSending(false);
    }
  };

  const canSend = !sending && body.trim();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      {/* Modal */}
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden max-h-[96vh]">
        {/* ── HEADER ── */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 sm:px-7 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 flex-shrink-0">
              <EnvelopeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Send Email
              </h2>
              <p className="text-xs text-gray-400 leading-tight">
                Compose message for{" "}
                <span className="font-semibold text-blue-500">
                  {deal?.dealName || "this deal"}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 space-y-5">
          {/* TO CARD */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <EnvelopeIcon className="w-3.5 h-3.5" />
              Recipient
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <FieldLabel icon={UserCircleIcon}>Contact</FieldLabel>
                <ReadonlyInput value={deal?.contact?.firstName} />
              </div>
              <div>
                <FieldLabel icon={EnvelopeIcon}>Email</FieldLabel>
                <ReadonlyInput value={deal?.contact?.email} />
              </div>
            </div>
          </div>

          {/* TEMPLATE */}
          <div>
            <FieldLabel icon={DocumentTextIcon}>Template</FieldLabel>
            <div className="relative">
              <select
                value={selectedTemplate}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-9 text-sm text-gray-700
                  focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400
                  transition-all duration-150 shadow-sm cursor-pointer"
              >
                <option value="">
                  {loadingTemplates ? "Loading templates…" : "— No template —"}
                </option>
                {templates?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              {/* custom chevron */}
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.855a.75.75 0 111.08 1.04l-4.25 4.416a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>

            {/* template applied badge */}
            {selectedTemplate && (
              <p className="mt-1.5 text-[11px] text-blue-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                Template applied — you can still edit below
              </p>
            )}
          </div>

          {/* SUBJECT */}
          <div>
            <FieldLabel>Subject</FieldLabel>
            <StyledInput
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject…"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <FieldLabel icon={ChatBubbleBottomCenterTextIcon}>
              Message
            </FieldLabel>
            <textarea
              rows="8"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message here…"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400
                transition-all duration-150 shadow-sm resize-none leading-relaxed"
            />
            {/* char count */}
            <div className="flex items-center justify-end mt-1.5 gap-1.5">
              <span
                className={`text-[11px] font-medium transition-colors ${
                  body.length > 2000 ? "text-rose-400" : "text-gray-400"
                }`}
              >
                {body.length.toLocaleString()} characters
              </span>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="flex-shrink-0 flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-gray-100 bg-gray-50/50">
          {/* left — recipient hint */}
          {deal?.contact?.email && (
            <p className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 truncate min-w-0">
              <EnvelopeIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{deal.contact.email}</span>
            </p>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 sm:px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600
                hover:bg-gray-100 hover:text-gray-800 transition-all duration-150 active:scale-95"
            >
              Cancel
            </button>

            <button
              onClick={handleSend}
              disabled={!canSend}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                ${
                  canSend
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 hover:shadow-md hover:shadow-blue-200 active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              <PaperAirplaneIcon className="w-4 h-4" />
              {sending ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending…
                </span>
              ) : (
                "Send Email"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmailModal;
