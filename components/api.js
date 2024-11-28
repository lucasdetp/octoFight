import axios from 'axios';
import * as pJson from '../package.json';

const api = axios.create({
    baseURL: `${pJson.proxy}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

