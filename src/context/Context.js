import React, { createContext, useState, useContext, useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// AuthContext for handling authentication status
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

  const login = async (email, password) => {
    try {
      const dummyEmail = "x@gmail.com";
      const dummyPassword = "123456";

      if (email === dummyEmail && password === dummyPassword) {
        setIsAuthenticated(true);
        await EncryptedStorage.setItem("isAuthenticated", "true");
        loadUserData(dummyEmail, dummyPassword); // Load dummy user data
      } else {
        const response = await axios.post(
          "https://clothing-store-vbrf.onrender.com/login",
          { email, password }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
          await EncryptedStorage.setItem("isAuthenticated", "true");
          loadUserData(email, password); // Load user data from backend
        } else {
          console.error("Login Failed");
        }
      }
    } catch (error) {
      console.error("Error Logging In", error);
    }
  };

  const logout = async () => {
    try {
      setIsAuthenticated(false);
      await EncryptedStorage.removeItem("isAuthenticated");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("cart");
      console.log("User Logged Out");
    } catch (error) {
      console.error("Error Removing Authentication Credentials", error);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post(
        "https://clothing-store-vbrf.onrender.com/signup",
        { email, password }
      );
      if (response.status === 201) {
        console.log("Sign-Up Successful");
      } else {
        console.error("Failed To Sign-Up");
      }
    } catch (error) {
      console.error("Error Signing Up", error);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        "https://clothing-store-vbrf.onrender.com/forgot-password",
        { email }
      );
      if (response.status === 200) {
        console.log("Password Reset Link Sent");
      } else {
        console.error("Failed To Reset Password");
      }
    } catch (error) {
      console.error("Error Resetting Password", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// UserContext for managing user data (user profile, address, etc.)
export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUserData = async (email, password) => {
    try {
      // Dummy User Data (Replace with real data)
      const dummyUserData = {
        email: "testuser@example.com",
        name: "Test User",
        address: "123 Test St, Test City, TS 12345",
      };

      setUser(dummyUserData);
      await AsyncStorage.setItem("user", JSON.stringify(dummyUserData));
    } catch (error) {
      console.error("Error Loading User Data", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadFromAsyncStorage();
  }, []);

  const logOut = async () => {
    console.log("User Logged Out");
    await AsyncStorage.removeItem("user");
    setUser(null);
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

// CartContext for handling cart data (adding/removing items, calculating price)
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    let cartItems = await AsyncStorage.getItem("cart");
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    setCartItems(cartItems);
    calculateTotalPrice(cartItems);
  };

  const addToCartItem = async (item) => {
    let cartItems = await AsyncStorage.getItem("cart");
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    if (!cartItems.find((cart) => cart.id === item.id)) {
      cartItems.push(item);
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
      setCartItems(cartItems);
      calculateTotalPrice(cartItems);
    }
  };

  const deleteCartItem = async (id) => {
    let cartItems = await AsyncStorage.getItem("cart");
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    cartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(cartItems);
    calculateTotalPrice(cartItems);
    await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const calculateTotalPrice = (cartItems) => {
    let totalSum = cartItems.reduce((total, item) => total + item.price, 0);
    totalSum = totalSum.toFixed(2);
    setTotalPrice(totalSum);
  };

  const value = {
    cartItems,
    addToCartItem,
    deleteCartItem,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};