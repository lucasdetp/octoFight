import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

export const register = async (name, email, password) => {
    return api.post('/register', { name, email, password });
};

export const login = async (email, password) => {
    return api.post('/login', { email, password });
};