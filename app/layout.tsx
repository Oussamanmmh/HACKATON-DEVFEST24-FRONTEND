"use client";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "./context/auth";
import LoginPage from "./auth/login/page";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress"; // Import spinner
import ProfilePage from "@/components/profile/profilePage";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State to store the user login status
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for verification
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar open state

  useEffect(() => {
    const token = localStorage.getItem("user");
    setUser(!!token);
    setLoading(false); // Stop loading after verification
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  if (loading) {
    // Display spinner while verifying login
    return <div className="flex justify-center items-center h-screen"></div>;
  }

  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <AuthProvider>
          {user ? (
            <>
              <Navbar toggleSidebar={toggleSidebar} />

              <div className="flex flex-1 overflow-hidden">
                <Sidebar
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                <ProfilePage/>
                

                {/* Main Content Area */}
                <main className="flex-1 p-5 overflow-auto">{children}</main>
              </div>
            </>
          ) : (
            <LoginPage />
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
