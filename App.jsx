import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from "./src/context/CartContext";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import HomeScreen from "./src/screen/HomeScreen";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import CartScreen from "./src/screen/CartScreen";
import AccountScreen from "./src/screen/AccountScreen";
import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import SettingsScreen from "./src/screen/SettingsScreen";
import ForgetPasswordScreen from "./src/screen/ForgetPasswordScreen";
import { UserContextProvider } from "./src/context/UserContext";
import PaymentScreen from "./src/screen/PaymentScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HOME" component={HomeScreen} />
    <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CART" component={CartScreen} />
    <Stack.Screen name="PAYMENT" component={PaymentScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LOGIN" component={LoginScreen} />
    <Stack.Screen name="SIGNUP" component={SignupScreen} />
    <Stack.Screen name="FORGOT_PASSWORD" component={ForgetPasswordScreen} />
  </Stack.Navigator>
);

const tabScreens = [
  {
    name: "HOME",
    component: HomeStack,
    iconFocused: require("./src/assets/focused/home.png"),
    iconNormal: require("./src/assets/normal/home.png"),
  },
  {
    name: "CART",
    component: CartStack,
    iconFocused: require("./src/assets/focused/shopping_cart.png"),
    iconNormal: require("./src/assets/normal/shopping_cart.png"),
  },
  {
    name: "ACCOUNT",
    component: AccountScreen,
    iconFocused: require("./src/assets/focused/account.png"),
    iconNormal: require("./src/assets/normal/account.png"),
  },

  {
    name: "SETTINGS",
    component: SettingsScreen,
    iconFocused: require("./src/assets/focused/reorder.png"),
    iconNormal: require("./src/assets/normal/reorder.png"),
  },
];

const MainApp = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
    {tabScreens.map((screen, index) => (
      <Tab.Screen
        key={index}
        name={screen.name}
        component={screen.component}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? screen.iconFocused : screen.iconNormal}
              style={{ height: size, width: size, resizeMode: "center" }}
            />
          ),
        }}
      />
    ))}
  </Tab.Navigator>
);

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <UserContextProvider>
      <NavigationContainer>
        <CartProvider>
          {isAuthenticated ? <MainApp /> : <AuthStack />}
        </CartProvider>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);