// AuthContext.tsx
import React, { createContext, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialValue: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};
export const AuthContext = createContext(initialValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token") ? true : false
  );

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
}
