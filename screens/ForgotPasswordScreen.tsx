import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState<string>("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter Your E-Mail To Reset Your Password</Text>
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

            <TouchableOpacity
              onPress={() => {
                navigate("Login");
              }}
              style={styles.resetButton}
            >
              <Text style={styles.resetButtonText}>Send Reset Link</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Remember Your Password ?{" "}
              <Text
                style={styles.loginText}
                onPress={() => navigate("Login")}
              >
                Log In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
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
    textAlign: "left",
  },
  resetButton: {
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
    marginVertical: Spacing * 2,
  },
  resetButtonText: {
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
  loginText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.6,
    color: Colors.primary,
  },
});

export default ForgotPasswordScreen;