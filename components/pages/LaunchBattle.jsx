import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Card } from '../organisme';

const LaunchBattle = ({ navigation, route }) => {
  const rapper = {
    name: 'Booba',
    image: 'https://url-de-l-image-du-rappeur.com/booba.jpg',
    attack: 90,
    defense: 85,
    rarity: 'Légendaire',
  };
  const rapper2 = {
    name: 'GIMS',
    image: 'https://url-de-l-image-du-rappeur.com/gims.jpg',
    attack: 80,
    defense: 75,
    rarity: 'épique',
  };
  const rapper3 = {
    name: 'JUL',
    image: 'https://url-de-l-image-du-rappeur.com/gims.jpg',
    attack: 80,
    defense: 75,
    rarity: 'Rare',
  };
  const rapper4 = {
    name: 'PNL',
    image: 'https://url-de-l-image-du-rappeur.com/gims.jpg',
    attack: 80,
    defense: 75,
    rarity: 'Commun',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Card.CardRappeur rapper={rapper} />
        <Card.CardRappeur rapper={rapper2} />
        <Card.CardRappeur rapper={rapper3} />
        <Card.CardRappeur rapper={rapper4} />
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
    marginBottom: 10, // Pour espacer les cartes entre elles
  },
});

export default LaunchBattle;
