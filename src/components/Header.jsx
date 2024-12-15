import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts } from "../utils/api";

const Header = ({ isHome }) => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const getProfileImage = async () => {
      try {
        await fetchProducts();

        setProfileImage(
          "https://clothing-store-vbrf.onrender.com/images/Ellipse2.png"
        );
      } catch (error) {
        console.error("Error Fetching Profile Image From API.JS", error);
      }
    };

    getProfileImage();
  }, []);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("HOME");
    }
  };

  const handleProfileClick = () => {
    navigation.navigate("ACCOUNT");
  };

  return (
    <View style={[styles.header, isHome && styles.homeHeaderPadding]}>
      {!isHome && (
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={handleBack}
        >
          <Image
            source={require("../assets/arrowback.png")}
            style={styles.appBackIcon}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleProfileClick}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text>Loading...</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  appDrawerContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  appDrawerIcon: {
    height: 30,
    width: 30,
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  profileImage: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 28,
    fontFamily: fonts.regular,
    color: "#000000",
  },
});