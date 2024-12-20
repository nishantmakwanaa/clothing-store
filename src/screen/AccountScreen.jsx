import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { UserContext } from "../context/Context";

const AccountScreen = ({ navigation }) => {
  const { user, setUser, logOut } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
    phone: user?.phone || "",
  });

  const handleLogOut = () => {
    logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "LOGIN" }],
    });
  };

  const handleEditChange = (field, value) => {
    setUpdatedUser({ ...updatedUser, [field]: value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://clothing-store-vbrf.onrender.com/edit-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed To Update Profile.");
      }

      const data = await response.json();

      setUser({
        ...user,
        ...data,
      });

      setIsEditing(false);
      console.log("Profile Updated Successfully !");
    } catch (error) {
      console.error("Error Updating Profile :", error);
      alert("Error Updating Profile. Please Try Again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header isProfile={true} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: user.profileImage || "https://clothing-store-vbrf.onrender.com/images/Ellipse2.png",
            }}
            style={styles.profileImage}
          />
        </View>

        {isEditing ? (
          <View style={styles.detailsContainer}>
            <TextInput
              style={styles.inputField}
              value={updatedUser.firstName}
              onChangeText={(text) => handleEditChange("firstName", text)}
              placeholder="Enter Your First Name"
            />
            <TextInput
              style={styles.inputField}
              value={updatedUser.lastName}
              onChangeText={(text) => handleEditChange("lastName", text)}
              placeholder="Enter Your Last Name"
            />
            <TextInput
              style={styles.inputField}
              value={updatedUser.email}
              onChangeText={(text) => handleEditChange("email", text)}
              placeholder="Enter Your E-mail"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.inputField}
              value={updatedUser.password}
              onChangeText={(text) => handleEditChange("password", text)}
              placeholder="Enter New password"
              secureTextEntry
            />
            <TextInput
              style={styles.inputField}
              value={updatedUser.phone}
              onChangeText={(text) => handleEditChange("phone", text)}
              placeholder="Enter Your Phone Number"
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Update</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.detailsContainer}>
            <View style={styles.flexRowContainer}>
              <Text style={styles.detailsTitle}>First Name :</Text>
              <Text style={styles.detailsValue}>{user.firstName || "Not Available"}</Text>
            </View>
            <View style={styles.flexRowContainer}>
              <Text style={styles.detailsTitle}>Last Name :</Text>
              <Text style={styles.detailsValue}>{user.lastName || "Not Available"}</Text>
            </View>
            <View style={styles.flexRowContainer}>
              <Text style={styles.detailsTitle}>E-Mail :</Text>
              <Text style={styles.detailsValue}>{user.email || "Not Available"}</Text>
            </View>
            <View style={styles.flexRowContainer}>
              <Text style={styles.detailsTitle}>Phone :</Text>
              <Text style={styles.detailsValue}>{user.phone || "Not Available"}</Text>
            </View>
            <View style={styles.flexRowContainer}>
              <Text style={styles.detailsTitle}>Joined :</Text>
              <Text style={styles.detailsValue}>{user.joined || "Not Available"}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Edit Details</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
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
  },
  editButton: {
    backgroundColor: "#4CAF50",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: "#E96E6E",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  inputField: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
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
});

export default AccountScreen;