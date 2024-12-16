import React from 'react';
import { View, Text, Image, Modal, Pressable, StyleSheet, Linking } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function ModalDetails({ visible, item, onClose, onDelete }) {
  
  //functie om googlemaps te openen
  const openLocationInMaps = () => {
    if (item?.location) {
      const { latitude, longitude } = item.location;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

//functie om mailapp te openen
const sendViaEmail = () => {
    if (item) {
      const { name, description, category, location, image } = item;

      const subject = encodeURIComponent(`${description}`);
      const body = encodeURIComponent(`
        Naam: ${name}
        Beschrijving: ${description}
        Categorie: ${category}
        Locatie: Latitude: ${location?.latitude || 'N/A'}, Longitude: ${location?.longitude || 'N/A'}
      `);

      const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
      Linking.openURL(mailtoUrl).catch((err) => {
        console.error('Error mailapp openen:', err);
        alert('Niet mogelijk om mailapp te openen.');
      });
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image source={{ uri: item.image }} style={styles.modalImage} />
          <Text style={styles.modalTitle}>Naam</Text>
          <Text style={styles.modalText}>{item.name}</Text>
          <Text style={styles.modalTitle}>Beschrijving</Text>
          <Text style={styles.modalText}>{item.description}</Text>
          <Text style={styles.modalTitle}>Categorie</Text>
          <Text style={styles.modalText}>{item.category}</Text>
          {item.location && (
            <>
              <Text style={styles.modalTitle}>Locatie</Text>
              <Text style={styles.modalText}>
                Latitude: {item.location.latitude}, Longitude: {item.location.longitude}
              </Text>
              <Pressable style={styles.openInMapButton} onPress={openLocationInMaps}>
                <Text style={styles.openInMapButtonText}>Open in Google Maps</Text>
              </Pressable>
            </>
          )}
          <Pressable style={styles.emailButton} onPress={sendViaEmail}>
            <Text style={styles.emailButtonText}>Stuur via email</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>Verwijder</Text>
          </Pressable>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Sluiten</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  openInMapButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  openInMapButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emailButton: {
    marginTop: 10,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
