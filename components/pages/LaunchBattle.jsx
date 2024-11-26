import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from '../organisme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '../atoms';
import { useTheme } from '../../providers/ThemeProvider';
import * as pJson from '../../package.json';
import { UserContext } from '../../providers/UserContext';
import { FooterNavBar } from '../molecules';
import { handleBuyRapper } from '../atoms/Function';
import { Text } from '../atoms';

const LaunchBattle = ({ navigation, route, onRapperBought }) => {
  const [rappers, setRappers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const scrollViewRef = useRef(null);
  const { isNight } = useTheme();
  const { userId, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchRappers = async () => {
      try {

        const response = await axios.get(`${pJson.proxy}/api/rappers`);
        setRappers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rappeurs:', error);
        setMessage('Erreur lors de la récupération des rappeurs.');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    fetchRappers();
  }, []);

  useEffect(() => {
    if (message) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [message]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]}>
        <ActivityIndicator size="100" color={isNight ? '#ffffff' : '#0000ff'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]}>
      <StatusBar style="auto" />

      <View style={styles.creditsContainer}>
        <Text.Name style={[styles.creditsText]}>
          Crédits: <Text.Name style={[styles.credit]}>{userInfo?.credit || 0}</Text.Name>
        </Text.Name>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.scrollViewContent, { marginTop: 70 }]}
      >

        <Text.MessageAlert message={message} type={messageType} />
        {rappers.map((rapper, index) => (
          index % 2 === 0 && (
            <View style={styles.row} key={index}>
              <Card.CardRappeur
                rapper={rapper}
                onBuy={handleBuyRapper}
                backgroundColor={isNight ? '#333' : '#fff'}
                textColor={isNight ? '#fff' : '#000'}
              />
              {rappers[index + 1] && (
                <Card.CardRappeur
                  rapper={rappers[index + 1]}
                  onBuy={handleBuyRapper}
                  backgroundColor={isNight ? '#333' : '#fff'}
                  textColor={isNight ? '#fff' : '#000'}
                />
              )}
            </View>
          )
        ))}
      </ScrollView>

      <FooterNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  creditsContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    marginTop: 50,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  creditsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
  credit: {
    color: "gold",
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
