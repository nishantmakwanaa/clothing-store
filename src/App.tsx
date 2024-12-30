import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Fonts from "./constants/Fonts";
import ApiProvider, { useApi } from "./context/Context";
import CartScreen from "./screens/CartScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HelpSupportScreen from "./screens/HelpSupportScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RatingReviewScreen from "./screens/RatingReviewScreen";
import SearchScreen from "./screens/SearchScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AddProductsScreen from "./screens/AddProductsScreen";
import HeaderScreen from "./screens/components/HeaderScreen";
import FooterScreen from "./screens/components/FooterScreen";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  AddProducts: undefined;
  Cart: undefined;
  HelpSupport: undefined;
  Notification: undefined;
  ProductDetails: undefined;
  Profile: undefined;
  RatingReview: undefined;
  Search: undefined;
  Settings: undefined;
};

type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts(Fonts);
  const [showSplash, setShowSplash] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fontsLoaded) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => setShowSplash(false));
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={require("./assets/app/Logo.png")}
          style={[styles.logo, { opacity }]}
        />
        <Animated.Text style={[styles.appName, { opacity }]}>
          Clothify
        </Animated.Text>
      </View>
    );
  }

  return (
    <ApiProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <StatusBar style="auto" />
          <Navigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </ApiProvider>
  );
}

function Navigation() {
  const { user } = useApi();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          <>
            <ScreenWrapper name="AddProducts" component={AddProductsScreen} />
            <ScreenWrapper name="Cart" component={CartScreen} />
            <ScreenWrapper name="HelpSupport" component={HelpSupportScreen} />
            <ScreenWrapper name="Home" component={HomeScreen} />
            <ScreenWrapper name="Notification" component={NotificationScreen} />
            <ScreenWrapper name="ProductDetails" component={ProductDetailsScreen} />
            <ScreenWrapper name="Profile" component={ProfileScreen} />
            <ScreenWrapper name="RatingReview" component={RatingReviewScreen} />
            <ScreenWrapper name="Search" component={SearchScreen} />
            <ScreenWrapper name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ScreenWrapper({ name, component }: { name: keyof RootStackParamList; component: React.ComponentType<any> }) {
  return (
    <Stack.Screen
      name={name}
      component={(props) => (
        <>
          <HeaderScreen />
          {React.createElement(component, props)}
          <FooterScreen />
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 24,
    marginTop: 20,
    fontFamily: "poppins-regular",
    color: "#000",
  },
});