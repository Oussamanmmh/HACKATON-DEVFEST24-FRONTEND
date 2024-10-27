"use client";
import axios from "axios";
import React, { useEffect } from "react";

interface NotifyProps {
  machineId: string;
  message: string;
  title: string;
  updatedAt: string;
  isRead: boolean;
  id: string;
  selectedNotifications: string[];
  setSelectedNotifications: (notifications: string[]) => void;
  markAsRead: (id: string) => void;
}

export default function Notify({
  machineId,
  message,
  title,
  updatedAt,
  isRead,
  id,
  selectedNotifications,
  setSelectedNotifications,
  markAsRead,
}: NotifyProps) {
  const [showText, setShowText] = React.useState(false);

  const handleViewText = async () => {
    setShowText(!showText);
    if (!isRead) {
      markAsRead(id); // Call markAsRead handler to update parent state
    }
  };

  const handleCheckboxChange = () => {
    if (!selectedNotifications.includes(id)) {
      setSelectedNotifications([...selectedNotifications, id]);
    } else {
      setSelectedNotifications(selectedNotifications.filter((notificationId) => notificationId !== id));
    }
  };

  return (
    <div className={`${isRead ? "bg-white" : "bg-[#F3EDED]"} border-0 border-b-[1px] border-black py-5 px-4`}>
      <div className="flex items-center justify-between font-semibold">
        <input
          type="checkbox"
          className="h-5 w-5 accent-[#333333]"
          checked={selectedNotifications.includes(id)}
          onChange={handleCheckboxChange}
        />
        <div className="flex items-center justify-between text-start ">
          {title}
          <button onClick={handleViewText} className="flex items-center justify-center">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.1117 10.1492L1.08829 2.96991C0.383037 1.96458 1.10237 0.583328 2.32979 0.583328H11.6703C12.8977 0.583328 13.617 1.96458 12.9129 2.96991L7.88729 10.1492C7.78738 10.2918 7.65458 10.4082 7.50014 10.4885C7.34569 10.5689 7.17415 10.6109 7.00004 10.6109C6.82593 10.6109 6.65438 10.5689 6.49994 10.4885C6.34549 10.4082 6.21161 10.2918 6.1117 10.1492Z" fill="#333333" />
             </svg>
          </button>
        </div>
        <p>{machineId}</p>
        <p>{updatedAt}</p>
      </div>
      <p className={`${showText ? "block" : "hidden"} px-10 pt-6 pb-4 text-balance text-sm translate-x-10`}>{message}</p>
    </div>
  );
}
