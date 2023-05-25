import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 1000,
});

export default api;