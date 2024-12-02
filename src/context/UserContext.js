import React, { createContext, useState, useContext } from "react";

// Create the UserContext
export const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserContextProvider to wrap your app and provide user data
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Anytown, USA",
    joinedDate: "Jan 1, 2022",
    profileImage: "https://via.placeholder.com/100", // Placeholder image
  });

  const logOut = () => {
    console.log("User logged out");
    setUser(null); // Clear user data
  };

  return (
    <UserContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
};