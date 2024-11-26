import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Button, Alert } from 'react-native';
import FooterNavBar from '../molecules/FooterNavbar';
import { StatusBar } from 'expo-status-bar';
import NightSwitch from '../atoms/NightSwitch';
import { useTheme } from '../../providers/ThemeProvider';
import { InviteModal } from '../organisme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;


const Home = () => {
    const { isNight } = useTheme();
    const navigation = useNavigation();
    const themeStyles = {
        backgroundColor: isNight ? '#000000' : '#ffffff',
        color: isNight ? '#ffffff' : '#000000',
    };

    const [isModalVisible, setModalVisible] = useState(false);
    const [invitations, setInvitations] = useState([]);
    const [userId, setUserId] = useState(null);
    const [socket, setSocket] = useState(null);

    const openInviteModal = () => setModalVisible(true);
    const closeInviteModal = () => setModalVisible(false);
const battleId = 1; // TODO enelver battleID en dur
    const echo = new Echo({
        broadcaster: 'pusher',
        key: '225d6e015dff0ed8b4f6',
        cluster: 'eu',
        forceTLS: true,
        wsHost: '10.26.132.231',
        wsPort: 8000,
        disableStats: true,
    });
    
    useEffect(() => {
        if (battleId && userId) {
            console.log('Connexion à Echo pour battleId:', battleId);
    
            echo.channel(`battle.${battleId}`)
                .listen('BattleAccepted', (data) => {
                    console.log('BattleAccepted:', data);
    
                    if (data.battle.user1_id === userId && !data.battle.user1_rapper_id) {
                        navigation.navigate('ChooseRapperPage', { battleId, userId });
                    } else if (data.battle.user2_id === userId && !data.battle.user2_rapper_id) {
                        navigation.navigate('ChooseRapperPage', { battleId, userId });
                    }
                });
    
            return () => {
                echo.leaveChannel(`battle.${battleId}`);
            };
        }
    }, [battleId, userId]); 
    

    const getUserIdFromStorage = async () => {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
            const userResponse = await axios.get('http://10.26.132.231:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            setUserId(userResponse.data.id);
        }
    };

    useEffect(() => {
        getUserIdFromStorage();
    }, []);

    const fetchPendingInvitations = async () => {
        try {
            const response = await axios.get(`http://10.26.132.231:8000/api/user/${userId}/pending-invitations`);
            setInvitations(response.data.invitations);
        } catch (error) {
            console.error('Erreur lors de la récupération des invitations:', error);
            Alert.alert('Erreur', 'Impossible de récupérer les invitations.');
        }
    };

    const handleAcceptInvitation = async (battleId) => {
        if (!userId) {
            Alert.alert('Erreur', 'Utilisateur non identifié');
            return; 
        }
    
        try {
            await axios.post(`http://10.26.132.231:8000/api/battle/${battleId}/accept`, {}, {
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            Alert.alert('Succès', 'Invitation acceptée!');

            console.log('battleId dans home:', battleId);
            if (battleId) { 
                navigation.navigate('BattlePage', { battleId, userId });
            }
        } catch (error) {
            console.error("Erreur lors de l'acceptation de l'invitation:", error);
            Alert.alert('Erreur', "Impossible d'accepter l'invitation.");
        }
    };

    const handleDeclineInvitation = async (battleId) => {
        try {
            await axios.delete(`http://10.26.132.231:8000/api/battle/${battleId}/decline`, {
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            Alert.alert('Succès', 'Invitation refusée!');
            fetchPendingInvitations();
        } catch (error) {
            console.error('Erreur lors du refus de l\'invitation:', error);
            Alert.alert('Erreur', 'Impossible de refuser l\'invitation.');
        }
    };

    useEffect(() => {
        if (userId) {
            fetchPendingInvitations();
        }
    }, [userId]);

    useEffect(() => {
        const socketInstance = io('http://10.26.132.231:8000');
        setSocket(socketInstance);
        return () => socketInstance.disconnect();
    }, [userId]);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            <StatusBar style={isNight ? 'light' : 'dark'} />
            <View style={styles.header}>
                <NightSwitch />
            </View>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={[styles.text, { color: themeStyles.color }]}>Bienvenue sur l'accueil !</Text>
                <Button title="Inviter un utilisateur à un combat" onPress={openInviteModal} />

                {invitations.length > 0 ? (
                    <View style={styles.invitationsContainer}>
                        <Text style={[styles.text, { color: themeStyles.color }]}>Invitations en attente :</Text>
                        {invitations.map((invitation) => (
                            <View key={invitation.id} style={styles.invitation}>
                                <Text style={[styles.text, { color: themeStyles.color }]}>
                                    Invitation reçue de {invitation.user1_id}
                                </Text>
                                <Button
                                    title="Accepter"
                                    onPress={() => handleAcceptInvitation(invitation.id)}
                                />
                                <Button
                                    title="Refuser"
                                    onPress={() => handleDeclineInvitation(invitation.id)}
                                />
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={[styles.text, { color: themeStyles.color }]}>Aucune invitation en attente</Text>
                )}
            </ScrollView>
            <FooterNavBar />
            <InviteModal visible={isModalVisible} onClose={closeInviteModal} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    text: {
        fontSize: 24,
    },
    invitationsContainer: {
        marginTop: 20,
    },
    invitation: {
        marginVertical: 10,
    },
});

export default Home;
