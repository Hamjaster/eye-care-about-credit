import React from "react";
import CreditScore from "./CreditScore";
import CreditDetails from "./CreditDetails";
import RightPart from "./RightPart";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[40%] flex flex-col left">
        <CreditScore />
        <CreditDetails />
      </div>
      <div className="w-[60%] right">
        <RightPart />
      </div>
    </div>
  );
};

export default Dashboard;
