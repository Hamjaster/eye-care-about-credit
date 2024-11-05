import React from "react";
import { useNavigate } from "react-router-dom";
const accountDetails = [
  { label: "Account status", value: "Open" },
  { label: "Type", value: "Open" },
  { label: "Responsibility", value: "Individual" },
  { label: "Remarks", value: "Resolved" },
  { label: "Times 30/60/90 days late", value: "00/00/00" },
];

const paymentDetails = [
  { label: "Last payment", value: "Sep 5, 2023" },
  { label: "Current Payment Status", value: "AsAgreed" },
  { label: "Worst Payment Status", value: "None" },
  { label: "Monthly payment", value: "None" },
  { label: "Opened", value: "Jan 22, 2010" },
  { label: "Term", value: "None" },
];

export default function AccDetails({
  disputeWorking,
}: {
  disputeWorking: boolean;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-50 rounded-2xl  p-6">
        <div className="space-y-3">
          {paymentDetails.map((detail) => (
            <div key={detail.label} className="flex justify-between">
              <span className="text-sm text-gray-600">{detail.label}</span>
              <span className="text-sm font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 rounded-2xl  pt-6 px-6 pb-4">
        <h2 className="text-lg font-semibold mb-4">Account Details</h2>
        <div className="space-y-3.5">
          {accountDetails.map((detail) => (
            <div key={detail.label} className="flex justify-between">
              <span className="text-sm text-gray-600">{detail.label}</span>
              <span className="text-sm font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            if (disputeWorking) {
              navigate("/dashboard/client-credit/dispute");
            }
          }}
          className="w-full bg-black text-white py-3 rounded-2xl font-semibold mt-4"
        >
          Dispute
        </button>
      </div>
    </>
  );
}
