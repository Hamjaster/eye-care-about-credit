import { ChevronDownIcon } from "lucide-react";
import React from "react";
import PaymentHistory from "./PaymentHistory";
import AccTable from "./AccTable";
import Overview from "./Overview";
import AccDetails from "./AccDetails";

export default function NegativeAccs({
  disputeWorking,
}: {
  disputeWorking: boolean;
}) {
  return (
    <div>
      <AccTable />

      <div className="flex flex-col space-y-3 md:flex-row  md:space-x-2">
        <div className="w-full md:w-1/2 space-y-2">
          <Overview percentage={100} />
          <PaymentHistory />
        </div>

        <div className="w-full md:w-1/2 space-y-2">
          <AccDetails disputeWorking={disputeWorking} />
        </div>
      </div>
    </div>
  );
}
