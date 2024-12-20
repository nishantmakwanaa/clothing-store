import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors, Spacing, Font } from "../constants"; // Ensure constants are defined

type ShippingAddressScreenProps = NativeStackScreenProps<any, "ShippingAddress">;

const ShippingAddressScreen = ({ navigation }: ShippingAddressScreenProps) => {
  const [address, setAddress] = useState("");

  const handleSaveAddress = () => {
    // Save address logic
    console.log("Address Saved:", address);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shipping Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
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
  saveButton: {
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    marginTop: Spacing * 4,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.8,
    color: Colors.onPrimary,
  },
});

export default ShippingAddressScreen;
