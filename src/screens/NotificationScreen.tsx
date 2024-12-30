import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Colors from "../assets/constants/Colors";
import Spacing from "../assets/constants/Spacing";
import Font from "../assets/constants/Font";

type NotificationsScreenProps = NativeStackScreenProps<any, "Notifications">;

const NotificationsScreen = ({ navigation }: NotificationsScreenProps) => {
  const notifications = [
    { id: "1", message: "Your Order Has Been Shipped !" },
    { id: "2", message: "Sale! 20% Off On Selected Items." },
    { id: "3", message: "New Products Added To The Store !" },
  ];

  const renderNotification = ({ item }: { item: { message: string } }) => (
    <SafeAreaView style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
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
    paddingHorizontal: Spacing * 2,
    marginTop: 0,
    marginBottom: 0,
  },
  notificationsList: {
    marginTop: Spacing * 3,
  },
  notificationContainer: {
    padding: Spacing * 2,
    backgroundColor: Colors.background,
    borderRadius: Spacing * 2,
    marginBottom: Spacing * 2,
  },
  notificationText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  sectionTitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  exploreSection: {
    paddingVertical: Spacing * 4,
  },
  exploreTitle: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  exploreHighlighted: {
    fontSize: Spacing * 4,
    color: Colors.primary,
  },
  viewAllButton: {
    paddingVertical: Spacing,
  },
  viewAllText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
  },
});

export default NotificationsScreen;