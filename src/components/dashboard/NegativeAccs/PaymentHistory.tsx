import React from "react";
const paymentHistory = [
  { year: 2023, months: [1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 0, 0] },
  { year: 2022, months: Array(12).fill(1) },
  { year: 2021, months: [1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { year: 2020, months: Array(12).fill(1) },
  { year: 2019, months: [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1] },
];
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
export default function PaymentHistory() {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 pb-8">
      <h2 className="text-lg font-semibold mb-2">Payment History</h2>
      <p className="text-sm text-gray-600 mb-8">
        You have made 95% of payments for this account on time.
      </p>
      <div className="w-full grid grid-cols-14 gap-x-1 gap-y-2">
        {/* <div className="">g</div> */}
        {[
          " ",
          " ",
          "J",
          "F",
          "M",
          "A",
          "M",
          "J",
          "J",
          "A",
          "S",
          "O",
          "N",
          "D",
        ].map((month) => (
          <div key={month} className="text-center text-xs text-gray-600">
            {month}
          </div>
        ))}
        {paymentHistory.map((year) => (
          <React.Fragment key={year.year}>
            <div className="text-right text-xs w-[200%] text-gray-600">
              {year.year}
            </div>
            <div> </div>
            {year.months.map((status, index) => (
              <div
                key={index}
                className={`w-5 h-5 text-xs flex items-center justify-center text-white  rounded-full ${
                  status === 1
                    ? "bg-green-600"
                    : status === -1
                    ? "bg-red-600"
                    : ""
                }`}
              >
                {status === 1 ? (
                  <MdOutlineDone />
                ) : status === -1 ? (
                  <IoClose />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
