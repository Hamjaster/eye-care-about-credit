import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const creditDetails = [
  {
    title: "Payment History",
    desc: 'Percentage of payments you"ve made on time',
    value: "100%",
    impact: "High Impact",
  },
  {
    title: "Credit Card Use",
    desc: 'How much credit you"ure using compared to total limits',
    value: "2%",
    impact: "High Impact",
  },
  {
    title: "Credit Age",
    desc: "Average age or your open accounts",
    value: "7yrs",
    impact: "Medium Impact",
  },
  {
    title: "Total Accounts",
    desc: "Total open and close accounts",
    value: "28",
    impact: "Low Impact",
  },
];

export default function CreditDetails() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {creditDetails.map((creditDetail) => {
        return (
          <div className="card p-5 rounded-2xl bg-gray-50  flex flex-col">
            <div className="font-semibold text-xl mb-8">
              {creditDetail.title}
            </div>
            <div className="flex flex-row mb-3 justify-between relative">
              <div className="text-3xl font-semibold">{creditDetail.value}</div>
              <div
                className={`text-white absolute  right-0 bottom-1/2 top-1/2 -translate-y-1/2 ${
                  creditDetail.impact === "Low Impact"
                    ? "bg-pink-500"
                    : "bg-green-700"
                }  px-2.5 h-7 flex items-center justify-center font-semibold text-[11px] rounded-2xl`}
              >
                {creditDetail.impact}
              </div>
            </div>
            <div className="w-full text-gray-500 text-sm">
              {creditDetail.desc}
            </div>
          </div>
        );
      })}
    </div>
  );
}
