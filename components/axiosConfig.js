import axios from 'axios';

const api = axios.create({
    baseURL: 'https://286c-176-175-209-131.ngrok-free.app/',
});

export const register = async (name, email, password) => {
    return api.post('/register', { name, email, password });
};

export const login = async (email, password) => {
    return api.post('/login', { email, password });
};