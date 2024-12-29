import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../../context/Context";

const HeaderScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUser(); // Access user info from context

  // Fallback to 'Guest' if user is not available
  const firstName = user?.name?.split(' ')[0] || "Guest"; // Extract first name safely

  return (
    <View style={styles.header}>
      <View style={styles.headerTopRow}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconButton}>
            <Ionicons name="arrow-back-outline" size={Spacing * 3} color={Colors.text} />
          </TouchableOpacity>
          {/* Use the first name dynamically */}
          <Text style={styles.userName}>Hi, {firstName}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")} style={styles.iconButton}>
            <Ionicons name="search-outline" size={Spacing * 3} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={Spacing * 3} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerBottomRow}>
        <Text style={styles.pageName}>{route.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing * 2,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing * 1,
    paddingBottom: Spacing * 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginHorizontal: -Spacing * 2,
    paddingHorizontal: Spacing * 2,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.text,
    marginLeft: Spacing,
    lineHeight: Spacing * 3,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: Spacing / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  backIconButton: {
    marginTop: -Spacing / 4,
  },
  headerBottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing * 0.5,
    paddingVertical: Spacing * 0.5,
  },
  pageName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 3,
    color: Colors.text,
    textAlign: "center",
    flex: 1,
    justifyContent: "space-between",
  },
});

export default HeaderScreen;
