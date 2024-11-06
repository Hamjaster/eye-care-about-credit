import React from "react";
const accountData = {
  dateOpen: "22 Jan, 2010",
  name: "BRINKS HOME",
  accountNumber: "30285260338xxxx",
  balance: "$0",
  creditLimit: "None",
  type: "Open",
  status: "Open",
};
export default function AccTable() {
  return (
    <table className="w-full mb-2 text-[10px] sm:text-sm">
      <thead className="">
        <tr className="text-left text-gray-600">
          <th className="pb-2 pl-2 font-normal">Date Open</th>
          <th className="pb-2 font-normal">Name</th>
          <th className="pb-2 font-normal">Account Number</th>
          <th className="pb-2 font-normal">Balance</th>
          <th className="pb-2 font-normal">Credit Limit</th>
          <th className="pb-2 font-normal">Type</th>
          {/* <th className="pb-2">Status</th> */}
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-50">
          <td className="px-1 font-semibold rounded-bl-2xl rounded-tl-2xl pl-3 py-4">
            {accountData.dateOpen}
          </td>
          <td className="px-1 font-semibold py-3">{accountData.name}</td>
          <td className="px-1 font-semibold py-3">
            {accountData.accountNumber}
          </td>
          <td className="px-1 font-semibold py-3">{accountData.balance}</td>
          <td className="px-1 font-semibold py-3">{accountData.creditLimit}</td>
          <td className="px-1 font-semibold rounded-br-2xl rounded-tr-2xl pr-3 py-3">
            {accountData.type}
          </td>
          {/* <td className="flex items-center">
          {accountData.status}
          <ChevronDownIcon className="ml-1 h-4 w-4" />
        </td> */}
        </tr>
      </tbody>
    </table>
  );
}
