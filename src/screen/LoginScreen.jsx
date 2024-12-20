import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/Context";
import { useDarkMode } from "../context/DarkModeContext";

const LoginScreen = () => {
  const { login } = useAuth();
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Both Fields Are Required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://clothing-store-vbrf.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login Failed. Please Try Again.");
        return;
      }

      const data = await response.json();
      console.log('Login Successful :', data);
      await login(data.token, navigation);

      console.log('Navigating To HOME');
    } catch (err) {
      console.error("Login Error :", err);
      setError("Something Went Wrong. Please Try Again Later.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate("FORGOT_PASSWORD");
  };

  const handleSignUpRedirect = () => {
    navigation.navigate("SIGNUP");
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ["#333333", "#444444"] : ["#FDF0F3", "#FFFBFC"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: isDarkMode ? "#FFFFFF" : "#444444" }]}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={[styles.inputLabel, { color: isDarkMode ? "#FFFFFF" : "#444444" }]}>E-Mail</Text>
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? "#555555" : "#FFFFFF", color: isDarkMode ? "#FFFFFF" : "#000000" }]}
          placeholder="Enter Your E-Mail"
          placeholderTextColor={isDarkMode ? "#BBBBBB" : "#888888"}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={[styles.inputLabel, { color: isDarkMode ? "#FFFFFF" : "#444444" }]}>Password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? "#555555" : "#FFFFFF", color: isDarkMode ? "#FFFFFF" : "#000000" }]}
          placeholder="Enter Your Password"
          placeholderTextColor={isDarkMode ? "#BBBBBB" : "#888888"}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: isDarkMode ? "#E96E6E" : "#E96E6E" }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, { color: isDarkMode ? "#FFFFFF" : "#444444" }]}>Forget Password ?</Text>
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={[styles.signupLink, { color: isDarkMode ? "#FF72B1" : "#FF72B1" }]}>Click Here</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, { color: isDarkMode ? "#FFFFFF" : "#444444" }]}>New to App ?</Text>
          <TouchableOpacity onPress={handleSignUpRedirect}>
            <Text style={[styles.signupLink, { color: isDarkMode ? "#FF72B1" : "#FF72B1" }]}>Sign Up Now !</Text>
          </TouchableOpacity>
        </View>
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
    fontWeight: "700",
  },
  formContainer: {
    marginTop: 50,
  },
  inputLabel: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontWeight: "500",
  },
  signupLink: {
    fontWeight: "500",
  },
});

export default LoginScreen;