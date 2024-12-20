import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch, Linking, Alert, Modal, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import DeviceInfo from "react-native-device-info";
import { useDarkMode } from "../context/DarkModeContext";

const SettingsScreen = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("English");
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [appVersion, setAppVersion] = useState("");

  const languages = ["English"];

  const toggleNotifications = () => setIsNotificationsEnabled(prev => !prev);

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    });
  };

  const selectLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setLanguageModalVisible(false);
  };

  useEffect(() => {
    const version = DeviceInfo.getVersion();
    setAppVersion(version);
  }, []);

  return (
    <LinearGradient
      colors={isDarkMode ? ["#2f2f2f", "#1c1c1c"] : ["#FDF0F3", "#FFFBFC"]}
      style={[styles.container, { backgroundColor: isDarkMode ? '#1c1c1c' : '#fff' }]}
    >
      <View style={styles.header}>
        <Header isSettings={true} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.titleText, { color: isDarkMode ? "#fff" : "#444" }]}>Settings</Text>

        <View style={styles.settingItemContainer}>
          <Text style={[styles.settingTitle, { color: isDarkMode ? "#fff" : "#757575" }]}>Enable Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "#E1E1E1", true: "#E96E6E" }}
            thumbColor={isNotificationsEnabled ? "#ffffff" : "#C0C0C0"}
          />
        </View>
        <View style={styles.settingItemContainer}>
          <Text style={[styles.settingTitle, { color: isDarkMode ? "#fff" : "#757575" }]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#E1E1E1", true: "#E96E6E" }}
            thumbColor={isDarkMode ? "#ffffff" : "#C0C0C0"}
          />
        </View>
        <View style={styles.settingItemContainer}>
          <Text style={[styles.settingTitle, { color: isDarkMode ? "#fff" : "#757575" }]}>Language</Text>
          <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
            <Text style={[styles.settingValue, { color: isDarkMode ? "#fff" : "#444" }]}>{language}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingItemContainer}>
          <Text style={[styles.settingTitle, { color: isDarkMode ? "#fff" : "#757575" }]}>Meet Developers</Text>
          <TouchableOpacity onPress={() => openLink("https://nishantworldwide.in")}>
            <Text style={styles.settingLink}>Click Here</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: isDarkMode ? "#fff" : "#000" }]}>
            App Version : {appVersion}
          </Text>
        </View>
      </View>
      <Modal
        visible={isLanguageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <FlatList
              data={languages}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageItem}
                  onPress={() => selectLanguage(item)}
                >
                  <Text style={styles.languageText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontWeight: "500",
  },
  settingValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  settingLink: {
    fontSize: 16,
    color: "#E96E6E",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  languageItem: {
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
  },
  languageText: {
    fontSize: 18,
    color: "#444",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#E96E6E",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  versionContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  versionText: {
    fontSize: 16,
  },
});