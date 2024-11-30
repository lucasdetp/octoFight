import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSocket } from '../providers/SocketContext';
import * as pJson from '../package.json';

const CheckBattle = ({ children, userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        let intervalId;

        const checkIfInBattle = async () => {
            try {
                if (!userId) {
                    setIsLoading(false);
                    return;
                }

                const token = await AsyncStorage.getItem('token');
                const url = `${pJson.proxy}/api/user/${userId}/battle`;

                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.battle) {
                    const battleId = response.data.battle.id;

                    navigation.navigate('BattlePage', { battleId, userId });
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de la battle:', error);
                setIsLoading(false);
            }
        };

        checkIfInBattle();

        intervalId = setInterval(checkIfInBattle, 10000);

        return () => clearInterval(intervalId);
    }, [userId, navigation]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return children;
};

export default CheckBattle;