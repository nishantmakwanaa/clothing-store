import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Alert,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import { fonts } from "../utils/fonts";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const CartScreen = () => {
  const { cartItems, deleteCartItem, totalPrice } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get("https://your-api.com/profile/cart");
        setAccountData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching account data:", error);
        setLoading(false);
      }
    };
    fetchAccountData();
  }, []);

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
    const upiUrl = `upi://pay?pa=your-upi-id@bankname&pn=YourName&tn=Order Payment&am=${totalPrice}&cu=INR`;

    Linking.openURL(upiUrl)
      .then(() => {
        Alert.alert("Success", "Redirected To Payment App.");
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "Failed to open UPI app. Please Check If A UPI App Is Installed."
        );
      });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header isCart={true} />
      </View>

      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: accountData.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{accountData.name}</Text>
        <Text style={styles.userEmail}>{accountData.email}</Text>
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
                <Text style={styles.titleText}>Total :</Text>
                <Text style={styles.priceText}>${totalPrice}</Text>
              </View>
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Shipping :</Text>
                <Text style={styles.priceText}>$0.0</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Grand Total :</Text>
                <Text style={[styles.priceText, styles.grandPriceText]}>
                  ${totalPrice}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCheckout}>
              <Text style={styles.buttonText}>Pay With UPI</Text>
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
  userInfoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "cover",
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444",
  },
  userEmail: {
    fontSize: 14,
    color: "#757575",
  },
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
