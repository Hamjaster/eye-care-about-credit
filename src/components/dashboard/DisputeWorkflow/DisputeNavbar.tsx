import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "../../assets/logo.png";
export default function DisputeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("dispute-items");

  const navItems = ["dispute-items", "letter", "send-letters"];

  const formatString = (str: string): string => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    setActiveItem(
      location.pathname.split("/")[-1] === "dispute-items"
        ? "dispute-items"
        : location.pathname.split("/")[-1]
    );
  }, [location]);

  useEffect(() => {
    console.log(activeItem, "ac");
  }, [activeItem]);

  const handleNavigation = (item: string) => {
    setActiveItem(item);
    navigate(
      item === "dispute-items"
        ? "/dashboard/client-credit/dispute-items"
        : `/dashboard/client-credit/dispute-items/${item}`
    );
  };

  return (
    <header className="flex flex-wrap mx-6 justify-center space-x-4 items-center mb-6">
      {navItems.map((item) => (
        <Button
          key={item}
          onClick={() => handleNavigation(item)}
          className={`${
            item === activeItem
              ? "bg-websitePrimary text-white hover:bg-websitePrimaryDark"
              : "hover:bg-websitePrimaryLight bg-white text-black"
          } shadow-none px-4 py-5 rounded-2xl`}
        >
          {formatString(item)}
        </Button>
      ))}
    </header>
  );
}
