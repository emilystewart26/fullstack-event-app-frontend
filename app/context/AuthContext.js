"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../../apiClient/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(apiClient.isLoggedIn());
  }, []);

  const login = (token) => {
    apiClient.setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    apiClient.logout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);