import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useSocket } from '../../providers/SocketContext';

const BattlePage = ({ route }) => {
  const { battleId, userId } = route.params || {};
  const { socket } = useSocket();
  const [rappers, setRappers] = useState([]);
  const [selectedRapper, setSelectedRapper] = useState(null);
  const [opponentRapper, setOpponentRapper] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRappers = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`http://10.26.132.231:8000/api/user/${userId}/rappers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRappers(response.data.rappers);
    };

    fetchRappers();

    if (socket) {
      socket.on('rapperChosen', (data) => {
        if (data.userId !== userId) {
          setOpponentRapper(data.rapperId);
        }
      });

      return () => socket.off('rapperChosen');
    } else {
      console.error('Socket is not defined');
    }
  }, []);

  const handleSelectRapper = async (rapperId) => {
    console.log('userIdhere :', userId);
    
    try {
        await axios.post(
            `http://10.26.132.231:8000/api/battle/${battleId}/choose-rapper`,
            { rapper_id: rapperId },
            { headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` } }
        );
        // socket.emit('rapperChosen', { battleId, userId, rapperId });

        Alert.alert('Succès', 'Rappeur choisi avec succès !');
        navigation.navigate('Home');
    } catch (error) {
        console.error('Erreur lors de la sélection du rappeur:', error);
        Alert.alert('Erreur', 'Impossible de sélectionner ce rappeur.');
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez votre rappeur</Text>
      <Picker 
        selectedValue={selectedRapper} 
        onValueChange={(value) => {
          setSelectedRapper(value);
          handleSelectRapper(value);
        }}
      >
        {rappers.map((rapper) => (
          <Picker.Item key={rapper.id} label={rapper.name} value={rapper.id} />
        ))}
      </Picker>
      {opponentRapper && (
        <Text style={styles.info}>Rappeur choisi par l'adversaire : {opponentRapper}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default BattlePage;