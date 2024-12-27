import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import { products, Product } from "../data";
import { useEffect } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

const SearchScreen: React.FC<Props> = ({ navigation: { navigate, goBack } }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const isSearching = searchQuery.trim() !== "";

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = products.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(lowercasedQuery);
        const categoryMatch = product.category.name.toLowerCase().includes(lowercasedQuery);
        const priceMatch = product.price.toString().includes(lowercasedQuery);
        return nameMatch || categoryMatch || priceMatch;
      });
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleProductPress = (product: Product) => {
    navigate("ProductDetails", { product });
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "" && !recentSearches.includes(searchQuery)) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
    }
  };

  const imageMapping: Record<number, any> = {
    23: require("../assets/images/products/yellow-ss.jpg"),
    24: require("../assets/images/products/green-j.jpg"),
    25: require("../assets/images/products/hdd.jpg"),
    26: require("../assets/images/products/blue-ish-w.jpg"),
  };
  
  const getProductImage = (image: number) => {
    return imageMapping[image] || require("../assets/images/products/yellow-ss.jpg");
  };
    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={Spacing * 2} color={Colors.text} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search For Clothes..."
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {!isSearching && (
          <View style={styles.recentSearchesSection}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {recentSearches.length > 0 ? (
              recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentSearchItem}
                  onPress={() => handleSearch(search)}
                >
                  <Ionicons name="time-outline" size={Spacing * 2} color={Colors.text} />
                  <Text style={styles.recentSearchText}>{search}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noResults}>No Recent Searches</Text>
            )}
          </View>
        )}
        {isSearching && (
          <View style={styles.productsSection}>
            <Text style={styles.sectionTitle}>Products</Text>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productItem}
                  onPress={() => handleProductPress(product)}
                >
                  <View style={styles.productInfo}>
                  <Image source={getProductImage(product.image)} style={styles.productImage} />
                    <Text style={styles.productName}>{product.name || "No Name Available"}</Text>
                    <Text style={styles.productPrice}>{`₹ ${product.price}` || "No Price Available"}</Text>
                    <Text style={styles.productBrand}>{product.brand || "No Brand Available"}</Text>
                    <Text style={styles.productRating}>
                      {product.rating
                        ? `Rating: ${product.rating} | Reviews: ${product.reviews}`
                        : "No Ratings Available"}
                    </Text>
                    <Text style={styles.productDescription}>
                      {product.description || "No Description Available"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noResults}>No Products Found</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing * 2,
    marginTop: 0,
    marginBottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing * 2,
  },
  backButton: {
    marginRight: Spacing,
  },
  headerTitle: {
    fontFamily: Font["poppins-bold"],
    fontSize: Spacing * 3.5,
    color: Colors.text,
  },
  searchSection: {
    marginBottom: Spacing * 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing * 2,
    paddingHorizontal: Spacing * 2,
    height: Spacing * 5,
  },
  searchInput: {
    flex: 1,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.4,
    color: Colors.text,
    marginLeft: Spacing,
    height: "100%",
    textAlignVertical: "center",
    lineHeight: Spacing * 2.2,
  },
    scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: Spacing * 2,
  },
  recentSearchesSection: {
    marginTop: Spacing * 2,
  },
  sectionTitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    marginBottom: Spacing,
    color: Colors.text,
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  recentSearchText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.text,
    marginLeft: Spacing,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing * 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: Spacing * 2,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: Spacing * 2,
    marginBottom: Spacing * 1.5,
    resizeMode: "cover",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: Font["poppins-semibold"],
    fontSize: Spacing * 1.8,
    color: Colors.text,
    marginBottom: Spacing / 2,
    flexWrap: 'wrap',
  },
  productPrice: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.primary,
  },
  productDescription: {
    fontSize: 12,
    color: Colors.text,
    marginTop: 5,
    numberOfLines: 2,
    ellipsizeMode: 'tail',
  },
  
  productsSection: {
    marginTop: Spacing * 2,
  },
  noResults: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.text,
    textAlign: "center",
    marginTop: Spacing * 4,
  },
  productBrand: {
    fontSize: 12,
    color: Colors.text,
    marginTop: 5,
  },
  productRating: {
    fontSize: 12,
    color: Colors.text,
    marginTop: 5,
  },
});

export default SearchScreen;