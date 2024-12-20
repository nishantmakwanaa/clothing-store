import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "../utils/fonts";
import { useDarkMode } from "../context/DarkModeContext";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { isDarkMode } = useDarkMode();

  const handleResetPassword = async () => {
    if (email.trim() === "") {
      Alert.alert("Error", "Please Enter Your E-Mail Address.");
      return;
    }

    try {
      const response = await fetch(
        "https://clothing-store-vbrf.onrender.com/forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Password Reset",
          `If An Account With ${email} Exists, Instructions To Reset The Password Will Be Sent To This E-Mail.`
        );
        navigation.navigate("LOGIN");
      } else {
        Alert.alert(
          "Error",
          data.message || "An Error Occurred. Please Try Again."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed To Communicate With The Server.");
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ["#333333", "#444444"] : ["#FDF0F3", "#FFFBFC"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: isDarkMode ? "#FFFFFF" : "#444444" }]}>
          Forgot Password
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={[styles.subtitle, { color: isDarkMode ? "#FFFFFF" : "#444444" }]}>
          Enter Your Registered E-Mail Address, And We'll Send You A Link To
          Reset Your Password.
        </Text>
        <Text style={[styles.inputLabel, { color: isDarkMode ? "#FFFFFF" : "#444444" }]}>
          Email
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? "#555555" : "#FFFFFF", color: isDarkMode ? "#FFFFFF" : "#000000" }]}
          placeholder="Enter Your E-Mail"
          placeholderTextColor={isDarkMode ? "#AAAAAA" : "#888888"}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: isDarkMode ? "#E96E6E" : "#E96E6E" }]}
          onPress={handleResetPassword}
        >
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LOGIN")}>
          <Text style={[styles.backToLogin, { color: isDarkMode ? "#E96E6E" : "#E96E6E" }]}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  headerText: {
    fontSize: 30,
    fontFamily: fonts.regular,
    fontWeight: "700",
  },
  formContainer: {
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    textAlign: "center",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  input: {
    height: 50,
    borderColor: "#E96E6E",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  resetButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
  backToLogin: {
    fontSize: 14,
    fontFamily: fonts.regular,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ForgetPasswordScreen;