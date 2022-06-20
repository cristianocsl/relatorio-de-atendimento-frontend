import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Accept: 'application/json',
  },
});

export default axiosInstance;
