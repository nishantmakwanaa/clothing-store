import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Colors from "../assets/constants/Colors";
import Spacing from "../assets/constants/Spacing";
import Font from "../assets/constants/Font";

type HelpSupportScreenProps = NativeStackScreenProps<any, "HelpSupport">;

const HelpSupportScreen = ({ navigation }: HelpSupportScreenProps) => {
  const openWebsite = () => {
    Linking.openURL("https://www.nishantworldwide.in");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            1. How Can I Reset My Password ?
          </Text>
          <Text style={styles.supportOptionText}>Answer : Go To Profile Section & Password.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            2. How Do I Update My Profile ?
          </Text>
          <Text style={styles.supportOptionText}>Answer : Go To Profile Section & Edit.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            3. How Do I Contact Customer Support ?
          </Text>
          <Text style={styles.supportOptionText}>Answer : See Below For Contact Details.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            4. How Do I Change My Email Address ?
          </Text>
          <Text style={styles.supportOptionText}>Answer : Go To Profile Section & Then Email.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            5. How Do I Delete My Account ?
          </Text>
          <Text style={styles.supportOptionText}>Answer : Contact Support For Assistance.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            6. Where Can I Find The User Manual ?
          </Text>
          <Text style={styles.supportOptionText}>Answer : Available In The Help Section.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            7. How Do I Enable Push Notifications ?
          </Text>
          <Text style={styles.supportOptionText}>Answer : Go To Notifications.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            8. How Do I Cancel My Subscription?
          </Text>
          <Text style={styles.supportOptionText}>Answer : Go To Subscription's & Then Cancel.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            9. What Should I Do If I Forget My Username ?
          </Text>
          <Text style={styles.supportOptionText}>Answer : Use The Forgot Username Option.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>
            10. How Do I Report A Bug ?
          </Text>
          <Text style={styles.supportOptionText}>Answer : Contact Support With The Details.</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Contact Support</Text>
        <TouchableOpacity style={styles.supportOption} onPress={() => Linking.openURL("mailto:support@yourcompany.com")}>
          <Text style={styles.supportOptionText}>E-Mail : 221290116042n@gmiu.edu.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption} onPress={() => Linking.openURL("tel:+1234567890")}>
          <Text style={styles.supportOptionText}>Phone : +91 6355976454</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportOption}>
          <Text style={styles.supportOptionText}>Live Chat</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Visit Our Website</Text>
        <TouchableOpacity style={styles.supportOption} onPress={openWebsite}>
          <Text style={styles.supportOptionText}>www.nishantworldwide.in</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Contact Me</Text>
        <TouchableOpacity style={styles.supportOption} onPress={() => Linking.openURL("mailto:yourname@yourcompany.com")}>
          <Text style={styles.supportOptionText}>E- Mail : nishantmakwanacreations.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportOption} onPress={() => Linking.openURL("tel:+1234567891")}>
          <Text style={styles.supportOptionText}>Phone : +91 6355976454</Text>
        </TouchableOpacity>
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
  scrollViewContent: {
    paddingBottom: Spacing * 3,
  },
  sectionTitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2.5,
    color: Colors.text,
    marginTop: Spacing * 4,
  },
  supportOption: {
    padding: Spacing * 2,
    backgroundColor: Colors.background,
    borderRadius: Spacing * 2,
    marginTop: Spacing * 2,
  },
  supportOptionText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
});

export default HelpSupportScreen;