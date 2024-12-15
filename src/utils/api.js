import axios from "axios";

const API_URL = "https://clothing-store-vbrf.onrender.com/api";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const products = response.data;
    const updatedProducts = products.map((product) => ({
      ...product,
      imageUrl: `${API_URL}/images/${product.image}`,
    }));

    return updatedProducts;
  } catch (error) {
    console.error("Error Fetching Products From Server-Side : ", error);
    throw error;
  }
};