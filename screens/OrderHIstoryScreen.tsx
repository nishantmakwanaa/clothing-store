import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";

const OrderHistoryScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
      </View>

      <View style={styles.orderList}>
        {/* Example Order */}
        <View style={styles.orderItem}>
          <Text style={styles.orderTitle}>Order #12345</Text>
          <Text style={styles.orderDetails}>3 Items - Total: $45</Text>
          <TouchableOpacity style={styles.viewOrderButton}>
            <Text style={styles.viewOrderText}>View Order</Text>
          </TouchableOpacity>
        </View>
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
  orderList: {
    marginTop: Spacing * 2,
  },
  orderItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing * 2,
    marginBottom: Spacing * 2,
  },
  orderTitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  orderDetails: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.gray,
    marginVertical: Spacing * 0.5,
  },
  viewOrderButton: {
    marginTop: Spacing * 1.5,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    borderRadius: Spacing * 2,
    alignItems: "center",
  },
  viewOrderText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.6,
    color: Colors.onPrimary,
  },
});

export default OrderHistoryScreen;
