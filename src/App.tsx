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
  Notifications: undefined;
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
        <Animated.Text style={[styles.appName, { opacity }]}>Clothify</Animated.Text>
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
  const { user, fetchUserProducts, fetchUserNotifications } = useApi();

  useEffect(() => {
    if (user) {
      fetchUserProducts();
      fetchUserNotifications();
    }
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "none" }}
        initialRouteName="Login"
      >
        {!user ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreenWrapper {...props} setIsLoggedIn={() => {}} />}
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
            <Stack.Screen name="Notifications" component={NotificationScreenWrapper} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreenWrapper} />
            <Stack.Screen name="Profile" component={ProfileScreenWrapper} />
            <Stack.Screen name="RatingReview" component={RatingReviewScreenWrapper} />
            <Stack.Screen name="Search" component={SearchScreenWrapper} />
            <Stack.Screen name="Settings">
              {(props) => <SettingsScreenWrapper {...props} setIsLoggedIn={() => {}} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreenWrapper({ navigation, route }: RootStackScreenProps<'Home'>) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <HomeScreen navigation={navigation} route={route} />
      <FooterScreen />
    </View>
  );
}

function AddProductsScreenWrapper() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <AddProductsScreen />
      <FooterScreen />
    </View>
  );
}

function CartScreenWrapper() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <CartScreen />
      <FooterScreen />
    </View>
  )
}

function HelpSupportScreenWrapper({ navigation, route }: RootStackScreenProps<'HelpSupport'>) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <HelpSupportScreen navigation={navigation} route={route} />
      <FooterScreen />
    </View>
  )
}

function NotificationScreenWrapper({ navigation, route }: RootStackScreenProps<'Notifications'>) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <NotificationScreen navigation={navigation} route={route} />
      <FooterScreen />
    </View>
  )
}

function ProductDetailsScreenWrapper({ navigation, route }: RootStackScreenProps<'ProductDetails'>) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <ProductDetailsScreen navigation={navigation} route={route} />
      <FooterScreen />
    </View>
  )
}

function ProfileScreenWrapper() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <ProfileScreen />
      <FooterScreen />
    </View>
  )
}

function RatingReviewScreenWrapper({ navigation, route }: RootStackScreenProps<'RatingReview'>) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <RatingReviewScreen navigation={navigation} route={route} />
      <FooterScreen />
    </View>
  )
}

function SearchScreenWrapper({ navigation, route }: RootStackScreenProps<'Search'>) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <SearchScreen navigation={navigation} route={route} />
      <FooterScreen />
    </View>
  )
}


function LoginScreenWrapper({ navigation, route, setIsLoggedIn }: RootStackScreenProps<'Login'> & { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>; }) {
  return <LoginScreen navigation={navigation} route={route} setIsLoggedIn={setIsLoggedIn} />;
}

function SettingsScreenWrapper({ navigation, setIsLoggedIn }: RootStackScreenProps<'Settings'> & { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>; }) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <SettingsScreen navigation={navigation} setIsLoggedIn={setIsLoggedIn} />
      <FooterScreen />
    </View>
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
    width: 150,
    height: 150,
  },
  appName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
});