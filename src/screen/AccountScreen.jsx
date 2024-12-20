import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { UserContext } from "../context/Context";
import axios from "axios";

const AccountScreen = ({ navigation }) => {
  const { user, logOut } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLogOut = () => {
    logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "LOGIN" }],
    });
  };

  useEffect(() => {
    console.log("User Context:", user); // Log user data
    if (user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);


  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(false);

      const email = "x@gmail.com";  // Replace with dynamic email
      const password = "123456";     // Replace with dynamic password

      // Send data as a POST request with JSON body
      const response = await axios.post("https://clothing-store-vbrf.onrender.com/profile", {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json', // Proper content type for POST requests
        }
      });

      if (response.status === 200) {
        setUserData(response.data);
      } else {
        throw new Error("Failed to Load Data");
      }
    } catch (error) {
      console.error("Error Fetching User Data:", error.response || error.message);
      setUserData(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };






  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E96E6E" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>
          User Not Authenticated. Please Log In.
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Failed to Load Data. Please Try Again.</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchUserData}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header isProfile={true} />
      </View>

      <View style={styles.contentContainer}>
        {userData && (
          <>
            <View style={styles.profileHeader}>
              <Image
                source={{
                  uri:
                    userData.profileImage ||
                    "https://clothing-store-vbrf.onrender.com/images/Ellipse2.png",
                }}
                style={styles.profileImage}
              />
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.flexRowContainer}>
                <Text style={styles.detailsTitle}>Phone :</Text>
                <Text style={styles.detailsValue}>
                  {userData.phone || "Loading..."}
                </Text>
              </View>

              <View style={styles.flexRowContainer}>
                <Text style={styles.detailsTitle}>Address :</Text>
                <Text style={styles.detailsValue}>
                  {userData.address || "Loading..."}
                </Text>
              </View>

              <View style={styles.flexRowContainer}>
                <Text style={styles.detailsTitle}>Joined :</Text>
                <Text style={styles.detailsValue}>
                  {userData.joinedDate || "Loading..."}
                </Text>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.logOutButton}
          onPress={handleLogOut}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  retryText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  retryButton: {
    backgroundColor: "#E96E6E",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
});

export default AccountScreen;