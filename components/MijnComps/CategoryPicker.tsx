import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

//functie om de categorie te kiezen
const CategoryPicker = ({ category, setCategory }) => {
  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Kies een categorie" value="" />
        <Picker.Item label="GrondKabels" value="GrondKabels" />
        <Picker.Item label="Hoogspanningmasten" value="Hoogspanningmasten" />
        <Picker.Item label="Luchtkabels" value="Luchtkabels" />
        <Picker.Item label="Schakelkasten" value="Schakelkasten" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 50,
  },
});

export default CategoryPicker;
