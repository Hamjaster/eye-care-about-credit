import { Outlet } from "react-router-dom";
import DisputeNavbar from "./DisputeNavbar";

export default function DisputeWorkflowLayout() {
  return (
    <div className="w-full mx-auto">
      <DisputeNavbar />

      <Outlet />
    </div>
  );
}
