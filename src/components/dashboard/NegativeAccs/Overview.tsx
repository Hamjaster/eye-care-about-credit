import React from "react";
import internal from "stream";

export default function Overview({ percentage }: { percentage: number }) {
  return (
    <div className="bg-gray-50 rounded-2xl  p-6">
      <h2 className="text-lg font-semibold mb-4">Overview</h2>
      <p className="text-sm text-gray-600 mb-2">
        You've paid off 100% of the original amount.
      </p>
      <div className="h-6 mb-4 w-full bg-gray-200 rounded-sm overflow-hidden">
        <div className="h-full flex">
          {[...Array(100)].map((_, index) => (
            <div
              key={index}
              className={`w-[1%] ${
                index < Math.round(percentage) ? "bg-green-500" : "bg-gray-200"
              } ${index > 0 ? "ml-px" : ""}`}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-600">Balance</p>
          <p className="text-2xl font-bold">$0</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Highest Balance</p>
          <p className="text-2xl font-bold">$49</p>
        </div>
      </div>
    </div>
  );
}
