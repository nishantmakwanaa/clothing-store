import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  userId: string;
  email: string;
  token: string;
}

interface ApiContextType {
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  fetchUserDetails: () => Promise<void>;
  fetchUserProducts: () => Promise<void>;
  fetchUserNotifications: () => Promise<void>;
  user: User | null;
  products: any[];
  notifications: any[];
  loading: boolean;
  error: string | null;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

const BASE_URL = "http://10.0.2.2:5000/api";

const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUser();
  }, []);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, { email, password });
      const { token, userId } = response.data;
      const newUser = { token, userId, email };
      setUser(newUser);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      setError("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const fetchUserDetails = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/users/${user.userId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
    } catch (error) {
      setError("Failed To Fetch User Details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProducts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProducts(response.data);
    } catch (error) {
      setError("Failed To Fetch Products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserNotifications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotifications(response.data);
    } catch (error) {
      setError("Failed To Fetch Notifications.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{
      loginUser,
      logoutUser,
      fetchUserDetails,
      fetchUserProducts,
      fetchUserNotifications,
      user,
      products,
      notifications,
      loading,
      error
    }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export default ApiProvider;