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

  const firstName = user.name.split(" ")[0];

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={Spacing * 3} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.userName}>Hi, {firstName}</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => navigation.navigate("Search")} style={styles.iconButton}>
          <Ionicons name="search-outline" size={Spacing * 3} color={Colors.text} />
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
    marginTop: Spacing * 2,
    paddingHorizontal: Spacing * 2,
    paddingBottom: Spacing * 2,
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