import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.26.130.75:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
