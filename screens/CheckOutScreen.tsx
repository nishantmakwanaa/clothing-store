import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Linking, Modal } from "react-native";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import QRCode from 'react-native-qrcode-svg';
import Font from "../constants/Font";
import { useNavigation, useRoute } from "@react-navigation/native";

const CheckoutScreen: React.FC = () => {
  const route = useRoute<any>();
  const { cartItems } = route.params;
  const navigation = useNavigation();
  const [shippingAddress, setShippingAddress] = useState<string | null>(null);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);

  const handleProceedToPayment = async () => {
    const upiLink = "upi://pay?pa=nishantmakwanacreations@oksbi&pn=Nishant+Makwana&mc=1234&tid=12345&amt=1.00&cu=INR";
    
    try {
      const canOpen = await Linking.canOpenURL(upiLink);
      if (canOpen) {
        Linking.openURL(upiLink);
      } else {
        setShowQRCodeModal(true);
      }
    } catch (error) {
      console.error("Failed to open UPI link:", error);
      setShowQRCodeModal(true);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <View style={styles.cartDetails}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              {item.product.image && typeof item.product.image === 'string' ? (
                <Image source={{ uri: item.product.image }} style={styles.cartItemImage} />
              ) : (
                <Text>No Image Available</Text>
              )}
              <Text style={styles.cartItemText}>{item.product.name}</Text>
              <Text style={styles.cartItemText}>Color: {item.color}</Text>
              <Text style={styles.cartItemText}>Size: {item.size}</Text>
              <Text style={styles.cartItemText}>Price: ₹ {item.product.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.shippingAddressSection}>
          {shippingAddress ? (
            <Text style={styles.shippingAddressText}>Shipping Address: {shippingAddress}</Text>
          ) : (
            <Text style={styles.shippingAddressText}>No Shipping Address Added</Text>
          )}
        </View>

        <View style={styles.billSection}>
          <Text style={styles.billText}>Total: ₹ {calculateTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleProceedToPayment}>
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={showQRCodeModal} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.qrCodeContainer}>
            <QRCode value="upi://pay?pa=nishantmakwanacreations@oksbi&pn=Nishant+Makwana&mc=1234&tid=12345&amt=1.00&cu=INR" size={200} />
            <TouchableOpacity
              onPress={() => setShowQRCodeModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.qrText}>Scan this QR code with Google Pay or any UPI app</Text>
          </View>
        </View>
      </Modal>
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
  qrText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.8,
    color: Colors.text,
    marginTop: Spacing * 2,
  },
  header: {
    marginVertical: Spacing * 4,
  },
  title: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  form: {
    marginTop: Spacing * 4,
  },
  cartDetails: {
    marginBottom: Spacing * 3,
  },
  cartItem: {
    marginBottom: Spacing * 2,
  },
  cartItemText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.text,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    marginBottom: Spacing * 1,
  },
  shippingAddressSection: {
    marginBottom: Spacing * 3,
  },
  shippingAddressText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.8,
    color: Colors.text,
  },
  addShippingAddressButton: {
    marginTop: Spacing * 2,
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
  },
  addShippingAddressText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.onPrimary,
  },
  billSection: {
    marginBottom: Spacing * 3,
  },
  billText: {
    fontFamily: Font["poppins-bold"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.onPrimary,
  },
  qrCodeContainer: {
    backgroundColor: Colors.background,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
  },
  closeButton: {
    position: 'absolute',
    top: Spacing,
    right: Spacing,
    backgroundColor: Colors.primary,
    padding: Spacing,
    borderRadius: Spacing,
  },
  closeButtonText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    color: Colors.onPrimary,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CheckoutScreen;