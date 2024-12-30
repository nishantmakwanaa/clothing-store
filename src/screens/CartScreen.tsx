import React, { useState } from "react";
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
import Colors from "../assets/constants/Colors";
import Font from "../assets/constants/Font";
import Spacing from "../assets/constants/Spacing";
import { products } from "../data";
import CustomAlert from "../components/AlertBox";
import { useCart } from "../context/Context";

const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const { cartItems, previousOrders, addToCart, removeFromCart, addOrder } = useCart();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price, 0);

  const getRandomProducts = () => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleCompleteOrder = () => {
    if (cartItems.length === 0) {
      setAlertMessage('Your Cart Is Empty, Please Add Items To Complete The Order.');
      setShowAlert(true);
      return;
    }

    const order = {
      id: Math.random(),
      product: cartItems[0].product,
      color: cartItems[0].color,
      size: cartItems[0].size,
      image: cartItems[0].image,
      date: new Date().toISOString(),
      status: 'Completed',
    };

    addOrder(order);
    cartItems.forEach((item) => removeFromCart(item.id));

    navigation.navigate('Checkout', { cartItems });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cart Items</Text>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <View key={item.id} style={{ flexDirection: 'row', marginTop: 10 }}>
                <Image source={item.product.image} style={{ width: 60, height: 60, marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text>{item.product.name}</Text>
                  <Text>₹ {item.product.price}</Text>
                  <Text>{item.product.brand}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash-outline" size={30} color="#F00" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Your Cart Is Empty</Text>
          )}
        </View>

        {cartItems.length > 0 && (
          <View style={{ marginTop: 20, alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price</Text>
            <Text style={{ fontSize: 16, color: '#333' }}>₹ {totalPrice.toFixed(2)}</Text>
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Recommendations</Text>
          {getRandomProducts().map((product) => (
            <View key={product.id} style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image source={product.image} style={styles.productImage} />
              <View style={{ flex: 1 }}>
                <Text>{product.name}</Text>
                <Text>₹ {product.price}</Text>
                <Text>{product.brand}</Text>
              </View>
              <TouchableOpacity
                onPress={() => addToCart(product, 'Red', 'M')}
                style={styles.addToCartButton}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Previous Orders</Text>
          {previousOrders.length > 0 ? (
            previousOrders.map((order) => (
              <View key={order.id} style={{ marginTop: 10 }}>
                <Text>{order.product.name}</Text>
                <Text>{order.status} - {order.date}</Text>
              </View>
            ))
          ) : (
            <Text>No Previous Orders Found.</Text>
          )}
        </View>

        {cartItems.length > 0 && (
          <View style={{ marginTop: 20, alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price</Text>
            <Text style={{ fontSize: 16, color: '#333' }}>₹ {totalPrice.toFixed(2)}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.completeOrderButton} onPress={handleCompleteOrder}>
          <Text style={styles.completeOrderText} numberOfLines={1}>
            Complete Order
          </Text>
        </TouchableOpacity>
        <CustomAlert visible={showAlert} message={alertMessage} onClose={handleCloseAlert} />
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
  parentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing,
  },
  scrollViewContent: {
    paddingBottom: 0,
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
  emptyCart: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.gray,
  },
  productSection: {
    marginBottom: 0,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing * 2,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.8,
    color: Colors.text,
  },
  productPrice: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.primary,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1,
    paddingHorizontal: Spacing * 2,
    borderRadius: Spacing,
    marginTop: Spacing,
  },
  addButtonText: {
    color: Colors.onPrimary,
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.6,
  },
  previousOrderSection: {
    marginBottom: 0,
  },
  orderItem: {
    marginBottom: Spacing * 1.5,
  },
  orderName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.8,
    color: Colors.text,
  },
  orderDetails: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.gray,
  },
  completeOrderButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing * 5,
    paddingVertical: Spacing * 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: Spacing * 5,
    marginTop: Spacing * 2,
  },
  completeOrderText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.6,
    color: Colors.onPrimary,
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing * 2.5,
    paddingVertical: Spacing * 0.5,
    borderRadius: Spacing * 3,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: Colors.onPrimary,
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.4,
    textAlign: "center",
  },
});

export default CartScreen;