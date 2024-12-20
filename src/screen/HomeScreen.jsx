import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { useDarkMode } from "../context/DarkModeContext";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts.products);
      } catch (error) {
        console.error("Error Fetching Products From API.JS : ", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleProductDetails = (item) => {
    navigation.navigate("PRODUCT_DETAILS", { item });
  };

  const toggleFavorite = (item) => {
    setProducts(
      products.map((prod) => {
        if (prod.id === item.id) {
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ["#121212", "#1c1c1c"] : ["#FDF0F3", "#FFFBFC"]}
      style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}
    >
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <View>
              <Text style={[styles.headingText, isDarkMode ? styles.darkText : styles.lightText]}>
                Welcome To Clothify
              </Text>
              <View style={styles.inputContainer}>
                <Image
                  source={require("../assets/search.png")}
                  style={styles.searchIcon}
                />
                <TextInput placeholder="Search" style={[styles.textInput, isDarkMode ? styles.darkInput : styles.lightInput]} />
              </View>
            </View>
            <Tags />
          </>
        }
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={toggleFavorite}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? <Text style={isDarkMode ? styles.darkText : styles.lightText}>Loading...</Text> : <Text style={isDarkMode ? styles.darkText : styles.lightText}>No Products Found</Text>
        }
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  lightContainer: {
    backgroundColor: "#fff",
  },

  darkContainer: {
    backgroundColor: "#121212",
  },

  headingText: {
    fontSize: 28,
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },

  lightText: {
    color: "#000",
  },

  darkText: {
    color: "#fff",
  },

  inputContainer: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },

  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },

  lightInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#000",
    backgroundColor: "#fff",
  },

  darkInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#fff",
    backgroundColor: "#333",
  },

  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
});