import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView } from 'react-native';
import { Card } from '../organisme';
import FooterNavBar from '../molecules/FooterNavbar';

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
    rarity: 'Commun',
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <ScrollView>
        <Card.CardRappeur rapper={rapper} />
        <Card.CardRappeur rapper={rapper2} />
      </ScrollView>
      <FooterNavBar />
    </SafeAreaView>
  );
};

export default LaunchBattle;
