import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
import ImageItem from '../../components/MijnComps/ImageItem';
import ModalDetails from '../../components/MijnComps/ModalDetails';

export default function GalleryScreen() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  //zorgt ever voor dat de data wordt opgehaald wanneer de scherm wordt geopend
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const fileUri = FileSystem.documentDirectory + 'data.json';
        try {
          const fileExists = await FileSystem.getInfoAsync(fileUri);

          if (fileExists.exists) {
            const fileData = await FileSystem.readAsStringAsync(fileUri);
            setData(JSON.parse(fileData));
          } else {
            alert('Geen data gevonden!');
          }
        } catch (error) {
          console.error('Error data lezen:', error);
        }
      };

      fetchData();
    }, [])
  );
//functie om de modal te openen
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
//functie om de modal te sluiten
  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <ImageItem key={index} item={item} onPress={() => openModal(item)} />
          ))
        ) : (
          <Text style={styles.noDataText}>Geen foto's</Text>
        )}
      </ScrollView>
      {isModalVisible && selectedItem && (
        <ModalDetails
          visible={isModalVisible}
          item={selectedItem}
          onClose={closeModal}
          onDelete={async () => {
            const newData = data.filter(dataItem => dataItem.image !== selectedItem.image);
            setData(newData);

            const fileUri = FileSystem.documentDirectory + 'data.json';
            try {
              await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newData));
              alert('Foto verwijderd!');
              closeModal();
            } catch (error) {
              console.error('Error foto verwijderen:', error);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#505050',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  noDataText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});
