import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Colors from "../assets/constants/Colors";
import Spacing from "../assets/constants/Spacing";
import Font from "../assets/constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApi, useUser } from "../context/Context";
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';

type Props = NativeStackScreenProps<RootStackParamList, "Login"> & {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const LoginScreen: React.FC<Props> = ({
  navigation: { navigate },
  setIsLoggedIn,
}) => {
  const { loginUser, loading, error } = useApi();
  const { setToken, setUser } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkIfLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
        navigate("Home");
      }
    } catch (err) {
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
      const response = await loginUser(email, password);

      const { userId, token } = response;

      if (!userId || !token) {
        setErrorMessage("Something went wrong. Missing user information.");
        return;
      }

      setToken(token);
      setUser({ userId, token });

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userId", JSON.stringify(userId));
      await AsyncStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);
      navigate("Home");
    } catch (err) {
      setErrorMessage("Something Went Wrong. Please Try Again Later.");
    }
  };

  return (
    <KeyboardAwareScrollView
  contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
  keyboardShouldPersistTaps="handled"
  enableOnAndroid
  enableAutomaticScroll // this automatically scrolls when the keyboard shows
>
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log In To Your Account</Text>
    </View>

    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={Spacing * 3} color={Colors.gray} />
        <TextInput
          style={styles.input}
          placeholder="E-Mail"
          placeholderTextColor={Colors.gray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={Spacing * 3} color={Colors.gray} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.gray}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TouchableOpacity
        onPress={() => navigate("Forgot Password")}
        style={styles.forgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.loginButton}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.onPrimary} />
        ) : (
          <Text style={styles.loginButtonText}>Log In</Text>
        )}
      </TouchableOpacity>
    </View>

    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Don't Have An Account ?{" "}
        <Text style={styles.signUpText} onPress={() => navigate("Sign Up")}>
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
    paddingHorizontal: Spacing * 2,
    paddingVertical: Spacing * 2,
    justifyContent: "center",
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
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: Spacing * 3,
  },
  forgotPasswordText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.primary,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
    marginVertical: Spacing * 2,
  },
  loginButtonText: {
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
  signUpText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.6,
    color: Colors.primary,
  },
  errorText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.background,
    marginTop: Spacing,
    textAlign: "center",
  },
});

export default LoginScreen;