import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const AccountScreen = () => {
  const navigation = useNavigation();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    console.log("Logging out...");
    setIsAuthenticated(false);
    navigation.navigate("LoginScreen");
  };

  const handleSettings = () => {
    console.log("Navigating to Settings...");
    navigation.navigate("SettingsScreen");
  };

  const handleProfile = () => {
    console.log("Navigating to Profile...");
    navigation.navigate("UserDetailsScreen");
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.fontText, styles.titleText]}>Account</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Username: John Doe</Text>
          <Text style={styles.infoText}>Email: johndoe@example.com</Text>
          <Text style={styles.infoText}>Phone: 123-456-7890</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleProfile}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSettings}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AccountScreen;

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
    marginBottom: 30,
  },
  fontText: {
    fontSize: 20,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: "#888",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#FF4C4C",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
});
