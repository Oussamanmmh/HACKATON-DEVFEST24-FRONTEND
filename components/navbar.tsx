import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiMenu, FiBell, FiUser } from "react-icons/fi"; // Hamburger menu, bell icon, user icon for default image
import Link from "next/link";
import axios from "axios";

const Navbar = ({ toggleSidebar }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // Fetch token and userId from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setToken(storedUser.token);
      setUserId(storedUser.userId);
    }
  }, []);

  // Fetch notifications count from the server
  useEffect(() => {
    const fetchNotifications = async () => {
      if (userId && token) {
        try {
          const response = await axios.get(
            `http://localhost:4000/notifications/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const count = response.data.length;

          // If notifications are more than 20, set it to "+20"
          setNotificationCount(count > 20 ? 20 : count);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

     fetchNotifications();
  }, [userId, token]);

  return (
    <nav className="flex justify-between pl-20 items-center  p-5 bg-white shadow-md relative z-10">
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

      <div className="flex items-center space-x-5">
        <div className="relative">
          {/* Display notification count, show "+20" if the count is greater than 20 */}
          {notificationCount > 0 && (
            <p className="bg-red-500 rounded-full text-center text-sm text-white absolute -right-2 top-0 z-10 px-2">
              {notificationCount === 20 ? "+20" : notificationCount}
            </p>
          )}
          <Link href={"/notifications"}>
            <FiBell size={30} className="text-gray-700" />
          </Link>
        </div>
        <div className="flex items-center cursor-pointer">
          <div className="bg-gray-300 rounded-full overflow-hidden h-[50px] w-[50px] flex items-center justify-center mr-3">
            {/* Default user icon */}
            <FiUser size={30} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold">User Name</p>{" "}
            {/* Default or dynamic user name */}
            <p>Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
