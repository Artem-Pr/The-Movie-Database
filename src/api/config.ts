import axios from 'axios';

export const API_KEY = '619e6b54477dcd363899f6f2d3dc1ed1';

export const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {api_key: API_KEY},
});
