import React, { useState, useCallback } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

const IMAGE_HEIGHT = 440;

const ColorCircle: React.FC<{ color: string; isActive: boolean; onPress: () => void }> = ({
  color,
  isActive,
  onPress,
}) => {
  return (
    <View
      style={[
        styles.colorCircleWrapper,
        isActive && { borderWidth: Spacing / 2, borderColor: Colors.borderWithOpacity },
      ]}
    >
      <TouchableOpacity onPress={onPress} style={[styles.colorCircle, { backgroundColor: color }]} />
    </View>
  );
};

const ProductDetail: React.FC<Props> = ({ route, navigation }) => {
  const product = route.params.product;

  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [activeSizeIndex, setActiveSizeIndex] = useState<number>(0);

  const handleColorSelect = useCallback((index: number) => {
    setActiveColorIndex(index);
  }, []);

  const handleSizeSelect = useCallback((index: number) => {
    setActiveSizeIndex(index);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Image source={product.image} style={styles.productImage} />

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.colorWrapper}>
            {product.colors.map((color, index) => (
              <ColorCircle
                key={color.id}
                color={color.code}
                isActive={activeColorIndex === index}
                onPress={() => handleColorSelect(index)}
              />
            ))}
          </View>
        </View>

        <Text style={styles.productDescription}>{product.description}</Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" color={Colors.secondary} size={Spacing * 2} />
          <Text style={styles.ratingText}>{product.rating}</Text>
          <Text style={styles.reviewsText}>{product.reviews} Reviews</Text>
        </View>

        <View style={styles.sizeWrapper}>
          {product.sizes.map((size, index) => (
            <TouchableOpacity
              key={size.id}
              onPress={() => handleSizeSelect(index)}
              style={[styles.sizeButton, activeSizeIndex === index && styles.activeSizeButton]}
            >
              <Text style={[styles.sizeText, activeSizeIndex === index && styles.activeSizeText]}>
                {size.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹ {product.price}</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <Ionicons name="cart-outline" size={Spacing * 2} color={Colors.onPrimary} />
            <Text style={styles.addToCartText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing * 2,
    marginTop: 0,
    marginBottom: 0,
  },
  scrollContent: {
    paddingHorizontal: Spacing * 2,
  },
  productImage: {
    width: "100%",
    height: IMAGE_HEIGHT,
    borderRadius: Spacing * 6,
    marginVertical: Spacing * 2,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing * 2,
  },
  productName: {
    fontSize: Spacing * 3,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  colorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing,
  },
  colorCircleWrapper: {
    margin: Spacing / 5,
    borderRadius: Spacing * 2,
  },
  colorCircle: {
    height: Spacing * 2,
    width: Spacing * 2,
    borderRadius: Spacing,
  },
  productDescription: {
    color: Colors.text,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.4,
    marginVertical: Spacing,
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: Spacing * 2,
  },
  ratingText: {
    marginLeft: Spacing,
    color: Colors.gray,
    fontFamily: Font["poppins-regular"],
  },
  reviewsText: {
    marginLeft: Spacing,
    color: Colors.gray,
    fontFamily: Font["poppins-regular"],
  },
  sizeWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing * 2,
  },
  sizeButton: {
    paddingHorizontal: Spacing * 2,
    paddingVertical: Spacing,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing * 2,
    marginRight: Spacing,
  },
  activeSizeButton: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  sizeText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.4,
    color: Colors.text,
  },
  activeSizeText: {
    color: Colors.onPrimary,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center", 
    paddingVertical: Spacing * 2,
  },
  price: {
    fontFamily: Font["poppins-bold"],
    fontSize: Spacing * 2.5,
    color: Colors.text,
    flex: 1,
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing * 2.5,
    paddingVertical: Spacing * 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    borderRadius: Spacing * 5,
  },
  addToCartText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.onPrimary,
    fontSize: Spacing * 2,
    marginLeft: Spacing / 2,
  },
});