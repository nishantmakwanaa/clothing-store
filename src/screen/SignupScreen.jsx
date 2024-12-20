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
import { useDarkMode } from "../context/DarkModeContext";

const SignupScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const validateMobile = (mobile) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !mobile) {
      setError("All Fields Are Required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please Enter A Valid E-Mail Address.");
      return;
    }

    if (password.length < 6) {
      setError("Password Must Be At Least 6 Characters.");
      return;
    }

    if (!validateMobile(mobile)) {
      setError("Please Enter A Valid Mobile Number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://clothing-store-vbrf.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            mobile,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("LOGIN");
      } else {
        setError(data.message || "Signup Failed. Please Try Again.");
      }
    } catch (err) {
      setError("Something Went Wrong. Please Try Again Later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate("LOGIN");
  };

  const backgroundColor = isDarkMode ? "#333" : "#FDF0F3";
  const textColor = isDarkMode ? "#fff" : "#444444";
  const inputBackground = isDarkMode ? "#555" : "#fff";
  const inputBorderColor = isDarkMode ? "#777" : "#E96E6E";
  const buttonColor = isDarkMode ? "#444" : "#E96E6E";
  const buttonTextColor = isDarkMode ? "#fff" : "#fff";

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: textColor }]}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={[styles.inputLabel, { color: textColor }]}>First Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor }]}
          placeholder="Enter Your First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor={isDarkMode ? "#ddd" : "#444"}
        />
        <Text style={[styles.inputLabel, { color: textColor }]}>Last Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor }]}
          placeholder="Enter Your Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor={isDarkMode ? "#ddd" : "#444"}
        />
        <Text style={[styles.inputLabel, { color: textColor }]}>E-Mail</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor }]}
          placeholder="Enter Your E-Mail"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={isDarkMode ? "#ddd" : "#444"}
        />
        <Text style={[styles.inputLabel, { color: textColor }]}>Password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor }]}
          placeholder="Enter Your Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={isDarkMode ? "#ddd" : "#444"}
        />
        <Text style={[styles.inputLabel, { color: textColor }]}>Mobile</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor }]}
          placeholder="Enter Your Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          placeholderTextColor={isDarkMode ? "#ddd" : "#444"}
        />
        {error && <Text style={[styles.errorText, { color: "red" }]}>{error}</Text>}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: buttonColor }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: textColor }]}>Already Have An Account ?</Text>
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Text style={[styles.loginLink, { color: buttonColor }]}>Login</Text>
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
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 15,
    fontSize: 16,
  },
  submitButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
  },
  loginContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    marginLeft: 5,
  },
  errorText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignupScreen;