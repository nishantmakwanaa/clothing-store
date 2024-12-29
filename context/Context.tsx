import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios, { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApiContextType {
  getUsers: () => Promise<any>;
  getUserById: (id: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  registerUser: (userData: object) => Promise<any>;
  updateUser: (id: string, userData: object) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (token: string, newPassword: string) => Promise<any>;
  uploadImage: (formData: FormData) => Promise<any>;
  getCategories: () => Promise<any>;
  getColors: () => Promise<any>;
  getSizes: () => Promise<any>;
  logoutUser: () => void;
  categories: any;
  colors: any;
  sizes: any;
  loading: boolean;
  error: string | null;
  addProduct: (productData: object) => Promise<any>;
  updateProductStatus: (id: string, status: object) => Promise<any>;
  checkProductExistence: (id: string) => Promise<any>;
  checkImageExistence: (id: string) => Promise<any>;
  addProductColors: (productId: string, colorIds: string[]) => Promise<any>;
  addProductSizes: (productId: string, sizeIds: string[]) => Promise<any>;
}

interface UserContextType {
  token: string | null;
  user: { userId: string | null; token: string | null; name?: string };
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<{ userId: string | null; token: string | null; name?: string }>>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

const BASE_URL = "http://10.0.2.2:5000/api";

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any>([]);
  const [colors, setColors] = useState<any>([]);
  const [sizes, setSizes] = useState<any>([]);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ userId: string | null; token: string | null; name?: string }>({
    userId: null,
    token: null,
  });

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesData, colorsData, sizesData] = await Promise.all([
          axios.get(`${BASE_URL}/categories`),
          axios.get(`${BASE_URL}/colors`),
          axios.get(`${BASE_URL}/sizes`),
        ]);
        setCategories(categoriesData.data);
        setColors(colorsData.data);
        setSizes(sizesData.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError((axiosError.response?.data as string) || "Something Went Wrong !");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [token]);

  const apiCall = async (method: string, url: string, data: object | null = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      const axiosError = err as AxiosError;
      setError((axiosError.response?.data as string) || "Something Went Wrong !");
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
      <ApiContext.Provider
        value={{
          getUsers: () => apiCall("get", "/users"),
          getUserById: (id: string) => apiCall("get", `/users/${id}`),
          loginUser: (email: string, password: string) => apiCall("post", "/users/login", { email, password }),
          registerUser: (userData: object) => apiCall("post", "/users", userData),
          updateUser: (id: string, userData: object) => apiCall("put", `/users/${id}`, userData),
          forgotPassword: (email: string) => apiCall("post", "/users/forgot-password", { email }),
          resetPassword: (token: string, newPassword: string) => apiCall("post", "/users/reset-password", { token, newPassword }),
          uploadImage: (formData: FormData) => apiCall("post", "/upload", formData),
          getCategories: () => categories,
          getColors: () => colors,
          getSizes: () => sizes,
          logoutUser: () => {
            AsyncStorage.removeItem("authToken");
            setToken(null);
            setUser({ userId: null, token: null });
          },
          categories,
          colors,
          sizes,
          loading,
          error,
          addProduct: (productData: object) => apiCall("post", "/products", productData),
          updateProductStatus: (id: string, status: object) => apiCall("put", `/products/${id}/status`, status),
          checkProductExistence: (id: string) => apiCall("get", `/products/${id}`),
          checkImageExistence: (id: string) => apiCall("get", `/check-image`, { productId: id }),
          addProductColors: (productId: string, colorIds: string[]) => apiCall("post", "/product-colors", { productId, colorIds }),
          addProductSizes: (productId: string, sizeIds: string[]) => apiCall("post", "/product-sizes", { productId, sizeIds })
        }}
      >
        {children}
      </ApiContext.Provider>
    </UserContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi Must Be Used Within An ApiProvider.");
  }
  return context;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser Must Be Used Within A UserProvider.");
  }
  return context;
};

function logoutUser() {
  throw new Error("Function Not Implemented.");
}