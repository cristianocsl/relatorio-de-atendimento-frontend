import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://minhaagendahomecare.herokuapp.com',
  headers: {
    Accept: 'application/json',
  },
});

interface login {
  email: string,
  password: string,
}

const login = async (userData: login) => {
  try {
    const { data } = await axiosInstance.post('/register', userData);
    return data;
  } catch (err: unknown) {
    return err;
  }
};

const axiosServices = {
  axiosInstance,
  login,
};

export default axiosServices;
