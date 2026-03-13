// // src/features/email/components/SendCampaignModal.jsx

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendEmailCampaign, fetchEmailTemplates } from "../emailSlice";

// import {
//   XMarkIcon,
//   PaperAirplaneIcon,
//   DocumentTextIcon,
//   ChatBubbleBottomCenterTextIcon,
// } from "@heroicons/react/24/outline";

// /* ───────────────────────────────────────── */

// const SendCampaignModal = ({ contacts = [], onClose }) => {
//   const dispatch = useDispatch();

//   const { templates, loadingTemplates, sendingCampaign } = useSelector(
//     (s) => s.email,
//   );

//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [subject, setSubject] = useState("");
//   const [body, setBody] = useState("");

//   useEffect(() => {
//     dispatch(fetchEmailTemplates());
//   }, [dispatch]);

//   /* APPLY TEMPLATE */

//   const handleTemplateChange = (templateId) => {
//     setSelectedTemplate(templateId);

//     const template = templates.find((t) => String(t.id) === String(templateId));

//     if (!template) {
//       setSubject("");
//       setBody("");
//       return;
//     }

//     setSubject(template.subject || "");
//     setBody(template.body || "");
//   };

//   /* SEND CAMPAIGN */

//   const handleSend = async () => {
//     if (!body.trim()) {
//       alert("Email body cannot be empty");
//       return;
//     }

//     if (!contacts.length) {
//       alert("No contacts selected");
//       return;
//     }

//     try {
//       await dispatch(
//         sendEmailCampaign({
//           contactIds: contacts.map((c) => c.id),
//           subject,
//           body,
//           templateId: selectedTemplate || null,
//         }),
//       ).unwrap();

//       alert("Campaign sent successfully");
//       onClose();
//     } catch (err) {
//       alert(err || "Campaign failed");
//     }
//   };

//   const canSend = body.trim() && contacts.length;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//         {/* HEADER */}

//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <div>
//             <h2 className="text-lg font-bold">Send Campaign</h2>
//             <p className="text-xs text-gray-400">
//               Sending to {contacts.length} contacts
//             </p>
//           </div>

//           <button onClick={onClose}>
//             <XMarkIcon className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* BODY */}

//         <div className="p-6 space-y-5">
//           {/* TEMPLATE */}

//           <div>
//             <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
//               <DocumentTextIcon className="w-4 h-4" />
//               Template
//             </label>

//             <select
//               value={selectedTemplate}
//               onChange={(e) => handleTemplateChange(e.target.value)}
//               className="w-full mt-2 border rounded-lg px-3 py-2"
//             >
//               <option value="">
//                 {loadingTemplates ? "Loading templates..." : "No template"}
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
//             <label className="text-xs font-semibold text-gray-500 uppercase">
//               Subject
//             </label>

//             <input
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               placeholder="Email subject..."
//               className="w-full mt-2 border rounded-lg px-3 py-2"
//             />
//           </div>

//           {/* BODY */}

//           <div>
//             <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
//               <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
//               Message
//             </label>

//             <textarea
//               rows="8"
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               placeholder="Write your message..."
//               className="w-full mt-2 border rounded-lg px-3 py-3"
//             />

//             <p className="text-xs text-gray-400 mt-1 text-right">
//               {body.length} characters
//             </p>
//           </div>
//         </div>

//         {/* FOOTER */}

//         <div className="flex justify-end gap-2 px-6 py-4 border-t">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded-lg text-sm"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSend}
//             disabled={!canSend || sendingCampaign}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
//               canSend ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"
//             }`}
//           >
//             <PaperAirplaneIcon className="w-4 h-4" />
//             {sendingCampaign ? "Sending..." : "Send Campaign"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendCampaignModal;

// src/features/email/components/SendCampaignModal.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailCampaign, fetchEmailTemplates } from "../emailSlice";

import {
  XMarkIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

/* ───────────────────────────────────────── */

const SendCampaignModal = ({ contacts = [], onClose }) => {
  const dispatch = useDispatch();

  const { templates, loadingTemplates, sendingCampaign } = useSelector(
    (s) => s.email,
  );

  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  /* LOAD TEMPLATES */

  useEffect(() => {
    dispatch(fetchEmailTemplates());
  }, [dispatch]);

  /* APPLY TEMPLATE */

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);

    const template = templates.find((t) => String(t.id) === String(templateId));

    if (!template) {
      setSubject("");
      setBody("");
      return;
    }

    setSubject(template.subject || "");
    setBody(template.body || "");
  };

  /* SEND CAMPAIGN */

  //   const startCampaignPolling = (campaignId) => {
  //     const interval = setInterval(async () => {
  //       try {
  //         const result = await dispatch(fetchCampaignStatus(campaignId)).unwrap();

  //         if (result.progress >= 100) {
  //           clearInterval(interval);

  //           setTimeout(() => {
  //             alert("Campaign sent successfully!");
  //             onClose();
  //           }, 500);
  //         }
  //       } catch (err) {
  //         clearInterval(interval);
  //         console.error("Polling error:", err);
  //       }
  //     }, 1000);
  //   };

  const handleSend = async () => {
    if (!body.trim()) {
      alert("Email body cannot be empty");
      return;
    }

    if (!contacts.length) {
      alert("No contacts selected");
      return;
    }

    try {
      await dispatch(
        sendEmailCampaign({
          contactIds: contacts.map((c) => c.id),
          subject,
          body,
          templateId: selectedTemplate || null,
        }),
      ).unwrap();

      alert("Emails sent successfully!");
      onClose();
    } catch (err) {
      alert(err || "Campaign failed");
    }
  };

  const canSend = body.trim() && contacts.length;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* HEADER */}

        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Send Email Campaign
            </h2>
            <p className="text-xs text-gray-500">
              Sending to {contacts.length} contacts
            </p>
          </div>

          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* BODY */}

        <div className="p-6 space-y-5">
          {/* TEMPLATE */}

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
              <DocumentTextIcon className="w-4 h-4" />
              Template
            </label>

            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full mt-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                {loadingTemplates ? "Loading templates..." : "No template"}
              </option>

              {templates?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUBJECT */}

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Subject
            </label>

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject..."
              className="w-full mt-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BODY */}

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
              <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
              Message
            </label>

            <textarea
              rows="8"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message..."
              className="w-full mt-2 border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-gray-400 mt-1 text-right">
              {body.length} characters
            </p>
          </div>

          {/* PROGRESS BAR */}
          {/* 
          {sendingCampaign && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Sending Emails...</span>
                <span>{campaignProgress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-3 transition-all duration-300"
                  style={{ width: `${campaignProgress}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-500 pt-1">
                <span>Sent: {campaignSent}</span>
                <span>Failed: {campaignFailed}</span>
                <span>Total: {campaignTotal}</span>
              </div>
            </div>
          )} */}
        </div>

        {/* FOOTER */}

        <div className="flex flex-col sm:flex-row justify-end gap-2 px-6 py-4 border-t">
          <button
            onClick={onClose}
            disabled={sendingCampaign}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={!canSend || sendingCampaign}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              canSend
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <PaperAirplaneIcon className="w-4 h-4" />

            {sendingCampaign ? "Sending Campaign..." : "Send Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendCampaignModal;
