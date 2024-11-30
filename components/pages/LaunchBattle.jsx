import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card } from '../organisme';
import axios from 'axios';
import { Text } from '../atoms';
import { useTheme } from '../../providers/ThemeProvider';
import * as pJson from '../../package.json';
import { UserContext } from '../../providers/UserContext';
import { FooterNavBar } from '../molecules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LaunchBattle = ({ navigation, route }) => {
  const [rappers, setRappers] = useState([]);
  const [purchasedRappers, setPurchasedRappers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const scrollViewRef = useRef(null);
  const { isNight } = useTheme();
  const { userId, userInfo } = useContext(UserContext);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      return null;
    }
  };

  const handleBuyRapper = async (rapperId) => {
    try {
      const token = await getToken();

      if (!token) {
        setMessage('Vous devez être connecté pour acheter un rappeur.');
        setMessageType('error');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${pJson.proxy}/api/buy-rapper`,
        { rapper_id: String(rapperId) },
        config
      );

      if (response.status === 200) {
        const updatedCredits = response.data.updatedCredits;
        if (updatedCredits !== undefined) {
          updateCredits(updatedCredits);
        }
        setMessage('Vous avez acheté ce rappeur !');
        setMessageType('success');

        if (updatedCredits !== undefined) {
          userInfo.credit = updatedCredits;
        }

        setRappers((prevRappers) =>
          prevRappers.filter((rapper) => rapper.id !== rapperId)
        );

        await fetchPurchasedRappers();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Une erreur est survenue lors de l'achat du rappeur.");
      }
      setMessageType('error');
    }
  };

  const getRapperPrice = (rapper) => {
    const basePrice = 100;
    if (!rapper.followers || !rapper.popularity) {
      return basePrice;
    }

    const followerFactor = rapper.followers / 1000000;

    let price;

    if (rapper.popularity >= 75) {
      const popularityFactor = rapper.popularity * 5;
      price = Math.max(basePrice + popularityFactor + followerFactor, 3000);
    } else if (rapper.popularity >= 65 && rapper.popularity <= 74) {
      const popularityFactor = rapper.popularity * 4.5;
      price = Math.max(basePrice + popularityFactor + followerFactor, 1500);
    } else if (rapper.popularity >= 55 && rapper.popularity <= 64) {
      const adjustmentFactor = rapper.followers < 500000 ? 0.6 : rapper.followers <= 1000000 ? 0.8 : 1;
      const popularityFactor = rapper.popularity * 3.5;
      price = Math.min((basePrice + popularityFactor + followerFactor) * adjustmentFactor, 300);
    } else {
      const popularityFactor = rapper.popularity * 2.5;
      price = Math.max(50, Math.min(basePrice + popularityFactor + followerFactor, 150));
    }

    return Math.round(price);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return '#b0b0b0'; // Gris
      case 'uncommon':
        return '#00ff00'; // Vert
      case 'rare':
        return '#0000ff'; // Bleu
      case 'epic':
        return '#800080'; // Violet
      case 'legendary':
        return '#ffa500'; // Orange
      default:
        return '#ffffff'; // Blanc par défaut
    }
  };

  const fetchPurchasedRappers = async () => {
    const token = await getToken();

    try {
      const response = await axios.get(`${pJson.proxy}/api/user/${userId}/rappers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPurchasedRappers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des rappeurs achetés:', error);
      setMessage('Erreur lors de la récupération des rappeurs achetés.');
      setMessageType('error');
    }
  };


  const fetchAvailableRappers = async () => {
    try {
      const response = await axios.get(`${pJson.proxy}/api/rappers`);
      setRappers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des rappeurs disponibles:', error);
      setMessage('Erreur lors de la récupération des rappeurs disponibles.');
      setMessageType('error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchPurchasedRappers(), fetchAvailableRappers()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (message) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [message]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]} >
        <ActivityIndicator size="large" color={isNight ? '#ffffff' : '#0000ff'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]}>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={() => navigation.navigate('Account')} style={[
        styles.accountBubble,
        { backgroundColor: isNight ? '#ffffff' : '#000000' },
      ]}>
        <MaterialCommunityIcons name="account" size={34} color={isNight ? '#000000' : '#ffffff'} />
      </TouchableOpacity>

      <View style={[styles.creditsContainer, { backgroundColor: isNight ? '#fff' : '#000' }]}>
        <Text.Name style={[styles.creditsText, { color: isNight ? '#000' : '#fff' }]}>
          Crédits: <Text.Name style={styles.credit}>{userInfo?.credit || 0}</Text.Name>
        </Text.Name>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.scrollViewContent, { marginTop: 70 }]}
      >
        <Text.MessageAlert message={message} type={messageType} />

        <Text.Name style={[styles.sectionTitle, { color: isNight ? '#fff' : '#000' }]}>
          Vos rappeurs achetés
        </Text.Name>
        <View style={styles.rowWrapper}>
          {purchasedRappers.length > 0 ? (
            purchasedRappers.map((rapper, index) => (
              <View style={styles.cardContainer} key={`purchased-${index}`}>
                <Card.CardMyRappeur rapper={rapper}>
                  <Text.Name style={{
                    color: getRarityColor(rapper.rarity),
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                    {rapper.name} ({rapper.rarity})
                  </Text.Name>
                  <Text.Name style={{ color: isNight ? '#fff' : '#000' }}>
                    🛡️ Défense : {rapper.defense} | ⚔️ Attaque : {rapper.attack}
                  </Text.Name>
                </Card.CardMyRappeur>
              </View>
            ))
          ) : (
            <Text.Name style={styles.noDataText}>
              Aucun rappeur acheté pour le moment.
            </Text.Name>
          )}
        </View>

        <Text.Name style={[styles.sectionTitle, { color: isNight ? '#fff' : '#000' }]}>
          Rappeurs disponibles à l'achat
        </Text.Name>
        <View style={styles.rowWrapper}>
          {rappers
            .filter((rapper) => !purchasedRappers.some((p) => p.id === rapper.id))
            .map((rapper, index) => (
              <View style={styles.cardContainer} key={`available-${index}`}>
                <Card.CardRappeur
                  rapper={rapper}
                  price={getRapperPrice(rapper)}
                  onBuy={handleBuyRapper}
                  backgroundColor={isNight ? '#333' : '#fff'}
                  textColor={isNight ? '#fff' : '#000'}
                >
                  <Text.Name style={{
                    color: getRarityColor(rapper.rarity),
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                    {rapper.name} ({rapper.rarity.toUpperCase()})
                  </Text.Name>
                  <Text.Name style={{ color: isNight ? '#fff' : '#000' }}>
                    🛡️ Défense : {rapper.defense} | ⚔️ Attaque : {rapper.attack}
                  </Text.Name>
                </Card.CardRappeur>
              </View>
            ))}
        </View>
      </ScrollView>

      <FooterNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 50,
  },
  creditsContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 5,
  },
  creditsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  credit: {
    color: 'gold',
  },
  scrollViewContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  rowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    width: "100%",
  },
  cardContainer: {
    width: '45%',
    margin: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#aaa',
  },
  accountBubble: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 99,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  },
});



export default LaunchBattle;
