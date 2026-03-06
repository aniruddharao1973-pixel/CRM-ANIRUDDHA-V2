// // CRM-Frontend\src\features\email\components\EmailTemplateManager.jsx
// import { useState } from "react";
// import {
//   XMarkIcon,
//   PlusIcon,
// } from "@heroicons/react/24/outline";

// const EmailTemplateManager = ({ onClose }) => {
//   const [templates, setTemplates] = useState([]);
//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [body, setBody] = useState("");

//   const addTemplate = () => {
//     const newTemplate = {
//       id: Date.now(),
//       name,
//       subject,
//       body,
//     };

//     setTemplates([...templates, newTemplate]);

//     setName("");
//     setSubject("");
//     setBody("");
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 space-y-4">

//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">
//             Email Templates
//           </h2>

//           <button onClick={onClose}>
//             <XMarkIcon className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* New Template */}
//         <div className="space-y-2 border rounded-xl p-4">

//           <input
//             placeholder="Template Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2"
//           />

//           <input
//             placeholder="Subject"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2"
//           />

//           <textarea
//             rows="4"
//             placeholder="Email body"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2"
//           />

//           <button
//             onClick={addTemplate}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
//           >
//             <PlusIcon className="w-4 h-4" />
//             Add Template
//           </button>
//         </div>

//         {/* Template List */}
//         <div className="space-y-2 max-h-64 overflow-y-auto">

//           {templates.map((t) => (
//             <div
//               key={t.id}
//               className="border rounded-lg p-3"
//             >
//               <p className="font-semibold">{t.name}</p>
//               <p className="text-sm text-gray-500">{t.subject}</p>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailTemplateManager;

// CRM-Frontend\src\features\email\components\EmailTemplateManager.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmailTemplate, fetchEmailTemplates } from "../emailSlice";
import {
  XMarkIcon,
  PlusIcon,
  DocumentTextIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

const EmailTemplateManager = ({ onClose }) => {
  const dispatch = useDispatch();
  const { templates } = useSelector((s) => s.email);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const addTemplate = async () => {
    if (!name.trim() || !subject.trim() || !body.trim()) return;

    try {
      await dispatch(
        createEmailTemplate({
          name,
          subject,
          body,
        }),
      ).unwrap();

      setName("");
      setSubject("");
      setBody("");
    } catch (err) {
      console.error(err);
      alert("Failed to create template");
    }
  };

  const isFormValid = name.trim() && subject.trim() && body.trim();

  useEffect(() => {
    dispatch(fetchEmailTemplates());
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-purple-100">
              <DocumentTextIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Email Templates
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Create and manage reusable email templates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/80 transition-colors duration-150"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* New Template Form */}
          <div className="space-y-4 border border-gray-200 rounded-xl p-5 bg-gray-50/50">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              New Template
            </h3>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                Template Name
              </label>
              <input
                placeholder="e.g. Welcome Email"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                Subject Line
              </label>
              <input
                placeholder="Enter the email subject…"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                Email Body
              </label>
              <textarea
                rows="4"
                placeholder="Write your template content here…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-150 leading-relaxed"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={addTemplate}
                disabled={!isFormValid}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium shadow-sm shadow-purple-600/20 hover:bg-purple-700 hover:shadow-md hover:shadow-purple-600/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm transition-all duration-150"
              >
                <PlusIcon className="w-4 h-4" />
                Add Template
              </button>
            </div>
          </div>

          {/* Template List */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Saved Templates
              {templates.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                  {templates.length}
                </span>
              )}
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {templates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                    <InboxIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    No templates yet
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Create your first template above to get started
                  </p>
                </div>
              ) : (
                templates.map((t) => (
                  <div
                    key={t.id}
                    className="border border-gray-200 rounded-xl p-4 bg-white hover:border-purple-200 hover:shadow-sm transition-all duration-150 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-500 mt-0.5 shrink-0 group-hover:bg-purple-100 transition-colors duration-150">
                        <DocumentTextIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {t.subject}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateManager;
