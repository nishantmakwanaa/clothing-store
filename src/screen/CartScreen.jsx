import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import { fonts } from "../utils/fonts";
import { CartContext } from "../context/Context";
import { useNavigation } from "@react-navigation/native";
import { Linking, Alert, Platform } from "react-native";
import { useDarkMode } from "../context/DarkModeContext";

const CartScreen = () => {
  const { cartItems, deleteCartItem, totalPrice } = useContext(CartContext);
  const { isDarkMode } = useDarkMode();
  const navigation = useNavigation();

  const handleDeleteItem = async (id) => {
    await deleteCartItem(id);
  };

  const handleReorder = (item) => {
    navigation.navigate("REORDER", {
      productName: item.name,
      productPrice: item.price,
      productImage: item.image,
    });
  };

  const handleCheckout = () => {
    const upiUrl = `upi://pay?pa=nishantmakwanacreations@oksbi&pn="Nishant Makwana"&tn=Order Payment&am=${totalPrice}&cu=INR`;

    Linking.openURL(upiUrl)
      .then(() => {
        Alert.alert("Success", "Redirected To Payment App.");
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "Failed To Open UPI App. Please Check If A UPI App Is Installed."
        );
      });
  };

  const gradientColors = isDarkMode ? ["#2C2C2C", "#1A1A1A"] : ["#FDF0F3", "#FFFBFC"];

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <View style={styles.header}>
        <Header isCart={true} />
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartCard
            item={item}
            handleDelete={handleDeleteItem}
            handleReorder={() => handleReorder(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 40, paddingBottom: 200 }}
        ListFooterComponent={
          <>
            <View style={styles.bottomContentContainer}>
              <View style={styles.flexRowContainer}>
                <Text style={[styles.titleText, isDarkMode && styles.darkText]}>Total :</Text>
                <Text style={[styles.priceText, isDarkMode && styles.darkText]}>₹ {totalPrice}</Text>
              </View>
              <View style={styles.flexRowContainer}>
                <Text style={[styles.titleText, isDarkMode && styles.darkText]}>Shipping :</Text>
                <Text style={[styles.priceText, isDarkMode && styles.darkText]}>₹ 0.0</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.flexRowContainer}>
                <Text style={[styles.titleText, isDarkMode && styles.darkText]}>Grand Total :</Text>
                <Text style={[styles.priceText, styles.grandPriceText, isDarkMode && styles.darkText]}>
                  ₹ {totalPrice}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={handleCheckout}>
              <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>Pay With UPI</Text>
            </TouchableOpacity>
          </>
        }
      />
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {},
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  titleText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "600",
  },
  divider: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: "#3C3C3C",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
  darkText: {
    color: "#E1E1E1",
  },
  darkButton: {
    backgroundColor: "#FF4B4B",
  },
  darkButtonText: {
    color: "#000000",
  },
});
