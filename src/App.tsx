import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ApiProvider } from "./context/Context";
import Fonts from "./assets/constants/Fonts";
import Navigation from "./Index";

export default function App() {
  const [fontsLoaded] = useFonts(Fonts);

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
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar style="auto" />
            <Navigation />
          </SafeAreaView>
        </SafeAreaProvider>
      </ApiProvider>
    );
  }
}