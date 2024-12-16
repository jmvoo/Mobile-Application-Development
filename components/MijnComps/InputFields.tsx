import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputFields = ({ name, setName, description, setDescription }) => {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Uw naam"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Beschrijving"
        value={description}
        onChangeText={setDescription}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default InputFields;
