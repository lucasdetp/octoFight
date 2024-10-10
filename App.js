import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Card, Profil } from './components/molecules';

export default function App() {
  const rapper = {
    name: 'Booba',
    image: 'https://i.scdn.co/image/ab6761610000e5ebe66ef18636bf25588abdd2ae',
    attack: 90,
    defense: 85,
    rarity: 'Légendaire',
  };
  const rapper2 = {
    name: 'GIMS',
    image: 'https://i.scdn.co/image/ab6761610000e5ebe66ef18636bf25588abdd2ae',
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
      <Profil.ProfileHeader user={{ name: "jul", email: "test@test.fr", photo: "https://i.scdn.co/image/ab6761610000e5ebe66ef18636bf25588abdd2ae" }} />
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
