import axios from "axios";

const API_URL = "http://10.0.2.2:5000/api";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Products From Server-Side : ", error);
    throw error;
  }
};
