import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from '../organisme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '../atoms';
import { useTheme } from '../../providers/ThemeProvider';

const Deck = ({ navigation }) => {
    const [rappers, setRappers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('error');
    const scrollViewRef = useRef(null);
    const { isNight } = useTheme();

    // Définir la fonction fetchDeck
    const fetchDeck = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                setMessage('Vous devez être connecté pour voir votre deck.');
                setMessageType('error');
                setLoading(false);
                return;
            }

            const response = await axios.get('http://10.26.130.75:8000/api/user/deck', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setRappers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération du deck:', error);
            setMessage('Erreur lors de la récupération du deck.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    // Utiliser useEffect pour appeler fetchDeck une seule fois lors du montage
    useEffect(() => {
        fetchDeck();
    }, []);

    // Scroller en haut si un message est défini
    useEffect(() => {
        if (message) {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
    }, [message]);

    if (loading) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]}>
                <ActivityIndicator size="large" color={isNight ? '#ffffff' : '#0000ff'} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: isNight ? '#000' : '#fff' }]}>
            <StatusBar style="auto" />
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
                <Text.MessageAlert message={message} type={messageType} />
                {rappers.map((rapper, index) => (
                    index % 2 === 0 && (
                        <View style={styles.row} key={index}>
                            <Card.CardRappeur
                                rapper={rapper}
                                onBuy={null} // En passant `null`, le bouton ne s'affichera pas
                                backgroundColor={isNight ? '#333' : '#fff'}
                                textColor={isNight ? '#fff' : '#000'}
                                hideBuyButton={true} // Ajout de la propriété `hideBuyButton`
                            />
                            {rappers[index + 1] && (
                                <Card.CardRappeur
                                    rapper={rappers[index + 1]}
                                    onBuy={null}
                                    backgroundColor={isNight ? '#333' : '#fff'}
                                    textColor={isNight ? '#fff' : '#000'}
                                    hideBuyButton={true} // Ajout de la propriété `hideBuyButton`
                                />
                            )}
                        </View>
                    )
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
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

export default Deck;
