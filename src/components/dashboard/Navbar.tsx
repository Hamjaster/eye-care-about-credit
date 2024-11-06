"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "../../assets/logo.png";
import NotificationsBell from "../ui/NotificationBell";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const navItems = [
    "dashboard",
    "clients",
    "dispute-letters",
    "my-company",
    "messages",
    "invoices",
    "creditors",
    "documents",
    "contact",
    "my-account",
  ];

  const formatString = (str: string): string => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    setActiveItem(
      location.pathname.split("/").length === 2 &&
        location.pathname.split("/")[1] === "dashboard"
        ? "dashboard"
        : location.pathname.split("/")[2]
    );
  }, [location]);

  const handleNavigation = (item: string) => {
    setActiveItem(item);
    setIsOpen(false);
    navigate(item === "dashboard" ? "/dashboard" : `/dashboard/${item}`);
  };

  return (
    <header className="flex flex-wrap mx-6 justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <img src={logo} className="w-20" alt="Logo" />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Button
                key={item}
                onClick={() => handleNavigation(item)}
                className={`${
                  item === activeItem
                    ? "bg-websitePrimary text-white hover:bg-websitePrimaryDark"
                    : "hover:bg-websitePrimaryLight bg-white text-black"
                } shadow-none px-4 py-5 rounded-2xl w-full justify-start`}
              >
                {formatString(item)}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <nav className="hidden lg:flex space-x-2 ">
        {navItems.map((item) => (
          <Button
            key={item}
            onClick={() => handleNavigation(item)}
            className={`${
              item === activeItem
                ? "bg-websitePrimary text-white hover:bg-websitePrimaryDark"
                : "hover:bg-websitePrimaryLight bg-white text-black"
            } shadow-none px-3 py-3 text-[13px] rounded-2xl`}
          >
            {formatString(item)}
          </Button>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <NotificationsBell />
        <img
          src="https://i.pravatar.cc/300"
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}
