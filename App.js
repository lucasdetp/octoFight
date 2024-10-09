import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Card from './components/molecules/Cards';
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <ScrollView>
        <Card rapper={rapper} />
        <Card rapper={rapper2} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
