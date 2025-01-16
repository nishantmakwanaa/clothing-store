import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Fonts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApi } from "../context/Context";
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, "Login"> & {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const LoginScreen: React.FC<Props> = ({ navigation, setIsLoggedIn }) => {
  const { loginUser, loading, user } = useApi();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkIfLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please Enter A Valid E-Mail.");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password Must Be At Least 6 Characters.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setErrorMessage(null);
    if (!validateInputs()) return;

    try {
      await loginUser(email, password);

      if (!user?.userId || !user?.token) {
        setErrorMessage("Something Went Wrong. Missing User Information.");
        return;
      }

      await AsyncStorage.setItem("authToken", user.token);
      await AsyncStorage.setItem("userId", user.userId);
      await AsyncStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);
      navigation.navigate("Home");
    } catch (err) {
      setErrorMessage("Something Went Wrong. Please Try Again Later.");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      enableAutomaticScroll
    >
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>Welcome Back</Text>
          <Text style={{ fontSize: 18, color: "#777" }}>Log In To Your Account</Text>
        </View>

        <View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="mail-outline" size={24} color="#888" />
            <TextInput
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginLeft: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
              placeholder="E-Mail"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <Ionicons name="lock-closed-outline" size={24} color="#888" />
            <TextInput
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginLeft: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {errorMessage && <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>}

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{ marginBottom: 20 }}>
            <Text style={{ color: "#007bff" }}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "#007bff", paddingVertical: 12, borderRadius: 5 }}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>Log In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}>
            Don't Have An Account?{" "}
            <Text style={{ color: "#007bff" }} onPress={() => navigation.navigate("SignUp")}>
              Sign Up
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing * 2,
  },
  header: {
    marginVertical: Spacing * 4,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  subtitle: {
    fontSize: Spacing * 2,
    fontFamily: Font["poppins-regular"],
    color: Colors.gray,
    marginTop: Spacing,
  },
  form: {
    marginVertical: Spacing * 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing * 2,
    paddingHorizontal: Spacing,
    marginBottom: Spacing * 2,
    height: Spacing * 6,
  },
  input: {
    flex: 1,
    marginLeft: Spacing,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.text,
    textAlignVertical: "center",
    paddingVertical: 0,
    height: "100%",
    textAlign: "center",
  },
  loginButton: {  // Changed from signUpButton to loginButton
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
    marginVertical: Spacing * 2,
  },
  loginButtonText: {  // Changed from signUpButtonText to loginButtonText
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.onPrimary,
  },
  footer: {
    alignItems: "center",
    marginTop: Spacing * 4,
  },
  footerText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.gray,
  },
  loginText: {  // This stays the same, since it's for login
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.6,
    color: Colors.primary,
  },
  signUpText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.6,
    color: Colors.primary,
  },
  sectionTitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  iconButton: {
    padding: Spacing / 2,
  },
  separator: {
    width: Spacing / 2,
    height: Spacing / 2,
    backgroundColor: Colors.gray,
    borderRadius: Spacing / 4,
    marginHorizontal: Spacing,
  },
  errorText: {
    color: 'red',
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    marginTop: Spacing,
    textAlign: 'center',
  },
});


export default LoginScreen;