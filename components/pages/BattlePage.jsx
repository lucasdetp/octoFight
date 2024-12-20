import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useSocket } from '../../providers/SocketContext';
import * as pJson from '../../package.json';
import { Container, Text} from '../atoms';

const BattlePage = ({ route }) => {
  const { battleId, userId } = route.params || {};

  if (!battleId || !userId) {
    console.error('Missing battleId or userId');
  }


  const { socket } = useSocket();
  const [rappers, setRappers] = useState([]);
  const [selectedRapper, setSelectedRapper] = useState(null);
  const [opponentRapper, setOpponentRapper] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRappers = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${pJson.proxy}/api/user/${userId}/rappers`, {
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


  useEffect(() => {
    if (socket && battleId) {
      socket.on(`battle.${battleId}`, (data) => {

        if (data.message.includes('Sélectionnez vos rappeurs')) {
          if (data.battle.user1_id === userId && !data.battle.user1_rapper_id) {
            navigation.navigate('ChooseRapperPage', { battleId, userId });
          }

          if (data.battle.user2_id === userId && !data.battle.user2_rapper_id) {
            navigation.navigate('ChooseRapperPage', { battleId, userId });
          }
        }
      });

      return () => {
        socket.off(`battle.${battleId}`);
      };
    }
  }, [socket, battleId]);

  const handleSelectRapper = async (rapperId) => {
    try {
      await axios.post(
        `${pJson.proxy}/api/battle/${battleId}/choose-rapper`,
        { rapper_id: rapperId },
        { headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` } }
      );

      socket.emit('rapperChosen', { battleId, userId, rapperId });

      Alert.alert('Succès', 'Rappeur choisi avec succès !');
      if (navigation && navigation.navigate) {
        navigation.navigate('Home');
      } else {
        console.error('Navigation is not initialized yet.');
      }
      
    } catch (error) {
      console.error('Erreur lors de la sélection du rappeur:', error);
      Alert.alert('Erreur', 'Impossible de sélectionner ce rappeur.');
    }
  };

  return (
    <Container.BasicView style={styles.container}>
      <Text.Name style={styles.title}>Sélectionnez votre rappeur</Text.Name>
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
        <Text.Name style={styles.info}>Rappeur choisi par l'adversaire : {opponentRapper}</Text.Name>
      )}
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 60,
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
