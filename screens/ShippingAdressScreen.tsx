import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, View } from "react-native";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomAlert from './components/AlertBox';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  'Shipping Address': undefined;
  'Profile': { savedAddresses: { id: number; address: string; city: string; state: string }[] };
};

type ShippingAddressScreenProps = NativeStackScreenProps<RootStackParamList, 'Shipping Address'>;

const ShippingAddressScreen = ({ navigation }: ShippingAddressScreenProps) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [savedAddresses, setSavedAddresses] = useState<{ id: number; address: string; city: string; state: string }[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSaveAddress = () => {
    if (!address || !city || !state) {
      Alert.alert('Error', 'Please Fill Out All The Required Fields.');
      return;
    }

    const newId = savedAddresses.length + 1;
    const newAddress = { id: newId, address, city, state };

    setSavedAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    setAddress('');
    setCity('');
    setState('');
    setAlertMessage('Address Added Successfully !');
    setAlertVisible(true);
    console.log('Address Saved:', newAddress);
  };

  const handleDeleteAddress = (id: number) => {
    setSavedAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== id));
    setAlertMessage('Address Deleted Successfully !');
    setAlertVisible(true);
  };

  const handleSelectAddress = (address: string) => {
    navigation.navigate('Profile', { savedAddresses });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.savedAddressesContainer}>
          {savedAddresses.length > 0 ? (
            savedAddresses.map(({ id, address, city, state }) => (
              <View key={id} style={styles.addressGroup}>
                <Text style={styles.savedAddressesTitle}>Address ID: {id}</Text>
                <Text style={styles.savedAddressText}>Address: {address}</Text>
                <Text style={styles.savedAddressText}>City: {city}</Text>
                <Text style={styles.savedAddressText}>State: {state}</Text>
                <TouchableOpacity
                  style={styles.savedAddressItem}
                  onPress={() => handleSelectAddress(address)}
                >
                  <Text style={styles.savedAddressText}>Select Address</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton} 
                  onPress={() => handleDeleteAddress(id)}
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noAddressText}>No Address Available</Text>
          )}
        </View>

        <Text style={styles.subtitle}>Add New Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your State"
          value={state}
          onChangeText={setState}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: Spacing * 3,
  },
  subtitle: {
    fontSize: Spacing * 2.2,
    fontFamily: Font["poppins-semiBold"],
    color: Colors.text,
    marginTop: Spacing * 4,
    marginBottom: Spacing * 2,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: Spacing * 1.5,
    marginTop: Spacing * 3,
    borderRadius: Spacing * 2,
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    paddingVertical: Spacing * 1.5,
    textAlignVertical: 'center',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
    marginTop: Spacing * 4,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 1.8,
    color: Colors.onPrimary,
  },
  savedAddressesContainer: {
    marginTop: Spacing * 4,
    backgroundColor: Colors.gray,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
  },
  addressGroup: {
    marginBottom: Spacing * 4,
    backgroundColor: Colors.gray,
    padding: Spacing * 2,
    borderRadius: Spacing * 2,
  },
  savedAddressesTitle: {
    fontSize: Spacing * 2.2,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
    marginBottom: Spacing * 1,
  },
  savedAddressText: {
    fontFamily: Font["poppins-regular"],
    fontSize: Spacing * 2,
    color: Colors.text,
  },
  savedAddressItem: {
    padding: Spacing * 1.5,
    backgroundColor: Colors.primary,
    borderRadius: Spacing * 2,
    marginTop: Spacing * 2,
    alignItems: 'center',
  },
  noAddressText: {
    fontSize: Spacing * 2,
    fontFamily: Font["poppins-regular"],
    color: Colors.text,
    textAlign: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    padding: Spacing * 1.5,
    backgroundColor: Colors.secondary,
    borderRadius: Spacing * 2,
    marginTop: Spacing * 2,
    alignItems: 'center',
  },
});

export default ShippingAddressScreen;