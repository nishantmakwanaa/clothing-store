import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";

interface Order {
  id: string;
  status: string;
  estimatedDelivery: string;
  trackingNumber: string;
}

const OrderTrackingScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      status: "Shipped",
      estimatedDelivery: "Dec 25, 2024",
      trackingNumber: "ABC123456789",
    },
    {
      id: "2",
      status: "Out for Delivery",
      estimatedDelivery: "Dec 23, 2024",
      trackingNumber: "XYZ987654321",
    },
  ]);

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>Order ID: {item.id}</Text>
      <Text style={styles.orderStatus}>Status: {item.status}</Text>
      <Text style={styles.estimatedDelivery}>Estimated Delivery: {item.estimatedDelivery}</Text>
      <Text style={styles.trackingNumber}>Tracking Number: {item.trackingNumber}</Text>
      <TouchableOpacity
        style={styles.trackButton}
        onPress={() => alert(`Tracking for Order ID: ${item.id}`)}
      >
        <Text style={styles.trackButtonText}>Track Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Tracking</Text>
        <Text style={styles.subtitle}>Track your orders in real time</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        style={styles.ordersList}
      />
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
  header: {
    marginBottom: Spacing * 3,
  },
  title: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  subtitle: {
    fontSize: Spacing * 1.8,
    fontFamily: Font["poppins-regular"],
    color: Colors.gray,
  },
  ordersList: {
    marginTop: Spacing * 2,
  },
  orderCard: {
    backgroundColor: Colors.white,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    marginBottom: Spacing * 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  orderId: {
    fontSize: Spacing * 1.8,
    fontFamily: Font["poppins-semiBold"],
    color: Colors.text,
  },
  orderStatus: {
    fontSize: Spacing * 1.6,
    fontFamily: Font["poppins-regular"],
    color: Colors.primary,
    marginTop: Spacing * 0.5,
  },
  estimatedDelivery: {
    fontSize: Spacing * 1.6,
    fontFamily: Font["poppins-regular"],
    color: Colors.gray,
    marginTop: Spacing * 0.5,
  },
  trackingNumber: {
    fontSize: Spacing * 1.6,
    fontFamily: Font["poppins-regular"],
    color: Colors.gray,
    marginTop: Spacing * 0.5,
  },
  trackButton: {
    backgroundColor: Colors.primary,
    padding: Spacing * 1.5,
    borderRadius: Spacing * 2,
    marginTop: Spacing * 2,
    alignItems: "center",
  },
  trackButtonText: {
    fontSize: Spacing * 1.8,
    fontFamily: Font["poppins-semiBold"],
    color: Colors.onPrimary,
  },
});

export default OrderTrackingScreen;