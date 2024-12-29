import React from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, View } from "react-native";
import fonts from "./config/fonts";
import { ApiProvider } from "./context/Context";
import Navigation from "./navigation";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Fonts...</Text>
      </View>
    );
  } else {
    return (
      <ApiProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Navigation />
            <StatusBar />
          </SafeAreaView>
        </SafeAreaProvider>
      </ApiProvider>
    );
  }
}