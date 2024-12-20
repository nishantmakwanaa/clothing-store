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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { setIsAuthenticated } = useAuth();

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

     const data = await response.json();

     if (response.ok) {
       await login(email, password);
       navigation.replace("HOME");
     } else {
       setError(data.message || "Login Failed. Please Try Again.");
     }
   } catch (err) {
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
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>E-Mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your E-Mail"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={styles.submitButton}
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
          <Text style={styles.signupText}>Forget Password ?</Text>
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={styles.signupLink}>Click Here</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>New to App ?</Text>
          <TouchableOpacity onPress={handleSignUpRedirect}>
            <Text style={styles.signupLink}>Sign Up Now !</Text>
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
    color: "#444444",
  },
  formContainer: {
    marginTop: 50,
  },
  inputLabel: {
    fontSize: 16,
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
  },
  submitButton: {
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
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#444444",
  },
  signupLink: {
    fontSize: 14,
    color: "#E96E6E",
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
});

export default LoginScreen;