import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import fonts from "../config/fonts";
import { RootStackParamList } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';

import AdminPanelScreen from "../screens/AdminPanelScreen";
import CartScreen from "../screens/CartScreen";
import CheckOutScreen from "../screens/CheckOutScreen";
import ExchangeScreen from "../screens/ExchangeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import NotificationScreen from "../screens/NotificationScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import OrderTrackingScreen from "../screens/OrderTrackingScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RatingReviewScreen from "../screens/RatingReviewScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ShippingAdressScreen from "../screens/ShippingAdressScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WishListScreen from "../screens/WishListScreen";

import HeaderScreen from "../screens/components/HeaderScreen";
import FooterScreen from "../screens/components/FooterScreen";

export default function Navigation() {
  const [fontsLoaded] = useFonts(fonts);
  const [showSplash, setShowSplash] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
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
      ]).start();

      setTimeout(() => setShowSplash(false), 5000);
    }

    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
      } catch (error) {
        console.error('Error fetching login status:', error);
      }
    };

    checkLoginStatus();
  }, [fontsLoaded]);

  if (!fontsLoaded || showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={require("../assets/logo.png")}
          style={[styles.logo, { opacity: opacity }]}
        />
        <Animated.Text style={[styles.appName, { opacity: opacity }]}>
          Clothify
        </Animated.Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <RootNavigator isLoggedIn={isLoggedIn} />
      </NavigationContainer>
    );
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  isLoggedIn: boolean | null;
}

function RootNavigator({ isLoggedIn }: RootNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <HomeScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="ProductDetails">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <ProductDetailsScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Cart">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <CartScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="CheckOut">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <CheckOutScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="OrderHistory">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <OrderHistoryScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="OrderTracking">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <OrderTrackingScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Exchange">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <ExchangeScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="WishList">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <WishListScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="RatingReview">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <RatingReviewScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Search">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <SearchScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Profile">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <ProfileScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Settings">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <SettingsScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="ShippingAddress">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <ShippingAdressScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="Notification">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <NotificationScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="HelpSupport">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <HelpSupportScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="AdminPanel">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen />
                <AdminPanelScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
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