import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Animated, StyleSheet } from "react-native";
import { View } from "react-native";
import { useFonts } from "expo-font";
import fonts from "./assets/constants/Fonts";
import { RootStackParamList } from "./Types";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

import HeaderScreen from "./components/HeaderScreen";
import FooterScreen from "./components/FooterScreen";

export default function Navigation() {
  const [fontsLoaded] = useFonts(fonts);
  const [showSplash, setShowSplash] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);
  const opacity = React.useRef(new Animated.Value(0)).current;
  const [userName, setUserName] = React.useState<string | null>(null);

  const checkLoginStatus = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
      
      if (loggedIn === 'true') {
        const userName = "Nishant";
        console.log("Fetched userName :", userName);
        setUserName(userName ?? null);
      }
    } catch (error) {
      console.error('Error Fetching Login Status :', error);
    }
  };
  
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
    checkLoginStatus();
  }, [fontsLoaded]);

  if (!fontsLoaded || showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={require("./assets/logo.png")}
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
        <RootNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={userName} />
      </NavigationContainer>
    );
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  isLoggedIn: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  userName?: string | null;
}

function RootNavigator({ isLoggedIn, setIsLoggedIn, userName }: RootNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home">
            {props => (
              <View style={{ flex: 1 }}>
                <HeaderScreen userName={userName} />
                <HomeScreen {...props} />
                <FooterScreen />
              </View>
            )}
          </Stack.Screen>
          <Stack.Screen name="Product Details">
{props => (
  <View style={{ flex: 1 }}>
    <HeaderScreen userName={userName} />
    <ProductDetailsScreen {...props} />
    <FooterScreen />
  </View>
)}
</Stack.Screen>

<Stack.Screen name="Cart">
{props => (
  <View style={{ flex: 1 }}>
    <HeaderScreen userName={userName} />
    <CartScreen {...props} />
    <FooterScreen />
  </View>
)}
</Stack.Screen>

<Stack.Screen name="Add Products">
{props => (
  <View style={{ flex: 1 }}>
    <HeaderScreen userName={userName} />
    <AddProductsScreen {...props} />
    <FooterScreen />
  </View>
)}
</Stack.Screen>

<Stack.Screen name="Rating & Review">
{props => (
  <View style={{ flex: 1 }}>
    <HeaderScreen userName={userName} />
    <RatingReviewScreen {...props} />
    <FooterScreen />
  </View>
)}
</Stack.Screen>

<Stack.Screen name="Search">
{props => (
  <View style={{ flex: 1 }}>
    <HeaderScreen userName={userName} />
    <SearchScreen {...props} />
    <FooterScreen />
  </View>
)}
</Stack.Screen>

<Stack.Screen name="Profile">
{props => (
  <View style={{ flex: 1 }}>
    <HeaderScreen userName={userName} />
    <ProfileScreen {...props} />
    <FooterScreen />
  </View>
)}
</Stack.Screen>

<Stack.Screen name="Notification">
{props => (
  <View style={{ flex: 1 }}>
    <HeaderScreen userName={userName} />
    <NotificationScreen {...props} />
    <FooterScreen />
  </View>
)}
</Stack.Screen>

<Stack.Screen name="HelpSupport">
{props => (
  <View style={{ flex: 1 }}>
    <HeaderScreen userName={userName} />
    <HelpSupportScreen {...props} />
    <FooterScreen />
  </View>
)}
</Stack.Screen>

<Stack.Screen name="Settings">
{props => (
  <View style={{ flex: 1 }}>
    <HeaderScreen userName={userName} />
    <SettingsScreen {...props} setIsLoggedIn={setIsLoggedIn} />
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