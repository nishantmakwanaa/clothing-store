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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
          <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </SafeAreaView>
      </SafeAreaProvider>
    </ApiProvider>
  );
}

function Navigation({ isLoggedIn, setIsLoggedIn }: { isLoggedIn: boolean; setIsLoggedIn: (isLoggedIn: boolean) => void }) {
  const { user } = useApi();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
        {!user ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreenWrapper} />
            <Stack.Screen name="AddProducts" component={AddProductsScreenWrapper} />
            <Stack.Screen name="Cart" component={CartScreenWrapper} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreenWrapper} />
            <Stack.Screen name="Notification" component={NotificationScreenWrapper} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreenWrapper} />
            <Stack.Screen name="Profile" component={ProfileScreenWrapper} />
            <Stack.Screen name="RatingReview" component={RatingReviewScreenWrapper} />
            <Stack.Screen name="Search" component={SearchScreenWrapper} />
            <Stack.Screen name="Settings" component={SettingsScreenWrapper} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreenWrapper(props: RootStackScreenProps<"Home">) {
  return (
    <>
      <HeaderScreen />
      <HomeScreen {...props} />
      <FooterScreen />
    </>
  );
}

function AddProductsScreenWrapper(props: RootStackScreenProps<"AddProducts">) {
  return (
    <>
      <HeaderScreen />
      <AddProductsScreen {...props} />
      <FooterScreen />
    </>
  );
}

function CartScreenWrapper(props: RootStackScreenProps<"Cart">) {
  return (
    <>
      <HeaderScreen />
      <CartScreen {...props} />
      <FooterScreen />
    </>
  );
}

function HelpSupportScreenWrapper(props: RootStackScreenProps<"HelpSupport">) {
  return (
    <>
      <HeaderScreen />
      <HelpSupportScreen {...props} />
      <FooterScreen />
    </>
  );
}

function NotificationScreenWrapper(props: RootStackScreenProps<"Notification">) {
  return (
    <>
      <HeaderScreen />
      <NotificationScreen {...props} />
      <FooterScreen />
    </>
  );
}

function ProductDetailsScreenWrapper(props: RootStackScreenProps<"ProductDetails">) {
  return (
    <>
      <HeaderScreen />
      <ProductDetailsScreen {...props} />
      <FooterScreen />
    </>
  );
}

function ProfileScreenWrapper(props: RootStackScreenProps<"Profile">) {
  return (
    <>
      <HeaderScreen />
      <ProfileScreen {...props} />
      <FooterScreen />
    </>
  );
}

function RatingReviewScreenWrapper(props: RootStackScreenProps<"RatingReview">) {
  return (
    <>
      <HeaderScreen />
      <RatingReviewScreen {...props} />
      <FooterScreen />
    </>
  );
}

function SearchScreenWrapper(props: RootStackScreenProps<"Search">) {
  return (
    <>
      <HeaderScreen />
      <SearchScreen {...props} />
      <FooterScreen />
    </>
  );
}

function SettingsScreenWrapper(props: RootStackScreenProps<"Settings">) {
  return (
    <>
      <HeaderScreen />
      <SettingsScreen {...props} />
      <FooterScreen />
    </>
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
