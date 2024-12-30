import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../src/assets/constants/Colors";
import Spacing from "../../src/assets/constants/Spacing";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getIconColor = (screenName: string) => {
    return route.name === screenName ? Colors.primary : Colors.text;
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons
          name="home-outline"
          size={Spacing * 3}
          color={getIconColor("Home")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons
          name="person-outline"
          size={Spacing * 3}
          color={getIconColor("Profile")}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.iconButton, styles.centerButton]}
        onPress={() => navigation.navigate("Add Products")}
      >
        <Ionicons
          name="add"
          size={Spacing * 4}
          color={Colors.background}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Cart")}
      >
        <Ionicons
          name="cart-outline"
          size={Spacing * 3}
          color={getIconColor("Cart")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons
          name="settings-outline"
          size={Spacing * 3}
          color={getIconColor("Settings")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: Spacing * 2,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  iconButton: {
    padding: Spacing / 2,
  },
  centerButton: {
    backgroundColor: Colors.primary,
    width: Spacing * 6,
    height: Spacing * 6,
    borderRadius: Spacing * 3,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Spacing,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FooterScreen;