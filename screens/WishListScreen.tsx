import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";

const WishlistScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
      </View>

      <View style={styles.productList}>
        <Text style={styles.productName}>Product Name</Text>
        <Text style={styles.productPrice}>$99.99</Text>
        <TouchableOpacity style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove from Wishlist</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing * 2,
    backgroundColor: Colors.background,
  },
  header: {
    marginVertical: Spacing * 4,
  },
  title: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  productList: {
    marginTop: Spacing * 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing * 2,
  },
  productName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  productPrice: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.primary,
  },
  removeButton: {
    backgroundColor: Colors.error,
    padding: Spacing * 1.5,
    borderRadius: Spacing * 2,
    alignItems: "center",
    marginTop: Spacing * 2,
  },
  removeButtonText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.6,
    color: Colors.onError,
  },
});

export default WishlistScreen;