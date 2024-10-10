import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Card, Profil } from './components/molecules';

export default function App() {
  const rapper = {
    name: 'Booba',
    image: 'https://url-de-l-image-du-rappeur.com/booba.jpg',
    attack: 90,
    defense: 85,
    rarity: 'Légendaire',
  };
  const rapper2 = {
    name: 'GIMS',
    image: 'https://url-de-l-image-du-rappeur.com/booba.jpg',
    attack: 80,
    defense: 75,
    rarity: 'Commun',
  };

  return (

    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardContainer}>
          <Card rapper={rapper} />
          <Card rapper={rapper2} />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f00',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cardContainer: {
    width: '90%',
    alignItems: 'center',
  },
});
