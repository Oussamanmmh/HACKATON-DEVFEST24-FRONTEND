"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

 const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export  const AuthProvider = ({ children }) => {
  const [user , setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUser(user);
      }

     else{

        setUser(null);
     }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


