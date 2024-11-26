import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as pJson from '../package.json';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

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
        <UserContext.Provider value={{ userId, userInfo, setUserInfo, getUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};
