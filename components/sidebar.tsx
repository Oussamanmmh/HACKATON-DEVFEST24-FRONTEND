"use client";
import React from "react";
import dashboardicon from "@/public/images/dashboardicon.svg";
import machinesicon from "@/public/images/machinesicon.svg";
import chaticon from "@/public/images/chaticon.svg";
import tasksicon from "@/public/images/tasksicon.svg";
import scheduelicon from "@/public/images/scheduelicon.svg";
import statistiquesicon from "@/public/images/statistiquesicon.svg";
import tablesicon from "@/public/images/tablesicon.svg";
import incomesicon from "@/public/images/incomesicon.svg";
import reportsicon from "@/public/images/reportsicon.svg";
import teamicon from "@/public/images/teamicon.svg";
import logouticon from "@/public/images/logouticon.svg";
import settingsicon from "@/public/images/settingsicon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai"; // Close icon for mobile

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const navlinks = [
    { id: 0, text: "dashboard", path: "/dashboard", icon: dashboardicon },
    { id: 1, text: "assigned Tasks", path: "/assignedtasks", icon: tasksicon },
    { id: 2, text: "machines", path: "/machines", icon: machinesicon },
    { id: 3, text: "chat with bots", path: "/chatwithbots", icon: chaticon },
    { id: 4, text: "schedule", path: "/schedule", icon: scheduelicon },
    {
      id: 5,
      text: "statistiques",
      path: "/statistiques",
      icon: statistiquesicon,
    },
    { id: 6, text: "tables", path: "/tables", icon: tablesicon },
    { id: 7, text: "incomes", path: "/incomes", icon: incomesicon },
    { id: 8, text: "reports", path: "/reports", icon: reportsicon },
    { id: 9, text: "team", path: "/team", icon: teamicon },
    { id: 10, text: "settings", path: "/settings", icon: settingsicon },
    { id: 11, text: "logout", path: "/logout", icon: logouticon },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static z-50 overflow-y-auto`} // Added "overflow-y-auto" for scrolling
    >
      {/* Close button for mobile */}
      <button className="lg:hidden p-4" onClick={toggleSidebar}>
        <AiOutlineClose size={24} />
      </button>
      <ul className="p-5 space-y-4">
        {navlinks.map((item) => (
          <li
            key={item.id}
            className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
              pathname === item.path
                ? "bg-purple-700 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Link href={item.path} className="flex items-center w-full">
              <Image
                alt="icon"
                src={item.icon}
                width={24}
                height={24}
                className="mr-3"
              />
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
