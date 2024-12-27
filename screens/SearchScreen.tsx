import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

const SearchScreen: React.FC<Props> = ({ navigation: { navigate, goBack } }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>(["Shirts", "Dresses", "Jackets"]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== "" && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={Spacing * 3} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={Spacing * 2} color={Colors.text} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search For Clothes..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.recentSearchesSection}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentSearchItem}
              onPress={() => handleSearch(search)}
            >
              <Ionicons name="time-outline" size={Spacing * 2} color={Colors.text} />
              <Text style={styles.recentSearchText}>{search}</Text>
            </TouchableOpacity>
          ))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing * 2,
  },
  backButton: {
    marginRight: Spacing,
  },
  headerTitle: {
    fontFamily: Font["poppins-bold"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  searchSection: {
    marginBottom: Spacing * 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing * 2,
    paddingHorizontal: Spacing * 2,
    paddingVertical: Spacing / 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.4,
    color: Colors.text,
    marginLeft: Spacing,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: Spacing * 2,
  },
  recentSearchesSection: {
    marginTop: Spacing * 2,
  },
  sectionTitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    marginBottom: Spacing,
    color: Colors.text,
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  recentSearchText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.text,
    marginLeft: Spacing,
  },
});

export default SearchScreen;