import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    TextInput,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";

interface UserData {
    name: string;
    email: string;
    phone: string;
    image: any;
}

interface ProfileScreenProps {
    navigation: {
        navigate: (screen: string) => void;
        goBack: () => void;
    };
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({
        name: "Nishant Makwana",
        email: "nishantmakwanacreations@gmail.com",
        phone: "+91 6355976454",
        image: require("../assets/images/user/avatar.png"),
    });

    useEffect(() => {
        if (!loggedIn) {
            navigation.navigate("Login");
        }
    }, [loggedIn, navigation]);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    const handleInputChange = (field: keyof UserData, value: string) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView
            style={[styles.container, isDarkMode && styles.darkModeContainer]}
        >
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.iconButton}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={Spacing * 3}
                            color={isDarkMode ? Colors.light : Colors.text}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[styles.headerTitle, isDarkMode && styles.darkText]}
                    >
                        Profile
                    </Text>
                </View>
                <View style={styles.userSection}>
                    <Image source={userData.image} style={styles.userImage} />
                    {editing ? (
                        <>
                            <TextInput
                                style={[styles.input, isDarkMode && styles.darkInput]}
                                value={userData.name}
                                onChangeText={(text) => handleInputChange("name", text)}
                                placeholder="Name"
                                placeholderTextColor={
                                    isDarkMode ? Colors.gray : Colors.lightGray
                                }
                            />
                            <TextInput
                                style={[styles.input, isDarkMode && styles.darkInput]}
                                value={userData.email}
                                onChangeText={(text) => handleInputChange("email", text)}
                                placeholder="Email"
                                placeholderTextColor={
                                    isDarkMode ? Colors.gray : Colors.lightGray
                                }
                            />
                            <TextInput
                                style={[styles.input, isDarkMode && styles.darkInput]}
                                value={userData.phone}
                                onChangeText={(text) => handleInputChange("phone", text)}
                                placeholder="Phone"
                                placeholderTextColor={
                                    isDarkMode ? Colors.gray : Colors.lightGray
                                }
                            />
                        </>
                    ) : (
                        <>
                            <Text
                                style={[styles.userName, isDarkMode && styles.darkText]}
                            >
                                {userData.name}
                            </Text>
                            <Text
                                style={[styles.userInfo, isDarkMode && styles.darkText]}
                            >
                                {userData.email}
                            </Text>
                            <Text
                                style={[styles.userInfo, isDarkMode && styles.darkText]}
                            >
                                {userData.phone}
                            </Text>
                        </>
                    )}
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => setEditing((prev) => !prev)}
                    >
                        <Text style={styles.editButtonText}>
                            {editing ? "Save" : "Edit"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingsSection}>
                    <Text
                        style={[styles.sectionTitle, isDarkMode && styles.darkText]}
                    >
                        Settings
                    </Text>
                    <View style={styles.settingsItem}>
                        <Text
                            style={[styles.settingsText, isDarkMode && styles.darkText]}
                        >
                            Dark Mode
                        </Text>
                        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
                    </View>
                    <TouchableOpacity style={styles.settingsItem}>
                        <Text
                            style={[styles.settingsText, isDarkMode && styles.darkText]}
                        >
                            General
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={Spacing * 2.5}
                            color={isDarkMode ? Colors.light : Colors.text}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem}>
                        <Text
                            style={[styles.settingsText, isDarkMode && styles.darkText]}
                        >
                            Privacy
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={Spacing * 2.5}
                            color={isDarkMode ? Colors.light : Colors.text}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem}>
                        <Text
                            style={[styles.settingsText, isDarkMode && styles.darkText]}
                        >
                            About
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={Spacing * 2.5}
                            color={isDarkMode ? Colors.light : Colors.text}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing * 2,
        backgroundColor: Colors.lightBackground,
    },
    darkModeContainer: {
        backgroundColor: Colors.darkBackground,
    },
    scrollViewContent: {
        paddingBottom: Spacing * 4,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing * 3,
    },
    iconButton: {
        padding: Spacing / 2,
    },
    headerTitle: {
        fontFamily: Font["poppins-semiBold"],
        fontSize: Spacing * 2.5,
        color: Colors.text,
        marginLeft: Spacing,
    },
    darkText: {
        color: Colors.light,
    },
    userSection: {
        alignItems: "center",
        marginBottom: Spacing * 4,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: Spacing * 2,
    },
    userName: {
        fontFamily: Font["poppins-bold"],
        fontSize: Spacing * 2,
        color: Colors.text,
    },
    userInfo: {
        fontFamily: Font["poppins-regular"],
        fontSize: Spacing * 1.6,
        color: Colors.gray,
        marginBottom: Spacing,
    },
    input: {
        fontFamily: Font["poppins-regular"],
        fontSize: Spacing * 1.6,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        width: "80%",
        marginBottom: Spacing,
        color: Colors.text,
    },
    darkInput: {
        borderBottomColor: Colors.light,
        color: Colors.light,
    },

    editButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing,
        paddingHorizontal: Spacing * 2,
        borderRadius: Spacing,
    },
    editButtonText: {
        fontFamily: Font["poppins-semiBold"],
        color: Colors.onPrimary,
        fontSize: Spacing * 1.6,
    },
    settingsSection: {
        marginTop: Spacing * 4,
    },
    sectionTitle: {
        fontFamily: Font["poppins-semiBold"],
        fontSize: Spacing * 2,
        marginBottom: Spacing * 2,
        color: Colors.text,
    },
    settingsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: Spacing * 1.5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    settingsText: {
        fontFamily: Font["poppins-regular"],
        fontSize: Spacing * 1.8,
        color: Colors.text,
    },
});

export default ProfileScreen;