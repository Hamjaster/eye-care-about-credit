import { useState } from "react";
import CompanyProfile from "./CompanyProfile";
import TeamManagement from "./TeamMembers";
import RolesAndPermission from "./Roles";

export default function MyCompany() {
  const sidebarItems: any = {
    "My Company Profile": <CompanyProfile />,
    "My Team Members": <TeamManagement />,
    "Roles & Permissions": <RolesAndPermission />,
  };
  const [selectedItem, setselectedItem] =
    useState<string>("My Company Profile");

  return (
    <div className="flex flex-col md:flex-row h-[85vh] bg-gray-100">
      {/* Sidebar */}
      <div className="w-full flex  flex-row md:flex-col md:w-52 bg-white border-b-2 md:border-none">
        {Object.keys(sidebarItems).map((item, index) => (
          <a
            key={index}
            onClick={() => setselectedItem(item)}
            href="#"
            className={`block w-full p-2 md:p-4 text-xs md:text-sm hover:bg-red-200 ${
              item === selectedItem
                ? "  bg-red-100 hover:bg-red-200  text-websitePrimary hover:text-websitePrimaryDark"
                : ""
            }`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 border-l-2 overflow-auto">
        <div className="w-full mx-auto min-h-[85vh] bg-white p-6">
          {sidebarItems[selectedItem]}
        </div>
      </div>
    </div>
  );
}
