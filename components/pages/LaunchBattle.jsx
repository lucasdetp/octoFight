import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from '../organisme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '../atoms';  
import { useTheme } from '../../providers/ThemeProvider';

const LaunchBattle = ({ navigation, route }) => {
  const [rappers, setRappers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const scrollViewRef = useRef(null);
  const { isNight } = useTheme();

  useEffect(() => {
    const fetchRappers = async () => {
      try {
        const response = await axios.get('https://286c-176-175-209-131.ngrok-free.app/api/rappers');
        setRappers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rappeurs:', error);
        setMessage('Erreur lors de la récupération des rappeurs.');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    fetchRappers();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      return null;
    }
  };

  const handleBuyRapper = async (rapperId) => {
    try {
      const token = await getToken();
  
      if (!token) {
        setMessage('Vous devez être connecté pour acheter un rappeur.');
        setMessageType('error');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(
        'http://localhost:8000/api/buy-rapper',
        { rapper_id: String(rapperId) },
        config
      );
  
      if (response.status === 200) {
        setMessage('Vous avez acheté ce rappeur !');
        setMessageType('success');
        setRappers((prevRappers) =>
          prevRappers.filter((rapper) => rapper.id !== rapperId)
        );
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error); 
      } else {
        setMessage("Une erreur est survenue lors de l'achat du rappeur."); 
      }
      setMessageType('error');
    }
  };
  

  useEffect(() => {
    if (message) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [message]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]}>
        <ActivityIndicator size="large" color={isNight ? '#ffffff' : '#0000ff'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]}>
      <StatusBar style="auto" />
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
        <Text.MessageAlert message={message} type={messageType} /> 
        {rappers.map((rapper, index) => (
          index % 2 === 0 && (
            <View style={styles.row} key={index}>
              <Card.CardRappeur
                rapper={rapper}
                onBuy={handleBuyRapper} 
                backgroundColor={isNight ? '#333' : '#fff'}
                textColor={isNight ? '#fff' : '#000'}
              />
              {rappers[index + 1] && (
                <Card.CardRappeur
                  rapper={rappers[index + 1]}
                  onBuy={handleBuyRapper}
                  backgroundColor={isNight ? '#333' : '#fff'}
                  textColor={isNight ? '#fff' : '#000'}
                />
              )}
            </View>
          )
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LaunchBattle;
