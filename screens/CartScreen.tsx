import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Spacing from "../constants/Spacing";
import MapView, { Marker } from "react-native-maps";

const CartScreen: React.FC = () => {
  const navigation = useNavigation();

  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 599,
      brand: "Brand A",
      image: require("../assets/images/products/blue-ish-w.jpg"),
    },
    {
      id: 2,
      name: "Product 2",
      price: 899,
      brand: "Brand B",
      image: require("../assets/images/products/green-j.jpg"),
    },
  ];

  const previousOrders = [
    { id: 1, name: "Order 1", status: "Delivered", date: "2024-12-10" },
    { id: 2, name: "Order 2", status: "In Progress", date: "2024-12-18" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <Ionicons
              name="arrow-back"
              size={Spacing * 3}
              color={Colors.text}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>

        <View style={styles.cartSection}>
          <Text style={styles.sectionTitle}>Cart Items</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={item.image} style={styles.cartImage} />
              <View style={styles.cartInfo}>
                <Text style={styles.cartName}>{item.name}</Text>
                <Text style={styles.cartPrice}>₹ {item.price}</Text>
                <Text style={styles.cartBrand}>{item.brand}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="trash-outline"
                  size={Spacing * 3}
                  color={Colors.error}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.previousOrderSection}>
          <Text style={styles.sectionTitle}>Previous Orders</Text>
          {previousOrders.map((order) => (
            <View key={order.id} style={styles.orderItem}>
              <Text style={styles.orderName}>{order.name}</Text>
              <Text style={styles.orderDetails}>
                {order.status} - {order.date}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.trackOrderSection}>
          <Text style={styles.sectionTitle}>Track Order</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
              title="Order Location"
              description="Your Order Is Here"
            />
          </MapView>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentText}>Credit/Debit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentText}>UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentText}>Cash on Delivery</Text>
            </TouchableOpacity>
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
  scrollViewContent: {
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing * 2,
  },
  iconButton: {
    marginRight: Spacing,
  },
  headerTitle: {
    fontSize: Spacing * 3,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  cartSection: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: Spacing * 2,
    fontFamily: Font["poppins-semiBold"],
    color: Colors.text,
    marginBottom: Spacing,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing * 2,
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: Spacing,
    marginRight: Spacing,
  },
  cartInfo: {
    flex: 1,
  },
  cartName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.8,
    color: Colors.text,
  },
  cartPrice: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.primary,
  },
  cartBrand: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.4,
    color: Colors.gray,
  },
  previousOrderSection: {
    marginBottom: 0,
  },
  orderItem: {
    marginBottom: Spacing * 2,
  },
  orderName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.8,
    color: Colors.text,
  },
  orderDetails: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.4,
    color: Colors.gray,
  },
  trackOrderSection: {
    marginBottom: 0,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: Spacing,
  },
  paymentSection: {
    marginBottom: 0,
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: Spacing,
    borderRadius: Spacing,
    marginHorizontal: Spacing / 2,
    alignItems: "center",
  },
  paymentText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.onPrimary,
    fontSize: Spacing * 1.6,
  },
});

export default CartScreen;
