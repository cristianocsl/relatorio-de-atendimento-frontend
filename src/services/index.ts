import axios from 'axios';
import { thisLogin, thisName } from './types';

const axiosInstance = axios.create({
  baseURL: 'https://minhaagendahomecare.herokuapp.com',
  headers: {
    Accept: 'application/json',
  },
});

const wakeUp = async () => {
  try {
    const { data } = await axiosInstance.get('/wakeup');
    return data;
  } catch (err: unknown) {
    return err;
  }
}

const register = async (userData: thisLogin | thisName) => {
  try {
    const { data } = await axiosInstance.post('/register', userData);
    return data;
  } catch (err: any) {
    return err.response.data.message;
  }
};

const setInLocalStorage = (token: string, name: string): void => {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('userName', JSON.stringify(name));
}

const login = async (userData: thisLogin) => {
  try {
    const { data } = await axiosInstance.post('/login', userData);
    setInLocalStorage(data.token, data.name);
    return data;
  } catch (err: any) {
    return err.response.data.message;
  }
};

const axiosServices = {
  axiosInstance,
  wakeUp,
  register,
  login,
};

export default axiosServices;
