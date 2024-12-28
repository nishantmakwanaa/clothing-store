import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Switch,
    View,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from "./components/AlertBox";

interface SettingsScreenProps {
    navigation: {
        goBack: () => void;
        navigate: (screen: string) => void;
    };
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation, setIsLoggedIn }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 2000);
        setIsDarkMode(false);
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView
            style={[styles.container, isDarkMode && styles.darkModeContainer]}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.settingsSection}>
                    <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Settings</Text>
                    <View style={styles.settingsItem}>
                        <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>Dark Mode</Text>
                        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
                    </View>
                    <TouchableOpacity 
                        style={styles.settingsItem} 
                        onPress={() => navigation.navigate('Help & Support')}
                    >
                        <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>Help & Support</Text>
                        <Ionicons name="chevron-forward" size={Spacing * 2.5} color={isDarkMode ? Colors.background : Colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.settingsItem} 
                        onPress={() => navigation.navigate('Rating & Review')}
                    >
                        <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>Rating & Review</Text>
                        <Ionicons name="chevron-forward" size={Spacing * 2.5} color={isDarkMode ? Colors.background : Colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.settingsItem} 
                        onPress={() => Linking.openURL('https://nishantworldwide.in')}
                    >
                        <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>About</Text>
                        <Ionicons name="chevron-forward" size={Spacing * 2.5} color={isDarkMode ? Colors.background : Colors.text} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
                <View style={styles.versionSection}>
                    <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>App Version : 1.0</Text>
                </View>
            </ScrollView>
            <CustomAlert 
                visible={alertVisible} 
                message="Dark Mode Is Coming Soon !" 
                onClose={() => setAlertVisible(false)} 
            />
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
        color: Colors.text,
    },
    settingsSection: {
        marginTop: Spacing * 1,
    },
    sectionTitle: {
        fontFamily: Font["poppins-semiBold"],
        fontSize: Spacing * 2,
        color: Colors.text,
        marginBottom: Spacing,
    },
    settingsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: Spacing * 1.5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
    },
    settingsText: {
        fontFamily: Font["poppins-regular"],
        fontSize: Spacing * 1.6,
        color: Colors.text,
    },
    logoutButton: {
        backgroundColor: "#FF0000",
        paddingVertical: Spacing * 1.5,
        paddingHorizontal: Spacing * 2,
        borderRadius: Spacing,
        marginTop: Spacing * 3,
        alignItems: "center",
    },
    logoutText: {
        color: "#FFF",
        fontSize: Spacing * 1.8,
        textAlign: "center",
    },    
    versionSection: {
        marginTop: Spacing * 3,
        alignItems: "center",
    },
});

export default SettingsScreen;