import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import NegativeAccs from "./NegativeAccs/NegativeAccs";
import { ClientRequest } from "http";

const options = [
  {
    id: "negative",
    label: "Negative Accounts",
    count: 3,
    color: "border-red-500",
    countColor: "bg-red-500",
  },
  {
    id: "business",
    label: "Business Assistance",
    count: 13,
    color: "border-green-500",
    countColor: "bg-green-500",
  },
  {
    id: "inquiries",
    label: "Inquiries",
    count: 0,
    color: "border-yellow-500",
    countColor: "bg-yellow-500",
  },
];

export default function RightPart() {
  const [selectedOption, setSelectedOption] = useState("negative");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex space-x-4 mb-6">
        {options.map((option) => (
          <button
            key={option.id}
            className={`px-1 py-2 font-semibold text-sm border-b-4 text-black rounded flex flex-row space-x-3 justify-evenly ${
              selectedOption === option.id ? option.color : "border-none"
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <span
              className={` ${option.countColor}  text-white h-6 mr-3 text-xs flex items-center justify-center font-semibold w-6 rounded-full`}
            >
              {option.count}
            </span>
            {option.label}
          </button>
        ))}
      </div>

      {selectedOption === "negative" && <NegativeAccs disputeWorking={false} />}

      {selectedOption === "business" && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold">Business Assistance</h2>
          <p>Content for Business Assistance would go here.</p>
        </div>
      )}

      {selectedOption === "inquiries" && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold">Inquiries</h2>
          <p>Content for Inquiries would go here.</p>
        </div>
      )}
    </div>
  );
}
