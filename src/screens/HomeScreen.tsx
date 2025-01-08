import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { categories } from "../constants/Data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Spacing from "../constants/Spacing";
import Font from "../constants/Fonts";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../App";
import { useApi } from "../context/Context";
import { useEffect } from "react";

const IMAGE_WIDTH = 190;
const IMAGE_HEIGHT = 250;

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const { user } = useApi();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [userProducts, setUserProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (user && user.userId) {
        try {
          const productsData = [];
          setUserProducts(productsData);
        } catch (err) {
          console.error("Error Fetching User Products :", err);
        }
      }
    };

    fetchUserProducts();
  }, [user?.userId]);

  const categoriesWithProducts = [
    { id: 0, name: "All" },
    ...categories.filter((category) =>
      userProducts.some((product) => product.category.id === category.id)
    ),
  ];

  const filteredProducts =
    activeCategoryIndex === 0
      ? userProducts
      : userProducts.filter(
          (product) =>
            product.category.id === categoriesWithProducts[activeCategoryIndex].id
        );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.exploreSection}>
          <Text style={styles.exploreTitle}>
            Sell Gently,
            <Text style={styles.exploreHighlighted}> Used Fashion </Text>
            Today.
          </Text>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal contentContainerStyle={styles.categoriesList}>
            {categoriesWithProducts.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setActiveCategoryIndex(index)}
                style={[
                  styles.categoryButton,
                  activeCategoryIndex === index && styles.activeCategoryButton,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategoryIndex === index && styles.activeCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.popularSection}>
          <View style={styles.popularHeader}>
            <Text style={styles.sectionTitle}>Your Clothes</Text>
          </View>
          <View style={styles.productList}>
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() =>
                  navigate("Product Details", { product: product })
                }
                style={styles.productItem}
              >
                <Image style={styles.productImage} source={product.image} />
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productInfo}>
                  <Text style={styles.productPrice}>₹ {product.price}</Text>
                  <View style={styles.separator} />
                  <Text style={styles.productBrand}>{product.brand}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  exploreSection: {
    marginBottom: Spacing * 4,
  },
  exploreTitle: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  exploreHighlighted: {
    fontSize: Spacing * 4,
    color: Colors.primary,
  },
  categoriesSection: {
    marginBottom: Spacing * 4,
  },
  sectionTitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
  },
  categoriesList: {
    paddingVertical: Spacing,
  },
  categoryButton: {
    paddingHorizontal: Spacing * 2,
    paddingVertical: Spacing / 2,
    borderWidth: 1,
    borderRadius: Spacing * 2,
    borderColor: Colors.border,
    marginRight: Spacing,
  },
  activeCategoryButton: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: Colors.text,
    fontSize: Spacing * 1.4,
    fontFamily: Font["poppins-regular"],
  },
  activeCategoryText: {
    color: Colors.onPrimary,
  },
  popularSection: {
    marginBottom: Spacing * 4,
  },
  popularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAllButton: {
    paddingVertical: Spacing,
  },
  viewAllText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productItem: {
    width: "48%",
    marginVertical: Spacing,
  },
  productImage: {
    width: IMAGE_WIDTH / 1.1,
    height: IMAGE_HEIGHT / 1.1,
    borderRadius: Spacing * 2,
  },
  productName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.4,
    width: IMAGE_WIDTH / 1.1,
    color: Colors.text,
    marginVertical: Spacing,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  productPrice: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.4,
    color: Colors.gray,
  },
  separator: {
    width: Spacing / 2,
    height: Spacing / 2,
    backgroundColor: Colors.gray,
    borderRadius: Spacing / 4,
    marginHorizontal: Spacing,
  },
  scrollView: {
    flex: 1,
    paddingRight: 0,
  },
  scrollViewContent: {
    paddingRight: 0,
    marginRight: 0,
  },
  productBrand: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.4,
    color: Colors.gray,
  },
});

export default HomeScreen;