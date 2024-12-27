import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Switch,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";

interface SettingsScreenProps {
    navigation: {
        goBack: () => void;
    };
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    return (
        <SafeAreaView
            style={[styles.container, isDarkMode && styles.darkModeContainer]}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <Ionicons name="arrow-back" size={Spacing * 3} color={isDarkMode ? Colors.light : Colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>Settings</Text>
                </View>
                <View style={styles.settingsSection}>
                    <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Settings</Text>
                    <View style={styles.settingsItem}>
                        <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>Dark Mode</Text>
                        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
                    </View>
                    <TouchableOpacity style={styles.settingsItem}>
                        <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>General</Text>
                        <Ionicons name="chevron-forward" size={Spacing * 2.5} color={isDarkMode ? Colors.light : Colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem}>
                        <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>Privacy</Text>
                        <Ionicons name="chevron-forward" size={Spacing * 2.5} color={isDarkMode ? Colors.light : Colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem}>
                        <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>About</Text>
                        <Ionicons name="chevron-forward" size={Spacing * 2.5} color={isDarkMode ? Colors.light : Colors.text} />
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
    settingsSection: {
        marginTop: Spacing * 3,
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
        borderBottomColor: Colors.lightGray,
    },
    settingsText: {
        fontFamily: Font["poppins-regular"],
        fontSize: Spacing * 1.6,
        color: Colors.text,
    },
});

export default SettingsScreen;