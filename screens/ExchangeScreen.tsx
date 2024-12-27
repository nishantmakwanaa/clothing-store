import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";

type ExchangeScreenProps = NativeStackScreenProps<any, "Exchange">;

const ExchangeScreen = ({ navigation }: ExchangeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Exchange</Text>
      <Text style={styles.infoText}>Exchange your purchased items here.</Text>
      <TouchableOpacity style={styles.exchangeButton}>
        <Text style={styles.buttonText}>Start Exchange</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  infoText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    marginTop: Spacing * 2,
    color: Colors.text,
  },
  exchangeButton: {
    marginTop: Spacing * 4,
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.8,
    color: Colors.onPrimary,
  },
});

export default ExchangeScreen;