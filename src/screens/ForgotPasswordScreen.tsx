import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../assets/constants/Colors";
import Spacing from "../assets/constants/Spacing";
import Font from "../assets/constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useApi } from "../context/Context";

type Props = NativeStackScreenProps<RootStackParamList, "Forgot Password">;

const ForgotPasswordScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { forgotPassword } = useApi();
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please Enter An E-Mail Address.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await forgotPassword(email);

      if (response?.message) {
        setMessage(response.message);
        setTimeout(() => navigation.navigate('Login'), 2000);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'An Error Occurred, Please Try Again Later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Forgot Password</Text>
            <Text style={{ fontSize: 16, color: Colors.gray }}>Enter Your E-Mail To Reset Your Password</Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.gray, paddingBottom: 8 }}>
              <Ionicons name="mail-outline" size={Spacing * 3} color={Colors.gray} />
              <TextInput
                style={{ flex: 1, paddingLeft: 10, fontSize: 16 }}
                placeholder="E-Mail"
                placeholderTextColor={Colors.gray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
            {message && <Text style={{ color: 'green', marginTop: 10 }}>{message}</Text>}

            <TouchableOpacity
              onPress={handleForgotPassword}
              style={{
                backgroundColor: Colors.primary,
                paddingVertical: 12,
                marginTop: 20,
                borderRadius: 5,
                alignItems: 'center',
              }}
              disabled={loading}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 14 }}>
              Remember Your Password ?{' '}
              <Text
                style={{ color: Colors.primary, fontWeight: 'bold' }}
                onPress={() => navigation.navigate('Login')}
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