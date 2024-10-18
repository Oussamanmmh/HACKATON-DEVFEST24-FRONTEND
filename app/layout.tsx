"use client";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "./context/auth";
import LoginPage from "./auth/login/page";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    // This runs only in the browser
    const token = localStorage.getItem('user');
    if (token) {
      setUser(true); // User is logged in
    } else {
      setUser(false); // User is not logged in
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <html lang="en">
      <body className="h-screen flex flex-col overflow-hidden">
        <AuthProvider>
          {/* Navbar at the top */}
          {
            user ? (
              <div>
                <Navbar />

                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar on the left */}
                  <Sidebar />

                  {/* Main Content Area */}
                  <main className="flex-1 p-5 overflow-auto">
                    {children} {/* Page-specific content */}
                  </main>
                </div>
              </div>
            ) : (
              <LoginPage />
            )
          }
        </AuthProvider>
      </body>
    </html>
  );
}
