// src/features/email/components/CampaignInbox.jsx

import { useEffect, useState } from "react";
import API from "../../../api/axios";

import { XMarkIcon, InboxIcon, ClockIcon } from "@heroicons/react/24/outline";

const CampaignInbox = ({ onClose }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);

      const res = await API.get("/email/campaign/list");

      if (res.data?.success) {
        setCampaigns(res.data.data || []);
      } else {
        setCampaigns([]);
      }
    } catch (err) {
      console.error("Failed to load campaigns:", err);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <InboxIcon className="w-6 h-6 text-gray-500" />
            <h2 className="text-lg font-semibold">Campaign Inbox</h2>
          </div>

          <button onClick={onClose}>
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
          {loading && (
            <p className="text-sm text-gray-500">Loading campaigns...</p>
          )}

          {!loading && campaigns.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
              <InboxIcon className="w-10 h-10 mb-3 text-gray-300" />
              <p className="text-sm font-medium">No campaigns sent yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Campaign emails will appear here once sent
              </p>
            </div>
          )}

          {!loading &&
            campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="border rounded-lg p-4 space-y-1 hover:border-blue-200 transition-colors"
              >
                <p className="font-semibold text-sm text-gray-900">
                  {campaign.subject}
                </p>

                <p className="text-xs text-gray-500">
                  Sent to {campaign.recipientCount || 0} contacts
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <ClockIcon className="w-3 h-3" />
                  {campaign.createdAt
                    ? new Date(campaign.createdAt).toLocaleString()
                    : "-"}
                </div>
              </div>
            ))}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignInbox;
