import React, { useState, useCallback } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Spacing from "../assets/constants/Spacing";
import Colors from "../assets/constants/Colors";
import Font from "../assets/constants/Font";

type Props = NativeStackScreenProps<RootStackParamList, "Product Details">;

const IMAGE_HEIGHT = 440;

const ColorCircle: React.FC<{ color: string; isActive: boolean; onPress: () => void }> = ({
  color,
  isActive,
  onPress,
}) => {
  return (
    <View
      style={[styles.colorCircleWrapper, isActive && { borderWidth: Spacing / 2, borderColor: Colors.borderWithOpacity }]}
    >
      <TouchableOpacity onPress={onPress} style={[styles.colorCircle, { backgroundColor: color }]} />
    </View>
  );
};

const ProductDetail: React.FC<Props> = ({ route }) => {
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
        </View>

        <Text style={styles.productDescription}>{product.description}</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Color :</Text>
          <View style={styles.colorWrapper}>
            {product.colors.map((color, index) => (
              <ColorCircle
                key={index}
                color={color.code}
                isActive={activeColorIndex === index}
                onPress={() => handleColorSelect(index)}
              />
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Size:</Text>
          <TouchableOpacity
            style={[styles.sizeButton, activeSizeIndex === 0 && styles.activeSizeButton]}
            onPress={() => handleSizeSelect(0)}
          >
            <Text style={[styles.sizeText, activeSizeIndex === 0 && styles.activeSizeText]}>
              {product.sizes[0].name}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Price :</Text>
          <Text style={styles.price}>₹ {product.price}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Status :</Text>
          {product.isSoldOut ? (
            <Text style={styles.soldOutText}>Sold Out</Text>
          ) : (
            <Text style={styles.availableText}>Available</Text>
          )}
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
  productDescription: {
    color: Colors.text,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.4,
    marginVertical: Spacing,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Spacing * 1.5,
  },
  rowLabel: {
    fontSize: Spacing * 1.6,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
    flex: 1,
  },
  colorWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
  sizeButton: {
    paddingHorizontal: Spacing * 2,
    paddingVertical: Spacing,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing * 2,
    marginRight: Spacing,
    justifyContent: "center",
    alignItems: "center",
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
  price: {
    fontFamily: Font["poppins-bold"],
    fontSize: Spacing * 1.6,
    color: Colors.text,
    flex: 1,
    textAlign: "right",
  },
  soldOutText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.danger,
    fontSize: Spacing * 1.6,
    textAlign: "right",
  },
  availableText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.success,
    fontSize: Spacing * 1.6,
    textAlign: "right",
  },
});