import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

//functie om de locatie op te slaan
const LocationDisplay = ({ location, setLocation }) => {
  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Locatietoestemming is vereist om uw huidige locatie te krijgen!');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleGetLocation}>
        <Text style={styles.buttonText}>huidige locatie ophalen</Text>
      </TouchableOpacity>
      {location && (
        <Text style={styles.locationText}>
          Locatie: Lat {location.latitude}, Lon {location.longitude}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 10,
  },
});

export default LocationDisplay;
