import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Fonts";
import * as ImagePicker from "expo-image-picker";

const AddProduct: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = () => {
    if (!name || !color || !description || !size || !price) {
      Alert.alert("Error", "All fields Are Required !");
      return;
    }

    Alert.alert("Success", "Product Added Successfully !");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <View>
              <Ionicons name="checkmark-circle" size={Spacing * 6} color={Colors.primary} />
              <Text style={styles.imageText}>Image Selected</Text>
            </View>
          ) : (
            <Ionicons name="camera" size={Spacing * 6} color={Colors.gray} />
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Product Name"
          placeholderTextColor={Colors.gray}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Product Color"
          placeholderTextColor={Colors.gray}
          value={color}
          onChangeText={setColor}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Product Description"
          placeholderTextColor={Colors.gray}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Product Size"
          placeholderTextColor={Colors.gray}
          value={size}
          onChangeText={setSize}
        />

        <TextInput
          style={styles.input}
          placeholder="Price (₹)"
          placeholderTextColor={Colors.gray}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Ionicons name="add-circle-outline" size={Spacing * 2.5} color={Colors.onPrimary} />
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing * 2,
  },
  scrollContent: {
    paddingHorizontal: Spacing * 2,
    paddingBottom: Spacing * 4,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.borderWithOpacity,
    height: 150,
    borderRadius: Spacing * 2,
    marginVertical: Spacing * 2,
  },
  imageText: {
    fontFamily: Font["poppins-regular"],
    color: Colors.text,
    marginTop: Spacing,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing * 2,
    paddingHorizontal: Spacing * 2,
    paddingVertical: Spacing,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 1.6,
    color: Colors.text,
    marginVertical: Spacing,
  },
  textArea: {
    height: 100,
  },
  addButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing * 1.5,
    borderRadius: Spacing * 5,
    marginTop: Spacing * 2,
  },
  addButtonText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.onPrimary,
    fontSize: Spacing * 2,
    marginLeft: Spacing,
  },
});