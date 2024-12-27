import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";

type RatingReviewScreenProps = NativeStackScreenProps<any, "RatingReview">;

const RatingReviewScreen = ({ navigation }: RatingReviewScreenProps) => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const reviews = [
    { id: "1", username: "John", rating: 4, text: "Good product!" },
    { id: "2", username: "Jane", rating: 5, text: "Amazing quality!" },
  ];

  const handleSubmitReview = () => {
    console.log("Rating:", rating);
    console.log("Review:", review);
  };

  const renderReview = ({ item }: { item: { username: string; rating: number; text: string } }) => (
    <SafeAreaView style={styles.reviewContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.reviewText}>{item.text}</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rating & Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter rating (1-5)"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
      <TextInput
        style={styles.input}
        placeholder="Write a review"
        value={review}
        onChangeText={setReview}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        contentContainerStyle={styles.reviewsList}
      />
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
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: Spacing * 1.5,
    marginTop: Spacing * 3,
    borderRadius: Spacing * 2,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    marginTop: Spacing * 4,
    alignItems: "center",
  },
  submitButtonText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.8,
    color: Colors.onPrimary,
  },
  reviewContainer: {
    marginTop: Spacing * 2,
    padding: Spacing * 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing * 2,
  },
  username: {
    fontFamily: Font["poppins-bold"],
    fontSize: Spacing * 2.2,
    color: Colors.text,
  },
  reviewText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  reviewsList: {
    marginTop: Spacing * 4,
  },
});

export default RatingReviewScreen;