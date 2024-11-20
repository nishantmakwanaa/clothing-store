// SettingsScreen.jsx
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { fonts } from "../utils/fonts";

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled((prev) => !prev);
  const toggleDarkMode = () => setIsDarkModeEnabled((prev) => !prev);

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header isSettings={true} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Settings</Text>

        <View style={styles.settingItemContainer}>
          <Text style={styles.settingTitle}>Enable Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "#E1E1E1", true: "#E96E6E" }}
            thumbColor={isNotificationsEnabled ? "#ffffff" : "#C0C0C0"}
          />
        </View>

        <View style={styles.settingItemContainer}>
          <Text style={styles.settingTitle}>Dark Mode</Text>
          <Switch
            value={isDarkModeEnabled}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#E1E1E1", true: "#E96E6E" }}
            thumbColor={isDarkModeEnabled ? "#ffffff" : "#C0C0C0"}
          />
        </View>

        <View style={styles.settingItemContainer}>
          <Text style={styles.settingTitle}>Language</Text>
          <Text style={styles.settingValue}>English</Text>
        </View>

        <View style={styles.settingItemContainer}>
          <Text style={styles.settingTitle}>Privacy Policy</Text>
          <TouchableOpacity>
            <Text style={styles.settingLink}>View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingItemContainer}>
          <Text style={styles.settingTitle}>Terms of Service</Text>
          <TouchableOpacity>
            <Text style={styles.settingLink}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {},
  contentContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#444",
    marginBottom: 20,
  },
  settingItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
    paddingBottom: 10,
  },
  settingTitle: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "500",
  },
  settingValue: {
    fontSize: 18,
    color: "#444",
    fontWeight: "600",
  },
  settingLink: {
    fontSize: 16,
    color: "#E96E6E",
    fontWeight: "500",
  },
});
