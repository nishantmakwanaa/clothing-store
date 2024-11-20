import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";

const ReorderScreen = () => {
  const navigation = useNavigation();

  const handleReorder = () => {
    navigation.navigate("CONFIRM_REORDER");
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.fontText, styles.titleText]}>Reorder</Text>
        <Text style={[styles.fontText, styles.descriptionText]}>
          Reorder your previous items with just one click.
        </Text>

        <View style={styles.reorderItemContainer}>
          <Text style={styles.reorderItemText}>Product Name</Text>
          <Text style={styles.reorderItemText}>Price: $xx.xx</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleReorder}>
          <Text style={styles.buttonText}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ReorderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
  },
  contentContainer: {
    padding: 20,
  },
  titleText: {
    fontSize: 30,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
    marginBottom: 20,
  },
  fontText: {
    fontSize: 20,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  descriptionText: {
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
  reorderItemContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 30,
  },
  reorderItemText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: "#444444",
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
});
