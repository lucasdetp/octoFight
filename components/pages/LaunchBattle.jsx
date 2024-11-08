import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from '../organisme';
import axios from 'axios';
import { useTheme } from '../../providers/ThemeProvider';

const LaunchBattle = ({ navigation, route }) => {
  const [rappers, setRappers] = useState([]);
  const [loading, setLoading] = useState(true);
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

    fetchRappers();
  }, []);

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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {rappers.map((rapper, index) => (
          index % 2 === 0 && (
            <View style={styles.row} key={index}>
              <Card.CardRappeur
                rapper={rapper}
                backgroundColor={isNight ? '#333' : '#fff'}
                textColor={isNight ? '#fff' : '#000'}
              />
              {rappers[index + 1] && (
                <Card.CardRappeur
                  rapper={rappers[index + 1]}
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
