import axios from 'axios';

const api = axios.create({
    baseURL: 'https://286c-176-175-209-131.ngrok-free.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
