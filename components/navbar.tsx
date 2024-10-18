import React from "react";
import Image from "next/image";
import parameters from "@/public/images/parametres.svg";
import notification from "@/public/images/notification.svg";
import anfel from "@/public/images/anfel.svg";
import { useAuth } from "@/app/context/auth";

const Navbar = () => {
  return (
    <nav className=" flex place-content-between pt-5">
      <label htmlFor="" className=" ml-10 font-bold text-3xl">
        <p><span className=" text-purple-500">Auto</span>Track</p>
      </label>
      <div className=" flex">
        <button>
          <Image alt="parametres" src={parameters} />
        </button>
        <input
          type="text"
          placeholder="Search"
          className=" bg-[#F5F6FA] rounded-xl px-2 h-10 mt-2 w-[300px] ml-5"
        />
      </div>
      <div className=" flex w-[300px] place-content-around">
        <div className=" relative">
          <p className=" bg-red-500 rounded-full text-center text-sm text-white absolute right-0 z-10 px-2">
            5
          </p>
          <button>
            <Image alt="notification" src={notification} width={40} />
          </button>
        </div>
        <div className=" flex w-[160px] cursor-pointer">
          <div className=" bg-red-500 rounded-full overflow-hidden h-[50px] mr-3">
            <Image alt="anfel" src={anfel} className=" mt-1" />
          </div>
          <div>
            <p className=" font-semibold">Meftah Anfel</p>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
