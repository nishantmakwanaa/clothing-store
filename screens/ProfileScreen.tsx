import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";
import axios from "axios";
import { RouteProp } from '@react-navigation/native';
import { useUser } from "../context/UserProvider";

interface ProfileScreenProps {
    route: RouteProp<RootStackParamList, 'Profile'>;
    navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
}

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    photo: any;
    address: string | null;
    age: number | null;
    whatsappNumber: string | null;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        photo: require("/assets/images/user/avatar.png"),
        address: "",
        age: 0,
        whatsappNumber: "",
    });

    const { user } = useUser();
  
    const userId = user?.userId;
    
    useEffect(() => {
        if (!loggedIn) {
            navigation.navigate("Login");
        } else {
            axios.get(`http://localhost:5000/api/users/${userId}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error("Error Fetching User Data.", error);
                });
        }
    }, [loggedIn, navigation, userId]);

    const handleInputChange = (field: keyof UserData, value: string) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    const handlePhotoChange = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setUserData((prev) => ({
                ...prev,
                photo: { uri: result.uri },
            }));
        }
    };

    const handleSaveChanges = () => {
        axios.put(`http://localhost:5000/api/users/${userId}`, {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            photo: userData.photo.uri,
            address: userData.address,
            age: userData.age,
            whatsappNumber: userData.whatsappNumber,
        })
            .then(response => {
                console.log('User Data Updated : ', response.data);
                setEditing(false);
            })
            .catch(error => {
                console.error("Error Updating User Data.", error);
            });
    };

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkModeContainer]}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={styles.userSection}>
                    <View style={styles.row}>
                        <Image source={userData.photo} style={styles.userImage} />
                        {editing && (
                            <TouchableOpacity onPress={handlePhotoChange} style={styles.photoOverlay}>
                                <Ionicons name="camera" size={32} color="#FFFFFF" />
                            </TouchableOpacity>
                        )}
                    </View>
                    {editing ? (
                        <>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>First : </Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.firstName}
                                    onChangeText={(text) => handleInputChange("firstName", text)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>Last :</Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.lastName}
                                    onChangeText={(text) => handleInputChange("lastName", text)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>E-Mail :</Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.email}
                                    onChangeText={(text) => handleInputChange("email", text)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>Phone :</Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.phone || ""}
                                    onChangeText={(text) => handleInputChange("phone", text)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>Address :</Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.address || ""}
                                    onChangeText={(text) => handleInputChange("address", text)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>Age :</Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.age !== null ? userData.age.toString() : ""}
                                    onChangeText={(text) => handleInputChange("age", text)}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>WhatsApp :</Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.whatsappNumber || ""}
                                    onChangeText={(text) => handleInputChange("whatsappNumber", text)}
                                />
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={[styles.userName, isDarkMode && styles.darkText]}>
                                Name : {userData.firstName || "N/A"} {userData.lastName || "N/A"}
                            </Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>
                                E-Mail : {userData.email}
                            </Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>
                                Phone : {userData.phone || "N/A"}
                            </Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>
                                Address : {userData.address || "N/A"}
                            </Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>
                                Age : {userData.age !== null ? userData.age : "N/A"}
                            </Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>
                                WhatsApp : {userData.whatsappNumber || "N/A"}
                            </Text>
                        </>
                    )}
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => editing ? handleSaveChanges() : setEditing((prev) => !prev)}
                    >
                        <Text style={styles.editButtonText}>{editing ? "Save" : "Edit"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing * 2,
        marginTop: 0,
        marginBottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    darkModeContainer: {
        backgroundColor: Colors.background,
    },
    scrollViewContent: {
        paddingBottom: Spacing * 4,
    },
    userSection: {
        alignItems: "flex-start",
        marginBottom: Spacing * 4,
        width: "100%",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing,
        width: "100%",
    },
    userImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: Spacing * 3,
        justifyContent: "center",
        alignSelf: "center",
    },
    photoOverlay: {
        position: "absolute",
        top: 35,
        left: 35,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 50,
        padding: 8,
    },
    userName: {
        fontFamily: Font["poppins-bold"],
        fontSize: Spacing * 2,
        color: Colors.text,
        alignSelf: "center",
    },
    userInfo: {
        fontFamily: Font["poppins-regular"],
        fontSize: Spacing * 1.6,
        color: Colors.gray,
        marginBottom: Spacing * 2,
    },
    fieldLabel: {
        fontFamily: Font["poppins-semiBold"],
        fontSize: Spacing * 1.6,
        color: Colors.text,
        width: "30%",
    },
    input: {
        fontFamily: Font["poppins-regular"],
        fontSize: Spacing * 1.6,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        width: "70%",
        marginBottom: Spacing,
        padding: 8,
    },
    darkInput: {
        borderBottomColor: Colors.text,
    },
    editButton: {
        marginTop: Spacing * 2,
        backgroundColor: Colors.primary,
        paddingVertical: Spacing * 1.2,
        paddingHorizontal: Spacing * 3,
        borderRadius: Spacing * 1.5,
        alignSelf: "center",
    },
    editButtonText: {
        fontFamily: Font["poppins-bold"],
        color: Colors.onPrimary,
        fontSize: Spacing * 1.8,
    },
    darkText: {
        color: Colors.darkText,
    },
});

export default ProfileScreen;