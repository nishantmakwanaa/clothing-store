import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { fonts } from "../utils/fonts";
import { UserContext } from "../context/UserContext";

const AccountScreen = () => {
  const { user, logOut } = useContext(UserContext);

  const handleLogOut = () => {
    logOut();
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header isProfile={true} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.flexRowContainer}>
            <Text style={styles.detailsTitle}>Phone :</Text>
            <Text style={styles.detailsValue}>{user.phone}</Text>
          </View>

          <View style={styles.flexRowContainer}>
            <Text style={styles.detailsTitle}>Address :</Text>
            <Text style={styles.detailsValue}>{user.address}</Text>
          </View>

          <View style={styles.flexRowContainer}>
            <Text style={styles.detailsTitle}>Joined :</Text>
            <Text style={styles.detailsValue}>{user.joinedDate}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AccountScreen;

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
  profileHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#444",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#757575",
  },
  detailsContainer: {
    marginVertical: 20,
  },
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  detailsTitle: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "500",
  },
  detailsValue: {
    fontSize: 18,
    color: "#444",
    fontWeight: "600",
  },
  logOutButton: {
    backgroundColor: "#E96E6E",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
});