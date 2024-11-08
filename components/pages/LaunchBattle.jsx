import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from '../organisme';
import axios from 'axios';

const LaunchBattle = ({ navigation, route }) => {
  const [rappers, setRappers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRappers = async () => {
      try {
        const response = await axios.get('https://286c-176-175-209-131.ngrok-free.app/api/rappers');
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
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {rappers.map((rapper, index) => (
          <Card.CardRappeur key={index} rapper={rapper} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    maxHeight: 550,
  },
  scrollViewContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "ruby",
    textAlign: "center",
  },
  cardContainer: {
    marginBottom: 10,
  },
});

export default LaunchBattle;
