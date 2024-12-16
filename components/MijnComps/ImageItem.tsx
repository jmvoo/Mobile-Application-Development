import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function ImageItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.imagePlaceholder} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imagePlaceholder: {
    width: 100,
    height: 150,
    backgroundColor: '#ccc',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
});
