import React, { useState } from "react";
import Image from "next/image";
import parameters from "@/public/images/parametres.svg";
import notification from "@/public/images/notification.svg";
import anfel from "@/public/images/anfel.svg";
import { FiMenu } from "react-icons/fi"; // Hamburger menu icon
import Link from "next/link";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="flex justify-between items-center p-5 bg-white shadow-md relative z-10">
      <div className="flex items-center">
        {/* Hamburger Menu for mobile view */}
        <button className="lg:hidden mr-4" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <label htmlFor="" className="text-xl font-bold">
          <p>
            <span className="text-purple-500">Auto</span>Track
          </p>
        </label>
      </div>

      <div className="hidden lg:flex items-center">
        <button>
          <Image alt="parametres" src={parameters} />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="bg-[#F5F6FA] rounded-xl px-3 h-10 w-[300px] ml-5"
        />
      </div>

      <div className="flex items-center space-x-5">
        <div className="relative">
          <p className="bg-red-500 rounded-full text-center text-sm text-white absolute -right-2 top-0 z-10 px-2">
            5
          </p>
          <Link href={"/notifications"}>
            <Image alt="notification" src={notification} width={40} />
          </Link>
        </div>
        <div className="flex items-center cursor-pointer">
          <div className="bg-red-500 rounded-full overflow-hidden h-[50px] mr-3">
            <Image alt="anfel" src={anfel} className="mt-1" />
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold">Meftah Anfel</p>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
