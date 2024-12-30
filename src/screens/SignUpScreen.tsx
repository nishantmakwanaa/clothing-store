import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../assets/constants/Colors";
import Spacing from "../assets/constants/Spacing";
import Font from "../assets/constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types";
import { useApi } from "../context/Context";

type Props = NativeStackScreenProps<RootStackParamList, "Sign Up">;

const SignUpScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { registerUser } = useApi();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords Do Not Match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await registerUser({ firstName, lastName, email, password });
      
      setIsLoading(false);

      if (response) {
        navigate('Login');
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Failed To Sign Up. Please Try Again Later.');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign Up to Get Started</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={Spacing * 3} color={Colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor={Colors.gray}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={Spacing * 3} color={Colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor={Colors.gray}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

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

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={Spacing * 3} color={Colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={Colors.gray}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.signUpButton}
            disabled={isLoading}
          >
            <Text style={styles.signUpButtonText}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already Have An Account ?{' '}
            <Text style={styles.loginText} onPress={() => navigate('Login')}>
              Log In
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
  signUpButton: {
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    alignItems: "center",
    marginVertical: Spacing * 2,
  },
  signUpButtonText: {
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

export default SignUpScreen;