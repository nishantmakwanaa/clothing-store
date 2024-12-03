import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "../utils/fonts";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (email.trim() === "") {
      Alert.alert("Error", "Please Enter Your E-Mail Address.");
      return;
    }

    Alert.alert(
      "Password Reset",
      `If An Account With ${email} Exists, Instructions To Reset The Password Will Be Sent To This E-mail.`
    );
    navigation.navigate("LOGIN");
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          Enter Your Registered E-Mail Address, And We'll Send You A Link To
          Reset Your Password.
        </Text>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LOGIN")}>
          <Text style={styles.backToLogin}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  headerText: {
    fontSize: 30,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  formContainer: {
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#444444",
    textAlign: "center",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#444444",
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
    backgroundColor: "#E96E6E",
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
    color: "#E96E6E",
    fontSize: 14,
    fontFamily: fonts.regular,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ForgetPasswordScreen;