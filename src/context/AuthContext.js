import React, { createContext, useState, useContext, useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const status = await EncryptedStorage.getItem("isAuthenticated");
        if (status === "true") {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error Retrieving Authentication Status", error);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    try {
      setIsAuthenticated(true);
      await EncryptedStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Error Saving Authentication Credentials", error);
    }
  };

  const logout = async () => {
    try {
      setIsAuthenticated(false);
      await EncryptedStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.error("Error Removing Authentication Credentials", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);