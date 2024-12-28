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

interface ProfileScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
}

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photo: any;
    address: string;
    age: number;
    whatsappNumber: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({
        firstName: "Nishant",
        lastName: "Makwana",
        email: "nishantmakwana@gmail.com",
        phone: "+91 1234567890",
        photo: require("../assets/images/user/avatar.png"),
        address: "1234 Main St, City, Country",
        age: 20,
        whatsappNumber: "+91 1234567890",
    });

    useEffect(() => {
        if (!loggedIn) {
            navigation.navigate("Login");
        }
    }, [loggedIn, navigation]);

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
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>First :</Text>
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
                                    value={userData.phone}
                                    onChangeText={(text) => handleInputChange("phone", text)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>Address :</Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.address}
                                    onChangeText={(text) => handleInputChange("address", text)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>Age :</Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.age.toString()}
                                    onChangeText={(text) => handleInputChange("age", text)}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.fieldLabel, isDarkMode && styles.darkText]}>WhatsApp :</Text>
                                <TextInput
                                    style={[styles.input, isDarkMode && styles.darkInput]}
                                    value={userData.whatsappNumber}
                                    onChangeText={(text) => handleInputChange("whatsappNumber", text)}
                                />
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={[styles.userName, isDarkMode && styles.darkText]}>{userData.firstName} {userData.lastName}</Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>E-Mail : {userData.email}</Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>Phone : {userData.phone}</Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>Adress : {userData.address}</Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>Age : {userData.age}</Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>Whatsapp : {userData.whatsappNumber}</Text>
                        </>
                    )}
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => setEditing((prev) => !prev)}
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