import React, { useState, useEffect } from 'react';
import BattlePage from '../components/pages/BattlePage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSocket } from '../providers/SocketContext';

const CheckBattle = ({ children, userId }) => {
    const [isBattle, setIsBattle] = useState(false);
    const [battleId, setBattleId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasRedirected, setHasRedirected] = useState(false);
    const socket = useSocket();
    const navigation = useNavigation();
    let lastBattleStatus = null;

    useEffect(() => {
        let intervalId;

        const checkIfInBattle = async () => {
            try {
                if (lastBattleStatus !== null && !hasRedirected) {
                    setIsBattle(lastBattleStatus);
                    return;
                }
                
                if (!userId) {
                    setIsBattle(false);
                    return;
                }

                if (!navigation || typeof navigation.navigate !== 'function') {
                    console.error('Navigation not initialized');
                    return null;
                }
                
                const token = await AsyncStorage.getItem('token');
                const url = `http://10.26.132.231:8000/api/user/${userId}/battle`;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.battle) {
                    setIsBattle(true);
                    setBattleId(response.data.battle.id);
                    lastBattleStatus = response.data.battle ? true : false;

                    if (!hasRedirected) {
                        setHasRedirected(true);
                        navigation.navigate('BattlePage', { battleId: response.data.battle.id, userId });
                    }
                } else {
                    setIsBattle(false);
                    setHasRedirected(false);
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de la battle:", error);
                setIsBattle(false);
                setHasRedirected(false);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        checkIfInBattle();

        intervalId = setInterval(checkIfInBattle, 10000);

        return () => clearInterval(intervalId);
    }, [userId, hasRedirected, navigation]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <>
            {isBattle ? (
                <BattlePage
                    route={{ params: { battleId, userId } }}
                    navigation={navigation}
                    socket={socket}
                    setBattleId={setBattleId}
                />
            ) : (
                children
            )}
        </>
    );
};

export default CheckBattle;
