import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.26.130.75:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const register = async (name, email, password) => {
    return api.post('/register', { name, email, password });
};

export const login = async (email, password) => {
    return api.post('/login', { email, password });
};