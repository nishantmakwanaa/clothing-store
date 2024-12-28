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
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";

interface ProfileScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
}

interface UserData {
    name: string;
    email: string;
    phone: string;
    image: any;
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

    const handleInputChange = (field: keyof UserData, value: string) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkModeContainer]}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={styles.userSection}>
                    <Image source={userData.image} style={styles.userImage} />
                    {editing ? (
                        <>
                            <TextInput
                                style={[styles.input, isDarkMode && styles.darkInput]}
                                value={userData.name}
                                onChangeText={(text) => handleInputChange("name", text)}
                                placeholder="Name"
                                placeholderTextColor={isDarkMode ? Colors.gray : Colors.gray}
                            />
                            <TextInput
                                style={[styles.input, isDarkMode && styles.darkInput]}
                                value={userData.email}
                                onChangeText={(text) => handleInputChange("email", text)}
                                placeholder="Email"
                                placeholderTextColor={isDarkMode ? Colors.gray : Colors.gray}
                            />
                            <TextInput
                                style={[styles.input, isDarkMode && styles.darkInput]}
                                value={userData.phone}
                                onChangeText={(text) => handleInputChange("phone", text)}
                                placeholder="Phone"
                                placeholderTextColor={isDarkMode ? Colors.gray : Colors.gray}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={[styles.userName, isDarkMode && styles.darkText]}>
                                {userData.name}
                            </Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>
                                {userData.email}
                            </Text>
                            <Text style={[styles.userInfo, isDarkMode && styles.darkText]}>
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

                <View style={styles.ordersSection}>
                    <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>My Products</Text>
                    <TouchableOpacity
                        style={styles.orderItem}
                        onPress={() => navigation.navigate("My Products")}
                    >
                        <Text style={[styles.orderText, isDarkMode && styles.darkText]}>Sell Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.orderItem}
                        onPress={() => navigation.navigate("Shipping Adress")}
                    >
                        <Text style={[styles.orderText, isDarkMode && styles.darkText]}>Shipping Address</Text>
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
    },
    darkModeContainer: {
        backgroundColor: Colors.background,
    },
    scrollViewContent: {
        paddingBottom: Spacing * 4,
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
        width: "100%",
        marginBottom: Spacing,
        color: Colors.text,
    },
    darkInput: {
        borderBottomColor: Colors.gray,
        color: Colors.text,
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
    ordersSection: {
        marginTop: Spacing * 4,
    },
    sectionTitle: {
        fontFamily: Font["poppins-bold"],
        fontSize: Spacing * 2,
        color: Colors.text,
        marginBottom: Spacing * 2,
    },
    orderItem: {
        paddingVertical: Spacing * 1.2,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
    },
    orderText: {
        fontFamily: Font["poppins-regular"],
        fontSize: Spacing * 1.6,
        color: Colors.text,
    },
    darkText: {
        color: Colors.text,
    },
});

export default ProfileScreen;