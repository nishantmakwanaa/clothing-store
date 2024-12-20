import React, { createContext, useState, useContext, useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// AuthContext
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

// UserContext
export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUserData = async () => {
    try {
      const testEmail = "x@gmail.com";
      const testPassword = "123456";

      const response = await axios.post(
        "https://clothing-store-vbrf.onrender.com/profile",
        {
          email: testEmail,
          password: testPassword,
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.error("Failed to authenticate user");
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading user data from API", error);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const logOut = async () => {
    console.log("User logged out");
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

// CartContext
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
    let isExist = cartItems.findIndex((cart) => cart.id === item.id);
    if (isExist === -1) {
      cartItems.push(item);
      calculateTotalPrice(cartItems);
      setCartItems(cartItems);
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
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