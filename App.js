import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Profil, FooterNavBar } from './components/molecules';
import { Card} from './components/organisme';


export default function App() {
  const rapper = {
    name: 'Booba',
    image: 'https://i.scdn.co/image/ab6761610000e5eb96b3ab10e89bad078d125c3a',
    attack: 90,
    defense: 85,
    rarity: 'Légendaire',
  };
  const rapper2 = {
    name: 'GIMS',
    image: 'https://i.scdn.co/image/ab6761610000e5eb77144f838397a467e807df65',
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
        {/* <Profil.ProfileHeader user={{ name: "jul", email: "test@test.fr", photo: "https://i.scdn.co/image/ab6761610000e5ebe66ef18636bf25588abdd2ae" }} /> */}
      <FooterNavBar />
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
