import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://minhaagendahomecare.herokuapp.com',
  headers: {
    Accept: 'application/json',
  },
});

export default axiosInstance;
