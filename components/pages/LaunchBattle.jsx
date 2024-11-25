import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from '../organisme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../providers/ThemeProvider';

const LaunchBattle = ({ navigation, route }) => {
  const [rappers, setRappers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const { isNight } = useTheme();

  useEffect(() => {
    const fetchRappers = async () => {
      try {
        const response = await axios.get('http://10.26.130.75:8000/api/rappers');
        setRappers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rappeurs:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserCredits = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          console.log('Token is missing, redirecting to Login');
          navigation.navigate('Login');
          return;
        }

        const response = await axios.get('http://10.26.130.75:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCredits(response.data.credit);
        } else {
          throw new Error('Invalid token or user not found');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des crédits:', error);
      }
    };

    fetchRappers();
    fetchUserCredits();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]}>
        <ActivityIndicator size="large" color={isNight ? '#fff' : '#000'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]}>
      <StatusBar style={isNight ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.creditContainer}>
          <Text style={[styles.creditText, { color: isNight ? '#fff' : '#000' }]}>
            Crédits disponibles : {credits}
          </Text>
        </View>
        {rappers.map((rapper, index) => (
          index % 2 === 0 && (
            <View style={styles.row} key={index}>
              <Card.CardRappeur rapper={rapper} />
              {rappers[index + 1] && <Card.CardRappeur rapper={rappers[index + 1]} />}
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
  creditContainer: {
    padding: 15,
    alignItems: 'center',
  },
  creditText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LaunchBattle;
