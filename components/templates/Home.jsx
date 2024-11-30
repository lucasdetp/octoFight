import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import FooterNavBar from '../molecules/FooterNavbar';
import { StatusBar } from 'expo-status-bar';
import NightSwitch from '../atoms/Function/NightSwitch';
import { useTheme } from '../../providers/ThemeProvider';
import { InviteModal } from '../organisme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import * as pJson from '../../package.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
    const [userInfo, setUserInfo] = useState(null);
    const openInviteModal = () => setModalVisible(true);
    const closeInviteModal = () => setModalVisible(false);
    const battleId = 1;
    const echo = new Echo({
        broadcaster: 'pusher',
        key: '225d6e015dff0ed8b4f6',
        cluster: 'eu',
        forceTLS: true,
        wsHost: '10.26.132.231',
        wsPort: 8000,
        disableStats: true,
    });

    const getUserInfo = async () => {
        try {
            const userToken = await AsyncStorage.getItem('token');
            if (userToken) {
                const response = await axios.get(`${pJson.proxy}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                setUserId(response.data.id);
                setUserInfo(response.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
            Alert.alert('Erreur', 'Impossible de récupérer les informations de l\'utilisateur.');
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            <StatusBar style={isNight ? 'light' : 'dark'} />

            <TouchableOpacity onPress={() => navigation.navigate('Account')} style={[
                styles.accountBubble,
                { backgroundColor: isNight ? '#ffffff' : '#000000' },
            ]}>
                <MaterialCommunityIcons name="account" size={34} color={isNight ? '#000000' : '#ffffff'} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ padding: 16, marginTop: 20 }}>
                {userInfo ? (
                    <View>
                        <Text style={[styles.text, { color: themeStyles.color, marginBottom: 30 }]}>
                            Bienvenue, {userInfo.name} !
                        </Text>
                    </View>
                ) : (
                    <Text style={[styles.text, { color: themeStyles.color }]}>
                        Chargement des informations utilisateur...
                    </Text>
                )}

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
});

export default Home;
