import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Card, Profil } from './components/molecules';
import { View, Text, StyleSheet } from 'react-native';
import Menu from './components/molecules/Menu';
import FooterNavBar from './components/molecules/Navbar/FooterNavbar';

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
  
  const App = () => {
  const [menu, setMenu] = useState('home');

  const displayContent = () => {
    switch (menu) {
      case 'profile':
        return <Text>Profile Content</Text>;
      case 'home':
      default:
        return <Text>Home Content</Text>;
      case 'Account':
        return <Text>Account Content</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Menu
        onMenuChange={(slug) => setMenu(slug)}
        configs={[
          { displayName: 'Profile', slug: 'profile' },
          { displayName: 'Home', slug: 'home' },
          { displayName: 'Account', slug: 'Account' },
        ]}
      />
      <View>{displayContent()}</View>
      <FooterNavBar />
    </View>

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
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
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

export default App;