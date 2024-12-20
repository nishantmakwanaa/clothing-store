import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors, Spacing, Font } from "../constants"; // Ensure constants are defined

type AdminPanelSellScreenProps = NativeStackScreenProps<any, "AdminPanelSell">;

const AdminPanelSellScreen = ({ navigation }: AdminPanelSellScreenProps) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    setProducts([...products, { name: productName, price: productPrice }]);
    setProductName("");
    setProductPrice("");
  };

  const renderProduct = ({ item }: { item: { name: string; price: string } }) => (
    <SafeAreaView style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin Panel - Sell/Listing</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        keyboardType="numeric"
        value={productPrice}
        onChangeText={setProductPrice}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.productsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing * 2,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: Spacing * 1.5,
    marginTop: Spacing * 3,
    borderRadius: Spacing * 2,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    marginTop: Spacing * 4,
    alignItems: "center",
  },
  addButtonText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.8,
    color: Colors.onPrimary,
  },
  productContainer: {
    padding: Spacing * 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing * 2,
    marginBottom: Spacing * 2,
  },
  productName: {
    fontFamily: Font["poppins-bold"],
    fontSize: Spacing * 2.2,
    color: Colors.text,
  },
  productPrice: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  productsList: {
    marginTop: Spacing * 4,
  },
});

export default AdminPanelSellScreen;
