// // CRM-Frontend\src\features\email\components\EmailLogs.jsx
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEmailLogs } from "../emailSlice";
// import {
//   XMarkIcon,
//   EnvelopeIcon,
// } from "@heroicons/react/24/outline";

// const EmailLogs = ({ dealId, onClose }) => {
//   const dispatch = useDispatch();

//   const { logs } = useSelector((s) => s.email);

//   useEffect(() => {
//     dispatch(fetchEmailLogs(dealId));
//   }, [dispatch, dealId]);

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 space-y-4">

//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">
//             Email History
//           </h2>

//           <button onClick={onClose}>
//             <XMarkIcon className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Logs */}
//         <div className="space-y-3 max-h-96 overflow-y-auto">

//           {logs?.length === 0 && (
//             <p className="text-sm text-gray-400">
//               No emails sent yet.
//             </p>
//           )}

//           {logs?.map((log) => (
//             <div
//               key={log.id}
//               className="border rounded-xl p-4 flex gap-3"
//             >
//               <EnvelopeIcon className="w-5 h-5 text-gray-400 mt-1" />

//               <div>
//                 <p className="font-medium">{log.subject}</p>

//                 <p className="text-xs text-gray-500">
//                   To: {log.to}
//                 </p>

//                 <p className="text-xs text-gray-400">
//                   {new Date(log.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailLogs;

// CRM-Frontend\src\features\email\components\EmailLogs.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailLogs } from "../emailSlice";
import {
  XMarkIcon,
  EnvelopeIcon,
  InboxIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const EmailLogs = ({ dealId, onClose }) => {
  const dispatch = useDispatch();

  const { logs } = useSelector((s) => s.email);

  useEffect(() => {
    if (dealId) {
      dispatch(fetchEmailLogs({ dealId }));
    }
  }, [dispatch, dealId]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100">
              <ClockIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Email History
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                View all sent emails for this deal
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

        {/* Logs */}
        <div className="px-6 py-5">
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {logs?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-4">
                  <InboxIcon className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  No emails sent yet
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Emails you send for this deal will appear here
                </p>
              </div>
            )}

            {logs?.map((log, index) => (
              <div
                key={log.id || index}
                className="border border-gray-200 rounded-xl p-4 flex gap-4 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-150 group"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-500 shrink-0 mt-0.5 group-hover:bg-blue-100 transition-colors duration-150">
                  <EnvelopeIcon className="w-4.5 h-4.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {log.subject}
                    </p>
                    <span className="inline-flex items-center gap-1 shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700 border border-green-100">
                      Sent
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1 truncate">
                    To: {log.toEmail}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2">
                    <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
                    <p className="text-[11px] text-gray-400">
                      {log.createdAt
                        ? new Date(log.createdAt).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-400">
            {logs?.length || 0} {logs?.length === 1 ? "email" : "emails"} total
          </p>
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

export default EmailLogs;
