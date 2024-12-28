import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AirbnbRating } from "react-native-ratings";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import CustomAlert from "./components/AlertBox";

type RatingReviewScreenProps = NativeStackScreenProps<any, "RatingReview">;

const RatingReviewScreen = ({ navigation }: RatingReviewScreenProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const reviews = [
    { id: "1", username: "John", rating: 4, text: "Great App, Really Helpful !" },
    { id: "2", username: "Sarah", rating: 5, text: "I love this app! Very intuitive and easy to use." },
    { id: "3", username: "Michael", rating: 3, text: "The App Is Good, But It Can Improve A Little More." },
    { id: "4", username: "Emily", rating: 5, text: "Amazing Experience ! Works Perfectly." },
  ];

  const handleSubmitReview = () => {
    console.log("Rating :", rating);
    console.log("Review :", review);
    setAlertVisible(true);
    setReview("");
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  const renderReview = ({ item }: { item: { username: string; rating: number; text: string } }) => (
    <SafeAreaView style={styles.reviewContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <AirbnbRating
        count={5}
        defaultRating={item.rating}
        isDisabled
        size={20}
        showRating={false}
      />
      <Text style={styles.reviewText}>{item.text}</Text>
    </SafeAreaView>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
            defaultRating={rating}
            onFinishRating={setRating}
            size={25}
          />
          <TextInput
            style={styles.input}
            placeholder="Write A Review"
            value={review}
            onChangeText={setReview}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Reviews</Text>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={renderReview}
            contentContainerStyle={styles.reviewsList}
          />
        </View>
      </ScrollView>
      <CustomAlert 
        visible={alertVisible} 
        message="Review Submitted !" 
        onClose={() => setAlertVisible(false)} 
      />
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing * 2,
  },
  scrollView: {
    flexGrow: 1,
  },
  ratingContainer: {
    height: "20%",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: Spacing * 1.5,
    marginTop: Spacing * 3,
    borderRadius: Spacing * 2,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    height: Spacing * 12,
    textAlignVertical: "top",
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
  reviewsContainer: {
    flex: 1,
    paddingTop: Spacing * 6,
    paddingBottom: Spacing * 1,
  },
  reviewsTitle: {
    fontFamily: Font["poppins-bold"],
    fontSize: Spacing * 2.5,
    color: Colors.text,
    paddingTop: Spacing * 2,
  },
  reviewContainer: {
    padding: Spacing * 2,
    backgroundColor: Colors.background,
    borderRadius: Spacing * 2,
    marginBottom: Spacing * 4,
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