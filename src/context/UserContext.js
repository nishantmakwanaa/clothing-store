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
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const response = await axios.post("https://your-api-url.com/authenticate", {
          email: parsedUser.email,
          password: parsedUser.password, // Assuming password is stored (or use token-based auth)
        });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Failed to authenticate user");
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Error loading user data from AsyncStorage or API", error);
      setUser(null);
    }
  };

  // On initial load, try to retrieve user data and token from AsyncStorage and fetch from API
  useEffect(() => {
    loadUserData();
  }, []);

  // Sync user data to AsyncStorage whenever it changes
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user)); // Store user data with token in AsyncStorage
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
