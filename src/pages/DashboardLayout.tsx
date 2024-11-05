import CreditDetails from "@/components/dashboard/ClientDashboard/CreditDetails";
import CreditScore from "@/components/dashboard/ClientDashboard/CreditScore";
import Navbar from "@/components/dashboard/Navbar";
import RightPart from "@/components/dashboard/ClientDashboard/RightPart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bell, ChevronDown } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F3F4F4] p-4">
      <div className="w-full mx-auto">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
}
