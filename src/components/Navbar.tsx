import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="container  mx-auto px-16 py-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {/* <span className="text-xl font-bold">Tosnos</span> */}
        <img src={logo} className="w-24" alt="" srcset="" />
      </div>
      <nav className="hidden text-sm md:flex space-x-8">
        <Link
          className="text-gray-600 hover:text-websitePrimaryDark font-semibold"
          to={"/"}
        >
          Home
        </Link>
        <a
          href="#"
          className="text-gray-600 hover:text-websitePrimaryDark font-semibold"
        >
          Product
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-websitePrimaryDark font-semibold"
        >
          Feature
        </a>
        <Link
          className="text-gray-600 hover:text-websitePrimaryDark font-semibold"
          to={"/pricing"}
        >
          Pricing
        </Link>
      </nav>
      <div className="flex font-bold items-center text-sm space-x-4">
        <a
          onClick={() => navigate("/auth")}
          href="#"
          className="text-gray-600 hover:text-gray-900"
        >
          Sign Up
        </a>
        <a
          onClick={() => navigate("/auth")}
          href="#"
          className="px-8 py-3 bg-gradient-to-b from-gray-600 to-black text-white rounded-full hover:bg-gray-800"
        >
          Log In
        </a>
      </div>
    </header>
  );
}
