import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { user } from "../../data/index";

const HeaderScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={user.image} style={styles.userImage} />
        </TouchableOpacity>
        <Text style={styles.userName}>Hi, {user.name}</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => navigation.navigate("Search")} style={styles.iconButton}>
          <Ionicons name="search-outline" size={Spacing * 3} color={Colors.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.iconButton}>
          <Ionicons name="cart-outline" size={Spacing * 3} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: Spacing * 4,
    height: Spacing * 4,
  },
  userName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.text,
    marginLeft: Spacing,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: Spacing / 2,
  },
});

export default HeaderScreen;