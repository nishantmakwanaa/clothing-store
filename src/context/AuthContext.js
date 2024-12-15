import React, { createContext, useState, useContext, useEffect } from "react";
import * as Keychain from 'react-native-keychain';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error retrieving authentication token", error);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem("authToken", token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error saving authentication credentials", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error removing authentication credentials", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);