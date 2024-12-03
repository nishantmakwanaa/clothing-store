import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { fonts } from "../utils/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productName, productPrice, productImage } = route.params || {};

  const handlePaymentSuccess = () => {
    navigation.navigate("OrderConfirmationScreen");
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <Header isHome={false} />
      <View style={styles.productInfoContainer}>
        <Text style={styles.productNameText}>{productName}</Text>
        <Text style={styles.productPriceText}>${productPrice}</Text>
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>Select Payment Method :</Text>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Credit/Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Cash On Delivery</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handlePaymentSuccess}
      >
        <Text style={styles.buttonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  productInfoContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  productNameText: {
    fontSize: 24,
    fontFamily: fonts.regular,
    color: "#444444",
    fontWeight: "700",
  },
  productPriceText: {
    fontSize: 20,
    fontFamily: fonts.regular,
    color: "#757575",
    fontWeight: "500",
  },
  paymentContainer: {
    marginVertical: 20,
  },
  paymentText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: "#757575",
    fontWeight: "500",
    marginBottom: 10,
  },
  paymentButton: {
    backgroundColor: "#E96E6E",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  paymentButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
  confirmButton: {
    backgroundColor: "#E96E6E",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
});