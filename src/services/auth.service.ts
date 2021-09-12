import AsyncStorage from '@react-native-async-storage/async-storage';
import {Register} from '../models/register';
import {axiosPost} from '../shared/axiosFunctions';
import {Auth} from '../models/auth';

export const login = async (auth: Auth) => {
  const endpoint = 'auth/login';

  try {
    const response = await axiosPost(endpoint, auth);
    return response;
  } catch (err) {
    throw err;
  }
};

export const register = async (registerUser: Register) => {
  const endpoint = '/user';

  try {
    const response = await axiosPost(endpoint, registerUser);
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkToken = async (token: string) => {
  const endpoint = '/auth/refresh';

  try {
    const response = await axiosPost(endpoint, {token});

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  const token = await AsyncStorage.getItem('token');
  const endpoint = `auth/logout`;

  try {
    const response = await axiosPost(endpoint, {token});
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
