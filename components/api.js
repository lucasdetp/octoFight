import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.26.132.231:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
