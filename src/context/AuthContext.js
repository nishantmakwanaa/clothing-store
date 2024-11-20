import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const hardcodedEmail = "xyz@gmail.com";
  const hardcodedPassword = "xyz";

  const login = (email, password) => {
    if (email === hardcodedEmail && password === hardcodedPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const signup = (email, password) => {
    alert("Signup is not available with hardcoded credentials.");
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};