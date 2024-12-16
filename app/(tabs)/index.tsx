import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import ImagePickerButtons from '../../components/MijnComps/ImagePickerButtons';
import LocationDisplay from '../../components/MijnComps/LocationDisplay';
import InputFields from '../../components/MijnComps/InputFields';
import CategoryPicker from '../../components/MijnComps/CategoryPicker';

export default function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  //functie om de foto op te slaan
  const handleSubmit = async () => {
    if (!name || !description || !category || !image || !location) {
      Alert.alert('Error', 'Vul alle velden in, voeg een afbeelding toe en voeg uw locatie toe!');
      return;
    }

    const data = { name, description, category, image, location };
    const fileUri = FileSystem.documentDirectory + 'data.json';

    try {
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      if (fileExists.exists) {
        const existingData = await FileSystem.readAsStringAsync(fileUri);
        const jsonData = JSON.parse(existingData);
        jsonData.push(data);
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(jsonData));
      } else {
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([data]));
      }

      Alert.alert('Success', 'Foto is opgeslagen!');
    } catch (error) {
      console.error('Error Foto opslaan:', error);
      Alert.alert('Error', 'Foto is niet opgeslagen.');
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerButtons setImage={setImage} />
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <LocationDisplay location={location} setLocation={setLocation} />
      <InputFields name={name} setName={setName} description={description} setDescription={setDescription} />
      <CategoryPicker category={category} setCategory={setCategory} />
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#505050',
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
});
