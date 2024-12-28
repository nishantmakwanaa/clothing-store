import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Linking, Modal } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import { useNavigation, useRoute } from "@react-navigation/native";

const CheckoutScreen: React.FC = () => {
  const route = useRoute<any>();
  const { cartItems, shippingAddress } = route.params;
  const navigation = useNavigation();
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);

  useEffect(() => {
    const preloadQRCode = async () => {
      try {
        const imageUri = 'https://drive.google.com/uc?id=1lEt4wwGhR78WT1_e6f-K_pRdfVp-qHux';
        Image.prefetch(imageUri)
          .then(() => setQrCodeLoaded(true))
          .catch((error) => console.error('Failed To Pre-Load QR Code :', error));
      } catch (error) {
        console.error('Failed to Pre-Load QR Code :', error);
      }
    };

    preloadQRCode();
  }, []);

  const handleGoToPayment = () => {
    const upiLink = "upi://pay?pa=nishantmakwanacreations@oksbi&pn=Nishant+Makwana&mc=1234&tid=12345&amt=1.00&cu=INR";
    Linking.openURL(upiLink);
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

          <TouchableOpacity style={styles.addShippingAddressButton} onPress={() => navigation.navigate("Shipping Adress")}>
            <Text style={styles.addShippingAddressText}>Add/Edit Address</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.billSection}>
          <Text style={styles.billText}>Total: ₹ {calculateTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setShowQRCodeModal(true)}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showQRCodeModal} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.qrCodeContainer}>
            <View style={styles.header}>
              <Ionicons name="close-circle" size={50} color="black" onPress={() => setShowQRCodeModal(false)} />
              <Text style={styles.qrText}>Scan This QR Code With Google Pay Or Any UPI app</Text>
            </View>
            {qrCodeLoaded ? (
              <Image 
                source={{ uri: 'https://drive.google.com/uc?id=1lEt4wwGhR78WT1_e6f-K_pRdfVp-qHux' }}
                style={{ width: 300, height: 300 }} 
              />
            ) : (
              <Text>Loading QR code...</Text>
            )}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={handleGoToPayment}>
                <Text style={styles.buttonText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
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
    marginVertical: Spacing * 2,
    justifyContent: 'center',
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
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 3,
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
  editAddressButton: {
    marginTop: Spacing * 2,
    backgroundColor: Colors.secondary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
  },
  editAddressButtonText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.secondary,
  },
  qrCodeContainer: {
    backgroundColor: Colors.background,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: Spacing * 2,
    alignItems: "center",
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: Spacing,
    padding: Spacing * 1,
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