import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import CreditScore from "./CreditScore";
import CreditDetails from "./CreditDetails";
import RightPart from "./RightPart";

const ClientDashboard: React.FC = () => {
  const { state } = useLocation();
  const { client } = state; // Read values passed on state
  console.log(client, "client");
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-[40%] flex flex-col left">
        <CreditScore client={client} />
        <CreditDetails />
      </div>
      <div className="w-full md:w-[60%] right">
        <RightPart />
      </div>
    </div>
  );
};

export default ClientDashboard;
