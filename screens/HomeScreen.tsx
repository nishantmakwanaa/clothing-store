import { Image, SafeAreaView, ScrollView, ScrollViewComponent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { categories, products, user } from "../data/index";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const IMAGE_WIDTH = 190;
const IMAGE_HEIGHT = 250;

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={user.image} style={styles.userImage} />
            <Text style={styles.userName}>Hi, {user.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={Spacing * 3} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="cart-outline" size={Spacing * 3} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.exploreSection}>
          <Text style={styles.exploreTitle}>
            Explore The Best
            <Text style={styles.exploreHighlighted}> Collections </Text>
            For You
          </Text>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal contentContainerStyle={styles.categoriesList}>
            {[{ id: 0, name: "All" }, ...categories].map((category, index) => (
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
            <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productList}>
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => navigate("Product-detail", { product: product })}
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
    padding: Spacing * 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: Spacing * 4,
    height: Spacing * 4,
  },
  userName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.text,
    marginLeft: Spacing,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: Spacing / 2,
  },
  exploreSection: {
    paddingVertical: Spacing * 4,
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
    marginVertical: Spacing,
  },
  productImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: Spacing * 2,
  },
  productName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.4,
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