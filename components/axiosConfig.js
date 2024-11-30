import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as pJson from '../package.json';

const api = axios.create({

    baseURL: `${pJson.proxy}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const sendInvite = async (invitedUserId) => {
    return api.post('/battle/invite', { invited_user_id: invitedUserId });
};

export const acceptInvite = async (battleId) => {
    return api.post(`/battle/${battleId}/accept`);
};

export const resolveBattle = async (battleId, rapperId) => {
    return api.post(`/battle/${battleId}/resolve`, { rapper_id: rapperId });
};

export const register = async (name, email, password) => {
    return api.post('/register', { name, email, password });
};

export const login = async (email, password) => {
    return api.post('/login', { email, password });
};
