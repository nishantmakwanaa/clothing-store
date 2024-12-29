import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios, { AxiosError } from "axios";

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
  loading: boolean;
  error: string | null;
}

interface UserContextType {
  user: any;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

const BASE_URL = "http://localhost:5000/api";

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken") || null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch {
          localStorage.removeItem("authToken");
          setToken(null);
          setUser(null);
        }
      }
    };

    fetchUser();
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
      setError(axiosError.response ? (axiosError.response.data as string) : "Something Went Wrong!");
      throw err;
    }
  };

  const loginUser = (email: string, password: string) =>
    apiCall("post", "/users/login", { email, password }).then((data) => {
      localStorage.setItem("authToken", data.token);
      setToken(data.token);
      return data;
    });

  const uploadImage = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      const axiosError = err as AxiosError;
      setError(axiosError.response ? (axiosError.response.data as string) : "Something Went Wrong!");
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
      <ApiContext.Provider
        value={{
          getUsers: () => apiCall("get", "/users"),
          getUserById: (id: string) => apiCall("get", `/users/${id}`),
          loginUser,
          registerUser: (userData: object) => apiCall("post", "/users", userData),
          updateUser: (id: string, userData: object) => apiCall("put", `/users/${id}`, userData),
          forgotPassword: (email: string) => apiCall("post", "/users/forgot-password", { email }),
          resetPassword: (token: string, newPassword: string) => apiCall("post", "/users/reset-password", { token, newPassword }),
          uploadImage,
          getCategories: () => apiCall("get", "/categories"),
          getColors: () => apiCall("get", "/colors"),
          getSizes: () => apiCall("get", "/sizes"),
          loading,
          error,
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
    throw new Error("useApi Must Be Used Within An ApiProvider");
  }
  return context;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser Must Be Used Within A UserProvider");
  }
  return context;
};