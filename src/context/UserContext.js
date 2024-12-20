import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Create the UserContext
export const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserContextProvider to wrap your app and provide user data
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to fetch user data from API using email and password
  const loadUserData = async () => {
    try {
      // Simulate logging in with test credentials (for testing purposes)
      const testEmail = "x@gmail.com";
      const testPassword = "123456";

      const response = await axios.post("https://https://clothing-store-vbrf.onrender.com/profile", {
        email: testEmail,
        password: testPassword,
      });

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData); // Set the user data after successful login
        await AsyncStorage.setItem("user", JSON.stringify(userData)); // Store user data without the token
      } else {
        console.error("Failed to authenticate user");
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading user data from API", error);
      setUser(null);
    }
  };

  // On initial load, try to retrieve user data from AsyncStorage
  useEffect(() => {
    loadUserData();
  }, []);

  // Sync user data to AsyncStorage whenever it changes (without the token)
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user)); // Store user data without the token in AsyncStorage
    }
  }, [user]);

  const logOut = async () => {
    console.log("User logged out");
    await AsyncStorage.removeItem("user"); // Remove user data from AsyncStorage
    setUser(null); // Clear user data in context
  };

  const setUserData = (newUserData) => {
    setUser(newUserData);
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserData, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
