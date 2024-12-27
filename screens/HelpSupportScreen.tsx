import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";

type HelpSupportScreenProps = NativeStackScreenProps<any, "HelpSupport">;

const HelpSupportScreen = ({ navigation }: HelpSupportScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <TouchableOpacity style={styles.supportOption}>
        <Text style={styles.supportOptionText}>FAQ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportOption}>
        <Text style={styles.supportOptionText}>Contact Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportOption}>
        <Text style={styles.supportOptionText}>Live Chat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing * 2,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  supportOption: {
    padding: Spacing * 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing * 2,
    marginTop: Spacing * 3,
  },
  supportOptionText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
});

export default HelpSupportScreen;
