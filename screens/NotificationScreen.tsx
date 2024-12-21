import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors, Spacing, Font } from "../constants"; // Ensure constants are defined

type NotificationsScreenProps = NativeStackScreenProps<any, "Notifications">;

const NotificationsScreen = ({ navigation }: NotificationsScreenProps) => {
  const notifications = [
    { id: "1", message: "Your order has been shipped!" },
    { id: "2", message: "Sale! 20% off on selected items." },
    { id: "3", message: "New products added to the store!" },
  ];

  const renderNotification = ({ item }: { item: { message: string } }) => (
    <SafeAreaView style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.notificationsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing * 2,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  notificationsList: {
    marginTop: Spacing * 3,
  },
  notificationContainer: {
    padding: Spacing * 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing * 2,
    marginBottom: Spacing * 2,
  },
  notificationText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
});

export default NotificationsScreen;
